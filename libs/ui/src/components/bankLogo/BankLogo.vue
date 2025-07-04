<template>
  <component :is="BankLogoComponent" class="inline-block" />
</template>

<script lang="ts" setup>
import { defineAsyncComponent, toRefs, watch, shallowRef } from 'vue';
import DefaultBankLogo from './bankLogos/Default.vue';
const props = defineProps<{
  fill?: string;
  name: string;
  stroke?: string;
}>();
const { name } = toRefs(props);
const BankLogoComponent = shallowRef();
const logoMap: Record<string, string> = {
  'Tejarat-Old': 'Tejarat',
  Melal: 'Mellall',
};
const loadLogoComponent = (logoName: string) => {
  const logo = logoMap[logoName] || logoName;

  return defineAsyncComponent(() => import(`./bankLogos/${logo}.vue`).catch(() => DefaultBankLogo));
};

BankLogoComponent.value = loadLogoComponent(name.value);

watch(name, newName => {
  if (newName) {
    BankLogoComponent.value = loadLogoComponent(newName);
  }
});
</script>

<style lang="scss" scoped>
@use './bankLogo.scss';
</style>
