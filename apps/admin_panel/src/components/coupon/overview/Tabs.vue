<template>
  <div>
    <div v-if="!store.searchText">
      <div v-if="data">
        <ui-Tab
          v-model="tab"
          :items="tabs"
          has-border
          align="start"
          @click="$emit('change-tab', tab)"
        />
      </div>
    </div>
    <div class="mt-xl mb-3xl">
      <div v-if="loading">
        <ui-TableCard v-for="i in [1, 2, 3]" :key="i" class="tableCard">
          <template #header>
            <div class="tableCard__header">
              <!-- product column -->
              <div class="tableCard__header--id">
                <div class="flex gap-xs items-center grow basis-0 truncate">
                  <ui-Checkbox
                    label="label"
                    :loading="loading"
                    :show-label="false"
                    :model-value="true"
                    class="ml-2xs"
                    name="selectedProduct"
                  />
                  <ui-Skeleton v-if="loading" :width="40" :height="40" radius="sm" />
                  <div class="flex flex-col gap-2xs">
                    <ui-Skeleton v-if="loading" />
                    <ui-Skeleton v-if="loading" :width="40" />
                  </div>
                </div>
              </div>
              <!-- status column -->
              <ui-Skeleton :loading="loading" :width="56" :height="24" class="mt-2xs" radius="xl" />
            </div>
          </template>
          <template #main>
            <!-- amount column -->
            <div class="tableCard__main--title">
              <ui-Skeleton v-if="loading" />
              <ui-Skeleton v-if="loading" :width="60" :height="24" />
            </div>
          </template>
        </ui-TableCard>
      </div>
      <template v-if="!loading && data?.length === 0">
        <ui-EmptyState
          v-if="!_isEmpty(store.searchText)"
          :title="$t('_common.empty.titleNoResult')"
          :description="$t('_common.empty.descriptionNoResult')"
          vector="NoResult"
        >
          <template #action>
            <div class="flex justify-center">
              <ui-Button
                after-icon="Trash"
                :text="$t('_common.buttons.removeFilters')"
                type="secondary"
                @click="removeFilter"
              />
            </div>
          </template>
        </ui-EmptyState>
        <ui-EmptyState
          v-else
          :title="$t('_common.page_title.payment_links')"
          :description="$t('_common.pageHeading.payment_link_empty_description')"
          vector="ProductPaymentLink"
        >
        </ui-EmptyState>
      </template>

      <ui-TableCard
        v-for="i in data"
        :key="i?.id"
        class="tableCard"
        :class="!!i.status ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'"
        @click="checkedProduct(i)"
      >
        <template #header>
          <div class="tableCard__header">
            <!-- product column -->
            <div class="tableCard__header--id">
              <div class="flex gap-xs items-center truncate">
                <ui-Checkbox
                  :label="i.id"
                  :loading="loading"
                  :show-label="false"
                  :checked="i.selected"
                  :disabled="!!i.status"
                  class="ml-2xs"
                  :name="i.id"
                />
                <ui-Skeleton v-if="loading" :width="40" :height="40" radius="sm" />
                <div
                  v-else-if="i.image"
                  class="h-[40px] w-[40px] border border-border-soft rounded-md"
                >
                  <NuxtImg
                    :src="i.image"
                    :alt="i.title"
                    sizes="40px"
                    :placeholder="[40, 40]"
                    loading="lazy"
                    class="rounded-md h-full object-cover w-full"
                  />
                </div>
                <div v-else-if="!loading && !i.image">
                  <ui-Avatar shape="square" type="Box" />
                </div>
                <div class="flex flex-col gap-2xs truncate">
                  <ui-Skeleton v-if="loading" class="truncate" />
                  <span v-else class="text-body-400-b2 text-text truncate">{{ i.title }}</span>
                  <ui-Skeleton v-if="loading" :width="40" />
                  <span v-else class="text-caption-400-c1 text-text-soft">#{{ i.id }}</span>
                </div>
              </div>
            </div>
            <!-- status column -->
            <ui-Skeleton :loading="loading" :width="56" :height="24" class="mt-2xs" radius="xl">
              <div class="tableCard__header--status">
                <ui-Status
                  :text="statusHandler(i?.status as unknown as string).text"
                  :type="statusHandler(i?.status as unknown as string).type"
                />
              </div>
            </ui-Skeleton>
          </div>
        </template>
        <template #main>
          <!-- amount column -->
          <div class="tableCard__main--title">
            <ui-Skeleton v-if="loading" />
            <div v-else class="tableCard__main--title__label">
              {{ columns[1].label }}
            </div>
            <ui-Skeleton v-if="loading" :width="60" :height="24" />
            <div v-else class="tableCard__main--title__title">
              {{ i?.amount }}
              <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mr-xs" />
            </div>
          </div>
        </template>
      </ui-TableCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FilterEnum } from '@/graphql/graphql';
import { useCouponStore } from '@/stores/couponStore';
import { useProductFilter } from '@/composables/product/useProductFilter';
import { useProductColumns } from '@/composables/product/useProductColumns';
import { ProductInDiscount } from '@/types/productInDiscount';

interface Props {
  data: ProductInDiscount[];
  tabs: FilterEnum[];
}
const props = withDefaults(defineProps<Props>(), {});
const { data } = toRefs(props);
const emit = defineEmits(['select', 'remove-filter', 'change-tab']);
const { statusHandler } = useProductFilter();
const { columns } = useProductColumns();
const store = useCouponStore();
const tab = ref<FilterEnum>(FilterEnum.All);
const checkedProduct = (item: ProductInDiscount) => {
  if (!!item.status) {
    return;
  }
  emit('select', item);
};
const loading = inject('loading');
const removeFilter = () => {
  store.searchText = '';
  emit('remove-filter');
};
</script>

<style lang="scss" scoped>
.tableCard {
  @apply flex flex-col gap-md mb-md pb-0;
  &__header {
    @apply flex justify-between flex-wrap items-center gap-2xl;
    &--id {
      @apply flex items-center grow basis-0 truncate;
      &__text {
        @apply text-text pl-sm text-body-400-b1 font-medium;
      }
    }
    &--status {
      @apply -mt-sm;
    }
  }
  &__main {
    @apply -mb-md;
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
}
</style>
