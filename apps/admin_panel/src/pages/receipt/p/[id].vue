<template>
  <div ref="receiptRef" class="flex justify-center w-full">
    <SharedReceipt
      :list="listData"
      :receipt-type="$t('_permission.payout')"
      :amount="data?.amount"
      :status="status"
    >
      <template v-if="isActive" #status>
        <div
          class="p-sm border rounded-md border-border-divider w-full flex-col justify-between items-center gap-sm"
        >
          <div class="flex justify-between w-full items-center px-3xl">
            <span
              class="rounded-circle w-lg h-lg bg-positive flex justify-center items-center"
              :class="
                data?.status === PayoutStatusEnum.DeActive
                  ? 'bg-[#747481]'
                  : 'bg-green-500 border-border-success border'
              "
            >
              <ui-icon v-if="isActiveStatus" name="TickSmall" class="text-surface" />
            </span>
            <div class="border border-border-divider border-dashed flex-grow h-[1px]" />
            <span
              class="rounded-circle w-lg h-lg bg-positive flex justify-center items-center"
              :class="
                isActiveOrDeactiveStatus
                  ? 'bg-surface-soft'
                  : 'bg-green-500 border-border-success border'
              "
            >
              <ui-icon
                v-if="data?.status === PayoutStatusEnum.ReachedAmount"
                name="TickSmall"
                class="text-surface"
              />
            </span>
            <div class="border border-border-divider border-dashed flex-grow h-[1px]" />
            <span
              class="rounded-circle w-lg h-lg bg-positive flex justify-center items-center"
              :class="
                isPendingShaparack ? 'bg-surface-soft' : 'bg-green-500 border-border-success border'
              "
            >
              <ui-icon v-if="isPaid" name="TickSmall" class="text-surface" />
            </span>
          </div>
          <div class="flex justify-between items-center gap-xs mt-sm px-md">
            <span class="text-caption-400-c1 text-text-soft">{{ $t('payout.filter.ACTIVE') }}</span>
            <span class="text-caption-400-c1 text-text-soft -mr-xs">{{
              $t('_payout.status.PENDING_SHAPARAK')
            }}</span>
            <span class="text-caption-400-c1 text-text-soft">{{
              $t('_payout.status.REACHED_AMOUNT')
            }}</span>
          </div>
        </div>
      </template>
    </SharedReceipt>
  </div>
</template>
<script setup lang="ts">
import { PayoutStatusEnum } from '@/graphql/graphql';
definePageMeta({
  name: 'receipt_payout',
  layout: 'receipt',
  public: true,
});
useSeoMeta({ robots: 'noindex' });
const { data } = usePayoutReceipt();
const { toJalali } = useDate();
const t = useI18n();
const { statusHandler } = usePayoutFilter();
useHead({
  title: t('_helper.receipt.title'),
});
const isActive = computed(
  () =>
    data?.value?.status !== PayoutStatusEnum.Reject &&
    data?.value?.status !== PayoutStatusEnum.RejectReversed
);
const isActiveStatus = computed(
  () =>
    data?.value?.status === PayoutStatusEnum.PendingShaparak ||
    data?.value?.status === PayoutStatusEnum.ReachedAmount
);
const isActiveOrDeactiveStatus = computed(
  () =>
    data?.value?.status === PayoutStatusEnum.DeActive ||
    data?.value?.status === PayoutStatusEnum.Active
);
const isPendingShaparack = computed(
  () =>
    data?.value?.status === PayoutStatusEnum.DeActive ||
    data?.value?.status === PayoutStatusEnum.Active ||
    data?.value?.status === PayoutStatusEnum.PendingShaparak
);
const isPaid = computed(
  () =>
    data?.value?.status === PayoutStatusEnum.ReachedAmount ||
    data?.value?.status === PayoutStatusEnum.Paid
);
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
    value: data?.value?.tracking_id,
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
  {
    label: t('common.table.description'),
    value: data?.value?.description,
  },
]);
const receiptRef = ref();
const status = computed(() => data?.value?.status && statusHandler(data?.value?.status));
</script>
