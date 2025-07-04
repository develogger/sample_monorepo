export interface DataType {
  description?: string;
  disabled?: boolean;
  icon?: string;
  id: number | string | undefined;
  title: null | string | undefined;
}

export interface Props {
  afterIcon?: string;
  data: DataType[] | undefined;
  disabled?: boolean;
  helper?: {
    message: string | undefined;
    type: string | undefined;
  };
  loading?: boolean;
  loadingBox?: boolean;
  name: string;
  placeholder?: string;
  value?: DataType;
}

export interface BoxProps {
  data: DataType[] | undefined;
  loading: boolean | undefined;
  parentWidth: number;
  value: DataType;
}
