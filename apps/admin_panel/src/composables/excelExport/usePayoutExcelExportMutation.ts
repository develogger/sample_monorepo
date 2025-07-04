const mutatePayoutExcelExport = (
  validationErrorsCb: (input: string, rule: string, params: string[]) => void
) => {
  const { error, loading, mutate, onDone, onError } = useMutation(PayoutExcelExportSchema);
  onError(error => {
    errorHandler(error, value => {
      value?.validation.forEach(element => {
        validationErrorsCb(element.input, element.rule, element.params);
      });
    });
  });

  return { error, loading, mutate, onDone, onError };
};
export const usePayoutExcelExportMutation = () => {
  const PayoutExcelExport = mutatePayoutExcelExport;

  return {
    PayoutExcelExport,
  };
};
