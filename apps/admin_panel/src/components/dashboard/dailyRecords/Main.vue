<template>
  <div>
    <ui-DailyCalendar
      :start-year="getJalaliYear(activeTerminal?.created_at)"
      :end-year="getJalaliYear(now)"
      :data="list"
      :loading="loading"
      @change="changeDate"
    >
      <template #header>
        <DashboardDailyRecordsTotal
          :loading="loading"
          :total-session-amount="data?.total?.total_session_amount"
          :total-session-count="data?.total?.total_session_count"
          :total-reconciliation-amount="data?.total?.total_reconciliation_amount"
          :total-reconciliation-count="data?.total?.total_reconciliation_count"
        />
      </template>
      <template v-for="(item, i) in list" :key="i" #[i]>
        <div class="flex flex-col items-end gap-2xs rtl md:mt-0 mt-2xl">
          <span
            v-if="item.session"
            class="text-text-success bg-surface-success text-caption-400-c1 px-xs py-2xs rounded-sm w-full ltr"
          >
            + {{ item.session }}
          </span>
          <span
            v-if="item.reconciliation"
            class="text-text-danger bg-surface-danger text-caption-400-c1 px-xs py-2xs rounded-sm w-full ltr"
          >
            - {{ item.reconciliation }}
          </span>
        </div>
        <div class="flex items-end absolute md:bottom-sm md:right-sm top-xs left-sm rtl">
          <div
            v-if="item.reconciliation_count"
            class="text-text-danger bg-surface-danger text-caption-400-c1 px-xs py-2xs rounded-sm -ml-2xs"
          >
            {{ item.reconciliation_count }}
          </div>
          <div
            v-if="item.session_count"
            class="text-text-success bg-surface-success text-caption-400-c1 px-xs py-2xs rounded-sm"
          >
            {{ item.session_count }}
          </div>
        </div>
      </template>
      <template #footer>
        <div
          class="md:bottom-sm md:left-sm md:top-auto top-xs grid md:grid-cols-7 grid-cols-1 border-l-0 md:border-t !hidden"
        ></div>
      </template>
    </ui-DailyCalendar>
  </div>
</template>

<script lang="ts" setup>
import { DailyReportType, Maybe } from '@/graphql/graphql';

type RefetchFunction = (variables: {
  from_date: string;
  to_date: string;
}) => Promise<unknown> | undefined;

interface DailyRecordItem {
  session: string | number;
  session_count: string | number;
  reconciliation: string | number;
  reconciliation_count: string | number;
}
interface DailyRecords {
  [date: string]: DailyRecordItem;
}
const { activeTerminal, loading: terminalLoading } = useTerminalQuery();
const { data: now } = useTimeQuery();
const { getJalaliYear, getEndOf, convert } = useDate();
const { numberFormat } = useMath();
const list = computed(
  () =>
    data?.value?.sessions?.reduce((acc: DailyRecords, item) => {
      const reconciliationItem = data?.value?.reconciliations?.find(
        reconciliation => reconciliation?.date === item?.date
      );
      acc[item?.date] = {
        session: item?.amount ? numberFormat(item?.amount) : 0,
        session_count: item?.count ? numberFormat(item?.count) : 0,
        reconciliation: reconciliationItem?.amount ? numberFormat(reconciliationItem.amount) : 0,
        reconciliation_count: reconciliationItem?.count
          ? numberFormat(reconciliationItem.count)
          : 0,
      };

      return acc;
    }, {} as DailyRecords)
);
function changeDate(date: string) {
  const jalali = convert(date, 'YYYY-MM-DD', 'jYYYY-jMM-jDD');
  const endOfMonthJalali = getEndOf(jalali, 'jMonth', 'jYYYY-jMM-jDD');
  const endOfMonth = convert(endOfMonthJalali, 'jYYYY-jMM-jDD', 'YYYY-MM-DD');
  refetch?.({ from_date: date, to_date: endOfMonth });
}
const dailyRecordsLoading = inject<Ref<boolean>>('daily_records_loading');
const loading = computed(() => dailyRecordsLoading?.value || terminalLoading.value);
const data = inject<ComputedRef<Maybe<DailyReportType> | undefined>>('daily_records_data');
const refetch = inject<RefetchFunction>('daily_records_refetch');
</script>
