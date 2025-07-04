<template>
  <div>
    <div>
      <ui-Tab v-model="tab" :items="tabs" has-border align="start" @click="changeTab(tab)" />
    </div>
    <div class="mt-xl mb-3xl">
      <template v-if="loading">
        <ui-TableCard v-for="i in [1, 2, 3]" :key="i" class="tableCard">
          <template #header>
            <div class="flex items-center gap-xs">
              <div class="tableCard__header--id">
                <div class="flex gap-xs items-center">
                  <ui-Skeleton :width="40" :height="40" radius="sm" />
                  <div class="flex flex-col gap-2xs">
                    <ui-Skeleton :width="200" :height="12" />
                    <ui-Skeleton :width="60" :height="12" />
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #main>
            <!-- iban column -->
            <div class="tableCard__main--title">
              <ui-Skeleton :width="40" />
              <div class="tableCard__main--title__title">
                <ui-Skeleton :width="40" />
              </div>
            </div>
            <ui-Divider class="w-full my-sm" />
            <!-- status column -->
            <div class="tableCard__main--title">
              <ui-Skeleton :width="40" />
              <div class="tableCard__main--title__title">
                <ui-Skeleton :width="40" />
              </div>
            </div>
          </template>
        </ui-TableCard>
      </template>
      <template v-else>
        <template v-if="filteredData?.length === 0">
          <ui-EmptyState
            v-if="_isEmpty(store.searchText)"
            :title="
              linkValue === BankAccountTypeEnum.Share
                ? $t('_empty.partner.title')
                : $t('_empty.bank_account.title')
            "
            :description="
              linkValue === BankAccountTypeEnum.Share
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
        </template>

        <template v-else>
          <ui-TableCard
            v-for="i in filteredData"
            :key="i?.id"
            class="tableCard"
            :class="bankAccountDynamicClass(i)"
            @click="selectedBankHandler(i)"
          >
            <template #header>
              <div class="flex items-center gap-xs w-full">
                <div class="tableCard__header--id w-full">
                  <div class="flex justify-between gap-xs items-center w-full">
                    <ui-Skeleton v-if="loading" :width="40" :height="40" radius="sm" />
                    <div
                      v-else-if="i.issuing_bank?.slug_image"
                      class="h-[40px] w-[40px] border border-border-soft bg-surface-soft rounded-md p-xs"
                    >
                      <ui-BankLogo
                        v-if="i?.issuing_bank"
                        :name="i.issuing_bank.slug"
                        class="w-[24px] h-[24px]"
                      />
                    </div>
                    <div v-else-if="!loading && !i.issuing_bank?.slug_image">
                      <ui-Avatar shape="square" type="Box" />
                    </div>
                    <div class="flex flex-col gap-2xs">
                      <ui-Skeleton v-if="loading" :width="200" :height="18" />
                      <span
                        v-else
                        class="text-body-400-b2 text-text font-Mono flex flex-wrap break-all"
                      >
                        {{ i.iban }}
                      </span>
                      <ui-Skeleton v-if="loading" :width="60" :height="18" />
                      <span v-else class="text-caption-400-c1 text-text-soft">{{
                        i.holder_name
                      }}</span>
                    </div>
                    <div>
                      <ui-Button
                        :icon="!!i?.pin ? 'PinFill' : 'Pin'"
                        type="tertiary"
                        size="small"
                        :loading="isLoading"
                        :disabled="
                          isLoading || (i?.status !== BankAccountStatusEnum.Active && !i?.pin)
                        "
                        :class="{ pin__color: !!i?.pin }"
                        @click.stop="pinBankHandler(i?.id, !i?.pin, i.status!)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template #main>
              <!-- iban column -->
              <div class="tableCard__main--title">
                <div class="text-body-400-b3 text-text-soft">{{ $t('_bank_account.bank') }}</div>
                <div class="tableCard__main--title__title">
                  <ui-Skeleton v-if="loading" :width="40" :height="20" />
                  <template v-else-if="!loading && i?.issuing_bank?.name">
                    {{ replace(i?.issuing_bank?.name, 'بانک', '') }}
                  </template>
                </div>
              </div>
              <ui-Divider class="w-full my-sm" />
              <!-- status column -->
              <div class="tableCard__main--title">
                <div class="text-body-400-b3 text-text-soft">{{ $t('_common.table.status') }}</div>
                <div class="tableCard__main--title__title">
                  <ui-Skeleton v-if="loading" :width="40" :height="20" />
                  <ui-Status
                    v-else-if="store.modalType === 'instantPay' && i?.status === 'ACTIVE'"
                    :text="
                      store.instantBanksList.includes(i?.issuing_bank?.slug.toLowerCase() as string)
                        ? $t('_common.billing.c2c_cycle')
                        : $t('_common.billing.satna_paya')
                    "
                    :type="
                      store.instantBanksList.includes(i?.issuing_bank?.slug.toLowerCase() as string)
                        ? 'positive'
                        : 'informative'
                    "
                  />
                  <ui-Status
                    v-else
                    :text="getStatusInfo(i?.status as BankAccountStatusEnum).text"
                    :type="getStatusInfo(i?.status as BankAccountStatusEnum).type"
                  />
                </div>
              </div>
              <!-- action column -->
              <div v-if="!isUserBankAccount" class="tableCard__main--action mt-xl -mr-sm">
                <ui-Button
                  :text="$t('_bank_account.select_band_account')"
                  :disabled="i.status !== BankAccountStatusEnum.Active"
                  after-icon="AngleLeft"
                  size="large"
                  type="primary"
                  variant="text"
                  class="text-body-400-b2"
                />
              </div>
            </template>
          </ui-TableCard>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sortBy, replace, debounce, orderBy } from 'lodash';
import { BankAccount, BankAccountStatusEnum, BankAccountTypeEnum } from '@/graphql/graphql';
import { useBankAccountStatus } from '@/composables/bank/useBankAccountStatus';

const { getStatusInfo } = useBankAccountStatus();
const { bankAccountPin } = useBankMutation();
const { useBankAccount } = useBankQuery();
const { mutate: MutatePin, onDone: onDonePin, loading: loadingPin } = bankAccountPin();
const { refetch: refetchAccountSearch } = useBankAccount();
const store = useBankAccountStore();
const selectedIban = ref();
const data = inject<Ref<BankAccount[]>>('data');
const isUserBankAccount = inject('isUserBankAccount');
interface TabItem {
  label: string;
  meta: string;
  active: boolean;
  value: BankAccountTypeEnum;
}
export interface Props {
  linkValue?: BankAccountTypeEnum;
  selectedBankAccount: BankAccount | undefined;
  tabs: TabItem[];
}
const props = withDefaults(defineProps<Props>(), {
  linkValue: BankAccountTypeEnum.Personal,
});
const { linkValue, selectedBankAccount } = toRefs(props);
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
    class:
      d.status === BankAccountStatusEnum.Active
        ? isUserBankAccount
          ? 'cursor-auto'
          : 'cursor-pointer'
        : 'opacity-50 cursor-not-allowed',
  }));

  return activeData;
});
const filteredData = computed(() => {
  switch (linkValue.value) {
    case BankAccountTypeEnum.Personal:
      return sortActiveData?.value?.filter(i => i?.type === BankAccountTypeEnum.Personal);

    case BankAccountTypeEnum.Share:
      return sortActiveData?.value?.filter(i => i?.type === BankAccountTypeEnum.Share);

    default:
      return sortActiveData?.value;
  }
});
const selectedBank = ref();
const tab = ref<BankAccountTypeEnum>(linkValue.value);
const emit = defineEmits(['select', 'change-tab', 'clear']);
const selectedBankHandler = (item: BankAccount) => {
  if (item.status !== BankAccountStatusEnum.Active || isUserBankAccount) {
    return;
  }
  if (!data?.value) {
    return;
  }
  selectedIban.value = item.id;
  selectedBank.value = data?.value.find(ba => ba?.id === item.id);
  store.selectedBankaccount = selectedBank.value;
  emit('select', selectedBank.value);
};
onMounted(() => {
  if (selectedBankAccount.value) {
    selectedBank.value = selectedBankAccount.value;
  } else {
    selectedBank.value = store.selectedBankaccount;
  }
  selectedIban.value = selectedBank.value?.id;
});
const changeTab = (activeTab: BankAccountTypeEnum) => {
  emit('change-tab', activeTab);
};
const handleClear = () => {
  emit('clear');
};
const bankAccountDynamicClass = (item: BankAccount) => {
  let classes = '';
  if (item.status !== BankAccountStatusEnum.Active) {
    classes = 'opacity-50 cursor-not-allowed';
  } else if (isUserBankAccount) {
    classes = 'cursor-auto';
  } else {
    classes = 'cursor-pointer';
  }

  if (selectedIban.value === item.id) {
    classes += ' !bg-surface-focus';
  }

  return classes;
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
const debouncedBankRefetch = debounce(refetchAccountSearch, 500);
onDonePin(() => {
  debouncedBankRefetch();
});
const loading = inject<Ref<boolean>>('loading');
const isLoading = computed(() => loading?.value || loadingPin.value);
</script>

<style lang="scss" scoped>
.pin__color {
  i {
    @apply text-zarin;
    @apply fill-zarin;
  }
}
.tableCard {
  @apply flex flex-col gap-md mb-md;
  &__header {
    @apply flex justify-between flex-wrap items-center;
    &--id {
      @apply flex items-center;
      &__text {
        @apply text-text pl-sm text-body-400-b1 font-medium;
      }
    }
    &--status {
      @apply -mt-sm;
    }
  }
  &__main {
    @apply -mb-md;
    &--title {
      @apply flex justify-between;
      &__label {
        @apply text-body-400-b3 text-text-soft font-medium pl-sm;
      }
      &__title {
        @apply text-body-400-b2 text-text;
      }
    }
  }
}
</style>
