<template>
  <div class="pb-3xl w-full container-lg">
    <SettingsBaseHeader />
    <SettingsBaseMain class="px-md lg:px-0" />
  </div>
</template>

<script setup lang="ts">
import { TerminalFlagEnum, TerminalPermissionEnum } from '@/graphql/graphql';

definePageMeta({
  name: 'settings',
  layoutTransition: false,
  layout: 'terminal',
  middleware: ['permission'],
  permission: TerminalPermissionEnum.TerminalEdit,
});
const t = useI18n();
const { activeTerminal } = useTerminalQuery();
const flag = computed(() => activeTerminal.value?.flag);
useHead({
  title:
    flag.value === TerminalFlagEnum.Normal
      ? t('_common.page_title.setting')
      : t('_common.page_title.zarin_link_setting'),
});
</script>
