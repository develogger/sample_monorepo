<template>
  <PspLogoComponent class="inline-block" />
</template>

<script lang="ts" setup>
import { defineAsyncComponent, shallowRef, toRefs, watch } from 'vue';
import DefaultPspLogo from './pspLogos/Default.vue';

const props = defineProps<{
  fill?: string;
  name: string;
  stroke?: string;
}>();
const { name } = toRefs(props);
const PspLogoComponent = shallowRef();
const loadLogoComponent = (name: string) =>
  defineAsyncComponent(() => import(`./pspLogos/${name}.vue`).catch(() => DefaultPspLogo));

PspLogoComponent.value = loadLogoComponent(name.value);
watch(name, newName => {
  if (newName) {
    PspLogoComponent.value = loadLogoComponent(newName);
  }
});
</script>

<style lang="scss" scoped>
@use './pspLogo.scss';
</style>
