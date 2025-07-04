<template>
  <div
    class="grid md:grid-cols-7 grid-cols-1 rounded-md border border-border-divider overflow-hidden"
    dir="rtl"
  >
    <!-- week Day -->
    <template v-for="w in faWeekDaysFull" :key="w">
      <div
        class="h-[40px] text-text-soft text-body-400-b3 md:flex hidden items-center justify-center"
      >
        <Skeleton :loading="loading" :width="56" radius="xs">
          <span>
            {{ w }}
          </span>
        </Skeleton>
      </div>
    </template>
    <!-- previews month -->
    <template v-for="item in remainPrevMonth" :key="item">
      <Day
        :disabled="true"
        :value="item"
        :week="dateToWeek(getPreviousMonthDate(item))"
        :class="dayClasses(getPreviousMonthDate(item))"
        class="md:flex hidden"
      />
    </template>
    <!-- current month -->
    <div v-for="item in currentMonthDays" :key="item">
      <Day
        :active="compareDate(selected.year, indexOfMonth, item).dayValue"
        :value="item"
        :week="dateToWeek(`${selected.year}-${indexOfMonth}-${item}`)"
        :class="dayClasses(`${selected.year}-${indexOfMonth}-${item}`)"
      >
        <slot :name="valueToDate(`${selected.year}-${indexOfMonth}-${item}`, 'YYYY-MM-DD')"></slot>
      </Day>
    </div>
    <!-- next month -->
    <div v-for="item in remainNextMonth" :key="item">
      <Day
        :disabled="true"
        :value="item"
        :week="dateToWeek(getNextMonthDate(item))"
        :class="dayClasses(getNextMonthDate(item))"
        class="md:flex hidden"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toValue, toRefs, inject } from 'vue';
import { useDate, type SelectedType } from '../composables/date';
import Day from './dailyCalendar/Day.vue';
import Skeleton from './ui/Skeleton.vue';

const {
  faWeekDaysFull,
  monthList,
  firstDayOfMonthJalali,
  daysInMonth,
  compareDate,
  valueToDate,
  dateToWeek,
} = useDate();
defineEmits(['daySelectedCallback']);
interface Props {
  selected: SelectedType;
}
const props = defineProps<Props>();
const loading = inject<boolean>('loading');
const { selected } = toRefs(props);
const indexOfMonth = computed(() => monthList.indexOf(selected.value.month) + 1);
const firstDayOfMonth = computed(() =>
  firstDayOfMonthJalali(`${toValue(selected.value.year)}-${toValue(indexOfMonth.value)}-01`)
);
const prevMonthDays = computed(() =>
  daysInMonth(toValue(selected.value.year), toValue(indexOfMonth) - 1)
);
const prevFirstMonthDays = computed(() => daysInMonth(toValue(selected.value.year - 1), 12));
const currentMonthDays = computed(() =>
  daysInMonth(toValue(selected.value.year), toValue(indexOfMonth))
);
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
const getPreviousMonthDate = (day: number) => {
  let monthIndex = monthList.indexOf(selected.value.month);
  let month = 0;
  let year = selected.value.year;

  if (monthIndex > 0) {
    month = monthList.indexOf(monthList[monthIndex - 1]) + 1;
  } else {
    monthIndex = 12;
    year--;
    month = monthList.indexOf(monthList[monthIndex - 1]) + 1;
  }

  return `${year}-${month}-${day}`;
};
const getNextMonthDate = (day: number) => {
  let monthIndex = monthList.indexOf(selected.value.month);
  let month = 0;
  let year = selected.value.year;

  if (monthIndex < 11) {
    month = monthList.indexOf(monthList[monthIndex + 1]) + 1;
  } else {
    monthIndex = -1;
    year++;
    month = monthList.indexOf(monthList[monthIndex + 1]) + 1;
  }

  return `${year}-${month}-${day}`;
};
const dayClasses = (date: string) => {
  if (faWeekDaysFull?.indexOf(dateToWeek(date)) === 7) {
    return 'border-border-divider md:border-t md:border-b-0 border-l-0 border-b';
  }

  return 'border-border-divider md:border-t md:border-b-0 md:border-l border-l-0 border-b';
};
</script>
