<template>
  <ui-Card>
    <template #main>
      <div class="mb-xl flex justify-start flex-row-reverse gap-xs flex-wrap">
        <ui-Skeleton :loading="loading" :width="83" :height="33" radius="xl">
          <CouponBaseFilter />
        </ui-Skeleton>
      </div>
      <CouponBaseContent />
    </template>
  </ui-Card>
</template>
<script lang="ts" setup>
const loading = inject<boolean>('couponLoading');
</script>
