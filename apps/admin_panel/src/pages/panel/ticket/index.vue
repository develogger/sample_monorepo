<template>
  <div class="pb-3xl w-full container-xl">
    <ticketBaseHeader />
    <ticketBaseMain />
  </div>
</template>

<script setup lang="ts">
import type { PaginationType } from '@/graphql/graphql';
import { useTicketQuery } from '@/composables/ticket/useTicketQuery';

const t = useI18n();
useHead({
  title: t('_common.page_title.tickets'),
});
definePageMeta({
  name: 'ticket',
});
export type PaginationTypes = {
  last_page?: PaginationType['last_page'];
  total?: PaginationType['total'];
};

const { fetchData } = useTicketQuery();
const route = useRoute();
const config = useRuntimeConfig();
watch(
  () => route.query,
  () => fetchData(Number(route.query.pageSize) || config.public.pageSize)
);

onMounted(() => {
  fetchData();
});
</script>
