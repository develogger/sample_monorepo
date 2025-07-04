import { Query } from '@/graphql/graphql';

const gqlTerminaltList = () => {
  const route = useRoute();
  const config = useRuntimeConfig();
  const { loading, onError, refetch, result } = useQuery<Query>(TerminalListSchema, {
    limit: Number(route.query.pageSize) || config.public.pageSize,
    offset:
      (Number(route.query.pageSize) || config.public.pageSize) *
      ((Number(route.query.page) || config.public.page) - 1),
  });

  onError(error => {
    errorHandler(error);
  });

  const pagination = computed(() => {
    if (result.value && !_isEmpty(result.value.Pagination)) {
      if (result.value?.Pagination) {
        return result.value?.Pagination[0];
      }
    }
  });
  const filteredData = computed(() => {
    if (result.value && !_isEmpty(result.value.Terminals)) {
      return result.value.Terminals?.map(i => {
        if (i) {
          return {
            domain: i.domain,
            id: i.id,
            logo: i.logo,
            name: i.name,
            status: i.status,
          };
        }
      });
    }
  });

  return {
    data: filteredData,
    loading,
    pagination,
    refetch,
  };
};

export const useTerminalListQuery = () => {
  const terminalList = gqlTerminaltList();

  return {
    terminalList,
  };
};
