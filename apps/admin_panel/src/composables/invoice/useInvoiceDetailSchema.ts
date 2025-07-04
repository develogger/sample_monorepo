import { Invoice, SessionFeeTypeEnum } from '@/graphql/graphql';

export const useInvoiceDetaiSchema = () => {
  const t = useI18n();
  const { toJalali } = useDate();
  const { numberFormat } = useMath();
  const detailList = reactive([
    {
      title: t('invoice.customerName'),
      value: 'payer_name',
    },
    {
      title: t('invoice.detail.payerMobile'),
      value: 'payer_mobile' ?? '-',
    },
    {
      title: t('invoice.detail.payerEmail'),
      value: 'payer_email',
    },
    {
      title: t('invoice.detail.amount'),
      value: (val: Invoice) =>
        (val.amount && `${numberFormat(val.amount)} ${t('common.rial')}`) ?? '-',
    },
    {
      title: t('session.show.fee_payer'),
      value: (val: Invoice) =>
        val.fee_type === SessionFeeTypeEnum.Merchant
          ? t('terminal.edit.merchant')
          : t('terminal.edit.payer'),
    },
    {
      title: t('title.created_time_at'),
      value: (val: Invoice) => (_isNil(val.created_at) ? '-' : toJalali(val.created_at)),
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
      default:
        break;
    }
  };

  return {
    detailList,
    detailStyle,
  };
};
