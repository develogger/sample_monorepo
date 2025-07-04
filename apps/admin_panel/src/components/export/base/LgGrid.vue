<template>
  <div>
    <ExportBaseEmptyGrid v-if="!loading && data?.length === 0" />
    <ui-Table
      v-else
      :columns="columns"
      :items="data"
      :loading="loading || exportStore.loading"
      :pagination="pagination"
    >
      <!-- index column template -->
      <template #column-index="header">
        <ui-Skeleton :loading="loading" :width="24" class="mt-2xs">
          <span>{{ header.label }}</span>
        </ui-Skeleton>
      </template>

      <!-- index column template -->
      <template #item-index="{ index }">
        <div class="flex items-center gap-sm">
          <span>{{ index }}</span>
        </div>
      </template>
      <!-- name column template -->
      <template #item-name="{ name }">
        <div class="flex items-center w-full truncate">
          <span class="truncate">{{ name }}</span>
        </div>
      </template>
      <!-- status template -->
      <template #item-status="{ status }">
        <div class="h-fit flex gap-2xs">
          <ui-Status :text="getStatusInfo(status).text" :type="getStatusInfo(status).type" />
        </div>
      </template>
      <!-- action template -->
      <template #item-action="{ id, url }">
        <div v-if="url" class="flex">
          <ui-Tooltip :content="$t('_form.export.download')">
            <a :href="url" target="_blank" download>
              <ui-Icon name="Download" :type="id" class="float-left" />
            </a>
          </ui-Tooltip>
        </div>
      </template>
      <!-- loading template -->
      <template #loadingSkeleton>
        <div v-for="index in pageSize" :key="index" class="loading">
          <div
            class="grid border-t border-t-border-divider"
            style="
              grid-template-columns:
                60px
                minmax(200px, 2fr)
                minmax(100px, 1fr)
                minmax(100px, 1fr)
                minmax(100px, 1fr)
                60px;
            "
          >
            <div class="my-auto">
              <ui-Skeleton :width="24" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="180" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="104" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="104" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="104" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto justify-self-end">
              <ui-Skeleton :width="32" :height="32" class="px-md py-md" />
            </div>
          </div>
        </div>
      </template>
    </ui-Table>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSessionExportColumns } from '@/composables/export/useSessionExportColumns';
import { useSessionExportStatus } from '@/composables/export/useSessionExportStatus';
import { useSessionExportStore } from '@/stores/sessionExportStore';
const { columns } = useSessionExportColumns();
const { getStatusInfo } = useSessionExportStatus();
const sessionExportStore = useSessionExportStore();
const { loading, data, pagination } = storeToRefs(sessionExportStore);
const config = useRuntimeConfig();
const route = useRoute();
const exportStore = useSessionExportStore();
const pageSize = computed(() => Number(route.query.pageSize) || config.public.pageSize);
</script>
