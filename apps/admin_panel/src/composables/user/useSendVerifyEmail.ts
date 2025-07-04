const mutateSendVerifyEmail = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(SendVerifyEmailSchema);

  onError(error => {
    errorHandler(error);
  });

  return { called, error, loading, mutate, onDone };
};
const mutateVerifyEmail = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(VerifyEmailSchema);

  onError(error => {
    errorHandler(error);
  });

  return { called, error, loading, mutate, onDone };
};

export const useEmailVerifyMutation = () => {
  const verifyEmail = mutateVerifyEmail;
  const sendVerifyEmail = mutateSendVerifyEmail;

  return {
    sendVerifyEmail,
    verifyEmail,
  };
};
