<template>
  <div :style="{ width: parentWidth.value + 'px' }" class="ml-[1px]">
    <Card class="root" dir="rtl">
      <template #main>
        <Date
          :initial-date="value"
          :only-month="onlyMonth"
          :steps="steps"
          :in-valid-dates="inValidDates"
          :min="min"
          :max="max"
          :show="show"
          expose-format="YYYY/MM/DD"
          @expose="exposeHandler"
        />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { type Ref, toRefs } from 'vue';
import Date from '../../../../date-picker/src/components/DatePicker.vue';
import Card from '../card/Card.vue';
import { type Boundary } from '../../../../date-picker/src/composables/date';

export interface Props {
  value: string;
  inValidDates?: Boundary;
  parentWidth: Ref<number>;
  onlyMonth: boolean;
  steps?: [string, string, string | undefined] | undefined;
  min?: boolean;
  max?: boolean;
  show: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  steps: undefined,
  inValidDates: undefined,
});
const emits = defineEmits(['selected']);
const exposeHandler = (value: unknown) => {
  emits('selected', value);
};
const { value, onlyMonth, steps, show } = toRefs(props);
</script>
