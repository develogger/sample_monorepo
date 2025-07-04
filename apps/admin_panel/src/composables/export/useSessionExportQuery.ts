import { Query } from '@/graphql/graphql';

const gqlSessionExportList = () => {
  const { toJalali } = useDate();
  const route = useRoute();
  const { readableBytes } = useMath();
  const config = useRuntimeConfig();
  const { loading, onError, refetch, result } = useQuery<Query>(SessionExportSchema, {
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
    if (result.value && !_isEmpty(result.value.SessionExport)) {
      return result.value.SessionExport?.map(i => {
        if (i) {
          const rowId = <number>result.value?.SessionExport?.indexOf(i) + 1;
          const page = ((route.query.page || config.public.page) as number) - 1;
          const pageSize = (route.query.pageSize || config.public.pageSize) as number;

          return {
            created_at: toJalali(i.created_at),
            index: rowId + page * pageSize,
            name: i.name,
            size: readableBytes(i.size),
            status: i.status,
            url: i.url,
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

export const useSessionExportQuery = () => {
  const sessionExportList = gqlSessionExportList();

  return {
    sessionExportList,
  };
};
