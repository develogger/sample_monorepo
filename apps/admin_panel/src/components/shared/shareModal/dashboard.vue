<template>
  <div class="share-modal">
    <ui-Modal
      :footer-boarder="false"
      :text="$t('product.show.link')"
      close-icon
      class="w-full lib-view lg:max-w-[450px] !max-h-[460px] !min-h-[460px]"
      @close="$emit('close')"
    >
      <template #body>
        <div class="flex flex-col justify-center items-center pt-xl w-full">
          <ui-QrCode :link="qr" />
          <ui-ClipBoard
            class="mt-xl w-full"
            :content="link"
            has-arrow
            @new-tab="externalLink"
            @copy="handleCopy"
          />
        </div>
      </template>
      <template #footer>
        <div class="w-full flex justify-center">
          <div class="flex justify-center items-center">
            <NuxtLink :to="whatsapp" target="_blank">
              <ui-Button type="tertiary" icon="SocialWhatsApp" />
            </NuxtLink>
            <NuxtLink :to="telegram" target="_blank">
              <ui-Button type="tertiary" icon="SocialTelegram" class="mr-xs" />
            </NuxtLink>
            <ui-Divider type="vertical" class="mx-sm" />
            <NuxtLink :to="qr" target="_blank">
              <uiButton :text="$t('auth.qr.download')" before-icon="Download" type="tertiary" />
            </NuxtLink>
          </div>
        </div>
      </template>
    </ui-Modal>
  </div>
</template>
<script lang="ts" setup>
import { toRefs } from 'vue';

export interface Props {
  link?: string;
  codeId?: string | number;
  html?: string;
  telegram?: string;
  whatsapp?: string;
  qr?: string;
}

const props = withDefaults(defineProps<Props>(), {
  link: '',
  codeId: '',
  html: '',
  telegram: '',
  whatsapp: '',
  qr: '',
});
defineEmits(['close']);
const { link } = toRefs(props);
const t = useI18n();
const { $notify } = useNuxtApp();
const externalLink = () => {
  window.open(link.value, '_blank');
};
const handleCopy = () => {
  $notify({
    isRead: false,
    message: t('common.copied'),
    type: 'success',
  });
};
</script>
<style lang="scss" scoped>
.share-modal {
  &__footer {
    @apply p-md;
  }
}
</style>
