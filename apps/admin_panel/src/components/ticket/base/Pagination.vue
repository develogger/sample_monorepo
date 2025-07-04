<template>
  <div>
    <ui-Pagination
      v-if="ticketStore.pagination?.last_page"
      :current-page="currentPage"
      :rows="+ticketStore.pagination.total"
      :pages="+ticketStore.pagination.last_page"
      :loading="fetchLoading.value"
      :page-size="Number(route.query.pageSize) || config.public.pageSize"
      @page-size-selected="setPageSize"
      @page-selected="setPage"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

const config = useRuntimeConfig();
const ticketStore = useTicketStore();
const { loading } = storeToRefs(ticketStore);
const fetchLoading = computed(() => loading);
const route = useRoute();
const router = useRouter();
const currentPage = ref(config.public.page);
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
