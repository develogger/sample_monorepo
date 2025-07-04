import { Maybe, Query, QueryTerminalDomainCheckArgs, TerminalType } from '@/graphql/graphql';

export interface ActiveTerminalFilter {
  filterValue: ComputedRef<Maybe<TerminalType>[] | undefined>;
  terminalId: TerminalType['id'] | undefined;
}

export const useTerminalQuery = () => {
  const terminalStore = useTerminalStore();
  const { loading, onError, onResult, refetch, result } = useQuery<Query>(TerminalListMenuSchema);
  const filteredData = computed(() => {
    if (result.value && result.value.Terminals) {
      return result.value.Terminals as unknown as TerminalType[];
    }

    return [];
  });
  onError(error => {
    errorHandler(error);
  });

  const filteredTerminal = (id: string) => {
    if (filteredData.value) {
      return filteredData.value.filter(item => item?.id === id);
    } else {
      return [];
    }
  };
  const activeTerminal = computed<null | TerminalType>(() => {
    if (!terminalStore.currentTerminal || !result.value?.Terminals) {
      return null;
    }

    return (
      result.value.Terminals.find(
        terminal => terminal?.id === String(terminalStore.currentTerminal)
      ) || null
    );
  });

  return {
    activeTerminal,
    data: filteredData,
    filteredTerminal,
    loading,
    onResult,
    refetch,
  };
};
export const useDomainCheckQuery = (
  { domain }: { domain: Ref<string> },
  validationErrorsCb: (input: string, rule: string, params: string[]) => void
) => {
  const { error, load, loading, onError, onResult, refetch, restart, result } = useLazyQuery<Query>(
    TerminalDomainCheckSchema,
    {
      domain: domain,
    } as unknown as QueryTerminalDomainCheckArgs,

    () => ({
      fetchPolicy: 'no-cache',
    })
  );
  onError(error => {
    errorHandler(error, value => {
      const err = value?.validation?.[0];
      if (err) {
        validationErrorsCb(err.input, err.rule, err.params);
      }
    });
  });
  const filteredData = computed(() => {
    if (result.value?.TerminalDomainCheck) {
      return result.value.TerminalDomainCheck;
    }
    if (typeof result.value?.TerminalDomainCheck === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData,
    error,
    load,
    loading,
    onError,
    onResult,
    refetch,
    restart,
  };
};
