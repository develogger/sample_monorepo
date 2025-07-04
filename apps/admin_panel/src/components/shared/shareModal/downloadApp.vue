<template>
  <transition class="md:hidden fixed bottom-0 z-50 w-full" name="bottom-sheet">
    <div v-if="modelValue" class="flex items-end justify-center" dir="rtl">
      <div class="w-full transform transition-transform duration-300">
        <div class="flex items-center justify-between py-md px-sm bg-white-100 rounded-t-lg">
          <div class="flex items-center gap-sm">
            <ui-Icon name="Close" @click="closeDownloadAppBanner" />
            <ui-Logo name="zarinpalLogoMark" />
            <div>
              <div class="text-body-400-b3 text-text-soft">
                {{ $t('_helper.downloadApp.closeConnection') }}
              </div>
              <div class="text-body-400-b3">{{ $t('_helper.downloadApp.zarinpalApp') }}</div>
            </div>
          </div>
          <ui-Button :text="$t('_common.buttons.downloadApp')" @click="navigateToAppDownload" />
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts" setup>
interface Props {
  modelValue: boolean;
}

const props = withDefaults(defineProps<Props>(), {});
const { modelValue } = toRefs(props);
const emits = defineEmits(['update:modelValue']);
const config = useRuntimeConfig();
const LOCAL_STORAGE_KEY = 'hideDownloadAppBanner';
const DURATION_MS = 15 * 24 * 60 * 60 * 1000;
const shouldHideBanner = () => {
  const savedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedValue) {
    const expirationTime = parseInt(savedValue, 10);
    if (Date.now() < expirationTime) {
      return true;
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }

  return false;
};

if (shouldHideBanner()) {
  emits('update:modelValue', false);
}

const navigateToAppDownload = () => {
  window.open(`${config.public.zarin_url}application.html`, '_blank');
};
const closeDownloadAppBanner = () => {
  const expirationTime = Date.now() + DURATION_MS;
  localStorage.setItem(LOCAL_STORAGE_KEY, expirationTime.toString());
  emits('update:modelValue', false);
};
</script>
