<template>
  <div class="w-full px-md">
    <exportBaseHeader />
    <exportBaseMain class="pb-3xl w-full lg:mx-auto max-w-[944px]" />
  </div>
</template>
<script setup lang="ts">
import { useSessionExportQuery } from '@/composables/export/useSessionExportQuery';
import { type PaginationType } from '@/graphql/graphql';
import { useSessionExportStore } from '@/stores/sessionExportStore';
definePageMeta({
  name: 'export',
});
const t = useI18n();
useHead({
  title: t('_form.export.exportList'),
});
const route = useRoute();
const config = useRuntimeConfig();

export type PaginationTypes = {
  last_page?: PaginationType['last_page'];
  total?: PaginationType['total'];
};
const { sessionExportList } = useSessionExportQuery();
const { loading, pagination, refetch, data } = sessionExportList;
const store = useSessionExportStore();
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
