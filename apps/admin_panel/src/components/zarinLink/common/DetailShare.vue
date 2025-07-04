<template>
  <ui-Card>
    <template #header>
      <div class="flex justify-between items-center">
        <ui-skeleton :loading="loading" :height="20" :width="100">
          <div class="flex flex-col">
            <span class="text-heading-600-h2">
              {{ $t('_zarin_link.detail.detail_share_title') }}
            </span>
            <span class="text-body-400-b3 text-text-soft">
              {{ $t('_zarin_link.detail.detail_share_description') }}
            </span>
          </div>
        </ui-skeleton>
        <ui-Button
          icon="Share"
          variant="outlined"
          type="neutral"
          size="medium"
          :loading="loading"
          @click="handleShareProductModal"
        />
      </div>
    </template>
    <template #main>
      <div class="mt-xl">
        <ui-InlineMessage
          v-if="!!data?.deleted_at && !loading"
          :title="$t('_zarin_link.detail.detail_share_deactivate_title')"
          :description="$t('_zarin_link.detail.detail_share_deactivate_description')"
        />

        <ui-Skeleton :loading="loading" full-width :height="56">
          <ui-ClipBoard
            class="mt-xl w-full"
            :content="(data?.link + '').replace('https://', '')"
            has-arrow
            @new-tab="externalLink"
            @copy="handleCopy"
          />
        </ui-Skeleton>
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
    </template>
  </ui-Card>
</template>
<script lang="ts" setup>
// refs
import { NewZarinLinkType } from '~/graphql/graphql';

const showModal = ref(false);
const valueOfShareModal = ref();
// injects
const loading = inject('loading');
const data = inject<Ref<NewZarinLinkType> | undefined>('data');
// composable
const config = useRuntimeConfig();
const t = useI18n();
const { $notify } = useNuxtApp();
const route = useRoute();
// utils
const toggleShareModal = () => {
  showModal.value = !showModal.value;
};
const handleShareProductModal = () => {
  const id = route.params.id;
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
const externalLink = () => {
  window.open(data?.value?.link as string, '_blank');
};
const handleCopy = () => {
  $notify({
    isRead: false,
    message: t('common.copied'),
    type: 'success',
  });
};
</script>
