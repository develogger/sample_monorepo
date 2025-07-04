import { TerminalPermissionEnum } from '@/graphql/graphql';

export const usePermissionValidate = (
  permission: TerminalPermissionEnum | TerminalPermissionEnum[]
) => {
  const { active } = useActiveTerminal();
  const hasPermission = computed(() => {
    if (_isArray(permission)) {
      return active && active?.permissions?.some(p => _includes(permission, p));
    }

    return active && _includes(active?.permissions, permission);
  });

  return {
    hasPermission,
  };
};
