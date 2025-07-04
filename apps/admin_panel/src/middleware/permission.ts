import { TerminalPermissionEnum, TerminalStatusEnum } from '@/graphql/graphql';
import { i18n } from '@/locale/i18n';

export default defineNuxtRouteMiddleware(async to => {
  const { get: currentTerminal } = useActiveTerminal();

  if (!currentTerminal) {
    return;
  }
  const permission = to.meta.permission;
  if (!permission) {
    return;
  }

  const { hasPermission } = usePermissionValidate(permission as TerminalPermissionEnum);
  const access = currentTerminal.status === TerminalStatusEnum.Pending && to.name !== 'settings';

  if (!hasPermission.value || access) {
    const { $notify } = useNuxtApp();
    const { t } = i18n.global;

    $notify({
      isRead: false,
      message: t('_common.permission.not_access_this_page'),
      type: 'error',
    });
    const router = useRouter();

    return router.push(
      '/panel/' + encodeURIComponent(currentTerminal.domain as string) + `/dashboard`
    );
  }
});
