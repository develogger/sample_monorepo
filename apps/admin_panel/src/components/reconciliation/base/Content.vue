<template>
  <div class="root">
    <ReconciliationBaseEmptyGrid v-if="typeof value.value === 'undefined' && !fetchLoading.value" />
    <ReconciliationBaseLgGrid v-if="!md && (fetchLoading.value || value.value)" />
    <template v-if="md">
      <ReconciliationBaseMdGridLoading v-if="fetchLoading.value" />
      <ReconciliationBaseMdGrid v-else />
    </template>

    <div class="mt-xl">
      <ReconciliationBasePagination v-if="value.value" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
const reconciliationStore = useReconciliationStore();
const { loading, data } = storeToRefs(reconciliationStore);
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
