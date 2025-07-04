import { Query } from '@/graphql/graphql';

export const useUserIdQuery = () => {
  const store = useAuthStore();
  const { loading, onError, onResult, refetch, result } = useQuery<Query>(UserIdSchema);
  const { handleAuthRedirect } = useAuth();
  const filteredData = computed(() => {
    const personal_link = result.value?.Me?.personal_link?.domain || ' ';
    store.personal_link = personal_link.slice(10);

    return result.value?.Me;
  });

  onError(error => {
    errorHandler(error);
    handleAuthRedirect();
  });

  return {
    data: filteredData,
    loading,
    onResult,
    refetch,
  };
};
