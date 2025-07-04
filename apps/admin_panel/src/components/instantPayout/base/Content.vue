<template>
  <div class="root">
    <InstantPayoutBaseLgGrid v-if="!md" />
    <InstantPayoutBaseMdGrid v-if="md" />
    <div class="mt-xl">
      <InstantPayoutBasePagination v-if="(data && data.length > 0) || loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { InstantPayoutType } from '@/graphql/graphql';

export interface PositionType {
  x: number;
  y: number;
}
const data = inject<InstantPayoutType[]>('instantPayout');
const loading = inject<boolean>('instantPayoutLoading');
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
