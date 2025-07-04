<template>
  <div class="flex gap-2xs">
    <ui-Button
      icon="ArrowRight"
      type="tertiary"
      class="w-[40px] h-[40px] ml-md"
      @click="goBackToStepOne"
    />

    <div class="mb-md">
      <p class="ml-xs gap-2xs text-heading-600-h3 my-xs">
        {{ $t('_bank_account.verifyAccount') }}
      </p>
      <p class="text-body-400-b2 font-normal text-text-soft">
        {{ $t('_bank_account.verifyDescription') }}
      </p>
    </div>
  </div>

  <div
    class="text-center rounded-circle bg-surface-soft m-auto pt-[20px] pb-[20px] w-[64px] h-[64px]"
  >
    <ui-Icon name="CreditCardUser" class="w-[32px] h-[32px]" />
  </div>
  <div class="flex !mt-0">
    <div class="lg:w-1/2 w-3/5 m-auto" dir="ltr">
      <div class="my-xl">
        <ui-Summary :loading="loadingCheck" class="summery-bank" :items="summaryItems" />
      </div>
      <ui-Button
        v-if="isCardPan === undefined || isCardPan === false"
        class="w-full"
        type="primary"
        :loading="loadingAdd"
        :disabled="loadingAdd"
        size="medium"
        :text="
          navLink === BankAccountTypeEnum.Personal
            ? $t('_bank_account.add_new_account')
            : $t('_bank_account.add_new_account_share')
        "
        @click="formSubmit"
      />
      <ui-Button
        v-if="isCardPan === true"
        class="w-full"
        type="primary"
        size="medium"
        :loading="loadingAddCard"
        :disabled="loadingAddCard"
        :text="
          navLink === BankAccountTypeEnum.Personal
            ? $t('_bank_account.add_new_account')
            : $t('_bank_account.add_new_account_share')
        "
        @click="addcardPan"
      />
      <ui-InlineMessage
        v-if="navLink === BankAccountTypeEnum.Personal"
        class="!mt-xl"
        type="informative"
        :title="$t('_bank_account.attention')"
        :description="$t('_bank_account.notif')"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { replace } from 'lodash';
import { BankAccountTypeEnum, Iban } from '@/graphql/graphql';

export interface Props {
  dataCheck: Iban | undefined;
  loadingCheck?: boolean;
  loadingAddCard?: boolean;
  loadingAdd?: boolean;
  isCardPan?: boolean;
  navLink: BankAccountTypeEnum;
}
const { getStatusInfo } = useBankAccountStatus();
const t = useI18n();
const formSubmit = inject('form_submit1');
const addcardPan = inject('form_submit2');
const goBackToStepOne = inject<(() => void | undefined) | undefined>('goBackToStepOne');
const props = withDefaults(defineProps<Props>(), {
  dataCheck: undefined,
});
const summaryItems = computed(() => [
  {
    id: 1,
    title: t('_common.table.iban'),
    value: props.dataCheck?.iban,
    class: 'font-Mono',
  },
  {
    id: 2,
    title: t('_bank_account.owner'),
    value: props.dataCheck?.holder_name ? props.dataCheck?.holder_name : 'نامشخص',
    class: 'items-center',
  },
  {
    id: 3,
    title: t('_bank_account.issuing_bank'),
    value: props.dataCheck?.issuing_bank?.name
      ? replace(props.dataCheck?.issuing_bank?.name, 'بانک', '')
      : '',
    logo: props.dataCheck?.bank_slug,
  },
  {
    id: 4,
    title: t('_bank_account.account_status'),
    status: {
      text: props.dataCheck?.bank_status ? getStatusInfo(props.dataCheck.bank_status).text : '',
      type: props.dataCheck?.bank_status ? getStatusInfo(props.dataCheck.bank_status).type : '',
    },
  },
]);
</script>
<style lang="scss" scoped>
.summery-bank {
  @apply bg-white-100;
}
</style>
