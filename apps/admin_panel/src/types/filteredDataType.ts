import { ZarinLinkType } from '@/graphql/graphql';

export interface FilteredDataType extends ZarinLinkType {
  image: string;
  status: string;
}
