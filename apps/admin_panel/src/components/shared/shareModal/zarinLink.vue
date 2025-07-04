<template>
  <div class="share-modal">
    <ui-Modal
      :header-boarder="false"
      :footer-boarder="false"
      :text="$t('_common.slug.share')"
      close-icon
      class="w-full lib-view lg:max-w-[450px] !max-h-[480px] !min-h-[460px]"
      @close="$emit('close')"
    >
      <template #body>
        <ui-Tab v-model="tab" has-border :items="tabs" align="start" class="-mx-md px-2xs -mt-md" />
        <div v-if="tab === '1'" class="flex flex-col justify-center items-center pt-xl w-full">
          <ui-QrCode :link="qr" @copy="handleCopy" />
          <ui-ClipBoard
            class="mt-xl w-full"
            :content="link"
            has-arrow
            @new-tab="externalLink"
            @copy="handleCopy"
          />
        </div>
        <div v-else class="flex flex-col justify-start items-center pt-xl w-full">
          <ui-ClipBoard
            :title="$t(labelCodeId)"
            class="w-full"
            :content="codeId"
            @copy="handleCopy"
          />
          <ui-ClipBoard
            :title="t('referrer.zarinLink.showEmbeddedCode.htmlCodeLabel')"
            class="mt-lg w-full"
            :content="html"
            @copy="handleCopy"
          />
          <ui-ClipBoard title="BBCode" class="mt-lg w-full" :content="bbCode" @copy="handleCopy" />
        </div>
      </template>
      <template v-if="tab === '1'" #footer>
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
  labelCodeId: string;
  labelTab: string;
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
  labelCodeId: '',
  labelTab: '',
});
defineEmits(['close']);
const t = useI18n();
const { link, codeId, labelCodeId, labelTab } = toRefs(props);
const bbCode = ref(`[url="${codeId.value}"]${t('_common.slug.online_payout')}[/url]`);
const { $notify } = useNuxtApp();
const tabs = [
  {
    label: t(labelTab.value),
    value: '1',
  },
  {
    label: t('_common.modal.more'),
    value: '2',
  },
];
const tab = ref('1');
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
