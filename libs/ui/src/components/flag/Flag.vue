<template>
  <FlagComponent class="inline-block" />
</template>

<script lang="ts" setup>
import { defineAsyncComponent, shallowRef, toRefs, watch } from 'vue';
import { CountryCode } from './flagNames';
import DefaultFlag from './flags/Default.vue';

const props = defineProps<{
  name: keyof typeof CountryCode;
}>();
const { name } = toRefs(props);
const FlagComponent = shallowRef();
const loadLogoComponent = (name: keyof typeof CountryCode) =>
  defineAsyncComponent(() => import(`./flags/${CountryCode[name]}.vue`).catch(() => DefaultFlag));

FlagComponent.value = loadLogoComponent(name.value);
watch(name, newName => {
  if (newName) {
    FlagComponent.value = loadLogoComponent(newName);
  }
});
</script>
