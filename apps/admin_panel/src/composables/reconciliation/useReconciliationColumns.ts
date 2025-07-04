import { ref } from 'vue';

export function useReconciliationColumns() {
  const t = useI18n();
  const dashboardColumns = ref([
    {
      id: 1,
      label: t('_common.amount.pension_amount'),
      name: 'amount',
      width: '100%',
    },
  ]);
  const columns = ref([
    {
      id: 1,
      label: t('_common.amount.pension_amount'),
      name: 'amount',
      width: '20%',
    },
    {
      id: 2,
      label: t('_common.table.reconcile_id'),
      name: 'id',
      width: '15%',
    },
    {
      id: 3,
      label: t('_common.table.refrenceId'),
      name: 'reference_id',
      width: '29%',
    },
    {
      id: 4,
      label: t('_common.table.payable_at'),
      name: 'estimated_payed_at',
      width: '20%',
    },
    {
      id: 5,
      label: t('_common.table.status'),
      name: 'status',
      width: '16%',
    },
  ]);
  const detailColumns = ref([
    {
      id: 1,
      label: t('_common.filters.amount'),
      name: 'amount',
      width: '35%',
    },
    {
      id: 2,
      label: t('_common.table.session_id'),
      name: 'id',
      width: '35%',
    },
    {
      id: 3,
      label: t('_common.date.date_time'),
      name: 'created_at',
      width: '30%',
    },
  ]);

  return {
    columns,
    dashboardColumns,
    detailColumns,
  };
}
