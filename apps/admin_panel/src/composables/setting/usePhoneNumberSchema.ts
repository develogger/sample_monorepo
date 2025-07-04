import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const usePhoneNumberSchema = () => {
  const t = useI18n();
  const phoneRegex = /^\d{4,11}$/;
  const schema = toTypedSchema(
    z.object({
      bank_account_id: z
        .string({
          required_error: t('_validation.required', {
            name: t('refund.reason'),
          }),
        })
        .optional(),
      phoneNumber: z
        .string()
        .min(1, {
          message: t('_validation.required', {
            name: t('_validation.name.phoneNumber'),
          }),
        })
        .max(15, {
          message: t('_validation.phone', {
            name: t('_validation.name.phoneNumber'),
          }),
        })
        .refine(value => phoneRegex.test(value), {
          message: t('_validation.phone', {
            name: t('_validation.name.phoneNumber'),
          }),
        }),
    })
  );

  return {
    schema,
  };
};

export const useIpServerSchema = ({
  ipRadio,
}: {
  bankAccountId: Ref<string>;
  ipRadio: Ref<string>;
}) => {
  const t = useI18n();
  const ipRegex =
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const schema = toTypedSchema(
    z.object({
      bank_account_id: z
        .string({
          required_error: t('_validation.required', {
            name: t('refund.reason'),
          }),
        })
        .optional(),
      server_ip: z
        .string({
          required_error: t('_validation.required', { name: t('_common.filters.amount') }),
        })
        .optional()
        .refine(
          value => {
            if (ipRadio.value === 'withIp' && value && ipRegex.test(value)) {
              return true;
            } else if (ipRadio.value === 'withOutIp') {
              return true;
            }

            return false;
          },
          {
            message: t('_validation.regex', {
              regex: 'IP',
            }),
          }
        ),
    })
  );

  return {
    schema,
  };
};

export const usePermissionSchema = () => {
  const schema = toTypedSchema(
    z.object({
      user_id: z.string().optional(),
    })
  );

  return {
    schema,
  };
};
