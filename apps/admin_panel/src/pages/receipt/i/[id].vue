<template>
  <div class="flex justify-center items-center w-full h-[100vh]">
    <SharedReceipt
      :list="listData"
      :status="data?.status && statusHandler(data.status)"
      :amount="data?.amount"
    />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  name: 'receipt_instant',
  layout: 'receipt',
  public: true,
});
useSeoMeta({ robots: 'noindex' });
const { data } = useInstantPayoutReceipt();
const { toJalali } = useDate();
const { statusHandler } = useInstantFilter();
const t = useI18n();
useHead({
  title: t('_helper.receipt.title'),
});
const listData = computed(() => [
  {
    label: t('_helper.receipt.instant_payout.owner_name'),
    value: data?.value?.owner_name,
  },
  {
    label: t('_helper.receipt.instant_payout.iban'),
    value: data?.value?.bank_account.iban,
  },
  {
    label: t('_helper.receipt.instant_payout.bank'),
    value: data?.value?.bank_account?.issuing_bank.name,
    slug: data?.value?.bank_account?.issuing_bank.slug,
  },
  {
    label: t('_helper.receipt.instant_payout.holder_name'),
    value: data?.value?.bank_account?.holder_name,
  },
  {
    label: t('_helper.receipt.instant_payout.id'),
    value: data?.value?.id,
  },
  {
    label: t('_helper.receipt.instant_payout.shaparak_tracking_number'),
    value: data?.value?.shaparak_tracking_number,
  },
  {
    label: t('_helper.receipt.instant_payout.reconciled_at'),
    value:
      data?.value?.created_at &&
      toJalali(
        data?.value?.created_at,
        'jDD jMMMM jYYYY, HH:mm',
        'jDD jMMMM jYYYY, HH:mm',
        'jDD jMMMM jYYYY, HH:mm',
        'jDD jMMMM jYYYY, HH:mm'
      ),
  },
]);
</script>
