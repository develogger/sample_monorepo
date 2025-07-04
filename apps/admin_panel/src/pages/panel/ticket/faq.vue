<template>
  <div class="container-lg pb-3xl px-md">
    <ticketFaqHeader />
    <ticketFaqMain />
  </div>
</template>
<script lang="ts" setup>
const t = useI18n();
useHead({
  title: t('_common.page_title.faq'),
});
</script>
