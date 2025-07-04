<template>
  <div>
    <ui-Pagination
      v-if="pagination"
      :current-page="currentPage"
      :rows="+pagination?.total"
      :pages="+pagination?.last_page"
      :loading="loading"
      :page-size="Number(route.query.pageSize) || config.public.pageSize"
      @page-size-selected="setPageSize"
      @page-selected="setPage"
    />
  </div>
</template>

<script setup lang="ts">
import { PaginationType } from '@/graphql/graphql';

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const currentPage = ref(config.public.page);
const pagination = inject<PaginationType>('invoicePagination');
const loading = inject<boolean>('invoiceLoading');
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

watch(
  () => route.query,
  () => {
    currentPage.value = (route.query.page && +route.query.page) || config.public.page;
  }
);
</script>
