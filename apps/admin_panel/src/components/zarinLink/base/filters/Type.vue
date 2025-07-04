<template>
  <div class="root">
    <!-- type filter -->
    <ui-Filter
      ref="filterRef"
      :content="FilterBox"
      :placeholder="$t('_common.filters.type')"
      :value="selectedFilter"
      @close="closeCard"
      @clear="clearFilter"
    />
  </div>
</template>

<script setup lang="ts">
import TypeCard from '@/components/zarinLink/base/filters/TypeCard.vue';
import { FilterEnum } from '@/graphql/graphql';
import { useZarinLinkFilter } from '@/composables/zarinlink/useZarinLinkFilter';

const route = useRoute();
const t = useI18n();
const config = useRuntimeConfig();
const router = useRouter();
const { typesList } = useZarinLinkFilter();
const selectedFilter = ref<string>();
const closer: Ref<() => void> = ref(() => {});
const filterRef = ref();
// show filter selected on label
const filteredValue = (value: FilterEnum) =>
  typesList.value.filter((i: { label: string; value: string | boolean }) => i.value === value)[0]
    .label;
// handle filter selected to update route & selectedFilter
const FilterValues = (value: FilterEnum) => {
  selectedFilter.value = `${t('_common.filters.placeholder')}: ${filteredValue(value)}`;
  router.push({ query: { ...route.query, type: value, page: config.public.page } });
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
      type: undefined,
    },
  });
};
const isShow = computed(() => filterRef.value?.tippyRef?.state?.isShown);
const FilterBox = h(TypeCard, {
  isShow,
  onAction: FilterValues,
  onClear: clearFilter,
});

onMounted(() => {
  if (route.query.type) {
    selectedFilter.value = `${t('_common.filters.type')}: ${filteredValue(
      route.query.type as FilterEnum
    )}`;
  } else {
    selectedFilter.value = undefined;
  }
});
</script>
<style lang="scss" scoped>
.root {
  @apply flex justify-end gap-xs flex-wrap;
}
</style>
