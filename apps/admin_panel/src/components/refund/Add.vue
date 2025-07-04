<template>
  <ui-Modal
    v-if="show"
    close-icon
    width="480px"
    header
    :text="$t('_form.add_refund.title')"
    @close="handleToggle"
  >
    <template #body>
      <div class="zpl-balance">
        <ui-Skeleton v-if="loadingBalance" :loading="loadingBalance" :width="40" class="mt-2xs" />
        <div v-else class="zpl-balance-title">
          {{ $t('_form.add_refund.balance') }}
          <ui-Tooltip :content="$t('_form.add_refund.balance')" class="flex">
            <ui-Icon name="Reload" class="cursor-pointer" @click="getBalance()" />
          </ui-Tooltip>
        </div>
        <div class="flex items-center gap-sm">
          <div class="zpl-balance-amount">
            <span v-if="!loadingBalance" dir="ltr">{{ formattedAmountBalance }}</span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mr-xs" />
          </div>
          <ui-Tooltip :content="$t('_form.add_refund.increase')">
            <ui-Button
              icon="Plus"
              size="small"
              type="light"
              target="_blank"
              class="relative"
              :loading="loadingBalance"
              @click="increaseBalance"
            />
          </ui-Tooltip>
        </div>
      </div>
      <div class="text-body-400-b3 text-text-soft mt-xl mb-md">
        {{ $t('_form.add_refund.amount') }}
      </div>

      <div class="lg:flex md:flex items-center gap-md w-full sm:mb-md xs:mb-md" dir="ltr">
        <ui-RadioCard
          v-model="refundAmount"
          class="lg:w-1/2 md:w-1/2 sm:w-full sm:mb-md xs:mb-md"
          :tabindex="2"
          val="optional"
          :label="$t('_form.add_refund.optianal')"
          :description="$t('_form.add_refund.refundOfAmout')"
          name="refund"
          @click="focusOnAmount"
        />
        <ui-RadioCard
          v-model="refundAmount"
          class="lg:w-1/2 md:w-1/2 sm:w-full sm:mb-md xs:mb-md"
          :tabindex="1"
          val="all"
          :label="$t('_form.add_refund.all')"
          :description="formattedAllAmount"
          name="refund"
          @click="getAmount"
        />
      </div>
      <div v-if="refundAmount === 'optional'" dir="ltr" class="mt-sm">
        <ui-TextField
          v-model="amount"
          class="w-full"
          amount
          name="amount"
          is-number
          :placeholder="$t('_common.filters.amount')"
          :unit="t('_common.currency.rial')"
          :helper="{
            type: !!errors?.amount ? 'error' : undefined,
            message: errors?.amount,
          }"
        />
        <p class="text-caption-400-c1 text-text-soft py-md" dir="rtl">
          {{ $t('_form.add_refund.guid', { amount: formattedAllAmount }) }}
        </p>
      </div>
      <div v-if="!loadingBalance && allAmount > amountBalance && refundAmount === 'all'">
        <ui-InlineMessage
          :title="$t('_form.add_refund.warningTitle')"
          :description="$t('_form.add_refund.warningDescription')"
          type="warning"
        />
      </div>
      <div class="mb-xl mt-md">
        <p class="text-body-400-b3 text-text-soft mb-md">
          {{ $t('refund.summeryTitle') }}
        </p>
        <ui-Summary dir="ltr" :loading="loadingInquery" :items="summaryItems" />
      </div>
      <div dir="ltr">
        <ui-Select
          :disabled="loadingAdd"
          class="w-full"
          :data="dropdownOptions"
          name="reason"
          after-icon="AngleDown"
          :placeholder="$t('refund.reason')"
          :value="reasonValue"
          :helper="{
            type: !!errors?.reason ? 'error' : undefined,
            message: errors?.reason,
          }"
          @selected-item="selectReasonVal"
        />
      </div>

      <ui-Textarea
        v-model="description"
        auto-focus
        dir="ltr"
        class="w-full float-right mt-xl"
        :max-length="1000"
        name="description"
        :placeholder="$t('_common.table.description')"
        :helper="{
          type: !!errors?.description ? 'error' : undefined,
          message: errors?.description,
        }"
      />
    </template>
    <template #leftFooter>
      <form dir="rtl" @submit.prevent="">
        <ui-Button
          size="medium"
          class="inline-flex main__item--button"
          type="secondary"
          :text="$t('common.cancel')"
          @click="handleToggle"
        />
        <ui-Button
          class="inline-flex mr-xs main__item--button"
          size="medium"
          type="primary"
          :text="$t('_form.add_refund.save')"
          :loading="loadingAdd"
          :disabled="!meta?.valid"
          @click="onSubmit()"
        />
      </form>
    </template>
  </ui-Modal>
</template>
<script lang="ts" setup>
import { useRefundMutation } from '@/composables/refund/useRefundMutation';
import { useRefundQuery } from '@/composables/refund/useRefundQuery';
import { useRefundSchema } from '@/composables/refund/useRefundSchema';
import { useUserIdQuery } from '@/composables/user/useUserIdQuery';
import { userPayoutBalanceQuery } from '@/composables/user/userPayoutBalanceQuery';
import { SessionType, MutationAddRefundArgs } from '@/graphql/graphql';
import type { RefundMethodType } from '@/types/refundTypes';
const { numberFormat } = useMath();
const { data: userData } = useUserIdQuery();
const method = ref<RefundMethodType>('PAYA');
const {
  data: refundInqueryData,
  loading: loadingInquery,
  // refetch: refundInqueryRefetch,
  load: refundInqueryLoad,
} = useRefundQuery(method.value);
const refundAmount = ref('all');
const config = useRuntimeConfig();
export interface Props {
  show?: boolean;
  sessionData: SessionType;
}
const { $notify } = useNuxtApp();
const props = withDefaults(defineProps<Props>(), {});
const { show, sessionData } = toRefs(props);
const t = useI18n();
const amount = ref<string>('');
const showBalanceAll = ref(true);
const dropdownOptions = [
  {
    title: t('refund.DUPLICATE_TRANSACTION'),
    id: 'DUPLICATE_TRANSACTION',
  },
  {
    title: t('refund.SUSPICIOUS_TRANSACTION'),
    id: 'SUSPICIOUS_TRANSACTION',
  },
  {
    title: t('refund.CUSTOMER_REQUEST'),
    id: 'CUSTOMER_REQUEST',
  },

  {
    title: t('refund.OTHER'),
    id: 'OTHER',
  },
];
const route = useRoute();
const { data, loading: loadingBalance, refetch } = userPayoutBalanceQuery();
const getBalance = () => {
  refetch();
};
// We may want to use this method later
// const selectedMethod = (value: RefundMethodType) => {
//   method.value = value;
//   refundInqueryRefetch({ method: method.value });
// };
// selectedMethod('PAYA');
const increaseBalance = () => {
  if (userData?.value && userData?.value.personal_link?.domain === route.params.terminal) {
    window.open(`https://${route.params.terminal}`, '_blank');
  } else {
    window.open(`${config.public.short_link}${route.params.terminal}`, '_blank');
  }
};
const FeeValue = ref<string>('');
const fee = computed({
  get() {
    if (refundAmount.value === 'all') {
      FeeValue.value = numberFormat(
        refundInqueryData?.value &&
          refundInqueryData?.value.base_fee +
            (Math.ceil(Number(sessionData?.value.amount) / refundInqueryData?.value.step_amount) -
              1) *
              refundInqueryData?.value.step_fee
      );
    }
    if (refundAmount.value === 'optional' && !amount.value) {
      FeeValue.value = '0';
    }
    if (
      refundAmount.value === 'optional' &&
      amount.value &&
      amount.value !== '0' &&
      amount.value !== '00'
    ) {
      FeeValue.value = numberFormat(
        refundInqueryData?.value &&
          refundInqueryData?.value.base_fee +
            (Math.ceil(
              Number(amount.value.replace(/[^\d]/g, '')) / refundInqueryData?.value.step_amount
            ) -
              1) *
              refundInqueryData?.value.step_fee
      );
    }

    return FeeValue.value;
  },
  set(newVal: string) {
    FeeValue.value = newVal;
  },
});
const sum = computed(() => {
  if (refundAmount.value === 'all' && fee.value) {
    return numberFormat(sessionData?.value.amount + parseInt(fee.value.replace(/[^\d]/g, '')));
  }
  if (refundAmount.value === 'optional' && !amount.value) {
    return 0;
  }
  if (refundAmount.value === 'optional' && amount.value && fee.value) {
    return numberFormat(
      parseInt(amount.value.replace(/[^\d]/g, '')) + parseInt(fee.value.replace(/[^\d]/g, ''))
    );
  }
});
const summaryItems = computed(() => [
  {
    id: 1,
    title: t('_form.add_refund.amount'),
    value:
      refundAmount.value === 'all'
        ? `${numberFormat(sessionData?.value.amount)}  ${t('_common.currency.rial')} `
        : `${amount.value}  ${t('_common.currency.rial')} `,
  },
  {
    id: 2,
    title: t('_form.add_refund.fee'),

    value: `${fee.value} ${t('_common.currency.rial')}`,
    description: `${t('_common.currency.rial')} `,
  },
  {
    id: 3,
    title: t('_common.amount.total'),
    value: `${sum.value} ${t('_common.currency.rial')}`,
  },
]);
const amountBalance = computed(() => (data.value?.value ? data.value.value : 0));
const formattedAmountBalance = computed(() => numberFormat(amountBalance.value));
const description = ref('');
const reasonValue = ref({
  id: '',
  title: '',
});
onMounted(() => {
  refetch();
});
const toggleModal = inject<(() => void | undefined) | undefined>('toggleModal');
const getAmount = () => {
  showBalanceAll.value = true;
};
const selectReasonVal = (reasonVal: Record<string, string>) => {
  reasonValue.value.id = reasonVal.id;
  reasonValue.value.title = reasonVal.title;
};
const allAmount = computed(() => sessionData?.value.amount);
const formattedAllAmount = computed(
  () => numberFormat(allAmount.value) + ' ' + t('_common.currency.rial')
);
const sessionAmount = computed(() => sessionData?.value && sessionData?.value.amount);
const focusOnAmount = () => {
  showBalanceAll.value = false;
  fee.value = '0';
};
const { schema } = useRefundSchema({ sessionAmount, showBalanceAll });
const { handleSubmit, errors, setFieldError, resetForm, meta } = useForm({
  validationSchema: schema,
});
type validateType = 'reason' | 'amount' | 'description';
const { snakeToCamel } = useSnakeToCamel();
const { refundAdd } = useRefundMutation();
const {
  mutate,
  loading: loadingAdd,
  onDone,
} = refundAdd((input, message, params) => {
  setFieldError(snakeToCamel(input) as validateType, t('_validation.' + message, params));
});
const onSubmit = handleSubmit(values => {
  const variables: MutationAddRefundArgs = {
    amount: showBalanceAll.value
      ? sessionAmount.value
      : values.amount && values?.amount.replace(/[^\d]/g, ''),
    description: values.description,
    reason: reasonValue.value.id,
    method: method.value,
    session_id: sessionData?.value.id,
  } as MutationAddRefundArgs;

  mutate(variables);
});
onDone(() => {
  resetForm();
  $notify({
    isRead: false,
    message: t('common.success'),
    type: 'success',
  });
  toggleModal && toggleModal();
});
const handleToggle = () => {
  resetForm();
  reasonValue.value = {
    id: '',
    title: '',
  };
  toggleModal && toggleModal();
};
refundInqueryLoad();
</script>
<style lang="scss" scoped>
.zpl-balance {
  @apply border border-border-divider rounded-sm p-sm flex justify-between items-center;
  @apply dark:border-border-dark-divider;

  &-title {
    @apply text-body-400-b3 text-text-soft font-medium whitespace-nowrap flex items-center gap-xs;
    @apply dark:text-text-dark-soft;

    svg {
      @apply text-primary cursor-pointer;
    }
  }
  &-amount {
    @apply text-text text-heading-600-h3 dark:text-text-dark;
  }
}
</style>
