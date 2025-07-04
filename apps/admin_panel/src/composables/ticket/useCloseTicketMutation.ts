import { useTicketSdk } from './useTicketSdk';

export const useCloseTicketMutation = () => {
  const { service } = useTicketSdk();
  const loading = ref(false);
  const mutate = (id: string, callBack?: (data?: boolean) => void) => {
    loading.value = true;
    service
      .ticketClose({
        ticket_id: id,
      })
      .then(res => {
        callBack && callBack(res);

        return (loading.value = false);
      })
      .catch(error => {
        loading.value = false;
        errorHandler(error);
      });
  };

  return { loading, mutate };
};
