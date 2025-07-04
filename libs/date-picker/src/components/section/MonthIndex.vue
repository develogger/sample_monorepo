<template>
  <div>
    <div v-if="!onlyMonth" class="vjl__month-index--default__close">
      <button
        class="vjl__month-index--default__close__button"
        :disabled="onlyMonth"
        @click="$emit('monthSelectedCallback')"
      >
        <Close />
      </button>
    </div>
    <div ref="monthContainerRef" class="vjl__month-index--default">
      <div v-for="month in monthList" :key="month">
        <button
          :id="selectedMonth === month ? 'selected' : ''"
          ref="monthContainedRef"
          :class="{ 'vjl__button--selected': selectedMonth === month }"
          class="vjl__button--default vjl__month-index--default__month"
          :disabled="dateBoundaryHandler(inValidDates as never, `${selectedYear}/${indexOfMonth}`)"
          @click="$emit('monthSelectedCallback', month)"
        >
          <span>{{ month }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref, onMounted, computed } from 'vue';
import { useDate, type VjlMonthProps } from '../../composables/date';
import Close from '../icons/Close.vue';
defineEmits(['monthSelectedCallback']);
const props = withDefaults(defineProps<VjlMonthProps>(), {});
const { selectedMonth, selectedYear, inValidDates, onlyMonth } = toRefs(props);
const { monthList, dateBoundaryHandler } = useDate();
const indexOfMonth = computed(() => monthList.indexOf(selectedMonth.value) + 1);
const monthContainerRef = ref<HTMLElement>();
onMounted(() => {
  const scrollMonth = monthContainerRef.value?.querySelector('#selected');
  scrollMonth?.scrollIntoView({ behavior: 'smooth' });
});
</script>
