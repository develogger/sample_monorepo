const updateZarinLinkMutation = (
  validationErrorsCb: (input: string, message: string, params: string[]) => void
) => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    ZarinLinkUpdateMutationSchema
  );
  onError(error => {
    errorHandler(error, value => {
      value?.validation.forEach(element => {
        validationErrorsCb(element.input, element.message, element.params);
      });
    });
  });

  return { called, error, loading, mutate, onDone };
};
const createZarinLinkMutation = (
  validationErrorsCb: (input: string, rule: string, params: string[]) => void
) => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    ZarinLinkCreateMutationSchema
  );

  onError(error => {
    errorHandler(error, value => {
      value?.validation.forEach(element => {
        validationErrorsCb(element.input, element.message, element.params);
      });
    });
  });

  return { called, error, loading, mutate, onDone, onError };
};

export const useZarinLinkMutation = () => ({
  createZarinLinkMutation,
  updateZarinLinkMutation,
});
