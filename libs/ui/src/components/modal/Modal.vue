<template>
  <div ref="modalRef" class="modal">
    <div
      id="modal-container"
      :style="[{ width: finalWidth }]"
      class="modal__container"
      :class="$attrs['class'] ? $attrs['class'] : 'w-full lg:w-[400px]'"
    >
      <header
        v-if="isHeader"
        :class="{ 'border-b border-border-divider': headerBoarder }"
        class="modal__header"
      >
        <slot name="header" />
        <Button
          v-if="closeIcon"
          class="modal__header--icon"
          name="Close"
          type="tertiary"
          icon="Close"
          @click="closeModal"
        />
        <span v-if="text" class="modal__header--text truncate">{{ text }}</span>
      </header>
      <main class="modal__body" :class="mainClass">
        <div class="modal__body__slot">
          <slot name="body" />
        </div>
      </main>
      <footer
        v-if="$slots.leftFooter || $slots.rightFooter || $slots.footer"
        :class="{ 'border-t  flex border-border-divider': footerBoarder }"
        class="modal__footer"
      >
        <!-- right side -->
        <div v-if="$slots.rightFooter" class="footer-container right">
          <slot name="rightFooter" />
        </div>
        <slot name="footer" />
        <!-- left side -->
        <div v-if="$slots.leftFooter" class="modal__footer--left">
          <slot name="leftFooter" />
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRefs } from 'vue';
import Button from '../button/Button.vue';
import { useDetectOutsideClick } from '../../composables/detects';

export interface Props {
  text?: string;
  closeIcon?: boolean;
  isHeader?: boolean;
  header?: boolean;
  outsideClick?: boolean;
  headerBoarder?: boolean;
  footerBoarder?: boolean;
  mainClass?: string;
  width?: string;
}
defineOptions({
  inheritAttrs: false,
});
const props = withDefaults(defineProps<Props>(), {
  text: '',
  outsideClick: true,
  headerBoarder: true,
  isHeader: true,
  footerBoarder: true,
  mainClass: '',
  width: '',
});
const { outsideClick, headerBoarder, footerBoarder } = toRefs(props);
const emits = defineEmits(['close']);
const modalRef = ref();
const finalWidth = ref('');
const { width } = toRefs(props);
// directive for outside click
const closeModalOnClickOutside = () => {
  if (outsideClick.value) {
    closeModal();
  }
};
const closeModal = () => {
  document.body.classList.remove('overflow-y-hidden');
  emits('close');
};
const onResize = () => {
  if (window.innerWidth >= 911) {
    finalWidth.value = width.value;
  } else {
    finalWidth.value = '';
  }
};
onMounted(() => {
  document.body.classList.add('overflow-y-hidden');
  window.addEventListener('resize', onResize);
  onResize();
});
onUnmounted(() => {
  document.body.classList.remove('overflow-y-hidden');
});
useDetectOutsideClick(modalRef, closeModalOnClickOutside);
</script>
<style lang="scss">
@use './modal.scss';
</style>
