<template>
  <ui-Filter
    ref="filterRef"
    :content="AmountBox"
    :placeholder="$t('_common.filters.amount')"
    :value="
      amountHandler(
        route.query.lessAmount as string,
        route.query.moreAmount as string,
        route.query.equalAmount as string
      )
    "
    @close="closeCard"
    @clear="clearAmount"
  />
</template>

<script setup lang="ts">
import AmountCard from './AmountCard.vue';
import { useAmountFilter } from '@/composables/amountFilter/useAmountFilter';

const route = useRoute();
const router = useRouter();
const filterRef = ref();
const config = useRuntimeConfig();
const closer: Ref<() => void> = ref(() => {});
const { amountHandler } = useAmountFilter();
const closeCard = (v: () => void) => {
  closer.value = v;
};
const clearAmount = () => {
  router.push({
    query: {
      ...route.query,
      pageSize: Number(route.query.pageSize) || config.public.pageSize,
      page: config.public.page,
      lessAmount: undefined,
      moreAmount: undefined,
      equalAmount: undefined,
    },
  });
};
const AmountValues = () => {
  closer.value();
};
const isShow = computed(() => filterRef.value?.tippyRef?.state?.isShown);
const AmountBox = h(AmountCard, {
  isShow,
  onAction: AmountValues,
  onClose: () => {
    closer.value();
    filterRef.value && filterRef.value.tippyRef.hide();
  },
  onClear: clearAmount,
});
</script>
