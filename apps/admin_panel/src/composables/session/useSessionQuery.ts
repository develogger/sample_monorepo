// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ExportGroupEnum, FilterEnum, Query, SessionTypeEnum } from '@/graphql/graphql';

const gqlSessionList = () => {
  const terminal = useTerminalStore();
  const { toJalali } = useDate();
  const route = useRoute();
  const { convertQueryParamDate } = useDate();
  const config = useRuntimeConfig();
  const { load, loading, onError, refetch, result } = useLazyQuery<Query>(
    SessionSchema,
    {
      amount: Number(route.query.equalAmount) ? Number(route.query.equalAmount) : undefined,
      card_pan: route.query.card_pan || undefined,
      created_from_date:
        route.query.from && convertQueryParamDate(route.query.from, 'jYYYY-jMM-jD', 'YYYY-MM-DD'),
      created_to_date:
        route.query.to && convertQueryParamDate(route.query.to, 'jYYYY-jMM-jD', 'YYYY-MM-DD'),
      description: route.query.description || undefined,
      email: route.query.email || undefined,
      filter: Object.values(FilterEnum).includes(route.query.status as FilterEnum)
        ? route.query.status
        : FilterEnum.Active,
      id: route.query.id || undefined,
      limit: Number(route.query.pageSize) || config.public.pageSize,
      max_amount: Number(route.query.moreAmount) || undefined,
      min_amount: Number(route.query.lessAmount) || undefined,
      mobile: route.query.mobile || undefined,
      note: route.query.note || undefined,
      offset:
        (Number(route.query.pageSize) || config.public.pageSize) *
        ((Number(route.query.page) || config.public.page) - 1),
      reconciliation_id: route.query.reconciliation_id || undefined,
      reference_id: route.query.reference || route.query.reference_id || undefined,
      relation_id: route.query.relation_id || undefined,
      rrn: route.query.rrn || undefined,
      terminal_id: terminal.currentTerminal,
      type:
        route.query.type &&
        Object.values(SessionTypeEnum).includes(route.query.type as SessionTypeEnum)
          ? route.query.type
          : undefined,
    },
    () => ({
      fetchPolicy: 'no-cache',
    })
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
    if (result.value && !_isEmpty(result.value.Session)) {
      return result.value.Session?.map(i => {
        if (i) {
          return {
            amount: i.amount,
            created_at: toJalali(i.created_at),
            description: i.description,
            fee: i.fee,
            id: i.id,
            reconciled_status: i.timeline && (i.timeline.reconciled_status as string),
            reconciliation_id: i.reconciliation_id,
            refund_id: i.timeline && i.timeline.refund_id,
            refund_status: i.timeline && i.timeline.refund_status,
            status: i.status,
          };
        }
      });
    }
    if (typeof result.value?.Session === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData,
    load,
    loading,
    pagination,
    refetch,
  };
};
const getSessionListByRelated = () => {
  const { toJalali } = useDate();
  const route = useRoute();
  const terminal = useTerminalStore();
  const { load, loading, onError, refetch, result } = useLazyQuery<Query>(
    SessionSchema,
    {
      filter: 'ACTIVE',
      limit: 15,
      offset: 0,
      relation_id: route.params.id || undefined,
      terminal_id: terminal.currentTerminal,
    },
    () => ({
      fetchPolicy: 'no-cache',
    })
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
    if (result.value && !_isEmpty(result.value.Session)) {
      return result.value.Session?.map(i => {
        if (i) {
          return {
            amount: i.amount,
            created_at: toJalali(i.created_at),
            description: i.description,
            fee: i.fee,
            id: i.id,
            reconciled_status: i.timeline && (i.timeline.reconciled_status as string),
            reconciliation_id: i.reconciliation_id,
            refund_id: i.timeline && i.timeline.refund_id,
            refund_status: i.timeline && i.timeline.refund_status,
            status: i.status,
          };
        }
      });
    }
    if (typeof result.value?.Session === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData,
    load,
    loading,
    pagination,
    refetch,
  };
};
export const sessionExportFieldQuery = () => {
  const terminal = useTerminalStore();
  const { load, loading, onResult, refetch, result } = useLazyQuery<Query>(
    ExportFieldSchema,
    {
      group: ExportGroupEnum.Session,
      terminal_id: Number(terminal.currentTerminal),
    },
    () => ({
      fetchPolicy: 'no-cache',
    })
  );
  const filteredData = computed(() => {
    if (result.value?.Session) {
      return result.value?.Session[0]?.categories;
    }

    return undefined;
  });

  return {
    data: filteredData,
    load,
    loading,
    onResult,
    refetch,
  };
};

export const useSessionQuery = () => {
  const sessionList = gqlSessionList();
  const sessionListByRelated = getSessionListByRelated();

  return {
    sessionList,
    sessionListByRelated,
  };
};
