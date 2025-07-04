import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const useDomainSchema = () => {
  const t = useI18n();
  const regex =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{0,75}[a-zA-Z0-9](?:\.[a-zA-Z]{2,}){1,2}(\/[a-zA-Z0-9-._~%!$&'()*+,;=:@/]*)*$/;
  const schema = toTypedSchema(
    z.object({
      domain: z
        .string({
          required_error: t('_validation.required', {
            name: t('_terminal.add.domain.address'),
          }),
        })
        .min(6, {
          message: t('_validation.min', { min: 6, name: t('_terminal.add.domain.address') }),
        })
        .max(75, {
          message: t('_validation.max', { max: 75, name: t('_terminal.add.domain.address') }),
        })
        .refine(
          value => {
            if (value && regex.test(value)) {
              return true;
            }
          },
          {
            message: t('_validation.regex', {
              _field_: t('_terminal.add.domain.address'),
            }),
          }
        ),
    })
  );

  return {
    schema,
  };
};
export const useUsernameSchema = () => {
  const t = useI18n();
  const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9-_]+$/i;
  const schema = toTypedSchema(
    z.object({
      domain: z
        .string({
          required_error: t('_validation.required', {
            name: t('_terminal.add.domain.zarinlink_address'),
          }),
        })
        .min(3, {
          message: t('_validation.min', {
            min: 3,
            name: t('_terminal.add.domain.zarinlink_address'),
          }),
        })
        .max(25, {
          message: t('_validation.max', {
            max: 25,
            name: t('_terminal.add.domain.zarinlink_address'),
          }),
        })
        .refine(
          value => {
            if (value && regex.test(value)) {
              return true;
            }
          },
          {
            message: t('_validation.regex', {
              _field_: t('_terminal.add.domain.zarinlink_address'),
            }),
          }
        ),
    })
  );

  return {
    schema,
  };
};
export const useTerminalNameSchema = () => {
  const t = useI18n();
  const persianRegex = /^[\u0600-\u06FF\u200C\u200D\s]+$/;
  const schema = toTypedSchema(
    z.object({
      name: z
        .string({
          required_error: t('_validation.required', {
            name: t('_terminal.website_title'),
          }),
        })
        .min(3, {
          message: t('_validation.min', { min: 3, name: t('_terminal.website_title') }),
        })
        .max(75, {
          message: t('_validation.max', { max: 75, name: t('_terminal.website_title') }),
        })
        .refine(
          value => {
            if (value && persianRegex.test(value)) {
              return true;
            }
          },
          {
            message: t('_validation.terminalName', {
              _field_: t('_terminal.website_title'),
            }),
          }
        ),
    })
  );

  return {
    schema,
  };
};
