import { Query, ReferrerInvoiceType } from '@/graphql/graphql';

export const useReferrerInvoiceQuery = (fromDate?: string, toDate?: string) => {
  const { loading, onResult, refetch, result } = useQuery<Query>(ReferrerInvoiceSchema, {
    from_date: fromDate,
    to_date: toDate,
  });
  const filteredData = computed(() => {
    if (result.value?.ReferrerInvoice) {
      return result.value.ReferrerInvoice as ReferrerInvoiceType[];
    }
    if (typeof result.value === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData as Ref<ReferrerInvoiceType[]>,
    loading,
    onResult,
    refetch,
  };
};
