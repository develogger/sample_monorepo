<template>
  <div class="pb-3xl w-full container-lg px-md lg:px-0">
    <userBaseHeader ref="userBaseHeaderRef" />
    <userBaseMain />
  </div>
</template>

<script setup lang="ts">
const t = useI18n();
definePageMeta({
  name: 'user-profile',
  layoutTransition: false,
});
useHead({
  title: t('_common.page_title.user_profile'),
});
const userBaseHeaderRef = ref();
provide('userBaseHeaderRef', userBaseHeaderRef);
</script>
