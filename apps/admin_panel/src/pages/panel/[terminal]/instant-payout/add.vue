<template>
  <div class="w-full">
    <InstantPayoutAddHeader />
    <InstantPayoutAddMain class="container-lg xl:px-3xl pb-3xl px-md" />
  </div>
</template>

<script setup lang="ts">
import { useInstantPayoutSchema } from '@/composables/instant-payout/useInstantPayoutSchema';
import { useInstantPayoutMutation } from '@/composables/instant-payout/usePayoutMutation';
import { useSnakeToCamel } from '@/composables/useSnake';
import { TerminalPermissionEnum } from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';
import { useBankAccountStore } from '@/stores/bankAccountStore';

const { $notify } = useNuxtApp();
const terminal = useTerminalStore();
const { snakeToCamel } = useSnakeToCamel();
const { addInstantPayout } = useInstantPayoutMutation();
type validationType = 'amount';
const { mutate, loading, onDone } = addInstantPayout((input, message, params) => {
  setFieldError(snakeToCamel(input) as validationType, t('_validation.' + message, params));
});
definePageMeta({
  name: 'instant-payout-add',
  layout: 'terminal',
  middleware: ['permission', 'check-active-terminal'],
  fallbackRoute: '/instant-payout',
  permission: TerminalPermissionEnum.InstantPayoutEdit,
});
const t = useI18n();
useHead({
  title: t('_common.page_title.instant_payout'),
});
const { schema } = useInstantPayoutSchema();
const { errors, handleSubmit, meta, values, setFieldError, resetForm } = useForm({
  validationSchema: schema,
});
const store = useBankAccountStore();
const onSubmit = handleSubmit(values => {
  const variables = {
    terminal_id: terminal.currentTerminal,
    bank_account_id: store.selectedBankAccountId,
    amount: values.amount.replace(/,/g, ''),
  };
  mutate(variables);
});
onDone(() => {
  $notify({
    isRead: false,
    message: t('common.success'),
    type: 'success',
  });
});
provide('form_errors', errors);
provide('form_submit', onSubmit);
provide('form_meta', meta);
provide('form_loading', loading);
provide('form_values', values);
provide('form_reset', resetForm);
</script>
