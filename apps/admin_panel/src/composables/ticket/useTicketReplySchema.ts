import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const useTicketReplySchema = () => {
  const t = useI18n();
  const schema = toTypedSchema(
    z.object({
      content: z
        .string({
          required_error: t('_validation.required', { name: t('_form.addTicket.content') }),
        })
        .min(10, {
          message: t('_validation.min', { min: 10, name: t('_form.addTicket.content') }),
        })
        .max(10000, {
          message: t('_validation.max', { max: 10000, name: t('_form.addTicket.content') }),
        }),
    })
  );

  return {
    schema,
  };
};
