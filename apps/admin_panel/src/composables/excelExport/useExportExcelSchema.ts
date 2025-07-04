import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const useExcelNameSchema = () => {
  const t = useI18n();
  const schema = toTypedSchema(
    z.object({
      name: z
        .string({
          required_error: t('_validation.required', {
            name: t('_form.export.fileName'),
          }),
        })
        .max(128, {
          message: t('_validation.max', { max: '128', name: t('_form.export.fileName') }),
        }),
    })
  );

  return {
    schema,
  };
};
