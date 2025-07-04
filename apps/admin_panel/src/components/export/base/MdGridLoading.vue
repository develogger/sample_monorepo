<template>
  <div>
    <ui-TableCard v-for="index in pageSize" :key="index" class="mt-md">
      <template #header>
        <div class="flex justify-between py-xs">
          <!-- name column -->
          <div class="flex items-center gap-sm">
            <ui-Skeleton :width="24" />
          </div>
          <!-- status column -->
          <div class="h-fit my-auto">
            <ui-Skeleton :width="64" />
          </div>
        </div>
      </template>
      <template #main>
        <!-- name column -->
        <div class="flex justify-between mb-sm py-[6px]">
          <ui-Skeleton :width="72" />
          <ui-Skeleton :width="104" />
        </div>
        <ui-Divider />
        <!-- date colum -->
        <div class="flex justify-between mt-sm py-[6px]">
          <ui-Skeleton :width="72" />
          <ui-Skeleton :width="104" />
        </div>
      </template>
      <template #footer>
        <!-- size colum -->
        <div class="flex justify-between mt-sm py-[6px]">
          <ui-Skeleton :width="72" />
          <ui-Skeleton :width="104" />
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
