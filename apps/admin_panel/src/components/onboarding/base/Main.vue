<template>
  <div class="flex justify-center flex-col gap-md">
    <ui-Skeleton :loading="loading" full-width :height="84">
      <ui-InlineMessage
        class="!mt-0"
        :loading="loading"
        :type="passAllStep ? 'positive' : 'informative'"
        :title="passAllStep ? '' : $t('_onboarding.inline_message.title')"
        :description="
          passAllStep
            ? $t('_onboarding.inline_message.completed_caption')
            : $t('_onboarding.inline_message.not_completed_caption')
        "
      >
        <template v-if="!passAllStep" #description>
          <i18n-t keypath="_onboarding.inline_message.not_completed_caption_2" tag="p">
            <template #tracking>
              <NuxtLink :to="trackingUrl" target="_blank" class="text-primary">
                {{ $t('_onboarding.inline_message.tracking') }}
              </NuxtLink>
            </template>

            <template #profile>
              <NuxtLink :to="connectProfileUrl" target="_blank" class="text-primary">
                {{ $t('_onboarding.inline_message.zarinpal_account') }}
              </NuxtLink>
            </template>
          </i18n-t>
        </template>
      </ui-InlineMessage>
    </ui-Skeleton>
    <ui-Card class="w-full">
      <template #main>
        <ui-NavLink
          :loading="loading"
          :label="$t('_onboarding.links.level_up.title')"
          :sub-text="kycSubText"
          :status="kycStatus"
          class="!py-md"
          icon="Profile"
          @click="redirectToConnect"
        >
        </ui-NavLink>
        <ui-NavLink
          :loading="loading"
          :label="$t('_onboarding.links.address.title')"
          :status="addressStatus"
          icon="LocationAddress"
          class="!py-md"
          @click="toggleModal"
        >
        </ui-NavLink>
        <ui-NavLink
          :loading="loading"
          :label="$t('_onboarding.links.bank_account.title')"
          :status="bankAccountStatus"
          icon="FinanceBank"
          class="!py-md"
          @click="toggleBankAccountModal"
        >
        </ui-NavLink>
        <ui-NavLink
          :loading="loading"
          :label="$t('_onboarding.links.terminal.title')"
          :sub-text="addTerminalSubText"
          :disabled="!canUserCreateTerminal"
          class="!py-md"
          icon="Plus"
          @click="redirectToCreateTerminal"
        >
        </ui-NavLink>
      </template>
    </ui-Card>
    <UserBaseAddressAdd v-if="addressModal" :loading="loading" @done="onDoneAddAddress" />
    <OnboardingBaseBankAccount
      v-if="bankAccountModal"
      :loading="loading"
      @done="onDoneAddBankAccount"
      @close="() => (bankAccountModal = false)"
    />
    <OnboardingBaseLevelUpgradeNotice
      v-if="showLevelUpgradeNotice"
      @close="() => (showLevelUpgradeNotice = false)"
    />
  </div>
</template>
<script lang="ts" setup>
import { KycStatusTypeEnum, UserLevelEnum } from '~/graphql/graphql';
const { addTerminalUrl } = useAuth();
const config = useRuntimeConfig();
const authStore = useAuthStore();
const { canUserCreateTerminal, isBlueLevel } = useAuth();
const { data: user, loading: userLoading, refetch } = useUserIdQuery();
const { useBankAccount } = useBankQuery();
const { statusHandler } = useKyc();
const {
  data: bankAccountList,
  loading: bankAccountLoading,
  refetch: refetchBankAccount,
} = useBankAccount();
const t = useI18n();
const addressModal = ref(false);
const bankAccountModal = ref(false);
const showLevelUpgradeNotice = ref(false);
const connectProfileUrl = `${config.public.connect_url}profile?call=beta`;
const trackingUrl = ref(`${config.public.connect_url}form-tracking`);
const loading = computed(() => bankAccountLoading.value || userLoading.value);
const router = useRouter();
const addressStatus = computed(() => {
  if (isDoneAddAddress.value) {
    return {
      text: t('_onboarding.status.REGISTERED'),
      type: 'positive',
    };
  }

  return {
    text: t('_onboarding.status.NOT_REGISTERED'),
    type: 'neutral',
  };
});
const bankAccountStatus = computed(() => {
  if (isDoneAddBankAccount.value) {
    return {
      text: t('_onboarding.status.REGISTERED'),
      type: 'positive',
    };
  }

  return {
    text: t('_onboarding.status.NOT_REGISTERED'),
    type: 'neutral',
  };
});
const kycStatus = computed(() => {
  if (isBlueLevel.value && user.value?.data_status?.kyc === KycStatusTypeEnum.NotCompleted) {
    return {
      text: t('_onboarding.kyc_status.PROCESSING'),
      type: 'informative',
    };
  }

  return {
    text: statusHandler(user.value?.data_status?.kyc as KycStatusTypeEnum).text,
    type: statusHandler(user.value?.data_status?.kyc as KycStatusTypeEnum)?.type,
  };
});
const kycSubText = computed(() => {
  if (user.value?.data_status?.kyc === KycStatusTypeEnum.Rejected) {
    return t('_onboarding.kyc_messages.rejected');
  }
  if (user.value?.data_status?.kyc === KycStatusTypeEnum.Processing) {
    return t('_onboarding.kyc_messages.processing');
  }
  if (isBlueLevel.value && user.value?.data_status?.kyc === KycStatusTypeEnum.NotCompleted) {
    return t('_onboarding.kyc_messages.waiting');
  }

  return undefined;
});
const isDoneAddAddress = computed(() => !!user.value?.addresses?.length);
const isDoneAddBankAccount = computed(() => !!bankAccountList.value?.length);
const passAllStep = computed(
  () =>
    isDoneAddAddress.value &&
    isDoneAddBankAccount.value &&
    user.value?.data_status?.kyc === KycStatusTypeEnum.Completed
);
const addTerminalSubText = computed(() => {
  if (canUserCreateTerminal.value) {
    return t('_onboarding.links.terminal.finish_caption');
  }

  return t('_onboarding.links.terminal.in_progress_caption');
});
const toggleBankAccountModal = () => {
  if (user.value?.level === UserLevelEnum.New) {
    showLevelUpgradeNotice.value = true;

    return;
  }

  bankAccountModal.value = !bankAccountModal.value;
};
const onDoneAddAddress = () => {
  refetch();
  addressModal.value = false;
};
const onDoneAddBankAccount = () => {
  refetchBankAccount();
  bankAccountModal.value = false;
};
const toggleModal = () => {
  addressModal.value = !addressModal.value;
};
const redirectToConnect = async () => {
  authStore.setSpaLoading(true);
  await navigateTo(connectProfileUrl, {
    external: true,
    redirectCode: 301,
  });
};
const redirectToCreateTerminal = () => {
  if (!canUserCreateTerminal.value) {
    return;
  }
  router.push(addTerminalUrl());
};
provide('toggleModal', toggleModal);
</script>
