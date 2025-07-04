<template>
  <div class="vjl__days--default">
    <!-- week Day -->
    <div v-for="w in faWeekDays" :key="w">
      <div class="vjl__days--default__week-day">
        <span
          :class="[
            compareDate(selectedYear, indexOfMonth, undefined, w).weekValue
              ? 'vjl__days--default__week-day__active'
              : 'vjl__days--default__week-day__text',
          ]"
        >
          {{ w }}
        </span>
      </div>
    </div>
    <!-- previews month -->
    <div v-for="item in remainPrevMonth" :key="item">
      <button
        v-if="!onlyCurrentMonthDays"
        disabled
        class="vjl__days--default__day vjl__button--default"
        @click="$emit('daySelectedCallback', item)"
      >
        {{ item }}
      </button>
    </div>
    <!-- current month -->
    <div v-for="item in currentMonthDays" :key="item">
      <button
        class="vjl__days--default__day vjl__button--default"
        :class="dayClasses(item)"
        :disabled="isDateDisabled(item)"
        @click="$emit('daySelectedCallback', item)"
      >
        {{ item }}
      </button>
    </div>
    <!-- next month -->
    <div v-for="item in remainNextMonth" :key="item">
      <button
        v-if="!onlyCurrentMonthDays"
        disabled
        class="vjl__days--default__day vjl__button--default"
        @click="$emit('daySelectedCallback', item)"
      >
        {{ item }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, computed, toValue } from 'vue';
import dayjs from 'dayjs';
import { useDate, type VjlDayProps } from '../../composables/date';
const {
  faWeekDays,
  monthList,
  firstDayOfMonthJalali,
  daysInMonth,
  compareDate,
  dateBoundaryHandler,
  weekendDayHandler,
  initialRangeHandler,
  isIncludeRange,
  valueToDate,
} = useDate();
defineEmits(['daySelectedCallback']);
const day = ref<number | string | undefined>();
const props = defineProps<VjlDayProps>();
const {
  currentValue,
  selectedDay,
  selectedMonth,
  selectedYear,
  inValidDates,
  holidays,
  weekend,
  initialDate,
  rangeDate,
  min,
  max,
} = toRefs(props);
const indexOfMonth = computed(() => monthList.indexOf(selectedMonth.value) + 1);
const firstDayOfMonth = computed(() =>
  firstDayOfMonthJalali(`${toValue(selectedYear?.value)}-${toValue(indexOfMonth.value)}-01`)
);
const prevMonthDays = computed(() => daysInMonth(toValue(selectedYear), toValue(indexOfMonth) - 1));
const prevFirstMonthDays = computed(() => daysInMonth(toValue(selectedYear.value - 1), 12));
const currentMonthDays = computed(() => daysInMonth(toValue(selectedYear), toValue(indexOfMonth)));
const rangeStyle = (value: string) => {
  let startRange;
  let endRange;
  let includeRange;
  let isRange = false;
  const initialRange = initialRangeHandler(initialDate.value as never, value);

  if (Array.isArray(initialRange) && rangeDate.value?.length === 2) {
    const currentValue = valueToDate(value);
    let firstValue = dayjs(rangeDate.value[0]);
    let secondValue = dayjs(rangeDate.value[1]);
    if (firstValue.diff(secondValue, 'day') > 0) {
      firstValue = valueToDate(rangeDate.value[1]);
      secondValue = valueToDate(rangeDate.value[0]);
    } else {
      firstValue = valueToDate(rangeDate.value[0]);
      secondValue = valueToDate(rangeDate.value[1]);
    }
    const isInclude = isIncludeRange(
      value,
      valueToDate(rangeDate.value[0]) as unknown as string,
      valueToDate(rangeDate.value[1]) as unknown as string
    );
    if (firstValue === currentValue) {
      startRange = true;
    }
    if (secondValue === currentValue) {
      endRange = true;
    }
    if (isInclude) {
      includeRange = true;
    }
    isRange = true;
  } else {
    isRange = false;
  }

  return { startRange, endRange, includeRange, isRange };
};
//
const remainPrevMonth = computed(() => {
  if (+indexOfMonth.value !== 1) {
    return Array.from({ length: prevMonthDays.value }, (_, i) => i + 1).slice(
      prevMonthDays.value - firstDayOfMonth.value
    );
  }

  return Array.from({ length: prevFirstMonthDays.value }, (_, i) => i + 1).slice(
    prevFirstMonthDays.value - firstDayOfMonth.value
  );
});
const remainNextMonth = computed(() =>
  Array.from(
    {
      length: remainNextMonthLength.value,
    },
    (_, i) => i + 1
  )
);
const remainNextMonthLength = computed(() => {
  const sum = +remainPrevMonth.value.length + currentMonthDays.value;

  if (sum <= 35) {
    return 35 - sum;
  } else {
    return 42 - sum;
  }
});
watch(selectedMonth, () => {
  if (selectedDay.value) {
    day.value = selectedDay.value;
  }
});

const dayClasses = (item: number) => {
  const formattedItem = item < 10 ? `0${item}` : `${item}`;

  return [
    {
      'vjl__days--default__day vjl__button--default': formattedItem !== String(selectedDay.value),
      'vjl__days--default__day vjl__holiday':
        dateBoundaryHandler(
          holidays.value as never,
          `${selectedYear.value}/${indexOfMonth.value}/${formattedItem}`
        ) ||
        weekendDayHandler(
          weekend.value as never,
          `${selectedYear.value}/${indexOfMonth.value}/${formattedItem}`
        ),
      vjl__range__first: rangeStyle(`${selectedYear.value}/${indexOfMonth.value}/${formattedItem}`)
        .startRange,
      vjl__range__end: rangeStyle(`${selectedYear.value}/${indexOfMonth.value}/${formattedItem}`)
        .endRange,
      vjl__range__include: rangeStyle(
        `${selectedYear.value}/${indexOfMonth.value}/${formattedItem}`
      ).includeRange,
    },
    {
      'vjl__button--selected':
        !rangeStyle(`${selectedYear.value}/${indexOfMonth.value}/${formattedItem}`).isRange &&
        formattedItem === String(selectedDay.value) &&
        !isDateDisabled(Number(formattedItem)) &&
        compareDateValue(Number(formattedItem)),
    },
    {
      'vjl__days--default__day__active': compareDate(selectedYear.value, indexOfMonth.value, item)
        .dayValue,
    },
  ];
};
const isDateDisabled = (item: number) => {
  const formattedItem = item < 10 ? `0${item}` : `${item}`;
  const currentDate = valueToDate(`${selectedYear.value}/${indexOfMonth.value}/${formattedItem}`);
  const currentDateObject = new Date(currentDate as unknown as string);
  const today = new Date();

  return (
    dateBoundaryHandler(inValidDates as never, currentDate as unknown as string) ||
    (min.value && currentDateObject < today && !isSameDay(currentDateObject, today)) ||
    (max.value && currentDateObject > today && !isSameDay(currentDateObject, today))
  );
};
const compareDateValue = (item: number) => {
  const formattedItem = item < 10 ? `0${item}` : `${item}`;

  if (currentValue?.value) {
    const val = dayjs(currentValue?.value.formatValue);
    const currentDate = dayjs(`${selectedYear.value}/${indexOfMonth.value}/${formattedItem}`);

    return val.diff(currentDate, 'month', true) === 0;
  }
};
const isSameDay = (date1: Date, date2: Date) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();
</script>
