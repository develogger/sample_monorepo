import { FilterEnum, PayoutStatusEnum, PayoutType, Query } from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';
import { computed } from 'vue';

export interface FilteredDataType extends PayoutType {
  bank_data: {
    description: string;
    iban: string;
    loading: boolean;
    logo: string;
  };
}
export const payoutEditMutation = () => {
  const { error, loading, mutate, onDone, onError } = useMutation(PayoutEditMutationSchema);

  onError(error => {
    errorHandler(error);
  });

  return { error, loading, mutate, onDone, onError };
};

export const usePayoutQuery = () => {
  const terminal = useTerminalStore();
  const config = useRuntimeConfig();
  const route = useRoute();
  const { convertQueryParamDate } = useDate();
  const { loading, onError, onResult, refetch, result } = useQuery<Query>(PayoutSchema, {
    amount: Number(route.query.equalAmount) || undefined,
    created_from_date: route.query.from && convertQueryParamDate(route.query.from as string),
    created_to_date: route.query.to && convertQueryParamDate(route.query.to as string),
    description: route.query.description || undefined,
    filter:
      Object.values(FilterEnum).includes(route.query.status as FilterEnum) ||
      Object.values(PayoutStatusEnum).includes(route.query.status as PayoutStatusEnum)
        ? route.query.status
        : undefined,
    iban: route.query.iban || undefined,
    id: route.query.id || undefined,
    limit: Number(route.query.pageSize) || config.public.pageSize,
    max_amount: Number(route.query.lessAmount) || undefined,
    min_amount: Number(route.query.moreAmount) || undefined,
    offset:
      (Number(route.query.pageSize) || config.public.pageSize) *
      ((Number(route.query.page) || config.public.page) - 1),
    percent: route.query.percent || undefined,
    reference_session_id: route.query.reference || undefined,
    terminal_id: terminal.currentTerminal,
    url_code: route.query.url_code || undefined,
  });
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
    if (result.value?.Payout && _isArray(result.value?.Payout)) {
      return result.value.Payout.map(p => {
        if (p) {
          return {
            ...p,
            amount: Number(p.amount).toLocaleString(),
            created_at: p.created_at,
            fee: Number(p.fee).toLocaleString(),
            reconciled_at: p.reconciled_at,
          } as FilteredDataType;
        }
      });
    }
    if (typeof result.value?.Payout === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData,
    loading,
    onResult,
    pagination,
    payoutEditMutation,
    refetch,
  };
};

export const useActivePayoutAmountQuery = () => {
  const terminal = useTerminalStore();
  const { loading, onResult, refetch, result } = useQuery<Query>(PayoutActiveAmount, {
    terminal_id: terminal.currentTerminal,
  });
  const filteredData = computed(() => {
    if (result.value?.ActivePayoutAmount) {
      return result.value.ActivePayoutAmount;
    }
    if (typeof result.value?.ActivePayoutAmount === 'undefined') {
      return undefined;
    }

    return undefined;
  });

  return {
    data: filteredData as unknown as Ref<string>,
    loading,
    onResult,
    refetch,
  };
};
