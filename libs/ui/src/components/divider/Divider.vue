<template>
  <div class="relative">
    <div
      class="root"
      :class="type === 'horizontal' ? 'horizontal' : 'vertical'"
      :style="{
        height: type === 'vertical' ? height + 'px' : '',
        'border-style': borderStyle,
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  type?: 'horizontal' | 'vertical';
  height?: number;
  borderStyle?: 'dashed' | 'solid' | 'dotted' | 'none' | 'inset';
}
withDefaults(defineProps<Props>(), {
  type: 'horizontal',
  height: 20,
  borderStyle: 'solid',
});
</script>

<style lang="scss" scoped>
.horizontal {
  @apply border-t border-t-border-divider;
}
.vertical {
  @apply border-l border-l-border-divider;
}
</style>
