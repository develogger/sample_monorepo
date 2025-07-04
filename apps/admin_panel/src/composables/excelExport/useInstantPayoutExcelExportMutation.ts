const mutateInstantPayoutExcelExport = (
  validationErrorsCb: (input: string, rule: string, params: string[]) => void
) => {
  const { error, loading, mutate, onDone, onError } = useMutation(InstantPayoutExcelExportSchema);

  onError(error => {
    errorHandler(error, value => {
      value?.validation.forEach(element => {
        validationErrorsCb(element.input, element.rule, element.params);
      });
    });
  });

  return { error, loading, mutate, onDone, onError };
};
export const useInstantPayoutExcelExportMutation = () => {
  const InstantPayoutExcelExport = mutateInstantPayoutExcelExport;

  return {
    InstantPayoutExcelExport,
  };
};
