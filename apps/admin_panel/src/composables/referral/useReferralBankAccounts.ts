import { BankAccount, Query } from '@/graphql/graphql';

export const useReferrerBankAccountsQuery = () => {
  const config = useRuntimeConfig();
  const route = useRoute();
  const { loading, onResult, refetch, result } = useQuery<Query>(BankAccountsSchema, {
    limit: Number(route.query.pageSize) || config.public.pageSize,
    offset:
      (Number(route.query.pageSize) || config.public.pageSize) *
      ((Number(route.query.page) || config.public.page) - 1),
  });
  const filteredData = computed(() => {
    if (result.value?.BankAccounts) {
      return result.value?.BankAccounts as BankAccount[];
    }
    if (typeof result.value === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData as Ref<BankAccount[]>,
    loading,
    onResult,
    refetch,
  };
};
