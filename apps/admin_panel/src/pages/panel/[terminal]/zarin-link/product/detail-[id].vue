<template>
  <div class="pb-3xl w-full container-xl space-y-2xl sm:space-y-0">
    <ZarinLinkCommonDetailHeader />
    <ZarinLinkProductDetail />
  </div>
</template>

<script setup lang="ts">
import { UserLevelEnum } from '~/graphql/graphql';

// api
const { data, refetch, loading } = useZarinLinkProductQueryById();
// composable
const { $notify } = useNuxtApp();
const router = useRouter();
const t = useI18n();
const store = useAuthStore();
const terminal = useTerminalStore();

// meta
definePageMeta({
  name: 'zarin-link-detailProduct',
  layout: 'terminal',
  middleware: ['check-active-terminal'],
  fallbackRoute: '/zarin-link',
});
useHead({
  title: t('_common.page_title.product_detail'),
});

// providers
provide('loading', loading);
provide('data', data);
provide('refetch', refetch);

// check permission
const hasLevel = computed(() => {
  const userLevel = store.userAuth?.level as UserLevelEnum;
  const basicLevels = [UserLevelEnum.Basic, UserLevelEnum.Blue, UserLevelEnum.New];

  return !basicLevels.includes(userLevel);
});
const checkLevel = () => {
  if (!hasLevel.value) {
    $notify({
      isRead: false,
      message: t('_common.permission.not_access_this_page'),
      type: 'error',
    });

    return router.push('/panel/' + terminal.currentDomain + '/zarin-link');
  }
};
onMounted(async () => {
  checkLevel();
  await refetch();
});
</script>
