import { InstantPayoutStatusEnum, Query, QueryInstantPayoutArgs } from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';
import { computed } from 'vue';

export const useInstantPayoutQuery = () => {
  const terminal = useTerminalStore();
  const config = useRuntimeConfig();
  const route = useRoute();
  const { convertQueryParamDate } = useDate();
  const { loading, onError, onResult, refetch, result } = useQuery<Query>(InstantPayoutSchema, {
    amount: Number(route.query.equalAmount) || undefined,
    created_from_date: route.query.from && convertQueryParamDate(route.query.from as string),
    created_to_date: route.query.to && convertQueryParamDate(route.query.to as string),
    id: route.query.id || undefined,
    limit: Number(route.query.pageSize) || config.public.pageSize,
    max_amount: Number(route.query.lessAmount) || undefined,
    min_amount: Number(route.query.moreAmount) || undefined,
    offset:
      (Number(route.query.pageSize) || config.public.pageSize) *
      ((Number(route.query.page) || config.public.page) - 1),
    reference_id: route.query.reference || undefined,
    status: Object.values(InstantPayoutStatusEnum).includes(
      route.query.status as InstantPayoutStatusEnum
    )
      ? route.query.status
      : undefined,
    terminal_id: terminal.currentTerminal,
    text: route.query.description || undefined,
    url_code: route.query.url_code || undefined,
  } as unknown as QueryInstantPayoutArgs);
  onError(error => {
    errorHandler(error);
  });
  const pagination = computed(() => {
    if (result.value?.Pagination) {
      return result.value.Pagination[0];
    }

    return [];
  });
  const filteredData = computed(() => {
    if (result.value?.InstantPayout && _isArray(result.value?.InstantPayout)) {
      return result.value.InstantPayout.map(p => {
        if (p) {
          return {
            ...p,
            amount: Number(p.amount).toLocaleString(),
            created_at: p.created_at,
            fee: Number(p.fee).toLocaleString(),
            reconciled_at: p.reconciled_at,
            reference_id: p.reference_id ?? '_',
          };
        }
      });
    }
    if (typeof result.value?.InstantPayout === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData,
    loading,
    onResult,
    pagination,
    refetch,
  };
};
