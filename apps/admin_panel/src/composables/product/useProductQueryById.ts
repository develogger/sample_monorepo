import { Query, ZarinLinkType } from '@/graphql/graphql';
import { computed } from 'vue';

import { useTerminalStore } from './../../stores/terminalStore';

export const useProductQueryById = () => {
  const terminal = useTerminalStore();
  const route = useRoute();
  const { loading, onResult, refetch, result } = useQuery<Query>(
    ProductByIdSchema,
    {
      id: route.params.id,
      terminal_id: terminal.currentTerminal,
    },
    {
      enabled: route.params.id !== 'add',
      fetchPolicy: 'no-cache',
    }
  );
  const filteredData = computed(() => {
    if (result.value?.ZarinLinks && _isArray(result.value?.ZarinLinks)) {
      return result.value.ZarinLinks[0];
    }
    if (typeof result.value?.ZarinLinks === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData as Ref<ZarinLinkType>,
    loading,
    onResult,
    refetch,
  };
};
