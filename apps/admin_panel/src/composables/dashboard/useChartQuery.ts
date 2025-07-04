import type { Query } from '@/graphql/graphql';

import { useTerminalStore } from '@/stores/terminalStore';

export const useChartQuery = (dateVal?: string) => {
  const terminal = useTerminalStore();
  const { loading, onError, refetch, result } = useQuery<Query>(
    TwoDayChartSchema,
    {
      date: dateVal,
      terminal_id: terminal.currentTerminal,
    },
    () => ({
      fetchPolicy: 'no-cache',
    })
  );
  const filteredData = computed(() => result.value?.TwoDayChart);

  onError(error => {
    errorHandler(error);
  });

  return {
    data: filteredData,
    loading,
    refetch,
  };
};

export const useFetchIncomeChart = () => {
  const terminal = useTerminalStore();
  const { loading, onError, refetch, result } = useQuery<Query>(
    FetchIncomeChartSchema,
    {
      terminal_id: terminal.currentTerminal,
    },
    () => ({
      fetchPolicy: 'no-cache',
    })
  );
  const filteredData = computed(() => result.value?.IncomeChart);

  onError(error => {
    errorHandler(error);
  });

  return {
    data: filteredData,
    loading,
    refetch,
  };
};
