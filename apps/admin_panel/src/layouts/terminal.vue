<template>
  <div>
    <SharedLoadingSPALoading v-if="authStore.spaLoading" />
    <div v-else class="root">
      <ui-Topbar ref="topBarRef" end-classes="overflow-hidden">
        <!-- actions -->
        <template #startSection>
          <LazySharedTopbarTerminalStartSection />
        </template>
        <!-- logo & burger menu -->
        <template #endSection>
          <LazySharedTopbarTerminalEndSection />
        </template>
      </ui-Topbar>
      <div class="terminal-layout flex-row-reverse">
        <SharedShareModalWelcome
          v-if="authStore.isFirstTime && route.name === 'dashboard'"
          @close="handleClose"
        />
        <SharedShareModalChangeLog
          v-else-if="showChangeLog && !authStore.tourActive"
          :data="data"
          @close="handleCloseLog"
        />
        <SharedShareModalDownloadApp v-else v-model="showDownloadApp" />
        <!-- navbar terminals menu -->
        <LazySharedNavbarMainMenu />
        <slot />
      </div>
      <Teleport to="body">
        <LazySharedToast
          v-for="(item, index) in notificationStore.unreads"
          :key="item"
          :data="item"
          :index="index"
        />
      </Teleport>
      <div v-if="authStore.showLogOut">
        <ui-Modal
          ref="filterRef"
          :text="$t('notif_settings.logoutModal.title')"
          close-icon
          header
          width="480px"
          @close="toggleModal"
        >
          <template #body>
            <div class="p-md text-body-400-b2 text-text">
              {{ $t('notif_settings.logoutModal.text') }}
            </div>
          </template>
          <template #leftFooter>
            <div class="flex gap-xs">
              <ui-Button
                type="secondary"
                size="medium"
                :disabled="authStore.spaLoading"
                :text="$t('common.cancel')"
                @click="toggleModal"
              />
              <ui-Button
                :loading="authStore.spaLoading"
                :disabled="authStore.spaLoading"
                type="decretive"
                size="medium"
                :text="$t('common.yes')"
                @click="logOut"
              />
            </div>
          </template>
        </ui-Modal>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { nextLogout } = useNextLogout();
const t = useI18n();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();
const showDownloadApp = ref(true);
const route = useRoute();
const topBarRef = ref();
const showChangeLog = ref(false);
const { data, onResult } = useReleaseNoteQuery();
onResult(() => {
  if (data.value?.version) {
    if (authStore.version !== data.value.version) {
      showChangeLog.value = true;
    }
  }
});
const handleCloseLog = () => {
  if (data.value) {
    authStore.version = data.value.version as string;
  }
  showChangeLog.value = false;
};
useHead({
  titleTemplate: title =>
    title ? ` ${t('_common.app_name')} | ${title}` : `${t('_common.app_name')}`,
});
const store = useTerminalStore();
store.logoVersion = new Date().getTime();
const handleClose = () => {
  authStore.isFirstTime = false;
};
const toggleModal = () => {
  authStore.showLogOut = !authStore.showLogOut;
};
const logOut = async () => {
  await nextLogout();
};
tour?.on('inactive', () => {
  authStore.tourActive = false;
});
provide('topBarRef', topBarRef);
</script>

<style lang="scss">
@use './default.scss';
.shepherd-element {
  z-index: 10000010;
}
.shepherd-modal-overlay-container {
  z-index: 10000000;
}
.terminal-layout {
  @apply flex justify-between;
}
.rtl-tour {
  direction: rtl !important;
}
.shepherd-title {
  color: #ffff;
  @apply text-heading-600-h1;
}
.shepherd-cancel-icon {
  color: #ffff !important;
}
.shepherd-arrow::before {
  background-color: #0a33ff !important;
}
.shepherd-header {
  background-color: #0a33ff !important;
  color: #ffff;
  @apply border-0;
}
.shepherd-text {
  @apply text-body-400-b2 text-text-onPrimary;
}
</style>
