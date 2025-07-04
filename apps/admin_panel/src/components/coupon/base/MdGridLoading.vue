<template>
  <div>
    <ui-TableCard v-for="index in pageSize" :key="index" class="mt-md">
      <template #header>
        <div class="flex justify-between">
          <!-- amount column -->
          <div class="flex gap-sm flex-col">
            <ui-Skeleton :width="104" />
            <ui-Skeleton :width="64" />
          </div>
          <!-- status column -->
          <div class="h-fit my-auto">
            <ui-Skeleton :width="64" />
          </div>
        </div>
      </template>
      <template #main>
        <!-- id column -->
        <div class="flex justify-between my-sm">
          <ui-Skeleton :width="72" />
          <ui-Skeleton :width="104" />
        </div>
        <ui-Divider />
        <!-- reconcile id colum -->
        <div class="flex justify-between my-sm">
          <ui-Skeleton :width="72" />
          <ui-Skeleton :width="104" />
        </div>
        <ui-Divider />
        <!-- reference id colum -->
        <div class="flex justify-between my-sm">
          <ui-Skeleton :width="72" />
          <ui-Skeleton :width="104" />
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <!-- details & actions -->
          <div class="mt-sm">
            <ui-Skeleton :width="64" />
          </div>
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
