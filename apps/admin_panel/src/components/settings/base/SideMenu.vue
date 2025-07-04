<template>
  <div class="w-full lg:w-[292px]">
    <template v-for="item in menus" :key="item.section">
      <p v-if="item.title && !loading" dir="rtl" class="text-text-soft text-body-400-b3 p-sm pt-0">
        {{ item.title }}
      </p>
      <ui-Card class="mb-sm !p-sm">
        <template #main>
          <div v-if="loading">
            <ui-NavLink v-for="sub in 2" :key="sub" :icon="sub" :label="sub" :loading="loading" />
          </div>
          <div v-else>
            <NuxtLink
              v-for="sub in item.subMenu"
              :key="sub.value"
              :to="(!sub.disabled && { path: 'settings', query: { menu: sub.value } }) || undefined"
            >
              <ui-NavLink
                :icon="sub.icon"
                :label="sub.title"
                :active="route.query.menu === sub.value"
                :disabled="sub.disabled"
                @click="emits('action')"
              />
            </NuxtLink>
          </div>
        </template>
      </ui-Card>
    </template>
  </div>
</template>

<script setup lang="ts">
import { TerminalFlagEnum, Maybe, TerminalStatusEnum } from '@/graphql/graphql';

enum Menu {
  TerminalSettings = 'TerminalSettings',
  Account = 'Account',
  Fee = 'Fee',
  Contact = 'Contact',
  Ip = 'Ip',
  Service = 'Service',
  Permission = 'Permission',
  Ayan = 'userAyan',
  Zarin_Link = 'ZarinLink',
}
enum SectionTypes {
  Info,
  Account,
  Support,
  Permission,
  Ayan,
}
interface Props {
  flag: Maybe<TerminalFlagEnum>;
  loading?: boolean;
  isOwner: boolean;
  hasZarinGates: boolean;
  status: TerminalStatusEnum;
}
interface SubMenu {
  title: string;
  icon: string;
  value?: Menu;
  disabled: boolean;
}

interface MenuItem {
  section: SectionTypes;
  title?: string;
  subMenu: SubMenu[];
}
const props = withDefaults(defineProps<Props>(), {});
const emits = defineEmits(['action']);
const { flag, loading, isOwner, hasZarinGates, status } = toRefs(props);
const t = useI18n();
const route = useRoute();
const menu: MenuItem[] = [
  {
    section: SectionTypes.Info,
    subMenu: [
      {
        title: t('_common.slug.port_specifications'),
        icon: 'DocumentText',
        value: undefined,
        disabled: false,
      },
    ],
  },
  {
    section: SectionTypes.Account,
    subMenu: [
      {
        title: t('_common.slug.account_period'),
        icon: 'CreditCardUser-1',
        value: Menu.Account,
        disabled: status.value === TerminalStatusEnum.Pending,
      },
      {
        title: t('_common.slug.fee_settings'),
        icon: 'Switches',
        value: Menu.Fee,
        disabled: status.value === TerminalStatusEnum.Pending,
      },
    ],
  },
  {
    section: SectionTypes.Support,
    subMenu: [
      {
        title: t('_common.slug.phone_support'),
        icon: 'Phone',
        value: Menu.Contact,
        disabled: status.value === TerminalStatusEnum.Pending,
      },
      {
        title: t('_common.slug.ip'),
        icon: 'World',
        value: Menu.Ip,
        disabled: status.value === TerminalStatusEnum.Pending,
      },
      {
        title: t('_common.slug.service_payment'),
        icon: 'MenuBlockCheckmark',
        value: Menu.Service,
        disabled: status.value === TerminalStatusEnum.Pending,
      },
    ],
  },
  {
    section: SectionTypes.Permission,
    subMenu: [
      {
        title: t('_common.slug.level'),
        icon: 'UserProfile',
        value: Menu.Permission,
        disabled: status.value === TerminalStatusEnum.Pending,
      },
    ],
  },
  {
    section: SectionTypes.Ayan,
    title: t('_terminal.services'),
    subMenu: [
      {
        title: t('_terminal.chnType.ayan'),
        icon: 'UserAyan',
        value: Menu.Ayan,
        disabled: status.value === TerminalStatusEnum.Pending,
      },
      {
        title: t('_common.links.zarin_link'),
        icon: 'PaymentLinksSetting',
        value: Menu.Zarin_Link,
        disabled: status.value === TerminalStatusEnum.Pending,
      },
    ],
  },
];
const menus = computed<MenuItem[]>(() => {
  let filteredMenu = [...menu];
  if (flag.value === TerminalFlagEnum.PersonalLink) {
    filteredMenu = filteredMenu.filter(item => item.section !== SectionTypes.Support);
  }
  if (!isOwner.value) {
    filteredMenu = filteredMenu.filter(
      item => item.section !== SectionTypes.Permission && item.section !== SectionTypes.Ayan
    );
  }
  if (!hasZarinGates.value) {
    filteredMenu = filteredMenu.map(item => {
      if (item.section === SectionTypes.Support) {
        item.subMenu = item.subMenu.filter(subItem => subItem.value !== Menu.Service);
      }

      return item;
    });
  }

  return filteredMenu;
});
</script>
