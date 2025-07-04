import { Query } from '@/graphql/graphql';
import { UserAnnouncementTypeCustom } from '@/types/userCustomTypes';

export const useUserAnnouncementQuery = () => {
  const { load, loading, onError, onResult, refetch, result } =
    useLazyQuery<Query>(UserAnnouncementSchema);
  const filteredData = computed(() => result.value?.UserAnnouncement);

  onError(error => {
    errorHandler(error);
  });

  return {
    data: filteredData as ComputedRef<UserAnnouncementTypeCustom[]>,
    load,
    loading,
    onResult,
    refetch,
  };
};
