<template>
  <ui-Modal
    close-icon
    :text="$t('_bank_account.title')"
    class="w-full lib-view lg:max-w-[992px] max-h-[700px] min-h-[65vh]"
    main-class="select-bank-account"
    @close="closeModal"
  >
    <template #body>
      <div class="grid grid-cols-[265px_1fr] h-full">
        <!-- sidebar -->
        <div class="relative border-l border-border-soft overflow-x-hidden overflow-y-auto">
          <div class="w-[265px] space-y-md px-md py-md border-l border-border-soft">
            <ui-TextField
              v-if="!showCheckAccount && !showAddAccount && !showChoiceAccount"
              ref="searchRef"
              v-model="store.searchText"
              :placeholder="$t('_form.search.title')"
              :after-icon="store.searchText ? 'DeleteFill' : ''"
              :label="false"
              auto-focus
              before-icon="Search"
              name="accountSearch"
              class="search-input"
              @button-action="handleClear"
              @input="handleSearch"
            />
            <div dir="ltr">
              <ui-NavLink
                v-for="i in navLinkValue"
                :key="i.label"
                :label="i.label"
                :active="i.active"
                @click="navLinkClickHandler(i.value)"
              >
              </ui-NavLink>
            </div>
          </div>
        </div>
        <!-- content -->
        <div class="overflow-auto pt-md pb-2xl px-2xl relative">
          <!-- header -->
          <div v-if="accountList" class="flex justify-between items-center mb-md h-[72px]">
            <span class="font-bold flex items-center">
              {{ selectedLabel }}
            </span>
            <ui-Button before-icon="Plus" type="light" :text="buttonText" @click="addAccount" />
          </div>
          <!-- empty state & no result -->
          <div
            v-if="showEmptyState"
            class="border border-border-soft px-md py-2xl rounded-sm max-w-[648px]"
          >
            <ui-EmptyState
              v-if="_isEmpty(store.searchText)"
              :title="
                linkValue === BankAccountTypeEnumCustom.Share
                  ? $t('_empty.partner.title')
                  : $t('_empty.bank_account.title')
              "
              :description="
                linkValue === BankAccountTypeEnumCustom.Share
                  ? $t('_empty.partner.caption')
                  : $t('_empty.bank_account.caption')
              "
              vector="StakedBankCards"
            />

            <ui-EmptyState
              v-else
              :title="$t('_common.empty.titleNoResult')"
              :description="$t('_common.empty.descriptionNoResult')"
              vector="NoResult"
            >
              <template #action>
                <div class="flex justify-center">
                  <ui-Button
                    after-icon="Trash"
                    :text="$t('_common.buttons.removeFilters')"
                    type="secondary"
                    @click="handleClear"
                  />
                </div>
              </template>
            </ui-EmptyState>
          </div>
          <!-- table -->
          <div v-if="loading || (filteredData?.length && accountList)" class="flex flex-col gap-md">
            <ui-Table
              :loading="loading"
              :columns="columns"
              :items="filteredData"
              :is-pointer="false"
              @hover-row="handleHoverRow"
              @click-row="clickRow"
            >
              <!-- iban template -->
              <template #item-iban="{ iban, issuing_bank, holder_name }">
                <div class="flex items-center gap-sm">
                  <div
                    v-if="issuing_bank?.slug_image"
                    class="h-[40px] w-[40px] border border-border-soft bg-surface-soft rounded-md p-xs"
                  >
                    <ui-BankLogo :name="issuing_bank.slug" class="w-[24px] h-[24px]" />
                  </div>
                  <ui-Avatar v-else shape="square" type="Box" />
                  <div class="flex flex-col gap-2xs">
                    <span class="font-Mono">{{ iban }}</span>
                    <span class="text-caption-400-c1 text-text-soft">{{ holder_name }}</span>
                  </div>
                </div>
              </template>
              <!-- slug column template -->
              <template #item-slug="{ issuing_bank }">
                <div class="flex items-center gap-sm">
                  <span v-if="issuing_bank?.name">
                    {{ replace(issuing_bank?.name, 'بانک', '') }}
                  </span>
                </div>
              </template>
              <!-- status column template -->
              <template #column-status="header">
                <div class="flex items-center">
                  <ui-Skeleton :loading="loading" :width="60">
                    <span class="truncate">{{ header.label }}</span>
                  </ui-Skeleton>
                  <ui-Tooltip
                    v-if="store.modalType === 'instantPay'"
                    :content="$t('_common.billing.instant_bank_note_3')"
                    position="top"
                    :max-width="280"
                  >
                    <ui-Icon
                      name="InfoFill"
                      class="flex items-center text-text-soft cursor-pointer mr-[5px]"
                      style="font-size: 16px"
                    />
                  </ui-Tooltip>
                </div>
              </template>
              <template #item-status="{ issuing_bank, status, id, pin }">
                <div class="flex items-center gap-md">
                  <ui-Status
                    v-if="store.modalType === 'instantPay' && status === 'ACTIVE'"
                    :text="
                      store.instantBanksList.includes(issuing_bank.slug.toLowerCase())
                        ? $t('_common.billing.c2c_cycle')
                        : $t('_common.billing.satna_paya')
                    "
                    :type="
                      store.instantBanksList.includes(issuing_bank.slug.toLowerCase())
                        ? 'positive'
                        : 'informative'
                    "
                  />
                  <ui-Status
                    v-else
                    :text="getStatusInfo(status).text"
                    :type="getStatusInfo(status).type"
                  />
                  <ui-Tooltip
                    :content="
                      !!pin
                        ? $t('_helper.settings.unPin_bankAccount')
                        : $t('_helper.settings.pin_bankAccount')
                    "
                    position="top"
                  >
                    <ui-Button
                      v-if="!loading && (!!pin || id === hoverId)"
                      :icon="!!pin ? 'PinFill' : 'Pin'"
                      type="tertiary"
                      :loading="loadingPin"
                      :disabled="loadingPin || (status !== BankAccountStatusEnum.Active && !pin)"
                      :class="{ pin__color: !!pin }"
                      @click.stop="pinBankHandler(id, !pin, status)"
                    />
                  </ui-Tooltip>
                </div>
              </template>
              <!-- amount header template -->
              <template #column-amount="header">
                <ui-Skeleton :loading="loading" :width="40" class="mt-2xs">
                  <div class="h-fit flex -mt-2xs md:w-5xl lg:w-6xl xl:w-full">
                    <span class="truncate text-text">{{ header.label }}</span>
                    <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs" />
                  </div>
                </ui-Skeleton>
              </template>

              <!-- loading template -->
              <template #loadingSkeleton>
                <div v-for="index in pageSize" :key="index" class="loading">
                  <div
                    class="grid border-t border-t-border-divider"
                    style="grid-template-columns: 50% 25% 25%"
                  >
                    <div class="my-auto">
                      <div class="flex items-center gap-sm px-md py-md">
                        <ui-Skeleton :width="40" :height="40" radius="sm" />
                        <div class="flex flex-col">
                          <ui-Skeleton :width="200" class="pb-2xs" />
                          <ui-Skeleton :width="80" />
                        </div>
                      </div>
                    </div>
                    <div class="my-auto">
                      <ui-Skeleton :width="60" class="px-md py-md" />
                    </div>
                    <div class="my-auto">
                      <ui-Skeleton :width="60" class="px-md py-md" />
                    </div>
                  </div>
                </div>
              </template>
            </ui-Table>
            <ui-Pagination
              dir="ltr"
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
          </div>

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
            :nav-link="linkValue"
            @is-card-check="onCardPan"
          />
        </div>
      </div>
    </template>
  </ui-Modal>
</template>

<script setup lang="ts">
import { debounce, sortBy, replace, orderBy } from 'lodash';
import { BankAccountTypeEnumCustom } from '@/types/bankAccountCustomTypes';
import {
  BankAccount,
  BankAccountTypeEnum,
  QueryCheckCardIbanArgs,
  MutationBankAccountAddArgs,
  MutationBankAccountByCardAddArgs,
  BankAccountStatusEnum,
} from '@/graphql/graphql';
import { BANK_ACCOUNTS_PAGE_SIZE } from '~/consts/bankAccount';

type step = 'list' | 'choice' | 'check' | 'add';
type validateType = 'pan' | 'iban';
export interface Props {
  selectable?: boolean;
  isShare?: boolean;
  selectedBankAccount: BankAccount | undefined;
}

const store = useBankAccountStore();
const emit = defineEmits(['close', 'select']);
const closeModal = () => {
  emit('close');
};
const { $notify } = useNuxtApp();
const t = useI18n();
const { columns } = useBankAccountColumns();
const { getStatusInfo } = useBankAccountStatus();
const { checkCardIBAN, useBankAccount } = useBankQuery();
const isCardPan = ref();
const { schema } = useBankSchema({ isCardPan });
const { handleSubmit, errors, setFieldError, meta } = useForm({
  validationSchema: schema,
});
const { bankAccountAdd, bankAccountByCardAdd, bankAccountPin } = useBankMutation();
const { mutate, onDone, loading: loadingAdd } = bankAccountAdd();
const { data, loading, refetch: refetchAccountSearch, pagination } = useBankAccount();
const { mutate: MutatePin, onDone: onDonePin, loading: loadingPin } = bankAccountPin();
const props = withDefaults(defineProps<Props>(), {});
const { isShare, selectedBankAccount } = toRefs(props);
const showAlertChecking = ref(false);
const disableSubmitButton = ref(false);
const selectedIban = ref();
const selectedBank = ref();
const isIban = ref();
const hoverId = ref();
const showCheckAccount = ref();
const showChoiceAccount = ref(false);
const showAddAccount = ref();
const accountList = ref(true);
const lastStep = ref<step>();
const isUserBankAccount = inject('isUserBankAccount');
const linkValue = ref(
  isShare.value ? BankAccountTypeEnumCustom.All : BankAccountTypeEnumCustom.Personal
);
const config = useRuntimeConfig();
const currentPage = ref(config.public.page);
const searchRef = ref();
const pageSize = ref(BANK_ACCOUNTS_PAGE_SIZE);
onMounted(() => {
  refetchAccountSearch({
    type: [BankAccountTypeEnum.Personal].includes(linkValue.value as BankAccountTypeEnum)
      ? linkValue.value
      : undefined,
  });

  if (selectedBankAccount.value) {
    selectedBank.value = selectedBankAccount.value;
  } else {
    selectedBank.value = store.selectedBankaccount;
  }
  selectedIban.value = selectedBank.value?.id;
  disableSubmitButton.value = true;
});
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
const statusOrder = {
  [BankAccountStatusEnum.Pending]: 1,
  [BankAccountStatusEnum.PendingShaparak]: 2,
  [BankAccountStatusEnum.ZarinCardPending]: 3,
  [BankAccountStatusEnum.Active]: 4,
  [BankAccountStatusEnum.Inactive]: 5,
  [BankAccountStatusEnum.Rejected]: 6,
  [BankAccountStatusEnum.RejectedShaparak]: 7,
};
const sortActiveData = computed(() => {
  if (!data?.value) {
    return [];
  }
  let list =
    data?.value &&
    (sortBy(data?.value, (d: BankAccount) =>
      d?.status ? statusOrder[d?.status] : d
    ) as BankAccount[]);
  list = list && (orderBy(list, 'pin') as BankAccount[]);
  const activeData = list.map(d => ({
    ...d,
    class: rowClasses(d.id, d?.status as BankAccountStatusEnum),
  }));

  return activeData;
});
const rowClasses = (id: string, status: BankAccountStatusEnum) => {
  let classes = '';
  if (selectedIban.value === id) {
    classes += 'bg-surface-focus';
  }
  if (status !== BankAccountStatusEnum.Active) {
    classes += ' opacity-50 cursor-not-allowed';
  } else if (isUserBankAccount) {
    classes += ' cursor-auto';
  } else {
    classes += ' cursor-pointer';
  }

  return classes;
};
const filteredData = computed(() => {
  switch (linkValue.value) {
    case BankAccountTypeEnumCustom.Personal:
      return sortActiveData?.value?.filter(i => i?.type === BankAccountTypeEnumCustom.Personal);

    case BankAccountTypeEnumCustom.Share:
      return sortActiveData?.value?.filter(i => i?.type === BankAccountTypeEnumCustom.Share);

    default:
      return sortActiveData?.value;
  }
});
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
const focusHandler = () => {
  nextTick(() => {
    searchRef.value.inputRef.focus();
  });
};
const selectedLabel = computed(() => {
  if (store.searchText) {
    return t('_common.slug.search_for', { data: store.searchText });
  }

  return navLinkValue.value.find(i => i.value === linkValue.value)?.title;
});
const onCardPan = (item: QueryCheckCardIbanArgs) => {
  isCardPan.value = item.pan;
  isIban.value = item.iban;
};
const pinBankHandler = (val: string, pinVal: boolean, status: BankAccountStatusEnum) => {
  if (status !== BankAccountStatusEnum.Active && pinVal) {
    return;
  }

  MutatePin({
    id: val,
    pin: pinVal,
  });
};
const resetStates = () => {
  showChoiceAccount.value = false;
  showCheckAccount.value = false;
  showAddAccount.value = false;
};
const addAccount = () => {
  resetStates();
  accountList.value = false;
  if (linkValue.value === BankAccountTypeEnumCustom.All) {
    showChoiceAccount.value = true;
  } else {
    showCheckAccount.value = true;
  }
};
const onChoiceAccount = (value: BankAccountTypeEnum) => {
  linkValue.value = value;
  lastStep.value = 'choice';
  resetStates();
  nextTick(() => {
    showCheckAccount.value = true;
  });
};
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
    lastStep.value = undefined;
    loadingAddCard.value = true;
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
const clickRow = (item: BankAccount) => {
  if (item.status !== BankAccountStatusEnum.Active || isUserBankAccount) {
    return;
  }
  selectedIban.value = item.id;
  selectedBank.value = data.value?.find(
    ba => ba?.status === BankAccountStatusEnum.Active && ba?.id === item.id
  );
  disableSubmitButton.value = false;

  emit('select', selectedBank.value);
  store.selectedBankaccount = selectedBank.value;
};
const debouncedBankRefetch = debounce(refetchAccountSearch, 500);
onDonePin(() => {
  debouncedBankRefetch();
});
const navLinkClickHandler = (i: string) => {
  currentPage.value = 1;
  refetchAccountSearch({
    iban_holder_name: store.searchText ? store.searchText : undefined,
    type: [BankAccountTypeEnum.Personal, BankAccountTypeEnum.Share].includes(
      i as BankAccountTypeEnum
    )
      ? i
      : undefined,
    offset: 0,
  });

  linkValue.value = i;
  showCheckAccount.value = false;
  showAddAccount.value = false;
  accountList.value = true;
};
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
const showEmptyState = computed(
  () =>
    !filteredData.value?.length &&
    !showCheckAccount.value &&
    !showAddAccount.value &&
    !showChoiceAccount.value &&
    !loading.value
);
const handleHoverRow = (event: Event, row: BankAccount) =>
  event.type === 'mouseenter' ? (hoverId.value = row.id) : (hoverId.value = null);
const setPage = (value: number) => {
  currentPage.value = value;
  refetchAccountSearch({
    iban_holder_name: store.searchText ? store.searchText : undefined,
    offset: pageSize.value * (currentPage.value - 1),
  });
};
provide('loading', loading);
provide('pagination', pagination);
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
    @apply space-y-md overflow-hidden;
  }
  .input__inner__icon--after {
    @apply cursor-pointer text-text-soft;
  }
  .modal__body__slot {
    @apply relative;
  }
  .modal__footer {
    @apply z-10 bg-surface;
  }
  .input__inner--default {
    @apply border-border-divider;
  }
}
.pin__color {
  i {
    @apply text-zarin;
    @apply fill-zarin;
  }
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
.select-bank-account {
  @apply overflow-hidden;
  .modal__body__slot {
    @apply p-0;
  }
}
</style>
