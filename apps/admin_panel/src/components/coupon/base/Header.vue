<template>
  <ui-PageHeading
    :title="$t('_common.page_title.coupon')"
    :description="
      !data?.length && _isEmpty(route.query) ? '' : $t('_common.pageHeading.coupon_description')
    "
    :loading="loading"
  >
    <template #action>
      <div class="w-fit flex gap-xs">
        <NuxtLink v-if="hasPermission" :to="`/panel/${domain}/coupon/add`">
          <ui-Button
            v-if="!md"
            :loading="loading"
            :disabled="disableCreateButton"
            :text="$t('_common.page_title.create_coupon')"
            after-icon="Plus"
          />
          <ui-Button v-else :loading="loading" :disabled="disableCreateButton" icon="Plus" />
        </NuxtLink>
      </div>
    </template>
  </ui-PageHeading>
</template>

<script setup lang="ts">
import { TerminalPermissionEnum, CouponType, TerminalStatusEnum } from '../../../graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';
const { md } = useSize();
const route = useRoute();
const loading = inject<boolean>('couponLoading');
const data = inject<CouponType[]>('coupon');
const domain = useTerminalStore().currentDomain;
const { hasPermission } = usePermissionValidate(TerminalPermissionEnum.CouponEdit);
const { active } = useActiveTerminal();
const disableCreateButton = computed(() => active.status !== TerminalStatusEnum.Active);
</script>
