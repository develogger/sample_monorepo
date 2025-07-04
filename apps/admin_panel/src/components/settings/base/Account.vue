<template>
  <div class="mb-xl text-heading-600-h2 text-text" dir="rtl">
    {{ $t('_common.slug.account_period') }}
  </div>
  <div class="flex justify-between gap-md" dir="rtl">
    <div class="text-text-soft text-body-400-b3 font-medium text-right">
      {{ $t('_helper.settings.period_description') }}
    </div>
  </div>
  <SharedBankAccountHeader
    :is-share="false"
    :loading="loadingTerminal || loadingBankAccountById"
    :selected-bank-account="selectedBankAccount"
    @select="onSelectBankAccount"
    @bank-account-data="bankAccount"
  />
  <div v-if="isShaparkTerminal" class="mt-xl text-text-soft text-body-400-b3" dir="rtl">
    {{ $t('_helper.settings.shaparak_bankAccount_hint') }}
  </div>
  <ui-Divider class="my-xl" />
  <div class="flex justify-between flex-col lg:flex-row gap-md" dir="rtl">
    <ui-Skeleton v-if="loadingTerminal" :width="285" :height="50" />
    <ui-Select
      v-else
      name="account_period"
      class="w-1/2"
      :data="periodItems"
      after-icon="AngleDown"
      :value="period"
      :placeholder="$t('_common.slug.account_period_text')"
      :loading="loadingTerminal || loading"
      :disable="loadingTerminal || loading"
      @selected-item="selectedPeriod"
    />
    <ui-Skeleton v-if="loadingTerminal" :width="285" :height="50" />
    <ui-Select
      v-else
      v-show="periodHandler && periodHandler.length > 0"
      name="account_period_time"
      class="w-1/2"
      :data="periodHandler"
      :value="periodTime"
      after-icon="AngleDown"
      :placeholder="$t('_common.slug.account_time')"
      :loading="loadingTerminal || loading"
      :disable="loadingTerminal || loading"
      @selected-item="selectedItem"
    />
  </div>
  <div class="flex justify-between gap-md mt-md min-h-[20px]" dir="rtl">
    <ui-Skeleton v-if="loadingTerminal" :width="400" :height="20" />
    <div
      v-show="!isShaparkTerminal && period.id === ReconcileCycleTypeEnum.Daily && !loadingTerminal"
      class="text-text-soft text-body-400-b3 font-medium text-right"
    >
      <span>
        <span>
          {{
            isDynamicTerminal
              ? $t('_helper.settings.daily_settlement_long_processing')
              : $t('_helper.settings.daily_settlement_short_processing')
          }}
        </span>
        <ui-Tooltip :content="h(TooltipHelper)" position="bottom" class="w-fit inline-block">
          <ui-Icon
            name="InfoFill"
            class="text-icon-disabled cursor-pointer h-[20px]"
            style="font-size: 16px"
          />
        </ui-Tooltip>
      </span>
    </div>
    <div
      v-if="isShaparkTerminal && period.id !== ReconcileCycleTypeEnum.Daily && !loadingTerminal"
      class="text-text-soft text-body-400-b3 font-medium text-right"
    >
      {{ periodDescription }}
    </div>
  </div>
  <div class="flex gap-xs mt-sm">
    <ui-Button
      :text="t('_common.buttons.save')"
      :disabled="loading || disableSubmit || loadingTerminal || !selectedBankAccount"
      :loading="loading"
      @click="handleSubmit"
    />
    <ui-Button
      v-if="showCancel"
      :text="$t('_common.buttons.cancel')"
      type="secondary"
      :disabled="loading || loadingTerminal"
      @click="reset"
    />
  </div>
  <SettingsBaseAccountConfirm
    v-if="showConfirm"
    v-model="showConfirm"
    :bank-account="selectedBankAccount"
    @done="onSubmit"
  />
</template>

<script setup lang="ts">
import { h } from 'vue';
import TooltipHelper from './TooltipHelper.vue';
import {
  ReconcileCycleTypeEnum,
  BankAccount,
  TerminalFlagEnum,
  ReconcileTypeEnum,
} from '@/graphql/graphql';
const { useBankAccountsByIdLazy } = useBankQuery();
const { activeTerminal, refetch, onResult, loading: loadingTerminal } = useTerminalQuery();
const { $notify } = useNuxtApp();
const { active } = useActiveTerminal();
interface SelectValue {
  title: string;
  id: ReconcileCycleTypeEnum | string | number;
}
const t = useI18n();
const store = useTerminalStore();
const flag = computed(() => activeTerminal.value?.flag);
const bankAccountStore = useBankAccountStore();
const showBankAccount = ref<boolean>(false);
const disableSubmit = ref<boolean>(true);
const selectBoxChanged = ref(0);
const showCancel = ref(false);
const period = ref<SelectValue>({
  id: 'OFF',
  title: t('_common.period.off'),
});
const periodTime = ref<SelectValue>();
const bankValue = ref<BankAccount>();
const showConfirm = ref();
const selectedBankAccount = ref<BankAccount>();
const {
  data,
  refetch: refetchBankAccountById,
  load,
  loading: loadingBankAccountById,
  onResult: onResultBankAccountById,
} = useBankAccountsByIdLazy(activeTerminal.value?.preferred_bank_account_id);
onMounted(() => {
  refetch();
});
const selectedPeriod = (value: SelectValue) => {
  if (!value.id) {
    return;
  }
  period.value = value;
  selectBoxChanged.value++;
  showCancel.value = false;
  disableSubmit.value = true;
  if (selectBoxChanged.value > 2 && !periodHandler.value && !periodTime.value) {
    disableSubmit.value = false;
    showCancel.value = true;

    return;
  }
  if (selectBoxChanged.value > 2) {
    periodTime.value = undefined;
    showCancel.value = true;
  }
};
const selectedItem = (value: SelectValue) => {
  if (!value.id) {
    return;
  }
  periodTime.value = value;
  selectBoxChanged.value++;
  if (selectBoxChanged.value > 3) {
    disableSubmit.value = false;
    showCancel.value = true;
  }
};
const periodHandler = computed(() => {
  if (period.value) {
    switch (period.value.id) {
      case 'WEEKLY':
        return weekItems;
      case 'MONTHLY':
        return monthItems;

      default:
        return undefined;
    }
  }
});
const periodDescription = computed(() => {
  if (period.value) {
    switch (period.value.id) {
      case ReconcileCycleTypeEnum.Off:
        return t('_helper.settings.period_description_off');
      case ReconcileCycleTypeEnum.Daily:
        return t('_helper.settings.period_description_daily');
      case 'WEEKLY':
        if (!periodTime.value?.id) {
          return '';
        }

        return t('_helper.settings.period_description_weekly', { day: periodTime.value?.title });
      case 'MONTHLY':
        if (!periodTime.value?.id) {
          return '';
        }

        return t('_helper.settings.period_description_monthly', { day: periodTime.value?.title });
      case ReconcileCycleTypeEnum.OddDays:
        return t('_helper.settings.period_description_odd_days');
      case ReconcileCycleTypeEnum.GoldenTuesday:
        return t('_helper.settings.period_description_golden_tuesday');
      default:
        return undefined;
    }
  }
});
const periodItems: Ref<SelectValue[]> = computed(() => {
  if (flag.value === TerminalFlagEnum.Normal) {
    return [
      {
        title: t('_common.period.off'),
        id: ReconcileCycleTypeEnum.Off,
      },
      {
        title: t('_common.period.day'),
        id: ReconcileCycleTypeEnum.Daily,
      },
      {
        title: t('_common.period.week'),
        id: 'WEEKLY',
      },
      {
        title: t('_common.period.month'),
        id: 'MONTHLY',
      },
      {
        title: t('_common.period.odd'),
        id: ReconcileCycleTypeEnum.OddDays,
      },
      {
        title: t('_common.period.thusday'),
        id: ReconcileCycleTypeEnum.GoldenTuesday,
      },
    ];
  }

  return [
    {
      title: t('_common.period.off'),
      id: ReconcileCycleTypeEnum.Off,
    },
    {
      title: t('_common.period.day'),
      id: ReconcileCycleTypeEnum.Daily,
    },
    {
      title: t('_common.period.week'),
      id: 'WEEKLY',
    },
    {
      title: t('_common.period.month'),
      id: 'MONTHLY',
    },
  ];
});
const weekItems: SelectValue[] = [
  {
    title: t('_common.week.saturday'),
    id: ReconcileCycleTypeEnum.WeeklySaturday,
  },
  {
    title: t('_common.week.sunday'),
    id: ReconcileCycleTypeEnum.WeeklySunday,
  },
  {
    title: t('_common.week.monday'),
    id: ReconcileCycleTypeEnum.WeeklyMonday,
  },
  {
    title: t('_common.week.tuesday'),
    id: ReconcileCycleTypeEnum.WeeklyTuesday,
  },
  {
    title: t('_common.week.wednesday'),
    id: ReconcileCycleTypeEnum.WeeklyWednesday,
  },
  {
    title: t('_common.week.thursday'),
    id: ReconcileCycleTypeEnum.WeeklyThursday,
  },
];
const isShaparkTerminal = computed(() => !!(active?.reconcile_type === ReconcileTypeEnum.Normal));
const monthItems: SelectValue[] = [];
for (let day = 1; day <= 29; day++) {
  //   const enumKey = `MONTHLY_${day}` as keyof typeof ReconcileCycleTypeEnum;

  monthItems.push({
    title: t('_common.month.value', { number: day }), // Assuming you have translation keys for days
    id: `MONTHLY_${day}`,
  });
}
const toggleModal = () => {
  showBankAccount.value = !showBankAccount.value;
};
const reset = () => {
  setDefaultData();
  setTimeout(() => {
    showCancel.value = false;
    disableSubmit.value = true;
  }, 1);
};
const { terminalEdit } = useTerminalMutation();
const { snakeToCamel } = useSnakeToCamel();
const { setFieldError } = useForm({
  validationSchema: null,
});
type validateType = '';
const { mutate, onDone, loading } = terminalEdit((input, message, params) => {
  setFieldError(snakeToCamel(input) as validateType, t('_validation.' + message, params));
});
let reFetched = false;
const onSubmit = () => {
  const variable = {
    id: activeTerminal.value?.id,
    bank_account_id: selectedBankAccount.value?.id,
    reconcile_priority: periodHandler.value ? periodTime.value?.id : period.value?.id,
  };
  mutate(variable);
};
onDone(() => {
  refetch();
  loadingTerminal.value = false;
  reFetched = true;
  $notify({
    isRead: false,
    message: t('common.success'),
    type: 'success',
  });
  showCancel.value = false;
  disableSubmit.value = true;
  store.reconcilePriority = periodHandler.value ? periodTime.value?.id : period.value?.id;
  store.bankAccountData = bankValue.value;
});
provide('toggleModal', toggleModal);
const setDefaultData = () => {
  const reconcilePriority = activeTerminal.value?.reconcile_priority;
  selectedBankAccount.value = data.value;
  bankAccountStore.selectedBankaccount = data.value;
  bankAccountStore.selectedBankAccountId = data.value?.id;
  if (reconcilePriority && reconcilePriority.includes('WEEKLY')) {
    period.value = {
      title: t('_common.period.week'),
      id: 'WEEKLY',
    };

    nextTick(() => {
      periodTime.value = weekItems.find(week => week.id === reconcilePriority);
    });
  } else if (reconcilePriority && reconcilePriority.includes('MONTHLY')) {
    period.value = {
      title: t('_common.period.month'),
      id: 'MONTHLY',
    };
    nextTick(() => {
      periodTime.value = monthItems.find(month => month.id === reconcilePriority);
    });
  } else {
    period.value = periodItems.value.find(item => item.id === reconcilePriority) ?? {
      id: 'OFF',
      title: t('_common.period.off'),
    };
  }
};
setDefaultData();
onResult(() => {
  if (!reFetched) {
    setDefaultData();

    refetchBankAccountById({
      id: activeTerminal.value?.preferred_bank_account_id,
    }) || load(BankAccountsSchema, { id: activeTerminal.value?.preferred_bank_account_id });
  }
});
onResultBankAccountById(() => {
  selectedBankAccount.value = data.value;
});
const bankAccountList = ref();
provide('toggleModal', toggleModal);
const isDynamicTerminal = computed(
  () =>
    active &&
    active.fee_group &&
    (Number(active.fee_group.id) === 2 || Number(active.fee_group.id) === 24)
);
const onSelectBankAccount = (bankAccount: BankAccount) => {
  if (bankAccount && bankAccount.id !== selectedBankAccount.value?.id) {
    showCancel.value = true;
    disableSubmit.value = false;
    selectedBankAccount.value = bankAccount;
  }
};
const handleSubmit = () => {
  if (isShaparkTerminal.value) {
    showConfirm.value = true;
  } else {
    onSubmit();
  }
};
const bankAccount = (list: BankAccount[]) => {
  bankAccountList.value = list;
};
</script>
