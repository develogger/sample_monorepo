import type { SessionStatusEnum } from '@/graphql/graphql';

/**
 * handle status generate
 */
export function useSessionStatus() {
  const t = useI18n();
  const getStatusInfo = (value: SessionStatusEnum) => {
    switch (value) {
      case 'VERIFIED':
        return {
          text: t('status.VERIFIED'),
          type: 'positive',
        };
      case 'CONFLICTED':
        return {
          text: t('status.CONFLICTED'),
          type: 'warning',
        };
      case 'FAILED':
        return {
          text: t('status.FAILED'),
          type: 'neutral',
        };
      case 'INBANK':
        return {
          text: t('status.INBANK'),
          type: 'informative',
        };
      case 'PAID':
        return {
          text: t('status.PAID'),
          type: 'positive',
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
