import { ref } from 'vue';

export const usePspColumns = () => {
  const t = useI18n();
  const columns = ref([
    {
      id: 1,
      label: t('_common.table.pspTitle'),
      name: 'psp',
      width: '40%',
    },
    {
      id: 2,
      label: t('_common.table.terminalID'),
      name: 'terminal_id',
      width: '20%',
    },
    {
      id: 3,
      label: t('_common.table.merchant_id'),
      name: 'merchant_id',
      width: '25%',
    },
    {
      id: 4,
      label: t('_common.table.status'),
      name: 'status',
      width: '15%',
    },
  ]);

  return {
    columns,
  };
};
