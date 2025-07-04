<template>
  <div class="pb-3xl w-full container-xl">
    <InstantPayoutBaseHeader />
    <InstantPayoutBaseMain />
  </div>
</template>

<script setup lang="ts">
import { TerminalPermissionEnum, InstantPayoutStatusEnum } from '@/graphql/graphql';
import { useInstantPayoutQuery } from '@/composables/instant-payout/useInstantPayoutQuery';

definePageMeta({
  name: 'instant-payout',
  layout: 'terminal',
  middleware: ['permission'],
  permission: TerminalPermissionEnum.InstantPayout,
});
const t = useI18n();
useHead({
  title: t('_common.page_title.instant_payout'),
});
const route = useRoute();
const config = useRuntimeConfig();
const { convertQueryParamDate } = useDate();
const { refetch, data, loading, pagination } = useInstantPayoutQuery();
provide('instantPayout', data);
provide('instantPayoutLoading', loading);
provide('instantPayoutPagination', pagination);
const refetchData = () => {
  refetch({
    limit: Number(route.query.pageSize) || config.public.pageSize,
    offset:
      (Number(route.query.pageSize) || config.public.pageSize) *
      ((Number(route.query.page) || config.public.page) - 1),
    status: Object.values(InstantPayoutStatusEnum).includes(
      route.query.status as InstantPayoutStatusEnum
    )
      ? route.query.status
      : undefined,
    id: route.query.id || undefined,
    url_code: route.query.url_code || undefined,
    created_from_date: route.query.from && convertQueryParamDate(route.query.from as string),
    created_to_date: route.query.to && convertQueryParamDate(route.query.to as string),
    min_amount: Number(route.query.moreAmount) || undefined,
    max_amount: Number(route.query.lessAmount) || undefined,
    amount: Number(route.query.equalAmount) || undefined,
    text: route.query.description || undefined,
    reference_id: route.query.reference || undefined,
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
