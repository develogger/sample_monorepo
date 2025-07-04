<template>
  <div class="w-full">
    <PayoutAddHeader />
    <PayoutAddMain class="container-lg px-md lg:px-0 xl:px-3xl pb-3xl" />
  </div>
</template>

<script setup lang="ts">
import { usePayoutQueryById } from '../../../../composables/payout/usePayoutQueryById';
import { inquiryGetData } from '@/composables/payout/usePayoutDetails';
import { usePayoutMutation } from '@/composables/payout/usePayoutMutation';
import { useSnakeToCamel } from '@/composables/useSnake';
import { TerminalPermissionEnum } from '@/graphql/graphql';
import { useBankAccountStore } from '@/stores/bankAccountStore';
import { usePayoutSchema } from '@/composables/payout/usePayoutSchema';
const store = useBankAccountStore();
const router = useRouter();
const route = useRoute();
const { $notify } = useNuxtApp();
const { active: terminal } = useActiveTerminal();
const { snakeToCamel } = useSnakeToCamel();
const { addPayout, retryPayout } = usePayoutMutation();
type validationType = 'amount' | 'content';
const { refetch: refetchInquiry, loading: inquiryLoading } = inquiryGetData();
const { data, refetch, onResult } = usePayoutQueryById();
const {
  mutate,
  loading: addLoading,
  onDone,
} = addPayout((input, message, params) => {
  setFieldError(snakeToCamel(input) as validationType, t('_validation.' + message, params));
});
const {
  mutate: retryMutate,
  loading: retryLoading,
  onDone: onRetryDone,
} = retryPayout((input, message, params) => {
  setFieldError(snakeToCamel(input) as validationType, t('_validation.' + message, params));
});

definePageMeta({
  name: 'payout-add',
  layout: 'terminal',
  middleware: ['permission', 'check-active-terminal'],
  fallbackRoute: '/payout',
  permission: TerminalPermissionEnum.PayoutEdit,
});
const t = useI18n();

useHead({
  title:
    route.params.id !== 'add'
      ? t('_common.page_title.edit_payout')
      : t('_common.page_title.create_payout'),
});

onMounted(() => {
  store.selectedBankAccountId = '';
  refetch();
});

const done = () => {
  store.selectedBankAccountId = '';
  store.selectedBankaccount = [];
  refetchInquiry();
  resetForm();

  return router.push(`/panel/${encodeURIComponent(terminal.domain as string)}/payout`);
};
const { schema } = usePayoutSchema();
const { errors, handleSubmit, meta, setFieldError, resetForm } = useForm({
  validationSchema: schema,
});
const onSubmit = handleSubmit(values => {
  const variables = {
    terminal_id: terminal.id,
    bank_account_id: store.selectedBankAccountId,
    description: values.content && values.content.length ? values.content : undefined,
    amount: values.amount.replace(/,/g, ''),
    reconciliation_parts: 'MULTI',
    payout_id: data.value?.id,
  };
  if (!data.value?.id) {
    mutate(variables);
  } else {
    retryMutate(variables);
  }
});
onDone(() => {
  $notify({
    isRead: false,
    message: t('_payout.success_add'),
    type: 'success',
  });
  done();
});
onRetryDone(() => {
  done();
  $notify({
    isRead: false,
    message: t('_payout.success_edit'),
    type: 'success',
  });
});
onResult(() => {
  if (_isEmpty(data.value)) {
    return router.push(`/panel/${encodeURIComponent(terminal.domain as string)}/payout`);
  }
});
const loading = computed(() => addLoading.value || retryLoading.value);
provide('form_errors', errors);
provide('form_submit', onSubmit);
provide('form_meta', meta);
provide('form_loading', loading);
provide('inquiry_loading', inquiryLoading);
provide('data', data);
</script>
