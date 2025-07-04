import { computed, type Slots, toValue } from 'vue';

const rootClass = (slots: Slots) => {
  const { action, backroll } = slots;
  if (backroll && action) {
    return 'root--default';
  }

  if (!backroll && action) {
    return 'root--without-backroll';
  }

  if (backroll && !action) {
    return 'root--without-action';
  }

  if (!backroll && !action) {
    return 'root--without-all';
  }
};
const backrollClass = (slots: Slots) => {
  const { action } = slots;
  if (action) {
    return 'root__backroll--default';
  }

  return 'root__backroll--without-action';
};
const contentClass = (slots: Slots) => {
  const { action, backroll } = slots;
  if (backroll && action) {
    return 'root__content--default';
  }

  if (!backroll && action) {
    return 'root__content--without-backroll';
  }

  if (backroll && !action) {
    return 'root__content--without-action';
  }
  if (!backroll && !action) {
    return 'root__content--without-all';
  }

  return null;
};
export const usePageHeading = (slots: Slots) => {
  const backroll = computed(() => backrollClass(slots));
  const content = computed(() => contentClass(slots));
  const root = computed(() => rootClass(slots));

  return {
    backroll: toValue(backroll),
    content: toValue(content),
    root: toValue(root),
  };
};
