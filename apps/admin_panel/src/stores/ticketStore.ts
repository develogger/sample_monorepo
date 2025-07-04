import type { PaginationTypes } from '@/types/paginationTypes';

import { defineStore } from 'pinia';

export const useTicketStore = defineStore('ticketStore', () => {
  const data = ref();
  const detailsData = ref();
  const detailsLoading = ref();
  const loading = ref();
  const statusFilter = ref<string>('');
  const refetch = ref(() => {});
  const pagination: PaginationTypes = reactive({
    last_page: 0,
    total: 0,
  });

  return { data, detailsData, detailsLoading, loading, pagination, refetch, statusFilter };
});
