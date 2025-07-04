import { ref } from 'vue';

export function useSessionExportColumns() {
  const t = useI18n();
  const columns = ref([
    {
      id: 1,
      label: '#',
      name: 'index',
      width: '60px',
    },
    {
      id: 2,
      label: t('_form.export.fileName'),
      name: 'name',
      width: 'minmax(200px, 2fr)',
    },
    {
      id: 3,
      label: t('_common.table.size'),
      name: 'size',
      width: 'minmax(100px, 1fr)',
    },
    {
      id: 4,
      label: t('_common.date.created_at'),
      name: 'created_at',
      width: 'minmax(100px, 1fr)',
    },
    {
      id: 5,
      label: t('_common.table.status'),
      name: 'status',
      width: 'minmax(100px, 1fr)',
    },
    {
      id: 6,
      label: '',
      name: 'action',
      width: '60px',
    },
  ]);

  return {
    columns,
  };
}
