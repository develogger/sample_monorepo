import { InstantPayoutStatusEnum } from '@/graphql/graphql';
import { StatusItem } from '@/types/statusItem';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const useInstantFilter = () => {
  const t = useI18n();
  const statusHandler = (value: InstantPayoutStatusEnum) => {
    switch (value) {
      case InstantPayoutStatusEnum.Paid:
        return {
          text: t('_common.status.PAID'),
          type: 'positive',
        };
      case InstantPayoutStatusEnum.Pending:
        return {
          text: t('_common.status.PENDING'),
          type: 'warning',
        };
      case InstantPayoutStatusEnum.Rejected:
        return {
          text: t('_common.status.REJECTED'),
          type: 'negative',
        };
      case InstantPayoutStatusEnum.BankRejected:
        return {
          text: t('_common.status.BANK_REJECTED'),
          type: 'negative',
        };
      default:
        return {
          text: value,
          type: 'neutral',
        };
    }
  };
  const statusList = ref<StatusItem[]>([
    {
      label: t('_common.status.ALL'),
      value: 'ALL',
    },
    {
      label: t('_common.status.PAID'),
      value: InstantPayoutStatusEnum.Paid,
    },
    {
      label: t('_common.status.REJECTED'),
      value: InstantPayoutStatusEnum.Rejected,
    },
    {
      label: t('_common.status.BANK_REJECTED'),
      value: InstantPayoutStatusEnum.BankRejected,
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
