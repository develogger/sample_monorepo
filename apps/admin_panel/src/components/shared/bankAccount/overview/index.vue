<template>
  <SharedBankAccountOverviewMdView
    v-if="lg"
    :is-share="isShare"
    :selectable="selectable"
    :selected-bank-account="selectedBankAccount"
    @select="handleExposer"
    @bank-account-data="
      (bankAccountList: BankAccount[]) => $emit('bankAccountData', bankAccountList)
    "
  />
  <SharedBankAccountOverviewLgView
    v-else
    :is-share="isShare"
    :selectable="selectable"
    :selected-bank-account="selectedBankAccount"
    @select="handleExposer"
  />
</template>

<script setup lang="ts">
import { BankAccount } from '@/graphql/graphql';

export interface Props {
  selectable?: boolean;
  isShare?: boolean;
  selectedBankAccount: BankAccount | undefined;
  lg: boolean;
}
const store = useBankAccountStore();
withDefaults(defineProps<Props>(), {
  isShare: true,
});

const emit = defineEmits(['select', 'bankAccountData']);
const handleExposer = (value: string[]) => {
  emit('select', value);
};
onUnmounted(() => {
  store.searchText = '';
});
</script>
