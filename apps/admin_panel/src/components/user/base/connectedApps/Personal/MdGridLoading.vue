<template>
  <div>
    <ui-TableCard v-for="index in pageSize" :key="index" class="mt-md">
      <template #header>
        <div class="flex justify-between">
          <!-- amount column -->
          <div class="flex items-center gap-sm">
            <ui-Skeleton :width="48" :height="12" />
          </div>
          <!-- status column -->
          <div class="h-fit my-auto">
            <ui-Skeleton :width="48" :height="12" />
          </div>
        </div>
        <ui-Divider class="mt-sm" />
      </template>
      <template #main>
        <!-- id column -->
        <div class="flex justify-between">
          <ui-Skeleton :width="72" />
          <ui-Skeleton :width="104" />
        </div>

        <ui-Divider class="my-sm" />
        <!-- description colum -->
        <div class="flex justify-end">
          <ui-Skeleton :width="24" :height="24" class="rounded-sm" />
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
