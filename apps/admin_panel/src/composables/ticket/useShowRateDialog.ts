import { TicketStatusEnum, TicketType } from '@/graphql/graphql';

/**
 * display the rate icon if 10 days have passed since the response
 * @param rate rate of row like: 1,2,... or null
 * @param status such as CLOSED,NEW, ...
 * @param time updated_at row
 */

export const useShowRateDialog = () => {
  const showRateDialog = (
    rate: null | number | undefined,
    status: null | TicketStatusEnum | undefined,
    time: TicketType['updated_at']
  ) => {
    const { substract } = useDate();
    const closedStatus = status === 'CLOSED';
    const updateTime = substract(time, 10, 'days');
    if (!rate && closedStatus && updateTime) {
      return true;
    }

    return false;
  };

  return { showRateDialog };
};
