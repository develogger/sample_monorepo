import { i18n } from '@/locale/i18n';

const mutateTerminalEdit = (
  validationErrorsCb: (input: string, rule: string, params: string[]) => void
) => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    TerminalEditMutationSchema
  );
  onError(error => {
    const { $notify } = useNuxtApp();
    const { t } = i18n.global;

    errorHandler(error, value => {
      value?.validation.forEach(element => {
        if (element.input === 'bank_account_id') {
          $notify({
            isRead: false,
            message: t('_validation.' + element.rule, {
              _field_: t(`_validation.name.${element.input}`),
              name: t(`_validation.name.select_${element.input}`),
            }),
            type: 'error',
          });
        } else {
          validationErrorsCb(element.input, element.rule, element.params);
        }
      });
    });
  });

  return { called, error, loading, mutate, onDone, onError };
};
const mutateTerminalAdd = () => {
  const { called, error, loading, mutate, onDone, onError } =
    useMutation(TerminalAddMutationSchema);
  onError(error => {
    const { t } = i18n.global;
    const { $notify } = useNuxtApp();
    errorHandler(error, err =>
      $notify({
        isRead: false,
        message: t('_validation.' + err?.validation?.[0]?.rule, {
          _field_: t(`_validation.name.${err?.validation?.[0]?.input}`),
          max: err?.validation?.[0]?.params?.[0],
          min: err?.validation?.[0]?.params?.[0],
          name: t(`_validation.name.${err?.validation?.[0]?.input}`),
        }),
        type: 'error',
      })
    );
  });

  return { called, error, loading, mutate, onDone, onError };
};
const mutatePinTerminal = () => {
  const { called, error, loading, mutate, onDone, onError } =
    useMutation(PinTerminalMutationSchema);
  onError(error => {
    errorHandler(error);
  });

  return { called, error, loading, mutate, onDone, onError };
};
const mutateDeleteAccessTerminal = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    TerminalDeleteAccessMutationSchema
  );
  onError(error => {
    errorHandler(error);
  });

  return { called, error, loading, mutate, onDone, onError };
};
const mutateAssignAccessTerminal = (
  validationErrorsCb: (input: string, rule: string, params: string[]) => void
) => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    TerminalAssignAccessMutationSchema
  );
  onError(error => {
    // errorHandler(error);
    errorHandler(error, value => {
      value?.validation.forEach(element => {
        validationErrorsCb(element.input, element.rule, element.params);
      });
    });
  });

  return { called, error, loading, mutate, onDone, onError };
};
const mutateEditAccessTerminal = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    TerminalEditAccessMutationSchema
  );
  onError(error => {
    errorHandler(error);
  });

  return { called, error, loading, mutate, onDone, onError };
};
export const useTerminalMutation = () => {
  const terminalEdit = mutateTerminalEdit;
  const terminalAdd = mutateTerminalAdd;
  const pinTerminal = mutatePinTerminal;
  const deleteAccess = mutateDeleteAccessTerminal;
  const assignAccess = mutateAssignAccessTerminal;
  const editAccess = mutateEditAccessTerminal;

  return {
    assignAccess,
    deleteAccess,
    editAccess,
    pinTerminal,
    terminalAdd,
    terminalEdit,
  };
};
