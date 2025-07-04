<template>
  <div class="details xl:mt-sm">
    <!-- sidebar -->
    <div class="details__sidebar">
      <div class="details__sidebar__fixed-head">
        <ui-Card>
          <template #header>
            <p dir="rtl">
              {{ $t('_form.add_coupon.limitation') }}
            </p>
          </template>
          <template #main>
            <div class="mt-xl flex flex-col items-end gap-md">
              <ui-Switch
                :checked="toggleDatePicker"
                :loading="formLoading || assignLoading || loading"
                :label="$t('_common.date.expire_date')"
                name="date_time"
                class="mb-xs"
                @change="toggleDate"
              />
              <ui-DatePicker
                v-if="toggleDatePicker"
                after-icon="Calendar"
                :model-value="dateInput"
                :disabled="formLoading || assignLoading || loading"
                :loading="false"
                name="date"
                min
                class="w-full"
                :placeholder="$t('_common.filters.date')"
                @selected-item="dateHandler"
              />
              <ui-DatePicker
                v-if="toggleDatePicker"
                :disabled="formLoading || assignLoading || loading"
                time
                :loading="false"
                after-icon="AlarmTime"
                name="time"
                class="w-full"
                :model-value="timeInput"
                :placeholder="$t('_common.date.time')"
                @selected-item="timeHandler"
              />
              <ui-Divider class="w-full my-xs" />
              <ui-Switch
                :checked="!!toggleCount"
                :loading="formLoading || assignLoading || loading"
                :label="$t('_form.add_coupon.use_count')"
                name="use"
                class="mb-xs"
                @change="toggleLimit"
              />
              <template v-if="toggleCount">
                <ui-NumberInput
                  :model-value="entityValue"
                  :disabled="formLoading || assignLoading || loading"
                  name="limit"
                  :show-label="false"
                  :helper="{
                    type: !!errors?.limit ? 'error' : undefined,
                    message: errors?.limit,
                  }"
                  :stepper="true"
                  :min="1"
                  :max-length="10"
                  class="w-full"
                  @update:model-value="$emit('change')"
                />
                <div class="text-body-400-b3 text-text-soft mt-xs" dir="rtl">
                  {{ $t('_form.add_coupon.use_count_description') }}
                </div>
              </template>
            </div>
          </template>
        </ui-Card>
      </div>
    </div>
    <div class="details__container">
      <div class="space-y-md">
        <!-- code -->
        <ui-Card>
          <template #header>
            <div dir="rtl" class="flex justify-between mb-xl items-center">
              <div class="text-heading-600-h2">
                <div>{{ $t('_common.table.coupon') }}</div>
              </div>
              <ui-Button
                v-show="!data && !loading"
                :disabled="formLoading || assignLoading || loading"
                :text="$t('_common.buttons.random_code')"
                variant="outlined"
                @click="generateCode"
              />
            </div>
          </template>
          <template #main>
            <ui-ClipBoard v-show="data" class="w-full" :content="data?.code" />
            <ui-TextField
              v-show="!data"
              :disabled="formLoading"
              name="code"
              :helper="{
                type: !!errors?.code ? 'error' : undefined,
                message: errors?.code,
              }"
              :loading="loading || formLoading"
              :model-value="code"
              :label="false"
              input-custom-class="font-Mono"
              :placeholder="$t('_form.add_coupon.code')"
            />
            <div v-if="!data" class="text-body-400-b3 text-text-soft mt-xl" dir="rtl">
              {{ $t('_form.add_coupon.code_description') }}
            </div>
          </template>
        </ui-Card>
        <!-- discount box -->
        <ui-Card>
          <template #header>
            <div>
              <div class="flex flex-col items-end mb-xl gap-sm">
                <div class="text-heading-600-h2 text-right">
                  {{ $t('_form.add_coupon.percent') }}
                </div>
                <ui-TextField
                  v-model="discountPercent"
                  :disabled="formLoading || assignLoading || loading"
                  :loading="formLoading || assignLoading || loading"
                  class="w-full lg:w-1/2"
                  name="discount_percent"
                  is-number
                  :unit="t('_common.slug.percent')"
                  :helper="{
                    type: !!errors?.discount_percent ? 'error' : undefined,
                    message: errors?.discount_percent,
                  }"
                  @update:model-value="updateDiscountPercentHandler"
                />
              </div>
            </div>
          </template>
          <template #main>
            <div class="flex flex-col items-end gap-xl">
              <ui-Divider class="w-full" />
              <div class="flex justify-end">
                <ui-Switch
                  :loading="formLoading || assignLoading || loading"
                  :disabled="formLoading || assignLoading || loading"
                  :checked="toggleMinDiscount"
                  :label="$t('_form.add_coupon.min_discount')"
                  name="min_switch"
                  @change="handleToggleMinDiscount"
                />
              </div>
              <ui-TextField
                v-show="toggleMinDiscount"
                v-model="minAmount"
                :disabled="formLoading || assignLoading || loading"
                :loading="formLoading || assignLoading || loading"
                class="w-full lg:w-1/2"
                name="min_amount"
                amount
                :unit="t('_common.currency.rial')"
                :helper="{
                  type: !!errors?.min_amount ? 'error' : undefined,
                  message: errors?.min_amount,
                }"
                @update:model-value="$emit('change')"
              />
              <div v-if="toggleMinDiscount" class="text-body-400-b3 text-text-soft" dir="rtl">
                {{ $t('_form.add_coupon.min_amount_describe') }}
              </div>
              <ui-Divider class="w-full" />
              <div class="flex justify-end">
                <ui-Switch
                  :loading="formLoading || assignLoading || loading"
                  :disabled="formLoading || assignLoading || loading"
                  :checked="toggleMaxDiscount"
                  :label="$t('_form.add_coupon.max_discount')"
                  name="max_switch"
                  @change="handleToggleMaxDiscount"
                />
              </div>
              <ui-TextField
                v-show="toggleMaxDiscount"
                v-model="maxDiscountAmount"
                :disabled="formLoading || assignLoading || loading"
                :loading="formLoading || assignLoading || loading"
                class="w-full lg:w-1/2"
                name="maxAmount"
                amount
                :unit="t('_common.currency.rial')"
                :helper="{
                  type: !!errors?.maxAmount ? 'error' : undefined,
                  message: errors?.maxAmount,
                }"
                @update:model-value="$emit('change')"
              />
              <div v-if="toggleMaxDiscount" class="text-body-400-b3 text-text-soft" dir="rtl">
                {{ $t('_form.add_coupon.max_amount_describe') }}
              </div>
            </div>
          </template>
        </ui-Card>
        <!-- product box -->
        <ui-Card>
          <template #header>
            <div dir="rtl" class="mb-xl">
              <div class="details__container__account__title">
                {{ $t('_coupon.can_set') }}
              </div>
            </div>
          </template>
          <template #main>
            <div class="flex flex-col items-end gap-sm">
              <ui-Radio
                :label="$t('_coupon.all_links')"
                :value="ProductRadio.ALL"
                :loading="formLoading || assignLoading || loading"
                :disabled="formLoading || assignLoading || loading"
                name="product_radio"
                :picked="productRadio"
                @selected-value="handleChangeProductRadio(ProductRadio.ALL)"
              />
              <ui-Radio
                :label="$t('_coupon.special_payment_link')"
                :value="ProductRadio.SPECIAL"
                :loading="formLoading || assignLoading || loading"
                :disabled="formLoading || assignLoading || loading"
                name="product_radio"
                :picked="productRadio"
                @selected-value="handleChangeProductRadio(ProductRadio.SPECIAL)"
              />
            </div>
            <CouponAddLgProductTable
              v-if="store.product.length > 0 && productRadio === ProductRadio.SPECIAL"
              class="mt-xl"
              @delete="$emit('change')"
            />
            <div v-if="productRadio === ProductRadio.SPECIAL" dir="rtl" class="mt-xl">
              <ui-Button
                :disabled="formLoading || assignLoading || loading"
                :text="$t('_coupon.select_payment_link')"
                variant="outlined"
                before-icon="Plus"
                @click="toggleProductOverview = true"
              />
            </div>
            <div
              v-if="productRadio === ProductRadio.ALL"
              class="text-body-400-b3 text-text-soft mt-xl"
              dir="rtl"
            >
              {{ $t('_form.add_coupon.all_product_description') }}
            </div>
            <div v-else class="text-body-400-b3 text-text-soft mt-md" dir="rtl">
              {{ $t('_form.add_coupon.special_product_description') }}
            </div>
          </template>
        </ui-Card>
      </div>
    </div>
    <CouponOverview
      v-if="toggleProductOverview"
      v-model:lg="lg"
      @close="toggleProductOverview = false"
      @select="handleSelectProduct"
    />
  </div>
</template>

<script setup lang="ts">
import { useCouponQueryById } from '@/composables/coupon/useCouponQueryById';
import { useCouponStore } from '@/stores/couponStore';
enum DiscountRadio {
  PERCENT,
  AMOUNT,
}
enum ProductRadio {
  ALL,
  SPECIAL,
}
export interface Date {
  formatValue: string;
}
const emit = defineEmits(['change']);
const t = useI18n();
const store = useCouponStore();
const { data, loading /* refetch, onResult */ } = useCouponQueryById();
const { generateDiscountCode, numberFormat } = useMath();
const { convert } = useDate();
const code = ref<string | undefined>();
const discountRadio = ref<DiscountRadio>(DiscountRadio.PERCENT);
const productRadio = ref<ProductRadio>(ProductRadio.ALL);
const entityValue = ref(1);
const today = new Date();
const dateInput = ref<string | undefined>(String(new Date(today.setDate(today.getDate()))));
const timeInput = ref<string>();
const toggleCount = ref<boolean>();
const discountPercent = ref<number | string>();
const minAmount = ref<number | string>();
const maxDiscountAmount = ref<number | string>();
const formLoading = inject('form_loading');
const assignLoading = inject('form_assing_loading');
const toggleMaxDiscount = ref<boolean>(false);
const toggleMinDiscount = ref<boolean>(false);
const toggleProductOverview = ref<boolean>(false);
const toggleDatePicker = ref<boolean>(false);
const { lg } = useSize();
const toggleLimit = (event: Event) => {
  emit('change');
  toggleCount.value = (event.target as HTMLInputElement).checked;
  entityValue.value = data.value?.limit || 1;
};
const toggleDate = (event: Event) => {
  emit('change');
  toggleDatePicker.value = (event.target as HTMLInputElement).checked;
  if (!toggleDatePicker.value) {
    dateInput.value = dateInput.value ?? undefined;
    timeInput.value = undefined;
  }
};
const generateCode = () => {
  code.value = generateDiscountCode(6);
};
const errors:
  | globalThis.ComputedRef<
      Partial<
        Record<
          'code' | 'discount_percent' | 'entity' | 'maxAmount' | 'min_amount' | 'limit',
          string | undefined
        >
      >
    >
  | undefined = inject('form_errors');
const dateHandler = (date: Date) => {
  if (dateInput.value !== date.formatValue) {
    emit('change');
  }
  dateInput.value = date.formatValue;
};
const handleToggleMaxDiscount = (event: Event) => {
  emit('change');
  toggleMaxDiscount.value = (event.target as HTMLInputElement).checked;
};
const handleToggleMinDiscount = (event: Event) => {
  emit('change');
  toggleMinDiscount.value = (event.target as HTMLInputElement).checked;
};
const handleChangeProductRadio = (product: ProductRadio) => {
  productRadio.value = product;
  emit('change');
};
const timeHandler = (value: string) => {
  emit('change');
  timeInput.value = value;
};
const handleSelectProduct = (value: string[]) => {
  emit('change');
  store.product = value;
};
const updateDiscountPercentHandler = () => {
  emit('change');
};

watch(productRadio, () => {
  if (productRadio.value === ProductRadio.ALL) {
    store.product = [];
  }
});
watch(
  () => data.value,
  () => {
    if (data.value) {
      if (data.value.min_amount) {
        toggleMinDiscount.value = true;
        minAmount.value = numberFormat(data.value.min_amount);
      }
      if (data.value.max_discount_amount) {
        toggleMaxDiscount.value = true;
        maxDiscountAmount.value = numberFormat(data.value.max_discount_amount);
      }
      discountRadio.value =
        data.value && data.value.discount_percent ? DiscountRadio.PERCENT : DiscountRadio.AMOUNT;
      discountPercent.value = String(data.value.discount_percent);

      toggleDatePicker.value = !!data.value.expired_at;
      const date = data.value.expired_at;
      dateInput.value = date ? convert(date, 'YYYY-MM-DD HH:mm:ss', 'jYYYY/jMM/jDD') : undefined;
      const hour = date && convert(date, 'YYYY-MM-DD HH:mm:ss', 'HH');
      const minute = convert(date, 'YYYY-MM-DD HH:mm:ss', 'mm');
      timeInput.value = hour ? `${hour}:${minute}` : undefined;
      toggleCount.value = !!data.value.limit;
      entityValue.value = data.value?.limit || 1;
      code.value = data.value.code;
      productRadio.value =
        data.value.products && data.value.products.length > 0
          ? ProductRadio.SPECIAL
          : ProductRadio.ALL;
      store.product =
        (data.value.products &&
          data.value.products.length > 0 &&
          data.value.products.map(product => product?.id as string)) ||
        [];
    } else {
      store.product = [];
    }
  },
  {
    immediate: true,
  }
);
</script>
<style lang="scss" scoped>
.details {
  @apply flex justify-between gap-md relative flex-col-reverse xl:flex-row;
  &__sidebar {
    @apply w-full xl:w-[330px] relative;
    &__fixed-head {
      @apply xl:sticky top-[136px] xl:w-[293px] w-full;
    }
  }
  &__container {
    @apply w-full xl:w-[603px];
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
