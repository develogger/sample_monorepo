import { ref } from 'vue';

export function useTicketColumns() {
  const t = useI18n();
  const columns = ref([
    {
      id: 1,
      label: t('_common.table.id'),
      name: 'id',
      width: '190px',
    },
    {
      id: 2,
      label: t('_common.table.title'),
      name: 'title',
      width: 'minmax(100px, 420px)',
    },
    {
      id: 3,
      label: t('_common.table.updated'),
      name: 'updated',
      width: 'minmax(160px, 150px)',
    },
    {
      id: 4,
      label: t('_common.table.status'),
      name: 'status',
      width: 'minmax(130px, 160px)',
    },
    {
      id: 5,
      label: '',
      name: 'action',
      width: 'minmax(60px, 1fr)',
    },
  ]);

  return {
    columns,
  };
}
