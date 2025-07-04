<template>
  <div>
    <ui-InlineMessage class="mb-md mt-xs" type="neutral">
      <template #description>
        <div class="alert-box pr-xs" dir="rtl">
          <p
            class="alert-box__description before:content-[''] before:absolute right-[1px] before:rounded-circle before:bg-black-100 before:w-[3px] before:h-[3px] before:mt-[9px] before:mr-[-8px]"
          >
            {{ $t('_form.add_payout.alert1') }}
          </p>
          <p
            class="alert-box__description before:content-[''] before:absolute right-[1px] before:rounded-circle before:bg-black-100 before:w-[3px] before:h-[3px] before:mt-[9px] before:mr-[-8px]"
          >
            {{ $t('_form.add_payout.alert2') }}
          </p>
        </div>
      </template>
    </ui-InlineMessage>
    <div class="details">
      <div class="details__sidebar">
        <div class="details__sidebar__fixed-head">
          <ui-Card>
            <template #header>
              <div dir="rtl">
                {{ $t('_common.amount.summary_settlement') }}
              </div>
            </template>
            <template #main>
              <div class="mt-xl">
                <ui-Summary :items="summaryItems" />
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
                <div class="details__container__account__description">
                  {{ $t('_form.add_payout.bank_account_settlement_description') }}
                </div>
                <SharedBankAccountHeader :selected-bank-account="selectedBankaccount" />
              </div>
            </template>
          </ui-Card>
          <!-- amount box -->
          <ui-Card>
            <template #header>
              <div dir="rtl">
                <div class="details__container__account__title">
                  {{ $t('_common.filters.amount') }}
                </div>
                <div class="details__container__account__description">
                  <ui-Skeleton
                    v-if="inquiryLoading || loading"
                    :loading="inquiryLoading || loading"
                  />
                  <div v-else>
                    {{ $t('_form.add_payout.max_amount') }}
                    <span class="text-text mr-xs font-medium">
                      {{ numberFormat(inquiryData?.max_amount) }}
                      {{ $t('_common.currency.rial') }}
                    </span>
                  </div>

                  <ui-Button
                    v-if="inquiryData?.max_amount >= config.public.payoutMinAmount && !payout?.id"
                    variant="text"
                    :text="$t('_common.amount.harvesting_all_inventory')"
                    class="flex -ml-xs"
                    @click="amountValue = numberFormat(inquiryData?.max_amount)"
                  />
                </div>
                <div>
                  <ui-InlineMessage
                    v-if="inquiryData?.max_amount < config.public.payoutMinAmount"
                    type="warning"
                    :title="$t('_common.amount.inadequate_creature')"
                    :description="
                      $t('_form.add_payout.minimum_amount', {
                        amount: numberFormat(config.public.payoutMinAmount),
                        section: t('_common.page_title.payout'),
                      })
                    "
                  />
                </div>
              </div>
            </template>
            <template #main>
              <ui-TextField
                v-if="inquiryData?.max_amount >= config.public.payoutMinAmount"
                v-model="amountValue"
                :disabled="formLoading || payout?.id"
                :loading="formLoading || inquiryLoading || loading"
                class="w-full"
                amount
                is-number
                :max-length="10"
                name="amount"
                :helper="{
                  type: !!errors?.amount ? 'error' : undefined,
                  message: errors?.amount,
                }"
                :placeholder="$t('_common.filters.amount')"
                :unit="t('_common.currency.rial')"
              />
              <div class="details__container__account__subtitle" dir="rtl">
                {{ $t('_form.add_payout.fee_amount_description') }}
              </div>
            </template>
          </ui-Card>
          <!-- content box -->
          <ui-Card>
            <template #header>
              <div dir="rtl" class="mb-xl">
                <div class="details__container__account__title">
                  {{ $t('_common.table.description') }}
                </div>
              </div>
            </template>
            <template #main>
              <ui-Textarea
                v-model="description"
                :disabled="formLoading || payout?.id"
                :loading="formLoading || inquiryLoading || loading"
                name="content"
                :placeholder="$t('_common.table.description')"
                :helper="{
                  type: !!errors?.content ? 'error' : undefined,
                  message: errors?.content,
                }"
              />
            </template>
          </ui-Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePayoutDetails } from '../../../composables/payout/usePayoutDetails';
import { PayoutType } from '@/graphql/graphql';
import { useBankAccountStore } from '@/stores/bankAccountStore';

const store = useBankAccountStore();
const { selectedBankaccount } = storeToRefs(store);
const t = useI18n();
const config = useRuntimeConfig();
const { numberFormat } = useMath();
const { inquiryGetData } = usePayoutDetails();
const { data: inquiryData, loading: inquiryLoading, refetch } = inquiryGetData();
const formLoading = inject('form_loading');
const loading = inject('inquiry_loading');
const payout = inject<Ref<PayoutType>>('data');
const amountValue = ref('');
const description = ref('');
const showBankAccount = ref<boolean>(false);
const errors:
  | globalThis.ComputedRef<Partial<Record<'amount' | 'iban' | 'content', string | undefined>>>
  | undefined = inject('form_errors');
// calculate fee amount
const impure = computed(() => {
  const amount = +amountValue.value?.replace(/[^\d]/g, '');
  if (!amount) {
    return 0;
  }
  const amountWithFee = Number(amount * (Number(inquiryData.value?.fee_percent) / 100));
  let impureFinal = 0;
  if (amountWithFee >= inquiryData.value?.max_fee_amount) {
    impureFinal = inquiryData.value?.max_fee_amount + inquiryData.value?.fixed_fee_amount;
  }
  if (amountWithFee < inquiryData.value?.max_fee_amount) {
    impureFinal = amountWithFee + inquiryData.value?.fixed_fee_amount;
  }

  return impureFinal;
});
// calculate total pay for inquiry
const total = computed(() => {
  if (amountValue?.value === null) {
    return 0;
  }
  const amount = +amountValue?.value?.replace(/[^\d]/g, '');

  if (isNaN(amount)) {
    return 0;
  }

  return +amount + +impure.value;
});
const summaryItems = computed(() => {
  if (!inquiryLoading.value) {
    return [
      {
        id: 1,
        title: t('_common.amount.amount_deposit_account'),
        value: `${amountValue.value || 0} ${t('_common.currency.rial')} `,
        class: '!text-body-400-b2',
      },
      {
        id: 2,
        title: t('_common.amount.fee'),
        value: `${numberFormat(impure.value)} ${t('_common.currency.rial')}`,
        icon: 'InfoFill',
        description: `${inquiryData && inquiryData.value?.fee_percent}% + ${numberFormat(
          inquiryData.value?.fixed_fee_amount
        )} ${t('_common.currency.rial')}`,
      },
      {
        id: 3,
        title: t('_common.amount.total'),
        value: `${numberFormat(total.value)} ${t('_common.currency.rial')}`,
      },
    ];
  }

  return [];
});
const toggleModal = () => {
  showBankAccount.value = !showBankAccount.value;
};
onMounted(() => {
  refetch();
  store.selectedBankAccountId = '';
  store.selectedBankaccount = [];
});
watch(
  () => payout?.value,
  () => {
    if (!payout?.value) {
      return;
    }
    amountValue.value = numberFormat(payout?.value.amount);
    description.value = payout?.value.description as string;
  }
);
provide('toggleModal', toggleModal);
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
    @apply w-full;
    &__account {
      &__title {
        @apply text-heading-600-h2;
      }
      &__description {
        @apply text-body-400-b3 text-text-soft my-xl flex justify-between;
      }
      &__subtitle {
        @apply text-body-400-b3 text-text-soft text-right mt-xl;
      }
    }
  }
}
</style>
