<template>
  <div class="pb-3xl w-full container-xl">
    <reconciliationBaseHeader />
    <reconciliationBaseMain />
  </div>
</template>
<script setup lang="ts">
import {
  ReconciliationStatusEnum,
  TerminalPermissionEnum,
  type PaginationType,
} from '@/graphql/graphql';
import { useReconciliationQuery } from '@/composables/reconciliation/useReconciliationQuery';

definePageMeta({
  name: 'reconciliation',
  layout: 'terminal',
  middleware: ['permission'],
  permission: TerminalPermissionEnum.Reconcile,
});
const t = useI18n();
useHead({
  title: t('_common.page_title.reconciliation'),
});

export type PaginationTypes = {
  last_page?: PaginationType['last_page'];
  total?: PaginationType['total'];
};

const { loading, pagination, refetch, data } = useReconciliationQuery().reconciliationList;
const config = useRuntimeConfig();
const { convertQueryParamDate } = useDate();
const route = useRoute();
const store = useReconciliationStore();
store.loading = loading;
store.refetch = refetch;
store.pagination = pagination as PaginationTypes;
store.data = data;
const refetchData = () => {
  refetch({
    limit: Number(route.query.pageSize) || config.public.pageSize,
    offset:
      (Number(route.query.pageSize) || config.public.pageSize) *
      ((Number(route.query.page) || config.public.page) - 1),
    filter: Object.values(ReconciliationStatusEnum).includes(
      route.query.status as ReconciliationStatusEnum
    )
      ? route.query.status
      : undefined,
    id: route.query.id || undefined,
    created_from_date: route.query.from && convertQueryParamDate(route.query.from as string),
    created_to_date: route.query.to && convertQueryParamDate(route.query.to as string),
    min_amount: Number(route.query.moreAmount) || undefined,
    max_amount: Number(route.query.lessAmount) || undefined,
    amount: Number(route.query.equalAmount) || undefined,
    text: route.query.description || undefined,
    reference_id: route.query.reference || undefined,
    iban: route.query.iban || undefined,
  });
};
watch(
  () => route.query,
  () => {
    refetchData();
  },
  { immediate: true }
);
</script>
