<template>
  <div>
    <div class="content-container">
      <slot name="default" />
      <Button class="fixed-button" :icon="icon" :loading="loading" :disabled="disabled" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '../button/Button.vue';

export interface Props {
  icon: string;
  loading: boolean;
  disabled: boolean;
}

withDefaults(defineProps<Props>(), {});
</script>

<style lang="scss" scoped>
.content-container {
  @apply relative;
}

.fixed-button {
  @apply absolute -left-2xs -bottom-2xs w-[28px] h-[28px] rounded-circle;
}
</style>
