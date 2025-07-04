<template>
  <ui-Card dir="rtl">
    <template #header>
      <div class="flex justify-between">
        <ui-Skeleton v-if="loading" :width="100" :height="24" />
        <span v-else class="text-heading-600-h2">{{ $t('_referral.income_statistics') }}</span>
        <ui-Skeleton v-if="loading" :width="120" :height="24" />
        <ui-DatePicker
          v-else
          after-icon="Calendar"
          :model-value="dateInput"
          :disabled="loading"
          :loading="false"
          :steps="['month']"
          only-month
          name="calender"
          :placeholder="$t('_common.filters.date')"
          @selected-item="dateHandler"
        />
      </div>
    </template>
    <template #main>
      <div class="grid grid-cols-2 border border-border-divider rounded-sm mt-xl">
        <div class="col-span-2 lg:col-span-1 flex flex-col justify-center items-center p-md gap-sm">
          <ui-Skeleton v-if="loading" :width="80" :height="20" />
          <span v-else class="text-body-400-b3 text-text-soft">
            {{
              $t('_common.slug.statics_income_month', {
                month: `${calendar?.month} ${calendar?.year}`,
              })
            }}
          </span>
          <ui-Skeleton v-if="loading" :height="30" class="mt-md" />
          <span v-else class="flex gap-xs items-center">
            <span class="text-display-700-d3">{{ setInitCalendarData?.monthIncome }}</span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs h-fit" />
          </span>
        </div>
        <div
          class="col-span-2 lg:col-span-1 flex flex-col justify-center items-center p-md gap-sm md:border-r border-r-0 border-t md:border-t-0 border-border-divider"
        >
          <ui-Skeleton v-if="loading" :width="80" :height="20" />
          <span v-else class="text-body-400-b3 text-text-soft">
            {{ $t('_referral.total_total_income_from_the_beginning') }}
          </span>
          <ui-Skeleton v-if="loading" :height="30" class="mt-md" />
          <span v-else class="flex gap-xs items-center">
            <span class="text-display-700-d3">{{ setInitCalendarData?.totalIncome }}</span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs h-fit" />
          </span>
        </div>
      </div>
      <ui-Divider class="my-xl" />
      <div class="bottom-controller lg:items-center items-start">
        <ui-Skeleton v-if="loading" :height="20" />
        <span v-else class="text-text-soft text-body-400-b3 flex gap-2xs items-center">
          <span> {{ $t('_common.buttons.last_payment') }} </span>
          <ui-Tooltip :content="$t('_helper.referral.tooltip')">
            <ui-Icon class="!text-body-400-b1" name="Warning" />
          </ui-Tooltip>
        </span>
        <ui-Skeleton v-if="loading" :height="20" />
        <span v-if="lastInvoice && !loading" class="flex gap-sm text-body-400-b2 items-center">
          <span class="text-heading-600-h3">
            {{ lastInvoice.amount }}
            <span>{{ $t('common.rial') }}</span>
          </span>
          <span class="point-divider bg-black-100 dark:bg-white"></span>
          <span>
            {{ lastInvoice.date }}
          </span>
        </span>
        <span v-else-if="!lastInvoice && !loading">-</span>
        <ui-Skeleton v-if="loading" :height="20" />
        <ui-Button
          v-else
          :text="$t('_referral.payment_history')"
          variant="text"
          before-icon="Reconciliation"
          :loading="loading"
          @click="showDialog"
        />
      </div>
      <ReferralBaseInvoiceGrid
        v-model:show="showModal"
        :data="invoiceTableData"
        :loading="loading"
        :last-index="data && data[data.length - 1]"
        @change-year="changeYear"
      />
    </template>
  </ui-Card>
</template>
<script lang="ts" setup>
import moment from 'moment-jalaali';
import { ReferrerInvoiceType } from '@/graphql/graphql';
import { useReferrerInvoiceQuery } from '@/composables/referral/useReferralInvoiceQuery';
import { useReferralQuery } from '@/composables/referral/useReferralQuery';

export interface Date {
  formatValue: string;
  month: string;
  year: string;
}
interface Calendar {
  date: string;
  month: string;
  year: string;
  monthIncome: number;
  totalIncome: number | string;
}
const dateInput = ref<string>();
const store = useReferralStore();
const calendar = ref<Calendar>({
  date: '',
  month: '',
  year: '',
  monthIncome: 0,
  totalIncome: 0,
});
const invoiceParam = ref({
  fromDate: '',
  toDate: '',
});
const dataParam = ref({
  fromDate: '',
  toDate: '',
});
const showModal = ref(false);
const { fullDateJalali, toJalali } = useDate();
const { numberFormat } = useMath();
const showDialog = () => (showModal.value = true);
const dateHandler = (date: Date) => {
  dateInput.value = date.formatValue;
  calendar.value.month = date.month;
  calendar.value.year = date.year;
  invoiceParam.value.fromDate = moment(dateInput.value, 'jYYYY-jMM-jDD').format();
  if (date.year) {
    const year = +date.year + 1;
    invoiceParam.value.fromDate = moment(`${date.year}-01-01`, 'jYYYY-jMM-jDD').format('YYYY-MM');
    invoiceParam.value.toDate = moment(`${year}-01-15`, 'jYYYY-jMM-jDD').format('YYYY-MM');
  }
};
const invoiceTableData = computed(() => {
  if (data.value && data.value.length) {
    if (dataParam.value.fromDate) {
      const filteredInvoice = data.value.filter(
        (invoice: ReferrerInvoiceType) =>
          moment(invoice.from_date).isSameOrAfter(dataParam.value.fromDate) &&
          moment(invoice.to_date).isSameOrBefore(dataParam.value.toDate)
      );

      return filteredInvoice.map((item: ReferrerInvoiceType) => ({
        from_date: (item.from_date && fullDateJalali(item.from_date)) ?? '-',
        amount: (item.amount && numberFormat(item.amount)) ?? '-',
        status: item.status,
      }));
    }

    return data.value.map((item: ReferrerInvoiceType) => ({
      from_date: (item.from_date && fullDateJalali(item.from_date)) ?? '-',
      amount: (item.amount && numberFormat(item.amount)) ?? '-',
      status: item.status,
    }));
  }

  return [];
});
const getInitToDateParam = () => {
  const date = moment();
  const month = date.format('jM');
  const year = date.format('jYYYY');
  const fromDate = moment(`${year}-01-01`, 'jYYYY-jMM-jDD').format('YYYY-MM');
  const toDate = moment(`${year}-${month}-01`, 'jYYYY-jMM-jDD').format('YYYY-MM');
  invoiceParam.value.fromDate = fromDate;
  invoiceParam.value.toDate = toDate;
};
const setInitCalendarData = computed(() => {
  if (data.value) {
    data.value.forEach(item => {
      calendar.value.totalIncome += item.amount;
      const date = moment(calendar.value.date, 'jYYYY-jMM-jDD');
      if (date.isAfter(item.from_date) && date.isSameOrBefore(item.to_date)) {
        calendar.value.monthIncome = item.amount;
      }
    });
    calendar.value.totalIncome = numberFormat(calendar.value.totalIncome);
  }

  return calendar.value;
});
const lastInvoice = computed(() => {
  if (data.value && data.value.length) {
    return {
      amount: numberFormat(data.value[0]?.amount),
      date: toJalali(data.value[0]?.to_date),
    };
  }

  return undefined;
});
const { data, refetch } = useReferrerInvoiceQuery(
  invoiceParam.value.fromDate,
  invoiceParam.value.toDate
);
const { loading } = useReferralQuery();
const changeYear = (val: string) => {
  if (val !== 'Invalid date') {
    const year = +val + 1;
    dataParam.value.fromDate = moment(`${val}-03-01`, 'YYYY-MM-DD').format('YYYY-MM-DD');
    dataParam.value.toDate = moment(`${year}-03-30`, 'YYYY-MM-DD').format('YYYY-MM-DD');
  }
};
onMounted(() => {
  getInitToDateParam();
  refetch();
});
store.data = data;
</script>
<style lang="scss" scoped>
.point-divider {
  @apply w-2xs h-2xs rounded-circle;
}
.bottom-controller {
  @apply flex md:flex-row flex-col gap-xs justify-between p-md border border-border-divider rounded-sm;
}
</style>
