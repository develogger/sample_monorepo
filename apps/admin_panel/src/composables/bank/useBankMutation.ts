import { i18n } from '@/locale/i18n';
const { t } = i18n.global;
const mutateBankAccountAdd = () => {
  const { $notify } = useNuxtApp();
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    BankAccountAddMutationSchema
  );

  onError(error => {
    errorHandler(error, err =>
      $notify({
        isRead: false,
        message: t('_validation.' + err?.validation?.[0]?.rule, {
          params: t(`_validation.name.${err?.validation?.[0]?.input}`),
        }),
        type: 'error',
      })
    );
  });

  return { called, error, loading, mutate, onDone, onError };
};
const mutateBankAccountByCardAdd = () => {
  const { $notify } = useNuxtApp();
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    BankAccountByCardAddMutationSchema
  );

  onError(error => {
    errorHandler(error, err => {
      $notify({
        isRead: false,
        message: t('_validation.' + err?.validation?.[0]?.rule, {
          params: t(`_validation.name.${err?.validation?.[0]?.input}`),
        }),
        type: 'error',
      });
    });
  });

  return { called, error, loading, mutate, onDone };
};
const mutatePinBankAccount = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    PinBankAccountMutationSchema
  );
  onError(error => {
    errorHandler(error);
  });

  return { called, error, loading, mutate, onDone, onError };
};
export const useBankMutation = () => {
  const bankAccountAdd = mutateBankAccountAdd;
  const bankAccountPin = mutatePinBankAccount;
  const bankAccountByCardAdd = mutateBankAccountByCardAdd;

  return {
    bankAccountAdd,
    bankAccountByCardAdd,
    bankAccountPin,
  };
};
