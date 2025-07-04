import { defineStore } from 'pinia';

export const useReferralStore = defineStore('referralStore', () => {
  const data = ref();

  return { data };
});
