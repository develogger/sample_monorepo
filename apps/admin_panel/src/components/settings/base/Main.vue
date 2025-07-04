<template>
  <div class="flex flex-col-reverse lg:flex-row justify-between gap-md">
    <ui-Card class="w-full h-full">
      <template #main>
        <SettingsBaseAccount v-if="route.query.menu === TerminalSettingsMenus.Account" />
        <SettingsBasePspList
          v-else-if="route.query.menu === TerminalSettingsMenus.Service && !md && hasZarinGates"
        />
        <SettingsBasePspListMd
          v-else-if="route.query.menu === TerminalSettingsMenus.Service && md && hasZarinGates"
        />
        <SettingsBasePhoneNumber v-else-if="route.query.menu === TerminalSettingsMenus.Contact" />
        <SettingsBaseIpServer
          v-else-if="
            route.query.menu === TerminalSettingsMenus.Ip && flag === TerminalFlagEnum.Normal
          "
        />
        <SettingsBaseFee v-else-if="route.query.menu === TerminalSettingsMenus.Fee" />
        <SettingsBaseAyan v-else-if="route.query.menu === TerminalSettingsMenus.UserAyan" />
        <SettingsBaseZarinLink v-else-if="route.query.menu === TerminalSettingsMenus.Zarin_Link" />
        <SettingsBasePermissionLgGrid
          v-else-if="route.query.menu === TerminalSettingsMenus.Permission && !md"
        />
        <SettingsBasePermissionMdGrid
          v-else-if="route.query.menu === TerminalSettingsMenus.Permission && md"
        />
        <SettingsBasePortspecifications v-else />
      </template>
    </ui-Card>

    <div ref="menuRef">
      <SettingsBaseSideMenu
        :flag="flag"
        :status="status"
        :loading="loading"
        :is-owner="isOwner"
        :has-zarin-gates="hasZarinGates"
        @action="smoothScrollToContainer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TopBarElementType } from '@zarinpal/ui/src/components/topbar/Topbar.vue';
import {
  TerminalFlagEnum,
  TerminalStatusEnum,
  ZarinGateType,
  PaymentTerminalStatusEnum,
} from '@/graphql/graphql';

enum TerminalSettingsMenus {
  TerminalSettings = 'TerminalSettings',
  Account = 'Account',
  Service = 'Service',
  Contact = 'Contact',
  Ip = 'Ip',
  Fee = 'Fee',
  UserAyan = 'userAyan',
  Permission = 'Permission',
  Zarin_Link = 'ZarinLink',
}
const { $notify } = useNuxtApp();
const { md } = useSize();
const route = useRoute();
const router = useRouter();
const t = useI18n();
const { data: userData, loading } = useUserIdQuery();
const { activeTerminal } = useTerminalQuery();
const flag = computed(() => activeTerminal.value?.flag);
const status = computed(() => activeTerminal.value?.status);
const menuRef = ref();
const topBarRef = inject<Ref<TopBarElementType>>('topBarRef');
const redirectToTerminalSettings = () => {
  $notify({
    isRead: false,
    message: t('_common.permission.not_access_this_page'),
    type: 'error',
  });

  return router.push({
    query: { menu: undefined },
  });
};
const smoothScrollToContainer = () => {
  if (md.value && !!menuRef.value) {
    setTimeout(() => {
      scrollToItem();
    }, 0);
  }
};
const scrollToItem = () => {
  const scrollOffset = topBarRef?.value.calcTopBarHeight();
  const targetHeight = menuRef.value.getBoundingClientRect().height;
  window.scrollTo({
    top: targetHeight + scrollOffset,
    behavior: 'smooth',
  });
};
const permissionHandler = () => {
  if (
    flag.value === TerminalFlagEnum.PersonalLink &&
    [
      TerminalSettingsMenus.Contact,
      TerminalSettingsMenus.Ip,
      TerminalSettingsMenus.Service,
    ].includes(route.query.menu as TerminalSettingsMenus)
  ) {
    redirectToTerminalSettings();
  }
};
const checkTerminalStatus = () => {
  if (route.query.menu && status.value === TerminalStatusEnum.Pending) {
    redirectToTerminalSettings();
  }
};
const isOwner = computed(
  () =>
    activeTerminal.value?.owner_id &&
    userData.value?.id &&
    userData.value?.id === activeTerminal.value?.owner_id
);
const hasZarinGates = computed(() => {
  const list = _filter(
    activeTerminal.value?.zarin_gate,
    (item: ZarinGateType) =>
      item.status === PaymentTerminalStatusEnum.Active ||
      item.status === PaymentTerminalStatusEnum.DeActive
  );
  const zarinGates = _reject(list, ['psp', 'WPep']);

  return zarinGates.length > 0 && activeTerminal.value?.status === TerminalStatusEnum.Active;
});
onMounted(() => {
  smoothScrollToContainer();
});

watch(
  () => route.query,
  () => {
    permissionHandler();
    checkTerminalStatus();
    if (
      !isOwner.value &&
      [TerminalSettingsMenus.Permission, TerminalSettingsMenus.UserAyan].includes(
        route.query.menu as TerminalSettingsMenus
      )
    ) {
      redirectToTerminalSettings();
    }
    if (
      !hasZarinGates.value &&
      [TerminalSettingsMenus.Service].includes(route.query.menu as TerminalSettingsMenus)
    ) {
      redirectToTerminalSettings();
    }
  },
  { immediate: true }
);
</script>
