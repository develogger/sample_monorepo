<template>
  <div>
    <div v-if="!onlyYear" class="vjl__year-index--default__close">
      <button
        class="vjl__year-index--default__close__button"
        @click="$emit('yearSelectedCallback')"
      >
        <Close />
      </button>
    </div>
    <div ref="yearContainerRef" class="vjl__year-index--default">
      <div v-for="year in yearList" :key="year">
        <button
          :id="selectedYear === year ? 'selected' : ''"
          ref="yearContainedRef"
          :class="{ 'vjl__button--selected': selectedYear === year }"
          class="vjl__button--default vjl__year-index--default__year"
          :disabled="dateBoundaryHandler(inValidDates as never, `${year}/01`)"
          @click="$emit('yearSelectedCallback', year)"
        >
          <span>{{ year }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref, onMounted } from 'vue';
import { useDate, type VjlYearProps } from '../../composables/date';
import Close from '../../components/icons/Close.vue';
defineEmits(['yearSelectedCallback']);
const props = withDefaults(defineProps<VjlYearProps>(), {});
const { selectedYear, onlyYear } = toRefs(props);
const { yearList, dateBoundaryHandler } = useDate();
const yearContainerRef = ref<HTMLElement>();
onMounted(() => {
  const scrollYear = yearContainerRef.value?.querySelector('#selected');
  scrollYear?.scrollIntoView({ behavior: 'smooth' });
});
</script>
