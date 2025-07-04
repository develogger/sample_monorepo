import { Query } from '@/graphql/graphql';

export const useAddressQuery = () => {
  const { loading, onError, refetch, result } = useQuery<Query>(UserAddresschema);
  const filteredData = computed(() => result.value?.Me);

  onError(error => {
    errorHandler(error);
  });

  return {
    data: filteredData,
    loading,
    refetch,
  };
};
