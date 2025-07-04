<template>
  <div>
    <InvoiceBaseMdGridLoading v-if="loading" />
    <InvoiceBaseEmptyGrid v-if="!loading && data && data?.length === 0" />
    <div v-else-if="data && !loading">
      <ui-TableCard v-for="i in data" :key="i?.id" class="root">
        <template #header>
          <div class="root__header">
            <!-- amount column -->
            <div class="root__header--id">
              <span class="root__header--id__text">{{ i?.amount }}</span>
              <ui-Label :text="$t('_common.currency.rial')" type="neutral" />
            </div>
            <!-- status column -->
            <div class="root__header--status">
              <ui-Status
                :text="statusHandler(i?.status as unknown as InvoiceStatusEnum).text"
                :type="statusHandler(i?.status as unknown as InvoiceStatusEnum).type"
              />
            </div>
          </div>
        </template>
        <template #main>
          <!-- payer column -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[1].label }}
            </div>
            <div class="root__main--title__title">
              <span class="px-2xs"> {{ i.payer_name }} </span>
            </div>
          </div>
          <ui-Divider />
          <!-- id colum -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[2].label }}
            </div>
            <div class="root__main--title__title">
              {{ i.id }}
            </div>
          </div>
          <ui-Divider />
          <!-- date colum -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[3].label }}
            </div>
            <div class="root__main--title__title">
              {{ i.created_at }}
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex justify-between">
            <!-- details & actions -->
            <div>
              <ui-Button
                variant="text"
                :text="$t('_common.buttons.details_preview')"
                after-icon="AngleLeft"
                @click="clicked(i)"
              />
            </div>
            <div class="mt-sm">
              <ui-Action
                v-model:eventType="eventType"
                :limit="2"
                :items="actionHandle(i.id)"
                dir="rtl"
              />
            </div>
          </div>
        </template>
      </ui-TableCard>
    </div>
    <CouponBaseNoResult v-if="!loading && !data" />
  </div>
</template>

<script setup lang="ts">
import { InvoiceStatusEnum, Invoice } from '@/graphql/graphql';
import { useInvoiceColumns } from '@/composables/invoice/useInvoiceColumns';
import { useInvoiceAction } from '@/composables/invoice/useInvoiceAction';
import { useInvoiceFilter } from '@/composables/invoice/useInvoiceFilter';
import { useTerminalStore } from '@/stores/terminalStore';

const data = inject<Invoice[]>('invoice');
const loading = inject<boolean>('invoiceLoading');
const { columns } = useInvoiceColumns();
const { actionHandle } = useInvoiceAction();
const { statusHandler } = useInvoiceFilter();
const router = useRouter();
const domain = useTerminalStore().currentDomain;
const eventType = ref<string>();
const clicked = (item: { id: string | number }) => {
  router.push(`/panel/${domain}/invoice/details/${item.id}`);
};
</script>

<style lang="scss" scoped>
.root {
  @apply mt-md;
  &__header {
    @apply flex justify-between flex-wrap;
    &--id {
      @apply flex items-center;
      &__text {
        @apply text-text pl-sm  text-body-400-b1 font-medium;
      }
    }
    &--status {
      @apply -mt-sm;
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
