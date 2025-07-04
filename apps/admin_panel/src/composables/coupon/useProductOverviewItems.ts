import { ref } from 'vue';

export function useProductOverviewItems() {
  const t = useI18n();
  const columns = ref([
    {
      id: 1,
      label: t('_common.table.title'),
      name: 'title',
      width: 'minmax(200px,2fr)',
    },
    {
      id: 2,
      label: t('_common.filters.amount'),
      name: 'amount',
      width: 'minmax(100px,1fr)',
    },
    {
      id: 3,
      label: t('_common.table.link'),
      name: 'link',
      width: 'minmax(100px,1fr)',
    },
    {
      id: 4,
      label: '',
      name: 'action',
      width: '64px',
    },
  ]);

  return {
    columns,
  };
}
