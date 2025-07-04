export const usePspPrioritizeColumns = () => {
  const t = useI18n();
  const columns = ref([
    {
      id: 1,
      label: '',
      name: '',
      width: '20%',
    },
    {
      id: 2,
      label: t('_common.table.pspTitle'),
      name: 'psp',
      width: '80%',
    },
  ]);

  return {
    columns,
  };
};
