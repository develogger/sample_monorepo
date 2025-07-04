<template>
  <div class="root">
    <!-- status filter -->
    <ui-Filter
      :content="FilterBox"
      :placeholder="$t('_common.filters.placeholder')"
      :value="selectedFilter"
      @close="closeCard"
      @clear="clearFilter"
    />
  </div>
</template>

<script setup lang="ts">
import { useInvoiceFilter } from '../../../composables/invoice/useInvoiceFilter';
import FilterCard from './FilterCard.vue';
import type { Value } from '@/types/value';
import { InvoiceStatusEnum } from '@/graphql/graphql';

const route = useRoute();
const t = useI18n();
const config = useRuntimeConfig();
const router = useRouter();
const { statusList } = useInvoiceFilter();
const selectedFilter = ref<string>();
const closer: Ref<() => void> = ref(() => {});
// show filter selected on label
const filteredValue = (value: InvoiceStatusEnum) =>
  statusList.value.filter((i: Value) => i.value === value)[0].label;
// handle filter selected to update route & selectedFilter
const FilterValues = (value: InvoiceStatusEnum) => {
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
const FilterBox = h(FilterCard, {
  onAction: FilterValues,
  onClear: clearFilter,
});
watch(
  () => route.query,
  () => {
    if (route.query.status) {
      selectedFilter.value = `${t('_common.filters.placeholder')}: ${filteredValue(
        route.query.status as InvoiceStatusEnum
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
