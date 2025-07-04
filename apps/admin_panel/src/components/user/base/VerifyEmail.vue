<template>
  <div>
    <ui-Modal
      :text="$t('_user.notification.add_email')"
      close-icon
      header
      width="480px"
      class="w-full lg:max-w-[440px] max-h-[500px]"
      :footer-boarder="step !== ExportModalEnum.Otp"
      @close="emit('close')"
    >
      <template #body>
        <SharedExportVerifyEmail
          v-if="step === ExportModalEnum.VerifyEmail"
          :description="$t('_user.notification.insert_email_address')"
          @close="emit('close')"
          @handle-step="
            (emailVal: string) => {
              email = emailVal;
              step = ExportModalEnum.Otp;
            }
          "
        />
        <SharedExportVerifyOtp
          v-if="step === ExportModalEnum.Otp"
          :email-val="email"
          @handle-step="
            (val: string) =>
              val === 'verifyEmail' ? (step = ExportModalEnum.VerifyEmail) : emit('submit')
          "
        />
      </template>
    </ui-Modal>
  </div>
</template>
<script lang="ts" setup>
import { ExportModalEnum } from '@/composables/excelExport/useSessionExcelExportMutation';
const step = ref(ExportModalEnum.VerifyEmail);
const email = ref();
const emit = defineEmits(['close', 'cancel', 'submit']);
</script>
