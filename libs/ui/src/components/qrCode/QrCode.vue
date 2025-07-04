<template>
  <div v-show="isLoaded" class="qr-code">
    <NuxtImg class="qr-code__img" :src="link" alt="qrcode" @load="onImageLoad" />
    <Logo name="zarinpalTypeFaDark" class="w-[56px] mt-sm" />
  </div>
  <div v-show="!isLoaded" class="qr-code">
    <Skeleton :width="128" :height="128" />
    <Skeleton class="mt-sm" :width="56" :height="16" />
  </div>
</template>
<script setup lang="ts">
import { toRefs, ref } from 'vue';
import Logo from '../logo/Logo.vue';
import Skeleton from '../skeleton/Skeleton.vue';

export interface Props {
  link: string;
}
const props = withDefaults(defineProps<Props>(), {});
const { link } = toRefs(props);
const isLoaded = ref(false);
const onImageLoad = () => {
  isLoaded.value = true;
};
</script>
<style scoped lang="scss">
@use './qrCode.scss';
</style>
