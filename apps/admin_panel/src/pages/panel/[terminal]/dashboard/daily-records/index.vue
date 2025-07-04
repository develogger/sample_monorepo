<template>
  <div class="pb-3xl w-full container-xl">
    <DashboardDailyRecordsHeader />
    <DashboardDailyRecordsMain />
  </div>
</template>

<script setup lang="ts">
const t = useI18n();
definePageMeta({
  name: 'daily-records',
  layout: 'terminal',
});
useHead({
  title: t('_common.page_title.daily_records'),
});
const { onResult, data: time, loading: timeLoading } = useTimeQuery();
const { getEndOf, getStartOf, convert } = useDate();
const { terminalDailyReport } = useTerminalDailyReportQuery();
const tempFromDate = ref();
const tempToDate = ref();
const { data, refetch, load, loading } = terminalDailyReport({
  from_date: tempFromDate,
  to_date: tempToDate,
});

onResult(() => {
  const currentDateJalali = convert(time.value, 'YYYY-MM-DD', 'jYYYY-jMM-jDD');
  const startDateJalali = getStartOf(currentDateJalali, 'jMonth', 'jYYYY-jMM-jDD');
  const endDateJalali = getEndOf(currentDateJalali, 'jMonth', 'jYYYY-jMM-jDD');
  tempFromDate.value = convert(startDateJalali, 'jYYYY-jMM-jDD', 'YYYY-MM-DD');
  tempToDate.value = convert(endDateJalali, 'jYYYY-jMM-jDD', 'YYYY-MM-DD');
  refetch({
    from_date: tempFromDate.value,
    to_date: tempToDate.value,
  }) || load();
});
const isLoading = computed(() => timeLoading.value || loading.value);
provide('daily_records_loading', isLoading);
provide('daily_records_data', data);
provide('daily_records_refetch', refetch);
</script>
