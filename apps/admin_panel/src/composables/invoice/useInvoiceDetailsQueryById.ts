import { Invoice, Query } from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';
import { computed } from 'vue';

export const useInvoiceDetailsQueryById = () => {
  const terminal = useTerminalStore();
  const route = useRoute();
  const { loading, onResult, result } = useQuery<Query>(InvoiceByIdDetailsSchema, {
    id: route.params.id,
    terminal_id: terminal.currentTerminal,
  });
  const filteredData = computed(() => {
    if (result.value?.Invoice && result.value.Invoice.length > 0) {
      const firstInvoice = result.value.Invoice[0] as Invoice;

      return firstInvoice;
    }

    return undefined;
  });

  return {
    data: filteredData as ComputedRef<Invoice>,
    loading,
    onResult,
  };
};
