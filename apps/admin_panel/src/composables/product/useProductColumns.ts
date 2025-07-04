import { ref } from 'vue';

export function useProductColumns() {
  const t = useI18n();
  const columns = ref([
    {
      id: 1,
      label: t('_common.table.title'),
      name: 'title',
      width: 'minmax(300px,2fr)',
    },
    {
      id: 2,
      label: t('_common.filters.amount'),
      name: 'amount',
      width: 'minmax(100px,10rem)',
    },
    {
      id: 3,
      label: t('_common.table.count'),
      name: 'limit',
      width: 'minmax(100px,10rem)',
    },
    {
      id: 5,
      label: t('_common.table.payment_link'),
      name: 'status',
      width: 'minmax(60px,10rem)',
    },
    {
      id: 6,
      label: '',
      name: 'action',
      width: '80px',
    },
  ]);

  return {
    columns,
  };
}
