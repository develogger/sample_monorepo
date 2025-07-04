<template>
  <div class="sm:w-full flex justify-end">
    <div class="rtl mb-md md:w-[390px] sm:max-w-full cursor-pointer">
      <ui-skeleton :loading="loading" :width="300" :height="33" radius="xl">
        <div
          class="border sm:w-fit hover:bg-border-divider border-border-divider md:min-w-[300px] rounded-[20px] pr-2xs py-2xs flex items-center"
        >
          <ui-Avatar :src="userId?.avatar" shape="rounded" size="xs" />
          <div class="sm:ml-sm ml-2xs sm:mr-xs mr-2xs flex items-center flex-0 md:flex-1">
            <span class="font-medium text-body-400-b2 whitespace-nowrap mx-xs flex items-center">
              {{ $t('product.show.link') }} <span class="hidden md:block"> : </span>
            </span>
            <span class="sm:font-normal md:block ltr whitespace-pre hidden hover:text-[#0A33FF]">
              {{ fullLink }}
            </span>
          </div>
          <div
            class="flex border border-border-divider border-l-0 border-t-0 border-b-0 border-r-1 sm:mx-xs"
          >
            <UiTooltip :content="$t('_zarin_link.copy')" position="top" class="flex">
              <span
                class="icon-Copy mx-xs cursor-pointer hover:bg-background-hover hover:rounded-circle"
                @click="handleAction('copy')"
              />
            </UiTooltip>
            <UiTooltip :content="$t('_zarin_link.share')" position="top" class="flex">
              <span
                class="icon-Share cursor-pointer mx-xs hover:bg-background-hover hover:rounded-circle"
                @click="handleAction('share')"
              />
            </UiTooltip>
          </div>
        </div>
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
      </ui-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserIdQuery } from '@/composables/user/useUserIdQuery';
import { TerminalFlagEnum } from '@/graphql/graphql';

const { data: userId, loading } = useUserIdQuery();
const t = useI18n();
const config = useRuntimeConfig();
const { $notify } = useNuxtApp();
const showModal = ref(false);
const { activeTerminal } = useTerminalQuery();
const toggleShareModal = () => {
  showModal.value = !showModal.value;
};
const valueOfShareModal = ref();
const handlePersonalLinkModal = () => {
  toggleShareModal();
  valueOfShareModal.value = {
    id: fullLink.value,
    link: fullLink.value,
    html: `<a target="_blank" href="${fullLink.value}">${t('_common.slug.online_payout')}</a>`,
    telegram: `${config.public.telegram_url}${fullLink.value}&text=${t(
      '_common.slug.online_payout'
    )}`,
    whatsapp: `${config.public.whatsapp_url}${fullLink.value}-${t('_common.slug.online_payout')}`,
    qr: `${config.public.qr_url}${fullLink.value}`,
  };
};
const fullLink = computed(() =>
  activeTerminal.value?.flag === TerminalFlagEnum.PersonalLink
    ? `https://${activeTerminal.value?.domain}`
    : `${config.public.short_link}${activeTerminal.value?.domain}`
);
const callbackAction = (type: string) => {
  switch (type) {
    case 'share':
      handlePersonalLinkModal();
      break;
    case 'copy':
      navigator.clipboard.writeText(fullLink.value);
      $notify({
        isRead: false,
        message: t('common.copied'),
        type: 'success',
      });
      break;

    default:
      break;
  }
};
const handleAction = (action: 'copy' | 'share') => {
  callbackAction(action);
  if (action === 'share') {
    showModal.value = true;
  }
};
</script>
<style lang="scss" scoped>
.rtl {
  direction: rtl;
}

.ltr {
  direction: ltr;
}
</style>
