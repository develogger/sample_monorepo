import {
  CategoryTypeEnum,
  NewZarinLinkType,
  Query,
  ZarinLinkAggregateTransactionsType,
  ZarinLinkTypeEnum,
} from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';
import { computed } from 'vue';

export interface FilteredDataTypeZarinLink extends NewZarinLinkType {
  image: string;
  status: string;
  type: ZarinLinkTypeEnum;
}

export const useZarinLinkListQuery = () => {
  const terminal = useTerminalStore();
  const config = useRuntimeConfig();
  const route = useRoute();
  const { numberFormat } = useMath();
  const date = useDate();
  const { loading, onError, onResult, refetch, result } = useQuery<Query>(NewZarinLinksSchema, {
    amount: Number(route.query.equalAmount) || undefined,
    description: route.query.description || undefined,
    failed_redirect_url: route.query.failed_redirect_url,
    filter: route.query.status,
    id: route.query.zarinLinkId || undefined,
    limit: Number(route.query.pageSize) || config.public.pageSize,
    max_amount: Number(route.query.lessAmount) || undefined,
    min_amount: Number(route.query.moreAmount) || undefined,
    offset:
      (Number(route.query.pageSize) || config.public.pageSize) *
      ((Number(route.query.page) || config.public.page) - 1),
    successful_redirect_url: route.query.successful_redirect_url,
    terminal_id: terminal.currentTerminal,
    title: route.query.title || undefined,
    type: route.query.type,
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
    if (result.value?.NewZarinLinks && _isArray(result.value?.NewZarinLinks)) {
      return result.value.NewZarinLinks.map(p => {
        if (p) {
          return {
            amount: numberFormat(p.amount),
            amount_type: p.amount_type,
            created_at: date.toJalali(p.created_at),
            id: p.id,
            image: (p.images && p.images[0] && p.images[0].url) || '',
            limit: p.limit,
            status: p.deleted_at,
            title: p.title,
            type: p.type,
          } as NewZarinLinkType;
        }
      });
    }
    if (typeof result.value?.NewZarinLinks === 'undefined') {
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

export const useZarinLinkPaymentQueryById = () => {
  const terminal = useTerminalStore();
  const route = useRoute();
  const { activeTerminal, loading: terminalLoading } = useTerminalQuery();
  const { load, loading, onResult, refetch, result } = useLazyQuery<Query>(
    ZarinLinkByIdSchema,
    {
      id: route.params.id,
      terminal_id: terminal.currentTerminal,
      type: 'PAYMENT',
    },
    {
      enabled: route.params.id !== 'add',
      fetchPolicy: 'no-cache',
    }
  );
  const filteredData = computed(() => {
    if (result.value?.NewZarinLinks && _isArray(result.value?.NewZarinLinks)) {
      return result.value.NewZarinLinks[0];
    }
    if (typeof result.value?.NewZarinLinks === 'undefined') {
      return undefined;
    }

    return [];
  });

  watchEffect(() => {
    if (activeTerminal.value?.domain && route.params.id !== 'add') {
      load();
    }
  });

  return {
    data: filteredData as Ref<NewZarinLinkType>,
    loading: computed(() => loading.value || terminalLoading.value),
    onResult,
    refetch,
  };
};

export const useGetZarinLinkEventQueryById = () => {
  const terminal = useTerminalStore();
  const route = useRoute();
  const { activeTerminal, loading: terminalLoading } = useTerminalQuery();
  const { load, loading, onResult, refetch, result } = useLazyQuery<Query>(
    ZarinLinkByIdSchema,
    {
      id: route.params.id,
      terminal_id: terminal.currentTerminal,
      type: 'RESERVATION',
    },
    {
      enabled: route.params.id !== 'add',
      fetchPolicy: 'no-cache',
    }
  );
  const filteredData = computed(() => {
    if (result.value?.NewZarinLinks && _isArray(result.value?.NewZarinLinks)) {
      return result.value.NewZarinLinks[0];
    }
    if (typeof result.value?.NewZarinLinks === 'undefined') {
      return undefined;
    }

    return [];
  });

  watchEffect(() => {
    if (activeTerminal.value?.domain && route.params.id !== 'add') {
      load();
    }
  });

  return {
    data: filteredData as Ref<NewZarinLinkType>,
    loading: computed(() => loading.value || terminalLoading.value),
    onResult,
    refetch,
  };
};

export const useZarinLinkSubscriptionQueryById = () => {
  const terminal = useTerminalStore();
  const route = useRoute();
  const { activeTerminal, loading: terminalLoading } = useTerminalQuery();
  const { load, loading, onResult, refetch, result } = useLazyQuery<Query>(
    ZarinLinkByIdSchema,
    {
      id: route.params.id,
      terminal_id: terminal.currentTerminal,
      type: 'SUBSCRIPTION',
    },
    {
      enabled: route.params.id !== 'add',
      fetchPolicy: 'no-cache',
    }
  );
  const filteredData = computed(() => {
    if (result.value?.NewZarinLinks && _isArray(result.value?.NewZarinLinks)) {
      return result.value.NewZarinLinks[0];
    }
    if (typeof result.value?.NewZarinLinks === 'undefined') {
      return undefined;
    }

    return [];
  });

  watchEffect(() => {
    if (activeTerminal.value?.domain && route.params.id !== 'add') {
      load();
    }
  });

  return {
    data: filteredData as Ref<NewZarinLinkType>,
    loading: computed(() => loading.value || terminalLoading.value),
    onResult,
    refetch,
  };
};
export const useZarinLinkCategoriesQuery = (type: CategoryTypeEnum | null, categoryId?: number) => {
  const { loading, onResult, refetch, result } = useQuery<Query>(
    ZarinLinkCategoriesSchema,
    {
      type,
    },
    {
      fetchPolicy: 'no-cache',
    }
  );
  const filteredData = computed(() => {
    if (result.value?.ZarinLinkCategories && Array.isArray(result.value.ZarinLinkCategories)) {
      return result.value.ZarinLinkCategories.filter(
        category => category && (!categoryId || Number(category.id) === categoryId)
      );
    }
    if (typeof result.value?.ZarinLinkCategories === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData,
    loading,
    onResult,
    refetch,
  };
};

export const useZarinLinkOverviewQuery = () => {
  const terminal = useTerminalStore();
  const { numberFormat } = useMath();
  const { loading, onError, onResult, refetch, result } = useQuery<Query>(
    NewZarinLinksSchema,
    {
      filter: 'PRODUCT_EVENT',
      terminal_id: terminal.currentTerminal,
    },
    {
      fetchPolicy: 'no-cache',
    }
  );
  onError(error => {
    errorHandler(error);
  });

  const filteredData = computed(() => {
    if (result.value?.NewZarinLinks && _isArray(result.value?.NewZarinLinks)) {
      return result.value.NewZarinLinks.map(p => {
        if (p) {
          return {
            amount: numberFormat(p.amount),
            id: p.id,
            image: (p.images && p.images[0] && p.images[0].url) || '',
            status: p.deleted_at,
            title: p.title,
            type: p.type,
          } as FilteredDataTypeZarinLink;
        }
      });
    }
    if (typeof result.value?.NewZarinLinks === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData,
    loading,
    onResult,
    refetch,
  };
};

export const useGetZarinLinkTransactionsAggregateSchema = () => {
  const terminal = useTerminalStore();
  const route = useRoute();
  const { loading, onResult, refetch, result } = useQuery<Query>(
    ZarinLinkTransactionsAggregateSchema,
    {
      relation_id: route.params.id,
      terminal_id: terminal.currentTerminal,
    },
    {
      fetchPolicy: 'no-cache',
    }
  );
  const filteredData = computed(() => {
    if (result.value?.ZarinLinkTransactionsAggregate) {
      return result.value.ZarinLinkTransactionsAggregate;
    }
    if (typeof result.value?.ZarinLinkTransactionsAggregate === 'undefined') {
      return undefined;
    }

    return null;
  });

  return {
    data: filteredData as Ref<ZarinLinkAggregateTransactionsType>,
    loading,
    onResult,
    refetch,
  };
};
export const useZarinLinkProductQueryById = () => {
  const terminal = useTerminalStore();
  const route = useRoute();
  const { activeTerminal, loading: terminalLoading } = useTerminalQuery();
  const { load, loading, onResult, refetch, result } = useLazyQuery<Query>(
    ZarinLinkByIdSchema,
    {
      id: route.params.id,
      terminal_id: terminal.currentTerminal,
      type: 'PRODUCT',
    },
    {
      enabled: route.params.id !== 'add',
      fetchPolicy: 'no-cache',
    }
  );
  const filteredData = computed(() => {
    if (result.value?.NewZarinLinks && _isArray(result.value?.NewZarinLinks)) {
      return result.value.NewZarinLinks[0];
    }
    if (typeof result.value?.NewZarinLinks === 'undefined') {
      return undefined;
    }

    return [];
  });

  watchEffect(() => {
    if (activeTerminal.value?.domain && route.params.id !== 'add') {
      load();
    }
  });

  return {
    data: filteredData as Ref<NewZarinLinkType>,
    loading: computed(() => loading.value || terminalLoading.value),
    onResult,
    refetch,
  };
};
