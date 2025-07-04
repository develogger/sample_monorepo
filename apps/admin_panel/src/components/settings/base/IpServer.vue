<template>
  <div class="flex flex-col h-full">
    <form @submit.prevent="">
      <span class="flex justify-end text-heading-600-h2 text-text">
        {{ $t('terminal.serverIp') }}
      </span>
      <div class="flex flex-col md:flex-row my-xl gap-xl">
        <div class="flex justify-center">
          <ui-Illustration name="Server" />
        </div>
        <div class="flex flex-col gap-xl w-full items-end">
          <div class="flex flex-col gap-sm w-full items-end">
            <ui-Radio
              :loading="loadingTerminal"
              :disabled="loading || loadingTerminal"
              :label="$t('terminal.withOutIp')"
              :value="ServerIp.WITH_OUT"
              name="serverIp"
              :picked="ipRadio"
              @selected-value="ipRadio = ServerIp.WITH_OUT"
              @change="updateActions"
            />
            <ui-Radio
              :loading="loadingTerminal"
              :disabled="loading || loadingTerminal"
              :label="$t('terminal.withIp')"
              :value="ServerIp.WITH"
              name="serverIp"
              :picked="ipRadio"
              @selected-value="ipRadio = ServerIp.WITH"
              @change="updateActions"
            />
          </div>
          <ui-TextField
            v-if="ipRadio === ServerIp.WITH"
            v-model="ipNumber"
            class="w-full"
            :disabled="loading || loadingTerminal"
            name="server_ip"
            :helper="{
              type: !!errors?.server_ip ? 'error' : undefined,
              message: errors?.server_ip,
            }"
            :loading="loadingTerminal"
            :placeholder="$t('terminal.serverIp')"
            @update:model-value="updateActions"
          >
          </ui-TextField>
        </div>
      </div>
      <div class="flex gap-xs">
        <ui-Button
          :text="t('_common.buttons.save')"
          :disabled="loading || disableSubmit || !!errors?.server_ip"
          :loading="loading"
          @click="onSubmit()"
        />
        <ui-Button
          v-if="showCancel"
          :disabled="loading || loadingTerminal"
          :text="$t('_common.buttons.cancel')"
          type="secondary"
          @click="resetForm"
        />
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useIpServerSchema } from '@/composables/setting/usePhoneNumberSchema';
import { useTerminalMutation } from '@/composables/terminal/useTerminalMutation';
import { useTerminalQuery } from '@/composables/terminal/useTerminalQuery';
import { MutationTerminalEditArgs } from '@/graphql/graphql';

enum ServerIp {
  WITH = 'withIp',
  WITH_OUT = 'withOutIp',
}
const { $notify } = useNuxtApp();
const t = useI18n();
const { activeTerminal, onResult, refetch, loading: loadingTerminal } = useTerminalQuery();
const ipRadio = ref<string>(activeTerminal.value?.server_ip ? ServerIp.WITH : ServerIp.WITH_OUT);
const bankAccountId = computed(() => activeTerminal.value?.server_ip);
const ipNumber = ref<string>(activeTerminal.value?.server_ip ?? '');
const { schema } = useIpServerSchema({ ipRadio, bankAccountId });
const { handleSubmit, errors, setFieldError } = useForm({
  validationSchema: schema,
});
type validateType = 'bank_account_id' | 'server_ip';
const { snakeToCamel } = useSnakeToCamel();
const { terminalEdit } = useTerminalMutation();
const { mutate, onDone, loading } = terminalEdit((input, message, params) =>
  setFieldError(snakeToCamel(input) as validateType, t('_validation.' + message, params))
);
const showCancel = ref(false);
const disableSubmit = ref(true);
onMounted(() => {
  refetch();
});
const resetActions = () => {
  showCancel.value = false;
  disableSubmit.value = true;
};
const onSubmit = handleSubmit(values => {
  const variables: MutationTerminalEditArgs = {
    id: activeTerminal.value?.id,
    bank_account_id: activeTerminal.value?.preferred_bank_account_id,
    server_ip: values.server_ip || '',
  } as MutationTerminalEditArgs;
  mutate(variables);
});
onDone(() => {
  refetch();
  loadingTerminal.value = false;
  $notify({
    isRead: false,
    message: t('common.success'),
    type: 'success',
  });
  resetActions();
});
const updateActions = () => {
  disableSubmit.value = false;
  showCancel.value = true;
};
const resetForm = () => {
  ipRadio.value = activeTerminal.value?.server_ip ? ServerIp.WITH : ServerIp.WITH_OUT;
  ipNumber.value = activeTerminal.value?.server_ip;
  resetActions();
};
onResult(() => {
  ipRadio.value = activeTerminal.value?.server_ip ? ServerIp.WITH : ServerIp.WITH_OUT;
  ipNumber.value = activeTerminal.value?.server_ip ?? '';
});
</script>
