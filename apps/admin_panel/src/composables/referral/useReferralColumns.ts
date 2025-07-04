import { ref } from 'vue';

export function useReferralColumns() {
  const t = useI18n();
  const columns = ref([
    {
      id: 1,
      label: t('_common.table.user_information'),
      name: 'name',
      width: '40%',
    },
    {
      id: 2,
      label: t('_common.table.income'),
      name: 'commission',
      width: '20%',
    },
    {
      id: 3,
      label: t('_common.table.last_activation'),
      name: 'last_session_time',
      width: '20%',
    },
    {
      id: 4,
      label: t('_common.table.registered_date'),
      name: 'registered_at',
      width: '20%',
    },
  ]);
  const invoiceColumns = ref([
    {
      id: 1,
      label: t('_common.filters.date'),
      name: 'from_date',
      width: 'minmax(200px,1fr)',
    },
    {
      id: 2,
      label: t('_common.filters.amount'),
      name: 'amount',
      width: 'minmax(100px,1fr)',
    },
    {
      id: 3,
      label: t('_common.table.status'),
      name: 'status',
      width: 'minmax(100px,1fr)',
    },
  ]);

  return {
    columns,
    invoiceColumns,
  };
}
