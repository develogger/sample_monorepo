import { TicketStatusEnum } from '@/graphql/graphql';

/**
 * handle status generate
 */
export function useTicketStatus() {
  const t = useI18n();
  const statusHandler = (value: TicketStatusEnum) => {
    switch (value) {
      case TicketStatusEnum.All:
        return {
          text: t('_common.status.ALL'),
          type: 'neutral',
        };
      case TicketStatusEnum.Closed:
        return {
          text: t('_common.status.CLOSED'),
          type: 'neutral',
        };
      case TicketStatusEnum.New:
        return {
          text: t('_common.status.NEW'),
          type: 'positive',
        };
      case TicketStatusEnum.InProgress:
        return {
          text: t('_common.status.IN_PROGRESS'),
          type: 'warning',
        };
      case TicketStatusEnum.SupportResponse:
        return {
          text: t('_common.status.RESPONSE'),
          type: 'warning',
        };
      default:
        return {
          text: value,
          type: 'neutral',
        };
    }
  };

  return {
    statusHandler,
  };
}
