<template>
  <div>
    <ui-InlineMessage class="mb-md mt-xs" type="neutral">
      <template #description>
        <div class="alert-box pr-xs" dir="rtl">
          <p
            class="alert-box__description before:content-[''] before:absolute right-[1px] before:rounded-circle before:bg-black-100 before:w-[3px] before:h-[3px] before:mt-[9px] before:mr-[-8px]"
          >
            {{ $t('_form.add_instant_payout.alert1') }}
          </p>
          <p
            class="alert-box__description before:content-[''] before:absolute right-[1px] before:rounded-circle before:bg-black-100 before:w-[3px] before:h-[3px] before:mt-[9px] before:mr-[-8px]"
          >
            {{ $t('_form.add_instant_payout.alert2') }}
          </p>
          <p
            class="alert-box__description before:content-[''] before:absolute right-[1px] before:rounded-circle before:bg-black-100 before:w-[3px] before:h-[3px] before:mt-[9px] before:mr-[-8px]"
          >
            {{ $t('_form.add_instant_payout.alert3') }}
          </p>
        </div>
      </template>
    </ui-InlineMessage>
    <div class="details">
      <div class="details__sidebar relative">
        <div class="details__sidebar__fixed-head">
          <ui-Card>
            <template #header>
              <div dir="rtl">{{ $t('_common.amount.summary_settlement') }}</div>
            </template>
            <template #main>
              <div class="mt-xl">
                <ui-Summary :items="summaryItems" :loading="inquiryLoading" />
              </div>
              <ui-Divider height="20" class="my-xl" />
              <!-- bank cycles -->
              <div v-if="inquiryLoading" class="rtl">
                <ui-Skeleton :width="200" :height="30" class="mt-sm" />
                <ui-Skeleton :height="30" full-width class="mt-sm" />
                <ui-Skeleton :width="200" :height="30" class="mt-sm" />
              </div>
              <div v-else class="text-right w-full gap-xs" dir="rtl">
                <div
                  v-if="instantPayoutInquiryBanknames.length"
                  class="flex items-center gap-[3px]"
                >
                  <p class="button-500-bt1 inline">
                    {{ $t('_common.billing.instant_banks') }}
                  </p>
                  <ui-Tooltip :content="instantBanksTooltipTitle" position="top" :max-width="280">
                    <ui-Icon
                      name="InfoFill"
                      class="flex items-center text-text-soft cursor-pointer"
                      style="font-size: 16px"
                    />
                  </ui-Tooltip>
                </div>
                <div class="mt-sm mb-sm">
                  <div
                    v-for="(bankItem, index) in instantPayoutInquiryBanknames"
                    :key="index"
                    :class="bankStatusClass(bankItem as string)"
                    class="details__logo-wrapper"
                  >
                    <ui-BankLogo :name="capitalize(bankItem as string)" class="w-md h-md" />
                  </div>
                </div>
                <div class="text-body-400-b3 text-text-soft flex-none">
                  {{ $t('_common.date.timeOfDeposit') }}:
                  <ui-Label
                    v-if="showSatnaPayaLabel"
                    type="informative"
                    :text="$t('_common.billing.satna_paya_cycle')"
                    size="small"
                  />
                  <ui-Label
                    v-else-if="showSummery && inquiry?.type === InstantPayoutTypeEnum.Internal"
                    type="positive"
                    :text="$t('_common.billing.instant_cycle')"
                    size="small"
                  />
                  <span v-else class="text-body-500-b3 text-text">{{
                    $t('_common.billing.null_cycle')
                  }}</span>
                </div>
              </div>
            </template>
          </ui-Card>
        </div>
      </div>
      <div class="details__container">
        <div class="space-y-md">
          <!-- bank account -->
          <ui-Card>
            <template #header>
              <div dir="rtl">
                <div class="details__container__account__title">
                  {{ $t('_form.add_payout.bank_account_settlement_title') }}
                </div>
              </div>
            </template>
            <template #main>
              <SharedBankAccountHeader />
            </template>
          </ui-Card>
          <!-- amount box -->
          <ui-Card>
            <template #header>
              <div dir="rtl">
                <div class="details__container__account__title">
                  {{ $t('_common.filters.amount') }}
                </div>
                <div
                  :class="[
                    inquiry?.max_amount ? 'details__container__account__description' : 'mt-xl',
                  ]"
                >
                  <ui-Skeleton v-if="inquiryLoading" :loading="inquiryLoading" />
                  <div v-else-if="inquiry?.max_amount">
                    {{
                      $t('_form.add_payout.max_amount', {
                        amount: numberFormat(inquiry?.max_amount),
                      })
                    }}
                    {{ $t('_common.currency.rial') }}
                  </div>
                  <ui-Button
                    v-if="inquiry?.max_amount >= config.public.instantPayoutMinAmount"
                    variant="text"
                    :text="$t('_common.amount.harvesting_all_inventory')"
                    class="flex -ml-xs"
                    @click="amountValue = numberFormat(inquiry?.max_amount)"
                  />
                </div>
                <div>
                  <ui-InlineMessage
                    v-if="inquiry?.max_amount < config.public.instantPayoutMinAmount"
                    type="warning"
                    :title="$t('_common.amount.inadequate_creature')"
                    :description="
                      $t('_form.add_payout.minimum_amount', {
                        amount: numberFormat(config.public.instantPayoutMinAmount),
                        section: t('_common.page_title.instant_payout'),
                      })
                    "
                  />
                </div>
              </div>
            </template>
            <template #main>
              <ui-TextField
                v-if="inquiry?.max_amount >= config.public.instantPayoutMinAmount || !inquiry"
                v-model="amountValue"
                :loading="formLoading"
                class="w-full"
                amount
                is-number
                :max-length="10"
                name="amount"
                :disabled="!selectedBankAccountId"
                :helper="{
                  type: !!errors?.amount ? 'error' : undefined,
                  message: errors?.amount,
                }"
                :placeholder="$t('_common.filters.amount')"
                :unit="t('_common.currency.rial')"
              />
              <div class="details__container__account__subtitle" dir="rtl">
                {{ $t('_form.add_instant_payout.fee_amount_description') }}
              </div>
            </template>
          </ui-Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { capitalize } from 'lodash';
import { storeToRefs } from 'pinia';
import { InstantPayoutTypeEnum } from '@/graphql/graphql';
import { useInstancePayoutInquiry } from '@/composables/instant-payout/useInstantDetails';
import { useInstantPayoutInquiryBanks } from '@/composables/instant-payout/useInstantPayoutInquiryBanks';

const config = useRuntimeConfig();
const t = useI18n();
const store = useBankAccountStore();
const { selectedBankAccountId } = storeToRefs(store);
const { refetch, data: inquiry, loading: inquiryLoading } = useInstancePayoutInquiry();
const { refetch: refetchInquiryBanks, data: inquiryBanks } = useInstantPayoutInquiryBanks();
const instantPayoutInquiryBanknames = computed(() => {
  const banks = inquiryBanks.value?.banks;
  function isNotNull<T>(value: T | null | undefined): value is T {
    return value != null;
  }
  const bankNames = (banks ?? []).filter(isNotNull).reduce<string[]>((acc, bank) => {
    if (bank.status === 'HIGH_BALANCE' || bank.status === 'LOW_BALANCE') {
      acc.push(bank.bank_name as string);
    }

    return acc;
  }, []);

  store.instantBanksList = bankNames as string[];

  return bankNames;
});
const formLoading = inject('form_loading');
const resetForm = inject('form_reset');
const errors:
  | globalThis.ComputedRef<Partial<Record<'amount' | 'iban', string | undefined>>>
  | undefined = inject('form_errors');
const { numberFormat } = useMath();
const amountValue = ref('');
const instantBanksTooltipTitle = ref(
  t('_common.billing.instant_bank_note_1') + ' ' + t('_common.billing.instant_bank_note_2')
);
const showSatnaPayaLabel = computed(
  () =>
    showSummery.value &&
    (inquiry.value?.type === InstantPayoutTypeEnum.Paya ||
      inquiry.value?.type === InstantPayoutTypeEnum.Satna)
);
const showSummery = computed(() => inquiry.value && selectedBankAccountId.value);
const bankStatusClass = (bankName: string) => {
  const banks = inquiryBanks.value?.banks;
  const bank = banks?.find(item => item?.bank_name === bankName);
  if (!bank?.status) {
    return '';
  }

  return bank?.status === 'HIGH_BALANCE'
    ? 'details__logo-wrapper-high'
    : 'details__logo-wrapper-low';
};
// calculate fee amount
const impure = computed(() => {
  const amount = amountValue.value && +amountValue.value.replace(/[^\d]/g, '');
  const fee = inquiry.value?.fixed_fee_amount || 0;
  const feePercent = inquiry.value?.fee_percent || 0;

  if (amount) {
    return (amount * (feePercent / 100) + fee).toFixed(0);
  }

  return 0;
});
// calculate total pay for inquiry
const total = computed(() => {
  const amount = +amountValue.value?.replace(/[^\d]/g, '');

  return +amount + +impure.value;
});
const handleLabel = computed(
  () =>
    `${inquiry && inquiry.value?.fee_percent}%  + ${numberFormat(
      inquiry.value?.fixed_fee_amount
    )} ${t('_common.currency.rial')}`
);
// list of summary items
const summaryItems = computed(() => [
  {
    id: 1,
    title: t('_common.amount.amount_deposit_account'),
    value: `${
      +amountValue.value?.replace(/\D/g, '') <= 5000000000 &&
      +amountValue.value?.replace(/\D/g, '') >= 1000000
        ? amountValue.value
        : 0
    } ${t('_common.currency.rial')} `,
    class: '!text-body-400-b2',
  },
  {
    id: 2,
    title: t('_common.amount.fee'),
    value: showSummery.value
      ? `${numberFormat(impure.value)} ${t('_common.currency.rial')}`
      : t('_form.add_instant_payout.select_bank_account'),
    icon: showSummery.value ? 'InfoFill' : '',
    description: handleLabel.value,
    class: showSummery.value ? '' : 'text-body-400-b3 text-text-soft',
  },
  {
    id: 3,
    title: t('_common.amount.total'),
    value: `${numberFormat(total.value)} ${t('_common.currency.rial')}`,
  },
]);
const fetchingData = () => {
  if (selectedBankAccountId.value) {
    refetch({ bank_account_id: selectedBankAccountId.value });
    refetchInquiryBanks();
  }
};
watch(selectedBankAccountId, newVal => {
  fetchingData();
  if (!newVal) {
    typeof resetForm === 'function' && resetForm();
  }
});
onMounted(() => {
  store.modalType = 'instantPay';
});
onUnmounted(() => {
  store.modalType = 'noramal';
  store.selectedBankaccount = [];
  store.selectedBankAccountId = undefined;
});
</script>
<style lang="scss" scoped>
.details {
  @apply flex justify-between gap-md relative flex-col-reverse xl:flex-row;
  &__sidebar {
    @apply w-full xl:min-w-[293px] relative flex-1;
    &__fixed-head {
      @apply xl:sticky top-[136px] w-full;
    }
  }
  &__container {
    @apply w-full xl:w-2/3;
    &__account {
      &__title {
        @apply text-heading-600-h2;
      }
      &__description {
        @apply text-body-400-b3 text-text-soft my-xl flex justify-between;
      }
      &__description--bank {
        @apply text-body-400-b3 text-text-soft my-xl justify-between;
      }
      &__subtitle {
        @apply text-body-400-b3 text-text-soft text-right mt-xl;
      }
    }
  }

  &__logo-wrapper {
    @apply min-h-[24px] min-w-[24px] max-h-[24px] inline-flex justify-center items-center border relative border-border-soft rounded-sm bg-surface-soft mr-[5px] ml-[5px];

    &::after {
      content: '';
      @apply absolute top-[-4px] right-[-4px] rounded-circle w-[8px] h-[8px];
    }
  }
  &__logo-wrapper-high {
    &::after {
      @apply bg-green-500;
    }
  }
  &__logo-wrapper-low {
    &::after {
      @apply bg-yellow-200;
    }
  }
}
</style>
