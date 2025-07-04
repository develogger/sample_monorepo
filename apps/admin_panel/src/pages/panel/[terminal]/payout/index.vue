<template>
  <div class="pb-3xl w-full container-xl">
    <PayoutBaseHeader />
    <PayoutBaseMain @refetch="refetch" />
  </div>
</template>

<script setup lang="ts">
import { FilterEnum, PayoutStatusEnum, TerminalPermissionEnum } from '@/graphql/graphql';
import { usePayoutQuery } from '@/composables/payout/usePayoutQuery';

definePageMeta({
  name: 'payout',
  layout: 'terminal',
  middleware: ['permission'],
  permission: [TerminalPermissionEnum.Payout, TerminalPermissionEnum.WagePayout],
});
const t = useI18n();
useHead({
  title: t('_common.page_title.payout'),
});
const route = useRoute();
const config = useRuntimeConfig();
const { convertQueryParamDate } = useDate();
const { refetch, data, loading, pagination } = usePayoutQuery();
provide('payout', data);
provide('payoutLoading', loading);
provide('payoutPagination', pagination);
const refetchData = () => {
  refetch({
    id: route.query.id || undefined,
    limit: Number(route.query.pageSize) || config.public.pageSize,
    offset:
      (Number(route.query.pageSize) || config.public.pageSize) *
      ((Number(route.query.page) || config.public.page) - 1),
    filter:
      Object.values(FilterEnum).includes(route.query.status as FilterEnum) ||
      Object.values(PayoutStatusEnum).includes(route.query.status as PayoutStatusEnum)
        ? route.query.status
        : undefined,
    created_from_date: route.query.from && convertQueryParamDate(route.query.from as string),
    created_to_date: route.query.to && convertQueryParamDate(route.query.to as string),
    min_amount: Number(route.query.moreAmount) || undefined,
    max_amount: Number(route.query.lessAmount) || undefined,
    amount: Number(route.query.equalAmount) || undefined,
    description: route.query.description || undefined,
    reference_session_id: route.query.reference || undefined,
    iban: route.query.iban || undefined,
    url_code: route.query.url_code || undefined,
  });
};
watch(
  () => route.query,
  () => {
    refetchData();
  },
  {
    immediate: true,
  }
);
</script>
