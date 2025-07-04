const mutateRemoveProduct = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    ProductRemoveMutationSchema
  );

  onError(error => {
    errorHandler(error);
  });

  return { called, error, loading, mutate, onDone };
};
const mutateRestoreProduct = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    ProductRestoreMutationSchema
  );
  onError(error => {
    errorHandler(error);
  });

  return { called, error, loading, mutate, onDone };
};
const mutateAddproduct = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(NewProductMutationSchema);

  return { called, error, loading, mutate, onDone, onError };
};
const mutateAddProductImage = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    NewProductImageMutationSchema
  );

  return { called, error, loading, mutate, onDone, onError };
};
const mutateEditproduct = () => {
  const { called, error, loading, mutate, onDone, onError } =
    useMutation(EditProductMutationSchema);

  return { called, error, loading, mutate, onDone, onError };
};
const mutateDeleteProductImage = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(DeleteProductImage);

  return { called, error, loading, mutate, onDone, onError };
};

export const useProductMutation = () => {
  const removeProduct = mutateRemoveProduct;
  const restoreProduct = mutateRestoreProduct;
  const addProduct = mutateAddproduct;
  const addProductImage = mutateAddProductImage;
  const editProduct = mutateEditproduct;
  const deleteProductImage = mutateDeleteProductImage;

  return {
    addProduct,
    addProductImage,
    deleteProductImage,
    editProduct,
    removeProduct,
    restoreProduct,
  };
};
