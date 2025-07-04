/* eslint-disable */
// @ts-nocheck
export const useTicketDetailsQuery = () => {
  const { service } = useTicketSdk();
  const ticketStore = useTicketStore();
  const route = useRoute();
  const fetchData = () => {
    if (ticketStore.detailsData?.title) ticketStore.detailsData.title = '';
    ticketStore.detailsLoading = true;
    service
      .getTicketById({ id: route.params.id }, [
        'id',
        'user_id',
        'status',
        'feedback_value',
        'created_at',
        'updated_at',
        'title',
        'model_id',
        {
          ticketReplies: [
            {
              attachments: ['extension', 'url'],
            },
            'content',
            'created_at',
            {
              user: ['id', 'full_name', 'avatar'],
            },
          ],
          user: ['id', 'avatar', 'full_name'],
        },
      ])
      .then(res => {
        if (res) {
          ticketStore.detailsData = res;
        } else {
          navigateTo({ path: '/404' });
        }
      })
      .catch(e => {
        errorHandler(e);
      })
      .finally(() => {
        ticketStore.detailsLoading = false;
      });
  };

  return {
    fetchData,
  };
};
