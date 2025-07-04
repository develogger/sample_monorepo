import { defineStore } from 'pinia';

export const useCouponStore = defineStore('couponStore', () => {
  const product = ref<string[]>([]);
  const searchText = '';
  const showToggleSelectedProduct = false;
  const assignee = ref<string[]>([]);

  return { assignee, product, searchText, showToggleSelectedProduct };
});
