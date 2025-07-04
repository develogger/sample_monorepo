<template>
  <div ref="topBarRef" class="topbar">
    <div class="flex items-center" :class="startClasses">
      <slot name="startSection" />
    </div>
    <div class="flex items-center" :class="centerClasses">
      <slot name="centerSection" />
    </div>
    <div class="flex items-center" :class="endClasses">
      <slot name="endSection" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

export interface Props {
  startClasses?: string;
  centerClasses?: string;
  endClasses?: string;
}
export interface TopBarElementType extends HTMLElement {
  calcTopBarHeight: () => number;
}
withDefaults(defineProps<Props>(), {
  startClasses: '',
  centerClasses: '',
  endClasses: '',
});
const topBarRef = ref();
const calcTopBarHeight = () => topBarRef.value && topBarRef.value.getBoundingClientRect().height;
defineExpose({ calcTopBarHeight });
</script>
<style lang="scss">
.topbar {
  @apply flex py-xs justify-between h-[56px] sticky top-0 px-md bg-surface shadow-divider-bottom dark:bg-surface-dark dark:text-text-dark dark:shadow-dark-divider-bottom z-[50];
}
</style>
