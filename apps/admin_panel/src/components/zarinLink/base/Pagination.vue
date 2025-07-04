<template>
  <div>
    <ui-Pagination
      v-if="pagination"
      :current-page="Number(route.query.page) || config.public.page"
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
const pagination = inject<PaginationType>('zarinLinksPagination');
const loading = inject<boolean>('zarinLinksLoading');
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
