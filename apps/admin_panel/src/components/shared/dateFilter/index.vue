<template>
  <ui-Filter
    ref="filterRef"
    :content="DateBox"
    :placeholder="$t('_common.filters.date')"
    :value="selectedFilter"
    @close="closeCard"
    @clear="clearFilter"
  />
</template>
<script setup lang="ts">
import DateCard from './DateCard.vue';
const t = useI18n();
const route = useRoute();
const router = useRouter();
const { convertQueryParamDate } = useDate();
const selectedFilter = ref<string>();
const closer: Ref<() => void> = ref(() => {});
const filterRef = ref();
const closeCard = (v: () => void) => {
  closer.value = v;
};
const FilterValues = () => {
  closer.value();
};
const clearFilter = () => {
  selectedFilter.value = undefined;
  router.push({
    query: {
      ...route.query,
      from: undefined,
      to: undefined,
    },
  });
};
const isShow = computed(() => filterRef.value?.tippyRef?.state?.isShown);
const DateBox = h(DateCard, { isShow, onAction: FilterValues, onClear: clearFilter });
watch(
  () => route.query,
  () => {
    if (route.query.from && route.query.to) {
      const toDate = route.query.to;
      const fromDate = route.query.from;
      const isValidFromDate = !!convertQueryParamDate(fromDate as string);
      const isValidToDate = !!convertQueryParamDate(toDate as string);

      if (toDate === fromDate) {
        selectedFilter.value = isValidToDate
          ? `${t('_common.filters.date')}: ${toDate}`
          : undefined;
      } else if (isValidFromDate && isValidToDate) {
        selectedFilter.value = `${t('_common.filters.date')}: ${fromDate} - ${toDate}`;
      } else if (isValidFromDate) {
        selectedFilter.value = `${t('_common.filters.date')}: ${fromDate}`;
      } else if (isValidToDate) {
        selectedFilter.value = `${t('_common.filters.date')}: ${toDate}`;
      } else {
        selectedFilter.value = undefined;
      }
    } else {
      selectedFilter.value = undefined;
    }
  },
  {
    immediate: true,
  }
);
</script>
