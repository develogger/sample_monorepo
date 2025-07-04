import { Query, SessionType } from '@/graphql/graphql';
import { SessionTypeSchema } from '@/services/gql/session';
import { computed } from 'vue';

export const useSessionTypeQuery = () => {
  const terminal = useTerminalStore();
  const { loading, onResult, refetch, result } = useQuery<Query>(SessionTypeSchema, {
    terminal_id: terminal.currentTerminal,
  });
  const filterData = computed(() => {
    if (result.value?.Session && _isArray(result.value?.Session)) {
      return result.value?.Session as SessionType[];
    }
    if (typeof result.value?.Session === 'undefined') {
      return undefined;
    }

    return [] as SessionType[];
  });

  return {
    loading,
    onResult,
    refetch,
    result: filterData,
  };
};
