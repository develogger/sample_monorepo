export default defineNuxtRouteMiddleware(async to => {
  const { active } = useActiveTerminal();
  const { canUserCreateTerminal, needsOnboarding } = useAuth();
  const ALLOWED_ROUTES = [
    '/panel/onboarding',
    '/panel/terminal',
    '/panel/ticket',
    '/panel/user',
    '/panel/referral',
  ];

  if (to.meta.public) {
    return;
  }
  if (canUserCreateTerminal.value) {
    ALLOWED_ROUTES.push('/panel/terminal');
  }
  if (!needsOnboarding.value) {
    ALLOWED_ROUTES.push('/panel/overview');
  }
  if (!active?.id && !ALLOWED_ROUTES.some(route => to.path.includes(route))) {
    if (needsOnboarding.value) {
      return navigateTo('/panel/onboarding');
    }

    return navigateTo('/panel/overview');
  }

  if (to.params.terminal && active.domain !== to.params.terminal) {
    return navigateTo(`/panel/${encodeURIComponent(active.domain as string)}/dashboard`);
  }
});
