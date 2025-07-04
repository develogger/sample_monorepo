// type setError = (field: Path<TValues>, message: string | string[] | undefined): void;

const mutateAddressAdd = (
  validationErrorsCb: (input: string, rule: string, params: string[]) => void
) => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(AddAddressMutationSchema);

  onError(error => {
    errorHandler(error, value => {
      value?.validation.forEach(element => {
        validationErrorsCb(element.input, element.rule, element.params);
      });
    });
  });

  return { called, error, loading, mutate, onDone };
};
const mutateAddressEdit = () => {
  const { called, error, loading, mutate, onDone, onError } =
    useMutation(EditAddressMutationSchema);

  return { called, error, loading, mutate, onDone, onError };
};
export const useAddressMutation = () => {
  const addressAdd = mutateAddressAdd;
  const addressEdit = mutateAddressEdit;

  return {
    addressAdd,
    addressEdit,
  };
};
