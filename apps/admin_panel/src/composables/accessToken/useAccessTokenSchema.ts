import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const useAccessTokenSchema = () => {
  const t = useI18n();
  const schema = toTypedSchema(
    z.object({
      tokenName: z
        .string({
          required_error: t('_validation.required', {
            name: t('_user.accessToken.personal.heading'),
          }),
        })
        .regex(/^[A-Za-z0-9@._]+$/, {
          message: t('_validation.shouldEnglish', {
            name: t('_user.accessToken.personal.heading'),
          }),
        })
        .min(5, {
          message: t('_validation.min', { min: 5, name: t('_user.accessToken.personal.heading') }),
        })
        .max(20, {
          message: t('_validation.max', { max: 20, name: t('_user.accessToken.personal.heading') }),
        }),
    })
  );

  return {
    schema,
  };
};
