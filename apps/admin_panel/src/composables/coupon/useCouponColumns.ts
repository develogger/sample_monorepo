import { ref } from 'vue';

export function useCouponColumns() {
  const t = useI18n();
  const columns = ref([
    {
      id: 1,
      label: t('_common.table.coupon'),
      name: 'code',
      width: 'minmax(210px,1fr)',
    },
    {
      id: 2,
      label: t('_common.table.use_coupon'),
      name: 'used',
      width: 'minmax(100px,1fr)',
    },
    {
      id: 3,
      label: t('_common.table.max_use_coupon'),
      name: 'limit',
      width: 'minmax(100px,1fr)',
    },

    {
      id: 4,
      label: t('_common.date.expire_date'),
      name: 'expired_at',
      width: 'minmax(100px,1fr)',
    },
    {
      id: 5,
      label: t('_common.table.status'),
      name: 'status',
      width: 'minmax(100px,1fr)',
    },
    {
      id: 5,
      label: '',
      name: 'action',
      width: '80px',
    },
  ]);

  return {
    columns,
  };
}
