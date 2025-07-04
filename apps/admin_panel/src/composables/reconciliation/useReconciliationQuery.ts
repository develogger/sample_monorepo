import {
  type ReconciliationQuery,
  ReconciliationStatusEnum,
  TerminalPermissionEnum,
} from '@/graphql/graphql';
const gqlReconciliationList = () => {
  const { toJalali } = useDate();
  const terminal = useTerminalStore();
  const route = useRoute();
  const config = useRuntimeConfig();
  const { convertQueryParamDate } = useDate();
  const { hasPermission } = usePermissionValidate(TerminalPermissionEnum.Reconcile);
  const { loading, onError, refetch, result } = useQuery<ReconciliationQuery>(
    ReconciliationSchema,
    {
      amount: Number(route.query.equalAmount) || undefined,
      created_from_date: route.query.from && convertQueryParamDate(route.query.from as string),
      created_to_date: route.query.to && convertQueryParamDate(route.query.to as string),
      filter: Object.values(ReconciliationStatusEnum).includes(
        route.query.status as ReconciliationStatusEnum
      )
        ? route.query.status
        : undefined,
      iban: route.query.iban || undefined,
      id: route.query.id || undefined,
      limit: Number(route.query.pageSize) || config.public.pageSize,
      max_amount: Number(route.query.moreAmount) || undefined,
      min_amount: Number(route.query.lessAmount) || undefined,
      offset:
        (Number(route.query.pageSize) || config.public.pageSize) *
        ((Number(route.query.page) || config.public.page) - 1),
      reference_id: route.query.reference || undefined,
      terminal_id: terminal.currentTerminal,
      text: route.query.description || undefined,
    },
    {
      enabled: hasPermission.value,
    }
  );

  onError(error => {
    errorHandler(error);
  });

  const pagination = computed(() => {
    if (result.value && !_isEmpty(result.value.Pagination)) {
      if (result.value?.Pagination) {
        return result.value?.Pagination[0];
      }
    }
  });
  const filteredData = computed(() => {
    if (result.value && !_isEmpty(result.value.Reconciliation)) {
      return result.value.Reconciliation?.map(i => {
        if (i) {
          return {
            amount: i.amount,
            created_at: i.created_at ? toJalali(i.created_at) : '-',
            estimated_payed_at: i.estimated_payed_at ? toJalali(i.estimated_payed_at) : '-',
            fee: i.fee,
            iban: i.status,
            id: i.id,
            payable_at: i.payable_at ? toJalali(i.payable_at) : '-',
            reconciled_at: i.reconciled_at ? toJalali(i.reconciled_at) : '-',
            reference_id: i.reference_id,
            status: i.status,
          };
        }
      });
    }
  });

  return {
    data: filteredData,
    loading,
    pagination,
    refetch,
  };
};

export const useReconciliationQuery = () => {
  const reconciliationList = gqlReconciliationList();

  return {
    reconciliationList,
  };
};
