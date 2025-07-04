<template>
  <div>
    <CouponBaseMdGridLoading v-if="loading" />
    <CouponBaseEmptyGrid v-if="!loading && data && data?.length === 0" />
    <template v-else-if="data && !loading">
      <ui-TableCard v-for="i in data" :key="i?.id" class="root">
        <template #header>
          <div class="root__header">
            <!-- code column -->
            <div class="root__header--id">
              <ui-Skeleton :loading="loading" :width="104" class="truncate">
                <div class="flex flex-col">
                  <div class="text-text text-body-400-b2 mb-2xs font-Mono truncate">
                    {{ i.code }}
                  </div>
                  <div class="text-text-soft text-body-400-b3" dir="rtl">
                    <span> {{ i.discount_percent }} {{ $t('_common.slug.percent') }}</span>
                    <span v-if="i.max_discount_amount" class="px-2xs">•</span>
                    <span v-if="i.max_discount_amount">
                      {{ $t('_common.date.to') }} {{ $t('_common.slug.top') }}
                    </span>
                    <span v-if="i.max_discount_amount" class="px-2xs">
                      {{ numberFormat(i.max_discount_amount) }} {{ $t('_common.currency.rial') }}
                    </span>
                    <span class="px-[2px]">•</span>
                    <span class="">
                      {{
                        i?.products?.length
                          ? `${i?.products?.length} ` + $t('_common.slug.product')
                          : $t('_common.slug.all_product')
                      }}
                    </span>
                  </div>
                </div>
              </ui-Skeleton>
            </div>
            <!-- status column -->
            <div class="root__header--status">
              <ui-Status
                :text="statusHandler(i?.status as unknown as CouponStatusEnum).text"
                :type="statusHandler(i?.status as unknown as CouponStatusEnum).type"
              />
            </div>
          </div>
        </template>
        <template #main>
          <!-- used column -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[1].label }}
            </div>
            <div class="root__main--title__title">
              <span> {{ i.used }} </span>
            </div>
          </div>
          <ui-Divider />
          <!-- limit column -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[2].label }}
            </div>
            <div class="root__main--title__title">
              <span v-if="isNull(i.limit)">{{ $t('_coupon.unlimited') }}</span>
              <span v-else> {{ i.limit }} </span>
            </div>
          </div>
          <ui-Divider />
          <!-- date colum -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[3].label }}
            </div>
            <div class="root__main--title__title">
              <span class="px-2xs">
                {{ i?.expired_at }}
              </span>
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
                :items="actionHandle(i.id, i.deleted_at, i.status, i.code, callbackAction)"
                dir="rtl"
              />
            </div>
          </div>
        </template>
      </ui-TableCard>
    </template>
    <CouponBaseNoResult v-if="!loading && !data" />
  </div>
</template>

<script setup lang="ts">
import { isNull } from 'lodash';
import { CouponStatusEnum, CouponType } from '@/graphql/graphql';
import { useCouponAction } from '@/composables/coupon/useCouponAction';
import { useCouponColumns } from '@/composables/coupon/useCouponColumns';
import { useCouponFilter } from '@/composables/coupon/useCouponFilter';

export type InjectCallback = (id: string, type: string) => void;
const data = inject<CouponType[]>('coupon');
const loading = inject<boolean>('couponLoading');
const { numberFormat } = useMath();
const { columns } = useCouponColumns();
const { actionHandle } = useCouponAction();
const { statusHandler } = useCouponFilter();
const eventType = ref<string>();
const callbackAction = inject<InjectCallback | undefined>('couponCallback');
</script>

<style lang="scss" scoped>
.root {
  @apply mt-md;
  &__header {
    @apply flex justify-between items-center flex-wrap gap-2xl;
    &--id {
      @apply flex items-center grow basis-0 truncate;
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
