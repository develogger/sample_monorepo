import { Query } from '@/graphql/graphql';

export const useTimeQuery = () => {
  const { loading, onResult, result } = useQuery<Query>(TimeSchema, undefined, {
    fetchPolicy: 'no-cache',
  });
  const filteredData = computed(() => result.value?.Time?.current_time);

  return {
    data: filteredData,
    loading,
    onResult,
  };
};
