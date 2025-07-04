<template>
  <ui-Modal
    v-if="show"
    close-icon
    header
    width="480px"
    :text="$t('refund.receipt')"
    @close="modalToggleHandler"
  >
    <template #body>
      <ui-Skeleton v-if="loading" />
      <div class="flex flex-col border border-border-divider rounded-sm">
        <div
          v-for="(item, index) in schemaList"
          :key="item.value"
          class="w-full p-md flex justify-between"
          :class="index !== schemaList.length - 1 ? 'border-b border-border-divider' : ''"
        >
          <span class="text-body-400-b3 text-text-soft">
            {{ $t(item.label) }}
          </span>
          <ui-Status
            v-if="item.status && instantPayout?.status"
            :text="statusHandler(instantPayout.status)?.text"
            :type="statusHandler(instantPayout.status)?.type"
          />
          <span v-else-if="item.currency" class="text-body-400-b2">
            {{ numberFormat(instantPayout?.[item.value as keyof InstantPayoutType] ?? 0) }}
            {{ ' ' + $t('common.rial') }}
          </span>
          <span v-else-if="item.date" class="text-body-400-b2">
            {{ instantPayout && toJalali(instantPayout[item.value as keyof InstantPayoutType]) }}
          </span>
          <span v-else-if="item.value === 'sum'" class="text-body-400-b2">
            {{ numberFormat(instantPayout?.amount + instantPayout?.fee) }}
            {{ ' ' + $t('common.rial') }}
          </span>
          <span v-else class="text-body-400-b2">
            {{ (instantPayout && instantPayout[item.value as keyof InstantPayoutType]) ?? '-' }}
          </span>
        </div>
      </div>
      <div v-if="instantPayout?.bank_account" class="mt-xl">
        <ui-Bankcard
          :logo="
            instantPayout.bank_account.issuing_bank && instantPayout.bank_account.issuing_bank.slug
          "
          :description="instantPayout.bank_account.holder_name"
          :iban="instantPayout.bank_account.iban"
        />
      </div>
    </template>
  </ui-Modal>
</template>
<script lang="ts" setup>
import { RefundType, InstantPayoutType } from '@/graphql/graphql';

export interface Props {
  show?: boolean;
  loading?: boolean;
  data: RefundType;
}
const props = withDefaults(defineProps<Props>(), {});
const { show, loading, data } = toRefs(props);
const t = useI18n();
const { numberFormat } = useMath();
const { toJalali } = useDate();
const emit = defineEmits(['update:show']);
const modalToggleHandler = () => {
  emit('update:show', !show.value);
};
const schemaList = [
  {
    label: '_common.filters.placeholder',
    value: 'type',
    status: true,
  },
  {
    label: 'refund.amount',
    value: 'amount',
    currency: true,
  },
  {
    label: 'common.fee',
    value: 'fee',
    currency: true,
  },
  {
    label: 'common.sum',
    value: 'sum',
  },
  {
    label: 'payout.rrn',
    value: 'reference_id',
  },
  {
    label: 'title.created_at',
    value: 'created_at',
    date: true,
  },
  {
    label: 'title.reconciled_at',
    value: 'reconciled_at',
    date: true,
  },
];
const instantPayout = computed(() => data.value && data.value.instant_payout);
const statusHandler = (status: string) => {
  switch (status) {
    case 'PAID':
      return {
        text: t('_form.add_refund.status.PAID'),
        type: 'positive',
      };
    case 'REVERSED':
      return {
        text: t('_form.add_refund.status.REVERSED'),
        type: 'informative',
      };
    case 'PENDING':
      return {
        text: t('_form.add_refund.status.PENDING'),
        type: 'warning',
      };
    case 'IN_PROGRESS':
      return {
        text: t('_form.add_refund.status.IN_PROGRESS'),
        type: 'warning',
      };

    case 'REJECTED':
      return {
        text: t('_form.add_refund.status.REJECTED'),
        type: 'negative',
      };

    default:
      break;
  }
};
</script>
