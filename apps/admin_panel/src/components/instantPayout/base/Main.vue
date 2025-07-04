<template>
  <div>
    <ui-Card>
      <template #main>
        <div class="flex justify-end mb-md">
          <ui-Balance
            :amount="balanceValue"
            :btn-text="$t('_form.add_payout.balance')"
            :border="false"
            :loading="balanceLoading"
            @refresh="refetch"
          />
        </div>
        <div class="mb-xl flex justify-start items-center flex-row-reverse gap-xs flex-wrap">
          <ui-Skeleton :loading="loading" :width="83" :height="33" radius="xl">
            <InstantPayoutBaseFilter />
          </ui-Skeleton>
          <ui-Skeleton :loading="loading" :width="67" :height="33" radius="xl">
            <SharedDateFilter />
          </ui-Skeleton>
          <ui-Skeleton :loading="loading" :width="63" :height="33" radius="xl">
            <SharedAmountFilter />
          </ui-Skeleton>
          <ui-Divider type="vertical" height="32" class="mx-2xs hidden md:flex" />
          <ui-Skeleton :loading="loading" :width="180" :height="32" radius="xl">
            <SharedSearchFilter
              :rows="items"
              :placeholder="$t('_form.search.instant_payout')"
              @submit="onSubmit"
            />
          </ui-Skeleton>
        </div>
        <InstantPayoutBaseContent />
      </template>
    </ui-Card>
  </div>
</template>
<script lang="ts" setup>
export interface RowType {
  label: string;
  value: string;
  helper: string;
  model: string;
}
const { numberFormat } = useMath();
const t = useI18n();
const router = useRouter();
const route = useRoute();
const items = [
  {
    label: `${t('_common.table.reconcile_id')}:`,
    value: 'url_code',
    helper: t('_helper.searchHelper.reconcile_id'),
  },
  {
    label: `${t('_common.table.reference_id')}:`,
    value: 'reference',
    helper: t('_helper.searchHelper.reference_id'),
  },
  {
    label: `${t('_common.table.description')}:`,
    value: 'description',
    helper: t('_helper.searchHelper.description'),
  },
];
const { data, loading: balanceLoading, refetch } = userPayoutBalanceQuery();
const balanceValue = computed(() => data.value && numberFormat(data.value.value));
onMounted(() => {
  refetch();
});
const onSubmit = (selected: RowType[]) => {
  const newQuery = { ...route.query };
  items.forEach(item => {
    delete newQuery[item.value];
  });
  selected.forEach(i => {
    newQuery[i.value] = i.model?.trim();
  });

  router.push({
    query: newQuery,
  });
};
const loading = inject<boolean>('instantPayoutLoading');
</script>
