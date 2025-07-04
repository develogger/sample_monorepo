<template>
  <div class="root">
    <div class="root__vector">
      <Illustration :name="vector" />
    </div>
    <div class="root__title">
      {{ title }}
    </div>
    <div class="root__description">{{ description }}</div>
    <div class="root__action">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Illustration from '../illustration/Illustration.vue';

export interface Props {
  title?: string;
  description: string;
  vector: string;
}
defineProps<Props>();
</script>

<style lang="scss" scoped>
@use './emptyState.scss';
</style>
