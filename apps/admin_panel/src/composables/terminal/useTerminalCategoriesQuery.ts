import { Query } from '@/graphql/graphql';
import { TerminalCategoriesSchema } from '@/services/gql/terminal';
import { computed } from 'vue';

export const useTerminalCategoriesQuery = () => {
  const { loading, onError, onResult, refetch, result } = useQuery<Query>(TerminalCategoriesSchema);
  onError(error => {
    errorHandler(error);
  });

  const filteredData = computed(() => {
    if (result.value?.TerminalCategories && _isArray(result.value?.TerminalCategories)) {
      return result.value?.TerminalCategories.flatMap(category => [
        {
          id: category?.id,
          parent_id: category?.parent_id,
          slug: category?.slug,
          title: category?.title,
        },
        ...(category?.children || []),
      ]);
    }
    if (typeof result.value?.TerminalCategories === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData,
    loading,
    onResult,
    refetch,
  };
};
