<template>
  <ui-PageHeading
    :title="$t('_common.page_title.product')"
    :description="!!data?.length && $t('_common.pageHeading.product_description')"
    :loading="loading"
  >
    <template #action>
      <div class="w-fit flex gap-xs">
        <NuxtLink v-if="hasPermission && hasLevel" :to="`/panel/${domain}/product/add`">
          <ui-Button
            v-if="!md"
            :text="$t('_common.buttons.create_product')"
            after-icon="Plus"
            :loading="loading"
            :disabled="disableCreateButton"
          />
          <ui-Button v-else icon="Plus" :loading="loading" :disabled="disableCreateButton" />
        </NuxtLink>
      </div>
    </template>
  </ui-PageHeading>

  <div class="mb-md">
    <ui-Skeleton :loading="loading" full-width :height="78">
      <ui-InlineMessage type="informative" :title="$t('_zarin_link.alert.title')">
        <template #description>
          <p>
            {{ $t('_zarin_link.alert.description1') }}
            <NuxtLink :to="`/panel/${domain}/zarin-link`" class="text-interactive-link">
              {{ $t('_zarin_link.alert.description2') }}
            </NuxtLink>
            {{ $t('_zarin_link.alert.description3') }}
          </p>
        </template>
      </ui-InlineMessage>
    </ui-Skeleton>
  </div>
</template>

<script setup lang="ts">
import {
  TerminalPermissionEnum,
  ZarinLinkType,
  UserLevelEnum,
  TerminalStatusEnum,
} from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';
const { md } = useSize();
const loading = inject<boolean>('productLoading');
const data = inject<ZarinLinkType[]>('product');
const domain = useTerminalStore().currentDomain;
const { hasPermission } = usePermissionValidate(TerminalPermissionEnum.ProductEdit);
const store = useAuthStore();
const hasLevel = computed(() => {
  const userLevel = store.userAuth?.level as UserLevelEnum;
  const basicLevels = [UserLevelEnum.Basic, UserLevelEnum.Blue, UserLevelEnum.New];

  return !basicLevels.includes(userLevel);
});
const { active } = useActiveTerminal();
const disableCreateButton = computed(() => active.status !== TerminalStatusEnum.Active);
</script>
