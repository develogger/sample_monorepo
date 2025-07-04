import { ExportStatusEnum, FilterEnum } from '@/graphql/graphql';

/**
 * handle status generate
 */
export function useSessionExportStatus() {
  const t = useI18n();
  const filterHandler = (filter: string) => {
    switch (filter) {
      case FilterEnum.Active:
        return FilterEnum.Active;
      case FilterEnum.Paid:
        return FilterEnum.Paid;
      case FilterEnum.All:
        return FilterEnum.All;
      case FilterEnum.Trash:
        return FilterEnum.Trash;
      case 'REVERSED':
        return FilterEnum.RejectReversed;
      case 'IN_PROGRESS':
        return FilterEnum.All;
      case 'REACHED_AMOUNT':
        return FilterEnum.Paid;
      default:
        return FilterEnum.All;
    }
  };
  const getStatusInfo = (value: ExportStatusEnum) => {
    switch (value) {
      case ExportStatusEnum.Done:
        return {
          text: t('_common.status.sessionExport.DONE'),
          type: 'positive',
        };
      case ExportStatusEnum.Pending:
        return {
          text: t('_common.status.sessionExport.PENDING'),
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
    filterHandler,
    getStatusInfo,
  };
}
