import { Query } from '@/graphql/graphql';

export const useAccessTokenQuery = () => {
  const { toJalali } = useDate();
  const { loading, onError, refetch, result } = useQuery<Query>(UserAccessTokenschema);
  const filteredData = computed(() => {
    if (result.value && !_isEmpty(result.value.AccessTokens)) {
      return result.value.AccessTokens?.map(i => {
        if (i) {
          return {
            avatar: i.avatar,
            client_type: i.client_type,
            country_code: i.country_code,
            current: i.current,
            id: i.id,
            login_ip: i.login_ip,
            name: i.name,
            updated_at: toJalali(i.updated_at),
          };
        }
      });
    }
  });

  onError(error => {
    errorHandler(error);
  });

  return {
    data: filteredData,
    loading,
    refetch,
  };
};
