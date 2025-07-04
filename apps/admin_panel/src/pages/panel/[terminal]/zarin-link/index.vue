<template>
  <div class="pb-3xl w-full container-xl">
    <ZarinLinkBaseHeader />
    <ZarinLinkBaseMain />
    <SharedShareModalConfirm
      v-if="showConfirm"
      cancel-label="_common.buttons.cancel"
      submit-label="_common.buttons.accept"
      :description="
        selectedZarinLink.type === 'active'
          ? '_common.modal.zarin_link_active'
          : '_common.modal.zarin_link_disable'
      "
      :loading="restoreLoading || removeLoading"
      @close="closeConfirm"
      @confirm="handleConfirm"
      @cancel="closeConfirm"
    />
    <SharedShareModalZarinLink
      v-if="showModal"
      label-tab="_zarin_link.payment_link.share_label-tab"
      label-code-id="_zarin_link.payment_link.share_label-codeId"
      :link="valueOfShareModal.link"
      :html="valueOfShareModal.html"
      :telegram="valueOfShareModal.telegram"
      :whatsapp="valueOfShareModal.whatsapp"
      :qr="valueOfShareModal.qr"
      :code-id="valueOfShareModal.id"
      @close="toggleShareModal"
    />
  </div>
</template>

<script setup lang="ts">
import { TerminalPermissionEnum, ZarinLinkFilterEnum, ZarinLinkType } from '@/graphql/graphql';
import { useZarinLinkListQuery } from '@/composables/zarinlink/useZarinLinkQuery';
import { useProductMutation } from '@/composables/product/useProductMutation';

definePageMeta({
  name: 'zarin-link',
  layout: 'terminal',
  middleware: ['permission'],
  permission: TerminalPermissionEnum.Zarinlink,
});
const t = useI18n();
useHead({
  title: t('_common.links.zarin_link'),
});
const { $notify } = useNuxtApp();
const showConfirm = ref();
const route = useRoute();
const config = useRuntimeConfig();
const showModal = ref(false);
const selectedZarinLink = ref({
  id: '',
  type: '',
});
const { restoreProduct, removeProduct } = useProductMutation();
const { mutate: restoreMutate, onDone: restoreOnDone, loading: restoreLoading } = restoreProduct();
const { mutate: removeMutate, onDone: removeOnDone, loading: removeLoading } = removeProduct();
const { refetch, data, loading, pagination } = useZarinLinkListQuery();
const toggleShareModal = () => {
  showModal.value = !showModal.value;
};
const valueOfShareModal = ref();
const handleConfirm = () => {
  if (selectedZarinLink.value.type === 'active') {
    restoreMutate({ id: selectedZarinLink.value.id });
  } else {
    removeMutate({ id: selectedZarinLink.value.id });
  }
};
const handleShareProductModal = (id: string | number) => {
  toggleShareModal();
  valueOfShareModal.value = {
    id: config.public.short_link + id,
    link: config.public.short_link + id,
    html: `<a target="_blank" href="${config.public.short_link}${id}">${t(
      '_common.slug.online_payout'
    )}</a>`,
    telegram: `${config.public.telegram_url}${config.public.short_link + id}&text=${t(
      '_common.slug.online_payout'
    )}`,
    whatsapp: `${config.public.whatsapp_url}${config.public.short_link + id} - ${t(
      '_common.slug.online_payout'
    )}`,
    qr: `${config.public.qr_url}${config.public.short_link + id}`,
  };
};
const handleShowConfirm = (id: ZarinLinkType['id'], type: string) => {
  showConfirm.value = true;
  selectedZarinLink.value.id = id;
  selectedZarinLink.value.type = type;
};
const closeConfirm = () => {
  showConfirm.value = false;
  selectedZarinLink.value = {
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
    case 'share':
      handleShareProductModal(id);
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
      min_amount: Number(route.query.moreAmount) || undefined,
      max_amount: Number(route.query.lessAmount) || undefined,
      amount: route?.query?.equalAmount ? +route?.query?.equalAmount : undefined,
      failed_redirect_url: route.query.failed_redirect_url || undefined,
      successful_redirect_url: route.query.successful_redirect_url || undefined,
      title: route.query.title || undefined,
      description: route.query.description || undefined,
      id: route.query.zarinLinkId || undefined,
      type: route.query.type || undefined,
      filter: Object.values(ZarinLinkFilterEnum).includes(route.query.status as ZarinLinkFilterEnum)
        ? route.query.status
        : undefined,
    });
  }
);
provide('zarinLinks', data);
provide('zarinLinksLoading', loading);
provide('zarinLinksPagination', pagination);
provide('zarinLinkCallbackAction', callbackAction);
</script>
