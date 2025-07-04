import { Query } from '@/graphql/graphql';

export const userPayoutBalanceQuery = () => {
  const terminal = useTerminalStore();
  const { loading, onResult, refetch, result } = useQuery<Query>(PayoutBalanceSchema, {
    terminal_id: terminal.currentTerminal,
  });
  const filteredData = computed(() => result.value?.PayoutBalance);

  return {
    data: filteredData,
    loading,
    onResult,
    refetch,
  };
};
