<template>
  <div class="bg-surface-soft p-md flex-col gap-[80px] rounded-md">
    <SharedBankAccountOverviewBankSkeleton v-if="type === 'iban'" :bank="ibanBank" />
    <SharedBankAccountOverviewBankSkeleton v-else :bank="panBank" />
    <div class="flex justify-between gap-xs w-full" dir="ltr">
      <template v-if="type === 'iban'">
        <div
          class="bg-surface p-xs w-full rounded-md text-left ltr font-Mono text-body-400-b2 font-semibold flex items-center justify-between gap-[1px]"
        >
          <span
            v-for="(char, index) in ibanCharacters"
            :key="index"
            :class="char === '-' || !iban.length ? 'text-surface-heavy' : 'text-text'"
          >
            {{ char }}
          </span>
        </div>
      </template>
      <template v-else>
        <div
          v-for="(section, index) in panSections"
          :key="index"
          dir="ltr"
          class="bg-surface font-Mono text-body-400-b2 font-semibold p-xs w-[60px] rounded-md text-center flex items-center justify-between gap-[1px]"
        >
          <span
            v-for="(char, charIndex) in section"
            :key="charIndex"
            :class="char === '-' ? 'text-surface-heavy' : 'text-text'"
          >
            {{ char }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { replace } from 'lodash';
interface Props {
  type: 'pan' | 'iban';
  iban: string;
  pan: string;
}

const props = defineProps<Props>();
const { iban, pan } = toRefs(props);
const { detectBankByPan, detectBankByIban } = useDetectBank();
const panBank = ref();
const ibanBank = ref();
const ibanCharacters = computed(() => tempIban.value.split(''));
const panSections = computed(() => tempPan.value.split(' '));
const tempPan = computed(() => {
  panBank.value = detectBankByPan(pan.value);
  const placeholders = '---- ---- ---- ----'.split('');
  let inputIndex = 0;
  for (let i = 0; i < placeholders.length; i++) {
    if (placeholders[i] === '-' && inputIndex < pan.value.length) {
      placeholders[i] = pan.value[inputIndex];
      inputIndex++;
    }
  }

  return placeholders.join('');
});
const tempIban = computed(() => {
  const val = replace(iban.value, /\D/g, '');
  ibanBank.value = detectBankByIban(val);
  const placeholders = 'IR------------------------'.split('');
  let index = 0;
  for (let i = 0; i < placeholders.length; i++) {
    if (placeholders[i] === '-' && index < iban.value.length) {
      placeholders[i] = iban.value[index];
      index++;
    }
  }

  return placeholders.join('');
});
</script>
