<template>
  <div class="root" dir="rtl">
    <ui-Modal
      ref="filterRef"
      :text="$t('_user.notification.add_email')"
      close-icon
      header
      width="480px"
      @close="toggleModal"
    >
      <template #body>
        <div>
          <form @submit.prevent="onSubmit">
            <div class="flex flex-col">
              <div class="flex flex-col items-center pt-md pb-lg gap-md">
                <ui-Illustration name="EmailDownload" />
                <span class="text-body-400-b2 text-text-soft break-words">{{
                  $t('session.export.email_desc3')
                }}</span>
                <ui-TextField
                  v-model="email"
                  dir="ltr"
                  class="w-full"
                  :loading="false"
                  :placeholder="$t('_form.addProduct.email')"
                  :helper="{
                    type: !!errors.email ? 'error' : undefined,
                    message: errors.email,
                  }"
                  label
                  auto-focus
                  name="email"
                />
              </div>
            </div>
            <div class="flex justify-end pa-md gap-xs">
              <ui-Button
                type="secondary"
                size="medium"
                :text="$t('session.export.not_now')"
                @click="emit('close')"
              />
              <ui-Button
                type="primary"
                :disabled="!email"
                size="medium"
                :text="$t('session.export.verify_email')"
                :loading="sendVerifyEmailLoading"
                html-type="submit"
              />
            </div>
          </form>
        </div>
      </template>
    </ui-Modal>
  </div>
</template>

<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useEmailVerifyMutation } from '@/composables/user/useSendVerifyEmail';

export interface Props {
  modal?: boolean;
  show: boolean;
}
const toggleModal = inject<(() => void | undefined) | undefined>('toggleModal');
const emit = defineEmits(['handleStep', 'close']);
const t = useI18n();
const email = ref();
const { sendVerifyEmail } = useEmailVerifyMutation();
const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      email: z.string().email({
        message: t('_validation.emailNotValid'),
      }),
    })
  ),
});
const {
  mutate: sendVerifyEmailMutate,
  onDone: sendVerifyEmailDone,
  loading: sendVerifyEmailLoading,
} = sendVerifyEmail();
const onSubmit = handleSubmit(values => {
  email.value = values.email;
  sendVerifyEmailMutate(email.value);
  sendVerifyEmailDone(() => {
    emit('handleStep', email.value);
  });
});
</script>
