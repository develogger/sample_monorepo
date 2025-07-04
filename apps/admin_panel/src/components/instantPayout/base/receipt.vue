<template>
  <div>
    <ui-Modal
      :text="$t('_common.modal.reconcile_details')"
      close-icon
      class="w-full lib-view lg:max-w-[30rem] !h-[unset] max-h-[800px] pb-xs"
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
                :text="statusHandler(data?.status as unknown as InstantPayoutStatusEnum).text"
                :type="statusHandler(data?.status as unknown as InstantPayoutStatusEnum).type"
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
              {{ $t('_common.table.reconcile_id') }}
            </div>
            <div class="text-body-400-b2 text-text">
              {{ data?.id }}
            </div>
          </div>
          <!-- reference id -->
          <div class="flex justify-between p-md border-b border-border-divider">
            <div class="text-text-soft text-body-400-b3 font-medium">
              {{ $t('_common.table.reference_id') }}
            </div>
            <div class="text-body-400-b2 text-text">
              {{ data?.reference_id }}
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
        <!-- time of deposit -->
        <div class="flex justify-between p-md border border-border-divider rounded-sm my-xl">
          <div class="text-text-soft text-body-400-b3 font-medium">
            {{ $t('_common.date.timeOfDeposit') }}
          </div>
          <div class="text-body-400-b2 text-text">
            <div v-if="data?.method === InstantPayoutMethodEnum.Ach" class="flex gap-xs">
              <ui-Label type="neutral" :text="$t('_common.billing.paya')" size="small" />
              <span>{{ $t('_common.billing.paya_cycle') }}</span>
            </div>
            <div v-if="data?.method === InstantPayoutMethodEnum.Internal" class="flex gap-xs">
              <ui-Label type="neutral" :text="$t('_common.billing.satna')" size="small" />
              <span>{{ $t('_common.billing.satna_cycle') }}</span>
            </div>
            <div v-if="data?.method === InstantPayoutMethodEnum.C2C" class="flex gap-xs">
              <ui-Label type="neutral" :text="$t('_common.billing.c2c')" size="small" />
              <span>{{ $t('_common.billing.c2c_cycle') }}</span>
            </div>
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
import { useInstantFilter } from '@/composables/instant-payout/useInstantFilter';
import {
  InstantPayoutType,
  InstantPayoutStatusEnum,
  InstantPayoutMethodEnum,
} from '@/graphql/graphql';

export interface Props {
  data: InstantPayoutType | undefined;
}

const props = withDefaults(defineProps<Props>(), {});
const { data } = toRefs(props);
defineEmits(['close']);
const { statusHandler } = useInstantFilter();
const { numberFormat } = useMath();
const { toJalali } = useDate();
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
