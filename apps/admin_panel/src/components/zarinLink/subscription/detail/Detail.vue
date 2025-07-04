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
                  <ui-Avatar v-else shape="square" type="DonationLink" />
                  <div class="space-y-2xs">
                    <div class="text-body-400-b2">{{ data?.title }}</div>
                    <div class="text-body-400-b3 text-text-soft">
                      {{ $t('_zarin_link.zarin_link_create_modal.subscription_link_title') }}
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
                    <div class="col-span-6 text-body-400-b3">
                      {{ item.value }}
                    </div>
                  </div>
                </div>
              </ui-Skeleton>
            </div>
          </template>
        </ui-Card>
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
// computed
const subscriptionAmount = computed(() =>
  numberFormat(data?.value?.meta_data?.target_amount as number)
);
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
        title: t('_zarin_link.target_amount'),
        value: data?.value?.meta_data?.target_amount
          ? t('_zarin_link.detail.amount', { amount: subscriptionAmount.value })
          : '--',
      },
      {
        title: t('_common.date.created_at'),
        value: toJalali(data?.value?.created_at),
      },
    ];
  }
});
</script>
