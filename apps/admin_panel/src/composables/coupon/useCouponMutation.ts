const mutateRemoveCoupon = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    couponRemoveMutationSchema
  );

  onError(error => {
    errorHandler(error);
  });

  return { called, error, loading, mutate, onDone, onError };
};
const mutateRestoreCoupon = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    couponRestoreMutationSchema
  );

  onError(error => {
    errorHandler(error);
  });

  return { called, error, loading, mutate, onDone, onError };
};
const mutateAddCoupon = (
  validationErrorsCb: (input: string, rule: string, params: string[]) => void
) => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(NewCouponMutationSchema);

  onError(error => {
    errorHandler(error, value => {
      value?.validation.forEach(element => {
        validationErrorsCb(element.input, element.rule, element.params);
      });
    });
  });

  return { called, error, loading, mutate, onDone, onError };
};
const mutateAssingProduct = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    AssignProductMutationSchema
  );

  onError(error => {
    errorHandler(error);
  });

  return { called, error, loading, mutate, onDone, onError };
};
const mutateEditCoupon = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(EditCouponMutationSchema);

  onError(error => {
    errorHandler(error);
  });

  return { called, error, loading, mutate, onDone, onError };
};

export const useCouponMutation = () => {
  const removeCoupon = mutateRemoveCoupon;
  const restoreCoupon = mutateRestoreCoupon;
  const addCoupon = mutateAddCoupon;
  const assingProduct = mutateAssingProduct;
  const editCoupon = mutateEditCoupon;

  return {
    addCoupon,
    assingProduct,
    editCoupon,
    removeCoupon,
    restoreCoupon,
  };
};
