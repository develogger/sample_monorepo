import { TAB } from '@/composables/dateFilter/useDateFilterColumn';
import { defineStore } from 'pinia';

export const useFilterStore = defineStore('couponStore', () => {
  const dateFilterTab = ref<TAB>();
  const dateFilterVal = ref<string>();

  return { dateFilterTab, dateFilterVal };
});
