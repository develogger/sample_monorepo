import {
  BankAccount,
  BankAccountTypeEnum,
  Iban,
  InputMaybe,
  PaginationType,
  Query,
  QueryBankAccountsArgs,
  QueryCheckCardIbanArgs,
  Scalars,
} from '@/graphql/graphql';
import { computed } from 'vue';

import { BANK_ACCOUNTS_PAGE_SIZE } from '~/consts/bankAccount';

export const useBankAccountsById = (id: QueryBankAccountsArgs['id']) => {
  const { loading, onError, onResult, refetch, result } = useQuery<Query>(BankAccountSchema, {
    id,
  } as QueryBankAccountsArgs);

  onError(error => {
    errorHandler(error);
  });

  const filteredData = computed(() => {
    if (result.value?.BankAccounts && _isArray(result.value?.BankAccounts)) {
      return result.value.BankAccounts;
    }
    if (typeof result.value?.BankAccounts === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData,
    loading,
    onResult,
    refetch,
  };
};
export const useBankAccountsByIdLazy = (id: QueryBankAccountsArgs['id']) => {
  const { error, load, loading, onError, onResult, refetch, restart, result } = useLazyQuery<Query>(
    BankAccountsSchema,
    {
      id,
    } as QueryCheckCardIbanArgs,

    () => ({
      fetchPolicy: 'no-cache',
    })
  );
  const filteredData = computed(() => {
    if (result.value?.BankAccounts && _isArray(result.value?.BankAccounts)) {
      return result.value.BankAccounts[0] as BankAccount;
    }
    if (typeof result.value?.BankAccounts === 'undefined') {
      return undefined;
    }

    return undefined;
  });
  onError(error => {
    errorHandler(error);
  });

  return {
    data: filteredData,
    error,
    load,
    loading,
    onError,
    onResult,
    refetch,
    restart,
  };
};
export const usePersonalAccount = () => {
  const { loading, onError, onResult, refetch, result } = useQuery<Query>(BankAccountSchema, {
    type: BankAccountTypeEnum.Personal,
  });

  onError(error => {
    errorHandler(error);
  });

  const filteredData = computed(() => {
    if (result.value?.BankAccounts && _isArray(result.value?.BankAccounts)) {
      return result.value.BankAccounts;
    }
    if (typeof result.value?.BankAccounts === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData,
    loading,
    onResult,
    refetch,
  };
};
export const useShareAccount = () => {
  const { loading, onError, onResult, refetch, result } = useQuery<Query>(BankAccountSchema, {
    type: BankAccountTypeEnum.Share,
  });

  onError(error => {
    errorHandler(error);
  });

  const filteredData = computed(() => {
    if (result.value?.BankAccounts && _isArray(result.value?.BankAccounts)) {
      return result.value.BankAccounts;
    }
    if (typeof result.value?.BankAccounts === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData,
    loading,
    onResult,
    refetch,
  };
};
export const useBankAccountLazy = () => {
  const { error, load, loading, onError, onResult, refetch, restart, result } = useLazyQuery<Query>(
    BankAccountsSchema,
    {
      limit: 200,
    } as QueryCheckCardIbanArgs,

    () => ({
      fetchPolicy: 'no-cache',
    })
  );
  const filteredData = computed(() => {
    if (result.value?.BankAccounts && _isArray(result.value?.BankAccounts)) {
      return result.value.BankAccounts;
    }
    if (typeof result.value?.BankAccounts === 'undefined') {
      return undefined;
    }

    return [];
  });
  onError(error => {
    errorHandler(error);
  });

  return {
    data: filteredData,
    error,
    load,
    loading,
    onError,
    onResult,
    refetch,
    restart,
  };
};
const useBankAccount = () => {
  const useBankAccountListStore = useBankAccountList();
  const config = useRuntimeConfig();
  const { loading, onResult, refetch, result } = useQuery<Query>(BankAccountsSchema, {
    limit: BANK_ACCOUNTS_PAGE_SIZE,
    offset: BANK_ACCOUNTS_PAGE_SIZE * (config.public.page - 1),
    pagination: true,
  });
  const filteredData = computed(() => {
    if (result.value?.BankAccounts && _isArray(result.value?.BankAccounts)) {
      useBankAccountListStore.fill(result.value.BankAccounts as unknown as BankAccount[]);

      return result.value.BankAccounts;
    }
    if (typeof result.value?.BankAccounts === 'undefined') {
      return undefined;
    }

    return [];
  });
  const pagination = computed<null | PaginationType>(() => {
    if (result.value && !_isEmpty(result.value.Pagination)) {
      if (result.value?.Pagination) {
        return result.value?.Pagination[0];
      }
    }

    return null;
  });

  return {
    data: filteredData,
    loading,
    onResult,
    pagination,
    refetch,
  };
};
export const checkCardIBAN = (
  {
    iban,
    pan,
  }: {
    iban?: Ref<InputMaybe<string> | undefined>;
    pan?: Ref<InputMaybe<Scalars['MaskedPan']['input']>>;
  },
  validationErrorsCb: (input: string, rule: string, params: string[]) => void
) => {
  const { error, load, loading, onError, onResult, refetch, restart, result } = useLazyQuery<Query>(
    CheckCardIBANMutationSchema,
    {
      iban,
      pan,
    } as QueryCheckCardIbanArgs,

    () => ({
      fetchPolicy: 'no-cache',
    })
  );
  const filteredData = computed(() => {
    if (result.value?.CheckCardIBAN) {
      return result.value.CheckCardIBAN;
    }
    if (typeof result.value?.CheckCardIBAN === 'undefined') {
      return undefined;
    }

    return [];
  });
  onError(error => {
    // errorHandler(error);
    errorHandler(error, value => {
      value?.validation.forEach(element => {
        validationErrorsCb(element.input, element.rule, element.params);
      });
    });
  });

  return {
    data: filteredData as Ref<Iban>,
    error,
    load,
    loading,
    onError,
    onResult,
    refetch,
    restart,
  };
};
export const useBankQuery = () => ({
  checkCardIBAN,
  useBankAccount,
  useBankAccountLazy,
  useBankAccountsById,
  useBankAccountsByIdLazy,
  usePersonalAccount,
  useShareAccount,
});
