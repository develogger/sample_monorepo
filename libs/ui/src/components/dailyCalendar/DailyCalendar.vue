<template>
  <Card>
    <template #header>
      <div class="flex items-center justify-between" dir="rtl">
        <div v-if="loading" class="flex items-center gap-2xs">
          <Skeleton :width="32" :height="32" radius="sm" />
          <Skeleton :width="32" :height="32" radius="sm" />
          <Divider type="vertical" :height="32" class="" />
          <Skeleton :width="204" :height="32" radius="sm" />
        </div>
        <div v-else class="flex items-center h-2xl">
          <Navigation
            :selected-month="selected.month"
            :disable-next="disableNext"
            :disable-prev="disablePrev"
            :only-month="true"
            @arrow-next="handleNextMonth"
            @arrow-prev="handlePrevMonth"
          />
          <Divider type="vertical" :height="32" class="mx-2xs" />
          <ActionButton
            :content="cardBoxMonthList as unknown as Element"
            :value="selected.month"
            class="text-right"
            dir="ltr"
          />
          <ActionButton
            :content="cardBoxYearList as unknown as Element"
            :value="selected.year as unknown as string"
            dir="ltr"
          />
        </div>
        <Button
          v-if="!compareDate(selected.year, indexOfMonth, undefined).monthValue"
          :loading="loading"
          before-icon="CalendarScheduleLeft"
          text="امروز"
          class="h-2xl"
          type="primary"
          variant="text"
          @click="goToToday"
        />
      </div>
      <slot name="header" />
    </template>
    <template #main>
      <TimelineCalendar :selected="selected" class="mt-xl">
        <template v-for="item in currentMonthDays" :key="item" #[toGregorian(item)]>
          <slot
            :name="valueToDate(`${selected.year}-${indexOfMonth}-${item}`, 'YYYY-MM-DD')"
          ></slot>
        </template>
      </TimelineCalendar>
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </Card>
</template>
<script setup lang="ts">
import { reactive, h, computed, toRefs, toValue, provide } from 'vue';
import TimelineCalendar from '../../../../date-picker/src/components/DailyCalendar.vue';
import { useDate, type SelectedType } from '../../../../date-picker/src/composables/date';
import Card from '../card/Card.vue';
import ActionButton from '../actionButton/ActionButton.vue';
import Button from '../button/Button.vue';
import Skeleton from '../skeleton/Skeleton.vue';
import Divider from '../divider/Divider.vue';
import MonthList from './MonthList.vue';
import Navigation from './Navigation.vue';
import YearList from './YearList.vue';

const { monthList, compareDate, date, valueToDate, daysInMonth } = useDate();
interface Props {
  startYear: number;
  endYear: number;
  loading: boolean;
}
const emit = defineEmits(['change']);
const props = withDefaults(defineProps<Props>(), {});
const { startYear, endYear, loading } = toRefs(props);
provide('loading', loading);
const selected = reactive<SelectedType>({
  year: +date(new Date()).format('YYYY'),
  month: date(new Date()).format('MMMM'),
  day: 0,
});
const indexOfMonth = computed(() => monthList.indexOf(selected.month) + 1);
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
  emit(
    'change',
    valueToDate(`${selected.year}-${monthList.indexOf(selected.month) + 1}-01`, 'YYYY-MM-DD')
  );
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
  emit(
    'change',
    valueToDate(`${selected.year}-${monthList.indexOf(selected.month) + 1}-01`, 'YYYY-MM-DD')
  );
};
const onChangeMonth = (index: number, value: string) => {
  selected.month = value;
  emit('change', valueToDate(`${selected.year}-${indexOfMonth.value}-01`, 'YYYY-MM-DD'));
};
const onChangeYear = (index: number) => {
  selected.year = index;
  emit('change', valueToDate(`${selected.year}-${indexOfMonth.value}-01`, 'YYYY-MM-DD'));
};
const cardBoxMonthList = h(MonthList, {
  onSelect: onChangeMonth,
});
const years = computed(() =>
  Array.from({ length: endYear.value - startYear.value + 1 }, (_, i) => {
    const year = startYear.value + i;

    return { id: year, value: year };
  })
);
const disableNext = computed(() => selected.year === endYear.value && indexOfMonth.value === 12);
const disablePrev = computed(() => selected.year === startYear.value && indexOfMonth.value === 1);
const cardBoxYearList = h(YearList, {
  data: years,
  onSelect: onChangeYear,
});
const goToToday = () => {
  selected.year = +date(new Date()).format('YYYY');
  selected.month = date(new Date()).format('MMMM');
  emit('change', valueToDate(`${selected.year}-${indexOfMonth.value}-01`, 'YYYY-MM-DD'));
};
const currentMonthDays = computed(() => daysInMonth(toValue(selected.year), toValue(indexOfMonth)));
const toGregorian = (value: number) =>
  valueToDate(`${selected.year}-${indexOfMonth.value}-${value}`, 'YYYY-MM-DD') as unknown as string;
</script>
<style scoped lang="scss">
:deep(.root__variant--outlined) {
  @apply border-0;
}
</style>
