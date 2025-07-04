<template>
  <div
    class="grid md:grid-cols-4 grid-cols-2 border border-border-divider rounded-sm mt-xl"
    dir="rtl"
  >
    <div
      class="flex flex-col justify-center items-start gap-xs p-md border-l md:border-b-0 border-b border-border-divider"
    >
      <ui-Skeleton :loading="loading" :width="64" class="rounded-[2px]">
        <span class="text-body-400-b3 text-text-soft">{{
          $t('_dashboard.daily_records.amount_successful_sessions')
        }}</span>
      </ui-Skeleton>
      <ui-Skeleton :loading="loading" :width="144" class="rounded-[2px]">
        <div class="flex items-center gap-xs">
          <span class="text-body-400-b2 text-text-success">{{
            numberFormat(totalSessionAmount)
          }}</span>
          <ui-Label :text="$t('_common.currency.rial')" type="neutral" />
        </div>
      </ui-Skeleton>
    </div>
    <div
      class="flex flex-col justify-center items-start gap-xs p-md md:border-l md:border-b-0 border-b border-border-divider"
    >
      <ui-Skeleton :loading="loading" :width="64" class="rounded-[2px]">
        <span class="text-body-400-b3 text-text-soft">
          {{ $t('_dashboard.daily_records.number_successful_sessions') }}
        </span>
      </ui-Skeleton>
      <ui-Skeleton :loading="loading" :width="144" class="rounded-[2px]">
        <span class="text-body-400-b3 text-text">{{ numberFormat(totalSessionCount) }}</span>
      </ui-Skeleton>
    </div>
    <div
      class="flex flex-col justify-center items-start gap-xs p-md border-l border-border-divider"
    >
      <ui-Skeleton :loading="loading" :width="64" class="rounded-[2px]">
        <span class="text-body-400-b3 text-text-soft">
          {{ $t('_dashboard.daily_records.amount_successful_reconciliations') }}
        </span>
      </ui-Skeleton>
      <ui-Skeleton :loading="loading" :width="144" class="rounded-[2px]">
        <div class="flex items-center gap-xs">
          <span class="text-body-400-b2 text-text-danger">{{
            numberFormat(totalReconciliationAmount)
          }}</span>
          <ui-Label :text="$t('_common.currency.rial')" type="neutral" />
        </div>
      </ui-Skeleton>
    </div>
    <div class="flex flex-col justify-center items-start gap-xs p-md">
      <ui-Skeleton :loading="loading" :width="64" class="rounded-[2px]">
        <span class="text-body-400-b3 text-text-soft">
          {{ $t('_dashboard.daily_records.number_successful_reconciliations') }}
        </span>
      </ui-Skeleton>
      <ui-Skeleton :loading="loading" :width="144" class="rounded-[2px]">
        <span class="text-body-400-b3 text-text">{{ numberFormat(totalReconciliationCount) }}</span>
      </ui-Skeleton>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  loading: boolean;
  totalReconciliationCount: number;
  totalReconciliationAmount: number;
  totalSessionCount: number;
  totalSessionAmount: number;
}
defineProps<Props>();
const { numberFormat } = useMath();
</script>
