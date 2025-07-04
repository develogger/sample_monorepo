<template>
  <div>
    <ExportBaseMdGridLoading v-if="loading" />
    <ExportBaseEmptyGrid v-if="!loading && data && data?.length === 0" />
    <template v-else-if="data && !loading">
      <ui-TableCard v-for="i in data" :key="i?.id" class="root">
        <template #header>
          <div class="root__header">
            <!-- index column -->
            <div class="root__header--id">
              <span class="root__header--id__text">{{ i?.index }}</span>
            </div>
            <!-- status column -->
            <div class="root__header--status">
              <ui-Status
                :text="getStatusInfo(i?.status).text"
                :type="getStatusInfo(i?.status).type"
              />
            </div>
          </div>
        </template>
        <template #main>
          <!-- name column -->
          <div class="root__main--title">
            <div class="root__main--title__label">
              {{ columns[1].label }}
            </div>
            <div class="root__main--title__title truncate">
              {{ i?.name }}
            </div>
          </div>
          <ui-Divider />
          <!-- size column -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[2].label }}
            </div>
            <div class="root__main--title__title">
              {{ i?.size }}
            </div>
          </div>
          <ui-Divider />
          <!-- date colum -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[3].label }}
            </div>
            <div class="root__main--title__title">
              {{ i?.created_at }}
            </div>
          </div>
        </template>
        <template #footer>
          <!-- date colum -->
          <div v-if="i?.url" class="flex justify-end">
            <ui-Tooltip :content="$t('_form.export.download')">
              <a :href="i?.url" target="_blank" download>
                <ui-Icon name="Download" />
              </a>
            </ui-Tooltip>
          </div>
        </template>
      </ui-TableCard>
    </template>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSessionExportColumns } from '../../../composables/export/useSessionExportColumns';
import { useSessionExportStatus } from '../../../composables/export/useSessionExportStatus';
import { useSessionExportStore } from '@/stores/sessionExportStore';
const { columns } = useSessionExportColumns();
const sessionExportStore = useSessionExportStore();
const { data, loading } = storeToRefs(sessionExportStore);
const { getStatusInfo } = useSessionExportStatus();
</script>

<style lang="scss" scoped>
.root {
  @apply mt-md;
  &__header {
    @apply flex justify-between items-center;
    &--id {
      @apply flex items-center gap-sm;
      &__text {
        @apply text-body-400-b2 text-text pl-sm;
      }
    }
  }
  &__main {
    &--title {
      @apply flex justify-between mb-sm gap-2xl;
      &__label {
        @apply text-body-400-b3 text-text-soft font-medium pl-sm min-w-max;
      }
      &__title {
        @apply text-body-400-b2 text-text;
      }
    }
  }
  &__footer {
    @apply flex justify-between;
    &__detail {
      @apply text-body-400-b2 text-primary font-medium my-auto;
    }
    &__button {
      @apply text-body-400-b2 text-text;
    }
  }
}
</style>
