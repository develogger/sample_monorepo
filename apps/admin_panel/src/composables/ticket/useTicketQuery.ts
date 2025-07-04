/* eslint-disable */
// @ts-nocheck
import type { PaginationType, TicketType } from '@/graphql/graphql';

/**
 * Transforms the result object into a list of ticket values.
 * Each ticket value contains the necessary information to display a ticket.
 * Returns undefined if the result object or Tickets array is not available.
 *
 * @param result - The result object.
 * @returns The list of ticket values or undefined.
 */
const transformResultToTicketValues = (result: Ref<TicketType[]>) => {
  const { showRateDialog } = useShowRateDialog();
  const date = useDate();
  if (result.value) {
    return result.value.map(ticket => {
      if (ticket) {
        return {
          action: showRateDialog(ticket.feedback_value, ticket.status, ticket.updated_at),
          class: ticket.status === 'CLOSED' ? 'text-text-disabled' : 'text-text',
          id: ticket.id,
          seen: ticket.status === 'CLOSED' || ticket.status === 'IN_PROGRESS',
          status: ticket.status,
          title: ticket.title,
          updated: date.toJalali(ticket.updated_at),
        };
      }
    });
  }
};

export const useTicketQuery = () => {
  const { $notify } = useNuxtApp();
  const store = useTicketStore();
  const { service } = useTicketSdk();
  const response = ref();
  const loading = ref(false);
  const pagination = ref<PaginationType>();
  const route = useRoute();
  const config = useRuntimeConfig();
  const fetchData = (limit?: number) => {
    store.loading = true;
    service
      .getTickets(
        {
          limit: limit ?? (Number(route.query.pageSize) || config.public.pageSize),
          page: route.query.page ? Number(route.query.page) : config.public.page,
        },
        [
          'total',
          'last_page',
          'current_page',
          {
            data: [
              'id',
              'title',
              'status',
              'updated_at',
              'feedback_value',
              {
                user: ['id', 'full_name'],
              },
            ],
          },
        ]
      )
      .then(res => {
        store.pagination = {
          last_page: res.last_page,
          total: res.total,
        };
        response.value = res.data;
        store.data = transformResultToTicketValues(response);
        return (response.value = res.data);
      })
      .catch(e => {
        console.log(e);
        $notify({
          isRead: false,
          message: 'درخواست معتبر نیست.',
          type: 'error',
        });
      })
      .finally(() => {
        store.loading = false;
      });
  };

  return {
    data: computed(() => transformResultToTicketValues(response)),
    fetchData,
    loading,
    pagination,
  };
};
