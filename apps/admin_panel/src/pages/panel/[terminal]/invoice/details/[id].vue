<template>
  <div class="w-full">
    <invoiceDetailsHeader
      :title="headerTitle"
      :reconciliation-id="data?.id"
      :loading="loading"
      :invoice-status="invoiceStatus"
    />
    <invoiceDetailsMain class="container-xl" :data="data" :loading="loading" />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useInvoiceDetailsQueryById } from '@/composables/invoice/useInvoiceDetailsQueryById';
definePageMeta({
  name: 'invoiceDetails',
  layout: 'terminal',
});
const t = useI18n();
useHead({
  title: t('invoice.addInvoice.detail'),
});
const { numberFormat } = useMath();
const { data, loading } = useInvoiceDetailsQueryById();
const headerTitle = computed(() => data.value && numberFormat(data.value?.amount));
const invoiceStatus = computed(() => data.value && data.value?.status);
</script>
