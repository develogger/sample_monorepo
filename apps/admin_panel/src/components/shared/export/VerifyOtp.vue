<template>
  <div>
    <div class="flex flex-col items-center pt-md pb-lg gap-lg">
      <ui-Illustration name="ProductPaymentLink" />
      <span class="text-body-400-b2 text-text-soft break-words">{{
        $t('session.export.email_desc4', { email: props.emailVal })
      }}</span>
      <ui-OtpField
        v-model="otp"
        class="w-full !justify-between"
        :loading="false"
        name="otpField"
        @update:model-value="verifyOtp"
      />
      <div class="flex justify-center gap-sm">
        <ui-Button
          type="tertiary"
          size="medium"
          variant="text"
          :text="$t('session.export.edit_email')"
          @click="emit('handleStep', ExportModalEnum.VerifyEmail)"
        />
        <ui-Divider type="vertical" />
        <span class="text-body-400-b3 text-text-soft">
          {{ $t('session.export.resen_email_timer', { second: timer }) }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ExportModalEnum } from '@/composables/excelExport/useSessionExcelExportMutation';
import { useEmailVerifyMutation } from '@/composables/user/useSendVerifyEmail';

export interface Props {
  emailVal?: string;
}

const props = withDefaults(defineProps<Props>(), {
  emailVal: '',
});
const emit = defineEmits(['handleStep']);
const { verifyEmail } = useEmailVerifyMutation();
const { mutate: verifyMutate, onDone: verifyDone } = verifyEmail();
const otp = ref();
const verifyOtp = () => {
  verifyMutate({
    otp_code: otp.value,
  });
  verifyDone(() => {
    emit('handleStep', ExportModalEnum.ExportExcel);
  });
};
const { start, timer } = useCountDown(60, () => {
  emit('handleStep', ExportModalEnum.VerifyEmail);
});

onMounted(() => {
  start();
});
</script>
