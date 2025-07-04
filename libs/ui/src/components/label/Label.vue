<template>
  <span v-if="text" :class="['lable-container', sizeOfLabel, typeOfLabel, width, radius]">
    {{ text }}
  </span>
</template>

<script setup lang="ts">
import { toRefs, toValue } from 'vue';
import { useLabel } from './useLabel';

export interface Props {
  radius?: string;
  width?: string;
  size?: 'small' | 'medium';
  type?: 'neutral' | 'informative' | 'negative' | 'warning' | 'primary' | 'outlined' | 'positive';
  text: string | number;
}
const props = withDefaults(defineProps<Props>(), {
  radius: 'rounded-sm',
  width: '',
  size: 'small',
  text: '',
  type: 'positive',
});
const { text, type, size } = toRefs(props);
const { type: typeOfLabel, size: sizeOfLabel } = useLabel(toValue(type), toValue(size));
</script>

<style lang="scss" scoped>
@use './label.scss';
</style>
