import { PayoutType } from '@/graphql/graphql';

export const useInstantPayoutAction = () => {
  const actionHandle = (urlCode: PayoutType['url_code']) => {
    const t = useI18n();
    const config = useRuntimeConfig();

    return [
      {
        active: true,
        command: () => window.open(`${config.public.redirect_url}receipt/i/${urlCode}`, '_blank'),
        icon: 'ArrowTopLeft',
        id: 1,
        label: t('_session.show.receipt'),
      },
    ];
  };

  return {
    actionHandle,
  };
};
