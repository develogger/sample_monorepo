<template>
  <ui-PageHeading
    :title="$t('_common.page_title.daily_records')"
    :description="$t('_common.pageHeading.daily_records_description')"
    :loading="loading"
    has-back
    class="w-full lg:mx-auto"
    :class="md ? '!h-[144px]' : ''"
    @back-roll="$router.back()"
  >
  </ui-PageHeading>
</template>

<script setup lang="ts">
const { md } = useSize();
const loading = inject('daily_records_loading');
</script>
