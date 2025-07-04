import type { Value } from '@/types/value';

import { FilterEnum, PayoutStatusEnum } from '@/graphql/graphql';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const usePayoutFilter = () => {
  const t = useI18n();
  const statusHandler = (value: PayoutStatusEnum) => {
    switch (value) {
      case PayoutStatusEnum.Active:
        return {
          text: t('_payout.status.ACTIVE'),
          type: 'informative',
        };
      case PayoutStatusEnum.DeActive:
        return {
          text: t('_payout.status.DE_ACTIVE'),
          type: 'neutral',
        };
      case PayoutStatusEnum.ReachedAmount:
        return {
          text: t('_payout.status.REACHED_AMOUNT'),
          type: 'positive',
        };
      case PayoutStatusEnum.PendingShaparak:
        return {
          text: t('_payout.status.PENDING_SHAPARAK'),
          type: 'warning',
        };
      case PayoutStatusEnum.RejectReversed:
        return {
          text: t('_payout.status.REJECT_REVERSED'),
          type: 'negative',
        };
      case PayoutStatusEnum.Paid:
        return {
          text: t('_payout.status.PAID'),
          type: 'negative',
        };
      case PayoutStatusEnum.Reject:
        return {
          text: t('_payout.status.REJECT'),
          type: 'negative',
        };
      default:
        return {
          text: value,
          type: 'neutral',
        };
    }
  };
  const statusList = ref<Value[]>([
    {
      label: t('_common.status.ALL'),
      value: FilterEnum.All,
    },
    {
      label: t('_common.status.ACTIVE_PAYMENT'),
      value: FilterEnum.Active,
    },
    {
      label: t('_common.status.PAID'),
      value: FilterEnum.ReachedAmount,
    },
    {
      label: t('_common.status.INACTIVE'),
      value: FilterEnum.Trash,
    },
    {
      label: t('_common.status.TRASH'),
      value: FilterEnum.Rejected,
    },
    {
      label: t('_common.status.REJECTED_REVERSED'),
      value: FilterEnum.RejectReversed,
    },
  ]);
  const useFilterSchema = () => {
    const translate = useI18n();
    // Function to validate the number range
    const validateNumRange = (min: number, max: number) =>
      z
        .string()
        .min(min, {
          message: translate('_validation.min_num', {
            min,
            name: translate('_common.filters.amount'),
          }),
        })
        .max(max, {
          message: translate('_validation.max_num', {
            max,
            name: translate('_common.filters.amount'),
          }),
        })
        .optional();

    return toTypedSchema(
      z
        .object({
          equalAmount: validateNumRange(4, 14),
          lessAmount: validateNumRange(4, 14),
          moreAmount: validateNumRange(4, 14),
        })
        .refine(
          data => {
            const less = data.lessAmount && +data.lessAmount.replace(/,/g, '');
            const more = data.moreAmount && +data.moreAmount.replace(/,/g, '');
            if (more && less && more > less) {
              return true;
            }
            if (!more || !less) {
              return true;
            }
          },
          {
            message: translate('_validation.more_than_less'),
            path: ['moreAmount'],
          }
        )
    );
  };

  return {
    statusHandler,
    statusList,
    useFilterSchema,
  };
};
