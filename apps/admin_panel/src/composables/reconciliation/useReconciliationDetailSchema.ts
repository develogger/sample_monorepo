import { ReconciliationType } from '@/graphql/graphql';

export const useReconcilitionDetaiSchema = () => {
  const t = useI18n();
  const { toJalali } = useDate();
  const { numberFormat } = useMath();
  const detailList = reactive([
    {
      title: t('reconcilation.reconcileDetail.totalSession'),
      value: (val: ReconciliationType) =>
        (val.amount && `${numberFormat(val.amount)} ${t('common.rial')}`) ?? '-',
    },
    {
      title: t('reconcilation.reconcileDetail.totalFee'),
      value: (val: ReconciliationType) =>
        (val.fee && `${numberFormat(val.fee)} ${t('common.rial')}`) ?? '-',
    },
    {
      title: t('_common.amount.pension_amount'),
      value: (val: ReconciliationType) =>
        (val.amount && `${numberFormat(val.amount - val.fee)} ${t('common.rial')}`) ?? '-',
    },
    {
      title: t('_common.table.reconcile_id'),
      value: 'id',
    },
    {
      title: t('_common.date.date_time_registration'),
      value: (val: ReconciliationType) => (_isNil(val.payable_at) ? '-' : toJalali(val.payable_at)),
    },
    {
      title: t('common.table.payable_at'),
      value: (val: ReconciliationType) =>
        _isNil(val.reconciled_at) ? '-' : toJalali(val.estimated_payed_at),
    },
    {
      title: t('_common.table.refrenceId'),
      value: (val: ReconciliationType) => val.reference_id ?? '-',
    },
  ]);
  const detailStyle = (index: number) => {
    switch (index) {
      case 0:
        return 'col-span-6 lg:col-span-2 border-b lg:border-0';
      case 1:
        return 'col-span-6 lg:col-span-2 lg:border-r lg:border-l border-b lg:border-0';
      case 2:
        return 'col-span-6 lg:col-span-2 font-medium lg:rounded-tl-sm lg:border-0';
      case 3:
        return 'col-span-6 lg:col-span-2 border-t';
      case 4:
        return 'lg:col-span-2 col-span-6 lg:border-r lg:border-l border-t';
      case 5:
        return 'lg:col-span-2 col-span-6 border-t';
      case 6:
        return 'col-span-6 border-t';
      default:
        break;
    }
  };

  return {
    detailList,
    detailStyle,
  };
};
