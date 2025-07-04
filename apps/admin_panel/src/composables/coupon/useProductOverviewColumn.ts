import { ref } from 'vue';

export function useProductOverviewColumn() {
  const t = useI18n();
  const columns = ref([
    {
      id: 1,
      label: '',
      name: 'mark',
      width: '56px',
    },
    {
      id: 2,
      label: t('_common.table.title'),
      name: 'title',
      width: 'minmax(300px,2fr)',
    },
    {
      id: 3,
      label: t('_common.filters.amount'),
      name: 'amount',
      width: 'minmax(120px,1fr)',
    },
    {
      id: 4,
      label: t('_common.table.link'),
      name: 'link',
      width: 'minmax(120px,1fr)',
    },
  ]);

  return {
    columns,
  };
}
