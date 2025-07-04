import { Query, TerminalBrandingSettingType } from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';

export const updateZarinLinkSettingBrandingMutation = (
  validationErrorsCb: (input: string, message: string, params: string[]) => void
) => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    UpdateZarinLinkSettingBrandingSchema
  );
  onError(error => {
    errorHandler(error, value => {
      value?.validation.forEach(element => {
        validationErrorsCb(element.input, element.message, element.params);
      });
    });
  });

  return { called, error, loading, mutate, onDone };
};

export const getZarinLinkSettingBranding = () => {
  const terminal = useTerminalStore();
  const route = useRoute();
  const { loading, onResult, refetch, result } = useQuery<Query>(
    GetZarinLinkSettingBrandingSchema,
    {
      terminal_id: terminal.currentTerminal,
    },
    {
      enabled: route.params.id !== 'add',
      fetchPolicy: 'no-cache',
    }
  );
  const filteredData = computed(() => {
    if (result.value?.TerminalBrandingSetting) {
      return result.value.TerminalBrandingSetting;
    }
    if (typeof result.value?.TerminalBrandingSetting === 'undefined') {
      return undefined;
    }

    return null;
  });

  return {
    data: filteredData as globalThis.ComputedRef<null | TerminalBrandingSettingType | undefined>,
    loading,
    onResult,
    refetch,
  };
};
