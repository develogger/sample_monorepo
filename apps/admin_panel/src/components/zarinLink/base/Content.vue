<template>
  <div class="root">
    <ZarinLinkBaseLgGrid v-if="!md" />
    <ZarinLinkBaseMdGrid v-if="md" />
    <div v-if="(data && data.length > 0) || loading" class="mt-xl">
      <ZarinLinkBasePagination />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ZarinLinkType } from '@/graphql/graphql';

export interface PositionType {
  x: number;
  y: number;
}
const data = inject<ZarinLinkType[]>('zarinLinks');
const loading = inject<boolean>('zarinLinksLoading');
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
