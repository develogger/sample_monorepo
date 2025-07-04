import { InstantPayoutInquiryBanksType, Query } from '@/graphql/graphql';

import { InstantPayoutInquiryBanksSchema } from '~/services/gql/instant_payout';

export const useInstantPayoutInquiryBanks = () => {
  const { loading, onResult, refetch, result } = useQuery<Query>(
    InstantPayoutInquiryBanksSchema,
    () => ({
      fetchPolicy: 'no-cache',
    })
  );
  const filteredData = computed(() => {
    if (result.value?.InstantPayoutInquiryBanks) {
      return result.value?.InstantPayoutInquiryBanks;
    }
    if (typeof result.value?.InstantPayoutInquiryBanks === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData as Ref<InstantPayoutInquiryBanksType>,
    loading,
    onResult,
    refetch,
  };
};
