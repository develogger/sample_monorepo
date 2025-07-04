<template>
  <ui-PageHeading
    sticky
    size="xl"
    has-back
    :title="title + ' ' + $t('_common.currency.rial')"
    :description="`${$t('_common.table.reconcile_id')} ${reconciliationId}`"
    :status="getStatusInfo(reconciliationStatus)"
    :loading="loading"
    @back-roll="$router.back()"
  >
  </ui-PageHeading>
</template>
<script setup lang="ts">
import { useReconciliationStatus } from '@/composables/reconciliation/useReconciliationStatus';
import { ReconciliationStatusEnum } from '@/graphql/graphql';

export interface Props {
  reconciliationId?: string;
  title?: string;
  reconciliationStatus: ReconciliationStatusEnum;
  loading: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  reconciliationStatus: undefined,
  reconciliationId: undefined,
});
const { reconciliationId, title, reconciliationStatus, loading } = toRefs(props);
const { getStatusInfo } = useReconciliationStatus();
</script>
