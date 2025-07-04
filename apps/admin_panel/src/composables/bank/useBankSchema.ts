import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const useBankSchema = ({ isCardPan }: { isCardPan: Ref }) => {
  const t = useI18n();
  const schema = toTypedSchema(
    z.object({
      iban: z
        .string({
          required_error: t('_validation.required', { name: t('_common.table.iban') }),
        })
        .min(24, {
          message: t('_validation.min_num', { min: 24, name: t('_common.table.iban') }),
        })
        .max(24, {
          message: t('_validation.max_num', { max: 24, name: t('_common.table.iban') }),
        })
        .optional()
        .refine(
          val => {
            const isNumber = /^\d+$/;
            if (isCardPan.value) {
              return true;
            } else if (!isCardPan.value && val && isNumber.test(val)) {
              return true;
            } else {
              return false;
            }
          },
          {
            message: t('_validation.number', { name: t('_common.table.iban') }),
          }
        ),
      pan: z
        .string({
          required_error: t('_validation.required', { name: t('_bank_account.card_number') }),
        })
        .min(16, {
          message: t('_validation.min_num', { min: 16, name: t('_bank_account.card_number') }),
        })
        .max(16, {
          message: t('_validation.max_num', { max: 16, name: t('_bank_account.card_number') }),
        })
        .optional()
        .refine(
          val => {
            const isNumber = /^\d+$/;
            if (isCardPan.value && val && val.length === 16 && isNumber.test(val)) {
              return true;
            } else if (!isCardPan.value) {
              return true;
            } else {
              return false;
            }
          },
          {
            message: t('_validation.number', { name: t('_bank_account.card_number') }),
          }
        ),
    })
  );

  return {
    schema,
  };
};
