<template>
  <div class="root">
    <SessionBaseEmptyGrid
      v-if="(typeof value.value === 'undefined' || !value.value.length) && !fetchLoading.value"
    />
    <SessionBaseLgGrid v-if="!md && (fetchLoading.value || (value.value && value.value.length))" />
    <template v-if="md">
      <SessionBaseMdGridLoading v-if="fetchLoading.value" />
      <SessionBaseMdGrid v-else />
    </template>
    <div class="mt-xl">
      <SessionBasePagination v-if="value.value && value.value.length" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
const sessionStore = useSessionStore();
const { loading, data } = storeToRefs(sessionStore);
const value = computed(() => data);
const fetchLoading = computed(() => loading);
const { md } = useSize();
</script>

<style lang="scss" scoped>
.root {
  @apply font-yekanFa;
}
.loading {
  @apply flex;
}
</style>
