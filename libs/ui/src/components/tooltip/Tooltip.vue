<template>
  <div ref="tooltip" class="font-yekanFa">
    <slot class="font-yekanFa" dir="rtl" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toValue, toRefs, h, computed } from 'vue';
import { useTippy } from 'vue-tippy';

const props = withDefaults(
  defineProps<{
    arrow?: boolean;
    content: string;
    position?: 'bottom' | 'top' | 'right' | 'left' | undefined;
    size?: 'medium' | 'small';
    trigger?: string;
    triggerTarget?: Element | Element[] | null;
    duration?: number | [number, number];
    maxWidth?: number | 'none';
    font?: string;
  }>(),
  {
    arrow: true,
    position: 'bottom',
    size: 'medium',
    trigger: 'mouseenter focus',
    triggerTarget: undefined,
    duration: undefined,
    maxWidth: 'none',
    font: '',
  }
);
const tooltip = ref<Element>();
const unSize = ref('tips-medium');
const { font } = toRefs(props);
onMounted(() => {
  if (props.size === 'small') {
    unSize.value = 'tips-small';
  } else {
    unSize.value = 'tips-medium';
  }
});

const { arrow, position, trigger, content, triggerTarget, duration, maxWidth } = toRefs(props);
const tooltipContent = computed(() => {
  if (typeof content.value === 'string') {
    return h('div', { class: font.value ?? 'font-yekanFa', dir: 'rtl' }, content.value);
  }

  return content.value;
});
const { hide } = useTippy(tooltip as unknown as Element, {
  arrow: arrow.value,
  content: tooltipContent.value,
  placement: position.value,
  theme: toValue(unSize),
  trigger: trigger.value,
  triggerTarget: triggerTarget.value,
  duration: duration.value,
  maxWidth: maxWidth.value,
  zIndex: 10000000,
});
defineExpose({ hide });
</script>

<style lang="scss">
@use './tooltip.scss';
</style>
