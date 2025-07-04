const mutateReturnToOldVersion = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    UserReturnToOldVersionSchema
  );

  onError(error => {
    errorHandler(error);
  });

  return { called, error, loading, mutate, onDone, onError };
};

export const useReturnToOldVersionMutation = () => {
  const returnToOldVersionLog = mutateReturnToOldVersion;

  return {
    returnToOldVersionLog,
  };
};
