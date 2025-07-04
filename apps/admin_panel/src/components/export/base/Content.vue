<template>
  <div class="root">
    <ExportBaseLgGrid v-if="!md" />
    <ExportBaseMdGrid v-if="md" />
    <div v-if="(data && data.length > 0) || loading" class="mt-xl">
      <ExportBasePagination />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSessionExportStore } from '@/stores/sessionExportStore';
const exportStore = useSessionExportStore();
const { loading, data } = storeToRefs(exportStore);
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
