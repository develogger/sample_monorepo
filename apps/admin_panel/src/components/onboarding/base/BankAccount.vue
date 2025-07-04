<template>
  <ui-Modal
    ref="filterRef"
    :text="$t('_onboarding.add_bank_account.title')"
    close-icon
    class="md:!w-[400px] md:max-h-[88vh] lg:max-h-[88vh]"
    header
    :outside-click="false"
    @close="close"
  >
    <template #body>
      <div class="flex flex-col gap-xl" dir="">
        <template v-if="step === Step.CHECK">
          <p class="text-body-400-b2 font-normal text-text-soft">
            {{ $t('_bank_account.in_add_modal_description') }}
          </p>
          <ui-InlineMessage
            v-if="checkStepErrorMessage"
            type="warning"
            :title="$t('_bank_account.errorTitle')"
            :description="$t('_bank_account.errorDescription')"
          />
          <div class="flex items-center justify-between gap-md">
            <ui-RadioCard
              v-model="selectedItem"
              :disabled="loading"
              :tabindex="1"
              :label="$t('_common.table.iban')"
              :description="$t('_bank_account.iban_description')"
              :val="Item.IBAN"
              dir="ltr"
              name="iban_radio"
              @click="() => (selectedItem = Item.IBAN)"
            />
            <ui-RadioCard
              v-model="selectedItem"
              :disabled="loading"
              :tabindex="2"
              :label="$t('_bank_account.card_number')"
              :description="$t('_bank_account.pan_description')"
              :val="Item.PAN"
              dir="ltr"
              name="pan_radio"
              @click="() => (selectedItem = Item.PAN)"
            />
          </div>

          <form dir="ltr" @submit.prevent="">
            <ui-TextField
              v-if="selectedItem === Item.PAN"
              v-model="pan"
              :disabled="loading"
              :placeholder="$t('_bank_account.card_number')"
              :helper="{
                type: !!errors?.pan ? 'error' : undefined,
                message: errors?.pan,
              }"
              name="pan"
              is-number
              input-custom-class="font-Mono text-left ltr"
              class="w-full"
              @update:model-value="normalize"
            />
            <ui-TextField
              v-if="selectedItem === Item.IBAN"
              v-model="iban"
              :disabled="loading"
              :placeholder="$t('_common.table.iban')"
              :helper="{
                type: !!errors?.iban ? 'error' : undefined,
                message: errors?.iban,
              }"
              name="iban"
              is-number
              label
              unit="IR"
              input-custom-class="font-Mono text-left ltr"
              class="w-full"
              @update:model-value="normalize"
            />
          </form>
        </template>

        <div v-if="step === Step.ADD" class="flex flex-col gap-xl" dir="ltr">
          <p class="text-body-400-b2 font-normal text-text-soft" dir="rtl">
            {{ $t('_bank_account.verifyDescription') }}
          </p>
          <template v-if="!!summaryItems.length">
            <ui-Summary class="summery-bank" :items="summaryItems" />
          </template>
          <ui-InlineMessage
            class="!mt-0"
            type="informative"
            :title="$t('_bank_account.attention')"
            :description="$t('_bank_account.notif')"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end w-full gap-xs">
        <template v-if="step === Step.CHECK">
          <ui-Button
            size="medium"
            type="secondary"
            :text="$t('common.cancel')"
            :disabled="loading"
            @click="close"
          />
          <ui-Button
            size="medium"
            type="primary"
            :text="$t('_common.buttons.confirm_and_continue')"
            :loading="loading"
            :disabled="loading || !meta.valid"
            @click="onSubmit"
          />
        </template>
        <template v-if="step === Step.ADD">
          <ui-Button
            size="medium"
            type="secondary"
            :text="$t('_common.buttons.edit')"
            :disabled="loading"
            @click="() => (step = Step.CHECK)"
          />
          <ui-Button
            size="medium"
            type="primary"
            :text="$t('_common.buttons.confirm_and_add_bank_account')"
            :loading="loading"
            :disabled="loading"
            @click="addAccount"
          />
        </template>
      </div>
    </template>
  </ui-Modal>
</template>
<script lang="ts" setup>
import { ApolloError } from '@apollo/client/errors';
import { replace } from 'lodash';
import {
  BankAccountStatusEnum,
  MutationBankAccountAddArgs,
  MutationBankAccountByCardAddArgs,
} from '@/graphql/graphql';
import { BankAccountTypeEnumCustom } from '@/types/bankAccountCustomTypes';
const t = useI18n();
const { $notify } = useNuxtApp();
enum Step {
  ADD,
  CHECK,
}
enum Item {
  IBAN,
  PAN,
}
type validateType = 'pan' | 'iban';
const emit = defineEmits(['close', 'done']);
const { toEnNumber } = useInput();
const { getStatusInfo } = useBankAccountStatus();
const { snakeToCamel } = useSnakeToCamel();
const { checkCardIBAN } = useBankQuery();
const selectedItem = ref(Item.IBAN);
const checkStepErrorMessage = ref(false);
const isCardPan = computed(() => selectedItem.value === Item.PAN);
const { schema } = useBankSchema({ isCardPan });
const { handleSubmit, errors, setFieldError, meta } = useForm({
  validationSchema: schema,
});
const { bankAccountAdd, bankAccountByCardAdd } = useBankMutation();
const { mutate: mutateIban, onDone: onDoneIban, loading: loadingAddIban } = bankAccountAdd();
const { mutate: mutatePan, onDone: onDonePan, loading: loadingAddPan } = bankAccountByCardAdd();
const tempIBan = ref();
const tempPan = ref();
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
const step = ref(Step.CHECK);
const iban = ref('');
const pan = ref('');
const loading = computed(() => loadingAddPan.value || loadingCheck.value || loadingAddIban.value);
const summaryItems = computed(() => {
  if (!dataCheck.value) {
    return [];
  }

  return [
    {
      id: 1,
      title: t('_common.table.iban'),
      value: dataCheck.value?.iban,
      class: 'font-Mono',
    },
    {
      id: 2,
      title: t('_bank_account.owner'),
      value: dataCheck.value.holder_name ? dataCheck.value.holder_name : 'نامشخص',
      class: 'items-center',
    },
    {
      id: 3,
      title: t('_bank_account.issuing_bank'),
      value: dataCheck.value.issuing_bank?.name
        ? replace(dataCheck.value.issuing_bank?.name, 'بانک', '')
        : '',
      logo: dataCheck.value.bank_slug,
    },
    {
      id: 4,
      title: t('_bank_account.account_status'),
      status: {
        text: getStatusInfo(dataCheck.value?.bank_status as BankAccountStatusEnum).text,
        type: getStatusInfo(dataCheck.value?.bank_status as BankAccountStatusEnum).type,
      },
    },
  ];
});
const close = () => {
  emit('close');
};
const onSubmit = handleSubmit(values => {
  if (checkStepErrorMessage.value) {
    checkStepErrorMessage.value = false;
  }
  tempIBan.value = undefined;
  tempPan.value = undefined;
  if (selectedItem.value === Item.PAN) {
    tempPan.value = values.pan;
  }
  if (selectedItem.value === Item.IBAN) {
    const iban = 'IR'.concat(('' + values.iban) as string);
    tempIBan.value = iban;
  }
  refetch({
    pan: tempPan.value,
    iban: tempIBan.value,
  }) || load();

  onError((err: ApolloError) => {
    if (err.message !== 'validation') {
      checkStepErrorMessage.value = true;
    }
  });
  onResult(() => {
    step.value = Step.ADD;
  });
});
const normalize = (value: string) => {
  const character = toEnNumber(value);
  const val = replace(character, /\D/g, '');
  nextTick(() => {
    if (selectedItem.value === Item.PAN) {
      pan.value = val;
    }
    if (selectedItem.value === Item.IBAN) {
      iban.value = val;
    }
  });
};
const addAccount = () => {
  if (selectedItem.value === Item.IBAN) {
    addIban();
  }
  if (selectedItem.value === Item.PAN) {
    addPan();
  }
};
const addIban = () => {
  const variables: MutationBankAccountAddArgs = {
    iban: dataCheck.value?.iban,
    is_legal: false,
    type: BankAccountTypeEnumCustom.Personal,
  } as MutationBankAccountAddArgs;
  mutateIban(variables);
};
const addPan = () => {
  const variables: MutationBankAccountByCardAddArgs = {
    pan: dataCheck.value?.pan,
    is_legal: false,
    type: BankAccountTypeEnumCustom.Personal,
  } as MutationBankAccountByCardAddArgs;
  mutatePan(variables);
};
const done = async () => {
  await useDelay(4000);
  $notify({
    isRead: false,
    message: t('_bank_account.success_add_personal_account'),
    type: 'success',
  });
  emit('done');
};
onDonePan(() => {
  done();
});
onDoneIban(() => {
  done();
});
</script>
