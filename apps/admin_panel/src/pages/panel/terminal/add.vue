<template>
  <div class="w-full h-full px-md pb-3xl">
    <TerminalAddHeader />
    <TerminalAddMain />
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  name: 'add-terminal',
  layout: 'base',
});
const t = useI18n();
useHead({
  title: t('_common.page_title.create_terminal'),
});
</script>
