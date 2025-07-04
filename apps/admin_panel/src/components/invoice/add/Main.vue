<template>
  <div class="details">
    <!-- sidebar -->
    <div class="details__sidebar">
      <div class="details__sidebar__fixed-head" :class="{ 'xl:mt-xl': fixedPageHeading }">
        <ui-Card>
          <template #header>
            <div dir="rtl" class="font-bold">
              {{ $t('_common.slug.information_method') }}
            </div>
          </template>
          <template #main>
            <div class="mt-xl flex flex-col items-end gap-md">
              <ui-Checkbox
                :loading="formLoading || loading"
                :checked="mobileNotify"
                disabled
                :label="$t('_form.add_invoice.mobile')"
                class="ml-2xs"
                name="mobile_checkbox"
              />
              <ui-Checkbox
                v-if="!!formValues?.email"
                :loading="formLoading || loading"
                :checked="emailNotify"
                :disabled="!formValues?.email"
                :label="$t('_form.add_invoice.email')"
                class="ml-2xs"
                name="email_checkbox"
              />
            </div>
          </template>
        </ui-Card>
      </div>
    </div>
    <div class="details__container">
      <div class="space-y-md">
        <!-- payer -->
        <ui-Card>
          <template #header>
            <div class="text-heading-600-h2 text-right pb-xl">
              <div>{{ $t('_form.add_invoice.payer') }}</div>
            </div>
          </template>
          <template #main>
            <div class="flex flex-col gap-xl items-end">
              <ui-TextField
                class="w-full"
                :disabled="formLoading"
                name="name"
                :helper="{
                  type: !!errors?.name ? 'error' : undefined,
                  message: errors?.name,
                }"
                :loading="loading"
                :model-value="name"
                :placeholder="$t('_form.add_invoice.name')"
              />
              <ui-TextField
                class="w-full lg:w-1/2"
                :disabled="formLoading"
                name="mobile"
                :helper="{
                  type: !!errors?.mobile ? 'error' : 'info',
                  message: errors?.mobile || $t('_form.add_invoice.payer_description'),
                }"
                :loading="loading"
                :model-value="mobile"
                :placeholder="$t('_form.add_invoice.mobile')"
              />
              <ui-TextField
                class="w-full lg:w-1/2"
                :disabled="formLoading"
                name="email"
                :helper="{
                  type: !!errors?.email ? 'error' : 'info',
                  message: errors?.email || $t('_form.add_invoice.email_description'),
                }"
                :loading="loading"
                :model-value="email"
                :placeholder="$t('_form.add_invoice.email')"
              />
            </div>
          </template>
        </ui-Card>
        <!-- amount box -->
        <ui-Card>
          <template #header>
            <div>
              <div class="text-heading-600-h2 text-right">
                {{ $t('_common.amount.amount_payable') }}
              </div>
              <div v-if="!data" class="flex flex-col items-end my-xl gap-xl">
                <ui-TextField
                  v-model="amount"
                  :disabled="formLoading || loading"
                  class="w-full lg:w-1/2"
                  name="amount"
                  amount
                  :unit="t('_common.currency.rial')"
                  :helper="{
                    type: !!errors?.amount ? 'error' : undefined,
                    message: errors?.amount,
                  }"
                />
                <div v-if="!data" class="flex flex-col items-end gap-sm">
                  <div class="text-body-400-b2">
                    {{ $t('_form.add_invoice.bill_count') }}
                  </div>
                  <ui-Radio
                    :loading="formLoading || loading"
                    :label="$t('_form.add_invoice.auto')"
                    :value="BillRadio.AUTO"
                    name="bill"
                    :picked="billRadio"
                    @selected-value="billRadio = BillRadio.AUTO"
                  />
                  <ui-Radio
                    :loading="formLoading || loading"
                    :label="$t('_form.add_invoice.manual')"
                    :value="BillRadio.MANUAL"
                    name="bill"
                    :picked="billRadio"
                    @selected-value="billRadio = BillRadio.MANUAL"
                  />
                  <div
                    v-if="billRadio === BillRadio.AUTO"
                    class="text-body-400-b3 text-text-soft mt-xl"
                    dir="rtl"
                  >
                    {{ $t('_form.add_invoice.payable_description') }}
                  </div>
                  <div v-else class="text-body-400-b3 text-text-soft mt-md" dir="rtl">
                    {{ $t('_form.add_invoice.payable_manual_description') }}
                  </div>

                  <ui-NumberInput
                    v-if="billRadio === BillRadio.MANUAL"
                    :disabled="formLoading || loading"
                    class="w-full lg:w-3/5"
                    :model-value="billAmount"
                    :label="true"
                    :placeholder="$t('_form.add_invoice.bill_count')"
                    :min="1"
                    name="bill_amount"
                    :helper="{
                      type: !!errors?.bill_amount ? 'error' : undefined,
                      message: errors?.bill_amount,
                    }"
                    :stepper="true"
                  />

                  <div v-if="billRadio === BillRadio.MANUAL">
                    <span class="text-body-400-b3 text-text mt-md mx-2xs" dir="rtl">
                      {{ $t('_common.currency.rial') }}
                    </span>
                    <span class="text-body-400-b3 text-text mt-md pr-xs" dir="rtl">
                      {{ numberFormat(calculateBillAmount) }}
                    </span>
                    <span class="text-body-400-b3 text-text-soft mt-md" dir="rtl">
                      {{ $t('_common.amount.bill_amount') }}
                    </span>
                  </div>
                </div>
              </div>
              <!-- exist data merchant type -->
              <div
                v-else
                class="flex w-full border border-border-divider rounded-sm mt-xl"
                dir="rtl"
              >
                <div
                  class="lg:w-1/2 w-full border-l border-border-divider p-md justify-self-end space-y-xs"
                >
                  <div class="text-text-soft font-medium text-body-400-b3">
                    {{ $t('_common.table.total_amount') }}
                  </div>
                  <div class="text-body-400-b2 text-text">
                    {{ numberFormat(data.amount) }}
                    {{ t('_common.currency.rial') }}
                  </div>
                </div>
                <div class="lg:w-1/2 w-full p-md justify-self-end space-y-xs">
                  <div class="text-text-soft font-medium text-body-400-b3">
                    {{ $t('_form.add_invoice.fracture') }}
                  </div>
                  <div class="text-body-400-b2 text-text">
                    {{
                      data.fee_type === SessionFeeTypeEnum.Payer
                        ? $t('_form.add_invoice.buyer')
                        : $t('_form.add_invoice.acceptor')
                    }}
                  </div>
                </div>
              </div>
            </div>
          </template>
          <!-- more settings -->
          <template #main>
            <ui-Divider v-if="!data" class="mb-xl" />
            <div v-if="!data" class="flex justify-end">
              <ui-Button
                :text="$t('_common.buttons.more_settings')"
                variant="text"
                :before-icon="toggleMoreSettings ? 'AngleUp' : 'AngleDown'"
                @click="toggleMoreSettings = !toggleMoreSettings"
              />
            </div>
            <div v-show="toggleMoreSettings" class="flex-col items-end mt-xl gap-xl">
              <div class="text-body-400-b2 text-right">
                {{ $t('_form.add_invoice.fracture') }}
              </div>
              <div class="mt-md flex flex-col items-end gap-sm">
                <ui-Radio
                  :loading="formLoading || loading"
                  :label="$t('_form.add_invoice.acceptor')"
                  :value="SessionFeeTypeEnum.Merchant"
                  name="fracture"
                  :picked="fractureRadio"
                  @selected-value="fractureRadio = SessionFeeTypeEnum.Merchant"
                />

                <ui-Radio
                  :loading="formLoading || loading"
                  :label="$t('_form.add_invoice.buyer')"
                  :value="SessionFeeTypeEnum.Payer"
                  name="fracture"
                  :picked="fractureRadio"
                  @selected-value="fractureRadio = SessionFeeTypeEnum.Payer"
                />
              </div>
            </div>
          </template>
        </ui-Card>
        <!-- details box -->
        <ui-Card>
          <template #header>
            <div dir="rtl" class="mb-xl font-bold">
              <div class="details__container__account__title">
                {{ $t('_form.add_invoice.invoice_details') }}
              </div>
            </div>
          </template>
          <template #main>
            <ui-Textarea
              :disabled="formLoading || loading"
              name="content"
              :model-value="description"
              :show-label="true"
              :placeholder="$t('_common.table.description')"
              :helper="{
                type: !!errors?.content ? 'error' : 'info',
                message: errors?.content || $t('_form.add_invoice.details_description'),
              }"
            />
          </template>
        </ui-Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SessionFeeTypeEnum, NotifyTypeEnum } from '@/graphql/graphql';
import { useInvoiceQueryById } from '@/composables/invoice/useInvoiceQueryById';
enum BillRadio {
  AUTO,
  MANUAL,
}
export interface Date {
  formatValue: string;
}
const t = useI18n();
const { data, loading } = useInvoiceQueryById();
const { numberFormat } = useMath();
const billRadio = ref<BillRadio>(BillRadio.AUTO);
const fractureRadio = ref<SessionFeeTypeEnum>(SessionFeeTypeEnum.Merchant);
const mobileNotify = ref<boolean>(true);
const emailNotify = ref<boolean>();
const toggleMoreSettings = ref<boolean>();
const amount = ref<number | string>();
const billAmount = ref<number | string>(1);
const mobile = ref<string>();
const email = ref<string>();
const name = ref<string>();
const description = ref<string>();
const formLoading = inject('form_loading');
const formValues:
  | Partial<Record<'amount' | 'bill_amount' | 'email', string | undefined>>
  | undefined = inject('form_values');
const fixedPageHeading = ref<boolean>(false);
const errors:
  | globalThis.ComputedRef<
      Partial<
        Record<
          'name' | 'mobile' | 'email' | 'amount' | 'bill_amount' | 'content',
          string | undefined
        >
      >
    >
  | undefined = inject('form_errors');
const logScroll = () => {
  if (window.scrollY > 10) {
    fixedPageHeading.value = true;
  } else {
    fixedPageHeading.value = false;
  }
};
const calculateBillAmount = computed(() => {
  const billCount = formValues?.bill_amount || 1;
  const amountValue = formValues?.amount?.replace(/[^\d]/g, '') || 0;

  return (+amountValue / Number(billCount)).toFixed(0);
});
onMounted(() => {
  window.addEventListener('scroll', logScroll);
  if (data.value) {
    emailNotify.value =
      data.value.notify_type === NotifyTypeEnum.Email ||
      data.value.notify_type === NotifyTypeEnum.MobileEmail;
    name.value = data.value.payer_name || '';
    mobile.value = data.value.payer_mobile || '';
    email.value = data.value.payer_email || '';
    description.value = data.value.description || '';
    amount.value = numberFormat(data.value.amount);
  }
});
onUnmounted(() => {
  window.removeEventListener('scroll', logScroll);
});
watch(
  () => data.value,
  () => {
    if (data.value) {
      emailNotify.value =
        data.value.notify_type === NotifyTypeEnum.Email ||
        data.value.notify_type === NotifyTypeEnum.MobileEmail;
      name.value = data.value.payer_name || '';
      mobile.value = data.value.payer_mobile || '';
      email.value = data.value.payer_email || '';
      amount.value = numberFormat(data.value.amount);
      description.value = data.value.description || '';
    }
  }
);
</script>
<style lang="scss" scoped>
.details {
  @apply flex justify-between gap-xl relative flex-col-reverse xl:flex-row;
  &__sidebar {
    @apply w-full xl:w-[330px] relative;
    &__fixed-head {
      @apply xl:fixed xl:w-[293px] w-full;
    }
  }
  &__container {
    @apply w-full xl:w-[590px];
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
