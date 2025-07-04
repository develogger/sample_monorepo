<template>
  <div>
    <InvoiceDetailsEmptyGrid v-if="!loading && data && data?.length === 0" />
    <ui-Table
      v-else-if="data || loading"
      :columns="detailColumns"
      :items="data"
      :loading="loading"
      @click-row="clicked"
    >
      <!-- amount template -->
      <template #column-amount="header">
        <ui-Skeleton :loading="loading" :width="40" class="mt-2xs">
          <div class="h-fit flex -mt-2xs">
            <span class="truncate">{{ header.label }}</span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs" />
          </div>
        </ui-Skeleton>
      </template>
      <template #item-amount="{ amount }">
        <span>{{ amount }}</span>
      </template>
      <template #item-status="{ status }">
        <div class="h-fit">
          <ui-Status :text="getStatusInfo(status).text" :type="getStatusInfo(status).type" />
        </div>
      </template>
      <!-- loading template -->
      <template #loadingSkeleton>
        <div v-for="index in 4" :key="index" class="loading">
          <div
            class="grid border-t border-t-border-divider"
            style="
              grid-template-columns: 200px minmax(100px, 3fr) minmax(160px, 1fr) minmax(60px, 1fr) minmax(
                  104px,
                  1fr
                );
            "
          >
            <div class="flex items-center">
              <ui-Skeleton :width="104" :height="12" class="px-sm py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="104" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="104" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="60" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto justify-self-end">
              <ui-Skeleton :width="40" :height="40" class="px-md py-md" />
            </div>
          </div>
        </div>
      </template>
    </ui-Table>
  </div>
</template>
<script lang="ts" setup>
import { SessionType } from '@/graphql/graphql';
import { useInvoiceColumns } from '@/composables/invoice/useInvoiceColumns';
import { useSessionStatus } from '@/composables/session/useSessionStatus';

export interface Props {
  data: SessionType[];
  loading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {});
const { loading, data } = toRefs(props);
const { detailColumns } = useInvoiceColumns();
const { getStatusInfo } = useSessionStatus();
const router = useRouter();
const domain = useTerminalStore().currentDomain;
const clicked = (item: SessionType) => {
  router.push(`/panel/${domain}/session/${item.id}`);
};
</script>
