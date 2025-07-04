import { NewZarinLinkType, TerminalPermissionEnum } from '@/graphql/graphql';

export const useZarinLinkDetailCouponAction = () => {
  const { hasPermission } = usePermissionValidate(TerminalPermissionEnum.ZarinlinkEdit);
  const actionHandle = (
    id: NewZarinLinkType['id'],
    callback: (code: string, type: string) => void,
    code: string
  ) => {
    const t = useI18n();
    const router = useRouter();
    const { active: terminal } = useActiveTerminal();

    return [
      {
        active: hasPermission.value,
        command: () =>
          router.push({
            path: `/panel/${encodeURIComponent(terminal.domain as string)}/coupon/${id}`,
          }),
        icon: 'PenEdit',
        id: 1,
        label: t('_common.buttons.edit'),
      },
      {
        active: true,
        command: () => callback(code, 'copy'),
        icon: 'Copy',
        id: 2,
        label: t('_common.buttons.copy'),
      },
    ];
  };

  return {
    actionHandle,
  };
};
