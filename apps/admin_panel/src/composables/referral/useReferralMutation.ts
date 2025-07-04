const mutateReferrerInvoiceSet = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    ReferrerInvoiceSetIbanMutationSchema
  );
  onError(error => {
    errorHandler(error);
  });

  return { called, error, loading, mutate, onDone };
};

export const useReferralMutation = () => {
  const setIban = mutateReferrerInvoiceSet;

  return {
    setIban,
  };
};
