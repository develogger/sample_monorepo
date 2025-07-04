const mutateDeactivateTelegram = () => {
  const { error, loading, mutate, onDone, onError } = useMutation(DeactivateTelegramSchema);
  onError(error => {
    errorHandler(error);
  });

  return { error, loading, mutate, onDone };
};
export const useDeactivateTelegramMutation = () => {
  const deactivateTelegram = mutateDeactivateTelegram;

  return {
    deactivateTelegram,
  };
};
