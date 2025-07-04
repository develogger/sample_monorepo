import { ref } from 'vue';

export function useTerminalColumns() {
  const t = useI18n();
  const columns = ref([
    {
      id: 1,
      label: t('_form.settings.terminal_title'),
      name: 'name',
      width: 'minmax(180px,1fr)',
    },
    {
      id: 2,
      label: t('_terminal.domain'),
      name: 'domain',
      width: 'minmax(150px,1fr)',
    },
    {
      id: 3,
      label: t('_common.table.status'),
      name: 'status',
      width: '160px',
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
