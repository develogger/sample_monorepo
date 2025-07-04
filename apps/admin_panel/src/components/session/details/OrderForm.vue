<template>
  <div class="flex mt-xl border border-border-divider rounded-sm flex-wrap">
    <div
      class="w-full md:w-1/3 flex flex-col gap-xs p-md border-border-divider border-b md:border-b-0"
    >
      <ui-Skeleton v-if="isLoading" :width="64" />
      <div v-else class="text-body-400-b3 text-text-soft">
        {{ $t('_form.add_invoice.name') }}
      </div>
      <ui-Skeleton v-if="isLoading" :width="120" />
      <div v-else class="font-sans text-body-400-b2 flex items-center gap-xs truncate">
        {{ payerInfo && payerInfo.name ? payerInfo.name : '-' }}
      </div>
    </div>
    <div
      class="w-full md:w-1/3 flex flex-col gap-xs p-md border-border-divider border-b md:border-b-0 md:border-r"
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
    <div class="w-full md:w-1/3 flex flex-col gap-xs p-md border-border-divider md:border-r">
      <ui-Skeleton v-if="isLoading" :width="64" />
      <div v-else class="text-body-400-b3 text-text-soft">
        {{ $t('user.profile.email') }}
      </div>
      <ui-Skeleton v-if="isLoading" :width="120" />
      <div v-else class="font-sans text-body-400-b2 flex items-center gap-xs break-all">
        {{ payerInfo && payerInfo.email ? payerInfo.email : '-' }}
      </div>
    </div>
    <div
      v-if="data?.type === SessionTypeEnum.Zarinlink && payerInfo && payerInfo.custom_field_1_name"
      class="w-full md:w-1/2 flex flex-col gap-xs p-md border-border-divider border-t"
    >
      <ui-Skeleton v-if="isLoading" :width="64" />
      <div v-else class="text-body-400-b3 text-text-soft">
        {{ payerInfo.custom_field_1_name ?? $t('product.details.fields.CUSTOM_FIELD_1') }}
      </div>
      <ui-Skeleton v-if="isLoading" :width="120" />
      <div v-else class="font-sans text-body-400-b2 flex items-center gap-xs">
        {{ payerInfo && payerInfo.custom_field_1 ? payerInfo.custom_field_1 : '-' }}
      </div>
    </div>
    <div
      v-if="data?.type === SessionTypeEnum.Zarinlink && payerInfo && payerInfo.custom_field_2_name"
      class="w-full md:w-1/2 flex flex-col gap-xs p-md border-border-divider md:border-r border-t"
    >
      <ui-Skeleton v-if="isLoading" :width="64" />
      <div v-else class="text-body-400-b3 text-text-soft">
        {{ payerInfo.custom_field_2_name ?? $t('product.details.fields.CUSTOM_FIELD_2') }}
      </div>
      <ui-Skeleton v-if="isLoading" :width="120" />
      <div v-else class="font-sans text-body-400-b2 flex items-center gap-xs">
        {{ payerInfo && payerInfo.custom_field_2 ? payerInfo.custom_field_2 : '-' }}
      </div>
    </div>
  </div>
  <div class="w-full flex flex-col gap-xs p-md border border-border-divider mt-lg rounded-sm">
    <ui-Skeleton v-if="isLoading" :width="64" />
    <div v-else class="text-body-400-b3 text-text-soft">
      {{ $t('product.add.description_payer') }}
    </div>
    <ui-Skeleton v-if="isLoading" :width="120" />
    <div v-else class="font-sans text-body-400-b2 flex items-center gap-xs break-all">
      {{ payerInfo && payerInfo.description ? payerInfo.description : '-' }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { isNull } from 'lodash';
import {
  SessionPayerInfoType,
  SessionType,
  SessionTryType,
  SessionTypeEnum,
} from '@/graphql/graphql';
interface customField {
  custom_field_1_name: string;
  custom_field_2_name: string;
}
export interface Props {
  payerInfo: SessionPayerInfoType & SessionTryType & customField;
  loading: boolean;
  data: SessionType;
}
const props = withDefaults(defineProps<Props>(), {
  payerInfo: undefined,
  data: undefined,
});
const { payerInfo, loading } = toRefs(props);
const isLoading = computed(() => loading.value);
</script>
