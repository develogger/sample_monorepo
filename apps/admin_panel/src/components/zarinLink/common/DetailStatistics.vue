<template>
  <ui-Card>
    <template #header>
      <div class="flex justify-between items-center">
        <div v-show="!mainLoading" class="flex items-center gap-xs">
          <div v-if="!mainLoading" class="text-heading-600-h2">
            {{ $t('_zarin_link.detail.payments_statistics') }}
          </div>
        </div>
        <ui-Skeleton v-if="mainLoading" :width="104" :height="12" class="px-sm py-md" />
      </div>
    </template>
    <template #main>
      <div class="flex flex-wrap border border-border-divider mt-[24px] rounded-sm">
        <div class="flex flex-col justify-center items-center p-md gap-xs md:w-1/2 w-full">
          <span v-if="!mainLoading" class="text-text-soft text-body-400-b3">{{
            $t('_zarin_link.detail.amount_successful_transactions_amount_month')
          }}</span>
          <ui-Skeleton v-else :width="104" :height="12" class="px-sm pt-md" />
          <div class="flex items-center">
            <span v-if="!mainLoading" class="text-display-700-d3">{{
              numberFormat(data?.all?.amount)
            }}</span>
            <ui-Label
              v-if="!mainLoading"
              :text="$t('_common.currency.rial')"
              type="neutral"
              class="mr-xs"
            />
            <ui-Skeleton v-else :width="164" :height="20" class="px-sm py-md" />
          </div>
          <span v-if="!mainLoading" class="text-text-soft text-body-400-b3">{{
            $t('_zarin_link.detail.current_amount_month', {
              amount: numberFormat(data?.current_month?.amount),
            })
          }}</span>
          <ui-Skeleton v-else :width="104" :height="12" class="px-sm pb-md" />
        </div>
        <div
          class="flex flex-col justify-center items-center p-md gap-xs md:w-1/2 w-full border-0 md:border-r border-t md:border-t-0 border-border-divider"
        >
          <span v-if="!mainLoading" class="text-text-soft text-body-400-b3">
            {{ $t('_zarin_link.detail.amount_successful_transactions_count_month') }}
          </span>
          <ui-Skeleton v-else :width="104" :height="12" class="px-sm pt-md" />
          <div class="flex items-center">
            <span v-if="!mainLoading" class="text-display-700-d3">{{ data?.all?.count }}</span>
            <ui-Skeleton v-else :width="164" :height="20" class="px-sm py-md" />
          </div>
          <span v-if="!mainLoading" class="text-text-soft text-body-400-b3">{{
            $t('_zarin_link.detail.current_count_month', {
              count: data?.current_month?.count,
            })
          }}</span>
          <ui-Skeleton v-else :width="104" :height="12" class="px-sm pb-md" />
        </div>
      </div>
      <div class="flex border rounded-sm border-border-divider md:flex-row flex-col mt-sm">
        <div class="flex md:w-1/2 justify-between p-md md:border-l border-border-divider">
          <span v-if="!mainLoading" class="text-text-soft text-body-400-b3">
            {{ $t('_zarin_link.detail.amount_successful_transactions_amount_today') }}
          </span>
          <div v-if="!mainLoading">
            <span>{{ numberFormat(data?.current_day?.amount) }}</span>
            <ui-Label
              v-if="!mainLoading"
              :text="$t('_common.currency.rial')"
              type="neutral"
              class="mr-xs"
            />
          </div>
          <ui-Skeleton v-else :width="164" :height="20" />
        </div>
        <div class="flex md:w-1/2 justify-between p-md">
          <span v-if="!mainLoading" class="text-text-soft text-body-400-b3">
            {{ $t('_zarin_link.detail.amount_successful_transactions_count_today') }}
          </span>
          <span v-if="!mainLoading">{{ data?.current_day?.count }}</span>
          <ui-Skeleton v-else :width="164" :height="20" />
        </div>
      </div>
    </template>
  </ui-Card>
</template>

<script lang="ts" setup>
// api
const {
  loading: zarinLinkAggregateLoading,
  data,
  refetch,
} = useGetZarinLinkTransactionsAggregateSchema();
// composable
const { numberFormat } = useMath();
// injects
const loading = inject<Ref<boolean>>('loading');
// computed
const mainLoading = computed(() => !!loading?.value || zarinLinkAggregateLoading.value);

onMounted(() => {
  refetch();
});
</script>
