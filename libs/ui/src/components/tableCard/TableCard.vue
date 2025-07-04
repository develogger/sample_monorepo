<template>
  <div class="root" dir="rtl">
    <div class="root__rows">
      <div v-if="slots.header" class="root__rows__header">
        <slot name="header" />
      </div>
      <div v-if="slots.main" class="root__rows__main">
        <slot name="main" />
      </div>
      <div v-if="slots.footer" class="root__rows__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

const slots = useSlots();
</script>

<style lang="scss" scoped>
@use './tableCard.scss';
</style>
