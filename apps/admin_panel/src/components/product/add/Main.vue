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
            <ui-Textarea
              auto-focus
              :loading="mainLoading"
              :disabled="mainLoading"
              :model-value="data?.description"
              class="w-full float-right mt-xl"
              :max-length="250"
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
            <!-- uploaded file -->
            <div
              v-if="data?.images?.length"
              dir="rtl"
              class="rounded-sm border border-border-divider px-sm"
            >
              <div class="flex justify-between items-center my-md">
                <div class="flex gap-md items-center">
                  <ui-skeleton :loading="mainLoading" :height="40" :width="40">
                    <NuxtImg
                      :src="data?.images[0]?.url"
                      class="rounded-sm object-cover h-[40px]"
                      width="40"
                      height="40"
                    />
                  </ui-skeleton>
                  <ui-skeleton :loading="mainLoading">
                    <div class="text-text truncate lg:max-w-[250px] max-w-[200px]">
                      {{ data?.title }}
                    </div>
                  </ui-skeleton>
                </div>
                <ui-Button
                  :loading="deleteLoading || mainLoading"
                  icon="Trash"
                  type="tertiary"
                  class="w-[40px] h-[40px]"
                  @click="deleteFileFromUploaded"
                />
              </div>
            </div>
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
import { useProductMutation } from '../../../composables/product/useProductMutation';
import {
  ZarinLinkRequiredFieldsStatusEnum as StatusEnum,
  ZarinLinkRequiredFieldsInputEnum,
  ZarinLinkRequiredFieldsStatusEnum,
} from '@/graphql/graphql';
import { useProductQueryById } from '@/composables/product/useProductQueryById';
import { useProductStore } from '@/stores/productStore';

export type ErrorsType = globalThis.ComputedRef<
  Partial<
    Record<
      'title' | 'entity' | 'amount' | 'description' | 'backLinkUnSuccess' | 'backLinkSuccess',
      string | undefined
    >
  >
>;

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
const { data, loading, refetch, onResult } = useProductQueryById();
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
const formValues: ValuesType | undefined = inject('form_values');
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
  if (!data.value?.show_receipt || !data.value?.successful_redirect_url) {
    receipt.value = '1';
  } else {
    receipt.value = '2';
  }
  if (typeof data.value?.limit === 'number' && data.value?.limit >= 0) {
    switches.value.entity = true;
    entityValue.value = data.value.limit;
  }
  if (data.value?.required_fields) {
    const value = data.value.required_fields.map(i => ({
      name: i?.input,
      type: i?.status,
      label: i?.placeholder ?? '',
      value: i?.status !== StatusEnum.Hidden,
    }));
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
