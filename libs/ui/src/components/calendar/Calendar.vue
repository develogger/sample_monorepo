<template>
  <div dir="rtl">
    <Date
      v-bind="props"
      :initial-date="initialDate"
      :only-month="onlyMonth"
      :steps="steps"
      :in-valid-dates="inValidDates"
      :min="min"
      :max="max"
      expose-format="YYYY/MM/DD"
      :show="show"
      @expose="exposeHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import Date from '../../../../date-picker/src/components/DatePicker.vue';

export interface Props {
  inValidDates?: (RegExp | string | string[])[] | RegExp | string;
  initialDate?: (RegExp | string | string[])[] | RegExp | string;
  onlyDay?: boolean;
  onlyMonth?: boolean;
  onlyYear?: boolean;
  min?: boolean;
  max?: boolean;
  steps?: [string, string, string | undefined] | undefined;
  exposeFormat?: string;
  holidays?: (RegExp | string | string[])[] | RegExp | string;
  weekend?: number | number[];
  range?: boolean;
  onlyCurrentMonthDays?: boolean;
  show: boolean;
}
const props = defineProps<Props>();
const emits = defineEmits(['expose']);
const { initialDate, onlyMonth, steps, show } = toRefs(props);
const exposeHandler = (value: unknown) => {
  emits('expose', value);
};
</script>

<style lang="scss" scoped></style>
