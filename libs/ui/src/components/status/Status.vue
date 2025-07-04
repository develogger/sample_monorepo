<template>
  <div
    class="status-root"
    :class="[background, icon && !text ? 'p-[2px] rounded-circle' : 'px-xs py-[2px]']"
  >
    <p v-if="text" class="root__text" :class="color">{{ text }}</p>
    <div v-if="dot" class="w-[8px] h-[8px] rounded-circle" :class="dotClass">&nbsp;</div>
    <Icon v-if="icon" :name="icon" :class="iconClass" />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

import Icon from '../icon/Icon.vue';
import { useStatus } from './useStatus';

export interface Props {
  dot?: boolean;
  loading?: boolean;
  icon?: string;
  text?: string;
  type: string;
}
const props = withDefaults(defineProps<Props>(), {
  dot: false,
  icon: '',
  text: '',
});
const { type } = toRefs(props);
const {
  backgroundClass: bg,
  colorClass: c,
  dotClass: dotColor,
  iconClass: iconColor,
} = useStatus(type);
const background = bg;
const color = c;
const dotClass = dotColor;
const iconClass = iconColor;
</script>

<style lang="scss" scoped>
@use './status.scss';
</style>
