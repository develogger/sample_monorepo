import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
const PAYOUT_MAX_AMOUNT = 5000000000;
const { numberFormat } = useMath();
export const usePayoutSchema = () => {
  const t = useI18n();
  const schema = toTypedSchema(
    z.object({
      amount: z
        .string({
          required_error: t('_validation.required', { name: t('_form.filters.amount') }),
        })
        .min(7, {
          message: t('_validation.min_amount_value_payout', {
            min: '100,000',
            name: t('_form.filters.amount'),
          }),
        })
        .max(13, {
          message: t('_validation.max_amount_value', {
            max: numberFormat(PAYOUT_MAX_AMOUNT),
            name: t('_form.filters.amount'),
          }),
        })
        .refine(
          val => {
            const value = val.replace(/[^\d]/g, '');
            if (Number(value) <= PAYOUT_MAX_AMOUNT) {
              return true;
            }
          },
          {
            message: t('_validation.max_amount_value', {
              max: numberFormat(PAYOUT_MAX_AMOUNT),
              name: t('_common.filters.amount'),
            }),
          }
        ),

      content: z
        .string()
        .optional()
        .refine(val => val === undefined || val.length <= 256, {
          message: t('_validation.max', { max: 256, name: t('_common.table.description') }),
        }),
    })
  );

  return {
    schema,
  };
};
