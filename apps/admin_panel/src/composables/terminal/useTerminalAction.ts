import { TerminalFlagEnum, TerminalType } from '@/graphql/graphql';

export const useTerminalAction = () => {
  const actionHandle = (id: TerminalType['id'], flag: TerminalFlagEnum, active: boolean) => {
    const t = useI18n();
    const router = useRouter();
    const { setActiveTerminal, terminals } = useActiveTerminal();

    return [
      {
        active: true,
        command: () => {
          const active = terminals?.find(t => t.id === id);
          if (active) {
            setActiveTerminal(active);

            return router.push(`/panel/${encodeURIComponent(active.domain as string)}/dashboard`);
          }
        },
        id: 1,
        label: t('_terminal.terminalDashboard'),
      },
      {
        active: active,
        command: () => {
          const active = terminals?.find(t => t.id === id);
          if (active) {
            setActiveTerminal(active);

            router.push(`/panel/${encodeURIComponent(active.domain as string)}/settings`);
          }
        },
        id: 2,
        label:
          flag === TerminalFlagEnum.PersonalLink
            ? t('_common.page_title.zarin_link_setting')
            : t('_common.links.terminal_settings'),
      },
    ];
  };

  return {
    actionHandle,
  };
};
