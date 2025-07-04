<template>
  <div class="w-full">
    <ZarinLinkSubscriptionAddHeader />
    <ZarinLinkSubscriptionAddMain class="container-lg xl:px-3xl pb-3xl px-md pt-2xl md:pt-0" />
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
import { useZarinLinkMutation } from '@/composables/zarinlink/useZarinLinkMutation';
import { useProductDetails } from '@/composables/product/useProductDetails';
import { useZarinLinkSubscriptionQueryById } from '@/composables/zarinlink/useZarinLinkQuery';
import { useProductMutation } from '@/composables/product/useProductMutation';
const terminal = useTerminalStore();
const fieldStore = useProductStore();
const { $notify } = useNuxtApp();
const router = useRouter();
const { schema } = useZarinLinkDonateSchema();
const { errors, handleSubmit, meta, values, setValues, defineInputBinds, setFieldError } = useForm({
  validationSchema: schema,
});
const { createZarinLinkMutation, updateZarinLinkMutation } = useZarinLinkMutation();
const { fields: orderField, image: imageStore } = storeToRefs(fieldStore);
const { addProductImage, removeProduct } = useProductMutation();
const { data, refetch } = useZarinLinkSubscriptionQueryById();
const { mutate: removeMutate, onDone: removeDone } = removeProduct();
function handleValidationErrors(input: string, message: string) {
  if (input.includes('.')) {
    const extractInput = input.split('.');
    setFieldError(extractInput[extractInput.length - 1] as keyof typeof values, message);
  } else {
    setFieldError(input as keyof typeof values, message);
  }
}
const {
  loading,
  mutate: createSubscriptionLink,
  onDone,
} = createZarinLinkMutation(handleValidationErrors);
const {
  loading: editLoading,
  mutate: editMutate,
  onDone: editDone,
} = updateZarinLinkMutation(handleValidationErrors);
const { mutate: mutateImage, loading: imageLoading } = addProductImage();
definePageMeta({
  name: 'zarin-link-addSubscription',
  layout: 'terminal',
  middleware: ['permission', 'check-active-terminal'],
  fallbackRoute: '/zarin-link',
  permission: TerminalPermissionEnum.ZarinlinkEdit,
});
const t = useI18n();
const route = useRoute();
useHead({
  title: t('_common.buttons.payment_link_create_button'),
});

const store = useAuthStore();
const { fieldItems } = useProductDetails();
const items = fieldItems();
const link = ref(false);
const onSubmit = handleSubmit(valuesForm => {
  link.value = !!valuesForm.link;
  const requiredFields = toRaw(toValue(orderField.value)).map(i => ({
    input: i.name,
    status: i.value ? i.type : StatusEnum.Hidden,
    placeholder: i.label,
  }));
  const specifications = values.specifications?.map((i: { key: string; value: string }) => ({
    key: i.key,
    value: i.value,
  }));
  const targetAmount = valuesForm.target_amount
    ? +valuesForm.target_amount.replace(/,/g, '')
    : undefined;
  const amount = valuesForm.amount
    ? valuesForm.amount_type
      ? 0
      : +valuesForm.amount.replace(/,/g, '')
    : 0;
  const variables = {
    id: data.value?.id || undefined,
    terminal_id: terminal.currentTerminal,
    title: valuesForm.title,
    amount,
    description: valuesForm.description,
    is_coupon_active: false,
    show_receipt: !valuesForm.backLinkSuccess,
    required_fields: requiredFields,
    limit: valuesForm.entitySwitch ? valuesForm.entity : null,
    successful_redirect_url: values.backLinkSuccess || null,
    failed_redirect_url: values.backLinkUnSuccess || null,
    amount_type: valuesForm.amount_type ? 'OPTIONAL' : 'FIX',
    type: 'SUBSCRIPTION',
    specifications: values?.spec ? specifications : [],
    category_id: values?.category_id ? +values?.category_id : undefined,
    meta_data: {
      target_amount: targetAmount,
    },
  };
  if (valuesForm.target_amount_type && amount > (targetAmount || 0)) {
    return $notify({
      isRead: false,
      message: t('_zarin_link.subscription_link.amount_and_target_amount_validation'),
      type: 'error',
    });
  }
  if (data.value && data.value.id) {
    editMutate(variables);
  } else {
    createSubscriptionLink(variables);
  }
});
editDone(async () => {
  if (imageStore.value) {
    await mutateImage({
      product_id: data.value?.id,
      images: [imageStore.value],
    });
  }
  handleReset(true);
});
onDone(async data => {
  if (imageStore.value) {
    await mutateImage({
      product_id: data.data.NewZarinLinkAdd.id,
      images: [imageStore.value],
    });
  }
  if (data.data.NewZarinLinkAdd.id && !link.value) {
    removeMutate({
      id: data.data.NewZarinLinkAdd.id,
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
      message: t('_zarin_link.subscription_link.success_edit'),
      type: 'success',
    });
  } else {
    $notify({
      isRead: false,
      message: t('_zarin_link.subscription_link.success_add'),
      type: 'success',
    });
  }
  router.push({
    path: '/panel/' + terminal.currentDomain + '/zarin-link',
    query: { ...route.query },
  });
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

    return router.push('/panel/' + terminal.currentDomain + '/zarin-link');
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
provide('form_values', reactive(values));
provide('form_set_values', setValues);
provide('form_bind_input', defineInputBinds);
</script>
