/* eslint-disable */
// @ts-nocheck
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const useZarinLinkEventSchema = () => {
  const t = useI18n();
  const { activeTerminal } = useTerminalQuery();
  const { numberFormat } = useMath();
  const schema = toTypedSchema(
    z
      .object({
        CUSTOM_FIELD_1: z
          .string()
          .refine(
            value => {
              if (!value?.length) return false;
              return true;
            },
            {
              message: t('_validation.required', { name: t('_form.addProduct.field') }),
            }
          )
          .optional(),
        CUSTOM_FIELD_2: z
          .string()
          .refine(
            value => {
              if (!value?.length) return false;
              return true;
            },
            {
              message: t('_validation.required', { name: t('_form.addProduct.field') }),
            }
          )
          .optional(),
        eventType: z.string().optional(),
        limit: z.string().optional(),
        category_id: z.number().optional(),
        spec: z.boolean().optional(),
        specifications: z.any().optional(),
        category: z
          .string({
            required_error: t('_validation.required', {
              name: t('_zarin_link.category'),
            }),
          })
          .refine(
            value => {
              if (value.length > 1) {
                return true;
              }
              return false;
            },
            {
              message: t('_validation.required', {
                name: t('_zarin_link.category'),
              }),
            }
          ),
        subCategory: z
          .string({
            required_error: t('_validation.required', {
              name: t('_zarin_link.sub_category'),
            }),
          })
          .refine(
            value => {
              if (value.length > 1) {
                return true;
              }
              return false;
            },
            {
              message: t('_validation.required', {
                name: t('_zarin_link.sub_category'),
              }),
            }
          ),
        amount: z
          .string({
            invalid_type_error: t('_validation.number', { name: t('_common.filters.amount') }),
            required_error: t('_validation.required', { name: t('_common.filters.amount') }),
          })
          .min(6, {
            message: t('_validation.min_amount_value', {
              min: '10,000',
              name: t('_common.filters.amount'),
            }),
          })
          .refine(
            val => {
              const value = val.replace(/[^\d]/g, '');
              if (
                activeTerminal.value?.max_amount &&
                Number(value) <= activeTerminal.value?.max_amount
              ) {
                return true;
              }
            },
            () => ({
              message: t('_validation.max_amount_value', {
                max: numberFormat(activeTerminal.value?.max_amount),
                name: t('_common.filters.amount'),
              }),
            })
          ),
        backLinkSuccess: z
          .string({
            required_error: t('_validation.required', {
              name: t('_form.addProduct.prev_link_available'),
            }),
          })
          .regex(new RegExp(urlRegex), {
            message: t('_validation.url', { name: t('_form.addProduct.prev_link_available') }),
          })
          .optional(),
        backLinkUnSuccess: z
          .string({
            required_error: t('_validation.required', {
              name: t('_form.addProduct.prev_link_unavailable'),
            }),
          })
          .regex(new RegExp(urlRegex), {
            message: t('_validation.url', { name: t('_form.addProduct.prev_link_unavailable') }),
          })
          .optional(),
        coupon: z.boolean().optional(),
        description: z
          .string({
            required_error: t('_validation.required', { name: t('_common.table.description') }),
          })
          .min(10, {
            message: t('_validation.min', { min: 10, name: t('_common.table.description') }),
          }),
        entity: z
          .number({
            required_error: t('_validation.required', { name: t('_common.table.count') }),
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
                name: t('_common.table.count'),
              }),
            }
          ),
        entitySwitch: z.boolean().optional(),
        link: z.boolean().optional(),
        receipt: z.string().optional(),
        title: z
          .string({
            required_error: t('_validation.required', { name: t('_zarin_link.form.title_input') }),
          })
          .min(3, {
            message: t('_validation.min', { min: 3, name: t('_common.table.title') }),
          })
          .max(128, {
            message: t('_validation.max', { max: 128, name: t('_common.table.title') }),
          }),
        address: z
          .string({
            required_error: t('_validation.required', {
              name: t('_zarin_link.reservation_link.form.address'),
            }),
          })
          .min(10, {
            message: t('_validation.min', {
              min: 10,
              name: t('_zarin_link.reservation_link.form.address'),
            }),
          })
          .optional(),
        event_type: z
          .string({
            required_error: t('_validation.required', {
              name: t('_zarin_link.form.meta_data.event_type'),
            }),
          })
          .refine(
            value => {
              if (value.length > 1) {
                return true;
              }
              return false;
            },
            {
              message: t('_validation.required', {
                name: t('_zarin_link.form.meta_data.event_type'),
              }),
            }
          ),
        start_date: z.string({
          required_error: t('_validation.required', {
            name: t('_zarin_link.form.meta_data.start_date'),
          }),
        }),
        start_time: z
          .string({
            required_error: t('_validation.required', {
              name: t('_zarin_link.form.meta_data.start_time'),
            }),
          })
          .refine(
            value => {
              if (value.length > 1) {
                return true;
              }
              return false;
            },
            {
              message: t('_validation.required', {
                name: t('_zarin_link.form.meta_data.start_time'),
              }),
            }
          ),
        end_time: z
          .string({
            required_error: t('_validation.required', {
              name: t('_zarin_link.form.meta_data.end_time'),
            }),
          })
          .refine(
            value => {
              if (value.length > 1) {
                return true;
              }
              return false;
            },
            {
              message: t('_validation.required', {
                name: t('_zarin_link.form.meta_data.end_time'),
              }),
            }
          ),
        end_date: z.string({
          required_error: t('_validation.required', {
            name: t('_zarin_link.form.meta_data.end_date'),
          }),
        }),
        url: z
          .string({
            required_error: t('_validation.required', {
              name: t('_zarin_link.form.meta_data.url'),
            }),
          })
          .regex(new RegExp(urlRegex), {
            message: t('_validation.url', { name: t('_zarin_link.form.meta_data.url') }),
          })
          .optional(),
        province: z
          .string({
            required_error: t('_validation.required', {
              name: t('_zarin_link.reservation_link.form.province'),
            }),
          })
          .refine(
            value => {
              if (value.length > 1) {
                return true;
              }
              return false;
            },
            {
              message: t('_validation.required', {
                name: t('_zarin_link.reservation_link.form.province'),
              }),
            }
          )
          .optional(),
        city: z
          .string({
            required_error: t('_validation.required', {
              name: t('_zarin_link.reservation_link.form.city'),
            }),
          })
          .refine(
            value => {
              if (value.length > 1) {
                return true;
              }
              return false;
            },
            {
              message: t('_validation.required', {
                name: t('_zarin_link.reservation_link.form.city'),
              }),
            }
          )
          .optional(),
      })
      .refine(
        data => {
          if (data.event_type === 'LOCATION') {
            return data.address && data.province && data.city;
          }
          if (data.event_type === 'ONLINE') {
            return data.url;
          }
          return true;
        },
        {
          message: t('_validation.required_fields_based_on_event_type'),
          path: ['event_type'],
        }
      )
  );

  return {
    schema,
  };
};
