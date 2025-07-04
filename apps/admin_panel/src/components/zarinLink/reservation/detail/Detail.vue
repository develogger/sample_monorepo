<template>
  <div class="w-full gap-md" dir="rtl">
    <div class="xl:grid flex flex-col-reverse items-start grid-cols-12 gap-md">
      <div class="col-span-full xl:col-span-8 w-full space-y-md">
        <ZarinLinkCommonDetailStatistics />
        <ZarinLinkCommonDetailTranscrions />
      </div>
      <div class="col-span-full xl:col-span-4 w-full space-y-md">
        <ZarinLinkCommonDetailShare />
        <ui-Card>
          <template #header>
            <ui-skeleton :loading="mainLoading" :height="20" :width="100">
              <div class="flex flex-col">
                <span class="text-heading-600-h2">
                  {{ $t('_zarin_link.detail.more_detail_title') }}
                </span>
                <span class="text-body-400-b3 text-text-soft">
                  {{ $t('_zarin_link.detail.more_detail_description') }}
                </span>
              </div>
            </ui-skeleton>
          </template>
          <template #main>
            <div class="flex flex-col gap-xl h-full mt-xl">
              <ui-Skeleton :loading="mainLoading" full-width :height="80">
                <div
                  class="p-md bg-surface-soft rounded-md flex items-center space-x-md space-x-reverse"
                >
                  <div
                    v-if="data?.images && data?.images?.length"
                    class="h-[40px] w-[40px] max-h-[40px] border border-border-soft rounded-md relative overflow-hidden"
                  >
                    <NuxtImg
                      :src="data?.images?.[0]?.url"
                      :alt="data?.title"
                      width="100%"
                      height="100%"
                      fit="containt"
                      :placeholder="[40, 40]"
                      loading="lazy"
                      class="rounded-md h-full object-cover w-full"
                    />
                  </div>
                  <ui-Avatar v-else shape="square" type="EventLink" />
                  <div class="space-y-2xs">
                    <div class="text-body-400-b2">{{ data?.title }}</div>
                    <div class="text-body-400-b3 text-text-soft">
                      {{ $t('_zarin_link.zarin_link_create_modal.reservation_link_title') }}
                    </div>
                  </div>
                </div>
              </ui-Skeleton>
              <ui-Skeleton :loading="mainLoading" full-width :height="50">
                <div class="border border-border-divider rounded-sm">
                  <div
                    v-for="item in detailData"
                    :key="item.title"
                    class="grid grid-cols-12 px-md py-lg border-b border-b-border-divider last:border-b-0"
                  >
                    <div class="col-span-6 text-text-soft text-body-400-b3">
                      {{ item.title }}
                    </div>
                    <div :class="['col-span-6 text-body-400-b3', item?.class]">
                      {{ item.value }}
                    </div>
                  </div>
                </div>
              </ui-Skeleton>
            </div>
          </template>
        </ui-Card>
        <ZarinLinkCommonDetailCoupon />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { NewZarinLinkType, ZarinLinkAmountTypeEnum } from '~/graphql/graphql';

// composable
const t = useI18n();
const { numberFormat } = useMath();
const { toJalali } = useDate();
// injects
const mainLoading = inject('loading');
const data = inject<Ref<NewZarinLinkType> | undefined>('data');
// utils
const getLimitHandler = (limit: number) => {
  let limitValue: string | number = '';

  if (limit === null) {
    limitValue = t('_common.slug.not_specified');
  } else {
    limitValue = limit > 0 ? limit : t('_product.entity_limit');
  }

  return limitValue;
};
// computed
const outOfStock = computed(() => data?.value?.limit !== null && data?.value?.limit === 0);
const detailData = computed(() => {
  if (data?.value) {
    return [
      {
        title: t('_common.table.amount'),
        value:
          data?.value?.amount_type === ZarinLinkAmountTypeEnum.Optional
            ? t('_zarin_link.detail.by_payer')
            : t('_zarin_link.detail.amount', { amount: numberFormat(data?.value?.amount) }),
      },
      {
        title: t('_zarin_link.reservation_link.form.capacity'),
        value: getLimitHandler(data?.value?.limit),
        class: outOfStock.value ? 'text-text-warning' : '',
      },
      {
        title: t('_zarin_link.detail.start_event'),
        value: toJalali(
          `${data?.value?.meta_data?.start_date} ${data?.value?.meta_data?.start_time}`
        ),
      },
      {
        title: t('_zarin_link.detail.end_event'),
        value: toJalali(`${data?.value?.meta_data?.end_date} ${data?.value?.meta_data?.end_time}`),
      },
      {
        title: t('_zarin_link.reservation_link.form.event_type'),
        value:
          data?.value?.meta_data?.event_type === 'ONLINE'
            ? t('_zarin_link.reservation_link.form.online')
            : t('_zarin_link.reservation_link.form.in_person'),
      },
      {
        title: t('_common.date.created_at'),
        value: toJalali(data?.value?.created_at),
      },
    ];
  }
});
</script>
