<template>
  <div class="flex flex-col w-full gap-md" dir="rtl">
    <div class="grid items-start grid-cols-12 gap-md">
      <ui-Card class="col-span-full xl:col-span-8 h-full">
        <template #header>
          <div class="flex gap-xs flex-wrap">
            <div v-show="!mainLoading" class="flex items-center gap-xs">
              <div class="flex md:flex-row flex-col md:gap-xs gap-lg">
                <div v-if="!mainLoading" class="text-heading-600-h2">
                  {{ $t('dashboard.chart.general_statistics') }}
                </div>
              </div>
            </div>
            <div
              v-show="!mainLoading"
              class="flex items-center gap-xs md:m-0 mt-md md:w-fit w-full md:order-2 order-3"
            >
              <DashboardTypeFilter />
              <DashboardDateFilter
                v-show="!mainLoading && chartType.id === 'day'"
                @action="dateHandler"
              />
            </div>
            <ui-Skeleton v-if="mainLoading" :width="104" :height="12" class="px-sm py-md" />
            <div class="flex justify-end flex-grow md:order-3 order-2">
              <NuxtLink :to="`/panel/${domain}/dashboard/daily-records`">
                <ui-Button
                  :text="$t('_common.page_title.daily_records')"
                  after-icon="CalendarSchedule"
                  variant="outlined"
                  type="neutral"
                  size="medium"
                  :loading="mainLoading"
                />
              </NuxtLink>
            </div>
          </div>
        </template>
        <template #main>
          <div class="flex flex-wrap border border-border-divider mt-[24px] rounded-sm">
            <div class="flex flex-col justify-center items-center p-md gap-xs md:w-1/2 w-full">
              <span v-if="!mainLoading" class="text-text-soft text-body-400-b3">
                {{ labelComputed }}
              </span>
              <ui-Skeleton v-else :width="104" :height="12" class="px-sm" />
              <div class="flex items-center">
                <span v-if="!mainLoading" class="text-display-700-d3">{{ sumValue }}</span>
                <ui-Label
                  v-if="!mainLoading"
                  :text="$t('_common.currency.rial')"
                  type="neutral"
                  class="mr-xs"
                />
                <ui-Skeleton v-else :width="164" :height="20" class="px-sm py-md" />
              </div>
              <span v-if="!mainLoading" class="text-text-soft text-body-400-b3">{{
                prevSumValue
              }}</span>
              <ui-Skeleton v-else :width="104" :height="12" class="px-sm pb-md" />
            </div>
            <div
              class="flex flex-col justify-center items-center p-md gap-xs md:w-1/2 w-full border-0 md:border-r border-t md:border-t-0 border-border-divider"
            >
              <span v-if="!mainLoading" class="text-text-soft text-body-400-b3">
                {{ prevLabelComputed }}
              </span>
              <ui-Skeleton v-else :width="104" :height="12" class="px-sm" />
              <div class="flex items-center">
                <span v-if="!mainLoading" class="text-display-700-d3">{{ sumCountValue }}</span>
                <ui-Skeleton v-else :width="164" :height="20" class="px-sm py-md" />
              </div>
              <span v-if="!mainLoading" class="text-text-soft text-body-400-b3">{{
                prevSumCountValue
              }}</span>
              <ui-Skeleton v-else :width="104" :height="12" class="px-sm pb-md" />
            </div>
          </div>
          <div class="w-full">
            <DashboardBaseChart
              :data="chartType.id === 'day' ? chartData : incomeDataChart"
              :loading="mainLoading"
              :x-type="chartType.id"
            />
            <div
              v-if="chartType.id !== 'day' && !mainLoading"
              class="flex border rounded-sm border-border-divider md:flex-row flex-col"
            >
              <div class="flex md:w-1/2 justify-between p-md md:border-l border-border-divider">
                <span class="text-text-soft text-body-400-b3">
                  {{ $t('dashboard.chart.amount_successful_transactions_today') }}
                </span>
                <div>
                  <span>{{ todayAmountText }}</span>
                  <ui-Label
                    v-if="!mainLoading"
                    :text="$t('_common.currency.rial')"
                    type="neutral"
                    class="mr-xs"
                  />
                </div>
              </div>
              <div class="flex md:w-1/2 justify-between p-md">
                <span class="text-text-soft text-body-400-b3">
                  {{ $t('dashboard.chart.number_successful_transactions_today') }}
                </span>
                <span>{{ todayCountSum }}</span>
              </div>
            </div>
          </div>
        </template>
      </ui-Card>
      <ui-Card class="col-span-full xl:col-span-4 h-full">
        <template #header>
          <div class="flex justify-between items-center h-[42px]">
            <ui-skeleton :loading="mainLoading" :height="20" :width="100">
              <span class="text-heading-600-h2">
                {{ $t('dashboard.chart.reconciliation') }}
              </span>
            </ui-skeleton>
            <ui-Button
              v-if="hasPermission"
              :text="$t('_common.buttons.showAll')"
              variant="outlined"
              type="neutral"
              size="medium"
              :loading="mainLoading"
              @click="navigateRoute('reconciliation')"
            />
          </div>
        </template>
        <template #main>
          <div class="flex flex-col gap-xl h-full">
            <div
              class="flex flex-col justify-center items-center p-md gap-xs border border-border-divider rounded-sm mt-xl"
              :class="!!latestData.length || hasPermission ? ' h-[144px]' : 'flex-grow'"
            >
              <ui-skeleton :loading="mainLoading" :width="64">
                <span class="text-text-soft text-body-400-b3">
                  {{ $t('payout.balance') }}
                </span>
              </ui-skeleton>
              <ui-skeleton :loading="mainLoading" :width="168" :height="20">
                <span class="text-display-700-d3 flex items-center">
                  <span>{{ numberFormat(balanceChartData?.value ?? 0) }}</span>
                  <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mr-xs" />
                </span>
              </ui-skeleton>
              <ui-skeleton :loading="mainLoading" :width="64">
                <span class="flex text-text-soft text-body-400-b3 gap-xs items-center">
                  <span>{{ $t('payout.payoutBalance') }}</span>
                  <span>{{ numberFormat(payoutBalanceChartData?.value ?? 0) }}</span>
                  <ui-Label :text="$t('_common.currency.rial')" type="neutral" />
                </span>
              </ui-skeleton>
            </div>
            <div v-if="hasPermission">
              <div v-if="(latestData && latestData.length) || mainLoading">
                <ui-Table
                  :columns="dashboardColumns"
                  :items="latestData"
                  :loading="mainLoading"
                  @click-row="clicked"
                >
                  <template #column-amount>
                    <ui-Skeleton :loading="mainLoading" :width="120" class="mt-2xs">
                      <div>
                        <span>{{ $t('payout.latest') }}</span>
                        <ui-Label
                          :text="$t('_common.currency.rial')"
                          type="neutral"
                          class="mr-xs"
                        />
                      </div>
                    </ui-Skeleton>
                  </template>
                  <template #item-amount="{ status, amount, fee, payable_at }">
                    <div class="flex justify-between items-center">
                      <span class="flex flex-col">
                        <span>{{ numberFormat(amount - fee) }}</span>
                        <span class="text-body-400-b3 text-text-soft">
                          {{ payable_at }}
                        </span>
                      </span>
                      <span>
                        <ui-Status
                          v-if="status"
                          :text="getStatusInfo(status).text"
                          :type="getStatusInfo(status).type"
                        />
                      </span>
                    </div>
                  </template>
                  <template #loadingSkeleton>
                    <div v-for="index in 4" :key="index" style="grid-template-columns: 100%">
                      <div class="grid border-t border-t-border-divider">
                        <div class="my-auto">
                          <div class="flex flex-col gap-sm py-md px-sm">
                            <ui-Skeleton :width="64" :height="12" />
                            <ui-Skeleton :width="104" :height="12" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </ui-Table>
              </div>
              <ui-EmptyState
                v-if="latestData && !latestData.length && !mainLoading"
                class="py-xl px-md"
                :description="$t('_empty.reconcileHome.caption')"
                vector="Reconciliation"
              />
            </div>
          </div>
        </template>
      </ui-Card>
    </div>
    <div class="w-full">
      <ui-Card>
        <template #header>
          <div class="flex justify-between items-center mb-xl">
            <ui-skeleton :loading="mainLoading" :height="20">
              <span class="text-heading-600-h2">
                {{ $t('product.details.latelyTransactions') }}
              </span>
            </ui-skeleton>
            <ui-Button
              :text="$t('product.details.showAll')"
              variant="outlined"
              type="neutral"
              size="medium"
              :loading="mainLoading"
              @click="navigateRoute('session')"
            />
          </div>
        </template>
        <template #main>
          <DashboardBaseLgGrid v-if="!md" :loading="mainLoading" />
          <DashboardBaseMdGrid v-else :loading="mainLoading" />
        </template>
      </ui-Card>
    </div>
  </div>
</template>
<script lang="ts" setup>
import sumBy from 'lodash/sumBy';
import { ReconciliationType, TerminalPermissionEnum } from '@/graphql/graphql';

export interface Date {
  formatValue: string;
}
const t = useI18n();
const { convert, subtract, toGregorian } = useDate();
const { dashboardColumns } = useReconciliationColumns();
const store = useSessionStore();
const { loading, data } = useReconciliationQuery().reconciliationList;
const { data: payoutBalanceChartData, loading: balanceLoading } = useBalanceChartQuery();
const { data: balanceChartData, loading: payoutBalanceLoading } = userPayoutBalanceQuery();
const { loading: terminalLoading } = useTerminalQuery();
const { getStatusInfo } = useReconciliationStatus();
const { hasPermission } = usePermissionValidate(TerminalPermissionEnum.Reconcile);
const router = useRouter();
const { md } = useSize();
const domain = useTerminalStore().currentDomain;
const route = useRoute();
const { dateFilterList } = useDateFilterColumn();
const chartType = computed(() => {
  const res = dateFilterList.find(i => i.id === route.query.dateType);
  if (res) {
    return res;
  }

  return {
    id: 'month',
    title: 'month',
  };
});
const dateInput = computed(() => {
  if (route.query && route.query.selectedDate) {
    return route.query.selectedDate;
  }

  return subtract(1, 'YYYY/MM/DD');
});
const {
  data: chartData,
  loading: chartLoading,
  refetch,
} = useChartQuery(toGregorian(dateInput.value as string, 'YYYY-MM-DD', ''));
const { numberFormat } = useMath();
const navigateRoute = (page: 'session' | 'reconciliation') => {
  router.push('/panel/' + domain + `/${page}`);
};
const otherDayValue = ref(subtract());
const dateHandler = (val: string) => {
  refetch({
    date: toGregorian(val),
  });
  otherDayValue.value = convert(val, 'jYYYY/jMM/jDD', 'jYYYY-jMM-jDD');
};
const clicked = (item?: ReconciliationType) => {
  router.push(`/panel/${domain}/reconciliation/${item?.id}`);
};
const { data: incomeDataChart, loading: incomeLoading } = useFetchIncomeChart();
const latestData = computed(() => {
  if (data.value && data.value) {
    return data.value.slice(0, 4);
  }

  return [];
});
const incomeChartLoading = computed(
  () => incomeLoading.value || chartLoading.value || payoutBalanceLoading.value
);
const mainLoading = computed(
  () =>
    incomeChartLoading.value ||
    loading.value ||
    store.loading ||
    balanceLoading.value ||
    terminalLoading.value
);
store.dashboardLoading = mainLoading;
const todayAmountText = computed(() => {
  if (chartData.value) {
    return numberFormat(sumBy(chartData.value.today, 'value') ?? 0);
  }
});
const todayCountSum = computed(() => {
  if (chartData.value) {
    return numberFormat(sumBy(chartData.value.today, 'count') ?? 0);
  }
});
const currentMonthCountSum = computed(() => {
  if (incomeDataChart.value && !!incomeDataChart.value.length) {
    return numberFormat(sumBy(incomeDataChart.value[1]?.data, 'count') ?? 0);
  }
});
const prevMonthCountSum = computed(() => {
  if (incomeDataChart.value && !!incomeDataChart.value.length) {
    return numberFormat(sumBy(incomeDataChart.value[0]?.data, 'count') ?? 0);
  }
});
const currentWeekCountSum = computed(() => {
  if (incomeDataChart.value && !!incomeDataChart.value.length) {
    return numberFormat(sumBy(incomeDataChart.value[3]?.data, 'count') ?? 0);
  }
});
const prevWeekCountSum = computed(() => {
  if (incomeDataChart.value && !!incomeDataChart.value.length) {
    return numberFormat(sumBy(incomeDataChart.value[2]?.data, 'count') ?? 0);
  }
});
const currentMonthSum = computed(() => {
  if (incomeDataChart.value && !!incomeDataChart.value.length) {
    return numberFormat(sumBy(incomeDataChart.value[1]?.data, 'value') ?? 0);
  }
});
const prevMonthSum = computed(() => {
  if (incomeDataChart.value && !!incomeDataChart.value.length) {
    return numberFormat(sumBy(incomeDataChart.value[0]?.data, 'value') ?? 0);
  }
});
const currentWeekSum = computed(() => {
  if (incomeDataChart.value && !!incomeDataChart.value.length) {
    return numberFormat(sumBy(incomeDataChart.value[3]?.data, 'value') ?? 0);
  }
});
const prevWeekSum = computed(() => {
  if (incomeDataChart.value && !!incomeDataChart.value.length) {
    return numberFormat(sumBy(incomeDataChart.value[2]?.data, 'value') ?? 0);
  }
});
const otherDayAmountSum = computed(() => {
  if (chartData.value) {
    return sumBy(chartData.value.other_day, 'value');
  }
});
const otherDayCountSum = computed(() => {
  if (chartData.value) {
    return numberFormat(sumBy(chartData.value.other_day, 'count') ?? 0);
  }
});
const otherDayAmount = computed(() => {
  const otherDay = numberFormat(otherDayAmountSum.value ?? 0);

  return (
    // moment(otherDayValue.value, 'jYYYY-jMM-jDD').format('jDD jMMMM') +
    convert(otherDayValue.value, 'jYYYY-jMM-jDD', 'jDD jMMMM') +
    ': ' +
    otherDay +
    ' ' +
    t('common.rial')
  );
});
const otherDayCountText = computed(
  () =>
    // moment(otherDayValue.value, 'jYYYY-jMM-jDD').format('jDD jMMMM') +
    convert(otherDayValue.value, 'jYYYY-jMM-jDD', 'jDD jMMMM') +
    ': ' +
    otherDayCountSum.value +
    ' ' +
    t('session.session')
);
const sumValue = computed(() => {
  if (chartType.value.id === 'day') {
    return todayAmountText.value;
  }
  if (chartType.value.id === 'week') {
    return currentWeekSum.value;
  }

  return currentMonthSum.value;
});
const prevSumValue = computed(() => {
  if (chartType.value.id === 'day') {
    return otherDayAmount.value;
  }
  if (chartType.value.id === 'week') {
    return (
      t('dashboard.chart.previous_week') + ':' + ' ' + prevWeekSum.value + ' ' + t('common.rial')
    );
  }

  return (
    t('dashboard.chart.previous_month') + ':' + ' ' + prevMonthSum.value + ' ' + t('common.rial')
  );
});
const sumCountValue = computed(() => {
  if (chartType.value.id === 'day') {
    return todayCountSum.value;
  }
  if (chartType.value.id === 'week') {
    return currentWeekCountSum.value;
  }

  return currentMonthCountSum.value;
});
const prevSumCountValue = computed(() => {
  if (chartType.value.id === 'day') {
    return otherDayCountText.value;
  }
  if (chartType.value.id === 'week') {
    return t('dashboard.chart.previous_week') + ':' + ' ' + prevWeekCountSum.value;
  }

  return t('dashboard.chart.previous_month') + ':' + ' ' + prevMonthCountSum.value;
});
const labelComputed = computed(() => {
  if (chartType.value.id === 'day') {
    return t('dashboard.chart.amount_successful_transactions_today');
  } else if (chartType.value.id === 'week') {
    return t('dashboard.chart.amount_successful_transactions_week');
  } else {
    return t('dashboard.chart.amount_successful_transactions_month');
  }
});
const prevLabelComputed = computed(() => {
  if (chartType.value.id === 'day') {
    return t('dashboard.chart.number_successful_transactions_today');
  } else if (chartType.value.id === 'week') {
    return t('dashboard.chart.number_successful_transactions_week');
  } else {
    return t('dashboard.chart.number_successful_transactions_month');
  }
});
</script>
<style lang="scss" scoped>
:deep(.input__inner--default) {
  @apply h-[44px];

  div {
    @apply flex items-center;
  }
}
:deep(.root__row__rows) {
  @apply py-sm;
}
</style>
