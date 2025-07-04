<template>
  <div class="pb-3xl w-full container-xl">
    <sessionBaseHeader />
    <sessionBaseMain />
  </div>
</template>
<script setup lang="ts">
import {
  FilterEnum,
  TerminalPermissionEnum,
  type PaginationType,
  SessionTypeEnum,
} from '@/graphql/graphql';
definePageMeta({
  name: 'session',
  layout: 'terminal',
  middleware: ['permission'],
  permission: TerminalPermissionEnum.Session,
});
const t = useI18n();
useHead({
  title: t('common.sessions'),
});
export type PaginationTypes = {
  last_page?: PaginationType['last_page'];
  total?: PaginationType['total'];
};
const { load, loading, pagination, refetch, data } = useSessionQuery().sessionList;
const config = useRuntimeConfig();
const { convertQueryParamDate } = useDate();
const route = useRoute();
const store = useSessionStore();
const { result: sessionType } = useSessionTypeQuery();
store.loading = loading;
store.refetch = refetch;
store.pagination = pagination as PaginationTypes;
store.data = data;
store.sessionType = sessionType;
const refetchData = () => {
  (typeof load === 'function' && load()) ||
    refetch({
      limit: Number(route.query.pageSize) || config.public.pageSize,
      offset:
        (Number(route.query.pageSize) || config.public.pageSize) *
        ((Number(route.query.page) || config.public.page) - 1),
      filter: Object.values(FilterEnum).includes(route.query.status as FilterEnum)
        ? route.query.status
        : FilterEnum.Active,
      created_from_date: route.query.from && convertQueryParamDate(route.query.from as string),
      created_to_date: route.query.to && convertQueryParamDate(route.query.to as string),
      min_amount: Number(route.query.moreAmount) || undefined,
      max_amount: Number(route.query.lessAmount) || undefined,
      amount: Number(route.query.equalAmount) || undefined,
      type: Object.values(SessionTypeEnum).includes(route.query.type as SessionTypeEnum)
        ? route.query.type
        : undefined,
      reference_id: route.query.reference || route.query.reference_id || undefined,
      relation_id: route.query.relation_id || undefined,
      email: route.query.email || undefined,
      mobile: route.query.mobile || undefined,
      card_pan: route.query.card_pan || undefined,
      id: route.query.id || undefined,
      rrn: route.query.rrn || undefined,
      note: route.query.note || undefined,
      description: route.query.description || undefined,
      reconciliation_id: route.query.reconciliation_id || undefined,
    });
};
onMounted(() => {
  refetchData();
});
watch(
  () => route.query,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      refetchData();
    }
  }
);
</script>
