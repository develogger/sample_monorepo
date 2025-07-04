<template>
  <div
    class="bg-surface rounded-t-md shadow-elevation-100 border-t border-border-soft border-r border-l"
    :class="
      store.showToggleSelectedProduct
        ? 'h-[calc(100vh-150px)] lg:h-full -bottom-[10px]'
        : 'h-[64px]'
    "
  >
    <!-- header of product -->
    <div
      class="flex justify-between p-md rounded-t-md"
      :class="{
        'border-b border-border-soft': store.showToggleSelectedProduct,
      }"
      @click="onClickTopBar"
    >
      <div class="gap-xs flex items-center cursor-default">
        <span class="text-body-400-b2">{{
          $t('_common.buttons.selected_items', { count: productIds?.length })
        }}</span>
        <ui-Button v-if="md" icon="Trash" type="tertiary" class="w-2xl h-2xl" @click="deleteAll" />
      </div>
      <div class="flex items-center">
        <ui-Button
          v-if="!md"
          :text="$t('_common.buttons.delete_all')"
          before-icon="Trash"
          type="tertiary"
          @click.stop="deleteAll"
        />
        <ui-Button
          :icon="computedIcon"
          type="tertiary"
          class="w-2xl h-2xl"
          @click.stop="toggleItems"
        />
      </div>
    </div>
    <!-- card of product -->
    <div v-if="store.showToggleSelectedProduct" class="py-xl overflow-y-auto">
      <ui-TableCard v-for="i in filteredData" :key="i?.id" class="tableCard">
        <template #header>
          <div class="tableCard__header">
            <!-- product column -->
            <div class="tableCard__header--id">
              <div class="flex gap-xs items-center">
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
                <div class="flex flex-col gap-2xs">
                  <ui-Skeleton v-if="loading" />
                  <span v-else class="text-body-400-b2 text-text">{{ i.title }}</span>
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
        <template #footer>
          <div class="mb-md flex justify-end">
            <ui-Button
              variant="tertiary"
              icon="Trash"
              class="w-[40px] !text-text"
              @click="deselectProduct(i.id)"
            />
          </div>
        </template>
      </ui-TableCard>
      <CouponOverviewLgItems
        class="hidden lg:block"
        @delete="(value: string) => $emit('delete', value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCouponStore } from '@/stores/couponStore';
import { useProductFilter } from '@/composables/product/useProductFilter';
import { useProductColumns } from '@/composables/product/useProductColumns';
import { FilteredDataType } from '@/types/filteredDataType';
const store = useCouponStore();
const productIds = inject<Ref<string[]>>('selected_product_ids');
const data = inject<Ref<FilteredDataType[]>>('data');
const loading = inject('loading');
const emit = defineEmits(['delete', 'delete-all']);
const { md } = useSize();
const { statusHandler } = useProductFilter();
const { columns } = useProductColumns();
const anime = ref('');
const computedIcon = computed(() => (store.showToggleSelectedProduct ? 'AngleDown' : 'AngleUp'));
const filteredData = computed(() => data?.value.filter(i => productIds?.value.includes(i.id)));
const deselectProduct = (value: string) => {
  emit('delete', value);
  if (productIds?.value.length === 0) {
    store.showToggleSelectedProduct = false;
  }
};
const deleteAll = () => {
  emit('delete-all');
  store.showToggleSelectedProduct = false;
};
const toggleItems = () => {
  if (store.showToggleSelectedProduct) {
    store.showToggleSelectedProduct = false;
    anime.value = 'maximize';
  } else {
    store.showToggleSelectedProduct = true;
    anime.value = 'minimize';
  }
};
const onClickTopBar = () => {
  if (store.showToggleSelectedProduct) {
    return;
  }
  store.showToggleSelectedProduct = true;
};
</script>

<style lang="scss" scoped>
.tableCard {
  @apply flex flex-col gap-md mb-md pb-0 mx-md lg:hidden;
  &__header {
    @apply flex justify-between flex-wrap items-center;
    &--id {
      @apply flex items-center;
      &__text {
        @apply text-text pl-sm text-body-400-b1 font-medium;
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
}
</style>
