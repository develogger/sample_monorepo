<template>
  <div>
    <ui-Modal
      :text="$t('_common.modal.payout_details')"
      close-icon
      width="480px"
      class="w-full max-h-[88vh] pb-md"
      @close="$emit('close')"
    >
      <template #body>
        <div class="border border-border-divider rounded-sm">
          <!-- status -->
          <div class="flex justify-between p-md border-b border-border-divider">
            <div class="text-text-soft text-body-400-b3 font-medium">
              {{ $t('_common.table.status') }}
            </div>
            <div>
              <ui-Status
                :text="statusHandler(data?.status as unknown as PayoutStatusEnum).text"
                :type="statusHandler(data?.status as unknown as PayoutStatusEnum).type"
              />
            </div>
          </div>
          <!-- pension amount -->
          <div class="flex justify-between p-md border-b border-border-divider">
            <div class="text-text-soft text-body-400-b3 font-medium">
              {{ $t('_common.amount.pension_amount') }}
            </div>
            <div class="text-body-400-b2 text-text">
              {{ data?.amount }}
              {{ $t('_common.currency.rial') }}
            </div>
          </div>
          <!-- fee -->
          <div class="flex justify-between p-md border-b border-border-divider">
            <div class="text-text-soft text-body-400-b3 font-medium">
              {{ $t('_common.amount.fee') }}
            </div>
            <div>
              <div class="text-body-400-b2 text-text">
                {{ data?.fee }}
                {{ $t('_common.currency.rial') }}
              </div>
            </div>
          </div>
          <!-- total settlement -->
          <div class="flex justify-between p-md border-b border-border-divider">
            <div class="text-text-soft text-body-400-b3 font-medium">
              {{ $t('_common.amount.total_settlement') }}
            </div>
            <div class="text-body-400-b2 text-text">
              {{ sum }}
              {{ $t('_common.currency.rial') }}
            </div>
          </div>
          <!-- reconcile id -->
          <div class="flex justify-between p-md border-b border-border-divider">
            <div class="text-text-soft text-body-400-b3 font-medium">
              {{ $t('_common.table.reference_session_id') }}
            </div>
            <div class="text-body-400-b2 text-text">
              {{ data?.url_code }}
            </div>
          </div>
          <!-- create date -->
          <div class="flex justify-between p-md border-b border-border-divider">
            <div class="text-text-soft text-body-400-b3 font-medium">
              {{ $t('_common.date.created_at') }}
            </div>
            <div class="text-body-400-b2 text-text">
              {{ convertDate(data?.created_at) }}
            </div>
          </div>
          <!-- settlement date -->
          <div class="flex justify-between p-md border-border-divider">
            <div class="text-text-soft text-body-400-b3 font-medium">
              {{ $t('_common.date.settlement_date') }}
            </div>
            <div class="text-body-400-b2 text-text">
              {{ convertDate(data?.reconciled_at) }}
            </div>
          </div>
        </div>
        <!-- description -->
        <div
          class="flex flex-col gap-xs justify-between p-md border border-border-divider rounded-sm mt-xl"
        >
          <div class="text-text-soft text-body-400-b3 font-medium">
            {{ $t('_common.table.description') }}
          </div>
          <div class="text-body-400-b2 text-text">
            {{ data?.description }}
          </div>
        </div>
        <!-- bank card -->
        <ui-Bankcard
          :logo="data?.bank_account?.issuing_bank?.slug"
          :iban="data?.bank_account?.iban"
          :description="data?.bank_account?.holder_name"
          class="mt-xl"
        />
      </template>
    </ui-Modal>
  </div>
</template>

<script setup lang="ts">
import { usePayoutFilter } from '@/composables/payout/usePayoutFilter';
import { PayoutStatusEnum, PayoutType } from '@/graphql/graphql';

export interface Props {
  data: PayoutType | undefined;
}

const props = withDefaults(defineProps<Props>(), {});
const { data } = toRefs(props);
const { toJalali } = useDate();
defineEmits(['close']);
const { statusHandler } = usePayoutFilter();
const { numberFormat } = useMath();
const convertDate = (val: string) => {
  if (val) {
    return toJalali(
      val,
      'jDD jMMMM jYYYY, HH:mm',
      'jDD jMMMM jYYYY, HH:mm',
      'jDD jMMMM jYYYY, HH:mm',
      'jDD jMMMM jYYYY, HH:mm'
    );
  }

  return '_';
};
const sum = computed(() => {
  const total =
    parseFloat(data?.value?.amount.replace(/\D/g, '')) +
    parseFloat(data.value?.fee.replace(/\D/g, ''));

  return numberFormat(total);
});
</script>
