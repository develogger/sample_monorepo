export const useRedirectToHome = () => {
  const { active } = useActiveTerminal();
  const homeUrl = computed(() =>
    active?.domain ? `/panel/${encodeURIComponent(active.domain)}/dashboard` : '/panel/overview'
  );

  return { homeUrl };
};
