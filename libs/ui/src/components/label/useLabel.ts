import { ref } from 'vue';

export interface Props {
  size?: 'medium' | 'small';
  type?: 'informative' | 'negative' | 'neutral' | 'outlined' | 'positive' | 'primary' | 'warning';
}

const typeHandler = (value: Props['type']) => {
  switch (value) {
    case 'informative':
      return 'lable-container--informative';

    case 'negative':
      return 'lable-container--negative';

    case 'outlined':
      return 'lable-container--outlined';
    case 'positive':
      return 'lable-container--positive';
    case 'primary':
      return 'lable-container--primary';
    case 'warning':
      return 'lable-container--warning';

    default:
      return 'lable-container--neutral';
  }
};
const sizeHandler = (value: Props['size']) => {
  switch (value) {
    case 'medium':
      return 'lable-container--medium';

    default:
      return 'lable-container--small';
  }
};
export const useLabel = (type: Props['type'], size: Props['size']) => {
  const typeValues = ref<string>('lable-container--neutral');
  const sizeValue = ref<string>('lable-container--small');
  sizeValue.value = sizeHandler(size);
  typeValues.value = typeHandler(type);

  return { size: sizeValue, type: typeValues };
};
