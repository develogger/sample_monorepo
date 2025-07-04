<template>
  <Ui-Card class="user-card shadow-elevation-100">
    <template #header>
      <div class="flex flex-col items-end">
        <div class="flex justify-between items-center w-full p-xs cursor-auto">
          <ui-ZpBadge :id="userId?.id" :level="userId?.level" class="h-fit" />
          <ui-Avatar v-if="userAvatar" :src="userId?.avatar" has-border size="md" shape="rounded" />
          <ui-Avatar
            v-else
            size="md"
            class-icon="w-md h-md !text-heading-600-h3 flex items-center"
            shape="rounded"
          />
        </div>
        <NuxtLink class="w-full" to="/panel/user">
          <ui-Nav-Link
            class="my-sm"
            :label="userId?.full_name"
            :loading="loading"
            :sub-text="$t('notif_settings.bank_accounts_addresses_notifications')"
          />
        </NuxtLink>
        <ui-Divider class="w-full" />
      </div>
    </template>
    <template #main>
      <div class="my-sm">
        <NuxtLink to="/panel/referral">
          <ui-Nav-Link
            :label="$t('notif_settings.referrer')"
            class="referral-item"
            :arrow="false"
            icon="Referral"
          />
        </NuxtLink>
        <ui-Nav-Link
          class="hidden"
          :label="$t('common.dark_or_light_mode')"
          :arrow="false"
          icon="MoonStar"
        >
          <template #meta>
            <span class="text-text-soft text-caption-400-c1">
              {{ `(${$t('notif_settings.light')})` }}
            </span>
          </template>
        </ui-Nav-Link>
      </div>
      <ui-Divider />
      <div class="my-sm">
        <ui-Nav-Link class="hidden" :label="$t('common.tour_guide')" :arrow="false" icon="Info" />
        <ui-Nav-Link
          :label="$t('notif_settings.previousPanel')"
          :arrow="false"
          icon="SideBarDown"
          @click="toggleShowOldPanelModalAction"
        />
        <ui-Nav-Link
          :label="$t('notif_settings.exit')"
          :arrow="false"
          icon="ExitLogout"
          @click="toggleModal"
        />
      </div>
      <div v-if="store.version" class="p-xs flex justify-center">
        <span class="text-text-soft text-body-400-b3">
          {{ `${$t('_common.modal.version')}: ${store.version}` }}
        </span>
      </div>
    </template>
  </Ui-Card>
  <Teleport to="body">
    <SharedShareModalBackToOldPanel
      v-if="showOldPanelModal"
      @close="toggleShowOldPanelModalAction"
      @redirect="redirectToPreviousPanel"
    />
  </Teleport>
</template>
<script setup lang="ts">
import { useUserIdQuery } from '@/composables/user/useUserIdQuery';
import { useReturnToOldVersionMutation } from '@/composables/useReturnToOldVersionMutation';

const { returnToOldVersionLog } = useReturnToOldVersionMutation();
const { mutate, onDone, onError } = returnToOldVersionLog();
const config = useRuntimeConfig();
const store = useAuthStore();
const userAvatar = ref('');
const showOldPanelModal = ref(false);
const { data: userId, loading, onResult, refetch } = useUserIdQuery();
onResult(() => {
  if (store && store.userAuth) {
    store.userAuth.id = userId.value?.id ?? '';
    store.userAuth.level = userId.value?.level ?? '';
  }
  checkImage();
});
const toggleModal = () => {
  store.showLogOut = !store.showLogOut;
};
const navigationStore = useNavigateStore();
const { windowSize } = useSize();
const checkImage = () => {
  const img = new Image();
  img.src = `${userId.value?.avatar}&d=404`;
  img.onload = () => {
    userAvatar.value = userId.value?.avatar as string;
  };
  img.onerror = () => {
    userAvatar.value = '';
  };
};
const toggleShowOldPanelModalAction = () => {
  showOldPanelModal.value = !showOldPanelModal.value;
};
const redirectToPreviousPanel = (reason: string) => {
  mutate({
    description: reason,
  });
};
const setCookie = () => {
  document.cookie = `nix_redirect=ture; path=/; domain=${window.location.hostname}; secure; samesite=None; max-age=7776000`;
  window.location.replace(config.public.next_panel_link);
};
onError(() => {
  toggleShowOldPanelModalAction();
});
onDone(() => {
  setCookie();
});

onMounted(() => {
  refetch();
});
watch(windowSize, () => {
  navigationStore.setNavigatorState();
});
</script>
<style lang="scss">
.user-card {
  @apply w-[280px] p-xs;
}

.referral-item {
  i {
    @apply rotate-[270deg];
  }
}
</style>
