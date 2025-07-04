<template>
  <div class="relative">
    <div ref="actionRef">
      <Button
        ref="buttonActionRef"
        icon="DotsMenu"
        type="tertiary"
        class="w-[32px] h-[32px]"
        @mouseenter="eventHandler"
        @click.stop="toggleShow"
      />
    </div>
    <div
      v-show="eventType.event === 'mouseenter' && eventType.uniqueId === id && !toggleMenu"
      class="absolute top-0 left-[32px]"
    >
      <HoverAction
        :items="items"
        :limit="limit"
        @mouseenter="eventHandler"
        @mouseleave="eventHandler"
      />
    </div>
    <div
      v-show="id === selectedId && toggleMenu"
      ref="cardActionRef"
      class="absolute left-0 z-20"
      :class="position ? 'bottom-[40px]' : 'top-[40px]'"
    >
      <ClickAction :items="items" :limit="limit" :width="width" @click.self="eventHandler" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, provide } from 'vue';
import Button from '../button/Button.vue';
import { useDetectOutsideClick } from '../../composables/detects';
import HoverAction from './HoverAction.vue';
import ClickAction from './ClickAction.vue';
import { type Props, type EventType } from './actionTypes';

const props = withDefaults(defineProps<Props>(), {
  limit: 1,
  width: '200px',
  id: undefined,
  eventType: () =>
    ({
      uniqueId: '',
      event: '',
    }) as EventType,
});
const { items, selectedId, id, eventType } = toRefs(props);
const toggleMenu = ref<boolean>(false);
const cardActionRef = ref();
const buttonActionRef = ref();
const position = ref(true);
const actionRef = ref();
const emits = defineEmits(['idValue', 'update:modelValue']);
const toggleShow = () => {
  if (isButtonAtBottom()) {
    position.value = false;
  }
  emits('idValue', id.value);
  toggleMenu.value = !toggleMenu.value;
};
const hide = () => {
  toggleMenu.value = false;
};
useDetectOutsideClick(cardActionRef, () => {
  toggleMenu.value = false;
});
useDetectOutsideClick(buttonActionRef, () => {
  toggleMenu.value = false;
});
const eventHandler = (event: MouseEvent) => {
  if (eventType.value.event !== 'click' && eventType.value.uniqueId === id.value) {
    eventType.value.event = event.type;
  }
};
const isButtonAtBottom = () => {
  const buttonRect = actionRef.value?.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  return buttonRect?.bottom + 300 <= windowHeight;
};
provide('toggleShow', toggleShow);
provide('hide', hide);
</script>
