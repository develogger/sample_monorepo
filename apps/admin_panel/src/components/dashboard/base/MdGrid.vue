<template>
  <DashboardBaseMdGridLoading v-if="loading" />
  <DashboardBaseEmptyGrid v-else-if="latestData && !latestData.length" />
  <div v-else>
    <ui-TableCard v-for="i in latestData" :key="i?.id" class="root">
      <template #header>
        <div class="root__header">
          <!-- amount column -->
          <div class="root__header--id">
            <span
              :class="i?.amount === 0 ? '!text-text-danger' : ''"
              class="root__header--id__text"
              dir="ltr"
            >
              {{ i?.amount === 0 ? numberFormat(i?.fee * -1) : numberFormat(i?.amount) }}
            </span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" />
          </div>
          <!-- status column -->
          <div class="root__header--status">
            <ui-Status
              v-if="i?.status"
              :text="getStatusInfo(i.status).text"
              :type="getStatusInfo(i.status).type"
            />
            <ui-Status
              v-if="SessionStatusEnum.Verified === i?.status"
              icon="CheckMarkCircleFill"
              type="informative"
            />
            <ui-Status v-if="i?.reconciliation_id" icon="DollarFill" type="positive" />
            <ui-Status
              v-if="i?.refund_id && i?.refund_status && isValidStatus(i?.status!)"
              icon="RefundFill"
              type="warning"
            />
          </div>
        </div>
      </template>
      <template #main>
        <!-- id column -->
        <div class="root__main--title">
          <div class="root__main--title__label">
            {{ columns[1].label }}
          </div>
          <div class="root__main--title__title">
            {{ i?.id }}
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
        <ui-Divider />
        <!-- description colum -->
        <div class="root__main--title mt-sm">
          <div class="root__main--title__label">
            {{ columns[2].label }}
          </div>
          <div class="root__main--title__title">
            <ui-Label
              v-if="i?.amount === 0"
              :text="$t('common.fee')"
              type="neutral"
              class="ml-xs"
            />

            {{ i?.description }}
          </div>
        </div>
      </template>
      <template #footer>
        <!-- action column -->
        <div class="root__footer">
          <div class="root__footer__detail">
            <NuxtLink
              class="flex items-center"
              :to="`/panel/${terminalStore.currentDomain}/session/${i?.id}`"
              no-prefetch
            >
              <span>{{ $t('_common.table.detail') }}</span>
              <ui-Icon name="AngleLeft" />
            </NuxtLink>
          </div>
        </div>
      </template>
    </ui-TableCard>
  </div>
</template>

<script setup lang="ts">
import { SessionStatusEnum } from '@/graphql/graphql';

const { numberFormat } = useMath();
const { columns } = useSessionColumns();
const { data, load, loading } = useSessionQuery().sessionList;
const terminalStore = useTerminalStore();
const latestData = computed(() => {
  if (data.value && data.value) {
    return data.value.slice(0, 5);
  }

  return [];
});
const { getStatusInfo } = useSessionStatus();
onMounted(() => {
  load();
});

const isValidStatus = (status: string) =>
  status === 'CONFLICTED' ||
  status === 'FAILED' ||
  status === 'INBANK' ||
  status === 'PAID' ||
  status === 'VERIFIED';
</script>
<style lang="scss" scoped>
.root {
  @apply mt-md;
  &__header {
    @apply flex justify-between;
    &--id {
      @apply flex items-center gap-2xs;
      &__text {
        @apply text-body-400-b2 text-text;
      }
    }
    &--status {
      @apply flex gap-2xs;
    }
  }
  &__main {
    &--title {
      @apply flex justify-between mb-sm;
      &__label {
        @apply text-body-400-b3 text-text-soft font-medium pl-sm;
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
