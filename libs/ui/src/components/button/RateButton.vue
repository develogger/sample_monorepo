<template>
  <button class="root__button">
    <span>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
export interface Props {
  text: string;
}
defineProps<Props>();
</script>

<style lang="scss" scoped>
@use './rateButton.scss';
</style>
