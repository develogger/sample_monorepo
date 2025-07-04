<template>
  <ui-Modal
    v-if="show"
    :text="$t('common.setting')"
    close-icon
    header
    class="lg:max-w-[600px] h-[330px]"
    main-class="modal__body--select pb-xs"
    @close="modalToggleHandler"
  >
    <template #body>
      <div class="flex flex-col">
        <span class="text-body-400-b2">
          {{ $t('_referral.payment_iban_info') }}
        </span>
        <div>
          <SharedBankAccountHeader
            :is-share="false"
            :selected-bank-account="selectedBank"
            :loading="loading"
            @select="onSelectBankAccount"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex gap-xs w-full justify-end">
        <ui-Button
          type="secondary"
          size="medium"
          :loading="loading"
          :text="$t('common.cancel')"
          @click="modalToggleHandler()"
        />
        <ui-Button
          type="primary"
          size="medium"
          :disabled="!selectedBankAccountId || disable"
          :loading="submitLoading || loading"
          :text="$t('_common.buttons.save')"
          @click="changeBankAccount()"
        />
      </div>
    </template>
  </ui-Modal>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { BankAccount, MutationReferrerInvoiceSetIbanArgs } from '@/graphql/graphql';
import { useReferrerInvoiceGetIbanQuery } from '@/composables/referral/useReferralInvoiceIbanQuery';
import { useReferralMutation } from '@/composables/referral/useReferralMutation';

export interface Props {
  show: boolean;
}
const props = withDefaults(defineProps<Props>(), {});
const { show } = toRefs(props);
const emit = defineEmits(['close']);
const { $notify } = useNuxtApp();
const t = useI18n();
const store = useBankAccountStore();
const { data, loading, onResult, refetch } = useReferrerInvoiceGetIbanQuery();
const { selectedBankAccountId } = storeToRefs(store);
const { setIban } = useReferralMutation();
const { mutate, onDone, loading: submitLoading } = setIban();
const selectedBank = ref();
const disable = ref(true);
const onSelectBankAccount = (bankAccount: BankAccount) => {
  if (bankAccount && bankAccount.id !== selectedBank.value) {
    selectedBank.value = bankAccount;
    disable.value = false;
  }
};
const changeBankAccount = () => {
  const variables = {
    bank_account_id: selectedBankAccountId.value,
  } as MutationReferrerInvoiceSetIbanArgs;
  mutate(variables);
};
onDone(() => {
  $notify({
    isRead: false,
    message: t('common.success'),
    type: 'success',
  });
  refetch();
  modalToggleHandler();
});
const modalToggleHandler = () => {
  emit('close');
};
onResult(() => {
  selectedBank.value = data.value;
});
onMounted(() => {
  refetch();
  disable.value = true;
});
onUnmounted(() => {
  store.selectedBankaccount = [];
  store.selectedBankAccountId = undefined;
  selectedBank.value = undefined;
});
</script>
