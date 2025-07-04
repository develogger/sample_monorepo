<template>
  <div>
    <PayoutBaseMdGridLoading v-if="loading" />
    <PayoutBaseEmptyGrid v-if="!loading && data && data?.length === 0" />
    <div v-else-if="data && !loading">
      <ui-TableCard v-for="i in data" :id="i.id" :key="i.id" class="root">
        <template #header>
          <div class="root__header">
            <!-- product column -->
            <div class="root__header--id">
              <ui-Skeleton :loading="loading" :width="104" class="mt-2xs">
                <div class="flex gap-sm items-center">
                  <div
                    v-if="i.image"
                    class="h-[40px] w-[40px] max-h-[40px] border border-border-soft rounded-md relative overflow-hidden"
                  >
                    <NuxtImg
                      :src="i.image"
                      :alt="i.title"
                      width="100%"
                      height="100%"
                      fit="containt"
                      :placeholder="[40, 40]"
                      loading="lazy"
                      class="rounded-md h-full object-cover w-full"
                    />
                  </div>
                  <ui-Avatar v-else shape="square" type="Box" />
                  <div class="truncate md:max-w-[300px] max-w-[150px]">{{ i.title }}</div>
                </div>
              </ui-Skeleton>
            </div>
            <!-- status column -->
            <div class="root__header--status">
              <ui-Status
                :text="statusHandler(i?.status as unknown as string).text"
                :type="statusHandler(i?.status as unknown as string).type"
              />
            </div>
          </div>
        </template>
        <template #main>
          <!-- amount column -->
          <div class="root__main--title">
            <div class="root__main--title__label">
              {{ columns[1].label }}
            </div>
            <div class="root__main--title__title">
              {{ i?.amount }}
              <ui-Label :text="$t('_common.currency.rial')" type="neutral" />
            </div>
          </div>
          <ui-Divider />
          <!-- limit column -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[2].label }}
            </div>
            <div class="root__main--title__title">
              <div
                v-if="isLimitNumber(i.limit) && i.limit === 0"
                class="text-body-400-b2 text-text-disabled"
              >
                {{ $t('_product.entity_limit') }}
              </div>
              <div v-else-if="isLimitNumber(i.limit)" class="flex gap-sm">{{ i.limit }}</div>
              <div v-else class="text-body-400-b2 text-text-disabled">
                {{ $t('_coupon.unlimited') }}
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex justify-end">
            <!-- details & actions -->
            <div class="mt-sm">
              <ui-Action
                v-model:eventType="eventType"
                :limit="2"
                :items="actionHandle(i.status, i.id, activeTerminal, callbackAction)"
                dir="rtl"
              />
            </div>
          </div>
        </template>
      </ui-TableCard>
    </div>
    <ProductBaseNoResult v-if="!loading && !data" />
  </div>
</template>

<script setup lang="ts">
import { ZarinLinkType } from '@/graphql/graphql';
import { FilteredDataType } from '@/types/filteredDataType';
import { useProductColumns } from '@/composables/product/useProductColumns';
import { useProductAction } from '@/composables/product/useProductAction';
import { useProductFilter } from '@/composables/product/useProductFilter';
import { useTerminalQuery } from '@/composables/terminal/useTerminalQuery';
const data = inject<FilteredDataType[]>('product');
const loading = inject<boolean>('productLoading');
const callbackActionInjection = inject<((id: string, type: string) => void) | undefined>(
  'productCallbackAction'
);
const { columns } = useProductColumns();
const { actionHandle } = useProductAction();
const { statusHandler } = useProductFilter();
const { activeTerminal: terminalSelected } = useTerminalQuery();
const eventType = ref<string>();
const activeTerminal = computed(() => terminalSelected.value);
const callbackAction = (id: ZarinLinkType['id'], type: string) => {
  if (callbackActionInjection) {
    callbackActionInjection(id, type);
  }
};
const isLimitNumber = (limit: number | null) => typeof limit === 'number';
</script>

<style lang="scss" scoped>
.root {
  @apply mt-md;
  &__header {
    @apply flex justify-between flex-wrap items-center;
    &--id {
      @apply flex items-center;
      &__text {
        @apply text-text pl-sm  text-body-400-b1 font-medium;
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
