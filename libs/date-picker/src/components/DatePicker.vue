<template>
  <div class="vjl">
    <div id="calendar" class="vjl__calendar">
      <!-- year explorer -->
      <div v-show="showIndex.year" id="yearIndex" class="vjl__year-index">
        <YearIndex
          :only-year="onlyYear"
          :selected-year="selected.year"
          :in-valid-dates="inValidDates"
          @year-selected-callback="handleYearSelected"
        />
      </div>
      <!-- month explorer -->
      <div v-show="showIndex.month" id="monthIndex" class="vjl__month-index">
        <MonthIndex
          :only-month="onlyMonth"
          :selected-year="selected.year"
          :in-valid-dates="inValidDates"
          :selected-month="selected.month"
          @month-selected-callback="handleMonthSelected"
        />
      </div>
      <!-- calendar main -->
      <div v-if="!showIndex.year && !showIndex.month" id="main" class="vjl__main">
        <!-- navigation -->
        <div id="navigation" class="vjl__navigation">
          <slot name="navigation">
            <Navigation
              :selected-month="selected.month"
              :only-day="onlyDay"
              :selected-year="selected.year"
              :only-month="onlyMonth"
              :only-year="onlyYear"
              :steps="steps"
              @month-explorer="handleMonthExplorer"
              @arrow-next="handleNextMonth"
              @arrow-prev="handlePrevMonth"
              @year-explorer="handleYearExplorer"
            />
          </slot>
        </div>
        <div id="days" class="vjl__days">
          <Days
            :current-value="currentValue"
            :selected-day="selected.day"
            :min="min"
            :max="max"
            :selected-month="selected.month"
            :selected-year="selected.year"
            :in-valid-dates="inValidDates"
            :initial-date="initialDate"
            :range-date="rangeDate"
            :holidays="holidays"
            :weekend="weekend"
            :range="range"
            :only-current-month-days="onlyCurrentMonthDays"
            @day-selected-callback="handleDaySelected"
          />
        </div>
      </div>
      <!-- footer -->
      <div>
        <slot name="footer"> </slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toRefs, onMounted, reactive, ref, computed, watch } from 'vue';
import Navigation from '../components/section/Navigation.vue';
import Days from '../components/section/Days.vue';
import YearIndex from '../components/section/YearIndex.vue';
import MonthIndex from '../components/section/MonthIndex.vue';
import { useDate, type SelectedType, type ShowIndexType, type Boundary } from '../composables/date';

export interface Props {
  inValidDates?: Boundary;
  initialDate?: Boundary;
  onlyDay?: boolean;
  onlyMonth?: boolean;
  onlyYear?: boolean;
  min?: boolean;
  max?: boolean;
  steps?: [string, string, string | undefined] | undefined;
  exposeFormat?: string;
  holidays?: Boundary;
  weekend?: number | number[];
  range?: boolean;
  onlyCurrentMonthDays?: boolean;
  show: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  inValidDates: () => [],
  holidays: () => [],
  initialDate: '',
  steps: undefined,
  exposeFormat: 'YYYY/MM/DD HH:mm:ss',
  weekend: 0,
});
const emits = defineEmits(['expose']);
const {
  inValidDates,
  initialDate,
  onlyDay,
  onlyMonth,
  onlyYear,
  steps,
  exposeFormat,
  range,
  show,
} = toRefs(props);
const { date, monthList, initialDateHandler, dateBoundaryHandler, exposer, rangeExposer } =
  useDate();
const showIndex = reactive<ShowIndexType>({
  month: false,
  year: false,
});
const selected = reactive<SelectedType>({
  year: +date(new Date()).format('YYYY'),
  month: date(new Date()).format('MMMM'),
  day: 0,
});
const currentValue = ref();
const selectedRange = ref<SelectedType[]>([]);
const rangeDate = ref<[string, string] | []>([] as [string, string] | []);
const handleYearExplorer = () => {
  showIndex.year = !showIndex.year;
  showIndex.month = false;
};
const handleMonthExplorer = () => {
  showIndex.month = !showIndex.month;
  showIndex.year = false;
};
const handleYearSelected = (value: number) => {
  if (value) {
    selected.year = +value;
  }
  if (!onlyYear.value) {
    showIndex.year = !showIndex.year;
  }
  if (steps.value) {
    const step = steps.value?.findIndex(i => i === 'year') + 1;
    const nextValue = steps.value[step];

    if (nextValue) {
      showIndex[String(steps.value[step])] = true;
    } else {
      emits('expose', exposer(selected, exposeFormat.value));
      currentValue.value = exposer(selected, exposeFormat.value);
    }
  }
};
const handleMonthSelected = (value: string) => {
  if (value) {
    selected.month = value;
  }
  if (!onlyMonth.value) {
    showIndex.month = !showIndex.month;
  }
  if (steps.value) {
    const step: number | undefined = steps.value?.findIndex(i => i === 'month') + 1;
    const nextValue = steps.value[step];

    if (nextValue) {
      showIndex[String(steps.value[step])] = true;
    } else {
      emits('expose', exposer(selected, exposeFormat.value));
      currentValue.value = exposer(selected, exposeFormat.value);
    }
  }
};
const handleDaySelected = (value: number) => {
  selected.day = value < 10 ? `0${value}` : `${value}`;
  if (!range.value) {
    if (steps.value) {
      const step = steps.value?.findIndex(i => i === 'day') + 1;
      const nextValue = steps.value[step];
      if (nextValue) {
        showIndex[String(steps.value[step])] = true;
      } else {
        emits('expose', exposer(selected, exposeFormat.value));
      }
    }
    currentValue.value = exposer(selected, exposeFormat.value);
    emits('expose', exposer(selected, exposeFormat.value));
  }
  if (range.value) {
    if (selectedRange.value.length < 2 && rangeDate.value.length < 2) {
      selectedRange.value.push({
        ...selected,
      });
      const indexOfMonth = computed(() => monthList.indexOf(selected.month) + 1);
      rangeDate.value.push(`${selected.year}-${indexOfMonth.value}-${selected.day}` as never);
      currentValue.value = exposer(selected, exposeFormat.value);
      emits('expose', rangeExposer(selectedRange.value, exposeFormat.value));
    } else {
      selectedRange.value = [];
      rangeDate.value = [];
      selectedRange.value.push({
        ...selected,
      });
      const indexOfMonth = computed(() => monthList.indexOf(selected.month) + 1);

      rangeDate.value.push(`${selected.year}-${indexOfMonth.value}-${selected.day}` as never);
      currentValue.value = exposer(selected, exposeFormat.value);
    }
    rangeDate.value.sort();
  }
};
const handleNextMonth = () => {
  let indexOfMonth = monthList.indexOf(selected.month);
  if (indexOfMonth < 11) {
    selected.day = 0;
    selected.month = monthList[indexOfMonth + 1];
  } else {
    selected.day = 0;
    indexOfMonth = -1;
    selected.year++;
    selected.month = monthList[indexOfMonth + 1];
  }
};
const handlePrevMonth = () => {
  let indexOfMonth = monthList.indexOf(selected.month);

  if (indexOfMonth > 0) {
    selected.day = 0;
    selected.month = monthList[indexOfMonth - 1];
  } else {
    indexOfMonth = 12;
    selected.day = 0;
    selected.year--;
    selected.month = monthList[indexOfMonth - 1];
  }
};
const handleStepShow = () => {
  if (steps.value) {
    showIndex[steps.value[0]] = true;
  }
};

onMounted(() => {
  if (typeof initialDate.value === 'string') {
    if (initialDate.value && !dateBoundaryHandler(inValidDates.value as never, initialDate.value)) {
      selected.day = +initialDateHandler(initialDate.value).day;
      selected.month = initialDateHandler(initialDate.value).month;
      selected.year = +initialDateHandler(initialDate.value).year;
    }
  }
  if (typeof initialDate.value === 'object') {
    if (
      Array.isArray(initialDate.value) &&
      initialDate.value.length === 2 &&
      typeof initialDate.value[0] === 'string' &&
      typeof initialDate.value[1] === 'string'
    ) {
      const firstElement = initialDate.value[0];
      const secondElement = initialDate.value[1];
      rangeDate.value?.push(firstElement as never);
      rangeDate.value?.push(secondElement as never);
    }
  }
  if (onlyMonth.value) {
    showIndex.month = true;
  }
  if (onlyYear.value) {
    showIndex.year = true;
  }
  handleStepShow();
  emits('expose', exposer(selected, exposeFormat.value));
});
watch(
  () => show.value,
  () => {
    if (show.value) {
      if (currentValue.value) {
        selected.day = currentValue.value.day;
        selected.month = currentValue.value.month;
        selected.year = +currentValue.value.year;
      }
      handleStepShow();
    }
  }
);
watch(initialDate, () => {
  if (typeof initialDate.value === 'string') {
    if (initialDate.value && !dateBoundaryHandler(inValidDates.value as never, initialDate.value)) {
      selected.day = +initialDateHandler(initialDate.value).day;

      selected.month = initialDateHandler(initialDate.value).month;
      selected.year = +initialDateHandler(initialDate.value).year;
    }
  }

  if (typeof initialDate.value === 'object') {
    if (
      Array.isArray(initialDate.value) &&
      initialDate.value.length === 2 &&
      typeof initialDate.value[0] === 'string' &&
      typeof initialDate.value[1] === 'string'
    ) {
      const firstElement = initialDate.value[0];
      const secondElement = initialDate.value[1];

      if (rangeDate.value?.length) {
        rangeDate.value = [];
      }

      rangeDate.value?.push(firstElement as never);
      rangeDate.value?.push(secondElement as never);
    }
  }
});
</script>
<style lang="scss">
@use '../assets/style.scss';
</style>
