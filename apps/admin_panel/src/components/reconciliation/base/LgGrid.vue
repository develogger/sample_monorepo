<template>
  <div>
    <ui-Table :columns="columns" :items="data" :loading="loading" @click-row="clicked">
      <!-- id column template -->
      <template #item-id="{ id }">
        <NuxtLink :to="`/panel/${domain}/reconciliation/${id}`" class="h-fit flex gap-2xs">
          {{ id }}
        </NuxtLink>
      </template>
      <!-- amount template -->
      <template #column-amount="header">
        <ui-Skeleton :loading="loading" :width="40" class="mt-2xs">
          <div class="h-fit flex -mt-2xs">
            <span class="truncate">{{ header.label }}</span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs" />
          </div>
        </ui-Skeleton>
      </template>
      <!-- status template -->
      <template #item-status="{ status }">
        <div class="h-fit flex gap-2xs">
          <ui-Status :text="getStatusInfo(status).text" :type="getStatusInfo(status).type" />
        </div>
      </template>
      <template #item-amount="{ amount, fee, id }">
        <NuxtLink :to="`/panel/${domain}/reconciliation/${id}`" class="h-fit flex gap-2xs">
          {{ calculateFee(amount, fee) }}
        </NuxtLink>
      </template>
      <template #item-reference_id="{ reference_id, id }">
        <NuxtLink :to="`/panel/${domain}/reconciliation/${id}`" class="h-fit flex gap-2xs">
          <span class="truncate max-w-[220px]">{{ reference_id }}</span>
        </NuxtLink>
      </template>
      <!-- loading template -->
      <template #loadingSkeleton>
        <div v-for="index in pageSize" :key="index" class="loading">
          <div
            class="grid border-t border-t-border-divider"
            style="grid-template-columns: 20% 20% 24% 20% 16%"
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
            <div class="my-auto">
              <ui-Skeleton :width="60" :height="12" class="px-md py-md" />
            </div>
          </div>
        </div>
      </template>
    </ui-Table>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useReconciliationColumns } from '@/composables/reconciliation/useReconciliationColumns';
import { useReconciliationStatus } from '@/composables/reconciliation/useReconciliationStatus';

const { columns } = useReconciliationColumns();
const { getStatusInfo } = useReconciliationStatus();
const { numberFormat } = useMath();
const reconciliationStore = useReconciliationStore();
const { loading, data } = storeToRefs(reconciliationStore);
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const domain = useTerminalStore().currentDomain;
const calculateFee = (amount: number, fee: number) => numberFormat(amount - fee);
const clicked = (item: { id: string | number }) => {
  router.push(`/panel/${domain}/reconciliation/${item.id}`);
};
const pageSize = computed(() => Number(route.query.pageSize) || config.public.pageSize);
</script>
