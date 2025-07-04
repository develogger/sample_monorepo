import { computed, type Ref, toValue } from 'vue';

const background = (type: string) => {
  switch (type) {
    case 'neutral':
      return 'status-root__type--neutral';
    case 'informative':
      return 'status-root__type--informative';
    case 'warning':
      return 'status-root__type--warning';
    case 'negative':
      return 'status-root__type--negative';
    case 'positive':
      return 'status-root__type--positive';
    case 'primary':
      return 'status-root__type--primary';

    default:
      return null;
  }
};
const color = (type: string) => {
  switch (type) {
    case 'neutral':
      return 'status-root__color--neutral';
    case 'informative':
      return 'status-root__color--informative';
    case 'warning':
      return 'status-root__color--warning';
    case 'negative':
      return 'status-root__color--negative';
    case 'positive':
      return 'status-root__color--positive';

    default:
      return null;
  }
};
const icon = (type: string) => {
  switch (type) {
    case 'neutral':
      return 'status-root__icon--neutral';
    case 'informative':
      return 'status-root__icon--informative';
    case 'warning':
      return 'status-root__icon--warning';
    case 'negative':
      return 'status-root__icon--negative';
    case 'positive':
      return 'status-root__icon--positive';

    default:
      return null;
  }
};
const dot = (type: string) => {
  switch (type) {
    case 'neutral':
      return 'status-root__dot--positive';
    case 'informative':
      return 'status-root__dot--positive';
    case 'warning':
      return 'status-root__dot--positive';
    case 'negative':
      return 'status-root__dot--positive';
    case 'positive':
      return 'status-root__dot--positive';

    default:
      return null;
  }
};

export const useStatus = (type: Ref<string>) => {
  const backgroundClass = computed(() => background(toValue(type)));
  const colorClass = computed(() => color(toValue(type)));
  const iconClass = computed(() => icon(toValue(type)));
  const dotClass = computed(() => dot(toValue(type)));

  return {
    backgroundClass,
    colorClass,
    dotClass,
    iconClass,
    type,
  };
};
