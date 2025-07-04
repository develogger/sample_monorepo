import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const useAddressSchema = () => {
  const t = useI18n();
  const schema = toTypedSchema(
    z.object({
      address: z
        .string({
          required_error: t('_validation.required', { name: t('_address.add.address') }),
        })
        .min(10, {
          message: t('_validation.min', { min: 10, name: t('_address.add.address') }),
        })
        .max(1024, {
          message: t('_validation.max', { max: 1024, name: t('_address.add.address') }),
        }),

      landline: z
        .string({
          required_error: t('_validation.required', { name: t('_address.add.lanLine') }),
        })
        .min(4, {
          message: t('_validation.min', { min: 4, name: t('_address.add.lanLine') }),
        })
        .max(11, {
          message: t('_validation.max', { max: 11, name: t('_address.add.lanLine') }),
        })
        .regex(/^\d{4,11}$/, {
          message: t('_validation.regex', {
            regex: t('_address.add.lanLine'),
          }),
        }),

      postalCode: z
        .string({
          required_error: t('_validation.required', { name: t('_address.add.postalCode') }),
        })
        .min(10, {
          message: t('_validation.min_num', { min: 10, name: t('_address.add.postalCode') }),
        })
        .max(10, {
          message: t('_validation.max_num', { max: 10, name: t('_address.add.postalCode') }),
        }),
      title: z
        .string({
          required_error: t('_validation.required', { name: t('_address.add.addressName') }),
        })
        .min(3, {
          message: t('_validation.min', { min: 3, name: t('_address.add.addressName') }),
        })
        .max(30, {
          message: t('_validation.max', { max: 30, name: t('_address.add.addressName') }),
        }),
    })
  );

  return {
    schema,
  };
};
