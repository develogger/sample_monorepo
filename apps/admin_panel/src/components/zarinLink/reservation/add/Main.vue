<!-- eslint-disable no-console -->
<template>
  <div class="details z-[0]">
    <!-- sidebar -->
    <div class="details__sidebar">
      <div>
        <ui-Card>
          <template #header>
            <ui-skeleton dir="rtl" :height="24" :loading="mainLoading">
              <div dir="rtl">
                {{ $t('_common.slug.reservation') }}
              </div>
            </ui-skeleton>
          </template>
          <template #main>
            <!-- link switch -->
            <div class="mt-xl flex justify-end">
              <div>
                <ui-Toggle
                  v-model="linkToggle"
                  :loading="removeLoading || restoreLoading || mainLoading"
                  :disabled="mainLoading"
                  :class="{ '-mr-xs': mainLoading }"
                  :label="$t('_form.addProduct.active_link')"
                  class="w-full"
                  name="link"
                  @update:model-value="handleStatusLink"
                />
              </div>
            </div>
            <!-- order -->
            <div v-if="!data?.deleted_at && linkToggle" class="mt-xl">
              <ui-Divider />
              <ui-skeleton class="mt-xl" dir="rtl" :loading="mainLoading">
                <div class="mt-xl" dir="rtl">
                  {{ $t('_common.slug.order') }}
                </div>
              </ui-skeleton>
              <!-- order preview -->
              <div v-if="mainLoading" dir="rtl" class="flex gap-xs flex-wrap mt-lg">
                <ui-skeleton :width="100" />
                <ui-skeleton :width="100" />
                <ui-skeleton :width="100" />
                <ui-skeleton :width="100" />
              </div>
              <div
                v-if="!switches.orderForm && !mainLoading"
                class="mt-lg flex-row gap-xs flex flex-wrap"
                dir="rtl"
              >
                <div
                  v-for="(i, index) in orderField.filter(i => i.value === true)"
                  :key="index"
                  class="max-w-[240px]"
                >
                  <ui-Label
                    :text="i.type === StatusEnum.Required ? i.label + '*' : i.label"
                    type="neutral"
                    class="truncate max-w-[240px]"
                  />
                </div>
              </div>
              <!-- order field -->
              <div v-show="switches.orderForm" class="mt-xl">
                <!-- name -->
                <div class="mt-lg space-y-lg">
                  <ui-Checkbox
                    :checked="orderField[0]?.value"
                    :disabled="formLoadingImage || formLoading || formLoadingEdit"
                    :name="orderField[0]?.label"
                    :label="$t('_form.addProduct.name_family')"
                    @change="
                      (event: Event) => {
                        orderField[0].value = (event.target as HTMLInputElement).checked;
                      }
                    "
                  />
                  <ui-Segment
                    v-if="orderField[0]?.value"
                    v-model="orderField[0].type"
                    :disabled="formLoadingImage || formLoading || formLoadingEdit"
                    :items="segments"
                  />
                </div>
                <!-- mobile -->
                <div class="mt-lg space-y-lg">
                  <ui-Checkbox
                    :checked="orderField[1]?.value"
                    :disabled="formLoadingImage || formLoading || formLoadingEdit"
                    :name="orderField[1]?.name"
                    :label="$t('_form.addProduct.mobile')"
                    @change="
                      (event: Event) =>
                        (orderField[1].value = (event.target as HTMLInputElement).checked)
                    "
                  />
                  <ui-Segment
                    v-if="orderField[1]?.value"
                    v-model="orderField[1].type"
                    :disabled="formLoadingImage || formLoading || formLoadingEdit"
                    :items="segments"
                  />
                </div>
                <!-- email -->
                <div class="mt-lg space-y-lg">
                  <ui-Checkbox
                    :checked="orderField[2]?.value"
                    :disabled="formLoadingImage || formLoading || formLoadingEdit"
                    :name="orderField[2]?.name"
                    :label="$t('_form.addProduct.email')"
                    @change="
                      (event: Event) =>
                        (orderField[2].value = (event.target as HTMLInputElement).checked)
                    "
                  />
                  <ui-Segment
                    v-if="orderField[2]?.value"
                    v-model="orderField[2].type"
                    :disabled="formLoadingImage || formLoading || formLoadingEdit"
                    :items="segments"
                  />
                </div>
                <div class="mt-lg space-y-lg">
                  <ui-Checkbox
                    :checked="orderField[3]?.value"
                    :disabled="formLoadingImage || formLoading || formLoadingEdit"
                    :name="orderField[3]?.name"
                    :label="$t('_form.addProduct.order_description')"
                    @change="
                      (event: Event) =>
                        (orderField[3].value = (event.target as HTMLInputElement).checked)
                    "
                  />
                  <ui-Segment
                    v-if="orderField[3]?.value"
                    v-model="orderField[3].type"
                    :disabled="formLoadingImage || formLoading || formLoadingEdit"
                    :items="segments"
                  />
                </div>
                <!-- custom field 1 -->
                <div
                  v-if="orderField && orderField[4]?.value"
                  class="mt-lg space-y-lg flex justify-end flex-col"
                >
                  <div class="flex gap-md">
                    <ui-Button
                      icon="Trash"
                      :disabled="formLoadingImage || formLoading || formLoadingEdit"
                      class="w-[40px] !text-text"
                      variant="tertiary"
                      @click="handleRemoveCustomFields(4)"
                    />
                    <ui-TextField
                      ref="customOne"
                      name="CUSTOM_FIELD_1"
                      class="w-full"
                      :disabled="formLoadingImage || formLoading || formLoadingEdit"
                      :model-value="orderField[4].label"
                      :placeholder="$t('_form.addProduct.field')"
                      :helper="{
                        type: !!errors?.CUSTOM_FIELD_1 ? 'error' : undefined,
                        message: errors?.CUSTOM_FIELD_1,
                      }"
                      @input="orderField[4].label = String(formValues?.CUSTOM_FIELD_1)"
                    />
                  </div>
                  <ui-Segment v-model="orderField[4].type" :items="segments" />
                </div>
                <!-- custom field 2 -->
                <div
                  v-if="orderField && orderField[5]?.value"
                  class="mt-lg space-y-lg flex justify-end flex-col"
                >
                  <div class="flex gap-md">
                    <ui-Button
                      :disabled="formLoadingImage || formLoading || formLoadingEdit"
                      icon="Trash"
                      class="w-[40px] !text-text"
                      variant="tertiary"
                      @click="handleRemoveCustomFields(5)"
                    />
                    <ui-TextField
                      ref="customTwo"
                      :disabled="formLoadingImage || formLoading || formLoadingEdit"
                      name="CUSTOM_FIELD_2"
                      class="w-full"
                      :placeholder="$t('_form.addProduct.field')"
                      :model-value="orderField[5].label"
                      :helper="{
                        type: !!errors?.CUSTOM_FIELD_2 ? 'error' : undefined,
                        message: errors?.CUSTOM_FIELD_2,
                      }"
                      @input="orderField[5].label = String(formValues?.CUSTOM_FIELD_2)"
                    />
                  </div>
                  <ui-Segment v-model="orderField[5].type" :items="segments" />
                </div>
                <!-- add fields -->
                <div class="mt-lg space-y-lg flex justify-end">
                  <ui-Button
                    :disabled="orderField && orderField[4].value && orderField[5].value"
                    :text="$t('_common.buttons.custom_button')"
                    variant="outlined"
                    after-icon="Plus"
                    class="w-2/3"
                    @click="addCustomField"
                  />
                </div>
              </div>
              <!-- show & hide order form -->
              <div class="mt-lg space-y-lg flex justify-end">
                <ui-skeleton :loading="mainLoading">
                  <ui-Button
                    v-if="switches.orderForm"
                    :text="$t('_common.buttons.close')"
                    variant="text"
                    before-icon="AngleUp"
                    @click="switches.orderForm = false"
                  />
                  <ui-Button
                    v-else
                    :text="$t('_common.buttons.preview')"
                    variant="text"
                    before-icon="AngleDown"
                    @click="switches.orderForm = true"
                  />
                </ui-skeleton>
              </div>
              <!-- active coupon -->
              <ui-Divider class="mt-lg" />
              <div class="my-lg space-y-lg">
                <ui-Checkbox
                  :disabled="mainLoading"
                  name="coupon"
                  :label="$t('_form.addProduct.coupon_checkbox')"
                  :model-value="couponActive"
                  :checked="couponActive"
                  :loading="mainLoading"
                  @update:model-value="(val: boolean) => (couponActive = val)"
                />
              </div>
              <ui-Divider />
              <!-- receipt -->
              <ui-skeleton class="my-xl" dir="rtl" :loading="mainLoading">
                <div class="my-xl" dir="rtl">
                  {{ $t('_common.slug.next_page') }}
                </div>
              </ui-skeleton>
              <div class="flex flex-col justify-end items-end gap-sm">
                <ui-Radio
                  :disabled="mainLoading"
                  name="receipt"
                  :label="$t('_form.addProduct.preview_receipt')"
                  value="1"
                  :picked="receipt"
                  :loading="mainLoading"
                  @selected-value="handleReceipt"
                />
                <ui-Radio
                  :disabled="mainLoading"
                  name="receipt"
                  :label="$t('_form.addProduct.link_to_custom_page')"
                  value="2"
                  :picked="receipt"
                  :loading="mainLoading"
                  @selected-value="handleReceipt"
                />
              </div>
              <div v-if="receipt === '2'" class="mt-xl space-y-md">
                <ui-TextField
                  v-model="backLinkSuccess"
                  :disabled="mainLoading"
                  name="backLinkSuccess"
                  :loading="mainLoading"
                  :placeholder="$t('_form.addProduct.prev_link_available')"
                  :helper="{
                    type: !!errors?.backLinkSuccess ? 'error' : undefined,
                    message: errors?.backLinkSuccess,
                  }"
                />
                <ui-TextField
                  v-model="backLinkUnSuccess"
                  :disabled="mainLoading"
                  :loading="mainLoading"
                  name="backLinkUnSuccess"
                  :placeholder="$t('_form.addProduct.prev_link_unavailable')"
                  :helper="{
                    type: !!errors?.backLinkUnSuccess ? 'error' : undefined,
                    message: errors?.backLinkUnSuccess,
                  }"
                />
              </div>
            </div>
          </template>
        </ui-Card>
      </div>
    </div>
    <div class="details__container">
      <div class="space-y-md">
        <!-- details -->
        <ui-Card>
          <template #header>
            <div dir="rtl">
              <ui-skeleton class="pb-md pt-sm" :height="24" :loading="mainLoading">
                <div class="details__container__account__title">
                  {{ $t('_common.slug.details') }}
                </div>
              </ui-skeleton>
            </div>
          </template>
          <template #main>
            <div class="space-y-xl">
              <div class="w-full flex flex-col space-y-md">
                <p class="text-text-soft text-body-400-b3 text-right font-normal">
                  {{ $t('_common.slug.category') }}
                </p>
                <div class="w-full flex flex-row-reverse space-x-reverse items-start space-x-sm">
                  <ui-Select
                    :data="categories"
                    class="w-full"
                    after-icon="AngleDown"
                    name="category"
                    :placeholder="$t('_zarin_link.category')"
                    :value="category"
                    :disabled="mainLoading || categoryLoading"
                    :loading="mainLoading || categoryLoading"
                    :helper="{
                      type: !!errors?.category ? 'error' : undefined,
                      message: errors?.category,
                    }"
                    @selected-item="handleCategorySelection"
                  />
                  <ui-Select
                    :data="subCategories"
                    class="w-full"
                    after-icon="AngleDown"
                    name="subCategory"
                    :placeholder="$t('_zarin_link.sub_category')"
                    :loading="mainLoading || categoryLoading"
                    :disabled="mainLoading || !category.id"
                    :value="subCategory"
                    :helper="{
                      type: !!errors?.subCategory ? 'error' : undefined,
                      message: errors?.subCategory,
                    }"
                    @selected-item="handleSubCategorySelection"
                  />
                </div>
              </div>

              <div class="space-y-xl">
                <ui-TextField
                  v-model="title"
                  :loading="mainLoading"
                  :disabled="mainLoading"
                  name="title"
                  :placeholder="$t('_form.add_payment_link.title')"
                  :helper="{
                    type: !!errors?.title ? 'error' : undefined,
                    message: errors?.title,
                  }"
                />
                <div class="mt-xl flex flex-col items-end space-y-sm">
                  <ui-TextField
                    v-model="amount"
                    :loading="mainLoading"
                    :disabled="mainLoading"
                    class="lg:w-1/2 w-full float-right"
                    name="amount"
                    amount
                    :unit="!mainLoading ? t('_common.currency.rial') : ''"
                    :helper="{
                      type: !!errors?.amount ? 'error' : undefined,
                      message: errors?.amount,
                    }"
                    :placeholder="$t('_common.filters.amount')"
                  />
                </div>
              </div>
            </div>
          </template>
        </ui-Card>

        <ui-Card>
          <template #header>
            <div dir="rtl">
              <ui-skeleton class="pb-md pt-sm" :height="24" :loading="mainLoading">
                <div class="details__container__account__title">
                  {{ $t('_common.table.description') }}
                </div>
              </ui-skeleton>
            </div>
          </template>

          <template #main>
            <ZarinLinkCommonItemDescriptionMain
              v-model:description="description"
              v-model:specRowsData="specRowsData"
              show-spec-table
              :loading="mainLoading"
              :disabled="mainLoading"
              :errors="errors"
              :max-length="500"
            />
            <p class="text-text-soft text-body-400-b3 text-right font-normal">
              {{ $t('_form.addProduct.content_description') }}
            </p>
          </template>
        </ui-Card>

        <ui-Card>
          <template #header>
            <div dir="rtl">
              <ui-skeleton class="pb-md" :loading="mainLoading" :height="24">
                <div class="details__container__account__title">
                  {{ $t('_common.slug.pic') }}
                </div>
              </ui-skeleton>
            </div>
          </template>
          <template #main>
            <ui-Dropzone
              v-if="!data?.images?.length"
              v-model:uploaded-file="uploadedFile"
              dnd
              class="w-full"
              :max-size="5.12e5"
              :accept="['.png', '.jpg', '.jpeg']"
              :percent="percentUpload"
              :upload-error="uploadError"
              :max-files="1"
              :loading="mainLoading"
              @on-cancel="handleUploadCancel"
              @on-upload="
                (val: File[]) => {
                  uploadFile(val);
                  updated = false;
                }
              "
              @update:uploaded-file="() => (updated = false)"
              @on-delete="() => (updated = false)"
            />
            <ZarinLinkCommonImagePreview
              v-if="data?.images"
              :images="data?.images"
              :title="data?.title"
              :has-delete="true"
              :main-loading="mainLoading"
              :delete-loading="deleteLoading"
              :delete-file="deleteFileFromUploaded"
            />
          </template>
        </ui-Card>

        <ui-Card>
          <template #header>
            <div dir="rtl">
              <ui-skeleton class="pb-md pt-sm" :height="24" :loading="mainLoading">
                <div class="details__container__account__title">
                  {{ $t('_zarin_link.reservation_link.form.holding') }}
                </div>
              </ui-skeleton>
            </div>
          </template>

          <template #main>
            <div class="rtl space-y-xl">
              <div class="grid grid-cols-2 gap-y-md gap-x-sm">
                <ui-DatePicker
                  after-icon="Calendar"
                  :model-value="startDateInput"
                  :disabled="formLoading || loading"
                  :loading="false"
                  name="start_date"
                  min
                  class="w-full ltr"
                  :placeholder="$t('_zarin_link.reservation_link.form.start_date')"
                  :helper="{
                    type: !!errors?.start_date ? 'error' : undefined,
                    message: errors?.start_date,
                  }"
                  @selected-item="startDateHandler"
                />
                <ui-DatePicker
                  :disabled="formLoading || loading"
                  time
                  :loading="false"
                  after-icon="AlarmClock"
                  name="start_time"
                  class="w-full ltr"
                  :model-value="startTimeInput"
                  :placeholder="$t('_zarin_link.reservation_link.form.start_time')"
                  :helper="{
                    type: !!errors?.start_time ? 'error' : undefined,
                    message: errors?.start_time,
                  }"
                  @selected-item="startTimeHandler"
                />
                <ui-DatePicker
                  after-icon="Calendar"
                  :model-value="endDateInput"
                  :disabled="formLoading || loading"
                  :loading="false"
                  name="end_date"
                  min
                  class="w-full ltr"
                  :placeholder="$t('_zarin_link.reservation_link.form.end_date')"
                  :helper="{
                    type: !!errors?.end_date ? 'error' : undefined,
                    message: errors?.end_date,
                  }"
                  @selected-item="endDateHandler"
                />
                <ui-DatePicker
                  :disabled="formLoading || loading"
                  time
                  :loading="false"
                  after-icon="AlarmClock"
                  name="end_time"
                  class="w-full ltr"
                  :model-value="endTimeInput"
                  :placeholder="$t('_zarin_link.reservation_link.form.end_time')"
                  :helper="{
                    type: !!errors?.end_time ? 'error' : undefined,
                    message: errors?.end_time,
                  }"
                  @selected-item="endTimeHandler"
                />
              </div>

              <div class="space-y-xl gap-x-sm grid grid-cols-2">
                <ui-TextField
                  v-model="limit"
                  :disabled="formLoading || loading"
                  :loading="formLoading || loading"
                  class="w-full col-end-2"
                  name="limit"
                  :max-length="5"
                  :show-max-length-limit="false"
                  is-number
                  :placeholder="$t('_zarin_link.reservation_link.form.capacity')"
                  :helper="{
                    type: !!errors?.limit ? 'error' : undefined,
                    message: errors?.limit,
                  }"
                />
                <ui-Select
                  :data="[
                    {
                      title: $t('_zarin_link.reservation_link.form.online'),
                      id: EventTypeEnum.Online,
                    },
                    {
                      title: $t('_zarin_link.reservation_link.form.in_person'),
                      id: EventTypeEnum.Location,
                    },
                  ]"
                  :placeholder="$t('_zarin_link.reservation_link.form.event_type')"
                  class="w-full col-end-2"
                  after-icon="AngleDown"
                  name="event_type"
                  :helper="{
                    type: errors?.event_type ? 'error' : undefined,
                    message: errors?.event_type,
                  }"
                  :value="eventType"
                  @selected-item="eventSelectHandler"
                />
              </div>

              <div v-if="eventType.id + '' === EventTypeEnum.Location" class="space-y-lg">
                <p class="text-text-soft text-body-400-b3">
                  {{ $t('_zarin_link.reservation_link.form.address_location') }}
                </p>
                <div class="space-y-md">
                  <div class="flex flex-row-reverse space-x-reverse space-x-sm ltr">
                    <ui-select
                      :loading="loading || provinceLoading || mainLoading"
                      :disabled="mainLoading"
                      class="w-full"
                      :data="provinces"
                      after-icon="AngleDown"
                      :value="selectedProvince"
                      name="province"
                      :placeholder="$t('_common.province')"
                      :helper="{
                        type: !!errors?.province ? 'error' : undefined,
                        message: errors?.province,
                      }"
                      @selected-item="handleProvinceSelect"
                    />
                    <ui-select
                      :loading="loading || provinceLoading || mainLoading"
                      :disabled="!selectedProvince?.title || mainLoading"
                      class="w-full"
                      after-icon="AngleDown"
                      :data="cities"
                      :value="selectedCity"
                      name="city"
                      :placeholder="$t('_common.city')"
                      :helper="{
                        type: !!errors?.city ? 'error' : undefined,
                        message: errors?.city,
                      }"
                      @selected-item="handleCitySelect"
                    />
                  </div>
                  <ui-TextField
                    v-model="address"
                    :loading="mainLoading"
                    :disabled="mainLoading"
                    name="address"
                    :placeholder="$t('_zarin_link.reservation_link.form.address')"
                    class="col-span-2 ltr"
                    :helper="{
                      type: !!errors?.address ? 'error' : undefined,
                      message: errors?.address,
                    }"
                  />
                </div>
              </div>
              <div v-if="eventType.id + '' === EventTypeEnum.Online" class="space-y-lg">
                <p class="text-text-soft text-body-400-b3">
                  {{ $t('_zarin_link.reservation_link.form.address_location') }}
                </p>
                <ui-TextField
                  v-model="url"
                  :loading="mainLoading"
                  :disabled="mainLoading"
                  name="url"
                  :placeholder="$t('_zarin_link.reservation_link.form.url')"
                  class="col-span-2 ltr"
                  :helper="{
                    type: !!errors?.url ? 'error' : undefined,
                    message: errors?.url,
                  }"
                />
              </div>
            </div>
          </template>
        </ui-Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {
  ZarinLinkRequiredFieldsStatusEnum as StatusEnum,
  ZarinLinkRequiredFieldsInputEnum,
  ZarinLinkRequiredFieldsStatusEnum,
  CategoryTypeEnum,
  EventTypeEnum,
  ZarinLinkCategory,
  Maybe,
} from '@/graphql/graphql';

import { useProductStore } from '@/stores/productStore';
import { useProductDetails } from '@/composables/product/useProductDetails';
import { useZarinLinkCategoriesQuery } from '~/composables/zarinlink/useZarinLinkQuery';
import { useProductMutation } from '~/composables/product/useProductMutation';

export interface SubCategory {
  id: string;
  title: string;
}
export interface Category {
  id: string;
  title: string;
  children: Array<SubCategory>;
}

// Data models Location
interface LocationDataType {
  id: string;
  name: string;
}

interface Province extends LocationDataType {
  cities: LocationDataType[];
}

interface LocationSelectOption {
  id: string;
  title: string;
}

interface ISpecification {
  key: string;
  value: string;
}

export type ErrorsType = globalThis.ComputedRef<
  Partial<
    Record<
      | 'title'
      | 'amount'
      | 'limit'
      | 'description'
      | 'backLinkUnSuccess'
      | 'backLinkSuccess'
      | 'start_date'
      | 'end_date'
      | 'start_time'
      | 'end_time'
      | 'event_type'
      | 'province'
      | 'city'
      | 'url'
      | 'category'
      | 'subCategory'
      | 'address'
      | 'CUSTOM_FIELD_1'
      | 'CUSTOM_FIELD_2',
      string | undefined
    >
  >
>;
export type SetValueType = (
  fields: Partial<{
    title: string;
    address: string;
    amount: string;
    description: string;
    CUSTOM_FIELD_1?: string | undefined;
    CUSTOM_FIELD_2?: string | undefined;
    backLinkSuccess?: string | undefined;
    backLinkUnSuccess?: string | undefined;
    entity?: number | undefined;
    link?: boolean | undefined;
    receipt?: number | undefined;
    limit?: number | undefined;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    event_type: string;
    province: string;
    city: string;
    url: string;
    category: string;
    category_id: number;
    subCategory: string;
    isSpecTableValid?: boolean;
    eventType?: string;
    specifications?: Array<{ key: string; value: string }>;
  }>,
  shouldValidate?: boolean | undefined
) => void;

export type ValuesType = Partial<{
  title: string;
  address: string;
  amount: string;
  description: string;
  CUSTOM_FIELD_1?: string | undefined;
  CUSTOM_FIELD_2?: string | undefined;
  backLinkSuccess?: string | undefined;
  backLinkUnSuccess?: string | undefined;
  entity?: number | undefined;
  link?: boolean | undefined;
  receipt?: number | undefined;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  event_type: string;
  province?: string | null;
  city?: string | null;
  url: string;
  category: string;
  subCategory: string;
  isSpecTableValid?: boolean;
  eventType?: string;
  specifications?: Array<{ key: string; value: string }>;
}>;

export type FormFieldType = {
  label: string;
  name: ZarinLinkRequiredFieldsInputEnum;
  type: ZarinLinkRequiredFieldsStatusEnum;
  value: boolean;
  limit: number;
}[];
export interface Date {
  formatValue: string;
}
const emit = defineEmits(['change']);
const { numberFormat } = useMath();
const { data, loading, onResult, refetch } = useGetZarinLinkEventQueryById();
const { data: categories, loading: categoryLoading } = useZarinLinkCategoriesQuery(
  CategoryTypeEnum.Reservation
);
const { convert } = useDate();
const today = new Date();
const t = useI18n();
const amount = ref(data.value?.amount && numberFormat(data.value?.amount));
const fieldStore = useProductStore();
const linkToggle = ref(true);
const entityValue = ref(1);
const description = ref<string>('');
const couponActive = ref(true);
const title = ref();
const address = ref();
const url = ref();
const backLinkSuccess = ref();
const backLinkUnSuccess = ref();
const tempOrderField = ref();
const startDateInput = ref<string>(String(new Date(today.setDate(today.getDate()))));
const endDateInput = ref<string>(String(new Date(today.setDate(today.getDate()))));
const startTimeInput = ref<string>();
const endTimeInput = ref<string>();
const limit = ref();
const eventType = ref({ id: '0', title: '' });
const category = ref({ id: '0', title: '' });
const subCategory = ref({ id: '0', title: '' });
const subCategories = ref<SubCategory[]>([]);
const specRowsData = ref<ISpecification[]>([]);
const eventSelectHandler = (selectedItem: { title: string; id: EventTypeEnum }) => {
  eventType.value.id = selectedItem.id;
  eventType.value.title = selectedItem.title;

  if (formSetValues) {
    formSetValues(
      {
        eventType: selectedItem.id,
      },
      false
    );
  }
};
const { removeProduct, restoreProduct, deleteProductImage } = useProductMutation();
const { mutate: deleteMutate, onDone: deleteDone, loading: deleteLoading } = deleteProductImage();
const { mutate: removeMutate, onDone: removeDone, loading: removeLoading } = removeProduct();
const { mutate: restoreMutate, onDone: restoreDone, loading: restoreLoading } = restoreProduct();
// location (province , city)
const { data: provincesData, loading: provinceLoading } = useProvinces();
const selectedProvince = ref<LocationSelectOption>({
  id: '0',
  title: '',
});
const selectedCity = ref<LocationSelectOption>({
  id: '0',
  title: '',
});
const cities = ref({
  id: '0',
  title: '',
});
// upload product picture
const { uploadFile, percentUpload, uploadError, uploadedFile, handleUploadCancel } = useUpload();
const { fields: orderField, image: imageStore, updated, isFormDirty } = storeToRefs(fieldStore);
const { segments } = useProductDetails();
const formValues: ValuesType | undefined = inject('form_values');
const formSetValues: SetValueType | undefined = inject('form_set_values');
const errors: ErrorsType | undefined = inject('form_errors');
const formLoading = inject<Ref>('form_loading');
const formLoadingImage = inject<Ref>('form_loading_with_image');
const formLoadingEdit = inject<Ref>('form_loading_edit');
const switches = ref({
  fixedPageHeading: false,
  entity: false,
  orderForm: false,
});
const receipt = ref('1');
const customOne = ref();
const customTwo = ref();
const initialFormValues = reactive({
  title: '',
  address: '',
  amount: '',
  description: '',
  CUSTOM_FIELD_1: '',
  CUSTOM_FIELD_2: '',
  backLinkSuccess: '',
  backLinkUnSuccess: '',
  entity: 0,
  link: false,
  receipt: '1',
  orderField: undefined,
  start_date: '',
  end_date: '',
  start_time: '',
  end_time: '',
  city: {
    id: '0',
    title: '',
  },
  province: {
    id: '0',
    title: '',
  },
  url: '',
  category: { id: '0', title: '' },
  subCategory: { id: '0', title: '' },
  event_type: { id: '0', title: '' },
});
const currentFormValues = computed(() => ({
  title: title.value,
  address: address.value,
  amount: amount.value,
  description: description.value,
  CUSTOM_FIELD_1: orderField.value[4].label,
  CUSTOM_FIELD_2: orderField.value[5].label,
  backLinkSuccess: backLinkSuccess.value,
  backLinkUnSuccess: backLinkUnSuccess.value,
  entity: switches.value.entity ? entityValue.value : 0,
  link: linkToggle.value,
  coupon: couponActive.value,
  receipt: receipt.value,
  orderField: undefined,
  category: category.value,
  subCategory: subCategory.value,
  province: selectedProvince.value,
  city: selectedCity.value,
}));
const mainLoading = computed(
  () =>
    formLoadingImage?.value ||
    formLoading?.value ||
    formLoadingEdit?.value ||
    loading.value ||
    removeLoading.value ||
    restoreLoading.value
);
const handleReceipt = (value: string) => {
  if (value === '1') {
    backLinkSuccess.value = undefined;
    backLinkUnSuccess.value = undefined;
  }
  receipt.value = value;
};
const handleStatusLink = () => {
  if (data.value?.deleted_at && linkToggle) {
    restoreMutate({
      id: data.value.id,
    });
    restoreDone(async () => {
      await refetch();
    });
  } else if (!data.value?.deleted_at && data.value && data.value.id) {
    removeMutate({
      id: data.value && data.value.id,
    });
    removeDone(async () => {
      await refetch();
    });
  }
};
const deleteFileFromUploaded = () => {
  if (data.value && data.value.images) {
    deleteMutate({
      product_id: data.value?.id,
      image_id: data.value && data.value.images[0]?.id,
    });
    deleteDone(() => {
      refetch();
    });
  }
};
const addCustomField = () => {
  if (!orderField.value[4].value) {
    orderField.value[4].value = true;
    orderField.value[4].type = StatusEnum.Optional;

    nextTick(() => {
      customOne.value.inputRef.focus();
    });
  } else if (!orderField.value[5].value) {
    orderField.value[5].value = true;
    orderField.value[5].type = StatusEnum.Optional;

    nextTick(() => {
      customTwo.value.inputRef.focus();
    });
  }
};
const handleRemoveCustomFields = (index: number) => {
  orderField.value[index].value = false;
  orderField.value[index].label = '';
  orderField.value[index].type = StatusEnum.Optional;
  if (formSetValues) {
    formSetValues({
      CUSTOM_FIELD_1: index === 4 ? '' : formValues?.CUSTOM_FIELD_1,
      CUSTOM_FIELD_2: index === 5 ? '' : formValues?.CUSTOM_FIELD_2,
    });
  }
};
function compareArrays<T>(arr1: T[], arr2: T[]) {
  if (arr1 && arr2) {
    const res = arr1.filter((obj1: T) => !arr2.some((obj2: T) => _isEqual(obj1, obj2)));

    return !!res.length;
  }
}
const checkIfFormIsDirty = computed(() => {
  if (currentFormValues.value && data.value) {
    isFormDirty.value = !Object.keys(initialFormValues).some(key =>
      key === 'orderField'
        ? compareArrays(orderField.value, tempOrderField.value)
        : currentFormValues.value[key as keyof typeof currentFormValues.value] &&
          initialFormValues[key as keyof typeof initialFormValues] !==
            currentFormValues.value[key as keyof typeof currentFormValues.value]
    );
  }

  return isFormDirty.value;
});
onResult(() => {
  if (data.value) {
    initialFormValues.title = data.value.title || '';
    initialFormValues.amount = numberFormat(data.value.amount) || '';
    initialFormValues.description = data.value.description || '';
    initialFormValues.CUSTOM_FIELD_1 = formValues?.CUSTOM_FIELD_1 || '';
    initialFormValues.CUSTOM_FIELD_2 = formValues?.CUSTOM_FIELD_2 || '';
    initialFormValues.backLinkSuccess = backLinkSuccess.value =
      data.value.successful_redirect_url || '';
    initialFormValues.backLinkUnSuccess = backLinkUnSuccess.value =
      data.value.failed_redirect_url || '';
    initialFormValues.entity = typeof data.value.limit === 'number' ? data.value.limit : 0;
    initialFormValues.link = !data.value.deleted_at;
    initialFormValues.receipt =
      !data.value.show_receipt || !data.value.successful_redirect_url ? '1' : '2';
    amount.value = numberFormat(data.value?.amount);
    title.value = data.value?.title;
    address.value = data.value?.meta_data?.address;
    description.value = data.value?.description as string;
    limit.value = data.value?.limit === null ? '' : data.value?.limit + '';
    updated.value = true;
    specRowsData.value = (data?.value?.specifications || []) as ISpecification[];
    const startDate = data.value?.meta_data?.start_date;
    const endDate = data.value?.meta_data?.end_date;
    startTimeInput.value = data.value?.meta_data?.start_time || '';
    endTimeInput.value = data.value?.meta_data?.end_time || '';
    startDateInput.value = startDate ? convert(startDate, 'YYYY-MM-DD', 'jYYYY/jMM/jDD') : '';
    endDateInput.value = endDate ? convert(endDate, 'YYYY-MM-DD', 'jYYYY/jMM/jDD') : '';
    eventType.value = {
      id: (data.value?.meta_data?.event_type || '0') as string,
      title:
        data.value?.meta_data?.event_type === EventTypeEnum.Online
          ? t('_zarin_link.reservation_link.form.online')
          : t('_zarin_link.reservation_link.form.in_person'),
    };
    selectedProvince.value = {
      id: data.value?.meta_data?.province || '0',
      title: data.value?.meta_data?.province || '',
    };
    selectedCity.value = {
      id: data.value?.meta_data?.city || '0',
      title: data.value?.meta_data?.city || '',
    };
    url.value = data.value?.meta_data?.url || '';
    category.value = {
      id: data.value?.category?.[0]?.parent?.id || '0',
      title: data.value?.category?.[0]?.parent?.title || '',
    };
    subCategory.value = {
      id: data.value?.category?.[0]?.id || '0',
      title: data.value?.category?.[0]?.title || '',
    };
  }
  linkToggle.value = !data.value?.deleted_at;
  if (!data.value?.is_coupon_active) {
    couponActive.value = false;
  }
  if (data.value?.show_receipt || !data.value?.successful_redirect_url) {
    receipt.value = '1';
  } else {
    receipt.value = '2';
  }
  if (typeof data.value?.limit === 'number' && data.value?.limit !== 0) {
    switches.value.entity = true;
    entityValue.value = data.value.limit;
  }
  if (data.value?.required_fields) {
    const value = [...orderField.value];

    value.forEach(item => {
      const updateItem = data.value?.required_fields?.find(
        update => update?.input?.toLowerCase() === item?.name?.toLowerCase()
      );

      if (updateItem) {
        const text = t(`_form.addProduct.${updateItem?.input?.toLowerCase()}`);
        const isHidden = updateItem?.status?.toUpperCase() !== StatusEnum.Hidden;
        item.type = updateItem?.status?.toUpperCase() as ZarinLinkRequiredFieldsStatusEnum;
        item.value = isHidden;
        item.label = updateItem?.placeholder ? updateItem?.placeholder : isHidden ? text : '';
      } else {
        item.value = false;
        item.type = StatusEnum.Hidden;
      }
    });
    if (!value.some(i => i.name === ZarinLinkRequiredFieldsInputEnum.CustomField_1)) {
      value.push(
        {
          name: ZarinLinkRequiredFieldsInputEnum.CustomField_1,
          type: StatusEnum.Hidden,
          label: '',
          value: false,
        },
        {
          name: ZarinLinkRequiredFieldsInputEnum.CustomField_2,
          type: StatusEnum.Hidden,
          label: '',
          value: false,
        }
      );
    }
    orderField.value = [...value] as FormFieldType;
    tempOrderField.value = JSON.parse(JSON.stringify(orderField.value)) as FormFieldType;
  }
});
const startDateHandler = (date: Date) => {
  const formattedDate = date?.formatValue && date?.formatValue?.split('/').join('-');
  if (startDateInput.value !== date?.formatValue) {
    emit('change');
  }
  startDateInput.value = formattedDate || '';
};
const endDateHandler = (date: Date) => {
  const formattedDate = date?.formatValue && date?.formatValue?.split('/').join('-');
  if (endDateInput.value !== date?.formatValue) {
    emit('change');
  }
  endDateInput.value = formattedDate || '';
};
const startTimeHandler = (value: string) => {
  const [hours, minutes] = value.split(':').map(Number);
  startTimeInput.value = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
};
const endTimeHandler = (value: string) => {
  const [hours, minutes] = value.split(':').map(Number);
  endTimeInput.value = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
};

onUnmounted(() => {
  updated.value = false;
});
watch(checkIfFormIsDirty, () => {
  updated.value = checkIfFormIsDirty.value;
});
watch(uploadedFile, () => {
  if (uploadedFile.value && 'meta' in uploadedFile.value) {
    imageStore.value = uploadedFile.value.meta.file_id;
  } else {
    imageStore.value = '';
  }
});
watchEffect(() => {
  if (formSetValues) {
    formSetValues(
      {
        category_id: +subCategory.value.id,
      },
      false
    );
  }
});

watch([specRowsData, data], () => {
  if (formSetValues) {
    formSetValues(
      {
        specifications: (specRowsData.value?.[0]?.key
          ? specRowsData.value
          : data.value?.specifications) as ISpecification[],
      },
      false
    );
  }
});

// category
function handleCategorySelection(item: Category) {
  if (item.id === '0') {
    return;
  }

  category.value.id = item.id;
  category.value.title = item.title;

  const categorySelected: Category | undefined = categories.value?.find(
    (p: Maybe<ZarinLinkCategory>): p is Category => p !== null && p.id === item.id
  );

  subCategories.value = categorySelected?.children || [];

  formSetValues?.({ subCategory: '' }, false);
}
function handleSubCategorySelection(item: SubCategory) {
  if (item.id === '0') {
    return;
  }

  subCategory.value.title = item.title;
  subCategory.value.id = item.id;
}
// city and province
const provinces = computed<LocationSelectOption[]>(
  () =>
    provincesData.value?.map((province: Province) => ({
      id: province.name,
      title: province.name,
    })) || []
);
const handleProvinceSelect = (selectedOption: LocationSelectOption) => {
  if (selectedOption.id === '0') {
    return;
  }

  selectedProvince.value.id = selectedOption.id;
  selectedProvince.value.title = selectedOption.title;

  const province = provincesData.value?.find((p: Province) => p.name === selectedOption.id + '');

  cities.value =
    province?.cities.map((city: LocationDataType) => ({
      id: city.name,
      title: city.name,
    })) || [];

  formSetValues && formSetValues({ city: '' }, false);
};
const handleCitySelect = (selectedOption: LocationSelectOption) => {
  if (selectedOption.id === '0') {
    return;
  }

  selectedCity.value.id = selectedOption.id;
  selectedCity.value.title = selectedOption.title;
};
</script>
<style lang="scss" scoped>
.details {
  @apply flex justify-between gap-md relative flex-col-reverse xl:flex-row;
  &__sidebar {
    @apply w-full xl:w-1/3 relative;
    &__fixed-head {
      @apply xl:fixed xl:w-[293px] w-full;
    }
  }
  &__container {
    @apply w-full xl:w-2/3;
    &__account {
      &__title {
        @apply text-heading-600-h2 mb-xl;
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
