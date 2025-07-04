<template>
  <div
    class="text-caption-400-c1 md:p-sm py-sm px-xs relative"
    style="height: 104px"
    :class="[disabled ? 'bg-surface-soft text-text-disabled' : 'bg-surface text-text']"
  >
    <Skeleton
      :loading="loading"
      :width="20"
      :height="20"
      circle
      class="absolute md:bottom-sm md:top-auto md:left-sm top-xs"
    >
      <div class="flex items-center justify-center gap-xs">
        <span
          class="rounded-circle flex items-center justify-center w-lg h-lg"
          :class="[active ? 'text-surface bg-primary' : 'bg-surface-soft text-text']"
        >
          {{ value }}
        </span>
        <span
          class="text-caption-500-c1 md:hidden flex"
          :class="[disabled ? 'text-text-disabled' : 'text-text']"
        >
          {{ week }}
        </span>
      </div>
    </Skeleton>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import Skeleton from '../ui/Skeleton.vue';

interface Props {
  disabled: boolean;
  value: number;
  active?: boolean;
  week?: string;
}
withDefaults(defineProps<Props>(), {
  disabled: false,
  week: '',
});
const loading = inject<boolean>('loading');
</script>
