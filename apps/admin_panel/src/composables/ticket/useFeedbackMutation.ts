import { useTicketSdk } from './useTicketSdk';

export const useFeedbackMutation = () => {
  const { service } = useTicketSdk();
  const loading = ref(false);
  const { $notify } = useNuxtApp();
  const mutate = (value: number, id: string, callBack?: (data?: boolean) => void) => {
    loading.value = true;
    service
      .ticketFeedback({
        feedback_value: value,
        ticket_id: id,
      })
      .then(res => {
        callBack && callBack(res);

        return (loading.value = false);
      })
      .catch(error => {
        loading.value = false;
        error.error &&
          $notify({
            isRead: false,
            message: error.error[0].fa,
            type: 'error',
          });
      });
  };

  return { loading, mutate };
};
