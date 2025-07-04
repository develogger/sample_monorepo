<template>
  <div>
    <div ref="activator" class="w-fit">
      <slot name="activator" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useTippy } from 'vue-tippy';

export interface Props {
  content?: never;
  offset?: [number, number];
  position?: string;
  trigger?: string;
}
const props = withDefaults(defineProps<Props>(), {
  offset: () => [0, 0],
  position: 'bottom-end',
  trigger: 'click',
  content: undefined,
});
const activator = ref<Element>();
const { content, position, trigger } = reactive(props);

useTippy(activator as unknown as Element, {
  arrow: false,
  content,
  placement: position as never,
  trigger,
});
</script>
