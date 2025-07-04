<template>
  <i :class="`icon-${name}`"></i>
  <!-- <IconComponent class="inline-block" /> -->
</template>

<script lang="ts" setup>
// import { defineAsyncComponent, toRefs, watch } from 'vue';

/* const props = */ defineProps<{
  fill?: string;
  name: string;
  stroke?: string;
}>();
// const { name } = toRefs(props);
// let IconComponent = defineAsyncComponent(async () => await import(`./icons/${props.name}.vue`));
// watch(name, newName => {
//   IconComponent = defineAsyncComponent(() => import(`./icons/${newName}.vue`));
// });
</script>

<style lang="scss" scoped>
@use './icon.scss';
</style>
