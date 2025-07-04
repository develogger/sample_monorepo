import {
  MutationTicketAddArgs,
  MutationTicketAddReply,
  Ticket,
  TicketReply,
} from '@zarindesk/js-sdk/dist/types';

import { useTicketSdk } from './useTicketSdk';

type validationItem = {
  input: string;
  message: string;
  params: string[];
  rule: string;
};
const { service } = useTicketSdk();
const mutateTicketAdd = (
  validationErrorsCb: (input: string, rule: string, params: string[]) => void
) => {
  const { $notify } = useNuxtApp();
  const loading = ref(false);
  const mutate = (data: MutationTicketAddArgs, callBack?: (data?: Ticket) => void) => {
    loading.value = true;
    service
      .ticketAdd(data, [
        'id',
        {
          ticketDepartment: ['id', 'title', 'user_access'],
        },
        'priority',
        'status',
        'title',
        'updated_at',
        'created_at',
      ])
      .then(res => {
        callBack && callBack(res);

        return (loading.value = false);
      })
      .catch(error => {
        loading.value = false;
        if (error.error && error.error[0]) {
          if (error.error[0].readable_code) {
            $notify({
              isRead: false,
              message: error.error[0].fa,
              type: 'error',
            });
          } else {
            error.error[0].validation.forEach((element: validationItem) => {
              validationErrorsCb(element.input, element.rule, element.params);
            });
          }
        }
      });
  };

  return { loading, mutate };
};
const mutateTicketReply = () => {
  const { $notify } = useNuxtApp();
  const loading = ref(false);
  const mutate = (data: MutationTicketAddReply, callBack?: (data?: TicketReply) => void) => {
    loading.value = true;
    service
      .ticketAddReply(data, ['id'])
      .then(res => {
        callBack && callBack(res);

        return (loading.value = false);
      })
      .catch(error => {
        loading.value = false;
        if (error.data && error.error) {
          $notify({
            isRead: false,
            message: error.error[0].fa,
            type: 'error',
          });
        }
      });
  };

  return { loading, mutate };
};
export const useTicketMutation = () => {
  const addTicket = mutateTicketAdd;
  const replyTicket = mutateTicketReply;

  return {
    addTicket,
    replyTicket,
  };
};
