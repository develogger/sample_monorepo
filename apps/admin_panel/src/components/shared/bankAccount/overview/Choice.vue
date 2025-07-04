<template>
  <div>
    <div class="flex gap-2xs">
      <ui-Button
        icon="ArrowRight"
        type="tertiary"
        class="w-[40px] h-[40px] ml-md"
        @click="goBackToStepOne"
      />

      <div class="mb-md">
        <p class="ml-xs gap-2xs text-heading-600-h3 my-xs">
          {{ $t('_bank_account.add_account_choice_title') }}
        </p>
        <p class="text-body-400-b2 font-normal text-text-soft">
          {{ $t('_bank_account.add_account_choice_caption') }}
        </p>
      </div>
    </div>
    <div class="flex items-center justify-center flex-col md:flex-row gap-md">
      <ui-NavLink
        v-for="(item, index) in links"
        :key="index"
        :label="item.label"
        :arrow="true"
        class="border border-border ltr"
        @click="onSelect(item.value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BankAccountTypeEnum } from '@/graphql/graphql';

const emit = defineEmits(['select']);
const goBackToStepOne = inject<(() => void | undefined) | undefined>('goBackToStepOne');
const t = useI18n();
const links = ref([
  {
    label: t('_bank_account.addPersonal'),
    value: BankAccountTypeEnum.Personal,
  },
  {
    label: t('_bank_account.add_share'),
    value: BankAccountTypeEnum.Share,
  },
]);
const onSelect = (value: BankAccountTypeEnum) => {
  emit('select', value);
};
</script>
