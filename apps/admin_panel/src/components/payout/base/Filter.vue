<template>
  <div class="root">
    <!-- status filter -->
    <ui-Filter
      ref="filterRef"
      :content="FilterBox"
      :placeholder="$t('_common.filters.placeholder')"
      :value="selectedFilter"
      @close="closeCard"
      @clear="clearFilter"
    />
  </div>
</template>

<script setup lang="ts">
import FilterCard from './FilterCard.vue';
import { FilterEnum } from '@/graphql/graphql';
import { usePayoutFilter } from '@/composables/payout/usePayoutFilter';
import type { Value } from '@/types/value';

const route = useRoute();
const t = useI18n();
const config = useRuntimeConfig();
const router = useRouter();
const { statusList } = usePayoutFilter();
const selectedFilter = ref<string>();
const closer: Ref<() => void> = ref(() => {});
const filterRef = ref();
// show filter selected on label
const filteredValue = (value: FilterEnum) =>
  statusList.value.filter((i: Value) => i.value === value)[0]?.label;
// handle filter selected to update route & selectedFilter
const FilterValues = (value: FilterEnum) => {
  selectedFilter.value = `${t('_common.filters.placeholder')}: ${filteredValue(value)}`;
  router.push({ query: { ...route.query, status: value, page: config.public.page } });
  closer.value();
};
const closeCard = (v: () => void) => {
  closer.value = v;
};
const clearFilter = () => {
  selectedFilter.value = undefined;
  router.push({
    query: {
      ...route.query,
      pageSize: Number(route.query.pageSize) || config.public.pageSize,
      page: config.public.page,
      status: undefined,
    },
  });
};
const isShow = computed(() => filterRef.value?.tippyRef?.state?.isShown);
const FilterBox = h(FilterCard, {
  isShow,
  onAction: FilterValues,
  onClear: clearFilter,
});

watch(
  () => route.query,
  () => {
    const status = filteredValue(route.query.status as FilterEnum);
    if (route.query.status && status) {
      selectedFilter.value = `${t('_common.filters.placeholder')}: ${filteredValue(
        route.query.status as FilterEnum
      )}`;
    } else {
      selectedFilter.value = undefined;
    }
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped>
.root {
  @apply flex justify-end gap-xs flex-wrap;
}
</style>
