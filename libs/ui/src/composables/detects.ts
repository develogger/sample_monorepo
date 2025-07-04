import { nextTick } from 'process';
import { onBeforeUnmount, onMounted, type Ref } from 'vue';

export function useDetectOutsideClick(component: Ref, callback: () => void) {
  if (!component) return;
  const listener = (event: MouseEvent) => {
    if (event.target !== component.value && event.composedPath().includes(component.value)) {
      return;
    }
    if (typeof callback === 'function') {
      callback();
    }
  };
  onMounted(() => {
    nextTick(() => {
      window.addEventListener('click', listener);
    });
  });
  onBeforeUnmount(() => {
    nextTick(() => {
      window.removeEventListener('click', listener);
    });
  });

  return { listener };
}
