<template>
  <div class="root">
    <TicketBaseEmptyGrid v-if="typeof value.value === 'undefined' && !fetchLoading.value" />
    <TicketBaseLgGrid v-if="!md && (fetchLoading.value || value.value)" />
    <TicketBaseMdGrid v-if="md" />
    <TicketBaseMdGridLoading v-if="md && fetchLoading.value" />
    <div class="mt-xl">
      <TicketBasePagination v-if="data" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

export interface PositionType {
  x: number;
  y: number;
}
const ticketStore = useTicketStore();
const { loading, data } = storeToRefs(ticketStore);
const { md } = useSize();
const value = computed(() => data);
const fetchLoading = computed(() => loading);
/**
 * @type {PositionType}
 */
const scrollPosition = reactive<PositionType>({
  x: 0,
  y: 0,
});
// const { md } = useSize();
const router = useRouter();

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
