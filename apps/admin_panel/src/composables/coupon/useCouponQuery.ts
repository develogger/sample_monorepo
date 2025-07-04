import type { FilteredDataType } from '@/types/filteredDataType';

import { CouponFilterEnum, Query, QueryCouponsArgs } from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';
import { computed } from 'vue';

export const useCouponQuery = () => {
  const terminal = useTerminalStore();
  const config = useRuntimeConfig();
  const route = useRoute();
  const { loading, onError, onResult, refetch, result } = useQuery<Query>(CouponSchema, {
    filter: Object.values(CouponFilterEnum).includes(route.query.status as CouponFilterEnum)
      ? route.query.status
      : undefined,
    id: route.params.id,
    limit: Number(route.query.pageSize) || config.public.pageSize,
    offset:
      (Number(route.query.pageSize) || config.public.pageSize) *
      ((Number(route.query.page) || config.public.page) - 1),
    terminal_id: terminal.currentTerminal,
  } as unknown as QueryCouponsArgs);
  onError(error => {
    errorHandler(error);
  });
  const pagination = computed(() => {
    if (result.value?.Pagination) {
      return result.value.Pagination[0];
    }

    return [];
  });
  const filteredData = computed(() => {
    const { toJalali } = useDate();
    if (result.value?.Coupons && _isArray(result.value?.Coupons)) {
      return result.value.Coupons.map(c => {
        if (c) {
          return {
            code: c.code,
            deleted_at: _isNil(c.deleted_at) ? null : toJalali(c.deleted_at),
            discount_percent: c.discount_percent,
            expired_at: _isNil(c.expired_at) ? '-' : toJalali(c.expired_at),
            id: c.id,
            limit: c.limit,
            max_discount_amount: c.max_discount_amount,
            min_amount: c.min_amount,
            products: c.products,
            status: c.status,
            used: c.used,
          } as unknown as FilteredDataType;
        }
      });
    }
    if (typeof result.value?.Coupons === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData,
    loading,
    onResult,
    pagination,
    refetch,
  };
};
