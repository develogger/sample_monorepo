<template>
  <div class="pb-3xl pt-2xl w-full container-xl">
    <overviewBaseHeader />
    <overviewBaseMain />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  name: 'overview',
});
const t = useI18n();
useHead({
  title: `${t('_common.page_title.select_terminal')}`,
});
</script>
