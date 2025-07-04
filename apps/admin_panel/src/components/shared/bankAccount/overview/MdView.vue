<template>
  <ui-Modal
    close-icon
    :text="$t('_bank_account.title')"
    class="w-full lib-view h-full lg:max-w-[992px] lg:max-h-[700px]"
    @close="closeModal"
  >
    <template #body>
      <div v-if="accountList" class="flex justify-between mb-xl">
        <span class="font-bold flex items-center">
          {{ selectedLabel }}
        </span>
        <ui-Button
          v-if="windowSize >= 400"
          before-icon="Plus"
          type="light"
          :text="buttonText"
          @click="addAccount"
        />
        <ui-Button v-else icon="Plus" type="light" @click="addAccount" />
      </div>
      <div class="lib-view__body">
        <ui-TextField
          v-if="!showCheckAccount && !showAddAccount && !showChoiceAccount"
          ref="searchRef"
          v-model="store.searchText"
          :placeholder="$t('_form.search.title')"
          :label="false"
          :after-icon="store.searchText ? 'DeleteFill' : ''"
          auto-focus
          before-icon="Search"
          name="accountSearch"
          class="search-input"
          @button-action="handleClear"
          @input="handleSearch"
        />
        <template v-if="accountList">
          <SharedBankAccountOverviewTabs
            :link-value="linkValue"
            :selected-bank-account="selectedBankAccount"
            :tabs="navLinkValue"
            @select="onSelectTabs"
            @clear="handleClear"
            @change-tab="onChangeTab"
          />
          <ui-Pagination
            dir="ltr"
            class="!mt-0"
            show-results-range
            :current-page="currentPage"
            :rows="+pagination?.total"
            :pages="+pagination?.last_page"
            :loading="loading"
            :page-size="pageSize"
            :show-page-size="false"
            :show-page-info="false"
            @page-selected="setPage"
          />
        </template>

        <SharedBankAccountOverviewChoice v-if="showChoiceAccount" @select="onChoiceAccount" />

        <SharedBankAccountOverviewCheck
          v-if="showCheckAccount"
          :loading-check="loadingCheck"
          :loading-add="loadingAddCard"
          :nav-link="linkValue"
          :show-alert-checking="showAlertChecking"
          @is-card-check="onCardPan"
        />
        <SharedBankAccountOverviewAdd
          v-if="showAddAccount"
          :data-check="dataCheck"
          :loading-check="loadingCheck"
          :loading-add="loadingAdd"
          :loading-add-card="loadingAddCard"
          :is-card-pan="isCardPan"
          @is-card-check="onCardPan"
        />
      </div>
    </template>
  </ui-Modal>
</template>

<script setup lang="ts">
import { debounce } from 'lodash';
import { BankAccountTypeEnumCustom } from '@/types/bankAccountCustomTypes';
import {
  BankAccount,
  QueryCheckCardIbanArgs,
  MutationBankAccountAddArgs,
  MutationBankAccountByCardAddArgs,
  BankAccountTypeEnum,
} from '@/graphql/graphql';
import { BANK_ACCOUNTS_PAGE_SIZE } from '~/consts/bankAccount';
const { $notify } = useNuxtApp();
type step = 'list' | 'choice' | 'check' | 'add';
export interface Props {
  selectable?: boolean;
  isShare?: boolean;
  selectedBankAccount: BankAccount | undefined;
}
const store = useBankAccountStore();
const showChoiceAccount = ref(false);
const accountList = ref(true);
const showCheckAccount = ref();
const showAddAccount = ref();
const isCardPan = ref();
const showAlertChecking = ref(false);
const isIban = ref();
const lastStep = ref<step>();
const config = useRuntimeConfig();
const currentPage = ref(config.public.page);
const pageSize = ref(BANK_ACCOUNTS_PAGE_SIZE);
const t = useI18n();
const props = withDefaults(defineProps<Props>(), {});
const { isShare, selectedBankAccount } = toRefs(props);
const linkValue = ref(
  isShare.value ? BankAccountTypeEnumCustom.All : BankAccountTypeEnumCustom.Personal
);
const addAccount = () => {
  resetStates();
  accountList.value = false;
  if (linkValue.value === BankAccountTypeEnumCustom.All) {
    showChoiceAccount.value = true;
  } else {
    showCheckAccount.value = true;
  }
};
const disableSubmitButton = ref(false);
const searchRef = ref();
const emit = defineEmits(['close', 'select', 'bankAccountData']);
const closeModal = () => {
  emit('close');
};
onMounted(() => {
  refetchAccountSearch({
    type: [BankAccountTypeEnum.Personal].includes(linkValue.value as BankAccountTypeEnum)
      ? linkValue.value
      : undefined,
  });
  disableSubmitButton.value = true;
});
const resetStates = () => {
  showChoiceAccount.value = false;
  showCheckAccount.value = false;
  showAddAccount.value = false;
};
const focusHandler = () => {
  nextTick(() => {
    searchRef.value.inputRef.focus();
  });
};
const onChoiceAccount = (value: BankAccountTypeEnum) => {
  linkValue.value = value;
  lastStep.value = 'choice';
  resetStates();
  nextTick(() => {
    showCheckAccount.value = true;
  });
};
const { checkCardIBAN, useBankAccount } = useBankQuery();
const { data, loading, refetch: refetchAccountSearch, pagination } = useBankAccount();
const handleSearch = debounce(() => {
  currentPage.value = 1;
  refetchAccountSearch({
    iban_holder_name: store.searchText,
    offset: 0,
    type: [BankAccountTypeEnum.Personal, BankAccountTypeEnum.Share].includes(
      linkValue.value as BankAccountTypeEnum
    )
      ? linkValue.value
      : undefined,
  });
}, 500);
const handleClear = () => {
  store.searchText = '';
  currentPage.value = 1;
  refetchAccountSearch({
    iban_holder_name: undefined,
    offset: 0,
    type: [BankAccountTypeEnum.Personal, BankAccountTypeEnum.Share].includes(
      linkValue.value as BankAccountTypeEnum
    )
      ? linkValue.value
      : undefined,
  });
  focusHandler();
};
const accountLength = computed(() => {
  const personalLength =
    data?.value &&
    _filter(
      data?.value,
      (item: { type: BankAccountTypeEnum }) => item.type === BankAccountTypeEnumCustom.Personal
    ).length;
  const shareLength =
    data?.value &&
    _filter(
      data?.value,
      (item: { type: BankAccountTypeEnum }) => item.type === BankAccountTypeEnumCustom.Share
    ).length;

  return {
    [BankAccountTypeEnumCustom.All]: data?.value,
    [BankAccountTypeEnumCustom.Personal]: personalLength,
    [BankAccountTypeEnumCustom.Share]: shareLength,
  };
});
const navLinkValue = computed(() => {
  if (isShare.value) {
    return [
      {
        label: t('_bank_account.all'),
        title: t('_bank_account.title'),
        meta: `(${accountLength.value[BankAccountTypeEnumCustom.All]})`,
        active: linkValue.value === BankAccountTypeEnumCustom.All && !showChoiceAccount.value,
        value: BankAccountTypeEnumCustom.All,
      },
      {
        label: t('_bank_account.personal'),
        title: t('_bank_account.personal'),
        meta: `(${accountLength.value[BankAccountTypeEnumCustom.Personal]})`,
        active: linkValue.value === BankAccountTypeEnumCustom.Personal,
        value: BankAccountTypeEnumCustom.Personal,
      },
      {
        label: t('_bank_account.share'),
        title: t('_bank_account.share'),
        meta: `(${accountLength.value[BankAccountTypeEnumCustom.Share]})`,
        active: linkValue.value === BankAccountTypeEnumCustom.Share,
        value: BankAccountTypeEnumCustom.Share,
      },
    ];
  } else {
    return [
      {
        label: t('_bank_account.personal'),
        title: t('_bank_account.personal'),
        meta: `(${accountLength.value[BankAccountTypeEnumCustom.Personal]})`,
        active: linkValue.value === BankAccountTypeEnumCustom.Personal,
        value: BankAccountTypeEnumCustom.Personal,
      },
    ];
  }
});
const onChangeTab = (value: BankAccountTypeEnum) => {
  currentPage.value = 1;
  refetchAccountSearch({
    iban_holder_name: store.searchText ? store.searchText : undefined,
    type: [BankAccountTypeEnum.Personal, BankAccountTypeEnum.Share].includes(value)
      ? value
      : undefined,
    offset: 0,
  });
  linkValue.value = value;
};
const goBackToStepOne = () => {
  resetStates();
  switch (lastStep.value) {
    case 'choice':
      nextTick(() => {
        showChoiceAccount.value = true;
        linkValue.value = BankAccountTypeEnumCustom.All;
      });
      lastStep.value = undefined;
      break;
    case 'check':
      nextTick(() => {
        showCheckAccount.value = true;
      });
      lastStep.value = undefined;
      break;
    default:
      accountList.value = true;
      break;
  }
};
const onCardPan = (item: QueryCheckCardIbanArgs) => {
  isCardPan.value = item.pan;
  isIban.value = item.iban;
};
type validateType = 'pan' | 'iban';
const { schema } = useBankSchema({ isCardPan });
const { handleSubmit, errors, setFieldError, meta } = useForm({
  validationSchema: schema,
});
const { windowSize } = useSize();
const { bankAccountAdd, bankAccountByCardAdd } = useBankMutation();
const { mutate, onDone, loading: loadingAdd } = bankAccountAdd();
const {
  mutate: mutateByCard,
  onDone: onDoneByCard,
  loading: loadingAddCard,
} = bankAccountByCardAdd();
const tempIBan = ref();
const tempPan = ref();
const { snakeToCamel } = useSnakeToCamel();
const {
  data: dataCheck,
  refetch,
  load,
  onError,
  onResult,
  loading: loadingCheck,
} = checkCardIBAN(
  {
    pan: tempPan,
    iban: tempIBan,
  },
  (input, message) => {
    setFieldError(
      snakeToCamel(input) as validateType,
      t('_validation.' + message, { _field_: t(`_validation.name.${input}`) })
    );
  }
);
const onSubmit = handleSubmit(values => {
  const iban = 'IR'.concat(('' + values.iban) as string);
  tempPan.value = isCardPan.value ? values.pan : undefined;
  tempIBan.value = !isCardPan.value ? iban : undefined;
  refetch({
    pan: tempPan.value,
    iban: tempIBan.value,
  }) || load();

  onError(() => {
    showAlertChecking.value = true;
  });
  onResult(() => {
    showCheckAccount.value = false;
    showAddAccount.value = true;
    lastStep.value = 'check';
  });
});
const accountAdd = () => {
  const variables: MutationBankAccountAddArgs = {
    iban: dataCheck.value?.iban,
    is_legal: false,
    type:
      linkValue.value === BankAccountTypeEnumCustom.Personal
        ? BankAccountTypeEnumCustom.Personal
        : BankAccountTypeEnumCustom.Share,
  } as MutationBankAccountAddArgs;
  mutate(variables);
  onDone(async () => {
    loadingAdd.value = true;
    lastStep.value = undefined;
    await useDelay(4000);
    currentPage.value = 1;
    refetchAccountSearch({
      offset: 0,
    });
    loadingAdd.value = false;
    goBackToStepOne();
    $notify({
      isRead: false,
      message:
        linkValue.value === BankAccountTypeEnumCustom.Personal
          ? t('_bank_account.success_add_personal_account')
          : t('_bank_account.success_add_share_account'),
      type: 'success',
    });
  });
};
const accountAddByCard = () => {
  const variables: MutationBankAccountByCardAddArgs = {
    pan: dataCheck.value?.pan,
    is_legal: false,
    type:
      linkValue.value === BankAccountTypeEnumCustom.Personal
        ? BankAccountTypeEnumCustom.Personal
        : BankAccountTypeEnumCustom.Share,
  } as MutationBankAccountByCardAddArgs;
  mutateByCard(variables);
  onDoneByCard(async () => {
    loadingAddCard.value = true;
    lastStep.value = undefined;
    await useDelay(4000);
    currentPage.value = 1;
    refetchAccountSearch({
      offset: 0,
    });
    loadingAddCard.value = false;
    goBackToStepOne();
    $notify({
      isRead: false,
      message:
        linkValue.value === BankAccountTypeEnumCustom.Personal
          ? t('_bank_account.success_add_personal_account')
          : t('_bank_account.success_add_share_account'),
      type: 'success',
    });
  });
};
const onSelectTabs = () => {
  disableSubmitButton.value = false;
  emit('select', store.selectedBankaccount);
};
const selectedLabel = computed(
  () => navLinkValue.value.find(i => i.value === linkValue.value)?.title
);
const buttonText = computed(() => {
  switch (linkValue.value) {
    case BankAccountTypeEnumCustom.Personal:
      return t('_bank_account.add');
    case BankAccountTypeEnumCustom.Share:
      return t('_bank_account.add_share');
    default:
      return t('_bank_account.add');
  }
});
const setPage = (value: number) => {
  currentPage.value = value;
  refetchAccountSearch({
    iban_holder_name: store.searchText ? store.searchText : undefined,
    offset: pageSize.value * (currentPage.value - 1),
  });
};
provide('loading', loading);
provide('data', data);
provide('goBackToStepOne', goBackToStepOne);
provide('form_submit', onSubmit);
provide('form_submit1', accountAdd);
provide('form_submit2', accountAddByCard);
provide('form_errors', errors);
provide('form_meta', meta);
</script>

<style lang="scss">
.lib-view {
  &__body {
    @apply space-y-md;
  }
  .modal__body {
    @apply relative h-[calc(100vh-56px)] lg:h-[69.5vh];
  }
  .modal__body__slot {
    @apply relative lg:h-full;
  }
  .modal__footer {
    @apply z-10 bg-surface;
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}
.search-input {
  input {
    @apply py-2xs pr-0 #{!important};
  }
  .input__inner__icon--before {
    @apply my-2xs ml-2xs;
  }
  .input__inner__icon--after {
    @apply my-2xs ml-2xs;
  }
}
</style>
