<template>
  <div>
    <ui-Table
      :columns="columns"
      :items="data"
      :loading="loading"
      :link="link"
      linkable
      @click-row="clicked"
      @context-link="handleLink"
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
      <!-- id column template -->
      <template #item-id="{ id }">
        <NuxtLink
          :to="`/panel/${terminal.currentDomain}/session/${id}`"
          class="flex items-center gap-sm"
        >
          <span>{{ id }}</span>
        </NuxtLink>
      </template>
      <template #item-description="{ description, id, amount }">
        <NuxtLink
          :to="`/panel/${terminal.currentDomain}/session/${id}`"
          class="flex items-center gap-sm overflow-hidden"
        >
          <ui-Label v-if="amount === 0" :text="$t('common.fee')" type="neutral" />
          <span class="truncate full-width">{{ description }}</span>
        </NuxtLink>
      </template>
      <template #item-amount="{ amount, id, fee }">
        <NuxtLink
          :to="`/panel/${terminal.currentDomain}/session/${id}`"
          class="flex items-center gap-sm"
        >
          <span dir="ltr" :class="amount === 0 ? 'text-text-danger' : ''">{{
            amount === 0 ? numberFormat(fee * -1) : numberFormat(amount)
          }}</span>
        </NuxtLink>
      </template>
      <!-- status template -->
      <template
        #item-status="{ status, reconciliation_id, refund_id, refund_status, reconciled_status }"
      >
        <div class="h-fit flex gap-2xs">
          <ui-Status :text="getStatusInfo(status).text" :type="getStatusInfo(status).type" />
          <ui-Tooltip
            v-if="SessionStatusEnum.Verified === status"
            :content="$t('session.show.time_line.verified')"
          >
            <ui-Status icon="CheckMarkCircleFill" type="informative" />
          </ui-Tooltip>
          <ui-Tooltip
            v-if="reconciliation_id && reconciled_status === 'PAID'"
            :content="$t('session.show.time_line.reconciled')"
          >
            <ui-Status icon="DollarFill" type="positive" />
          </ui-Tooltip>
          <ui-Tooltip
            v-if="refund_id && refund_status && status !== 'REJECTED'"
            :content="$t('refund.title')"
          >
            <ui-Status icon="RefundFill" type="warning" />
          </ui-Tooltip>
        </div>
      </template>

      <!-- loading template -->
      <template #loadingSkeleton>
        <div v-for="index in pageSize" :key="index" class="loading">
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
import { storeToRefs } from 'pinia';
import { SessionStatusEnum } from '@/graphql/graphql';
const { columns } = useSessionColumns();
const { getStatusInfo } = useSessionStatus();
const sessionStore = useSessionStore();
const { loading, data } = storeToRefs(sessionStore);
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const { numberFormat } = useMath();
const terminal = useTerminalStore();
const link = ref();
const handleLink = (item: { id: string | number }) =>
  (link.value = `/panel/${terminal.currentDomain}/session/${item.id}`);
const clicked = (item: { id: string | number }) => {
  router.push({
    path: `/panel/${terminal.currentDomain}/session/${item.id}`,
  });
};
const pageSize = computed(() => Number(route.query.pageSize) || config.public.pageSize);
</script>
