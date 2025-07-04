import { Query } from '@/graphql/graphql';

export const useNotificationQuery = () => {
  const { loading, onError, onResult, refetch, result } = useQuery<Query>(UserNotificationSchema);
  const filteredData = computed(() => result.value?.Me);

  onError(error => {
    errorHandler(error);
  });

  return {
    data: filteredData,
    loading,
    onResult,
    refetch,
  };
};
