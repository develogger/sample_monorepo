<template>
  <div>
    <DashboardBaseEmptyGrid v-if="latestData && !latestData.length && !loading" />
    <ui-Table v-else :columns="columns" :items="latestData" :loading="loading" @click-row="clicked">
      <!-- amount template -->
      <template #column-amount="header">
        <ui-Skeleton :loading="loading" :width="40" class="mt-2xs">
          <div class="h-fit flex -mt-2xs">
            <span class="truncate">{{ header.label }}</span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs" />
          </div>
        </ui-Skeleton>
      </template>
      <!-- id column template -->
      <template #item-id="{ id }">
        <div class="flex items-center gap-sm">
          <span>{{ id }}</span>
        </div>
      </template>
      <!-- id column template -->
      <template #item-amount="{ amount, fee }">
        <div :class="amount === 0 ? 'text-text-danger' : ''" class="flex items-center gap-sm">
          <span dir="ltr">{{ amount === 0 ? numberFormat(fee * -1) : numberFormat(amount) }}</span>
        </div>
      </template>
      <template #item-description="{ amount, description }">
        <div class="flex gap-sm overflow-hidden">
          <ui-Label v-if="amount === 0" :text="$t('common.fee')" type="neutral" />
          <span class="truncate full-width">{{ description }}</span>
        </div>
      </template>
      <!-- status template -->
      <template #item-status="{ status, reconciliation_id, refund_id, refund_status }">
        <div class="h-fit flex gap-2xs">
          <ui-Status :text="getStatusInfo(status).text" :type="getStatusInfo(status).type" />
          <ui-Tooltip :content="$t('session.show.time_line.verified')">
            <ui-Status
              v-if="SessionStatusEnum.Verified === status"
              icon="CheckMarkCircleFill"
              type="informative"
            />
          </ui-Tooltip>
          <ui-Tooltip :content="$t('session.show.time_line.reconciled')">
            <ui-Status v-if="reconciliation_id" icon="DollarFill" type="positive" />
          </ui-Tooltip>
          <ui-Tooltip :content="$t('refund.title')">
            <ui-Status
              v-if="refund_id && refund_status && status !== 'REJECTED'"
              icon="RefundFill"
              type="warning"
            />
          </ui-Tooltip>
        </div>
      </template>

      <!-- loading template -->
      <template #loadingSkeleton>
        <div v-for="index in 5" :key="index" class="loading">
          <div
            class="grid border-t border-t-border-divider"
            style="grid-template-columns: 10% 15% 35% 15% 25%"
          >
            <div class="flex items-center">
              <ui-Skeleton :width="60" :height="12" class="px-sm py-md" />
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
import { useSessionColumns } from '@/composables/session/useSessionColumns';
import { useSessionQuery } from '@/composables/session/useSessionQuery';
import { useSessionStatus } from '@/composables/session/useSessionStatus';
import { SessionStatusEnum } from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';

export interface Props {
  loading: boolean;
}
const props = withDefaults(defineProps<Props>(), {});
const { loading } = toRefs(props);
const store = useSessionStore();
const { columns } = useSessionColumns();
const { getStatusInfo } = useSessionStatus();
const { data, load, loading: loadingSession } = useSessionQuery().sessionList;
const router = useRouter();
const { numberFormat } = useMath();
const terminal = useTerminalStore();
store.loading = loadingSession;
const latestData = computed(() => {
  if (data.value && data.value) {
    return data.value.slice(0, 5);
  }

  return [];
});
const clicked = (item: { id: string | number }) => {
  router.push(`/panel/${terminal.currentDomain}/session/${item.id}`);
};
onMounted(() => {
  load();
});
</script>
