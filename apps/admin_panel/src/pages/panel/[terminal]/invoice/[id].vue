<template>
  <div class="w-full">
    <InvoiceAddHeader />
    <InvoiceAddMain class="container-lg xl:px-3xl pb-3xl px-md" />
  </div>
</template>

<script setup lang="ts">
import { NotifyTypeEnum, SessionFeeTypeEnum, TerminalPermissionEnum } from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';
import { useInvoiceMutation } from '@/composables/invoice/useInvoiceMutation';
import { useInvoiceQueryById } from '@/composables/invoice/useInvoiceQueryById';
import { useInvoiceSchema } from '@/composables/invoice/useInvoiceSchema';
const terminal = useTerminalStore();
const { $notify } = useNuxtApp();
const { addInvoice, editInvoice } = useInvoiceMutation();
const { loading, onDone, mutate } = addInvoice();
const { loading: editLoading, mutate: editMutate, onDone: editDone } = editInvoice();
definePageMeta({
  name: 'invoice-add',
  layout: 'terminal',
  middleware: ['permission'],
  permission: TerminalPermissionEnum.InvoiceEdit,
});
const t = useI18n();
useHead({
  title: t('_common.page_title.create_invoice'),
});
const { schema } = useInvoiceSchema();
const { errors, handleSubmit, meta, resetForm, values } = useForm({
  validationSchema: schema,
});
const { data, refetch } = useInvoiceQueryById();
const router = useRouter();
const onSubmit = handleSubmit(values => {
  const notify = () => {
    if (values.email_checkbox && values.mobile_checkbox) {
      return NotifyTypeEnum.MobileEmail;
    }
    if (values.email_checkbox) {
      return NotifyTypeEnum.Email;
    }
    if (values.mobile_checkbox) {
      return NotifyTypeEnum.Mobile;
    }

    return NotifyTypeEnum.None;
  };
  const variables = {
    id: (data.value && data.value.id) || undefined,
    terminal_id: terminal.currentTerminal,
    description: values.content,
    payer_email: values.email,
    payer_name: values.name,
    payer_mobile: values.mobile,
    notify_type: notify(),
    amount: values.amount ? Number(values.amount?.replace(/[^\d]/g, '')) : 0,
    count: values.bill_amount,
    fee_type: values.fracture || SessionFeeTypeEnum.Merchant,
  };
  if (data.value && data.value.id) {
    editMutate(variables);
    editDone(async () => {
      $notify({
        isRead: false,
        message: t('common.success'),
        type: 'success',
      });

      refetch();
      await router.push('/panel/' + terminal.currentDomain + '/invoice');
    });
  } else {
    mutate(variables);
    onDone(async () => {
      $notify({
        isRead: false,
        message: t('common.success'),
        type: 'success',
      });

      resetForm();
      refetch();
      await router.push('/panel/' + terminal.currentDomain + '/invoice');
    });
  }
});

provide('form_errors', errors);
provide('form_submit', onSubmit);
provide('form_meta', meta);
provide('form_loading', loading);
provide('form_loading_edit', editLoading);
provide('form_done', onDone);
provide('form_values', values);
</script>
