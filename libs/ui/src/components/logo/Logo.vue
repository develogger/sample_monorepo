<template>
  <component :is="iconComponent" role="svg" class="inline-block" />
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';

const props = defineProps<{
  name: string;
}>();
const iconComponent = defineAsyncComponent(async () => {
  const module = await import(`./logos/${props.name}.vue`);

  return module.default;
});
</script>
