import { InstantPayoutInquiry, Query } from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';

export const inquiryGetData = () => {
  const terminal = useTerminalStore();
  const { loading, onResult, refetch, result } = useQuery<Query>(PayoutInquirySchema, {
    terminal_id: terminal.currentTerminal,
  } as unknown as InstantPayoutInquiry);
  const filteredData = computed(() => {
    if (result.value?.PayoutInquiry) {
      return result.value?.PayoutInquiry;
    }

    return [];
  });

  return {
    data: filteredData as Ref<Query['PayoutInquiry']>,
    loading,
    onResult,
    refetch,
  };
};
export const usePayoutDetails = () => ({
  inquiryGetData,
});
