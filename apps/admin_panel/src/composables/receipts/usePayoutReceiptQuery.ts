export const usePayoutReceipt = () => {
  const route = useRoute();
  const { loading, onError, onResult, result } = useQuery(
    PayoutReceiptSchema,
    {
      url_code: route.params.id,
    },
    {
      clientId: 'receipt_client',
    }
  );
  onError(error => {
    if (error?.message?.includes('validation')) {
      navigateTo({ path: '/404' });
    } else {
      errorHandler(error);
    }
  });
  onResult(res => {
    if (!res.data?.resource) navigateTo({ path: '/404' });
  });
  const filteredData = computed(() => result.value?.resource);

  return {
    data: filteredData,
    loading,
  };
};
