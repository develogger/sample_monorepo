import { TerminalStatusEnum } from '@/graphql/graphql';

export default defineNuxtRouteMiddleware(async to => {
  const { active } = useActiveTerminal();
  const router = useRouter();
  if (!active || active.status !== TerminalStatusEnum.Active) {
    return router.push(
      `/panel/${encodeURIComponent(active?.domain ?? '')}${to.meta.fallbackRoute}`
    );
  }
});
