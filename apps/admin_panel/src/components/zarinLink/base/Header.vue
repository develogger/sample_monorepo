<template>
  <ZarinLinkBaseModalSelectZarinLink v-if="toggleShowModal" @close="toggleShowModal = false" />
  <ui-PageHeading
    :title="$t('_common.page_title.payment_links')"
    :description="!!data?.length && $t('_common.pageHeading.payment_link_description')"
    :loading="loading"
  >
    <template #action>
      <div class="w-fit flex gap-xs">
        <NuxtLink v-if="hasPermission && hasLevel" @click="toggleShowModal = true">
          <ui-Button
            v-if="!md"
            :text="$t('_common.buttons.zarin_link_create_button')"
            after-icon="Plus"
            :loading="loading"
            :disabled="disableCreateButton"
          />
          <ui-Button v-else icon="Plus" :loading="loading" :disabled="disableCreateButton" />
        </NuxtLink>

        <NuxtLink v-if="hasPermission && hasLevel" :to="`/panel/${domain}/settings?menu=ZarinLink`">
          <ui-Button
            :text="md ? '' : $t('_common.buttons.settings')"
            :after-icon="md ? '' : 'SettingsRound'"
            :icon="md ? 'SettingsRound' : ''"
            :loading="loading"
            type="tertiary"
          />
        </NuxtLink>
      </div>
    </template>
  </ui-PageHeading>
</template>

<script setup lang="ts">
import {
  TerminalPermissionEnum,
  TerminalStatusEnum,
  UserLevelEnum,
  ZarinLinkType,
} from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';

const domain = useTerminalStore().currentDomain;
const toggleShowModal = ref<boolean>(false);
const { md } = useSize();
const loading = inject<boolean>('zarinLinksLoading');
const data = inject<ZarinLinkType[]>('zarinLinks');
const { hasPermission } = usePermissionValidate(TerminalPermissionEnum.ProductEdit);
const store = useAuthStore();
const hasLevel = computed(() => {
  const userLevel = store.userAuth?.level as UserLevelEnum;
  const basicLevels = [UserLevelEnum.Basic, UserLevelEnum.Blue, UserLevelEnum.New];

  return !basicLevels.includes(userLevel);
});
const { activeTerminal } = useTerminalQuery();
const disableCreateButton = computed(
  () => activeTerminal.value?.status !== TerminalStatusEnum.Active
);
</script>
