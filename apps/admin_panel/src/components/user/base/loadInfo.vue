<template>
  <div>
    <div class="mb-xl user-info" dir="rtl">
      {{ $t('_common.buttons.userProfile') }}
    </div>
    <div class="flex items-center justify-between mb-xl">
      <ui-Avatar shape="square" type="Terminal" size="lg" class-icon="w-xl h-xl" />
    </div>
    <div
      class="main block border border-border-divider rounded-sm flex-row items-center border-b-0"
    >
      <div class="flex w-full gap-xs flex-row main__item--detail">
        <span class="text-body-400-b3 text-text-soft main__item--heading">
          <ui-Skeleton :height="12" class="mb-xs" />
        </span>
        <span class="text-body-400-b2 truncate flex-1">
          <ui-Skeleton :height="12" class="mb-xs" />
        </span>
      </div>
      <div class="flex w-full gap-xs flex-row main__item--detail">
        <span class="text-body-400-b3 text-text-soft main__item--heading">
          <ui-Skeleton :height="12" class="mb-xs" />
        </span>
        <span class="text-body-400-b2 truncate flex-1">
          <ui-Skeleton :height="12" class="mb-xs" />
        </span>
      </div>
      <div class="flex w-full gap-xs flex-row main__item--detail">
        <span class="text-body-400-b3 text-text-soft main__item--heading">
          <ui-Skeleton :height="12" class="mb-xs" />
        </span>
        <span class="text-body-400-b2 truncate flex-1">
          <ui-Skeleton :height="12" class="mb-xs" />
        </span>
      </div>
      <div class="flex w-full gap-xs flex-row main__item--detail">
        <span class="text-body-400-b3 text-text-soft main__item--heading">
          <ui-Skeleton :height="12" class="mb-xs" />
        </span>
        <span class="text-body-400-b2 truncate flex-1">
          <ui-Skeleton :height="12" class="mb-xs" />
        </span>
      </div>
    </div>
    <div class="mt-xl rtl text-text text-body-400-b3">
      <ui-Skeleton :height="12" class="mb-xs" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
.main {
  @apply lg:flex-row flex-col gap-sm;
  direction: rtl;
  &__item--detail {
    @apply flex justify-between w-full gap-xs p-md  border-b border-border-divider;
  }
  &__item--heading {
    @apply text-body-400-b2 flex flex-col ml-[-1px] mb-[-1px]  min-w-[200px]  ml-[-1px] mb-[-1px]  gap-xs;
    @apply flex-[1_0_25%];
  }
}
.rtl {
  direction: rtl;
}
</style>
