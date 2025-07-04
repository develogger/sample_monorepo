<template>
  <div class="vjl__navigation-default">
    <div class="vjl__header__navigation">
      <button class="vjl__header__button" :disabled="onlyDay" @click="$emit('monthExplorer')">
        <span>{{ selectedMonth }}</span>
        <AngleDown />
      </button>
      <button
        class="vjl__header__button"
        :disabled="onlyDay || onlyMonth || onlyYear"
        @click="$emit('yearExplorer')"
      >
        <span>{{ selectedYear }}</span>
        <AngleDown />
      </button>
    </div>
    <div class="vjl__header__navigation">
      <button class="vjl__header__button--icon" :disabled="onlyDay" @click="$emit('arrowPrev')">
        <ArrowRight />
      </button>
      <button class="vjl__header__button--icon" :disabled="onlyDay" @click="$emit('arrowNext')">
        <ArrowLeft />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import ArrowRight from '../icons/ArrowRight.vue';
import ArrowLeft from '../icons/ArrowLeft.vue';
import AngleDown from '../icons/AngleDown.vue';
import { useDate, type VjlNavigationProps } from '../../composables/date';
const { date } = useDate();
const props = defineProps<VjlNavigationProps>();
defineEmits(['arrowPrev', 'arrowNext', 'monthExplorer', 'yearExplorer']);
const month = ref(date(new Date()).year());
const { selectedMonth, onlyDay } = toRefs(props);
watch(selectedMonth, () => {
  month.value = selectedMonth.value;
});
</script>
