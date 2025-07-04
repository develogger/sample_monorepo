import { CouponType, Query } from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';
import { computed } from 'vue';

export interface Coupon extends CouponType {
  code: string;
  created_at: string;
  discount_percent: number;
  expired_at: string;
  id: string;
}
export const useCouponQueryById = () => {
  const terminal = useTerminalStore();
  const route = useRoute();
  const { loading, onResult, refetch, result } = useQuery<Query>(
    CouponByIdSchema,
    {
      id: route.params.id,
      terminal_id: terminal.currentTerminal,
    },
    {
      enabled: route.params.id !== 'add',
    }
  );
  const filteredData = computed(() => {
    if (result.value?.Coupons && _isArray(result.value?.Coupons)) {
      return result.value.Coupons[0] as Coupon;
    }
    if (typeof result.value?.Coupons === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData as ComputedRef<Coupon>,
    loading,
    onResult,
    refetch,
  };
};
