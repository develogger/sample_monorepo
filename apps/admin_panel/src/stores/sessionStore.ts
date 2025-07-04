import type { PaginationTypes } from '@/types/paginationTypes';

import { defineStore } from 'pinia';

export const useSessionStore = defineStore('sessionStore', () => {
  const dashboardLoading = ref();
  const data = ref();
  const loading = ref();
  const filter = ref('');
  const refetch = ref();
  const sessionType = ref();
  const pagination: PaginationTypes = reactive({
    last_page: 0,
    total: 0,
  });

  return { dashboardLoading, data, filter, loading, pagination, refetch, sessionType };
});
