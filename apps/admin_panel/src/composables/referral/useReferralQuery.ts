import { Query, QueryReferrersReportArgs, Referrers } from '@/graphql/graphql';

export const useReferralQuery = () => {
  const config = useRuntimeConfig();
  const route = useRoute();
  const { loading, onResult, refetch, result } = useQuery<Query>(ReferralSchema, {
    limit: Number(route.query.pageSize) || config.public.pageSize,
    offset:
      (Number(route.query.pageSize) || config.public.pageSize) *
      ((Number(route.query.page) || config.public.page) - 1),
  } as QueryReferrersReportArgs);
  const pagination = computed(() => {
    if (result.value?.Pagination) {
      return result.value.Pagination[0];
    }

    return [];
  });
  const filteredData = computed(() => {
    if (result.value?.ReferrersReport) {
      return result.value.ReferrersReport as Referrers;
    }
    if (typeof result.value === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData as Ref<Referrers>,
    loading,
    onResult,
    pagination,
    refetch,
  };
};
