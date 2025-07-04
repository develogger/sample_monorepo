<template>
  <div class="flex flex-col h-full">
    <form @submit.prevent="onSubmit">
      <span class="flex justify-end text-heading-600-h2 text-text">
        {{ $t('_common.slug.fee_settings') }}
      </span>
      <span class="flex justify-end text-body-400-b3 text-text-soft my-xl">{{
        $t('_helper.settings.fee_description')
      }}</span>
      <div class="flex flex-col md:flex-row my-xl gap-md md:justify-end">
        <div class="flex justify-center md:w-1/2 w-full">
          <ui-Radio-Card
            v-model="radio"
            :label="$t('_form.add_invoice.buyer')"
            :description="$t('_helper.settings.fee_description_Payer')"
            :val="TerminalFeeTypeEnum.Payer"
            :loading="loadingTerminal"
            :disabled="loadingTerminal || loading"
            name="feeSetting"
            @update:model-value="updateActions"
          />
        </div>
        <div class="flex justify-center md:w-1/2 w-full">
          <ui-Radio-Card
            v-model="radio"
            :label="$t('_form.add_invoice.acceptor')"
            :description="$t('_helper.settings.fee_description_merchant')"
            :val="TerminalFeeTypeEnum.Merchant"
            name="feeSetting"
            :loading="loadingTerminal"
            :disabled="loadingTerminal || loading"
            @update:model-value="updateActions"
          />
        </div>
      </div>
      <div class="flex gap-xs">
        <ui-Button
          :text="t('_common.buttons.save')"
          :disabled="loading || disableSubmit"
          :loading="loading"
          @click="onSubmit"
        />
        <ui-Button
          v-if="showCancel"
          :text="$t('_common.buttons.cancel')"
          type="secondary"
          :disabled="loading || loadingTerminal"
          @click="reset"
        />
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useTerminalMutation } from '@/composables/terminal/useTerminalMutation';
import { useTerminalQuery } from '@/composables/terminal/useTerminalQuery';
import { TerminalFeeTypeEnum } from '@/graphql/graphql';
const { $notify } = useNuxtApp();
const t = useI18n();
const store = useTerminalStore();
const { activeTerminal, onResult, refetch, loading: loadingTerminal } = useTerminalQuery();
const radio = ref<string | undefined | null>();
const showCancel = ref(false);
const disableSubmit = ref(true);
const { terminalEdit } = useTerminalMutation();
const { snakeToCamel } = useSnakeToCamel();
const { setFieldError } = useForm({
  validationSchema: null,
});
type validateType = '';
const { mutate, onDone, loading } = terminalEdit((input, message, params) =>
  setFieldError(snakeToCamel(input) as validateType, t('_validation.' + message, params))
);
onMounted(() => {
  refetch();
});
const resetActions = () => {
  showCancel.value = false;
  disableSubmit.value = true;
};
const onSubmit = () => {
  mutate({
    id: store.currentTerminal,
    bank_account_id: activeTerminal.value && activeTerminal.value?.preferred_bank_account_id,
    fee_type: radio.value,
  });
};
onDone(() => {
  store.feeType = radio.value ?? '';
  resetActions();
  refetch();
  loadingTerminal.value = false;
  $notify({
    isRead: false,
    message: t('common.success'),
    type: 'success',
  });
});
const reset = () => {
  radio.value = activeTerminal.value?.fee_type;
  resetActions();
};
const updateActions = (val: string) => {
  if (activeTerminal.value?.fee_type === val) {
    return;
  }
  disableSubmit.value = false;
  showCancel.value = true;
};
onResult(() => {
  radio.value = activeTerminal.value?.fee_type;
});
</script>
