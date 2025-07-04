<template>
  <div class="pb-3xl w-full container-xl">
    <DashboardBaseHeader :loading="store.dashboardLoading" />
    <DashboardBaseMain />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'dashboard',
  layout: 'terminal',
});
const t = useI18n();
useHead({
  title: t('_common.page_title.dashboard'),
});
const store = useSessionStore();
</script>
