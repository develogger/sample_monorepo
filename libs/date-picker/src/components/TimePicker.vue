<template>
  <div class="vtl">
    <div class="vtl__header">
      <span>{{ formattedHour }}:{{ formattedMinute }}</span>
    </div>
    <div class="vtl__body">
      <div class="vtl__body__time">
        <AngleUp class="vtl__body__arrows" @click="increaseMinute" />
        <span class="vtl__body__counter">{{ formattedMinute }}</span>
        <AngleDown class="vtl__body__arrows" @click="decreaseMinute" />
      </div>
      <div>
        <span class="vtl__body__counter">:</span>
      </div>
      <div class="vtl__body__time">
        <AngleUp class="vtl__body__arrows" @click="increaseHour" />
        <span class="vtl__body__counter">{{ formattedHour }}</span>
        <AngleDown class="vtl__body__arrows" @click="decreaseHour" />
      </div>
    </div>
    <div>
      <slot name="timeFooter" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRefs, nextTick } from 'vue';
import AngleUp from '../components/icons/AngleUp.vue';
import AngleDown from '../components/icons/AngleDown.vue';

export interface Props {
  initialHour: number | undefined;
  initialMinute: number | undefined;
}
const props = withDefaults(defineProps<Props>(), {});
const { initialHour, initialMinute } = toRefs(props);
const emits = defineEmits(['expose']);
const hour = ref(initialHour.value !== undefined ? initialHour.value : 0);
const minute = ref(initialMinute.value !== undefined ? initialMinute.value : 0);
const increaseHour = () => {
  hour.value += 1;
  if (hour.value >= 24) {
    hour.value = 0;
  }
  emits('expose', hour.value, minute.value);
};
const decreaseHour = () => {
  hour.value -= 1;
  if (hour.value < 0) {
    hour.value = 23;
  }
  emits('expose', hour.value, minute.value);
};
const increaseMinute = () => {
  minute.value += 1;
  if (minute.value >= 60) {
    minute.value = 0;
  }
  emits('expose', hour.value, minute.value);
};
const decreaseMinute = () => {
  minute.value -= 1;
  if (minute.value < 0) {
    minute.value = 59;
  }
  emits('expose', hour.value, minute.value);
};
const formattedHour = computed(() => String(hour.value).padStart(2, '0'));
const formattedMinute = computed(() => String(minute.value).padStart(2, '0'));
const reset = () => {
  const now = new Date();
  hour.value = now.getHours();
  minute.value = now.getMinutes();
  emits('expose', hour.value, minute.value);
};

onMounted(() => {
  const now = new Date();
  nextTick(() => {
    hour.value = Number(initialHour.value) || now.getHours();

    minute.value = Number(initialMinute.value) || now.getMinutes();
  });
});
defineExpose({
  reset,
});
</script>

<style lang="scss" scoped>
.vtl {
  @apply bg-surface w-full font-yekanFa rounded-sm p-xs font-YekanBakhFaNum;
  &__header {
    @apply flex justify-start bg-background rounded-sm py-2xs pl-xs pr-sm text-body-400-b1 font-medium items-center mb-xs  select-none text-text;
  }
  &__body {
    @apply flex p-xl gap-xl justify-between items-center;
    &__counter {
      @apply text-[5rem] text-text-soft select-none;
    }
    &__time {
      @apply flex flex-col items-center justify-center w-1/3;
    }
    &__arrows {
      @apply cursor-pointer;
    }
  }
}
</style>
