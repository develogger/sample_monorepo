<template>
  <div ref="receiptRef" dir="rtl" class="receipt">
    <div
      class="flex flex-col gap-md items-center justify-center bg-[#2D3040] p-xl rounded-t-md md:w-[420px] border-dashed border-b border-surface min-h-[170px]"
      :class="(status?.type as PayoutStatusEnum) === PayoutStatusEnum.DeActive ? 'opacity-30' : ''"
    >
      <div class="h-[40px] w-[40px] flex justify-center items-center bg-surface rounded-md">
        <ui-Logo name="zarinpalLogoMark" class="cursor-pointer" />
      </div>
      <div class="flex flex-col items-center gap-xs">
        <span class="text-heading-600-h3 text-surface">{{
          (status?.type as PayoutStatusEnum) === PayoutStatusEnum.DeActive
            ? $t('_helper.receipt.cameForward')
            : $t('_helper.receipt.title')
        }}</span>
        <span
          v-if="receiptType"
          class="text-heading-600-h3 text-surface px-sm py-2xs bg-[#F5F5F526] rounded-xl"
        >
          {{ receiptType }}
        </span>
      </div>
    </div>
    <div class="flex w-full justify-between">
      <div class="bg-secondary h-xl w-xl relative rounded-circle -right-sm -top-sm" />
      <div class="bg-secondary h-xl w-xl relative rounded-circle -left-sm -top-sm" />
    </div>
    <div class="bg-surface p-xl flex flex-col items-center md:w-[420px] rounded-b-md -mt-xl">
      <div class="flex gap-xs items-center">
        <span class="text-display-700-d3">{{ amount && numberFormat(amount) }}</span>
        <span class="text-heading-600-h3">ریال</span>
      </div>
      <div class="mt-sm w-full justify-center flex">
        <slot name="status" />
        <ui-status
          v-if="status && !$slots.status"
          dir="ltr"
          class="!text-heading-600-h3"
          :text="status.text"
          :type="status?.type"
          :icon="status?.icon"
        />
      </div>
      <div
        :class="
          (status?.type as PayoutStatusEnum) === PayoutStatusEnum.DeActive ? 'opacity-30' : ''
        "
        class="flex flex-col gap-md w-full mt-2xl"
      >
        <div v-for="item in list" :key="item.value" class="flex gap-xs items-center">
          <span class="text-[#00000080] text-body-500-b2">{{ item.label }}</span>
          <ui-Divider class="flex-grow" border-style="dashed" />
          <span class="text-[#000000] text-body-500-b2">
            <ui-BankLogo v-if="item.slug" :name="item.slug" class="w-[20px] h-[20px] ml-xs" />
            {{ item.value ?? '--' }}
          </span>
        </div>
      </div>
      <div
        v-if="(status?.type as PayoutStatusEnum) !== PayoutStatusEnum.DeActive"
        class="flex p-md bg-[#F9F9F9] rounded-md mt-2xl"
      >
        <div class="text-[12px] text-[#00000080] flex">
          {{ $t('_helper.receipt.description') }}
        </div>
      </div>
      <div
        v-if="(status?.type as PayoutStatusEnum) !== PayoutStatusEnum.DeActive"
        class="flex gap-xs mt-2xl w-full"
      >
        <ui-Button
          :text="$t('_zarin_link.share')"
          class="!text-text flex-grow"
          type="tertiary"
          variant="outlined"
          before-icon="Share"
          @click="handleCopy"
        />
        <ui-Button class="!text-text" type="tertiary" icon="Download" @click="downloadImage" />
      </div>
      <div class="flex justify-center mt-2xl items-center">
        <span class="text-[#00000080] text-[14px] -ml-xs">
          {{ $t('_helper.receipt.safe_payment') }}
        </span>
        <ui-Logo name="zarinpalFaLight" class="h-[18px]" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { toPng } from 'html-to-image';
import { PayoutStatusEnum } from '@/graphql/graphql';
interface Props {
  receiptType?: string;
  amount: number | string;
  status: { text: string; type: string; icon?: string };
  list: { label: string; value: string | number; slug?: string }[];
}
const props = withDefaults(defineProps<Props>(), {
  receiptType: '',
});
const { receiptType, amount, list, status } = toRefs(props);
const { numberFormat } = useMath();
const { $notify } = useNuxtApp();
const t = useI18n();
const receiptRef = ref();
const route = useRoute();
const currentUrl = `${window.location.origin}${route.fullPath}`;
const handleCopy = () => {
  navigator.clipboard.writeText(currentUrl);
  $notify({
    isRead: false,
    message: t('common.copied'),
    type: 'success',
  });
};
const downloadImage = () => {
  if (receiptRef.value) {
    toPng(receiptRef.value)
      .then(dataUrl => {
        const link = document.createElement('a');
        link.download = 'receipt.png';
        link.href = dataUrl;
        link.click();

        return true;
      })
      .catch(error => {
        $notify({
          isRead: false,
          message: error,
          type: 'error',
        });
      });
  }
};
</script>
