<template>
  <Tippy
    ref="tippyRef"
    interactive
    :content="component"
    :arrow="false"
    :hide-on-click="false"
    width="none"
    placement="bottom"
    trigger="manual"
  >
  </Tippy>
</template>

<script setup lang="ts">
import { Tippy } from 'vue-tippy';
import { h, ref, toRefs, useSlots, watch } from 'vue';
import ToastBox from './ToastBox.vue';

export interface Props {
  show: boolean;
  content?: string;
  close?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  content: '',
});
const emits = defineEmits(['close']);
const { content, show, close } = toRefs(props);
const tippyRef = ref<typeof Tippy>();
const slots = useSlots();
const closeToast = () => {
  emits('close');
  tippyRef.value && tippyRef.value.hide();
};
const component = h(
  ToastBox as never,
  {
    onClose: closeToast,
    contentItem: content.value,
    hasClose: close.value,
  },
  slots.default ? slots.default() : undefined
) as unknown as Element;
watch(
  show,
  val => {
    if (val) {
      return tippyRef.value && tippyRef.value.show();
    } else {
      tippyRef.value && tippyRef.value.hide();
    }
  },
  { immediate: true }
);
</script>
<style>
@use './toast.scss';
</style>
