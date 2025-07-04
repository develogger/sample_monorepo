import { Query, QueryTerminalUserArgs, TerminalUserType } from '@/graphql/graphql';

export const useTerminalUserQuery = () => {
  const terminalStore = useTerminalStore();
  const { loading, onError, refetch, result } = useQuery<Query>(TerminalUserSchema, {
    terminal_id: terminalStore.currentTerminal,
  } as unknown as QueryTerminalUserArgs);
  const filteredData = computed(() => {
    if (result.value && result.value.TerminalUser) {
      return result.value.TerminalUser as TerminalUserType[];
    }
  });

  onError(error => {
    errorHandler(error);
  });

  return {
    data: filteredData,
    loading,
    refetch,
  };
};
