import type { PaginationType } from '@/graphql/graphql';

export type PaginationTypes = {
  last_page?: PaginationType['last_page'];
  total?: PaginationType['total'];
};
