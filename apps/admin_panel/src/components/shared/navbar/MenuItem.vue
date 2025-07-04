<template>
  <div class="scroll-display pt-md w-[255px] h-full menu-items" dir="rtl">
    <!-- list -->
    <div dir="ltr" class="pb-xs mx-md">
      <div v-for="item in list" :key="item.label" :ref="item.active ? item.name : undefined">
        <NuxtLink
          v-if="item.active"
          :to="
            item.disabled
              ? undefined
              : { path: `/panel/${terminalStore.currentDomain}/${item.name}` }
          "
          class="mb-xs block relative"
          :class="{
            'active-item': activeRoute(item.name),
          }"
          @click.prevent="onClickMenuItem(item)"
        >
          <div class="flex justify-end">
            <ui-NavLink
              v-if="store.navigateState === Nav.EXPANDED || store.menuState === Status.VISIBLE"
              :icon="item.icon"
              :label="
                store.navigateState === Nav.EXPANDED || store.menuState === Status.VISIBLE
                  ? item.label
                  : ''
              "
              :arrow="false"
              :loading="terminalLoading"
              :class="[activeRoute(item.name) ? '!bg-surface-primary' : '', 'justify-end flex']"
              :active="activeRoute(item.name)"
              :disabled="item.disabled"
              :status="item.status"
            />
            <ui-Tooltip v-else :content="item.label" position="left">
              <ui-NavLink
                :icon="item.icon"
                :arrow="false"
                :loading="terminalLoading"
                :class="[activeRoute(item.name) ? '!bg-surface-primary' : '', 'justify-end flex']"
                :active="activeRoute(item.name)"
                :disabled="item.disabled"
                :status="item.status"
              />
              <template v-if="item.status">
                <ui-Status
                  class="h-fit absolute -left-2xs bottom-[35px] !p-0"
                  :type="item.status.type"
                  dot
                />
              </template>
            </ui-Tooltip>
          </div>
        </NuxtLink>
      </div>
    </div>
    <ui-Divider v-if="!terminalLoading && showDivider" class="mb-md mx-md" />
    <!-- footerList -->
    <div class="mx-md" dir="ltr">
      <template v-for="item in footerList" :key="item.label">
        <NuxtLink
          v-if="item.active"
          :to="{
            path: `/panel/${terminalStore.currentDomain}/${item.name}`,
          }"
          class="relative"
          :class="{ 'active-item': activeRoute(item.name) }"
          @click.prevent="store.toggleNavigatorInSidebar"
        >
          <div :ref="item.name" class="flex my-xs justify-end">
            <ui-NavLink
              v-if="store.navigateState === Nav.EXPANDED || store.menuState === Status.VISIBLE"
              :icon="item.icon"
              :label="
                store.navigateState === Nav.EXPANDED || store.menuState === Status.VISIBLE
                  ? item.label
                  : ''
              "
              :arrow="false"
              class=""
              :class="[activeRoute(item.name) ? '!bg-surface-primary' : '', 'justify-end flex']"
              :active="_includes(route.name, item.name)"
            />
            <ui-Tooltip v-else :content="item.label" position="left">
              <ui-NavLink
                :icon="item.icon"
                label=""
                :arrow="false"
                class=""
                :class="[activeRoute(item.name) ? '!bg-surface-primary' : '', 'justify-end flex']"
                :active="_includes(route.name, item.name)"
              />
            </ui-Tooltip>
          </div>
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTerminalQuery } from '@/composables/terminal/useTerminalQuery';
import { TerminalPermissionEnum, TerminalFlagEnum, TerminalStatusEnum } from '@/graphql/graphql';
const emit = defineEmits(['complete']);
const { activeTerminal, loading: terminalLoading, onResult } = useTerminalQuery();
const terminalStore = useTerminalStore();
const store = useNavigateStore();
const t = useI18n();
interface MenuItem {
  name: string;
  icon: string;
  label: string;
  active: boolean;
  disabled: boolean;
  permission?: TerminalPermissionEnum;
  status?: {
    type: string;
    text: string;
    isHorizontal: boolean;
  };
}
const route = useRoute();
const flag = computed(() => activeTerminal.value?.flag);
const list = computed<MenuItem[]>(() => [
  {
    name: 'dashboard',
    icon: 'GridLayout',
    label: t('_common.links.dashboard'),
    active: true,
    disabled: false,
  },
  {
    name: 'session',
    icon: 'Transaction',
    label: t('_common.links.session'),
    permission: TerminalPermissionEnum.Session,
    active: _includes(activeTerminal.value?.permissions, TerminalPermissionEnum.Session),
    disabled: activeTerminal?.value?.status === TerminalStatusEnum.Pending,
  },
  {
    name: 'reconciliation',
    icon: 'Reconciliation',
    label: t('_common.links.reconcile'),
    permission: TerminalPermissionEnum.Reconcile,
    active: _includes(activeTerminal.value?.permissions, TerminalPermissionEnum.Reconcile),
    disabled: activeTerminal?.value?.status === TerminalStatusEnum.Pending,
  },
  {
    name: 'instant-payout',
    icon: 'InstantPayout',
    label: t('_common.links.instant_payout'),
    permission: TerminalPermissionEnum.InstantPayout,
    active: _includes(activeTerminal.value?.permissions, TerminalPermissionEnum.InstantPayout),
    disabled: activeTerminal?.value?.status === TerminalStatusEnum.Pending,
  },
  {
    name: 'payout',
    icon: 'Payout',
    label: t('_common.links.payout'),
    permission: TerminalPermissionEnum.Payout,
    active:
      _includes(activeTerminal.value?.permissions, TerminalPermissionEnum.Payout) ||
      _includes(activeTerminal.value?.permissions, TerminalPermissionEnum.WagePayout),
    disabled: activeTerminal?.value?.status === TerminalStatusEnum.Pending,
  },
  {
    name: 'invoice',
    icon: 'BillScan',
    label: t('_common.links.invoice'),
    permission: TerminalPermissionEnum.Invoice,
    active:
      false /* _includes(activeTerminal.value?.permissions, TerminalPermissionEnum.Invoice) */,
    disabled: activeTerminal?.value?.status === TerminalStatusEnum.Pending,
  },
  {
    name: 'product',
    icon: 'ProductBox',
    label: t('_common.links.product'),
    permission: TerminalPermissionEnum.Product,
    active: _includes(activeTerminal.value?.permissions, TerminalPermissionEnum.Product),
    disabled: activeTerminal?.value?.status === TerminalStatusEnum.Pending,
  },
  {
    name: 'coupon',
    icon: 'Coupon',
    label: t('_common.links.coupon'),
    permission: TerminalPermissionEnum.Coupon,
    active: _includes(activeTerminal.value?.permissions, TerminalPermissionEnum.Coupon),
    disabled: activeTerminal?.value?.status === TerminalStatusEnum.Pending,
  },
  {
    name: 'zarin-link',
    icon: 'ZarinLink',
    label: t('_common.links.zarin_link'),
    permission: TerminalPermissionEnum.Zarinlink,
    active: _includes(activeTerminal.value?.permissions, TerminalPermissionEnum.Zarinlink),
    disabled: activeTerminal?.value?.status === TerminalStatusEnum.Pending,
  },
]);
const footerList = computed(() => [
  {
    name: 'settings',
    icon: 'SettingsRound',
    permission: TerminalPermissionEnum.TerminalEdit,
    label:
      flag.value === TerminalFlagEnum.Normal
        ? t('_common.links.terminal_settings')
        : t('_common.page_title.zarin_link_setting'),
    active: _includes(activeTerminal.value?.permissions, TerminalPermissionEnum.TerminalEdit),
  },
]);
const activeRoute = (name: string) => {
  if (name === 'payout' || name === 'instant-payout') {
    return name === 'payout'
      ? _includes(route.name, 'payout') && !_includes(route.name, 'instant-payout')
      : _includes(route.name, 'instant-payout');
  } else if (name === 'dashboard') {
    return _includes(route.name, 'daily-records') || _includes(route.name, 'dashboard');
  } else {
    return _includes(route.name, name);
  }
};
const showDivider = computed(() =>
  _includes(activeTerminal.value?.permissions, TerminalPermissionEnum.TerminalEdit)
);
onResult(() => {
  emit('complete');
});
const onClickMenuItem = (item: MenuItem) => {
  if (item.disabled) {
    return;
  }
  store.toggleNavigatorInSidebar();
};
</script>

<style lang="scss" scoped>
.scroll-display {
  @apply bg-surface overflow-scroll relative w-full;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}
@keyframes itemTextContent {
  0% {
    width: 0;
  }
  30% {
    width: 0;
  }
  90% {
    width: 100%;
  }
}
.anime {
  animation-name: itemTextContent;
  animation-duration: 1s;
}
.active-item:before {
  content: '';
  width: 5px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  @apply absolute h-2xl bg-primary rounded-tl-xl rounded-bl-xl  right-[-16px] top-[4px];
}
</style>
