import { ref } from 'vue';

export function useInvoiceColumns() {
  const t = useI18n();
  const columns = ref([
    {
      id: 1,
      label: t('_common.table.total_amount'),
      name: 'amount',
      width: 'minmax(200px,1fr)',
    },
    {
      id: 2,
      label: t('_common.table.payer'),
      name: 'payer_name',
      width: 'minmax(100px,1fr)',
    },
    {
      id: 3,
      label: t('_common.table.id'),
      name: 'id',
      width: 'minmax(80px,1fr)',
    },
    {
      id: 4,
      label: t('_common.date.created_at'),
      name: 'created_at',
      width: 'minmax(100px,1fr)',
    },
    {
      id: 5,
      label: t('_common.table.status'),
      name: 'status',
      width: 'minmax(120px,1fr)',
    },
    {
      id: 6,
      label: '',
      name: 'action',
      width: 'minmax(60px,1fr)',
    },
  ]);
  const detailColumns = ref([
    {
      id: 1,
      label: t('title.amount'),
      name: 'amount',
      width: '25%',
    },
    {
      id: 2,
      label: t('invoice.detail.sessionId'),
      name: 'metadata',
      width: '25%',
    },
    {
      id: 3,
      label: t('invoice.detail.invoiceId'),
      name: 'payer_info',
      width: '25%',
    },
    {
      id: 3,
      label: t('title.status'),
      name: 'status',
      width: '25%',
    },
  ]);

  return {
    columns,
    detailColumns,
  };
}
