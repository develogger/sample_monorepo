<template>
  <div class="w-full">
    <ZarinLinkAddHeader />
    <ZarinLinkAddMain class="container-lg xl:px-3xl pb-3xl px-md pt-2xl md:pt-0" />
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
import { useZarinLinkPaymentSchema } from '@/composables/zarinlink/useZarinLinkPaymentSchema';
import { useZarinLinkPaymentQueryById } from '@/composables/zarinlink/useZarinLinkQuery';
import { useProductMutation } from '@/composables/product/useProductMutation';
const terminal = useTerminalStore();
const fieldStore = useProductStore();
const { $notify } = useNuxtApp();
const router = useRouter();
const { schema } = useZarinLinkPaymentSchema();
const { errors, handleSubmit, meta, values, setValues, defineInputBinds, setFieldError } = useForm({
  validationSchema: schema,
  initialValues: {
    amount_type: false,
  },
});
const { fields: orderField } = storeToRefs(fieldStore);
const { createZarinLinkMutation, updateZarinLinkMutation } = useZarinLinkMutation();
const { removeProduct } = useProductMutation();
const { data, refetch } = useZarinLinkPaymentQueryById();
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
  mutate: createPaymentLink,
  onDone,
} = createZarinLinkMutation(handleValidationErrors);
const {
  loading: editLoading,
  mutate: editMutate,
  onDone: editDone,
} = updateZarinLinkMutation(handleValidationErrors);
definePageMeta({
  name: 'zarin-link-addPayment',
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
    amount: values.amount ? (values.amount_type ? 0 : +values.amount.replace(/,/g, '')) : 0,
    description: values.description,
    is_coupon_active: false,
    show_receipt: !values.backLinkSuccess,
    required_fields: requiredFields,
    limit: values.entitySwitch ? values.entity : null,
    successful_redirect_url: values.backLinkSuccess || null,
    failed_redirect_url: values.backLinkUnSuccess || null,
    amount_type: values.amount_type ? 'OPTIONAL' : 'FIX',
    type: 'PAYMENT',
  };
  if (data.value && data.value.id) {
    editMutate(variables);
  } else {
    createPaymentLink(variables);
  }
});
editDone(() => {
  handleReset(true);
});
onDone(data => {
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
      message: t('_zarin_link.payment_link.success_edit'),
      type: 'success',
    });
  } else {
    $notify({
      isRead: false,
      message: t('_zarin_link.payment_link.success_add'),
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
provide('form_loading_with_image', false);
provide('form_loading_edit', editLoading);
provide('form_values', reactive(values));
provide('form_set_values', setValues);
provide('form_bind_input', defineInputBinds);
</script>
