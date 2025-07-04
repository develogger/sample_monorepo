<template>
  <div>
    <SharedLoadingSPALoading v-if="authStore.spaLoading" />
    <div v-else class="root">
      <ui-Topbar ref="topBarRef" class="sticky">
        <template #startSection>
          <LazySharedTopbarTerminalStartSection />
        </template>
        <template #endSection>
          <NuxtLink :to="homeUrl">
            <ui-Logo name="zarinpalFaLight" class="cursor-pointer" />
          </NuxtLink>
        </template>
      </ui-Topbar>
      <SharedShareModalDownloadApp v-model="showDownloadApp" />
      <slot />
      <Teleport to="body">
        <LazySharedToast
          v-for="(item, index) in notificationStore.unreads"
          :key="item.id"
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
                :disabled="authStore.spaLoading"
                type="secondary"
                size="medium"
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
const t = useI18n();
const { nextLogout } = useNextLogout();
const { homeUrl } = useRedirectToHome();
const notificationStore = useNotificationStore();
const authStore = useAuthStore();
const showDownloadApp = ref(true);
const topBarRef = ref();
useHead({
  titleTemplate: title =>
    title ? ` ${t('_common.app_name')} | ${title}` : `${t('_common.app_name')}`,
});
const toggleModal = () => {
  authStore.showLogOut = !authStore.showLogOut;
};
const logOut = async () => {
  await nextLogout();
};
provide('topBarRef', topBarRef);
</script>

<style lang="scss">
@use './default.scss';
</style>
