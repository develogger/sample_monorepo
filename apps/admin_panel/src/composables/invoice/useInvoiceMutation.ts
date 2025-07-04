const mutateAddInvoice = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(NewInvoiceMutationSchema);

  onError(error => {
    errorHandler(error);
  });

  return { called, error, loading, mutate, onDone, onError };
};
const mutateEditInvoice = () => {
  const { called, error, loading, mutate, onDone, onError } =
    useMutation(EditInvoiceMutationSchema);

  onError(error => {
    errorHandler(error);
  });

  return { called, error, loading, mutate, onDone, onError };
};

export const useInvoiceMutation = () => {
  const addInvoice = mutateAddInvoice;
  const editInvoice = mutateEditInvoice;

  return {
    addInvoice,
    editInvoice,
  };
};
