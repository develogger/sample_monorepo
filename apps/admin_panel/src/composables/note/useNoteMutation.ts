const mutateNoteAdd = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(AddNoteMutationSchema);

  onError(error => {
    errorHandler(error);
  });

  return { called, error, loading, mutate, onDone, onError };
};
const mutateNoteDelete = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(NoteDeleteMutationSchema);

  onError(error => {
    errorHandler(error);
  });

  return { called, error, loading, mutate, onDone, onError };
};
const mutateNoteEdit = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(EditNoteMutationSchema);

  return { called, error, loading, mutate, onDone, onError };
};

export const useNoteMutation = () => {
  const noteAdd = mutateNoteAdd;
  const noteDelete = mutateNoteDelete;
  const noteEdit = mutateNoteEdit;

  return {
    noteAdd,
    noteDelete,
    noteEdit,
  };
};
