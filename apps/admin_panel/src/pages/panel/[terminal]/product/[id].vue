<template>
  <div class="w-full">
    <ProductAddHeader />
    <ProductAddMain class="container-lg xl:px-3xl pb-3xl px-md" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {
  ZarinLinkRequiredFieldsStatusEnum as StatusEnum,
  TerminalPermissionEnum,
  UserLevelEnum,
} from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';
import { useProductStore } from '@/stores/productStore';
import { useProductQueryById } from '@/composables/product/useProductQueryById';
import { useProductMutation } from '@/composables/product/useProductMutation';
import { useProductSchema } from '@/composables/product/useProductSchema';
import { useProductDetails } from '@/composables/product/useProductDetails';
const terminal = useTerminalStore();
const fieldStore = useProductStore();
const { $notify } = useNuxtApp();
const router = useRouter();
const { fields: orderField, image: imageStore } = storeToRefs(fieldStore);
const { addProduct, addProductImage, editProduct, removeProduct } = useProductMutation();
const { data, refetch } = useProductQueryById();
const { loading, mutate, onDone } = addProduct();
const { loading: editLoading, mutate: editMutate, onDone: editDone } = editProduct();
const { mutate: removeMutate, onDone: removeDone } = removeProduct();
const { mutate: mutateImage, loading: imageLoading } = addProductImage();
definePageMeta({
  name: 'product-add',
  layout: 'terminal',
  middleware: ['permission', 'check-active-terminal'],
  fallbackRoute: '/product',
  permission: TerminalPermissionEnum.ProductEdit,
});
const t = useI18n();
const route = useRoute();
useHead({
  title: t('_common.buttons.create_product'),
});
const { schema } = useProductSchema();
const store = useAuthStore();
const { errors, handleSubmit, meta, values, setValues, defineInputBinds } = useForm({
  validationSchema: schema,
});
const { fieldItems } = useProductDetails();
const items = fieldItems();
const link = ref(false);
const onSubmit = handleSubmit(values => {
  link.value = !!values.link;
  const requiredFields = toRaw(toValue(orderField.value)).map(i => ({
    input: i.name,
    status: i.value ? i.type : StatusEnum.Hidden,
    placeholder: i.label,
  }));
  const variables = {
    id: data.value?.id || undefined,
    terminal_id: terminal.currentTerminal,
    title: values.title,
    amount: +values.amount.replace(/,/g, ''),
    description: values.description,
    is_coupon_active: !!(values.coupon || values.coupon === undefined),
    show_receipt: !!values.backLinkSuccess,
    required_fields: requiredFields,
    limit: values.entitySwitch ? values.entity : null,
    successful_redirect_url: values.backLinkSuccess,
    failed_redirect_url: values.backLinkUnSuccess,
  };
  if (data.value && data.value.id) {
    editMutate(variables);
  } else {
    mutate(variables);
  }
});
editDone(async data => {
  if (imageStore.value) {
    await mutateImage({
      product_id: data.data.ZarinLinkEdit.id,
      images: [imageStore.value],
    });
  }
  handleReset(true);
});
onDone(async data => {
  if (imageStore.value) {
    await mutateImage({
      product_id: data.data.ZarinLinkAdd.id,
      images: [imageStore.value],
    });
  }
  if (data.data.ZarinLinkAdd.id && !link.value) {
    removeMutate({
      id: data.data.ZarinLinkAdd.id,
    });
  } else {
    handleReset();
  }
});
removeDone(() => {
  handleReset();
});
const handleReset = (editMode?: boolean) => {
  fieldStore.$reset(items);
  if (editMode) {
    $notify({
      isRead: false,
      message: t('_product.success_edit'),
      type: 'success',
    });
  } else {
    $notify({
      isRead: false,
      message: t('_product.success_add'),
      type: 'success',
    });
  }
  router.push({ path: '/panel/' + terminal.currentDomain + '/product', query: { ...route.query } });
};
const hasLevel = computed(() => {
  const userLevel = store.userAuth?.level as UserLevelEnum;
  const basicLevels = [UserLevelEnum.Basic, UserLevelEnum.Blue, UserLevelEnum.New];

  return !basicLevels.includes(userLevel);
});
const checkLevel = () => {
  if (!hasLevel.value) {
    $notify({
      isRead: false,
      message: t('_common.permission.not_access_this_page'),
      type: 'error',
    });

    return router.push('/panel/' + terminal.currentDomain + '/product');
  }
};
onMounted(async () => {
  checkLevel();
  await fieldStore.$reset(items);
  await refetch();
});
provide('form_errors', errors);
provide('form_submit', onSubmit);
provide('form_meta', meta);
provide('form_loading', loading);
provide('form_loading_with_image', imageLoading);
provide('form_loading_edit', editLoading);
provide('form_values', values);
provide('form_set_values', setValues);
provide('form_bind_input', defineInputBinds);
</script>
