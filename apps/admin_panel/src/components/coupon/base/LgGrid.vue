<template>
  <div>
    <CouponBaseEmptyGrid v-if="!loading && data && data?.length === 0" />
    <ui-Table
      v-else-if="data || loading"
      :columns="columns"
      :is-pointer="false"
      :items="data"
      :loading="loading"
      @hover-row="eventHandler"
    >
      <!-- code template -->
      <template #item-code="{ code, discount_percent, max_discount_amount, products }">
        <div class="h-fit">
          <div class="text-text text-body-400-b2 mb-2xs font-Mono truncate max-w-[256px]">
            {{ code }}
          </div>
          <div class="text-text-soft text-body-400-b3" dir="rtl">
            <span> {{ discount_percent }} {{ $t('_common.slug.percent') }}</span>
            <span v-if="max_discount_amount" class="px-2xs">•</span>
            <span v-if="max_discount_amount">
              {{ $t('_common.date.to') }} {{ $t('_common.slug.top') }}
            </span>
            <span v-if="max_discount_amount" class="px-2xs">
              {{ numberFormat(max_discount_amount) }} {{ $t('_common.currency.rial') }}
            </span>
            <span class="px-[2px]">•</span>
            <span class="">
              {{
                products.length > 0
                  ? `${products.length} ` + $t('_common.slug.payment_link')
                  : $t('_coupon.all_links')
              }}
            </span>
          </div>
        </div>
      </template>
      <!-- used template -->
      <template #item-used="{ used }">
        <div class="h-fit">
          <span class="px-2xs"> {{ used }} </span>
        </div>
      </template>
      <!-- limit template -->
      <template #item-limit="{ limit }">
        <div class="h-fit">
          <span v-if="isNull(limit)">{{ $t('_coupon.unlimited') }}</span>
          <span v-else class="px-2xs"> {{ limit }} </span>
        </div>
      </template>
      <!-- status template -->
      <template #item-status="{ status }">
        <div class="h-fit">
          <ui-Status :text="statusHandler(status).text" :type="statusHandler(status).type" />
        </div>
      </template>
      <!-- action template -->
      <template #item-action="{ id, status, code, deleted_at }">
        <div class="flex justify-end">
          <ui-Action
            :id="id"
            v-model:eventType="eventType"
            :selected-id="idValue"
            :limit="2"
            :items="actionHandle(id, deleted_at, status, code, callbackAction)"
            dir="rtl"
            @id-value="idValueHandler"
          />
        </div>
      </template>
      <!-- loading template -->
      <template #loadingSkeleton>
        <div v-for="index in pageSize" :key="index" class="loading">
          <div
            class="grid border-t border-t-border-divider"
            style="
              grid-template-columns:
                minmax(300px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(60px, 1fr) minmax(
                  60px,
                  1fr
                )
                80px;
            "
          >
            <div class="my-auto">
              <div class="flex flex-col gap-2xs py-md px-sm">
                <ui-Skeleton :width="64" :height="12" class="" />
                <ui-Skeleton :width="104" :height="12" class="" />
              </div>
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="104" :height="12" class="px-md py-md" />
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
              <ui-Skeleton :width="40" :height="12" class="px-md py-md" />
            </div>
          </div>
        </div>
      </template>
    </ui-Table>
    <CouponBaseNoResult v-if="!loading && !data" />
  </div>
</template>

<script setup lang="ts">
import { isNull } from 'lodash';
import { CouponType } from '@/graphql/graphql';
import { useCouponAction } from '@/composables/coupon/useCouponAction';
import { useCouponColumns } from '@/composables/coupon/useCouponColumns';
import { useCouponFilter } from '@/composables/coupon/useCouponFilter';

export type InjectCallback = (id: string, type: string) => void;
const data = inject<CouponType[]>('coupon');
const loading = inject<boolean>('couponLoading');
const idValue = ref();
const { numberFormat } = useMath();
const eventType = ref();
const idValueHandler = (value: string) => {
  idValue.value = value;
};
const callbackActionInjection = inject<((code: string, type: string) => void) | undefined>(
  'couponCallback'
);
const callbackAction = (code: CouponType['code'], type: string) => {
  if (callbackActionInjection) {
    callbackActionInjection(code, type);
  }
};
const { actionHandle } = useCouponAction();
const { columns } = useCouponColumns();
const { statusHandler } = useCouponFilter();
const config = useRuntimeConfig();
const route = useRoute();
const eventHandler = (event: MouseEvent, item: CouponType) => {
  eventType.value = { event: event.type, uniqueId: item.id };
};
const pageSize = computed(() => Number(route.query.pageSize) || config.public.pageSize);
</script>
