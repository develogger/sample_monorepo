<template>
  <UserBaseTerminalHeader />
  <UserBaseTerminalContent />
</template>
<script setup lang="ts">
import { type PaginationType } from '@/graphql/graphql';
import { useTerminalListQuery } from '@/composables/terminal/useTerminalListQuery';

const t = useI18n();
useHead({
  title: t('_user.terminal.title'),
});
export type PaginationTypes = {
  last_page?: PaginationType['last_page'];
  total?: PaginationType['total'];
};
const { loading, pagination, refetch, data } = useTerminalListQuery().terminalList;
const config = useRuntimeConfig();
const route = useRoute();
const store = useTerminalStore();
store.loading = loading;
store.refetch = refetch;
store.pagination = pagination as PaginationTypes;
store.data = data;

watch(
  () => route.query,
  () => {
    refetch({
      limit: Number(route.query.pageSize) || config.public.pageSize,
      offset:
        (Number(route.query.pageSize) || config.public.pageSize) *
        ((Number(route.query.page) || config.public.page) - 1),
    });
  }
);
</script>
