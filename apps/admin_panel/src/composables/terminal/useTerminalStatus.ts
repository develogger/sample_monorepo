import { Maybe, TerminalStatusEnum } from '@/graphql/graphql';

export const useTerminalStatus = () => {
  const t = useI18n();
  /**
   *  handle terminal status
   * @param value TerminalStatusEnum
   * @returns like: text,type
   */
  const statusHandler = (value: Maybe<TerminalStatusEnum> | undefined) => {
    switch (value) {
      case 'ACTIVE':
        return {
          text: t('_common.status.ACTIVE'),
          type: 'positive',
        };
      case 'INACTIVE':
        return {
          text: t('_common.status.INACTIVE'),
          type: 'neutral',
        };
      case 'PENDING':
        return {
          text: t('_common.status.PENDING'),
          type: 'warning',
        };
      case 'PENDING_SHAPARAK':
        return {
          text: t('_common.status.PENDING_SHAPARAK'),
          type: 'warning',
        };
      case 'REJECTED':
        return {
          text: t('_common.status.REJECTED'),
          type: 'negative',
        };
      case 'REJECTED_SHAPARAK':
        return {
          text: t('_common.status.REJECTED_SHAPARAK'),
          type: 'negative',
        };

      default:
        return {
          text: value,
          type: 'neutral',
        };
    }
  };

  return { statusHandler };
};
