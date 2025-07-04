import { ref } from 'vue';

export function useSettingColumns() {
  const t = useI18n();
  const columns = ref([
    {
      id: 1,
      label: t('_common.table.zpId'),
      name: 'zp',
      width: 'minmax(300px,2fr)',
    },
    {
      id: 2,
      label: t('_common.table.permissions'),
      name: 'permission',
      width: 'minmax(100px,10rem)',
    },
    {
      id: 3,
      label: '',
      name: 'action',
      width: '80px',
    },
  ]);

  return {
    columns,
  };
}
