import { FilterEnum } from '@/graphql/graphql';

export interface FilterList {
  checked: boolean;
  label: string;
  value: FilterEnum;
}
