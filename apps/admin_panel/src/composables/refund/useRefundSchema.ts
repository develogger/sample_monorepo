import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const useRefundSchema = ({
  sessionAmount,
  showBalanceAll,
}: {
  sessionAmount: Ref;
  showBalanceAll: Ref;
}) => {
  const t = useI18n();
  const schema = toTypedSchema(
    z.object({
      amount: z
        .string({
          invalid_type_error: t('_validation.number', { name: t('_common.filters.amount') }),
          required_error: t('_validation.required', { name: t('_common.filters.amount') }),
        })
        .optional()
        .refine(
          val => {
            const value = val?.replace(/[^\d]/g, '');
            if (value && Number(value) < 20000) {
              return false;
            }
            if (showBalanceAll.value) {
              return true;
            }
            if (value && Number(value) <= sessionAmount.value) {
              return true;
            }
          },
          val => {
            const value = val?.replace(/[^\d]/g, '');

            return {
              message:
                value && Number(value) < 20000
                  ? t('_validation.min_amount_value', {
                      min: '20,000',
                      name: t('_common.filters.amount'),
                    })
                  : t('_validation.max_amount_value_refund', {
                      max: t('_form.add_refund.all'),
                      name: t('_common.filters.amount'),
                    }),
            };
          }
        ),
      description: z
        .string({
          required_error: t('_validation.required', { name: t('_common.table.description') }),
        })
        .min(4, {
          message: t('_validation.min', { min: 4, name: t('_common.table.description') }),
        }),
      reason: z
        .string({
          required_error: t('_validation.required', {
            name: t('refund.reason'),
          }),
        })
        .refine(
          val => {
            if (val.length) {
              return true;
            }

            return false;
          },
          {
            message: t('_validation.required', { name: t('refund.reason') }),
          }
        ),
    })
  );

  return {
    schema,
  };
};
