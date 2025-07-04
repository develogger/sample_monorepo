<template>
  <div dir="rtl">
    <div v-if="label" class="flex gap-md text-caption-400-c1 mb-md">
      <span class="text-text-soft">{{ label }}</span>
      <span v-if="percent" class="text-text-soft">{{ percent }}%</span>
    </div>
    <div class="bg-surface-soft rounded-sm relative w-full">
      <div
        v-if="progress"
        class="bg-primary rounded-sm"
        :style="{ width: percent + '%', height: size === 'small' ? '0.25rem' : '0.5rem' }"
      >
        &nbsp;
      </div>
      <div
        v-else
        class="rounded-sm animate-reels absolute"
        :style="{ height: size === 'small' ? '0.25rem' : '0.5rem' }"
      >
        &nbsp;
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  label?: string;
  percent?: number;
  size?: 'small' | 'medium';
  progress?: boolean;
}
withDefaults(defineProps<Props>(), {
  label: '',
  percent: undefined,
  size: 'medium',
  progress: true,
});
</script>

<style lang="scss"></style>
