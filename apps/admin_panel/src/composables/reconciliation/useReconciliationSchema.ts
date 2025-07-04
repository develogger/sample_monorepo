import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const useReconciliationSchema = () => {
  const t = useI18n();
  const schema = toTypedSchema(
    z.object({
      note: z
        .string({
          required_error: t('_validation.required', { name: t('_form.note.placeHolder') }),
        })
        .max(1000, {
          message: t('_validation.max', { max: 1000, name: t('_form.note.placeHolder') }),
        }),
    })
  );

  return {
    schema,
  };
};
