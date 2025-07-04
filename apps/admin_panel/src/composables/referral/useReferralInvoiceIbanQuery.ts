import { Query, ReferrerInvoiceType } from '@/graphql/graphql';

export const useReferrerInvoiceGetIbanQuery = () => {
  const { loading, onResult, refetch, result } = useQuery<Query>(ReferrerInvoiceGetIbanSchema);
  const filteredData = computed(() => {
    if (result.value?.ReferrerInvoiceGetIban) {
      return result.value.ReferrerInvoiceGetIban as ReferrerInvoiceType;
    }
    if (typeof result.value === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData as Ref<ReferrerInvoiceType>,
    loading,
    onResult,
    refetch,
  };
};
