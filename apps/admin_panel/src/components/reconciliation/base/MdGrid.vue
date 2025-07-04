<template>
  <div>
    <ui-TableCard v-for="i in data" :key="i?.id" class="root">
      <template #header>
        <div class="root__header">
          <!-- amount column -->
          <div class="root__header--id">
            <span class="root__header--id__text">{{ calculateFee(i.amount, i.fee) }}</span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" />
          </div>
          <div class="root__header--status flex items-center justify-center">
            <ui-Status
              :text="getStatusInfo(i?.status).text"
              :type="getStatusInfo(i?.status).type"
            />
          </div>
        </div>
      </template>
      <template #main>
        <!-- id column -->
        <div class="root__main--title">
          <div class="root__main--title__label">
            {{ columns[0].label }}
          </div>
          <div class="root__main--title__title">
            {{ i?.id }}
          </div>
        </div>
        <ui-Divider />
        <!-- date colum -->
        <!-- date colum -->
        <div class="root__main--title mt-sm">
          <div class="root__main--title__label">
            {{ columns[3].label }}
          </div>
          <div class="root__main--title__title">
            {{ i?.estimated_payed_at }}
          </div>
        </div>
      </template>
      <template #footer>
        <!-- action column -->
        <div class="root__footer">
          <div class="root__footer__detail">
            <NuxtLink
              class="flex items-center"
              :to="`/panel/${terminal.currentDomain}/reconciliation/${i?.id}`"
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
import { useReconciliationColumns } from '@/composables/reconciliation/useReconciliationColumns';
import { useReconciliationStatus } from '@/composables/reconciliation/useReconciliationStatus';

const { columns } = useReconciliationColumns();
const { numberFormat } = useMath();
const reconciliationStore = useReconciliationStore();
const terminal = useTerminalStore();
const { data } = storeToRefs(reconciliationStore);
const { getStatusInfo } = useReconciliationStatus();
const calculateFee = (amount: number, fee: number) => numberFormat(amount - fee);
// check this with computed
</script>

<style lang="scss" scoped>
.root {
  @apply mt-md;
  &__header {
    @apply flex justify-between;
    &--id {
      @apply flex items-center;
      &__text {
        @apply text-body-400-b1 text-text pl-sm;
      }
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
