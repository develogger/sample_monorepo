import {
  Maybe,
  TerminalPermissionEnum,
  TerminalStatusEnum,
  TerminalType,
  ZarinLinkType,
} from '@/graphql/graphql';

import { useActiveTerminal } from './../../stores/terminalStore';

export const useProductAction = () => {
  const { hasPermission } = usePermissionValidate(TerminalPermissionEnum.ProductEdit);
  const actionHandle = (
    status: string,
    id: ZarinLinkType['id'],
    currentTerminal: Maybe<TerminalType> | undefined,
    callback: (id: ZarinLinkType['id'], type: string) => void
  ) => {
    const t = useI18n();
    const router = useRouter();
    const route = useRoute();
    const { active: terminal } = useActiveTerminal();

    return [
      {
        active: hasPermission.value && terminal.status === TerminalStatusEnum.Active,
        command: () =>
          router.push({
            path: `/panel/${encodeURIComponent(terminal.domain as string)}/product/${id}`,
            query: { ...route.query },
          }),
        divider: true,
        icon: 'PenEdit',
        id: 1,
        label: t('_common.buttons.edit'),
      },
      {
        active: true,
        command: () => callback(id, 'copy'),
        icon: 'Copy',
        id: 2,
        label: t('_common.buttons.copy_link'),
      },
      {
        active: true,
        command: () =>
          router.push({
            path: `/panel/${encodeURIComponent(terminal.domain as string)}/session`,
            query: {
              relation_id: id,
              status: 'ACTIVE',
            },
          }),
        divider: !status && currentTerminal && hasPermission.value,
        icon: 'Transaction',
        id: 4,
        label: t('_common.links.session'),
      },
      {
        active: !status && currentTerminal && hasPermission.value ? true : false,
        command: () => callback(id, 'inactive'),
        icon: 'EyeHidden',
        id: 5,
        label: t('_common.buttons.inactive_link'),
        style: 'color:rgb(201 54 55)',
      },
      {
        active: status && currentTerminal && hasPermission.value ? true : false,
        command: () => callback(id, 'active'),
        icon: 'EyeShow',
        id: 6,
        label: t('_common.buttons.active_link'),
      },
    ];
  };

  return {
    actionHandle,
  };
};
