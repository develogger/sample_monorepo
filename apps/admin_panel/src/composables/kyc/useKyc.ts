import { KycStatusTypeEnum } from '@/graphql/graphql';

export interface Value {
  label: string;
  name?: string;
  value: string;
}

export const useKyc = () => {
  const t = useI18n();
  const statusHandler = (value: KycStatusTypeEnum) => {
    switch (value) {
      case KycStatusTypeEnum.Completed:
        return {
          text: t('_onboarding.kyc_status.COMPLETED'),
          type: 'positive',
        };
      case KycStatusTypeEnum.NotCompleted:
        return {
          text: t('_onboarding.kyc_status.NOT_COMPLETED'),
          type: 'neutral',
        };
      case KycStatusTypeEnum.Processing:
        return {
          text: t('_onboarding.kyc_status.WAITING'),
          type: 'warning',
        };
      case KycStatusTypeEnum.Rejected:
        return {
          text: t('_onboarding.kyc_status.REJECTED'),
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
    statusHandler,
  };
};
