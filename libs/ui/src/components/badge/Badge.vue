<template>
  <div class="badge">
    <div v-if="content" :class="content ? 'badge__content' : 'badge__withoutContent'">
      {{ content }}
    </div>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { toRefs } from 'vue';

export interface Props {
  content?: string | number | undefined;
}

const props = defineProps<Props>();
const { content } = toRefs(props);
</script>
<style lang="scss">
@use './badge.scss';
</style>
