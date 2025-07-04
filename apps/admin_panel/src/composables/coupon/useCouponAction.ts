import { CouponType, TerminalPermissionEnum, TerminalStatusEnum } from '@/graphql/graphql';
import { useActiveTerminal } from '@/stores/terminalStore';

export const useCouponAction = () => {
  const actionHandle = (
    id: CouponType['id'],
    deleted_at: CouponType['deleted_at'],
    status: CouponType['status'],
    code: CouponType['code'],
    callback: ((id: CouponType['id'], type: string) => void) | undefined
  ) => {
    const t = useI18n();
    const router = useRouter();
    const { active: terminal } = useActiveTerminal();
    const { hasPermission } = usePermissionValidate(TerminalPermissionEnum.CouponEdit);
    const { $notify } = useNuxtApp();

    return [
      {
        active: hasPermission.value && terminal.status === TerminalStatusEnum.Active,
        command: () => {
          if (deleted_at !== null) {
            $notify({
              isRead: false,
              message: t('_coupon.uneditable'),
              type: 'error',
            });

            return;
          }

          return router.push({
            path: `/panel/${encodeURIComponent(terminal.domain as string)}/coupon/${id}`,
          });
        },
        divider: true,
        icon: 'PenEdit',
        id: 1,
        label: t('_common.buttons.edit'),
      },
      {
        active: true,
        command: () => {
          navigator.clipboard.writeText(code);
          $notify({
            isRead: false,
            message: t('common.copied'),
            type: 'success',
          });
        },
        divider: hasPermission.value,
        icon: 'Copy',
        id: 2,
        label: t('_common.buttons.coupon_copy'),
      },
      {
        active: hasPermission.value && deleted_at !== null ? true : false,
        command: () => callback && callback(id, 'active'),
        icon: 'CheckMarkCircleOutlined',
        id: 3,
        label: t('_common.buttons.active'),
      },
      {
        active: hasPermission.value && deleted_at === null ? true : false,
        command: () => callback && callback(id, 'inactive'),
        icon: 'CircleDelete',
        id: 4,
        label: t('_common.buttons.inactive'),
        style: 'color:rgb(201 54 55)',
      },
    ];
  };

  return {
    actionHandle,
  };
};
