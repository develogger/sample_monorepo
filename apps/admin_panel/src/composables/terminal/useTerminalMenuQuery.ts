import type { Query } from '@/graphql/graphql';

export const useTerminalMenuQuery = () => {
  const { loading, onError, result } = useQuery<Query>(TerminalListMenuSchema);
  const filteredData = computed(() => result.value?.Terminals);

  onError(error => {
    errorHandler(error);
  });

  return {
    data: filteredData,
    loading,
  };
};
