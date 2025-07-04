import { Query } from '@/graphql/graphql';

export const useReleaseNoteQuery = () => {
  const { loading, onResult, result } = useQuery<Query>(ReleaseNoteSchema, undefined, {
    fetchPolicy: 'no-cache',
  });
  const filteredData = computed(() => result.value?.ReleaseChangeLogQuery);

  return {
    data: filteredData,
    loading,
    onResult,
  };
};
