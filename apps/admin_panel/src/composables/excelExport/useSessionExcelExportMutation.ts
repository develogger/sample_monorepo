import { i18n } from '@/locale/i18n';
const mutateSessionExcelExpor = (
  validationErrorsCb?: (input: string, rule: string, params: string[]) => void
) => {
  const { error, loading, mutate, onDone, onError } = useMutation(SessionExcelExport);
  const { $notify } = useNuxtApp();
  const { t } = i18n.global;

  onError(error => {
    errorHandler(error, value => {
      if (validationErrorsCb) {
        value?.validation.forEach(element => {
          validationErrorsCb(element.input, element.rule, element.params);
        });
      } else {
        $notify({
          isRead: false,
          message: t('_validation.' + value?.validation?.[0]?.rule, {
            params: t(`_validation.name.${value?.validation?.[0]?.input}`),
          }),
          type: 'error',
        });
      }
    });
  });

  return { error, loading, mutate, onDone, onError };
};
const mutateNormalSessionExcelExport = (
  validationErrorsCb: (input: string, rule: string, params: string[]) => void
) => {
  const { error, loading, mutate, onDone, onError } = useMutation(SessionNormalExcelExport);

  onError(error => {
    errorHandler(error, value => {
      value?.validation.forEach(element => {
        validationErrorsCb(element.input, element.rule, element.params);
      });
    });
  });

  return { error, loading, mutate, onDone, onError };
};
export const useSessionExcelExportMutation = () => {
  const sessionExcelExpor = mutateSessionExcelExpor;
  const normalSessionExcelExport = mutateNormalSessionExcelExport;

  return {
    normalSessionExcelExport,
    sessionExcelExpor,
  };
};

export enum ExportModalEnum {
  ExportExcel = 'EXPORTEXCEL',
  HasEmail = 'HASEMAIL',
  Otp = 'OTP',
  VerifyEmail = 'VERIFYEMAIL',
}
