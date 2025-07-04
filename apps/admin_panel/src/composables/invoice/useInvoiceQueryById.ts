import { Invoice, Query } from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';
import { computed } from 'vue';

export const useInvoiceQueryById = () => {
  const terminal = useTerminalStore();
  const route = useRoute();
  const { loading, onResult, refetch, result } = useQuery<Query>(
    InvoiceByIdSchema,
    {
      id: route.params.id,
      terminal_id: terminal.currentTerminal,
    },
    {
      enabled: route.params.id !== 'add',
    }
  );
  const filteredData = computed(() => {
    if (result.value?.Invoice && result.value.Invoice.length > 0) {
      const firstInvoice = result.value.Invoice[0] as Invoice;

      return firstInvoice;
    }

    return undefined;
  });

  return {
    data: filteredData,
    loading,
    onResult,
    refetch,
  };
};
