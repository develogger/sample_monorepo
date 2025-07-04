<template>
  <UserBaseTerminalEmptyGrid v-if="typeof value.value === 'undefined' && !fetchLoading.value" />
  <UserBaseTerminalLgGrid v-if="!md && (fetchLoading.value || value.value)" />
  <UserBaseTerminalMdGridLoading v-if="md && fetchLoading.value" />
  <UserBaseTerminalMdGrid v-if="md" />
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
const terminal = useTerminalStore();
const { loading, data } = storeToRefs(terminal);
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
