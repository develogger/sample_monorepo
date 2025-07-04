<template>
  <div dir="ltr" class="root">
    <ui-Filter
      :content="FilterBox"
      :placeholder="selectedFilter"
      @close="closeCard"
      @clear="clearFilter"
    />
  </div>
</template>

<script setup lang="ts">
import FilterCard from './FilterCard.vue';

const route = useRoute();
const router = useRouter();
const { dateFilterList } = useDateFilterColumn();
const filteredValue = (value: string) =>
  dateFilterList.find((i: Record<string, string>) => i.id === value)?.title;
const selectedFilter = ref<string>();
const closer: Ref<() => void> = ref(() => {});
const FilterValues = (value: string) => {
  selectedFilter.value = `${filteredValue(value)}`;
  router.push({ query: { dateType: value } });
  closer.value();
};
const closeCard = (v: () => void) => {
  closer.value = v;
};
const clearFilter = () => {
  router.push({
    query: {
      ...route.query,
      dateType: 'month',
    },
  });
};
const FilterBox = h(FilterCard, {
  onAction: FilterValues,
  onClear: clearFilter,
});
watch(
  () => route.query,
  () => {
    if (route.query.dateType) {
      selectedFilter.value = filteredValue(route.query.dateType as string);
    } else {
      selectedFilter.value = filteredValue('month');
    }
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped>
.root {
  @apply flex justify-end;
}
</style>
