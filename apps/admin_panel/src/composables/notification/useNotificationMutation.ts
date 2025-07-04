const mutatePreferencesEdit = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    PreferencesEditMutationSchema
  );

  return { called, error, loading, mutate, onDone, onError };
};
export const usePreferencesEditMutation = () => {
  const preferencesEdit = mutatePreferencesEdit;

  return {
    preferencesEdit,
  };
};
