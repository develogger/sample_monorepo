import { Invoice, Query } from '@/graphql/graphql';
import { computed } from 'vue';

import { useTerminalStore } from './../../stores/terminalStore';

export const useInvoiceQuery = () => {
  const terminal = useTerminalStore();
  const config = useRuntimeConfig();
  const { convert } = useDate();
  const route = useRoute();
  const { loading, onResult, refetch, result } = useQuery<Query>(InvoiceSchema, {
    amount: Number(route.query.equalAmount) || undefined,
    created_from_date:
      (route.query.from && convert(route.query.from as string, 'jYYYY-jMM-jD', 'YYYY-MM-DD')) ||
      undefined,
    created_to_date:
      (route.query.to && convert(route.query.to as string, 'jYYYY-jMM-jD', 'YYYY-MM-DD')) ||
      undefined,
    description: route.query.description || undefined,
    filter: route.query.status,
    id: route.query.id || undefined,
    limit: Number(route.query.pageSize) || config.public.pageSize,
    offset:
      (Number(route.query.pageSize) || config.public.pageSize) *
      ((Number(route.query.page) || config.public.page) - 1),
    payer_email: route.query.email || undefined,
    payer_mobile: route.query.mobile || undefined,
    payer_name: route.query.payer || undefined,
    terminal_id: terminal.currentTerminal,
  });
  const pagination = computed(() => {
    if (result.value?.Pagination) {
      return result.value.Pagination[0];
    }

    return [];
  });
  const filteredData = computed(() => {
    const { toJalali } = useDate();
    const { numberFormat } = useMath();
    if (result.value?.Invoice && _isArray(result.value?.Invoice)) {
      return result.value.Invoice.map(c => {
        if (c) {
          return {
            amount: numberFormat(c.amount),
            created_at: _isNil(c.created_at) ? '-' : toJalali(c.created_at),
            id: c.id,
            payer_name: c.payer_name,
            status: c.status,
          } as Invoice;
        }
      });
    }
    if (typeof result.value?.Invoice === 'undefined') {
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
