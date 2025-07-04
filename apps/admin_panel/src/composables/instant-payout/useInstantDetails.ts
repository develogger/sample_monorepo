import { InstantPayoutInquiry, Query, QueryInstantPayoutInquiryArgs } from '@/graphql/graphql';

import { useTerminalStore } from './../../stores/terminalStore';

export const useInstancePayoutInquiry = () => {
  const terminal = useTerminalStore();
  const { loading, onResult, refetch, result } = useQuery<Query>(
    InstantPayoutInquirySchema,
    {
      bank_account_id: '0',
      terminal_id: terminal.currentTerminal,
    } as unknown as QueryInstantPayoutInquiryArgs,
    () => ({
      fetchPolicy: 'no-cache',
    })
  );
  const filteredData = computed(() => {
    if (result.value?.InstantPayoutInquiry) {
      return result.value?.InstantPayoutInquiry;
    }
    if (typeof result.value?.InstantPayoutInquiry === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData as Ref<InstantPayoutInquiry>,
    loading,
    onResult,
    refetch,
  };
};
