<template>
  <div>
    <ui-TableCard v-for="i in data" :key="i?.id" class="root">
      <template #header>
        <div class="root__header">
          <!-- amount column -->
          <div class="root__header--id">
            <span
              dir="ltr"
              :class="i?.amount === 0 ? '!text-text-danger' : ''"
              class="root__header--id__text"
            >
              {{ i?.amount === 0 ? numberFormat(i?.fee * -1) : numberFormat(i?.amount) }}
            </span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" />
          </div>
          <!-- status column -->
          <div class="root__header--status">
            <ui-Status
              :text="getStatusInfo(i?.status).text"
              :type="getStatusInfo(i?.status).type"
            />
            <ui-Status
              v-if="SessionStatusEnum.Verified === i?.status"
              icon="CheckMarkCircleFill"
              type="informative"
            />
            <ui-Status
              v-if="i?.reconciliation_id && i?.reconciled_status === 'PAID'"
              icon="DollarFill"
              type="positive"
            />
            <ui-Status
              v-if="i?.refund_id && i?.refund_status && i?.status !== 'REJECTED'"
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
import { storeToRefs } from 'pinia';
import { SessionStatusEnum } from '@/graphql/graphql';
import { useSessionColumns } from '@/composables/session/useSessionColumns';
import { useSessionStatus } from '@/composables/session/useSessionStatus';
const { columns } = useSessionColumns();
const sessionStore = useSessionStore();
const terminalStore = useTerminalStore();
const { data } = storeToRefs(sessionStore);
const { getStatusInfo } = useSessionStatus();
const { numberFormat } = useMath();
</script>

<style lang="scss" scoped>
.root {
  @apply mt-md;
  &__header {
    @apply flex justify-between flex-wrap gap-xs;
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
