import { Maybe, PayoutStatusEnum, PayoutType, TerminalStatusEnum } from '@/graphql/graphql';

import { useTerminalStore } from './../../stores/terminalStore';

export const usePayoutAction = () => {
  const actionHandle = (
    percent: PayoutType['percent'],
    reference_session: string | undefined,
    status: Maybe<PayoutStatusEnum> | undefined,
    urlCode: PayoutType['url_code'],
    id: PayoutType['id'],
    callback: (id: PayoutType['id']) => void
  ) => {
    const t = useI18n();
    const router = useRouter();
    const terminal = useTerminalStore();
    const config = useRuntimeConfig();
    const { active: activeTerminal } = useActiveTerminal();

    return [
      {
        active:
          status === PayoutStatusEnum.Active &&
          percent !== undefined &&
          percent !== null &&
          percent < 100,
        command: () => callback(id),
        icon: 'CircleDelete',
        id: 2,
        label: t('_common.actions.cancel_settlement'),
      },
      {
        active: true,
        command: () => window.open(`${config.public.redirect_url}receipt/p/${urlCode}`, '_blank'),
        icon: 'ArrowTopLeft',
        id: 1,
        label: t('_session.show.receipt'),
      },
      {
        active: reference_session,
        command: () => router.push(`/panel/${terminal.currentDomain}/session/${reference_session}`),
        icon: 'Transaction',
        id: 3,
        label: t('_session.show.sessionShow'),
      },
      {
        active:
          status === PayoutStatusEnum.Reject && activeTerminal.status === TerminalStatusEnum.Active,
        command: () => router.push(`/panel/${terminal.currentDomain}/payout/${id}`),
        icon: 'Refresh',
        id: 4,
        label: t('_common.actions.try_again'),
      },
    ];
  };

  return {
    actionHandle,
  };
};
