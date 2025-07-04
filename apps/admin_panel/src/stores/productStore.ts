import { useProductDetails } from '@/composables/product/useProductDetails';
import {
  ZarinLinkRequiredFieldsInputEnum as InputEnum,
  ZarinLinkRequiredFieldsStatusEnum as StatusEnum,
} from '@/graphql/graphql';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface ItemType {
  label: string;
  name: InputEnum;
  type: StatusEnum;
  value: boolean;
}
export const useProductStore = defineStore('productStore', () => {
  const { fieldItems } = useProductDetails();
  const items = fieldItems();
  const fields = ref([...items]);
  const image = ref('');
  const updated = ref(false);
  const isFormDirty = ref();
  function $reset(item: ItemType[]) {
    image.value = '';
    fields.value = [...item];
  }

  return { $reset, fields, image, isFormDirty, updated };
});
