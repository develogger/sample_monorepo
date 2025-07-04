<template>
  <div>
    <ui-TableCard v-for="index in 3" :key="index" class="mt-md">
      <template #header>
        <div class="flex justify-between">
          <!-- amount column -->
          <div class="flex items-center gap-sm">
            <ui-Skeleton :width="104" />
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
        <!-- created_at column -->
        <div class="flex justify-between my-sm">
          <ui-Skeleton :width="72" />
          <ui-Skeleton :width="104" />
        </div>
      </template>
    </ui-TableCard>
  </div>
</template>
