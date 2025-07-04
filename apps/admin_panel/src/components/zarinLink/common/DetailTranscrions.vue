<template>
  <ui-Card>
    <template #header>
      <div class="mb-xl">
        <ui-skeleton :loading="mainLoading" :height="20">
          <span class="text-heading-600-h2">
            {{ $t('_zarin_link.detail.last_transactions') }}
          </span>
        </ui-skeleton>
      </div>
    </template>
    <template #main>
      <ZarinLinkCommonTransactionLgGrid v-if="!md" :loading="mainLoading" />
      <ZarinLinkCommonTransactionMdGrid v-else :loading="mainLoading" />
    </template>

    <template v-if="!!sessionPagination?.total && sessionPagination?.total > 10" #footer>
      <ui-Button
        :text="allSessionsText"
        variant="outlined"
        type="neutral"
        class="w-full mt-xl"
        :loading="mainLoading"
        @click="onNavigateHandler"
      />
    </template>
  </ui-Card>
</template>

<script lang="ts" setup>
// api
const {
  pagination: sessionPagination,
  data: sessionsData,
  load: sessionsLoad,
  loading: sessionsLoading,
} = useSessionQuery().sessionListByRelated;
// composable
const t = useI18n();
const { md } = useSize();
const domain = useTerminalStore().currentDomain;
const route = useRoute();
const router = useRouter();
// computed
const allSessionsText = computed(() =>
  t('_zarin_link.detail.showAllTransactions', { count: sessionPagination.value?.total + '' })
);
const mainLoading = computed(() => sessionsLoading.value);

// provide
provide('sessions_data', sessionsData);
provide('sessions_loading', sessionsLoading);

// utils
const onNavigateHandler = () => {
  router.push(`/panel/${domain}/session?relation_id=${route.params.id}`);
};

onMounted(() => {
  sessionsLoad();
});
</script>
