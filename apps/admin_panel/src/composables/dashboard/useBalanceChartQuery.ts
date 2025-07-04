import type { Query } from '@/graphql/graphql';

import { useTerminalStore } from './../../stores/terminalStore';

export const useBalanceChartQuery = () => {
  const terminal = useTerminalStore();
  const { loading, onError, result } = useQuery<Query>(BalanceChartSchema, {
    terminal_id: terminal.currentTerminal,
  });
  const filteredData = computed(() => result.value?.BalanceChart);

  onError(error => {
    errorHandler(error);
  });

  return {
    data: filteredData,
    loading,
  };
};
