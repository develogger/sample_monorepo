import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const useInvoiceSchema = () => {
  const t = useI18n();
  const phoneRegex = /^09[0-9]{9}$/;
  const schema = toTypedSchema(
    z.object({
      amount: z
        .string({
          invalid_type_error: t('_validation.number', { name: t('_common.filters.amount') }),
          required_error: t('_validation.required', { name: t('_common.filters.amount') }),
        })
        .max(14, {
          message: t('_validation.max_amount_value', {
            max: '10,000,000,000',
            name: t('_common.filters.amount'),
          }),
        })
        .refine(
          val => {
            const numericValue = Number(val.replace(/[^\d]/g, ''));

            return numericValue % 1000 === 0;
          },
          {
            message: t('_validation.zero_value', {
              name: t('_common.filters.amount'),
            }),
          }
        )
        .refine(
          val => {
            const value = val.replace(/[^\d]/g, '');
            if (Number(value) <= 10000000000) {
              return true;
            }
          },
          {
            message: t('_validation.max_amount_value', {
              max: '10,000,000,000',
              name: t('_common.filters.amount'),
            }),
          }
        )
        .optional(),
      bill_amount: z
        .number({
          required_error: t('_validation.required', { name: t('_form.add_invoice.bill_count') }),
        })
        .max(100, {
          message: t('_validation.max_count', {
            max: 100,
            name: t('_form.add_invoice.bill_count'),
          }),
        })
        .optional(),
      content: z
        .string({
          required_error: t('_validation.required', { name: t('_common.table.description') }),
        })
        .regex(/^(?:\S\s*){3,}$/, {
          message: t('_validation.min', { min: 3, name: t('_common.table.description') }),
        })
        .min(3, {
          message: t('_validation.min', { min: 3, name: t('_common.table.description') }),
        }),
      email: z
        .string()
        .email({
          message: t('_validation.email', {
            name: t('_form.add_invoice.email'),
          }),
        })
        .optional()
        .or(z.literal('')),
      email_checkbox: z.boolean().optional(),
      fracture: z.string().optional(),
      mobile: z
        .string()
        .min(9, {
          message: t('_validation.mobile', {
            name: t('_form.add_invoice.mobile'),
          }),
        })
        .max(15, {
          message: t('_validation.mobile', {
            name: t('_form.add_invoice.mobile'),
          }),
        })
        .refine(value => phoneRegex.test(value), {
          message: t('_validation.mobile', {
            name: t('_form.add_invoice.mobile'),
          }),
        }),
      mobile_checkbox: z.boolean().optional(),
      name: z
        .string()
        .min(3, {
          message: t('_validation.min', { min: 3, name: t('_form.add_invoice.name') }),
        })
        .refine(value => /^[\u0600-\u06FF\s]+$/.test(value), {
          message: t('_validation.only_persian', {
            name: t('_form.add_invoice.name'),
          }),
        }),
    })
  );

  return {
    schema,
  };
};
