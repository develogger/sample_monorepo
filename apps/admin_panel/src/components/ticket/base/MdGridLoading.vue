<template>
  <div>
    <ui-TableCard v-for="index in pageSize" :key="index" class="mt-md">
      <template #header>
        <div class="flex justify-between">
          <!-- id column -->
          <div class="flex items-center gap-sm">
            <ui-Skeleton :width="40" :height="40" />
            <ui-Skeleton :width="104" />
          </div>
          <!-- status column -->
          <div class="h-fit my-auto">
            <ui-Skeleton :width="64" />
          </div>
        </div>
      </template>
      <template #main>
        <!-- title column -->
        <div class="flex justify-between mb-sm">
          <ui-Skeleton :width="72" />
          <ui-Skeleton :width="104" />
        </div>
        <ui-Divider />
        <!-- date colum -->
        <div class="flex justify-between mt-sm">
          <ui-Skeleton :width="72" />
          <ui-Skeleton :width="104" />
        </div>
      </template>
      <template #footer>
        <!-- action column -->
        <div class="flex justify-between">
          <ui-Skeleton :width="122" :height="24" />
        </div>
      </template>
    </ui-TableCard>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();
const pageSize = computed(() => Number(route.query.pageSize) || config.public.pageSize);
</script>
