<template>
  <div>
    <div
      class="flex flex-col relative gap-xl p-xl max-w-[330px] text-text-dark bg-background-dark dark:bg-secondary dark:text-text rounded-lg"
    >
      <div class="flex flex-col gap-xs justify-center items-center">
        <div class="text-[72px] leading-[84px] font-extrabold">
          <Illustration :name="icon" />
        </div>
        <div class="text-body-500-b2 text-center">{{ text }}</div>
      </div>
      <div class="action flex flex-col gap-md">
        <slot name="actions" />
      </div>
      <span class="absolute bottom-[-14px] left-[144px]">
        <BeakSvg />
      </span>
    </div>
    <div class="pt-3xl px-[82px]">
      <ShadowSvg />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Illustration from '../illustration/Illustration.vue';
import BeakSvg from './svg/BeakSvg.vue';
import ShadowSvg from './svg/ShadowSvg.vue';

type ErrorMessageProps = {
  icon: string;
  text: string;
};

defineProps<ErrorMessageProps>();
</script>
