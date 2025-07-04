import { BankAccountStatusEnum } from '@/graphql/graphql';

/**
 * handle status generate
 */
export const useBankAccountStatus = () => {
  const t = useI18n();
  const getStatusInfo = (value: BankAccountStatusEnum) => {
    switch (value) {
      case BankAccountStatusEnum.Active:
        return {
          text: t('_common.status.ACTIVE'),
          type: 'positive',
        };
      case BankAccountStatusEnum.Inactive:
        return {
          text: t('_common.status.INACTIVE'),
          type: 'neutral',
        };
      case BankAccountStatusEnum.Pending:
        return {
          text: t('_common.status.PENDING'),
          type: 'warning',
        };
      case BankAccountStatusEnum.PendingShaparak:
        return {
          text: t('_common.status.account.PENDING_SHAPARAK'),
          type: 'warning',
        };
      case BankAccountStatusEnum.Rejected:
        return {
          text: t('_common.status.REJECTED'),
          type: 'negative',
        };
      case BankAccountStatusEnum.RejectedShaparak:
        return {
          text: t('_common.status.REJECTED_SHAPARAK'),
          type: 'negative',
        };
      case BankAccountStatusEnum.ZarinCardPending:
        return {
          text: t('_common.status.account.ZARIN_CARD_PENDING'),
          type: 'informative',
        };
      default:
        return {
          text: value,
          type: 'neutral',
        };
    }
  };

  return {
    getStatusInfo,
  };
};
