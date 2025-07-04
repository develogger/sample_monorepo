import { BankAccount } from '@/graphql/graphql';
import { defineStore } from 'pinia';

export const useBankAccountList = defineStore('bankAccountList', {
  actions: {
    fill(list: BankAccount[]) {
      this.bankAccounts = list;
    },
  },
  getters: {
    get({ bankAccounts }): BankAccount[] {
      return bankAccounts;
    },
  },
  state: () => ({
    bankAccounts: [] as BankAccount[],
  }),
});

export const useBankAccountStore = defineStore('bankAccountStore', () => {
  const searchText = '';
  const bankaccount = ref<string[]>([]);
  const selectedBankaccount = ref<BankAccount | string[] | undefined>([]);
  const showToggleSelectedBankAccount = false;
  const assignee = ref<string[]>([]);
  const selectedBankAccountId = ref<string>();
  const refetch = ref();
  const modalType = ref<'instantPay' | 'noramal'>('noramal');
  const instantBanksList = ref<string[]>([]);

  return {
    assignee,
    bankaccount,
    instantBanksList,
    modalType,
    refetch,
    searchText,
    selectedBankAccountId,
    selectedBankaccount,
    showToggleSelectedBankAccount,
  };
});
