<template>
  <div class="container-lg pb-3xl px-md">
    <TicketAddHeader />
    <TicketAddMain />
  </div>
</template>

<script setup lang="ts">
const t = useI18n();
useHead({
  title: t('_common.page_title.addTicket'),
});
</script>
