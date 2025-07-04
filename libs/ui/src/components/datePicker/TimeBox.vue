<template>
  <div :style="{ width: parentWidth.value + 'px' }" class="ml-[1px] timebox">
    <Card class="root" dir="rtl">
      <template #main>
        <Time
          ref="timeRef"
          :initial-hour="initializeHour"
          :initial-minute="initializeMinute"
          :hide="hide"
          @expose="timeHandler"
        />
        <div class="flex justify-between">
          <div>
            <!-- <ui-button text="اکنون" type="secondary" @click="resetToNow" /> -->
          </div>
          <div class="flex gap-2xs">
            <div><ui-button text="انصراف" type="secondary" @click="hide" /></div>
            <div><ui-button text="تایید" @click="confirm" /></div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { type Ref, toRefs, ref } from 'vue';
import { onMounted } from 'vue';
import moment from 'moment';
import Time from '../../../../date-picker/src/components/TimePicker.vue';
import Card from '../card/Card.vue';

export interface Props {
  hour: number;
  minute: number;
  parentWidth: Ref<number>;
  hide: () => void;
}
const props = withDefaults(defineProps<Props>(), {});
const { hour, minute, hide } = toRefs(props);
const initializeHour = ref();
const initializeMinute = ref();
const hourRef = ref();
const minuteRef = ref();
const timeRef = ref();
const emits = defineEmits(['selected']);
const timeHandler = (hour: number, minute: number) => {
  hourRef.value = hour.toString().padStart(2, '0');
  minuteRef.value = minute.toString().padStart(2, '0');
};
const confirm = () => {
  if (hourRef.value) {
    emits('selected', `${hourRef.value}:${minuteRef.value}`);
  } else {
    emits('selected', `${initializeHour.value}:${initializeMinute.value}`);
  }
  hide.value();
};
// const resetToNow = () => {
//   timeRef.value.reset();
// };
onMounted(() => {
  initializeHour.value = hour.value || moment().hour();
  initializeMinute.value = minute.value || moment().minute();
});
</script>

<style lang="scss" scoped>
.timebox {
  .card {
    @apply p-xs;
  }
}
</style>
