import { Maybe, PaymentTerminalStatusEnum } from '@/graphql/graphql';

export const useTerminalPayoutStatus = () => {
  const t = useI18n();
  /**
   *  handle terminal status
   * @param value PaymentTerminalStatusEnum
   * @returns like: text,type
   */
  const statusHandler = (value: Maybe<PaymentTerminalStatusEnum> | undefined) => {
    switch (value) {
      case 'Active':
        return {
          text: t('_common.status.ACTIVE'),
          type: 'positive',
        };
      case 'DeActive':
        return {
          text: t('_common.status.INACTIVE'),
          type: 'neutral',
        };
      case 'Pending':
        return {
          text: t('_common.status.PENDING'),
          type: 'warning',
        };
      //   case 'PENDING_SHAPARAK':
      //     return {
      //       text: t('_common.status.PENDING_SHAPARAK'),
      //       type: 'warning',
      //     };
      case 'Reject':
        return {
          text: t('_common.status.REJECTED'),
          type: 'negative',
        };
      //   case 'REJECTED_SHAPARAK':
      //     return {
      //       text: t('_common.status.REJECTED_SHAPARAK'),
      //       type: 'negative',
      //     };

      default:
        return {
          text: value,
          type: 'neutral',
        };
    }
  };

  return { statusHandler };
};
