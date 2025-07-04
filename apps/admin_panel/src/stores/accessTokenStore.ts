import { defineStore } from 'pinia';

export const useAccessTokenStore = defineStore('accessTokenStore', () => {
  const data = ref();
  const loading = ref();
  const filter = ref('');
  const refetch = ref();

  return { data, filter, loading, refetch };
});
