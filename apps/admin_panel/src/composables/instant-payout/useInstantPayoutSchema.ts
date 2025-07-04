import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
const { numberFormat } = useMath();
const INSTANT_PAYOUT_MAX_AMOUNT = 5000000000;
export const useInstantPayoutSchema = () => {
  const t = useI18n();
  const schema = toTypedSchema(
    z.object({
      amount: z
        .string({
          required_error: t('_validation.required', { name: t('_form.filters.amount') }),
        })
        .min(9, {
          message: t('_validation.min_amount_value_payout', {
            min: '1,000,000',
            name: t('_form.filters.amount'),
          }),
        })
        .max(13, {
          message: t('_validation.max_amount_value', {
            max: '5,000,000,000',
            name: t('_form.filters.amount'),
          }),
        })
        .refine(
          val => {
            const value = val.replace(/[^\d]/g, '');
            const divisibleRegex = /^[0-9]*0$/;
            if (Number(value) <= INSTANT_PAYOUT_MAX_AMOUNT && divisibleRegex.test(value)) {
              return true;
            }
          },
          (val: string) => {
            const value = val.replace(/[^\d]/g, '');
            const divisibleRegex = /^[0-9]*0$/;

            if (Number(value) >= INSTANT_PAYOUT_MAX_AMOUNT) {
              return {
                message: t('_validation.max_amount_value', {
                  max: numberFormat(INSTANT_PAYOUT_MAX_AMOUNT),
                  name: t('_common.filters.amount'),
                }),
              };
            } else if (!divisibleRegex.test(value)) {
              return {
                message: t('_validation.instant_payout_divisible', {
                  max: numberFormat(INSTANT_PAYOUT_MAX_AMOUNT),
                  name: t('_common.filters.amount'),
                }),
              };
            }

            return {
              required_error: t('_validation.required', { name: t('_form.filters.amount') }),
            };
          }
        ),
    })
  );

  return {
    schema,
  };
};
