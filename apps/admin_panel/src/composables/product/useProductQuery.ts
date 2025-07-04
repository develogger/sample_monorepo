import type { FilteredDataType } from '@/types/filteredDataType';

import { Query, ZarinLinkFilterEnum } from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';
import { computed } from 'vue';

export const useProductQuery = () => {
  const terminal = useTerminalStore();
  const config = useRuntimeConfig();
  const route = useRoute();
  const { numberFormat } = useMath();
  const { loading, onError, onResult, refetch, result } = useQuery<Query>(ProductSchema, {
    amount: Number(route.query.equalAmount) || undefined,
    description: route.query.description || undefined,
    failed_redirect_url: route.query.failed_redirect_url,
    filter: Object.values(ZarinLinkFilterEnum).includes(route.query.status as ZarinLinkFilterEnum)
      ? route.query.status
      : undefined,
    id: route.query.productId || undefined,
    limit: Number(route.query.pageSize) || config.public.pageSize,
    max_amount: Number(route.query.lessAmount) || undefined,
    min_amount: Number(route.query.moreAmount) || undefined,
    offset:
      (Number(route.query.pageSize) || config.public.pageSize) *
      ((Number(route.query.page) || config.public.page) - 1),
    successful_redirect_url: route.query.successful_redirect_url,
    terminal_id: terminal.currentTerminal,
    title: route.query.title || undefined,
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
    if (result.value?.ZarinLinks && _isArray(result.value?.ZarinLinks)) {
      return result.value.ZarinLinks.map(p => {
        if (p) {
          return {
            amount: numberFormat(p.amount),
            id: p.id,
            image: (p.images && p.images[0] && p.images[0].url) || '',
            limit: p.limit,
            link: p.link,
            status: p.deleted_at,
            title: p.title,
          } as FilteredDataType;
        }
      });
    }
    if (typeof result.value?.ZarinLinks === 'undefined') {
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

export const useProductOverviewQuery = () => {
  const terminal = useTerminalStore();
  const route = useRoute();
  const { numberFormat } = useMath();
  const { loading, onError, onResult, refetch, result } = useQuery<Query>(
    ProductOverviewSchema,
    {
      filter: route.query.status,
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
    if (result.value?.ZarinLinks && _isArray(result.value?.ZarinLinks)) {
      return result.value.ZarinLinks.map(p => {
        if (p) {
          return {
            amount: numberFormat(p.amount),
            id: p.id,
            image: (p.images && p.images[0] && p.images[0].url) || '',
            status: p.deleted_at,
            title: p.title,
          } as FilteredDataType;
        }
      });
    }
    if (typeof result.value?.ZarinLinks === 'undefined') {
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
