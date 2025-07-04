<template>
  <IllustrationComponent class="inline-block" />
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';

const props = defineProps<{
  name: string;
}>();
const IllustrationComponent = defineAsyncComponent(
  async () => await import(`./vector/${props.name}.vue`)
);
</script>
