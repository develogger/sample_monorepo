import {
  Maybe,
  NewZarinLinkType,
  TerminalPermissionEnum,
  TerminalType,
  ZarinLinkTypeEnum,
} from '@/graphql/graphql';

export const useZarinLinkAction = () => {
  const { hasPermission } = usePermissionValidate(TerminalPermissionEnum.ZarinlinkEdit);
  const actionHandle = (
    status: string,
    id: NewZarinLinkType['id'],
    currentTerminal: Maybe<TerminalType> | undefined,
    callback: (id: NewZarinLinkType['id'], type: string) => void,
    type: Maybe<ZarinLinkTypeEnum> | undefined
  ) => {
    const t = useI18n();
    const router = useRouter();
    const { active: terminal } = useActiveTerminal();
    const route = useRoute();

    return [
      {
        active: hasPermission.value,
        command: () =>
          router.push({
            path: `/panel/${encodeURIComponent(
              terminal.domain as string
            )}/zarin-link/${type?.toLocaleLowerCase()}/${id}`,
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
        active: hasPermission.value,
        command: () =>
          router.push({
            path: `/panel/${encodeURIComponent(
              terminal.domain as string
            )}/zarin-link/${type?.toLocaleLowerCase()}/detail-${id}`,
          }),
        icon: 'EyeShow',
        id: 3,
        label: t('_common.buttons.details_preview'),
      },
      {
        active: true,
        command: () => callback(id, 'share'),
        icon: 'Share',
        id: 4,
        label: t('_common.slug.share'),
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
        id: 5,
        label: t('_common.links.session'),
      },
      {
        active: !status && currentTerminal && hasPermission.value ? true : false,
        command: () => callback(id, 'inactive'),
        icon: 'EyeHidden',
        id: 6,
        label: t('_common.buttons.inactive_link'),
        style: 'color:rgb(201 54 55)',
      },
      {
        active: status && currentTerminal && hasPermission.value ? true : false,
        command: () => callback(id, 'active'),
        icon: 'EyeShow',
        id: 7,
        label: t('_common.buttons.active_link'),
      },
    ];
  };

  return {
    actionHandle,
  };
};
