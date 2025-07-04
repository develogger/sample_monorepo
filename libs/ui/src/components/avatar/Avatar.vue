<template>
  <div>
    <div
      v-if="src"
      :class="[
        sizeHandler(),
        hasBorder ? 'dark:border-border-dark-divider border-border-divider border' : '',
      ]"
      class="rounded-circle flex items-center justify-center"
    >
      <img :src="src" :alt="alt" role="img" :class="shaper" />
    </div>
    <div
      v-else
      :class="[sizeHandler(), shaper, customClass ? customClass : 'bg-surface-soft']"
      class="dark:bg-surface-dark-soft flex items-center justify-center dark:border-border-dark-divider border-border-divider border"
    >
      <Icon :name="type" class="text-black-40 dark:text-white-40" :class="classIcon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';

import Icon from '../icon/Icon.vue';

const props = withDefaults(
  defineProps<{
    shape?: 'rounded' | 'square';
    size?: 'lg' | 'md' | 'sm' | 'xl' | 'xs';
    src?: string;
    type?: string;
    classIcon?: string;
    customClass?: string;
    alt?: string;
    hasBorder?: boolean;
  }>(),
  {
    shape: 'rounded',
    size: 'md',
    src: '',
    type: 'ProfileFill',
    classIcon: '',
    customClass: '',
    alt: '',
    hasBorder: false,
  }
);
const { size, src } = toRefs(props);
const sizeHandler = () => {
  switch (size.value) {
    case 'xs':
      return 'w-2xl h-2xl';
    case 'sm':
      return 'w-2xl h-2xl';
    case 'lg':
      return 'w-4xl h-4xl';
    case 'xl':
      return 'w-[80px] h-[80px]';
    default:
      return 'w-[40px] h-[40px]';
  }
};
const shaper = computed(() => {
  if (props.shape === 'square') {
    return 'rounded-md';
  }

  return 'rounded-circle';
});
</script>
