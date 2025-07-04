<template>
  <div dir="ltr">
    <ui-Filter
      :content="DateBox"
      :placeholder="selectedDateLabel.label"
      :value="!selectedDateLabel.target ? selectedDateLabel.label : ''"
      @close="closeCard"
      @clear="clearFilter"
    />
  </div>
</template>
<script setup lang="ts">
import DateCard from './DateCard.vue';
const { subtract, convert, isYesterday } = useDate();
const emits = defineEmits(['action']);
const t = useI18n();
const route = useRoute();
const router = useRouter();
const selectedFilter = ref<string>();
const closer: Ref<() => void> = ref(() => {});
const closeCard = (v: () => void) => {
  closer.value = v;
};
const FilterValues = (value: string) => {
  selectedFilter.value = value;
  emits('action', value);
  closer.value();
};
const clearFilter = () => {
  selectedFilter.value = undefined;
  router.push({
    query: {
      ...route.query,
      selectedDate: undefined,
    },
  });
};
const selectedDateLabel = computed(() => {
  const m = convert(selectedFilter.value as string, 'jYYYY/jMM/jDD', 'YYYY/MM/DD');
  const yesterday = isYesterday(m);
  if (yesterday || !selectedFilter.value) {
    return {
      label: `${t('مقایسه با')}: ${t('_common.date.yesterday')}`,
      target: yesterday,
    };
  }

  return {
    label: `${t('مقایسه با')}: ${convert(selectedFilter.value, 'jYYYY/jMM/jDD', 'jD jMMMM')}`,
    target: yesterday,
  };
});
const DateBox = h(DateCard, { onAction: FilterValues, onClear: clearFilter });
watch(
  () => route.query,
  () => {
    if (route.query.selectedDate) {
      const selectedDate = route.query.selectedDate;
      if (selectedDate) {
        selectedFilter.value = `${selectedDate}`;
      }
    } else {
      selectedFilter.value = subtract(1, 'jYYYY/jMM/jDD');
      emits('action', selectedFilter.value);
    }
  },
  {
    immediate: true,
  }
);
</script>
