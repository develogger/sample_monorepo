import { defineStore } from 'pinia';

export const useExportFieldsStore = defineStore(
  'exportFieldStore',
  () => {
    const sessionFields = ref({
      data: [],
      time: 0,
    });

    return {
      sessionFields,
    };
  },
  {
    persist: {
      paths: ['sessionFields'],
      storage: persistedState.localStorage,
    },
  }
);
