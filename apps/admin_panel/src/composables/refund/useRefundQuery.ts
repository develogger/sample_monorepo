import type { RefundMethodType } from '@/types/refundTypes';

import { Query, RefundFeeInquiryType } from '@/graphql/graphql';

export const useRefundQuery = (method: RefundMethodType) => {
  const { load, loading, onResult, refetch, result } = useLazyQuery<Query>(RefundFeeInquirySchema, {
    method,
  } as unknown as RefundFeeInquiryType);
  const filteredData = computed(() => result.value?.RefundFeeInquiry);

  return {
    data: filteredData,
    load,
    loading,
    onResult,
    refetch,
  };
};
