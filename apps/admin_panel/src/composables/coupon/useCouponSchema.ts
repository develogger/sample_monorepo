import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const useCouponSchema = () => {
  const t = useI18n();
  const schema = toTypedSchema(
    z.object({
      code: z
        .string({
          required_error: t('_validation.required', { name: t('_form.filters.code') }),
        })
        .min(1, {
          message: t('_validation.min', { min: '1', name: t('_common.table.coupon') }),
        })
        .max(99, {
          message: t('_validation.max', { max: '99', name: t('_common.table.coupon') }),
        })
        .regex(/^[a-zA-Z0-9_-]*$/, {
          message: t('_validation.regex', {
            regex: t('_common.table.coupon'),
          }),
        }),
      date: z.string().optional(),
      date_time: z.boolean().optional(),
      discount_percent: z
        .string({
          required_error: t('_validation.required', { name: t('_form.filters.percent') }),
        })

        .regex(/^([1-9][0-9]?)$/, {
          message: t('_validation.numberPercent', { name: t('_form.add_coupon.percent') }),
        })

        .optional(),
      limit: z
        .number({
          required_error: t('_validation.required', { name: t('_form.filters.percent') }),
        })
        .optional()
        .refine(
          val => {
            if (val === undefined) {
              return true;
            }
            if (Number(val) > 0) {
              return true;
            }
          },
          {
            message: t('_validation.min_entity', {
              min: '1',
              name: t('_form.add_coupon.use_count'),
            }),
          }
        ),
      max_switch: z.boolean().optional(),
      maxAmount: z
        .string({
          invalid_type_error: t('_validation.number', { name: t('_common.filters.amount') }),
          required_error: t('_validation.required', { name: t('_common.filters.amount') }),
        })
        .max(13, {
          message: t('_validation.max_amount_value', {
            max: '2,500,000,000',
            name: t('_form.filters.amount'),
          }),
        })
        .refine(
          val => {
            const value = val.replace(/[^\d]/g, '');
            if (Number(value) <= 2500000000) {
              return true;
            }
          },
          {
            message: t('_validation.max_amount_value', {
              max: '2,500,000,000',
              name: t('_common.filters.amount'),
            }),
          }
        ),

      min_amount: z
        .string({
          invalid_type_error: t('_validation.number', { name: t('_common.filters.amount') }),
          required_error: t('_validation.required', { name: t('_common.filters.amount') }),
        })
        .max(13, {
          message: t('_validation.max_amount_value', {
            max: '2,500,000,000',
            name: t('_form.filters.amount'),
          }),
        })
        .refine(
          val => {
            const value = val.replace(/[^\d]/g, '');
            if (Number(value) <= 2500000000) {
              return true;
            }
          },
          {
            message: t('_validation.max_amount_value', {
              max: '2,500,000,000',
              name: t('_common.filters.amount'),
            }),
          }
        ),
      min_switch: z.boolean().optional(),

      product_radio: z.number().optional(),
      time: z.string().optional(),
      use: z.boolean().optional(),
    })
  );

  return {
    schema,
  };
};
