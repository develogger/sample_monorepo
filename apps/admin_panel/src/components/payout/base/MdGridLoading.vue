<template>
  <div>
    <ui-TableCard v-for="index in pageSize" :key="index" class="mt-md">
      <template #header>
        <div class="flex justify-between">
          <!-- iban column -->
          <div class="h-fit my-auto">
            <div class="flex gap-xs items-center">
              <ui-Skeleton :width="40" :height="40" radius="sm" />
              <div class="flex flex-col gap-2xs">
                <ui-Skeleton :width="104" :height="12" />
                <ui-Skeleton :width="64" :height="12" />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #main>
        <!-- status column -->
        <div class="flex justify-between my-sm">
          <ui-Skeleton :width="64" />
          <div class="flex gap-xs items-center">
            <ui-Skeleton :width="64" />
          </div>
        </div>
        <ui-Divider />
        <!-- id column -->
        <div class="flex justify-between my-sm">
          <ui-Skeleton :width="64" />
          <div class="flex gap-xs items-center">
            <ui-Skeleton :width="64" />
          </div>
        </div>
        <ui-Divider />
        <!-- reconcile id colum -->
        <div class="flex justify-between my-sm">
          <ui-Skeleton :width="64" />
          <ui-Skeleton :width="104" />
        </div>
        <ui-Divider />
        <!-- reference id colum -->
        <div class="flex justify-between my-sm">
          <ui-Skeleton :width="64" />
          <ui-Skeleton :width="104" />
        </div>
      </template>
      <template #footer>
        <div class="flex justify-start">
          <ui-Skeleton :width="123" :height="24" radius="sm" />
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
