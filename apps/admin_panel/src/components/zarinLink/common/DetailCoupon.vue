<template>
  <ui-Card>
    <template #header>
      <div class="flex justify-between items-center">
        <ui-skeleton :loading="loading" :height="20" :width="100">
          <div class="flex flex-col">
            <span class="text-heading-600-h2">
              {{ $t('_common.links.coupon') }}
            </span>
            <span class="text-body-400-b3 text-text-soft">
              {{ $t('_zarin_link.detail.coupon_description') }}
            </span>
          </div>
        </ui-skeleton>
        <ui-Button
          icon="Plus"
          variant="outlined"
          type="neutral"
          size="medium"
          :loading="loading"
          @click="$router.push(`/panel/${domain}/coupon/add`)"
        />
      </div>
    </template>
    <template #main>
      <div class="mt-xl">
        <ui-Skeleton :loading="loading" full-width :height="56">
          <div v-if="coupons && coupons.length" class="border border-border-divider rounded-sm">
            <div
              v-for="item in coupons"
              :key="item?.id"
              class="grid grid-cols-12 px-md py-lg border-b border-b-border-divider last:border-b-0 items-center"
            >
              <div class="col-span-6 text-body-400-b2">
                {{ item?.code }}
              </div>
              <div class="col-span-3 text-body-400-b3">
                {{
                  $t('_zarin_link.detail.percent', {
                    percent: item?.discount_percent,
                  })
                }}
              </div>
              <div class="col-span-3 text-body-400-b3 justify-end flex">
                <ui-Action
                  :id="item?.id"
                  :selected-id="idValue"
                  :items="actionHandle(item?.id as string, callbackAction, item?.code as string)"
                  dir="rtl"
                  @id-value="idValueHandler"
                />
              </div>
            </div>
          </div>
          <ui-EmptyState
            v-else
            :description="$t('_empty.zarinLinkDetailCoupon.caption')"
            vector="Coupon"
          />
        </ui-Skeleton>
      </div>
    </template>
  </ui-Card>
</template>
<script lang="ts" setup>
// refs
import { NewZarinLinkType } from '~/graphql/graphql';

const idValue = ref();
// injects
const loading = inject('loading');
const data = inject<Ref<NewZarinLinkType> | undefined>('data');
// composable
const domain = useTerminalStore().currentDomain;
const { actionHandle } = useZarinLinkDetailCouponAction();
const { $notify } = useNuxtApp();
const t = useI18n();
// computed
const coupons = computed(() => {
  if (!data?.value) {
    return;
  }

  return data?.value?.coupons;
});
const idValueHandler = (value: string) => {
  idValue.value = value;
};
// utils
const callbackAction = (code: string) => {
  navigator.clipboard.writeText(code);
  $notify({
    isRead: false,
    message: t('common.copied'),
    type: 'success',
  });
};
</script>
