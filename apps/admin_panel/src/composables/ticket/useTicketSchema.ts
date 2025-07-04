import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const useTicketSchema = (departmentId: Ref<{ id: number; title: string }>) => {
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
      department: z.string({
        required_error: t('_validation.required', { name: t('_form.addTicket.department') }),
      }),
      sessionId: z
        .string({
          required_error: t('_validation.required', { name: t('_form.addTicket.sessionId') }),
        })
        .max(60, {
          message: t('_validation.max', { max: 60, name: t('_form.addTicket.sessionId') }),
        })
        .optional()
        .refine(
          value => {
            const isNumber = /^\d+$/;
            switch (departmentId.value.id) {
              case 22:
                if (value && value.length > 0 && isNumber.test(value)) {
                  return true;
                } else if (value && value.length > 0 && !isNumber) {
                  return false;
                }

                break;

              default:
                if (!value) {
                  return true;
                }

                break;
            }
          },
          {
            message: t('_validation.number', { name: t('_form.addTicket.sessionId') }),
          }
        ),
      terminal: z
        .string()
        .optional()
        .refine(
          value => {
            switch (departmentId.value.id) {
              case 19:
              case 21:
                if (value && value.length > 0) {
                  return true;
                }

                break;

              default:
                if (!value) {
                  return true;
                }

                break;
            }
          },
          {
            message: t('_validation.required', { name: t('_form.addTicket.terminal') }),
          }
        ),
      title: z
        .string({
          required_error: t('_validation.required', { name: t('_form.addTicket.title') }),
        })
        .min(10, {
          message: t('_validation.min', { min: 10, name: t('_form.addTicket.title') }),
        })
        .max(250, {
          message: t('_validation.max', { max: 250, name: t('_form.addTicket.title') }),
        }),
    })
  );

  return {
    schema,
  };
};
