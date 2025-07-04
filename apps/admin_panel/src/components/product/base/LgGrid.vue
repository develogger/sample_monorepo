<template>
  <div>
    <ProductBaseEmptyGrid v-if="!loading && data && data?.length === 0" />
    <ui-Table
      v-else-if="data || loading"
      :columns="columns"
      :items="data"
      :is-pointer="false"
      :loading="loading"
      @hover-row="eventHandler"
    >
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
            <span class="truncate lg:max-w-[250px] md:max-w-[200px]">{{ title }}</span>
            <span class="text-caption-400-c1 text-text-soft">#{{ id }}</span>
          </div>
        </div>
      </template>
      <!-- amount header template -->
      <template #column-amount="header">
        <ui-Skeleton :loading="loading" :width="60" class="mt-2xs">
          <div class="h-fit flex -mt-2xs md:w-5xl lg:w-6xl xl:w-full">
            <span class="truncate text-text">{{ header.label }}</span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs" />
          </div>
        </ui-Skeleton>
      </template>
      <!-- limit template -->
      <template #item-limit="{ limit }">
        <ui-Skeleton :loading="loading" :width="104" class="mt-2xs">
          <div
            v-if="isLimitNumber(limit) && limit === 0"
            class="text-body-400-b2 text-text-disabled"
          >
            {{ $t('_product.entity_limit') }}
          </div>
          <div v-else-if="isLimitNumber(limit)" class="flex gap-sm">{{ limit }}</div>
          <div v-else class="text-body-400-b2 text-text-disabled">
            {{ $t('_coupon.unlimited') }}
          </div>
        </ui-Skeleton>
      </template>
      <!-- status template -->
      <template #item-status="{ status }">
        <div class="h-fit">
          <ui-Status :text="statusHandler(status).text" :type="statusHandler(status).type" />
        </div>
      </template>
      <!-- action template -->
      <template #item-action="{ status, id }">
        <div class="flex justify-end">
          <ui-Action
            :id="id"
            v-model:eventType="eventType"
            :selected-id="idValue"
            :limit="1"
            :items="actionHandle(status, id, activeTerminal, callbackAction)"
            dir="rtl"
            @id-value="idValueHandler"
          />
        </div>
      </template>
      <!-- loading template -->
      <template #loadingSkeleton>
        <div v-for="index in pageSize" :key="index" class="loading">
          <div
            class="grid border-t border-t-border-divider px-sm"
            style="
              grid-template-columns:
                minmax(300px, 2fr) minmax(100px, 10rem) minmax(100px, 10rem) minmax(60px, 10rem)
                80px;
            "
          >
            <div class="flex items-center">
              <ui-Skeleton :width="40" :height="40" class="pl-sm pr-xs" />
              <div>
                <ui-Skeleton :width="110" :height="12" class="py-sm" />
                <ui-Skeleton :width="60" :height="12" />
              </div>
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="110" :height="12" class="pl-lg pr-[28px] py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="60" :height="12" class="pl-md pr-[28px] py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="60" :height="12" class="pl-md pr-[28px] py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="32" :height="32" class="px-md py-md" />
            </div>
          </div>
        </div>
      </template>
    </ui-Table>
    <ProductBaseNoResult v-if="!loading && !data" />
  </div>
</template>

<script setup lang="ts">
import { useProductAction } from '@/composables/product/useProductAction';
import { useProductFilter } from '@/composables/product/useProductFilter';
import { ZarinLinkType, ProductFormType } from '@/graphql/graphql';
import { useProductColumns } from '@/composables/product/useProductColumns';
const config = useRuntimeConfig();
const { actionHandle } = useProductAction();
const route = useRoute();
const { statusHandler } = useProductFilter();
const { activeTerminal: terminalSelected } = useTerminalQuery();
const activeTerminal = computed(() => terminalSelected.value);
const data = inject<ZarinLinkType[]>('product');
const loading = inject<boolean>('productLoading');
const idValue = ref();
const eventType = ref();
const idValueHandler = (value: string) => {
  idValue.value = value;
};
const callbackActionInjection = inject<((id: string, type: string) => void) | undefined>(
  'productCallbackAction'
);
const { columns } = useProductColumns();
const callbackAction = (id: ZarinLinkType['id'], type: string) => {
  if (callbackActionInjection) {
    callbackActionInjection(id, type);
  }
};
const isLimitNumber = (limit: number | null) => typeof limit === 'number';
const eventHandler = (event: MouseEvent, item: ProductFormType) => {
  eventType.value = { event: event.type, uniqueId: item.id };
};
const pageSize = computed(() => Number(route.query.pageSize) || config.public.pageSize);
</script>
