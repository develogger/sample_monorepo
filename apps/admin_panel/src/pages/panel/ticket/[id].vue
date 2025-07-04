<template>
  <div>
    <TicketDetailsHeader />
    <div class="container-lg pb-3xl px-md md:px-0">
      <TicketDetailsMain />
      <TicketDetailsReply />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTicketDetailsQuery } from '@/composables/ticket/useTicketDetailsQuery';
const ticketStore = useTicketStore();
const { fetchData } = useTicketDetailsQuery();
const t = useI18n();
const pageTitle = computed(() =>
  ticketStore.detailsData?.title ? ticketStore.detailsData?.title : t('_common.page_title.tickets')
);
useHead({
  title: pageTitle,
});
fetchData();
</script>
