<template>
  <CouponOverviewMdView v-if="lg" @select="handleExposer" />
  <CouponOverviewLgView v-else @select="handleExposer" />
</template>

<script setup lang="ts">
import { useCouponStore } from '@/stores/couponStore';
import { useZarinLinkOverviewQuery } from '~/composables/zarinlink/useZarinLinkQuery';

export interface Props {
  lg: boolean;
}
withDefaults(defineProps<Props>(), {});
const { data, loading } = useZarinLinkOverviewQuery();
provide('data', data);
provide('loading', loading);
const store = useCouponStore();
const emit = defineEmits(['select']);
const handleExposer = (value: string[]) => {
  emit('select', value);
};
onUnmounted(() => {
  store.searchText = '';
  store.showToggleSelectedProduct = false;
});
</script>
