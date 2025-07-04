/* eslint-disable */
// @ts-nocheck
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const useZarinLinkSettingBrandingSchema = () => {
  const t = useI18n();

  const { emailValidator, mobileNumberValidator, phoneNumberValidator } = useCustomValidation();

  const schema = toTypedSchema(
    z.object({
      phone: z
        .string()
        .optional()
        .refine(
          value => {
            if (value === undefined || value === '') {
              return true;
            }
            if (value.startsWith('09') || value.startsWith('۰۹')) {
              return mobileNumberValidator(value);
            }
            if (value.startsWith('0') || value.startsWith('۰')) {
              return phoneNumberValidator(value);
            }
          },
          { message: t('_zarin_link.setting.branding.invalid_mobile') }
        ),
      email: z
        .string()
        .refine(value => value === '' || emailValidator(value), {
          message: t('_validation.emailNotValid'),
        })
        .optional(),
      bio: z
        .string()
        .refine(value => value === '' || value.length >= 10, {
          message: t('_validation.min', {
            min: 10,
            name: t('_zarin_link.setting.branding.introduction'),
          }),
        })
        .optional(),
      address: z
        .string()
        .refine(value => value === '' || value.length >= 10, {
          message: t('_validation.min', {
            min: 10,
            name: t('_zarin_link.setting.branding.introduction'),
          }),
        })
        .optional(),
      social_link_0: z
        .string()
        .regex(new RegExp(urlRegex), {
          message: t('_validation.url', {
            name: t('_zarin_link.setting.branding.social_media_link'),
          }),
        })
        .optional(),
      social_link_1: z
        .string()
        .regex(new RegExp(urlRegex), {
          message: t('_validation.url', {
            name: t('_zarin_link.setting.branding.social_media_link'),
          }),
        })
        .optional(),
      social_link_2: z
        .string()
        .regex(new RegExp(urlRegex), {
          message: t('_validation.url', {
            name: t('_zarin_link.setting.branding.social_media_link'),
          }),
        })
        .optional(),
      social_link_3: z
        .string()
        .regex(new RegExp(urlRegex), {
          message: t('_validation.url', {
            name: t('_zarin_link.setting.branding.social_media_link'),
          }),
        })
        .optional(),
      social_link_4: z
        .string()
        .regex(new RegExp(urlRegex), {
          message: t('_validation.url', {
            name: t('_zarin_link.setting.branding.social_media_link'),
          }),
        })
        .optional(),
    })
  );

  return {
    schema,
  };
};
