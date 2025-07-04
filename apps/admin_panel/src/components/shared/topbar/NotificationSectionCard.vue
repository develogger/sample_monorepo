<template>
  <ui-Card class="shadow-elevation-100 w-[360px] !pt-0">
    <template #header>
      <div class="relative">
        <ui-Tab v-model="activeTab" :items="tabs" has-border class="-mx-md" @click="checkBadge" />
        <ui-Button
          v-if="activeTab === '2' && hasArchiveAnnouncements"
          :text="$t('_common.buttons.read_all')"
          variant="text"
          class="absolute top-[15px]"
          before-icon="DoubleTick"
          @click="addArchive(undefined, 'all')"
        />
      </div>
    </template>
    <template #main>
      <div
        v-if="activeTab === '1'"
        ref="contentEl"
        class="max-h-[480px] overflow-y-auto -mx-md"
        dir="rtl"
      >
        <div v-if="!notifications?.length" class="flex flex-col items-center gap-xl py-xl">
          <ui-EmptyState
            :title="$t('_common.empty.notifications.title')"
            :description="$t('_common.empty.notifications.caption')"
            vector="EmptyNotification"
          />
        </div>
        <div v-else class="notification pt-sm px-md" dir="ltr">
          <div
            v-for="(item, index) in notifications"
            :key="item.id"
            class="flex flex-col items-end gap-sm w-full"
          >
            <div class="flex items-center flex-row-reverse gap-xs">
              <div class="flex flex-col items-center">
                <ui-Icon name="NotificationChannel" />
              </div>
              <div class="text-body-400-b2 pt-2xs">
                {{ item.title }}
              </div>
            </div>
            <div
              dir="rtl"
              class="text-body-400-b3 text-text-soft break-word"
              v-html="item.body"
            ></div>
            <ui-Divider v-if="index !== notifications.length - 1" class="w-full my-md" />
          </div>
        </div>
      </div>
      <div v-else ref="contentEl" class="max-h-[480px] overflow-y-auto -mx-md" dir="rtl">
        <div v-if="announcements?.length" class="notification pt-sm px-md" dir="ltr">
          <div
            v-for="(item, index) in announcements"
            :key="item.id"
            class="notification__item"
            :class="item.isArchive ? 'opacity-80' : ''"
          >
            <div class="flex flex-col items-center">
              <ui-Icon name="NotificationChannel" />
              <span v-if="!item.isArchive" class="w-xs h-xs rounded-circle bg-primary mt-[20px]" />
            </div>
            <div class="flex gap-xs flex-col">
              <div class="text-body-400-b2" dir="rtl">
                {{ item.title }}
              </div>
              <div class="text-body-400-b3 text-text-soft mt-xs" dir="rtl">
                {{ item.message }}
              </div>
              <div v-if="item.url" class="flex justify-end">
                <ui-Button
                  :text="item.url_title"
                  before-icon="ArrowTopLeft"
                  variant="text"
                  @click="onChangeRoute(item.url)"
                />
              </div>
              <div class="flex justify-between flex-row-reverse mt-sm">
                <span dir="rtl" class="text-text-soft text-body-400-b3">
                  {{ toJalali(item.created_at, 'jDD jMMMM jYYYY', 'jDD jMMMM', '', '') }}
                </span>
                <ui-Button
                  v-if="!item.isArchive"
                  :text="$t('_common.buttons.read')"
                  variant="text"
                  @click="addArchive(item.id)"
                />
              </div>
              <ui-Divider v-if="index !== announcements.length - 1" class="w-full my-md" />
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col items-center gap-xl py-xl">
          <ui-EmptyState
            :title="$t('_common.empty.announcement.title')"
            :description="$t('_common.empty.announcement.caption')"
            vector="Announcement"
          />
        </div>
      </div>
    </template>
  </ui-Card>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';

const t = useI18n();
const authStore = useAuthStore();
const { announcements, notifications } = storeToRefs(authStore);
const { load, data, onResult } = useUserAnnouncementQuery();
const LOCAL_STORAGE_KEY = 'userAnnouncementCache';
const DURATION_MS = 30 * 60 * 1000;
const shouldFetchUserAnnouncement = () => {
  const savedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!savedValue) {
    return true;
  }

  const expirationTime = parseInt(savedValue, 10);
  if (Date.now() < expirationTime) {
    return false;
  }

  localStorage.removeItem(LOCAL_STORAGE_KEY);

  return true;
};

if (shouldFetchUserAnnouncement()) {
  load();
}
const { toJalali } = useDate();
const activeTab = ref('1');
const contentEl = ref();
const tabs = ref([
  { label: t('common.notif.announcement'), value: '2', isNotif: false },
  { label: t('_common.buttons.notifications'), value: '1', isNotif: false },
]);
const onChangeRoute = (link: string) => window.open(link, '_blank');
const checkBadge = () => {
  if (activeTab.value === '1' && notifications.value && notifications.value.length) {
    notifications.value = notifications.value.map(notify => {
      if (notify.isSeen) {
        return notify;
      } else {
        return {
          ...notify,
          isSeen: true,
        };
      }
    });
  }
};
const addArchive = (id?: string, type: 'single' | 'all' = 'single') => {
  if (type === 'single') {
    announcements.value = announcements.value.map(announcements => {
      if (announcements.isArchive) {
        return announcements;
      } else {
        return {
          ...announcements,
          isArchive: id === announcements.id,
        };
      }
    });
  } else {
    announcements.value = announcements.value.map(announcements => {
      if (announcements.isArchive) {
        return announcements;
      } else {
        return {
          ...announcements,
          isArchive: true,
        };
      }
    });
  }
};
onResult(() => {
  if (data.value && data.value.length) {
    if (announcements.value.length > 30) {
      announcements.value = announcements.value.slice(30);
    }
    data.value.slice(0, 30).forEach(val => {
      const index = announcements.value.findIndex(item => item.id === val.id);
      if (index === -1) {
        announcements.value.push(val);
        tabs.value[0].isNotif = true;
      }
    });
  }
  announcements.value = announcements.value.sort((a, b) => parseInt(b.id) - parseInt(a.id));
  const expirationTime = Date.now() + DURATION_MS;
  localStorage.setItem(LOCAL_STORAGE_KEY, expirationTime.toString());
});

const hasArchiveAnnouncements = computed(
  () => announcements.value && announcements.value.filter(item => !item?.isArchive)?.length
);
onMounted(() => {
  authStore.getConnected();
});
</script>
<style lang="scss" scoped>
.notification {
  @apply flex flex-col justify-center items-end;
  &__header {
    @apply py-md text-text-soft text-body-400-b3;
  }
  &__item {
    @apply flex justify-end flex-row-reverse gap-xs;
  }
}
:deep(.notification a) {
  @apply text-primary;
}
</style>
