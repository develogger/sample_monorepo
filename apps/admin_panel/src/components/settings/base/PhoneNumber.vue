<template>
  <div class="flex flex-col h-full">
    <form @submit.prevent="onSubmit">
      <span class="flex justify-end text-heading-600-h2 text-text">
        {{ $t('terminal.phoneNumber') }}
      </span>
      <div class="flex flex-col md:flex-row my-xl gap-xl">
        <div class="flex justify-center">
          <ui-Illustration name="Telephone" />
        </div>
        <div class="flex flex-col gap-xl">
          <span dir="rtl" class="text-body-400-b3 text-text-soft">
            {{ $t('terminal.describe') }}
          </span>
          <ui-TextField
            v-model="phoneNumber"
            :disabled="loading || loadingTerminal"
            class="w-full xxx"
            name="phoneNumber"
            is-number
            :helper="{
              type: !!errors?.phoneNumber ? 'error' : undefined,
              message: errors?.phoneNumber,
            }"
            :loading="loadingTerminal"
            label
            :placeholder="$t('terminal.phoneNumber')"
            @update:model-value="updateActions"
          >
          </ui-TextField>
        </div>
      </div>
      <div class="flex gap-xs">
        <ui-Button
          :text="t('_common.buttons.save')"
          :disabled="loading || disableSubmit || !!errors?.phoneNumber"
          :loading="loading"
          @click="onSubmit"
        />
        <ui-Button
          v-if="showCancel"
          :disabled="loading || disableSubmit"
          :text="$t('_common.buttons.cancel')"
          type="secondary"
          @click="resetForm"
        />
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { usePhoneNumberSchema } from '@/composables/setting/usePhoneNumberSchema';
import { useTerminalMutation } from '@/composables/terminal/useTerminalMutation';
import { useTerminalQuery } from '@/composables/terminal/useTerminalQuery';

const { $notify } = useNuxtApp();
const t = useI18n();
const { schema } = usePhoneNumberSchema();
const { handleSubmit, errors, setFieldError } = useForm({
  validationSchema: schema,
});
const { activeTerminal, refetch, loading: loadingTerminal, onResult } = useTerminalQuery();
const { terminalEdit } = useTerminalMutation();
type validateType = 'bank_account_id' | 'phoneNumber';
const { snakeToCamel } = useSnakeToCamel();
const { mutate, onDone, loading } = terminalEdit((input, message, params) =>
  setFieldError(snakeToCamel(input) as validateType, t('_validation.' + message, params))
);
const showCancel = ref(false);
const disableSubmit = ref(true);
const resetActions = () => {
  showCancel.value = false;
  disableSubmit.value = true;
};
onMounted(() => {
  refetch();
});
const onSubmit = handleSubmit(values => {
  mutate({
    id: activeTerminal.value?.id,
    bank_account_id: activeTerminal.value?.preferred_bank_account_id,
    support_phone: values.phoneNumber,
  });
});
onDone(() => {
  refetch();
  $notify({
    isRead: false,
    message: t('common.success'),
    type: 'success',
  });
  resetActions();
});
const phoneNumber = ref<string>(activeTerminal.value?.support_phone ?? '');
const updateActions = () => {
  disableSubmit.value = false;
  showCancel.value = true;
};
const resetForm = () => {
  phoneNumber.value = activeTerminal.value?.support_phone;
  resetActions();
};
onResult(() => {
  phoneNumber.value = activeTerminal.value?.support_phone ?? '';
});
</script>
<style lang="scss">
input#phoneNumber {
  direction: ltr;
  @apply text-right;
}
</style>
