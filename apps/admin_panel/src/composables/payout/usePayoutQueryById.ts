import { PayoutType, Query } from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';
import { computed } from 'vue';

export const usePayoutQueryById = () => {
  const terminal = useTerminalStore();
  const route = useRoute();
  const { loading, onResult, refetch, result } = useQuery<Query>(
    PayoutByIdSchema,
    {
      id: route.params.id,
      terminal_id: terminal.currentTerminal,
    },
    {
      enabled: route.params.id !== 'add',
    }
  );
  const filteredData = computed(() => {
    if (result.value?.Payout && _isArray(result.value?.Payout)) {
      return result.value.Payout[0];
    }
    if (typeof result.value?.Payout === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData as Ref<PayoutType>,
    loading,
    onResult,
    refetch,
  };
};
