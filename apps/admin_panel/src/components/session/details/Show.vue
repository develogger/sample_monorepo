<template>
  <div class="flex mt-xl border border-border-divider rounded-sm flex-wrap">
    <div class="w-full md:w-1/3 flex flex-col gap-xs p-md border-border-divider border-b">
      <ui-Skeleton v-if="isLoading" :width="64" />
      <div v-else class="text-body-400-b3 text-text-soft">
        {{
          isIban.test(payerInfo?.card_pan)
            ? $t('_validation.name.iban')
            : $t('_session.show.payer_info.cardPan')
        }}
      </div>
      <ui-Skeleton v-if="isLoading" :width="120" />
      <div v-else dir="ltr" class="font-sans text-body-400-b2 flex justify-end items-center gap-xs">
        <span v-if="payerInfo?.card_pan && !isIban.test(payerInfo?.card_pan)">{{
          cardFormat(payerInfo?.card_pan)
        }}</span>
        <div
          v-else-if="payerInfo?.card_pan && isIban.test(payerInfo?.card_pan)"
          class="flex gap-2xs flex-row-reverse"
        >
          <span>{{ payerInfo?.card_pan?.slice(-8) }}</span>
          <ui-Tooltip :content="payerInfo?.card_pan">
            <ui-Label text="···" type="neutral" class="flex items-center" />
          </ui-Tooltip>
          <span>{{ payerInfo?.card_pan?.substring(0, 4) }}</span>
        </div>
        <span v-else> - </span>
      </div>
    </div>
    <div
      class="w-full md:w-1/3 flex flex-col gap-xs p-md border-border-divider border-b md:border-r"
    >
      <ui-Skeleton v-if="isLoading" :width="64" />
      <div v-else class="text-body-400-b3 text-text-soft">
        {{ $t('_session.show.payer_info.name') }}
      </div>
      <div class="font-sans text-body-400-b2 flex items-center gap-xs">
        <ui-Skeleton v-if="isLoading" :width="120" />
        <ui-Label
          v-else-if="data?.payer_info && data.payer_info?.card_holder_name"
          :text="data.payer_info?.card_holder_name"
          type="neutral"
        />
        <ui-Button
          v-else-if="showInquiry && payerInfo?.card_pan"
          :text="$t('_common.buttons.inquiry')"
          :disabled="disableAyanButton"
          before-icon="CreditCardUser"
          size="large"
          type="primary"
          variant="text"
          @click="emit('handleInquiry')"
        />
        <span v-else>-</span>
      </div>
    </div>
    <div
      class="w-full md:w-1/3 flex flex-col gap-xs p-md border-border-divider border-b md:border-r"
    >
      <ui-Skeleton v-if="isLoading" :width="64" />
      <div v-else class="text-body-400-b3 text-text-soft">
        {{ $t('_session.show.payer_info.issuing_bank') }}
      </div>
      <ui-Skeleton v-if="isLoading" :width="120" />
      <div v-else class="font-sans text-body-400-b2 flex items-center gap-xs">
        <ui-BankLogo
          v-if="data?.session_tries && data?.session_tries[0]?.card_info?.slug"
          class="w-xl h-xl"
          :name="data?.session_tries[0]?.card_info?.slug"
        />
        {{ (payerInfo && payerInfo.card_info) ?? '-' }}
      </div>
    </div>
    <div
      class="w-full flex flex-col gap-xs p-md border-border-divider border-b md:border-b-0"
      :class="hasShowPhoneNumber ? 'md:w-1/3' : 'md:w-1/2'"
    >
      <ui-Skeleton v-if="isLoading" :width="64" />
      <div v-else class="text-body-400-b3 text-text-soft">
        {{ $t('_session.show.payer_info.ipPayer') }}
      </div>
      <ui-Skeleton v-if="isLoading" :width="120" />
      <div v-else class="font-sans text-body-400-b2 flex items-center gap-xs">
        <ui-Flag
          v-if="hasFlag(data?.session_tries?.[0]?.agent?.country_code as unknown as string)"
          class="rounded-circle"
          :name="data?.session_tries?.[0]?.agent?.country_code"
        />
        {{ (payerInfo && payerInfo.payer_ip) ?? '-' }}
      </div>
    </div>
    <div
      class="w-full flex flex-col gap-xs p-md border-border-divider md:border-r"
      :class="hasShowPhoneNumber ? 'md:w-1/3' : 'md:w-1/2'"
    >
      <ui-Skeleton v-if="isLoading" :width="64" />
      <div v-else class="text-body-400-b3 text-text-soft">
        {{ $t('session.show.rrn') }}
      </div>
      <ui-Skeleton v-if="isLoading" :width="120" />
      <div v-else class="font-sans text-body-400-b2 flex items-center gap-xs">
        {{ (payerInfo && payerInfo.rrn) ?? '-' }}
      </div>
    </div>
    <div
      v-if="hasShowPhoneNumber"
      class="w-full md:w-1/3 flex flex-col gap-xs p-md border-border-divider md:border-r"
    >
      <ui-Skeleton v-if="isLoading" :width="64" />
      <div v-else class="text-body-400-b3 text-text-soft">
        {{ $t('user.profile.mobile') }}
      </div>
      <ui-Skeleton v-if="isLoading" :width="120" />
      <div v-else class="font-sans text-body-400-b2 flex items-center gap-xs">
        <template v-if="payerInfo?.mobile">
          <template v-if="!isNull(payerInfo?.is_card_mobile_verified)">
            <ui-Tooltip
              :content="
                payerInfo.is_card_mobile_verified
                  ? $t('_session.show.verified_mobile')
                  : $t('_session.show.not_verified_mobile')
              "
            >
              <ui-Icon
                :name="payerInfo.is_card_mobile_verified ? 'CheckMarkCircleFill' : 'InfoFill'"
                class="flex"
                :class="
                  payerInfo.is_card_mobile_verified ? 'text-text-success' : 'text-text-danger'
                "
              />
            </ui-Tooltip>
          </template>
          <span>{{ payerInfo.mobile }}</span>
        </template>
        <template v-else> - </template>
      </div>
    </div>
    <div
      v-if="data?.type === SessionTypeEnum.Zaringate"
      class="w-full flex flex-col gap-xs p-md border-border-divider border-t"
    >
      <ui-Skeleton v-if="isLoading" :width="64" />
      <div v-else class="text-body-400-b3 text-text-soft">
        {{ $t('user.profile.email') }}
      </div>
      <ui-Skeleton v-if="isLoading" :width="120" />
      <div v-else class="font-sans text-body-400-b2 flex items-center gap-xs">
        {{ (payerInfo && payerInfo.email) ?? '-' }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { isNull } from 'lodash';
import { useUserIdQuery } from '@/composables/user/useUserIdQuery';
import {
  SessionPayerInfoType,
  SessionType,
  SessionTryType,
  TerminalStatusEnum,
  SessionTypeEnum,
} from '@/graphql/graphql';

export interface Props {
  payerInfo: SessionPayerInfoType & SessionTryType;
  loading: boolean;
  data: SessionType;
}
const props = withDefaults(defineProps<Props>(), {
  payerInfo: undefined,
  data: undefined,
});
const { payerInfo, data, loading } = toRefs(props);
const emit = defineEmits(['handleInquiry']);
const { cardFormat } = useMath();
const isIban = /\bIR[0-9]{24}\b/;
const { activeTerminal } = useTerminalQuery();
const { data: userData, loading: userLoading } = useUserIdQuery();
const isOwner = computed(
  () =>
    activeTerminal.value?.owner_id &&
    userData.value?.id &&
    userData.value?.id === activeTerminal.value?.owner_id
);
const isLoading = computed(() => userLoading.value || loading.value);
const showInquiry = computed(() => {
  const payerInfo = data.value?.payer_info;

  return payerInfo && !payerInfo?.card_holder_name && isOwner.value && data.value?.amount > 0;
});
const hasShowPhoneNumber = computed(
  () =>
    data.value?.type !== SessionTypeEnum.Personallink &&
    data.value?.type !== SessionTypeEnum.Zarinlink
);
const disableAyanButton = computed(
  () => activeTerminal.value?.status !== TerminalStatusEnum.Active
);
const hasFlag = (code: string) => {
  if (!code) {
    return undefined;
  }

  return code !== 'none';
};
</script>
