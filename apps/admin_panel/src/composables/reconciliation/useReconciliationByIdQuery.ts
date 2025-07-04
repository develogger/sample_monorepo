import { Query, ReconciliationType } from '@/graphql/graphql';
import { computed } from 'vue';

export const useReconciliationQueryById = () => {
  const terminal = useTerminalStore();
  const route = useRoute();
  const { loading, onResult, refetch, result } = useQuery<Query>(SingleReconciliationSchema, {
    id: route.params.id,
    limit: 1,
    sessions_limit: 10,
    terminal_id: terminal.currentTerminal,
  });
  const filteredData = computed(() => {
    if (result.value?.Reconciliation && _isArray(result.value?.Reconciliation)) {
      return result.value.Reconciliation[0];
    }
    if (typeof result.value?.Reconciliation === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData as ComputedRef<ReconciliationType>,
    loading,
    onResult,
    refetch,
  };
};
