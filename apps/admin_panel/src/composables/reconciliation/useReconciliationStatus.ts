import type { ReconciliationStatusEnum } from '@/graphql/graphql';

/**
 * handle status generate
 */
export function useReconciliationStatus() {
  const t = useI18n();
  const getStatusInfo = (value: ReconciliationStatusEnum) => {
    switch (value) {
      case 'ALL':
        return {
          text: t('status.ALL'),
          type: 'positive',
        };
      case 'PAID':
        return {
          text: t('status.REACHED_AMOUNT'),
          type: 'positive',
        };
      case 'REJECTED':
        return {
          text: t('status.REJECTED'),
          type: 'negative',
        };
      case 'IN_PROGRESS':
        return {
          text: t('status.PENDING_SHAPARAK'),
          type: 'informative',
        };
      case 'REVERSED':
        return {
          text: t('status.REVERSED'),
          type: 'negative',
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
}
