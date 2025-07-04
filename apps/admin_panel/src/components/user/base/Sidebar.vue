<template>
  <ui-Card v-for="item in menu" :key="item.section" class="mb-sm">
    <template #main>
      <NuxtLink v-for="sub in item.subMenu" :key="sub.value" :to="{ query: { menu: sub.value } }">
        <ui-NavLink
          :icon="sub.icon"
          :label="sub.title"
          :active="route.query.menu === sub.value"
          @click="emits('action')"
        />
      </NuxtLink>
    </template>
  </ui-Card>
</template>

<script setup lang="ts">
enum Menu {
  userInfo = 'userInfo',
  bankAccount = 'bankAccount',
  address = 'address',
  terminal = 'terminal',
  accessToken = 'accessToken',
  connectApp = 'connectApp',
  notification = 'notification',
}
const emits = defineEmits(['action']);
const t = useI18n();
const route = useRoute();
const menu = [
  {
    section: 1,
    subMenu: [
      {
        title: t('_common.buttons.userProfile'),
        icon: 'ProfileCard',
        value: undefined,
      },
    ],
  },
  {
    section: 2,
    subMenu: [
      {
        title: t('_bank_account.title'),
        icon: 'Cards',
        value: Menu.bankAccount,
      },

      {
        title: t('_address.title'),
        icon: 'LocationAddress',
        value: Menu.address,
      },
    ],
  },
  {
    section: 3,
    subMenu: [
      {
        title: t('_user.notification.title'),
        icon: 'Notification',
        value: Menu.notification,
      },
      {
        title: t('_user.accessToken.title'),
        icon: 'CheckMarkCircleOutlined',
        value: Menu.accessToken,
      },
      {
        title: t('_user.notification.connected_apps'),
        icon: 'AttachmentLink',
        value: Menu.connectApp,
      },
    ],
  },
  {
    section: 4,
    subMenu: [
      {
        title: t('_terminal.title'),
        icon: 'BuildingCityDownTown',
        value: Menu.terminal,
      },
    ],
  },
];
</script>
