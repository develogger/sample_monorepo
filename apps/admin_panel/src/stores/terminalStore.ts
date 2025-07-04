import type { PaginationTypes } from '@/types/paginationTypes';

import { Maybe, TerminalType } from '@/graphql/graphql';
import { defineStore } from 'pinia';

import type { MinimalTerminal } from '~/types/minimalTerminalType';

export const useActiveTerminal = defineStore('activeTerminal', {
  actions: {
    fill(terminals: TerminalType[]) {
      if (!terminals.length) {
        this.terminals = [];
        this.setActiveTerminal({} as TerminalType);

        return;
      }
      const sorted = terminals?.sort((a, b) => {
        if (a.pin === b.pin) {
          return 0;
        }
        // !!a.pin
        if (a.pin === null || a.pin === undefined) {
          return 1;
        }
        if (b.pin === null || b.pin === undefined) {
          return -1;
        }

        return a.pin < b.pin ? 1 : -1;
      });
      this.terminals = sorted;
      const route = useRoute();
      const active = terminals.filter(t => t.domain === route.params.terminal)[0] || terminals[0];
      this.setActiveTerminal(active);
    },
    setActiveTerminal(terminal: TerminalType) {
      this.active = {
        domain: terminal.domain,
        fee_group: terminal.fee_group,
        id: terminal.id,
        owner_id: terminal.owner_id,
        permissions: terminal.permissions,
        reconcile_type: terminal.reconcile_type,
        status: terminal.status,
      };

      const terminalStore = useTerminalStore();

      terminalStore.setDomain(terminal.domain ?? '');
      terminalStore.setLogo(terminal.logo ?? '');
      terminalStore.setTerminalId(terminal.id);
      terminalStore.setBankAccountId(terminal.preferred_bank_account_id as string);
    },
  },
  getters: {
    get(): MinimalTerminal | null {
      return this.active;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
  state: () => ({
    active: {} as MinimalTerminal,
    terminals: [] as MinimalTerminal[],
  }),
});

export const useTerminalStore = defineStore(
  'terminalStore',
  () => {
    const data = ref();
    const loading = ref();
    const refetch = ref();
    const pagination: PaginationTypes = reactive({
      last_page: 0,
      total: 0,
    });
    const currentTerminal = ref<string>();
    const currentDomain = ref<Maybe<string> | undefined>();
    const currentTerminalName = ref<TerminalType['name']>();
    const preferredBankAccountId = ref<Maybe<string> | undefined>();
    const currentLogo = ref<Maybe<string> | undefined>();
    const supportPhone = ref<string>();
    const chnType = ref<string>('');
    const feeType = ref<string>('');
    const ipServer = ref();
    const reconcilePriority = ref();
    const bankAccountData = ref();
    const logoVersion = ref(1);

    function setDomain(domain: string) {
      currentDomain.value = encodeURIComponent(domain);
    }

    function setLogo(logo: string) {
      currentLogo.value = logo;
    }

    function setTerminalId(terminalId: string) {
      currentTerminal.value = terminalId;
    }

    function setBankAccountId(bankAccountId: string) {
      preferredBankAccountId.value = bankAccountId;
    }

    return {
      bankAccountData,
      chnType,
      currentDomain,
      currentLogo,
      currentTerminal,
      currentTerminalName,
      data,
      feeType,
      ipServer,
      loading,
      logoVersion,
      pagination,
      preferredBankAccountId,
      reconcilePriority,
      refetch,
      setBankAccountId,
      setDomain,
      setLogo,
      setTerminalId,
      supportPhone,
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
