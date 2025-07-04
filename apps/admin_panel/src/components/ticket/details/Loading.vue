<template>
  <div class="replies">
    <div class="flex gap-md mb-xl">
      <div class="replies__root--default" dir="rtl">
        <div class="flex flex-col gap-sm">
          <ui-Skeleton :loading="loading" />
          <ui-Skeleton :loading="loading" />
          <ui-Skeleton :loading="loading" :width="sm ? 100 : 300" />
        </div>
        <div class="float-left mt-sm">
          <ui-Skeleton :loading="loading" :width="100" />
        </div>
      </div>
      <div class="w-[40px]">
        <ui-Skeleton :loading="loading" :width="40" :height="40" circle />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { sm } = useSize();
export interface Props {
  loading: boolean;
}
defineProps<Props>();
</script>

<style lang="scss" scoped>
.replies {
  &__root--default {
    @apply w-full border border-border-divider rounded-l-md rounded-br-md rounded-tr-sm p-lg;
  }
}
</style>
