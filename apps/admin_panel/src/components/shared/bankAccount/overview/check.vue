<template>
  <div>
    <div class="flex">
      <ui-Button
        icon="ArrowRight"
        type="tertiary"
        class="w-[40px] h-[40px] ml-md"
        @click="goBackToStepOne"
      />

      <div class="mb-md">
        <p class="ml-xs gap-2xs text-heading-600-h3 my-xs">
          {{
            navLink === BankAccountTypeEnum.Personal
              ? $t('_bank_account.addPersonal')
              : $t('_bank_account.add_share')
          }}
        </p>
        <p class="text-body-400-b2 font-normal text-text-soft">
          {{
            navLink === BankAccountTypeEnum.Personal
              ? $t('_bank_account.in_add_modal_description')
              : $t('_bank_account.in_add_modal_description_share')
          }}
        </p>
      </div>
    </div>
    <div class="flex items-start gap-xl">
      <div class="grow lg:pr-0 pr-[60px]" dir="ltr">
        <div class="mb-xl flex gap-md pl-[1px]" dir="ltr">
          <ui-RadioCard
            v-model="item"
            :disabled="loadingCheck"
            :tabindex="1"
            val="pan"
            :label="$t('_bank_account.card_number')"
            name="status"
            @click="showCardPan"
          />
          <ui-RadioCard
            v-model="item"
            :disabled="loadingCheck"
            :tabindex="2"
            val="iban"
            :label="$t('_common.table.iban')"
            name="status"
            @click="showIban"
          />
        </div>
        <form @submit.prevent="">
          <ui-TextField
            v-if="isCardPan"
            v-model="pan"
            class="w-full mb-xl"
            input-custom-class="font-Mono"
            name="pan"
            :disabled="loadingCheck"
            is-number
            :placeholder="$t('_bank_account.card_number')"
            :helper="{
              type: !!errors?.pan ? 'error' : undefined,
              message: errors?.pan,
            }"
            @update:model-value="normalizePan"
          />
          <ui-TextField
            v-if="isIban"
            v-model="iban"
            class="w-full mb-xl"
            input-custom-class="font-Mono"
            name="iban"
            unit="IR"
            :disabled="loadingCheck"
            is-number
            label
            :placeholder="$t('_common.table.iban')"
            :helper="{
              type: !!errors?.iban ? 'error' : undefined,
              message: errors?.iban,
            }"
            @update:model-value="normalizeIban"
          />
          <ui-Button
            class="w-full"
            type="primary"
            size="medium"
            :loading="loadingCheck"
            :disabled="!formMeta?.valid"
            :text="$t('_kyc.NewSerialCard.button')"
            @click="formSubmit"
          />
        </form>
      </div>
      <ui-Divider type="vertical" :height="184" class="hidden md:block" />
      <SharedBankAccountOverviewCartPlaceholder
        :type="isIban ? 'iban' : 'pan'"
        :iban="iban"
        :pan="pan"
        class="hidden md:flex min-w-[300px] w-[300px]"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { replace } from 'lodash';
import { FormMeta } from 'vee-validate';
import { BankAccountTypeEnum } from '@/graphql/graphql';
const { toEnNumber } = useInput();

export interface Props {
  loadingCheck?: boolean;
  showCheckAccount?: boolean;
  showAlertChecking?: boolean;
  navLink: BankAccountTypeEnum;
}
const errors:
  | globalThis.ComputedRef<Partial<Record<'pan' | 'iban', string | undefined>>>
  | undefined = inject('form_errors');
export type ErrorsType = globalThis.ComputedRef<
  Partial<Record<'pan' | 'iban', string | undefined>>
>;
const formMeta:
  | globalThis.ComputedRef<
      FormMeta<
        Partial<{
          pan: string;
          iban: string;
        }>
      >
    >
  | undefined = inject('form_meta');
const emit = defineEmits(['select', 'isCardCheck']);
const formSubmit = inject('form_submit');
const goBackToStepOne = inject<(() => void | undefined) | undefined>('goBackToStepOne');
const iban = ref('');
const pan = ref('');
const isCardPan = ref(false);
const isIban = ref(true);
const item = ref('iban');
const props = withDefaults(defineProps<Props>(), {});
const { loadingCheck, navLink } = toRefs(props);
const showCardPan = () => {
  isIban.value = false;
  isCardPan.value = true;
  emit('isCardCheck', { pan: isCardPan.value, iban: isIban.value });
};
const showIban = () => {
  isIban.value = true;
  isCardPan.value = false;
  emit('isCardCheck', { pan: isCardPan.value, iban: isIban.value });
};
const normalizePan = (value: string) => {
  const character = toEnNumber(value);
  const val = replace(character, /\D/g, '');
  nextTick(() => {
    pan.value = val;
  });
};
const normalizeIban = (value: string) => {
  const character = toEnNumber(value);
  const val = replace(character, /\D/g, '');
  nextTick(() => {
    iban.value = val;
  });
};
</script>
