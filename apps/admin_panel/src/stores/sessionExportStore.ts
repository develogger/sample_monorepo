import type { PaginationTypes } from '@/types/paginationTypes';

import { defineStore } from 'pinia';

export const useSessionExportStore = defineStore('sessionExportStore', () => {
  const data = ref();
  const loading = ref();
  const filter = ref('');
  const refetch = ref();
  const pagination: PaginationTypes = reactive({
    last_page: 0,
    total: 0,
  });

  return { data, filter, loading, pagination, refetch };
});
