<template>
  <div>
    <ui-Card>
      <template #main>
        <div dir="rtl" class="flex flex-col mb-md sm:items-center items-start sm:flex-row">
          <ui-Balance
            :amount="balanceValue"
            :btn-text="$t('_form.add_payout.balance')"
            :border="false"
            :loading="loading || activeLoading"
            @refresh="refetch"
          />
          <ui-Divider
            v-if="activeBalanceValue"
            type="vertical"
            height="32"
            class="mx-2xs hidden md:flex"
          />
          <ui-Balance
            v-if="activeBalanceValue"
            :amount="activeBalanceValue"
            :btn-text="$t('payout.sum_active')"
            :loading="loading || activeLoading"
            :border="false"
            :has-refresh="false"
          />
        </div>
        <div class="mb-xl flex justify-start items-center flex-row-reverse gap-xs flex-wrap">
          <ui-Skeleton :loading="payoutLoading" :width="83" :height="33" radius="xl">
            <PayoutBaseFilter />
          </ui-Skeleton>
          <ui-Skeleton :loading="payoutLoading" :width="67" :height="33" radius="xl">
            <SharedDateFilter />
          </ui-Skeleton>
          <ui-Skeleton :loading="payoutLoading" :width="63" :height="33" radius="xl">
            <SharedAmountFilter />
          </ui-Skeleton>
          <ui-Divider type="vertical" height="32" class="mx-2xs hidden md:flex" />
          <ui-Skeleton :loading="payoutLoading" :width="180" :height="32" radius="xl">
            <SharedSearchFilter
              :rows="items"
              :placeholder="$t('_form.search.payout')"
              @submit="onSubmit"
            />
          </ui-Skeleton>
        </div>
        <PayoutBaseContent @refresh="refetchBalance" />
      </template>
    </ui-Card>
  </div>
</template>
<script lang="ts" setup>
// import sumBy from 'lodash/sumBy';
import { userPayoutBalanceQuery } from '@/composables/user/userPayoutBalanceQuery';
// import { PayoutType } from '~/graphql/graphql';

export interface RowType {
  label: string;
  value: string;
  helper: string;
  model: string;
}
const emit = defineEmits(['refetch']);
const t = useI18n();
const router = useRouter();
const route = useRoute();
const { numberFormat } = useMath();
const items = [
  {
    label: `${t('_common.table.reconcile_id')}:`,
    value: 'url_code',
    helper: t('_helper.searchHelper.reconcile_id'),
  },
  {
    label: `${t('_common.table.iban')}:`,
    value: 'iban',
    helper: t('_helper.searchHelper.iban'),
  },
  {
    label: `${t('_common.table.description')}:`,
    value: 'description',
    helper: t('_helper.searchHelper.description'),
  },
  {
    label: `${t('_common.table.reference_session_id')}:`,
    value: 'reference',
    helper: t('_helper.searchHelper.reference_session_id'),
  },
];
const { data, loading, refetch } = userPayoutBalanceQuery();
const { data: activeData, loading: activeLoading } = useActivePayoutAmountQuery();
const balanceValue = computed(() => data.value && numberFormat(data.value.value));
const onSubmit = (selected: RowType[]) => {
  const newQuery = { ...route.query };
  items.forEach(item => {
    delete newQuery[item.value];
  });
  selected.forEach(i => {
    newQuery[i.value] = i.model;
  });

  router.push({
    query: newQuery,
  });
};
onMounted(() => {
  refetch();
});
const payoutLoading = inject<boolean>('payoutLoading');
const refetchBalance = () => {
  emit('refetch');
  refetch();
};
const activeBalanceValue = computed(
  () => activeData?.value && Number(activeData?.value) && numberFormat(activeData.value as string)
);
</script>
