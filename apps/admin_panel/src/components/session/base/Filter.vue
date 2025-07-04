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
import { useSessionFilter } from '@/composables/session/useSessionFilter';
import { FilterEnum } from '@/graphql/graphql';
import type { Value } from '@/types/value';

const t = useI18n();
const route = useRoute();
const config = useRuntimeConfig();
const router = useRouter();
const { statusList } = useSessionFilter();
const selectedFilter = ref<string>();
const closer: Ref<() => void> = ref(() => {});
const filterRef = ref();
const filteredValue = (value: FilterEnum) =>
  statusList.value.filter((i: Value) => i.value === value)[0]?.label;
const FilterValues = (value: FilterEnum) => {
  if (value !== FilterEnum.All) {
    selectedFilter.value = `${t('_common.filters.placeholder')}: ${filteredValue(value)}`;
  }
  router.push({ query: { ...route.query, status: value, page: config.public.page } });
  closer.value();
};
const closeCard = (v: () => void) => {
  closer.value = v;
};
const clearFilter = () => {
  router.push({
    query: {
      ...route.query,
      pageSize: Number(route.query.pageSize) || config.public.pageSize,
      page: config.public.page,
      status: FilterEnum.All,
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
      if (route.query.status === FilterEnum.All) {
        selectedFilter.value = undefined;
      } else {
        selectedFilter.value = `${t('_common.filters.placeholder')}: ${filteredValue(
          route.query.status as FilterEnum
        )}`;
      }
    } else {
      selectedFilter.value = `${t('_common.filters.placeholder')}: ${filteredValue(
        FilterEnum.Active
      )}`;
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
