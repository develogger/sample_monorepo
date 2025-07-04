<template>
  <div class="main" dir="rtl">
    <div class="basis-full">
      <ui-Card>
        <template #header>
          <span class="text-heading-600-h2">
            {{ $t('invoice.addInvoice.detail') }}
          </span>
        </template>
        <template #main>
          <div class="my-xl border-border-divider border rounded-sm">
            <div class="main__item--detail col-span-6">
              <ui-Skeleton v-if="loading" :width="64" />
              <div v-else class="text-body-400-b3 text-text-soft">
                {{ $t('session.show.payer_info.description') }}
              </div>
              <ui-Skeleton v-if="loading" :width="120" />
              <div v-else class="text-body-400-b2">
                {{ (data && data.description) ?? '-' }}
              </div>
            </div>
          </div>
          <div class="grid grid-cols-6 border border-border-divider rounded-sm mt-xl">
            <div
              v-for="(item, index) in detailList"
              :key="item.title"
              :class="detailStyle(index)"
              class="main__item--detail"
            >
              <ui-Skeleton v-if="loading" :width="64" />
              <div v-else class="text-body-400-b3 text-text-soft">
                {{ item.title }}
              </div>
              <ui-Skeleton v-if="loading" :width="120" />
              <div v-else class="text-body-400-b2">
                {{
                  data && typeof item.value === 'function'
                    ? item.value(data)
                    : (data && data[item.value as keyof Invoice]) ?? '-'
                }}
              </div>
            </div>
          </div>
        </template>
      </ui-Card>
      <ui-Card class="mt-md">
        <template #header>
          <div class="flex justify-between">
            <span class="text-heading-600-h2">
              {{ $t('invoice.detail.sessionInvoice') }}
            </span>
          </div>
        </template>
        <template #main>
          <InvoiceDetailsLgGrid v-if="!md" class="mt-xl" :loading="loading" :data="tableData" />
          <InvoiceDetailsMdGrid v-else class="mt-xl" :loading="loading" :data="tableData" />
        </template>
      </ui-Card>
    </div>
    <div class="lg:w-[368px]">
      <ui-Card class="lg:w-[368px]">
        <template #header>
          <span class="text-heading-600-h2">
            {{ $t('invoice.detail.link') }}
          </span>
        </template>
        <template #main>
          <div class="flex flex-col gap-xl">
            <span v-if="!loading" class="text-text-soft text-body-400-b3 mt-xl">{{
              $t('invoice.detail.description')
            }}</span>
            <ui-skeleton v-if="loading" class="mt-xl" :width="336" />
            <ui-skeleton v-if="loading" :width="150" />
            <ui-ClipBoard v-if="!loading" :content="url" has-arrow @new-tab="externalLink" />
            <ui-skeleton v-else :width="336" :height="50" />
          </div>
        </template>
      </ui-Card>
      <ui-Card class="mt-md">
        <template #header>
          <span class="text-heading-600-h2">
            {{ $t('common.history') }}
          </span>
        </template>
        <template #main>
          <div class="mt-xl">
            <div v-if="loading">
              <ui-TimeLine v-for="i in 2" :key="i" :loading="loading" />
            </div>
            <ui-TimeLine
              v-for="(item, index) in timeLineHistory"
              :key="item.id"
              :is-first="index === 0"
              :is-last="index === timeLineHistory.length - 1"
              :icon="item.icon"
              :icon-class="item.class"
              :title="item.title"
              :loading="loading"
              :caption="toJalali(item.date)"
              :sub-title="item.subText"
            />
          </div>
        </template>
      </ui-Card>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Invoice, SessionStatusEnum } from '@/graphql/graphql';
import { useInvoiceDetaiSchema } from '@/composables/invoice/useInvoiceDetailSchema';

export interface Props {
  data?: Invoice;
  loading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  data: undefined,
});
const { data, loading } = toRefs(props);
const { md } = useSize();
const t = useI18n();
const config = useRuntimeConfig();
const { detailList, detailStyle } = useInvoiceDetaiSchema();
const { numberFormat } = useMath();
const { toJalali } = useDate();
const tableData = computed(
  () =>
    (data.value?.sessions &&
      data.value?.sessions.map(i => ({
        amount: (i && numberFormat(i.amount)) ?? '-',
        id: i?.id,
        metadata: data.value?.id ?? '-',
        payer_info: i?.payer_info?.order_id ?? '-',
        status: i?.status ?? '-',
      }))) ||
    []
);
const url = computed(() => `${config.public.short_link}'invioce/'${data.value?.id ?? ''}`);
const externalLink = () => {
  window.open(url.value, '_blank');
};
const timeLineHistory = computed(() => {
  if (data.value && data.value.sessions) {
    const verified = data.value.sessions.filter(
      item =>
        item?.status &&
        (item.status === SessionStatusEnum.Verified || item.status === SessionStatusEnum.Paid)
    );
    const verifiedList = verified.map(item => ({
      id: item?.id,
      title: t('invoice.detail.timeline.timelineDescribe'),
      subText: `${t('invoice.detail.amount')} ${numberFormat(item?.amount)} ${t('common.rial')}`,
      date: item?.timeline && item.timeline.settled_time,
      icon: 'DollarFill',
      class: 'text-text-success',
    }));
    const arr = [
      ...verifiedList,
      {
        id: 5,
        title: t('invoice.detail.timeline.start'),
        subText: '',
        date: data.value.sessions[0] && data.value.sessions[0].timeline?.created_time,
        icon: 'InvoicePlus',
        class: 'text-text-disabled',
      },
    ];

    return arr;
  }

  return [];
});
</script>
<style lang="scss" scoped>
.main {
  @apply flex lg:flex-row flex-col gap-md;
  &__item--detail {
    @apply flex flex-col w-full gap-xs p-md border-border-divider break-all;
  }
}
</style>
