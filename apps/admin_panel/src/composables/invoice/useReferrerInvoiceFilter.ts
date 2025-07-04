import { ReferrerInvoiceStatusEnum } from '@/graphql/graphql';

export const useReferrerInvoiceFilter = () => {
  const t = useI18n();
  const statusHandler = (value: ReferrerInvoiceStatusEnum) => {
    switch (value) {
      case ReferrerInvoiceStatusEnum.Pending:
        return {
          text: t('_common.status.PENDING_PAYMENT'),
          type: 'warning',
        };
      case ReferrerInvoiceStatusEnum.Paid:
        return {
          text: t('_common.status.PAYMENT_SUCCESS'),
          type: 'positive',
        };

      default:
        return {
          text: '',
        };
    }
  };

  return {
    statusHandler,
  };
};
