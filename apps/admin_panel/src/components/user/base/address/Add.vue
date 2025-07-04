<!-- eslint-disable vue/require-default-prop -->
<!-- eslint-disable vue/require-default-prop -->
import { log } from 'console';
<template>
  <div class="root" dir="rtl">
    <ui-Modal
      ref="filterRef"
      :text="id ? $t('_address.edit') : $t('_address.add.title')"
      close-icon
      class="md:!w-[480px] md:max-h-[88vh] lg:max-h-[88vh]"
      header
      :outside-click="false"
      @close="toggleModal"
    >
      <template #body>
        <div>
          <form dir="rtl" @submit.prevent="">
            <ui-TextField
              v-model="title"
              :auto-focus="false"
              :disabled="addLoading || editLoading"
              :loading="addLoading || editLoading"
              name="title"
              dir="ltr"
              :placeholder="$t('_address.add.addressName')"
              :helper="{
                type: !!errors?.title ? 'error' : undefined,
                message: errors?.title,
              }"
              @update:model-value="disableSubmit = false"
            />
            <span class="text-text-soft text-body-400-b3">{{ $t('_address.add.guide') }}</span>
            <ui-Textarea
              v-model="address"
              :disabled="addLoading || editLoading"
              :loading="addLoading || editLoading"
              class="mt-xl"
              dir="ltr"
              name="address"
              :placeholder="$t('_address.add.address')"
              :helper="{
                type: !!errors?.address ? 'error' : undefined,
                message: errors?.address,
              }"
              @update:model-value="disableSubmit = false"
            />
            <ui-TextField
              v-model="postalCode"
              class="mt-xl"
              :disabled="(edit && isPostalCodeVerified) || addLoading || editLoading"
              :loading="addLoading || editLoading"
              name="postalCode"
              :is-number="true"
              dir="ltr"
              :placeholder="$t('_address.add.postalCode')"
              :helper="{
                type: !!errors?.postalCode ? 'error' : undefined,
                message: errors?.postalCode,
              }"
              @update:model-value="disableSubmit = false"
            />
            <ui-TextField
              v-model="landline"
              class="mt-xl"
              :disabled="addLoading || editLoading"
              :loading="addLoading || editLoading"
              name="landline"
              :is-number="true"
              dir="ltr"
              :placeholder="$t('_address.add.lanLine')"
              :helper="{
                type: !!errors?.landline ? 'error' : undefined,
                message: errors?.landline,
              }"
              @update:model-value="disableSubmit = false"
            />
          </form>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end w-full">
          <ui-Button
            size="medium"
            class="inline-flex main__item--button"
            type="secondary"
            :text="$t('common.cancel')"
            :disabled="addLoading || editLoading"
            @click="toggleModal"
          />
          <ui-Button
            class="inline-flex mr-xs main__item--button"
            size="medium"
            type="primary"
            :text="$t('_address.add.save')"
            :loading="addLoading || editLoading"
            :disabled="!meta?.valid || addLoading || editLoading || (edit && disableSubmit)"
            @click="onSubmit"
          />
        </div>
      </template>
    </ui-Modal>
  </div>
</template>
<script setup lang="ts">
import { UserType, MutationAddressAddArgs, MutationAddressEditArgs } from '@/graphql/graphql';
import { useAddressSchema } from '@/composables/address/useAddressSchema';
import { useSnakeToCamel } from '@/composables/useSnake';
import { useAddressMutation } from '@/composables/address/useAddressMutation';

export interface Props {
  edit?: boolean;
  id: string;
  modal?: boolean;
  show: boolean;
  loading?: boolean;
  userAddress: UserType | undefined;
}
const toggleModal = inject<(() => void | undefined) | undefined>('toggleModal');
const title = ref<string>();
const landline = ref<string>();
const postalCode = ref<string>();
const address = ref<string>();
const isPostalCodeVerified = ref(false);
const disableSubmit = ref(false);
const props = withDefaults(defineProps<Props>(), {});
const { id, userAddress, edit } = toRefs(props);
const emit = defineEmits(['done']);
const filteredData = computed(
  () => userAddress.value && _filter(userAddress.value?.addresses, ['id', id?.value])
);
const t = useI18n();
const { schema } = useAddressSchema();
const { handleSubmit, errors, setFieldError, meta, resetForm } = useForm({
  validationSchema: schema,
});
const { addressAdd, addressEdit } = useAddressMutation();
type validation = 'address' | 'landline' | 'postalCode' | 'title';
const { snakeToCamel } = useSnakeToCamel();
const {
  mutate,
  onDone,
  loading: addLoading,
} = addressAdd((input, message, params) => {
  setFieldError(snakeToCamel(input) as validation, t('_validation.' + message, params));
});
const { mutate: editMutate, onDone: editDone, loading: editLoading } = addressEdit();
const { $notify } = useNuxtApp();
const onSubmit = handleSubmit(values => {
  const variables: MutationAddressAddArgs = {
    title: values.title,
    address: values.address,
    landline: values.landline,
    postal_code: values.postalCode,
    type: 'OTHER',
  } as MutationAddressAddArgs;

  if (edit.value) {
    const variablesEdit: MutationAddressEditArgs = {
      id: id.value,
      title: values.title,
      address: values.address,
      landline: values.landline,
      postal_code: values.postalCode,
      type: 'OTHER',
    } as MutationAddressEditArgs;
    editMutate(variablesEdit);
  } else {
    mutate(variables);
  }
});
const done = () => {
  emit('done');
  resetForm();
  $notify({
    isRead: false,
    message: t('common.success'),
    type: 'success',
  });
};
editDone(() => {
  done();
});
onDone(() => {
  done();
});
watch(
  () => edit?.value,
  () => {
    if (edit?.value) {
      title.value = filteredData.value[0]?.title
        ? filteredData.value[0]?.title
        : t(`_address.type.${filteredData.value[0]?.type}`);
      address.value = filteredData.value[0]?.address;
      landline.value = filteredData.value[0]?.landline;
      postalCode.value = filteredData.value[0]?.postal_code;
      isPostalCodeVerified.value = filteredData.value[0]?.is_postal_code_verified;
      disableSubmit.value = true;
    } else {
      title.value = '';
      postalCode.value = '';
      landline.value = '';
      address.value = '';
      isPostalCodeVerified.value = false;
    }
  },
  { immediate: true }
);
</script>
