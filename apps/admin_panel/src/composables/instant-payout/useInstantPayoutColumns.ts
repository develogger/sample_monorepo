import { ref } from 'vue';

export function useInstantPayoutColumns() {
  const t = useI18n();
  const columns = ref([
    {
      id: 1,
      label: t('_common.table.payout_amount'),
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
      label: t('_common.table.reference_id'),
      name: 'reference_id',
      width: '20%',
    },
    {
      id: 4,
      label: t('_common.date.created_at'),
      name: 'created_at',
      width: '20%',
    },
    {
      id: 5,
      label: t('_common.table.status'),
      name: 'status',
      width: '15%',
    },
    {
      id: 6,
      label: '',
      name: 'action',
      width: '10%',
    },
  ]);

  return {
    columns,
  };
}
