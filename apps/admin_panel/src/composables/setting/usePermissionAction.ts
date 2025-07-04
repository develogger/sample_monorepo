import { TerminalPermissionEnum, TerminalStatusEnum } from '@/graphql/graphql';

export const usePermissionAction = () => {
  const actionHandle = (
    id: string,
    avatar: string,
    name: string,
    zp: string,
    status: string,
    accessList: TerminalPermissionEnum[],
    callback: (
      id: string,
      avatar: string,
      name: string,
      zp: string,
      status: string,
      access_list: TerminalPermissionEnum[],
      type: string
    ) => void
  ) => {
    const t = useI18n();
    const { active: terminal } = useActiveTerminal();

    return [
      {
        active: terminal.status === TerminalStatusEnum.Active,
        command: () => callback(id, avatar, name, zp, status, accessList, 'edit'),
        divider: true,
        icon: 'PenEdit',
        id: 1,
        label: t('_common.buttons.edit'),
      },
      {
        active: true,
        command: () => callback(id, avatar, name, zp, status, accessList, 'delete'),
        icon: 'Trash',
        id: 2,
        label: t('_common.buttons.remove_session'),
        style: 'color:rgb(201 54 55)',
      },
    ];
  };

  return {
    actionHandle,
  };
};
