<template>
  <div class="root">
    <PayoutBaseLgGrid v-if="!md" @refresh="$emit('refresh')" />
    <PayoutBaseMdGrid v-if="md" @refresh="$emit('refresh')" />
    <div class="mt-xl">
      <PayoutBasePagination v-if="(data && data.length > 0) || loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PayoutType } from '@/graphql/graphql';

export interface PositionType {
  x: number;
  y: number;
}
defineEmits(['refresh']);
const data = inject<PayoutType[]>('payout');
const loading = inject<boolean>('payoutLoading');
const router = useRouter();
const { md } = useSize();
const scrollPosition = reactive<PositionType>({
  x: 0,
  y: 0,
});

/**
 * @type {PositionType}
 * @description scroll position of the page
 */
router.beforeEach(() => {
  scrollPosition.x = window.scrollX;
  scrollPosition.y = window.scrollY;
  window.scrollTo(scrollPosition.x, scrollPosition.y);
});
</script>

<style lang="scss" scoped>
.root {
  @apply font-yekanFa;
}
.loading {
  @apply flex;
}
</style>
