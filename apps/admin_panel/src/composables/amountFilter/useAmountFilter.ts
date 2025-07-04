import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const useAmountFilter = () => {
  const { numberFormat } = useMath();
  const t = useI18n();
  const amountHandler = (lessAmount: string, moreAmount: string, equalAmount: string) => {
    if (equalAmount && !Number(equalAmount)) {
      return undefined;
    }
    if (lessAmount && !Number(lessAmount)) {
      return undefined;
    }
    if (moreAmount && !Number(moreAmount)) {
      return undefined;
    }

    if (lessAmount && moreAmount) {
      return `${t('_common.filters.amount')}: ${t('_common.date.from')} ${numberFormat(
        moreAmount
      )} ${t('_common.date.to')} ${numberFormat(lessAmount)} ${t('_common.currency.rial')}`;
    } else if (lessAmount) {
      return `${t('_common.filters.amount')}: ${t('_common.amount.less')} ${numberFormat(
        lessAmount
      )} ${t('_common.currency.rial')}`;
    } else if (moreAmount) {
      return `${t('_common.filters.amount')}: ${t('_common.amount.more')} ${numberFormat(
        moreAmount
      )} ${t('_common.currency.rial')}`;
    } else if (equalAmount) {
      return `${t('_common.filters.amount')}: ${t('_common.amount.equal')} ${numberFormat(
        equalAmount
      )} ${t('_common.currency.rial')}`;
    }
  };
  const useFilterSchema = () => {
    const translate = useI18n();
    // Function to validate the number range
    const validateNumRange = (min: number, max: number) =>
      z
        .string({
          required_error: translate('_validation.required', {
            name: translate('_common.filters.amount'),
          }),
        })
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
          dropDown: z.string().optional(),
          equalAmount: validateNumRange(4, 14),
          lessAmount: validateNumRange(4, 14),
          moreAmount: validateNumRange(4, 14),
        })
        .refine(
          data => {
            const isNumber = /^\d+$/;
            const less =
              data.lessAmount &&
              isNumber.test(data.lessAmount) &&
              +data.lessAmount.replace(/,/g, '');
            const more =
              data.moreAmount &&
              isNumber.test(data.moreAmount) &&
              +data.moreAmount.replace(/,/g, '');
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
    amountHandler,
    amountSchema: useFilterSchema,
  };
};
