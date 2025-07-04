import { onBeforeUnmount } from 'vue';

export interface KeyCombos {
  fn: () => void;
  key: string;
}
export const useKeyDown = (keyCombos: KeyCombos[]) => {
  const onKeyDown = (event: KeyboardEvent) => {
    const kc = keyCombos.find(kc => kc.key === event.key);

    if (kc) {
      kc.fn();
    }
  };

  window.addEventListener('keydown', onKeyDown);
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeyDown);
  });
};
