import type { Query, SessionType } from '@/graphql/graphql';

import { computed } from 'vue';

export const useSessionQueryById = () => {
  const terminal = useTerminalStore();
  const route = useRoute();
  const { loading, onResult, refetch, result } = useQuery<Query>(SingleSessionSchema, {
    id: route.params.id,
    terminal_id: terminal.currentTerminal,
  });
  const filterData = computed(() => {
    if (result.value?.Session && _isArray(result.value?.Session)) {
      const value = result.value?.Session.map(a => {
        if (a) {
          return {
            ...a,
            note: a?.note,
            notes: a?.notes,
            order_id: a.payer_info?.order_id,
            payer_info: {
              ...a?.payer_info,
              ...(a.session_tries && a.session_tries[0]),
              card_info: a?.session_tries && a?.session_tries[0]?.card_info?.name,
              slug: a?.session_tries && a?.session_tries[0]?.card_info?.slug,
            },
            reconciliation_id: a?.reconciliation_id,
            reference_id: a?.reference_id,
            terminal: a?.terminal,
          };
        }
      });

      return value as SessionType[];
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
