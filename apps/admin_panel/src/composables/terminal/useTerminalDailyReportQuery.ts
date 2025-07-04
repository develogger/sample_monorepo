import { InputMaybe, Query, QueryDailyReportArgs } from '@/graphql/graphql';
import { TerminalDailyReportSchema } from '@/services/gql/terminal';

const terminalDailyReport = ({
  from_date,
  to_date,
}: {
  from_date?: Ref<InputMaybe<string> | undefined>;
  to_date?: Ref<InputMaybe<string> | undefined>;
}) => {
  const terminalStore = useTerminalStore();
  const { load, loading, onError, refetch, result } = useLazyQuery<Query>(
    TerminalDailyReportSchema,
    {
      from_date,
      terminal_id: terminalStore.currentTerminal,
      to_date,
    } as unknown as QueryDailyReportArgs
  );

  onError(error => {
    errorHandler(error);
  });

  const filteredData = computed(() => {
    if (result.value && !_isEmpty(result.value.DailyReport)) {
      return result.value.DailyReport;
    }
  });

  return {
    data: filteredData,
    load,
    loading,
    refetch,
  };
};

export const useTerminalDailyReportQuery = () => ({
  terminalDailyReport,
});
