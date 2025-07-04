import { Query } from '@/graphql/graphql';

export const useTicketCountQuery = () => {
  const { loading, onError, result } = useQuery<Query>(UnreadTicketsCountSchema);

  onError(error => {
    errorHandler(error);
  });

  return {
    data: computed(() => result.value && result.value.UnreadTicketsCount),
    loading,
  };
};
