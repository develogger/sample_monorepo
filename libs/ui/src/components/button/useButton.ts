import { ref } from 'vue';

export interface Props {
  size?: 'large' | 'medium' | 'small';
  type?: 'decretive' | 'light' | 'primary' | 'secondary' | 'tertiary';
  variant?: 'contained' | 'outlined' | 'text';
}

const containedType = (value: Props['type']) => {
  switch (value) {
    case 'primary':
      return 'root__variant--contained--primary';
    case 'light':
      return 'root__variant--contained--light';
    case 'secondary':
      return 'root__variant--contained--secondary';
    case 'tertiary':
      return 'root__variant--contained--tertiary';
    case 'decretive':
      return 'root__variant--contained--decretive';

    default:
      break;
  }

  return null;
};
const variantHandler = (props: Pick<Props, 'type' | 'variant'>) => {
  const { type, variant } = props;
  switch (variant) {
    case 'contained':
      return containedType(type);
    case 'outlined':
      return 'root__variant--outlined';

    default:
      return 'root__variant--default';
  }
};
const sizeHandler = (props: Pick<Props, 'size' | 'variant'>) => {
  const { size, variant } = props;
  switch (size) {
    case 'small':
      if (variant === 'text') {
        return 'text-body-500-b3';
      }

      return 'px-xs py-2xs';
    case 'large':
      if (variant === 'text') {
        return 'text-body-500-b2';
      }

      return 'px-xl py-sm';

    default:
      if (variant === 'text') {
        return 'text-body-500-b3';
      }

      return 'px-sm py-xs';
  }
};
const loadingIndicatorHandler = (value: Props['type'], variant: Props['variant']) => {
  switch (value) {
    case 'primary':
      if (variant === 'outlined') {
        return 'root__loading--outlined';
      }

      return 'root__loading--primary';
    case 'light':
    case 'secondary':
    case 'tertiary':
      return 'root__loading--default';
    case 'decretive':
      return 'root__loading--primary';

    default:
      break;
  }

  return null;
};

export const useButton = (props: Props) => {
  const variantValues = ref<null | string>(null);
  const sizeValue = ref<null | string>(null);
  const loadingIndicator = ref<null | string>(null);

  variantValues.value = variantHandler(props);
  sizeValue.value = sizeHandler(props);
  loadingIndicator.value = loadingIndicatorHandler(props.type, props.variant);

  return { loadingIndicator, size: sizeValue, variant: variantValues };
};
