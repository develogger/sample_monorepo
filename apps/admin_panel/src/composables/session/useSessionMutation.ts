const mutateSessionCardHolder = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(SessionCardHolderSchema);
  onError(error => {
    errorHandler(error);
  });

  return { called, error, loading, mutate, onDone };
};
export const useSessionMutation = () => {
  const sessionCardHolder = mutateSessionCardHolder;

  return {
    sessionCardHolder,
  };
};
