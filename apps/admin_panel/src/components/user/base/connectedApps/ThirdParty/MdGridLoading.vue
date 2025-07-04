<template>
  <div>
    <ui-TableCard v-for="index in pageSize" :key="index" class="mt-md">
      <template #header>
        <div class="flex justify-between">
          <!-- amount column -->
          <div class="flex items-center gap-sm">
            <ui-Skeleton :width="40" :height="40" circle />
            <div class="flex flex-col gap-xs">
              <ui-Skeleton :width="100" :height="12" />
              <ui-Skeleton :width="64" :height="12" />
            </div>
          </div>
        </div>
      </template>
      <template #main>
        <!-- id column -->
        <div class="flex justify-between">
          <ui-Skeleton :width="72" />
          <ui-Skeleton :width="104" />
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <ui-Skeleton :width="24" :height="24" circle />
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
