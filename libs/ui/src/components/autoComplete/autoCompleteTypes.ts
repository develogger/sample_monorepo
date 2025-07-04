import type { Ref } from 'vue';

export interface DataType {
  description?: string;
  disabled?: boolean;
  icon?: string;
  id: number | string | undefined;
  logo?: string;
  title: null | string | undefined;
}

export interface BoxProps {
  computedSlots: boolean;
  data: DataType[] | undefined;
  externalSearch: boolean;
  hasSearch?: boolean;
  loading: boolean | undefined;
  parentWidth: Ref<number>;
  placeholder?: string;
  show?: Ref<boolean>;
  value: {
    id: number | string;
    title: string;
  };
}

export interface Props {
  afterIcon?: string;
  data: DataType[] | undefined;
  disabled?: boolean;
  hasSearch?: boolean;
  helper?: {
    message: string | undefined;
    type: string | undefined;
  };
  label?: boolean;
  loading?: boolean;
  loadingBox?: boolean;
  name: string;
  placeholder?: string;
  searchPlaceholder?: string;
  type?: string;
  value?: DataType;
}
