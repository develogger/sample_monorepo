<template>
  <div class="flex flex-col gap-md">
    <div
      v-for="i in [1, 2, 3]"
      :key="i"
      class="flex flex-col border rounded-sm gap-md p-md border-border-divider dark:border-border-dark-divider"
    >
      <div class="flex flex-col gap-xs">
        <ui-Skeleton :height="12" :width="md ? 80 : 120" class="mb-xs" />

        <ui-Skeleton :height="12" :width="md ? 250 : 350" />
      </div>

      <!-- Postal Code -->
      <div class="flex items-center gap-xs">
        <span class="whitespace-nowrap text-body-400-b3 text-text-soft dark:text-text-dark-soft">
          <ui-Skeleton :height="12" :width="md ? 80 : 140" />
        </span>
        <span class="block h-[1px] w-full border-b border-dashed border-border" />
        <ui-Skeleton :height="12" :width="md ? 100 : 140" />
      </div>

      <!-- Phone Number -->
      <div class="flex items-center gap-xs">
        <ui-Skeleton :height="12" :width="md ? 100 : 140" />
        <span class="block h-[1px] w-full border-b border-dashed border-border" />
        <div class="flex items-center gap-2xs">
          <ui-Skeleton :height="12" :width="md ? 100 : 140" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { md } = useSize();
</script>
