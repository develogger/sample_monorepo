const mutateReconciliationExcelExport = (
  validationErrorsCb: (input: string, rule: string, params: string[]) => void
) => {
  const { error, loading, mutate, onDone, onError } = useMutation(ReconciliationExcelExport);
  onError(error => {
    errorHandler(error, value => {
      value?.validation.forEach(element => {
        validationErrorsCb(element.input, element.rule, element.params);
      });
    });
  });

  return { error, loading, mutate, onDone, onError };
};
export const useReconciliationExcelExportMutation = () => {
  const reconciliationExcelExport = mutateReconciliationExcelExport;

  return {
    reconciliationExcelExport,
  };
};
