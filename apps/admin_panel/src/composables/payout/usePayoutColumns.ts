import { ref } from 'vue';

export function usePayoutColumns() {
  const t = useI18n();
  const columns = ref([
    {
      id: 1,
      label: t('_common.table.iban'),
      name: 'bank_data',
      width: 'minmax(170px, 1fr)',
    },
    {
      id: 2,
      label: t('_common.table.payout_amount'),
      name: 'amount',
      width: '18%',
    },
    {
      id: 3,
      label: t('_common.table.reference_session_id'),
      name: 'url_code',
      width: '15%',
    },
    {
      id: 4,
      label: t('_common.date.created_at'),
      name: 'created_at',
      width: '15%',
    },
    {
      id: 5,
      label: t('_common.table.status'),
      name: 'status',
      width: 'minmax(160px, 1fr)',
    },
    {
      id: 6,
      label: '',
      name: 'action',
      width: 'minmax(50px, 1fr)',
    },
  ]);

  return {
    columns,
  };
}
