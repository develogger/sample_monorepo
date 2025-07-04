// import { Value } from '@/components/session/base/FilterCard.vue';
import { ReconciliationStatusEnum } from '@/graphql/graphql';
import { StatusItem } from '@/types/statusItem';

/**
 * handle filter generate
 */
export interface FilterList {
  label: string;
  value: ReconciliationStatusEnum;
}
export function useReconciliationFilter() {
  const t = useI18n();
  const statusHandler = (value: ReconciliationStatusEnum) => {
    switch (value) {
      case ReconciliationStatusEnum.All:
        return {
          text: t('_common.status.ACTIVE'),
          type: 'informative',
        };
      case ReconciliationStatusEnum.Paid:
        return {
          text: t('_common.status.PAID'),
          type: 'informative',
        };
      case ReconciliationStatusEnum.InProgress:
        return {
          text: t('_common.status.PENDING_SHAPARAK'),
          type: 'warning',
        };
      case ReconciliationStatusEnum.Reversed:
        return {
          text: t('_common.status.REVERSED'),
          type: 'positive',
        };
      default:
        return {
          text: '',
        };
    }
  };
  const statusList = ref<StatusItem[]>([
    {
      label: t('_common.status.ALL'),
      value: ReconciliationStatusEnum.All,
    },
    {
      label: t('_common.status.PAID'),
      value: ReconciliationStatusEnum.Paid,
    },
    {
      label: t('_common.status.REVERSED'),
      value: ReconciliationStatusEnum.Reversed,
    },
    {
      label: t('_common.status.PENDING_SHAPARAK'),
      value: ReconciliationStatusEnum.InProgress,
    },
  ]);

  return {
    statusHandler,
    statusList,
  };
}
