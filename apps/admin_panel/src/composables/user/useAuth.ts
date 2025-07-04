import { UserLevelEnum } from '@/graphql/graphql';
import axios from 'axios';

export const useAuth = () => {
  const handleAuthRedirect = () => {
    const config = useRuntimeConfig();

    axios
      .post('/api/v4/graphql/out', {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        query: `
        query Connect($redirect: String) {
          Connect(redirect:$redirect)
       }
  `,
        variables: {
          redirect: config.public.redirect_url,
        },
      })
      .then(response => {
        const connect = response.data.data.Connect;
        window.location.replace(connect);

        return response;
      })
      .catch(() => {});
  };
  const isSilverLevelDown = computed(() => {
    const user = useAuthStore();

    return (
      user.userAuth.level === UserLevelEnum.Blue ||
      user.userAuth.level === UserLevelEnum.New ||
      user.userAuth.level === UserLevelEnum.Basic
    );
  });
  const isBlueLevel = computed(() => {
    const user = useAuthStore();

    return (
      user.userAuth.level === UserLevelEnum.Blue || user.userAuth.level === UserLevelEnum.Basic
    );
  });
  const canUserCreateTerminal = computed(() => {
    const { terminals } = useActiveTerminal();
    const user = useAuthStore();
    if (user.userAuth.level !== UserLevelEnum.New) {
      return true;
    }
    if (
      terminals.length > 0 &&
      terminals.filter(t => t.owner_id === user.userAuth.id)?.length > 0
    ) {
      return true;
    }

    return false;
  });
  const needsOnboarding = computed(() => {
    const { terminals } = useActiveTerminal();
    const user = useAuthStore();
    if (terminals.length > 0) {
      return false;
    }
    if (
      user.userAuth.level === UserLevelEnum.Blue ||
      user.userAuth.level === UserLevelEnum.Silver ||
      user.userAuth.level === UserLevelEnum.Gold
    ) {
      return false;
    }

    return true;
  });
  const addTerminalUrl = () => {
    if (canUserCreateTerminal.value) {
      return '/panel/terminal/add';
    }

    return '/panel/onboarding';
  };

  return {
    addTerminalUrl,
    canUserCreateTerminal,
    handleAuthRedirect,
    isBlueLevel,
    isSilverLevelDown,
    needsOnboarding,
  };
};
