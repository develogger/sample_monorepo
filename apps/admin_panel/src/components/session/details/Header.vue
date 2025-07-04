<template>
  <ui-PageHeading
    size="xl"
    has-back
    sticky
    :title="''"
    :description="`${$t('product.details.payId')} ${data?.id}`"
    :loading="loading"
    @back-roll="handleBack"
  >
    <template #content>
      <div class="flex flex-col gap-2xs">
        <div v-if="!loading" class="flex flex-wrap gap-2xs justify-end">
          <ui-Status
            :text="data?.status && getStatusInfo(data?.status).text"
            :type="data?.status && getStatusInfo(data?.status).type"
          />
          <ui-Status
            v-if="data?.reconciliation_id && data?.timeline?.reconciled_status === 'PAID'"
            class="mr-2xs"
            icon="DollarFill"
            type="positive"
          />
          <ui-Status
            v-if="SessionStatusEnum.Verified === data?.status"
            icon="CheckMarkCircleFill"
            type="informative"
          />
          <ui-Status
            v-if="data?.refund && data?.refund?.id"
            class="mr-2xs"
            icon="RefundFill"
            type="warning"
          />
        </div>
      </div>
    </template>
    <template #title>
      <div class="flex gap-2xs">
        <span dir="ltr">{{ title }}</span>
        <span>{{ $t('_common.currency.rial') }}</span>
      </div>
    </template>
  </ui-PageHeading>
</template>
<script setup lang="ts">
import { toRefs, computed } from 'vue';
import { SessionStatusEnum, SessionType } from '@/graphql/graphql';
import { useSessionStatus } from '@/composables/session/useSessionStatus';

export interface Props {
  data?: SessionType;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  data: undefined,
});
const { data, loading } = toRefs(props);
const { getStatusInfo } = useSessionStatus();
const { numberFormat } = useMath();
const router = useRouter();
const handleBack = () => {
  router.back();
};
const title = computed(() => {
  let titleVal = '';
  if (data.value && typeof data.value.amount === 'number') {
    titleVal =
      data.value.amount === 0 ? numberFormat(data.value.fee * -1) : numberFormat(data.value.amount);
  }

  return titleVal;
});
</script>
