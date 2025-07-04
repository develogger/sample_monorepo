import type { Value } from '@/types/value';

import { InvoiceStatusEnum } from '@/graphql/graphql';

export const useInvoiceFilter = () => {
  const t = useI18n();
  const statusHandler = (value: InvoiceStatusEnum) => {
    switch (value) {
      case InvoiceStatusEnum.Pending:
        return {
          text: t('_common.status.PENDING_PAYMENT'),
          type: 'warning',
        };
      case InvoiceStatusEnum.InProgress:
        return {
          text: t('_common.status.IN_BANK'),
          type: 'informative',
        };
      case InvoiceStatusEnum.Paid:
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
  const statusList = ref<Value[]>([
    {
      label: t('_common.status.ALL'),
      value: 'ALL',
    },
    {
      label: t('_common.status.PAYMENT_SUCCESS'),
      value: InvoiceStatusEnum.Paid,
    },
    {
      label: t('_common.status.IN_BANK'),
      value: InvoiceStatusEnum.InProgress,
    },
    {
      label: t('_common.status.PENDING_PAYMENT'),
      value: InvoiceStatusEnum.Pending,
    },
  ]);

  return {
    statusHandler,
    statusList,
  };
};
