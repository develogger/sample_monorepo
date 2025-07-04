<template>
  <div class="pb-3xl w-full container-xl">
    <CouponBaseHeader />
    <CouponBaseMain />
    <CouponBaseRemove v-if="showModal" :id="uniqId" @close="closeRemoveModal" @done="doneHandler" />
    <CouponBaseRestore
      v-if="showModalRestore"
      :id="uniqId"
      @close="closeRestoreModal"
      @done="doneHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { useCouponQuery } from '../../../../composables/coupon/useCouponQuery';
import { CouponFilterEnum, CouponType, TerminalPermissionEnum } from '@/graphql/graphql';

definePageMeta({
  name: 'coupon',
  layout: 'terminal',
  middleware: ['permission'],
  permission: TerminalPermissionEnum.Coupon,
});
const t = useI18n();
useHead({
  title: t('_common.page_title.coupon'),
});
const route = useRoute();
const config = useRuntimeConfig();
const showModal = ref(false);
const showModalRestore = ref(false);
const uniqId = ref<string>('');
const { refetch, data, loading, pagination } = useCouponQuery();
const handleDeactiveModal = (id: string) => {
  showModal.value = !showModal.value;
  uniqId.value = id;
};
const handleRestoreModal = (id: string) => {
  showModalRestore.value = !showModalRestore.value;
  uniqId.value = id;
};
const callbackAction = (id: CouponType['id'], type: string) => {
  switch (type) {
    case 'active':
      handleRestoreModal(id);
      break;
    case 'inactive':
      handleDeactiveModal(id);
      break;
    default:
      break;
  }
};
const closeRemoveModal = () => {
  showModal.value = false;
};
const closeRestoreModal = () => {
  showModalRestore.value = false;
};
onMounted(() => {
  refetch();
});
const doneHandler = () => {
  closeRemoveModal();
  closeRestoreModal();
  refetch();
};
watch(
  () => route.query,
  () => {
    if (!route.query) {
      return;
    }
    refetch({
      limit: Number(route.query.pageSize) || config.public.pageSize,
      offset:
        (Number(route.query.pageSize) || config.public.pageSize) *
        ((Number(route.query.page) || config.public.page) - 1),
      filter: Object.values(CouponFilterEnum).includes(route.query.status as CouponFilterEnum)
        ? route.query.status
        : undefined,
    });
  }
);
provide('coupon', data);
provide('couponLoading', loading);
provide('couponPagination', pagination);
provide('couponCallback', callbackAction);
provide('toggleModal', handleDeactiveModal);
provide('toggleRestore', handleRestoreModal);
</script>
