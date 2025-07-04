<template>
  <div class="shimmer-container">
    <div
      v-if="loading"
      :class="classes"
      :style="{ width: fullWidth ? '100%' : width + 'px', height: height + 'px' }"
      class="shimmer-box bg-gradient-to-r"
    >
      &nbsp;
    </div>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

interface Props {
  fullWidth?: boolean;
  circle?: boolean;
  height?: number;
  loading?: boolean;
  radius?: string;
  width?: number;
  contentClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  circle: false,
  height: 12,
  loading: true,
  radius: 'xs',
  width: 140,
  contentClass: '',
});
const blocks = ref<number[]>([]);

onMounted(() => {
  startShimmer();
});

const startShimmer = () => {
  setInterval(() => {
    blocks.value.push(Date.now());
  }, 2000);
};
const classes = computed(() => [
  props.circle
    ? `rounded-circle ${props.contentClass}`
    : `rounded-${props.radius} ${props.contentClass}`,
]);
</script>
<style lang="scss" scoped>
@use './skeleton.scss';
</style>
