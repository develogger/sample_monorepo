<template>
  <div class="flex flex-col h-full">
    <form @submit.prevent="onSubmit">
      <span class="flex justify-end text-heading-600-h2">
        {{ $t('_terminal.chnType.ayan') }}
      </span>
      <div class="lg:flex md:flex items-center gap-xs w-full" dir="rtl">
        <span class="flex justify-right text-body-400-b3 text-text-soft mb-md mt-xl">{{
          $t('_terminal.chnType.queryLevel')
        }}</span>
      </div>
      <div class="lg:flex md:flex items-center gap-md w-full">
        <ui-Radio-Card
          v-model="level"
          class="lg:w-1/2 md:w-1/2 sm:w-full sm:mb-md xs:mb-md min-h-[94px]"
          disabled
          :label="$t('_terminal.chnType.advance')"
          :description="$t('_terminal.chnType.advanceDescribe')"
          :val="Level.ADVANCE"
          name="level"
        />
        <ui-Radio-Card
          v-model="level"
          disabled
          class="lg:w-1/2 md:w-1/2 sm:w-full sm:mb-md xs:mb-md min-h-[94px]"
          :label="$t('_terminal.chnType.base')"
          :description="$t('_terminal.chnType.baseDescribe')"
          :val="Level.BASE"
          name="level"
        />
      </div>
      <div class="lg:flex md:flex items-center gap-xs w-full mb-md mt-md" dir="rtl">
        <span class="justify-right text-body-400-b3 text-text-soft">{{
          $t('_terminal.chnType.quereyMethod')
        }}</span>
        <span>
          <ui-Label :text="$t('_terminal.chnType.base')" type="neutral" />
        </span>
      </div>
      <div class="lg:flex md:flex items-center gap-md w-full">
        <ui-Radio-Card
          v-model="radio"
          class="lg:w-1/2 md:w-1/2 sm:w-full sm:mb-md xs:mb-md min-h-[134px]"
          :label="$t('_terminal.chnType.auto')"
          :description="$t('_terminal.chnType.autoDescribe')"
          val="SESSION"
          name="SESSION"
          :disabled="loading || loadingTerminal"
          :loading="loadingTerminal"
          @update:model-value="updateActions"
        />

        <ui-Radio-Card
          v-model="radio"
          class="lg:w-1/2 md:w-1/2 sm:w-full sm:mb-md xs:mb-md min-h-[134px]"
          :label="$t('_terminal.chnType.default')"
          :description="$t('_terminal.chnType.defaultDescribe')"
          val="WALLET"
          name="WALLET"
          :disabled="loading || loadingTerminal"
          :loading="loadingTerminal"
          @update:model-value="updateActions"
        />
      </div>
      <div v-if="radio === 'WALLET'" dir="rtl" class="text-text-soft text-body-400-b3 mb-md mt-sm">
        {{ $t('_helper.settings.ayan_description') }}
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

const { $notify } = useNuxtApp();
const t = useI18n();
const { activeTerminal, refetch, loading: loadingTerminal, onResult } = useTerminalQuery();
const { terminalEdit } = useTerminalMutation();
const { snakeToCamel } = useSnakeToCamel();
const { setFieldError } = useForm({
  validationSchema: null,
});
type validateType = '';
const { mutate, onDone, loading } = terminalEdit((input, message, params) =>
  setFieldError(snakeToCamel(input) as validateType, t('_validation.' + message, params))
);
const store = useTerminalStore();
const radio = ref<string | undefined | null>();
enum Level {
  BASE = 'base',
  ADVANCE = 'advance',
}
const level = ref(Level.BASE);
const showCancel = ref(false);
const disableSubmit = ref(true);
onMounted(() => {
  refetch();
});
const resetActions = () => {
  showCancel.value = false;
  disableSubmit.value = true;
};
const reset = () => {
  radio.value = activeTerminal.value?.chn_type;
  resetActions();
};
const updateActions = (val: string) => {
  if (activeTerminal.value?.chn_type === val) {
    return;
  }
  disableSubmit.value = false;
  showCancel.value = true;
};
const onSubmit = () => {
  mutate({
    id: store.currentTerminal,
    bank_account_id: activeTerminal.value?.preferred_bank_account_id,
    chn_type: radio.value,
  });
};
onDone(() => {
  store.chnType = radio.value ?? '';
  resetActions();
  refetch();
  loadingTerminal.value = false;
  $notify({
    isRead: false,
    message: t('common.success'),
    type: 'success',
  });
});
onResult(() => {
  radio.value = activeTerminal.value?.chn_type;
});
</script>
