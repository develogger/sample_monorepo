<template>
  <div class="pb-3xl w-full container-xl">
    <InvoiceBaseHeader />
    <InvoiceBaseMain />
  </div>
</template>

<script setup lang="ts">
import { TerminalPermissionEnum } from '@/graphql/graphql';
import { useInvoiceQuery } from '@/composables/invoice/useInvoiceQuery';

definePageMeta({
  name: 'invoice',
  layout: 'terminal',
  middleware: ['permission'],
  permission: TerminalPermissionEnum.Invoice,
});
const t = useI18n();
useHead({
  title: t('_common.page_title.invoice'),
});
const route = useRoute();
const config = useRuntimeConfig();
const { convert } = useDate();
const { refetch, data, loading, pagination } = useInvoiceQuery();
onMounted(() => {
  refetch();
});
watch(
  () => route.query,
  () => {
    refetch({
      limit: Number(route.query.pageSize) || config.public.pageSize,
      offset:
        (Number(route.query.pageSize) || config.public.pageSize) *
        ((Number(route.query.page) || config.public.page) - 1),
      filter: route.query.status,
      created_from_date:
        (route.query.from && convert(route.query.from as string, 'jYYYY-jMM-jD', 'YYYY-MM-DD')) ||
        undefined,
      created_to_date:
        (route.query.to && convert(route.query.to as string, 'jYYYY-jMM-jD', 'YYYY-MM-DD')) ||
        undefined,
      min_amount: Number(route.query.moreAmount),
      max_amount: Number(route.query.lessAmount),
      amount: Number(route.query.equalAmount) || undefined,
      id: route.query.id || undefined,
      payer_name: route.query.payer || undefined,
      payer_email: route.query.email || undefined,
      payer_mobile: route.query.mobile || undefined,
      description: route.query.description || undefined,
    });
  }
);
provide('invoice', data);
provide('invoiceLoading', loading);
provide('invoicePagination', pagination);
</script>
