<template>
  <div class="details">
    <!-- sidebar -->
    <div class="details__sidebar">
      <div>
        <ui-Card>
          <template #header>
            <ui-skeleton dir="rtl" :height="24" :loading="mainLoading">
              <div dir="rtl">
                {{ $t('_common.slug.payment_link') }}
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
                <!-- description -->
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
                      class="w-full"
                      :disabled="formLoadingImage || formLoading || formLoadingEdit"
                      name="CUSTOM_FIELD_2"
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
            <ui-TextField
              v-model="title"
              :loading="mainLoading"
              :disabled="mainLoading"
              name="title"
              :placeholder="$t('_form.addProduct.title')"
              :helper="{
                type: !!errors?.title ? 'error' : undefined,
                message: errors?.title,
              }"
            />
            <ui-TextField
              v-model="amount"
              :loading="mainLoading"
              :disabled="mainLoading"
              class="lg:w-1/2 w-full float-right mt-xl"
              name="amount"
              amount
              :unit="!mainLoading ? t('_common.currency.rial') : ''"
              :helper="{
                type: !!errors?.amount ? 'error' : undefined,
                message: errors?.amount,
              }"
              :placeholder="$t('_common.filters.amount')"
            />
          </template>
        </ui-Card>

        <!-- description -->
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
            <ui-Textarea
              auto-focus
              :loading="mainLoading"
              :disabled="mainLoading"
              :model-value="data?.description"
              class="w-full float-right"
              :max-length="500"
              name="description"
              :placeholder="$t('_common.table.description')"
              :helper="{
                type: !!errors?.description ? 'error' : 'info',
                message: errors?.description || $t('_form.addProduct.content_description'),
              }"
              @update:model-value="(val: string) => (description = val)"
            />
          </template>
        </ui-Card>

        <!-- picture box -->
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
            <ImagePreview
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
        <!-- entity box -->
        <ui-Card>
          <template #header>
            <div dir="rtl">
              <ui-skeleton class="pb-sm" :height="24" :loading="mainLoading">
                <div class="details__container__account__title">
                  {{ $t('_common.table.count') }}
                </div>
              </ui-skeleton>
            </div>
          </template>
          <template #main>
            <div class="details__container__account__subtitle" dir="rtl">
              <ui-skeleton class="-mt-xl" :width="320" :loading="mainLoading">
                <div class="-mt-xl">
                  {{ $t('_form.addProduct.count_description') }}
                </div>
              </ui-skeleton>
              <ui-skeleton class="mt-sm" :width="110" :loading="mainLoading" />
            </div>
            <div class="mt-xl flex justify-end">
              <div>
                <ui-Toggle
                  v-model="switches.entity"
                  :label="$t('_form.addProduct.select_count')"
                  class="w-full"
                  name="entitySwitch"
                  :class="{ '-mr-xs': mainLoading }"
                  :loading="mainLoading"
                  :disabled="mainLoading"
                  @update:model-value="() => (updated = false)"
                />
              </div>
            </div>
            <div
              v-if="switches.entity || (data?.limit && switches.entity)"
              class="mt-xl flex justify-end"
            >
              <ui-NumberInput
                v-model="entityValue"
                :loading="mainLoading"
                :disabled="formLoadingImage || formLoading || formLoadingEdit"
                name="entity"
                :placeholder="$t('_common.table.count')"
                :stepper="true"
                :min="1"
                :max-length="9"
                :helper="{
                  type: !!errors?.entity ? 'error' : undefined,
                  message: errors?.entity,
                }"
                class="w-1/2"
              />
            </div>
          </template>
        </ui-Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import ImagePreview from '../../common/ImagePreview.vue';
import {
  ZarinLinkRequiredFieldsStatusEnum as StatusEnum,
  ZarinLinkRequiredFieldsInputEnum,
  ZarinLinkRequiredFieldsStatusEnum,
} from '@/graphql/graphql';
import { useProductStore } from '@/stores/productStore';
import { useProductDetails } from '@/composables/product/useProductDetails';

export interface FieldType {
  name: string;
  type: StatusEnum;
  value: number;
}

export type ErrorsType = globalThis.ComputedRef<
  Partial<
    Record<
      | 'title'
      | 'entity'
      | 'amount'
      | 'description'
      | 'backLinkUnSuccess'
      | 'backLinkSuccess'
      | 'categories'
      | 'CUSTOM_FIELD_1'
      | 'CUSTOM_FIELD_2',
      string | undefined
    >
  >
>;
export type SetValueType = (
  fields: Partial<{
    title: string;
    amount: string;
    description: string;
    CUSTOM_FIELD_1?: string | undefined;
    CUSTOM_FIELD_2?: string | undefined;
    backLinkSuccess?: string | undefined;
    backLinkUnSuccess?: string | undefined;
    coupon?: boolean | undefined;
    entity?: number | undefined;
    link?: boolean | undefined;
    receipt?: number | undefined;
  }>,
  shouldValidate?: boolean | undefined
) => void;

export type ValuesType = Partial<{
  title: string;
  amount: string;
  description: string;
  CUSTOM_FIELD_1?: string | undefined;
  CUSTOM_FIELD_2?: string | undefined;
  backLinkSuccess?: string | undefined;
  backLinkUnSuccess?: string | undefined;
  coupon?: boolean | undefined;
  entity?: number | undefined;
  link?: boolean | undefined;
  receipt?: number | undefined;
}>;

export type FormFieldType = {
  label: string;
  name: ZarinLinkRequiredFieldsInputEnum;
  type: ZarinLinkRequiredFieldsStatusEnum;
  value: boolean;
}[];
const { numberFormat } = useMath();
const { data, loading, refetch, onResult } = useZarinLinkProductQueryById();
const { removeProduct, restoreProduct, deleteProductImage } = useProductMutation();
const { mutate: deleteMutate, onDone: deleteDone, loading: deleteLoading } = deleteProductImage();
const { mutate: removeMutate, onDone: removeDone, loading: removeLoading } = removeProduct();
const { mutate: restoreMutate, onDone: restoreDone, loading: restoreLoading } = restoreProduct();
const t = useI18n();
const amount = ref(data.value?.amount && numberFormat(data.value?.amount));
const fieldStore = useProductStore();
const linkToggle = ref(true);
const entityValue = ref(1);
const couponActive = ref(true);
const description = ref();
const title = ref();
const backLinkSuccess = ref();
const backLinkUnSuccess = ref();
const tempOrderField = ref();
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
  amount: '',
  description: '',
  CUSTOM_FIELD_1: '',
  CUSTOM_FIELD_2: '',
  backLinkSuccess: '',
  backLinkUnSuccess: '',
  coupon: false,
  entity: 0,
  link: false,
  receipt: '1',
  orderField: undefined,
});
const currentFormValues = computed(() => ({
  title: title.value,
  amount: amount.value,
  description: description.value,
  CUSTOM_FIELD_1: orderField.value[4].label,
  CUSTOM_FIELD_2: orderField.value[5].label,
  backLinkSuccess: backLinkSuccess.value,
  backLinkUnSuccess: backLinkUnSuccess.value,
  coupon: couponActive.value,
  entity: switches.value.entity ? entityValue.value : 0,
  link: linkToggle.value,
  receipt: receipt.value,
  orderField: undefined,
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
    initialFormValues.coupon = !!data.value.is_coupon_active;
    initialFormValues.entity = typeof data.value.limit === 'number' ? data.value.limit : 0;
    initialFormValues.link = !data.value.deleted_at;
    initialFormValues.receipt =
      !data.value.show_receipt || !data.value.successful_redirect_url ? '1' : '2';
    amount.value = numberFormat(data.value?.amount);
    title.value = data.value?.title;
    description.value = data.value?.description;
    updated.value = true;
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
  if (typeof data.value?.limit === 'number' && data.value?.limit >= 0) {
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
