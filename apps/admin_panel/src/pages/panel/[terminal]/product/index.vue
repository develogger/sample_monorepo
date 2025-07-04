<template>
  <div class="pb-3xl w-full container-xl">
    <ProductBaseHeader />
    <ProductBaseMain />
    <SharedShareModalConfirm
      v-if="showConfirm"
      cancel-label="_common.buttons.cancel"
      submit-label="_common.buttons.accept"
      :description="
        selectedProduct.type === 'active'
          ? '_common.modal.product_active'
          : '_common.modal.product_disable'
      "
      :loading="restoreLoading || removeLoading"
      @close="closeConfirm"
      @confirm="handleConfirm"
      @cancel="closeConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { TerminalPermissionEnum, ZarinLinkFilterEnum, ZarinLinkType } from '@/graphql/graphql';
import { useProductMutation } from '@/composables/product/useProductMutation';

definePageMeta({
  name: 'product',
  layout: 'terminal',
  middleware: ['permission'],
  permission: TerminalPermissionEnum.Product,
});
const t = useI18n();
useHead({
  title: t('_common.page_title.product'),
});
const { $notify } = useNuxtApp();
const showConfirm = ref();
const route = useRoute();
const config = useRuntimeConfig();
const selectedProduct = ref({
  id: '',
  type: '',
});
const { restoreProduct, removeProduct } = useProductMutation();
const { mutate: restoreMutate, onDone: restoreOnDone, loading: restoreLoading } = restoreProduct();
const { mutate: removeMutate, onDone: removeOnDone, loading: removeLoading } = removeProduct();
const { refetch, data, loading, pagination } = useProductQuery();
const handleConfirm = () => {
  if (selectedProduct.value.type === 'active') {
    restoreMutate({ id: selectedProduct.value.id });
  } else {
    removeMutate({ id: selectedProduct.value.id });
  }
};
const handleShowConfirm = (id: ZarinLinkType['id'], type: string) => {
  showConfirm.value = true;
  selectedProduct.value.id = id;
  selectedProduct.value.type = type;
};
const closeConfirm = () => {
  showConfirm.value = false;
  selectedProduct.value = {
    id: '',
    type: '',
  };
};
const callbackAction = (id: ZarinLinkType['id'], type: string) => {
  switch (type) {
    case 'active':
      handleShowConfirm(id, type);
      break;
    case 'inactive':
      handleShowConfirm(id, type);
      break;
    case 'copy':
      navigator.clipboard.writeText(config.public.short_link + id);
      $notify({
        isRead: false,
        message: t('common.copied'),
        type: 'success',
      });
      break;

    default:
      break;
  }

  restoreOnDone(() => {
    $notify({
      isRead: false,
      message: t('common.success'),
      type: 'success',
    });
    closeConfirm();
    refetch();
  });
  removeOnDone(() => {
    $notify({
      isRead: false,
      message: t('common.success'),
      type: 'success',
    });
    closeConfirm();
    refetch();
  });
};
onMounted(() => {
  refetch();
});
watch(
  () => route.query,
  () => {
    refetch({
      limit: Number(route.query.pageSize) || config.public.pageSize,
      offset:
        (Number(route.query.pageSize) || config.public.pageSize) *
        ((Number(route.query.page) || config.public.page) - 1),
      filter: Object.values(ZarinLinkFilterEnum).includes(route.query.status as ZarinLinkFilterEnum)
        ? route.query.status
        : undefined,
      min_amount: Number(route.query.moreAmount) || undefined,
      max_amount: Number(route.query.lessAmount) || undefined,
      amount: (route.query.equalAmount && +route.query.equalAmount) || undefined,
      failed_redirect_url: route.query.failed_redirect_url || undefined,
      successful_redirect_url: route.query.successful_redirect_url || undefined,
      title: route.query.title || undefined,
      description: route.query.description || undefined,
      id: route.query.productId || undefined,
    });
  }
);
provide('product', data);
provide('productLoading', loading);
provide('productPagination', pagination);
provide('productCallbackAction', callbackAction);
</script>
