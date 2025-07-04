<template>
  <div v-if="!loading">
    <SharedChart
      :series-data="chartData"
      :x-type="xType"
      :height="xType === 'day' ? '340' : '284'"
    />
  </div>
  <ui-Skeleton v-else class="mt-xl" :height="300" full-width />
  <div v-if="loading" class="flex items-center gap-md mt-xl">
    <ui-Skeleton :height="12" :width="64" />
    <ui-Skeleton :height="12" :width="64" />
  </div>
</template>
<script lang="ts" setup>
import {
  DayTransactionsDetailsType,
  IncomeChartDetailsType,
  IncomeChartType,
  TwoDayChartType,
} from '~/graphql/graphql';

export interface Props {
  data: TwoDayChartType & IncomeChartType[];
  loading: boolean;
  xType: string;
}

const props = withDefaults(defineProps<Props>(), {});
const { data, loading, xType } = toRefs(props);
const t = useI18n();
const { subtract, convert } = useDate();
// Function to format the chart data
const handleFormatData = (item: string) => {
  if (xType.value === 'month') {
    return convert(item, 'YYYY/MM/DD', 'jYYYY/jMM/jDD');
  }

  return item;
};
const formatChartData = (chart: IncomeChartDetailsType[] | DayTransactionsDetailsType[]) =>
  chart.map(item => ({
    x: handleFormatData(item.date!),
    y: item.value,
  }));
// Computed property to determine the name of the 'other day'
const setOtherDateName = computed(() => {
  if (data.value?.other_day?.length) {
    const otherDayValue = convert(data.value?.other_day[0]?.date, 'YYYY-MM-DD', 'jYYYY-jM-jD');
    const formattedDate = convert(otherDayValue, 'jYYYY-jM-jD', 'jD jMMMM');
    const yesterday = subtract(1, 'jD jMMMM');

    return formattedDate === yesterday ? t('dashboard.chart.yesterday') : formattedDate;
  }

  return t('dashboard.chart.yesterday');
});
// Computed property to prepare the chart data
const chartData = computed(() => {
  if (!data.value) {
    return [];
  }

  const todayData = data.value.today
    ? formatChartData(data.value.today as IncomeChartDetailsType[])
    : [];
  const otherDayData = data.value.other_day
    ? formatChartData(data.value.other_day as IncomeChartDetailsType[])
    : [];

  if (xType.value === 'month' && data.value[0]?.key === 'success_prev_month') {
    return [
      {
        name: t('dashboard.chart.previous_month'),
        data: formatChartData(data.value[0].data as IncomeChartDetailsType[]),
      },
      {
        name: t('dashboard.chart.current_month'),
        data: formatChartData(data.value[1].data as IncomeChartDetailsType[]),
      },
    ];
  }

  if (xType.value === 'week' && data.value[2]?.key === 'success_prev_week') {
    return [
      {
        name: t('dashboard.chart.previous_week'),
        data: formatChartData(data.value[2].data as IncomeChartDetailsType[]),
      },
      {
        name: t('dashboard.chart.current_week'),
        data: formatChartData(data.value[3].data as IncomeChartDetailsType[]),
      },
    ];
  }

  return [
    {
      name: setOtherDateName.value,
      data: otherDayData,
    },
    {
      name: t('dashboard.chart.today'),
      data: todayData,
    },
  ];
});
</script>
