const mutateRefundAdd = (
  validationErrorsCb: (input: string, rule: string, params: string[]) => void
) => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(AddRefundMutationSchema);

  onError(error => {
    errorHandler(error, value => {
      value?.validation.forEach(element => {
        validationErrorsCb(element.input, element.rule, element.params);
      });
    });
  });

  return { called, error, loading, mutate, onDone };
};

export const useRefundMutation = () => {
  const refundAdd = mutateRefundAdd;

  return {
    refundAdd,
  };
};
