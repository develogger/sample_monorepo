<template>
  <ui-PageHeading
    sticky
    size="xl"
    has-back
    :description="`${$t('invoice.detail.sessionId')} ${reconciliationId}`"
    :loading="loading"
    :title="title + ' ' + $t('common.rial')"
    :status="statusHandler(invoiceStatus)"
    @back-roll="$router.push(`/panel/${domain}/invoice`)"
  >
  </ui-PageHeading>
</template>
<script setup lang="ts">
import { InvoiceStatusEnum } from '@/graphql/graphql';
import { useInvoiceFilter } from '@/composables/invoice/useInvoiceFilter';

export interface Props {
  reconciliationId?: string;
  title?: string;
  invoiceStatus: InvoiceStatusEnum;
  loading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  invoiceStatus: undefined,
  reconciliationId: undefined,
});
const { reconciliationId, loading, title, invoiceStatus } = toRefs(props);
const domain = useTerminalStore().currentDomain;
const { statusHandler } = useInvoiceFilter();
</script>
