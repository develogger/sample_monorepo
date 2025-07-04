import { TerminalType } from '@/graphql/graphql';
import { TerminalAndMeSchema } from '@/services/gql/terminal';
import axios, { AxiosError } from 'axios';
const { handleAuthRedirect } = useAuth();
export default defineNuxtPlugin(async () => {
  const route = useRoute();
  const authStore = useAuthStore();
  const { fill } = useActiveTerminal();
  authStore.setSpaLoading(true);
  await axios
    .post('/api/v4/graphql', {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      query: TerminalAndMeSchema.loc.source.body,
    })
    .then(response => {
      authStore.setSpaLoading(false);
      authStore.setUserAuth(response.data.data.Me);
      const terminals = response.data.data.Terminals as TerminalType[];
      fill(terminals as unknown as TerminalType[]);

      return terminals;
    })
    .catch((err: AxiosError) => {
      if (err?.response?.status === 401 && !route.meta.public) {
        handleAuthRedirect();
      }
    });
});
