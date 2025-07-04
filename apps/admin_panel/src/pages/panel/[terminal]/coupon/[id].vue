<template>
  <div class="w-full">
    <CouponAddHeader />
    <CouponAddMain class="container-lg xl:px-3xl pb-3xl px-md" @change="disableButton = false" />
  </div>
</template>

<script setup lang="ts">
import { CouponStatusEnum, TerminalPermissionEnum } from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';
import { useCouponStore } from '@/stores/couponStore';
import { useCouponMutation } from '@/composables/coupon/useCouponMutation';
import { useCouponQueryById } from '@/composables/coupon/useCouponQueryById';
import { useCouponSchema } from '@/composables/coupon/useCouponSchema';
const terminal = useTerminalStore();
const { $notify } = useNuxtApp();
const couponStore = useCouponStore();
const { convert } = useDate();
const { addCoupon, assingProduct, editCoupon } = useCouponMutation();
const { loading: assignLoading, mutate: assignMutate, onDone: assignDone } = assingProduct();
const { loading: editLoading, mutate: editMutate, onDone: editDone } = editCoupon();
const disableButton = ref(true);
definePageMeta({
  name: 'coupon-add',
  layout: 'terminal',
  middleware: ['permission', 'check-active-terminal'],
  fallbackRoute: '/coupon',
  permission: TerminalPermissionEnum.CouponEdit,
});
const { data, refetch, onResult } = useCouponQueryById();
const t = useI18n();
const route = useRoute();
useHead({
  title:
    route.params.id === 'add'
      ? t('_common.page_title.create_coupon')
      : t('_common.page_title.edit_coupon'),
});
onMounted(async () => {
  await refetch();
  checkStatus();
});
const checkStatus = () => {
  if (route.params.id !== 'add' && data?.value?.status === CouponStatusEnum.Deleted) {
    $notify({
      isRead: false,
      message: t('_coupon.uneditable'),
      type: 'error',
    });

    return router.push('/panel/' + terminal.currentDomain + '/coupon');
  }
};
const { snakeToCamel } = useSnakeToCamel();
const { schema } = useCouponSchema();
const { errors, handleSubmit, meta, resetForm, setFieldError } = useForm({
  validationSchema: schema,
});
type validateType = 'discount_percent' | 'code';

const { loading, mutate, onDone } = addCoupon((input, message, params) => {
  setFieldError(
    snakeToCamel(input) as validateType,
    t('_validation.' + message, { min: params[0], max: params[1] })
  );
});
const router = useRouter();
const formLoading = computed(() => assignLoading.value || editLoading.value);
const onSubmit = handleSubmit(values => {
  const variables = {
    id: (data.value && data.value.id) || undefined,
    terminal_id: terminal.currentTerminal,
    discount_percent: Number(values.discount_percent) || 0,
    max_discount_amount: values.max_switch ? Number(values.maxAmount?.replace(/[^\d]/g, '')) : 0,
    min_amount: values.min_switch ? Number(values.min_amount?.replace(/[^\d]/g, '')) : 0,
    expired_at: values.date_time
      ? values.date
        ? convert(`${values.date} ${values.time}`, 'jYYYY/jM/jD HH:mm', 'YYYY-MM-DD HH:mm')
        : undefined
      : null,
    code: values.code,
    limit: values.use ? values.limit : null,
  };
  // edit state
  if (data.value?.id) {
    editMutate(variables);
  } else {
    mutate(variables);
  }
});
onDone(({ data }) => {
  if (couponStore.product.length > 0) {
    const assignProduct = {
      product_ids: [...couponStore.product],
      id: data.CouponAdd.id,
    };
    assignMutate(assignProduct);
  } else {
    $notify({
      isRead: false,
      message: t('_coupon.success_add'),
      type: 'success',
    });

    return router.push('/panel/' + terminal.currentDomain + '/coupon');
  }
});
editDone(({ data }) => {
  const assignProduct = {
    product_ids: [...couponStore.product],
    id: data.CouponEdit.id,
  };
  assignMutate(assignProduct);
});
assignDone(() => {
  $notify({
    isRead: false,
    message: data.value?.id ? t('_coupon.success_edit') : t('_coupon.success_add'),
    type: 'success',
  });
  resetForm();

  return router.push('/panel/' + terminal.currentDomain + '/coupon');
});
onResult(() => {
  if (_isEmpty(data.value)) {
    loading.value = true;

    return router.push(`/panel/${encodeURIComponent(terminal.currentDomain as string)}/coupon`);
  }
});
provide('form_errors', errors);
provide('form_submit', onSubmit);
provide('form_meta', meta);
provide('form_loading', loading);
provide('form_assing_loading', loading);
provide('form_loading_edit', formLoading);
provide('form_done', onDone);
provide('form_assing_done', assignDone);
provide('disable_button', disableButton);
provide('data', data);
</script>
