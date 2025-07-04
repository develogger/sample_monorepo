const mutateInstantPayoutAdd = (
  validationErrorsCb: (input: string, rule: string, params: string[]) => void
) => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    AddInstantPayoutMutationSchema
  );

  onError(error => {
    errorHandler(error, value => {
      value?.validation.forEach(element => {
        validationErrorsCb(element.input, element.rule, element.params);
      });
    });
  });

  return { called, error, loading, mutate, onDone, onError };
};
export const useInstantPayoutMutation = () => {
  const addInstantPayout = mutateInstantPayoutAdd;

  return {
    addInstantPayout,
  };
};
