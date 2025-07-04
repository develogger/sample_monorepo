<template>
  <div class="px-md min-h-[400px]">
    <!-- table -->
    <ui-Table :loading="loading" :columns="columns" :items="filteredData">
      <!-- product template -->
      <template #item-title="{ title, image, id }">
        <div class="flex gap-sm items-center">
          <div
            v-if="image"
            class="h-[40px] w-[40px] max-h-[40px] border border-border-soft rounded-md relative overflow-hidden"
          >
            <NuxtImg
              :src="image"
              :alt="title"
              width="100%"
              height="100%"
              fit="containt"
              :placeholder="[40, 40]"
              loading="lazy"
              class="rounded-md h-full object-cover w-full"
            />
          </div>
          <ui-Avatar v-else shape="square" type="Box" />
          <div class="flex flex-col gap-2xs">
            <span>{{ title }}</span>
            <span class="text-caption-400-c1 text-text-soft">#{{ id }}</span>
          </div>
        </div>
      </template>
      <!-- amount header template -->
      <template #column-amount="header">
        <ui-Skeleton :loading="loading" :width="40" class="mt-2xs">
          <div class="h-fit flex -mt-2xs md:w-5xl lg:w-6xl xl:w-full">
            <span class="truncate text-text">{{ header.label }}</span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs" />
          </div>
        </ui-Skeleton>
      </template>
      <!-- status template -->
      <template #item-link="{ status }">
        <div class="h-fit">
          <ui-Status :text="statusHandler(status).text" :type="statusHandler(status).type" />
        </div>
      </template>
      <!-- action template -->
      <template #item-action="{ id }">
        <div class="h-fit">
          <ui-Button
            variant="tertiary"
            icon="Trash"
            class="w-[40px] !text-text"
            @click.stop="deselectProduct(id)"
          />
        </div>
      </template>
      <!-- loading template -->
      <template #loadingSkeleton>
        <div v-for="index in 5" :key="index" class="loading">
          <div
            class="grid border-t border-t-border-divider"
            style="
              grid-template-columns: 56px minmax(350px, 2fr) minmax(120px, 1fr) minmax(120px, 1fr);
            "
          >
            <div class="flex items-center">
              <ui-Skeleton :width="20" :height="20" class="px-xs py-md pr-md" radius="xs" />
            </div>
            <div class="my-auto">
              <div class="flex">
                <ui-Skeleton :width="40" :height="40" class="px-md py-md" radius="sm" />
                <div class="flex flex-col">
                  <ui-Skeleton :width="60" class="py-md" />
                  <ui-Skeleton :width="40" />
                </div>
              </div>
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="60" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="40" :height="24" class="px-md py-md" radius="xl" />
            </div>
          </div>
        </div>
      </template>
    </ui-Table>
  </div>
</template>

<script setup lang="ts">
import type { FilteredDataType } from '@/types/filteredDataType';
import { useCouponStore } from '@/stores/couponStore';
import { useProductFilter } from '@/composables/product/useProductFilter';
import { useProductOverviewItems } from '@/composables/coupon/useProductOverviewItems';
const emit = defineEmits(['delete']);
const data = inject<Ref<FilteredDataType[]>>('data');
const selectedProductIds = inject<Ref<string[]>>('selected_product_ids');
const store = useCouponStore();
const { statusHandler } = useProductFilter();
const { columns } = useProductOverviewItems();
const filteredData = computed(
  () => data?.value.filter(i => selectedProductIds?.value.includes(i.id))
);
const loading = inject('loading');
const deselectProduct = (value: string) => {
  emit('delete', value);
  if (selectedProductIds?.value.length === 0) {
    store.showToggleSelectedProduct = false;
  }
};
</script>
