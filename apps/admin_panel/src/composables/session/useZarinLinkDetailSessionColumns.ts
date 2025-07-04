import { ref } from 'vue';

export function useZarinLinkDetailSessionColumns() {
  const t = useI18n();
  const columns = ref([
    {
      id: 1,
      label: t('title.amount'),
      name: 'amount',
    },
    {
      id: 2,
      label: t('title.session_id'),
      name: 'id',
    },
    {
      id: 3,
      label: t('title.date_time'),
      name: 'created_at',
    },
  ]);

  return {
    columns,
  };
}
