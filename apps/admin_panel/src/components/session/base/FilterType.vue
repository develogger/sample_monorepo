<template>
  <div class="root">
    <!-- status filter -->
    <ui-Filter
      ref="filterRef"
      :content="FilterType"
      :placeholder="$t('_form.search.paymentMethod')"
      :value="selectedType"
      @close="closeCard"
      @clear="clearFilter"
    />
  </div>
</template>

<script setup lang="ts">
import TypeList from './TypeList.vue';
import { SessionTypeEnum } from '@/graphql/graphql';
import type { Value } from '@/types/value';

const t = useI18n();
const route = useRoute();
const config = useRuntimeConfig();
const router = useRouter();
const { typeList } = useSessionFilter();
const selectedType = ref<string>();
const closer: Ref<() => void> = ref(() => {});
const filterRef = ref();
const filteredValue = (value: SessionTypeEnum) =>
  typeList.value.filter((i: Value) => i.value === value)[0]?.label;
const FilterValues = (value: SessionTypeEnum) => {
  selectedType.value = `${t('_form.search.paymentMethod')}: ${filteredValue(value)}`;
  router.push({ query: { ...route.query, type: value, page: config.public.page } });
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
      type: undefined,
    },
  });
};
const isShow = computed(() => filterRef.value?.tippyRef?.state?.isShown);
const FilterType = h(TypeList, {
  isShow,
  onAction: FilterValues,
  onClear: clearFilter,
});
watch(
  () => route.query,
  () => {
    const type = filteredValue(route.query.type as SessionTypeEnum);
    if (route.query.type && type) {
      selectedType.value = `${t('_form.search.paymentMethod')}: ${type}`;
    } else {
      selectedType.value = undefined;
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
