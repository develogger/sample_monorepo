<template>
  <ui-Pagination
    :current-page="Number(route.query.page) || config.public.page"
    :rows="+pagination?.total"
    :pages="+pagination?.last_page"
    :loading="fetchLoading.value"
    :page-size="Number(route.query.pageSize) || config.public.pageSize"
    @page-size-selected="setPageSize"
    @page-selected="setPage"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSessionExportStore } from '@/stores/sessionExportStore';
const config = useRuntimeConfig();
const sessionExportStore = useSessionExportStore();
const { loading, pagination } = storeToRefs(sessionExportStore);
const fetchLoading = computed(() => loading);
const route = useRoute();
const router = useRouter();
/**
 * set route query page
 * @param value pageSize value from route query
 */
const setPageSize = (value: number) => {
  router.push({
    query: {
      ...route.query,
      page: config.public.page,
      pageSize: value,
    },
  });
};
/**
 * set route query page
 * @param value page value from route query
 */
const setPage = (value: number) => {
  router.push({
    query: {
      ...route.query,
      page: value,
    },
  });
};
</script>
