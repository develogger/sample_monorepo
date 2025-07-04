<template>
  <div class="pb-3xl pt-2xl mx-auto max-w-[360px]">
    <overviewBaseHeader />
    <OnboardingBaseMain />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  name: 'onboarding',
});
const t = useI18n();
useHead({
  title: `${t('_common.page_title.onboarding')}`,
});
</script>
