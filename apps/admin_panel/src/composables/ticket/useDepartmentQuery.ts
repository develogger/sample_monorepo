import { useTicketSdk } from './useTicketSdk';

export const useDepartmentQuery = () => {
  const { service } = useTicketSdk();
  const loading = ref(false);
  const response = ref();
  const fetchData = () => {
    loading.value = true;
    service
      .getTicketDepartments(['title', 'id', 'user_access'])
      .then(res => {
        loading.value = false;

        return (response.value = res
          ?.filter(i => i?.user_access)
          .map(i => ({
            id: i?.id ?? '',
            title: i?.title ?? '',
          })));
      })
      .catch(err => {
        loading.value = false;
        errorHandler(err);
      });
  };

  return {
    data: response,
    fetchData,
    loading,
  };
};
