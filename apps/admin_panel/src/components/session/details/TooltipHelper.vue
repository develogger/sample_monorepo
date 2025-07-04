<template>
  <div dir="rtl" class="flex gap-2xs">
    <span>{{ t('ticket.faq.session') }}:</span>
    <span>{{ numberFormat(data?.raw_fee ?? 0) }} {{ t('product.details.rials') }}</span>
  </div>
  <div v-if="data?.sms" dir="rtl" class="flex gap-2xs">
    <span>{{ t('_user.notification.channels.sms') }}:</span>
    <span>{{ numberFormat(data?.sms ?? 0) }} {{ t('product.details.rials') }}</span>
  </div>
  <div v-if="data?.ayan" dir="rtl" class="flex gap-2xs">
    <span>{{ t('_terminal.chnType.ayan') }}:</span>
    <span>{{ numberFormat(data?.ayan ?? 0) }} {{ t('product.details.rials') }}</span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, toRefs } from 'vue';
import { SessionFeeDetailType } from '~/graphql/graphql';

interface Props {
  data: SessionFeeDetailType;
}

const props = withDefaults(defineProps<Props>(), {
  data: undefined,
});
const { data } = toRefs(props);
const t = useI18n();
const { numberFormat } = useMath();
</script>
