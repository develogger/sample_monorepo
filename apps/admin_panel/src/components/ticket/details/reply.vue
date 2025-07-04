<template>
  <div class="mt-md">
    <form @submit.prevent="onSubmit">
      <ui-Card>
        <template #header>
          <div class="text-right">{{ $t('_form.reply.title') }}</div>
        </template>
        <template #main>
          <div class="text-body-400-b3 mt-xl">
            <ul class="list-disc text-text-soft mx-md mb-xl" dir="rtl">
              <li>{{ $t('_helper.addTicket.part1') }}</li>
              <li>{{ $t('_helper.addTicket.part2') }}</li>
              <li>{{ $t('_helper.addTicket.part3') }}</li>
            </ul>
            <ui-TextEditor
              v-model="editor"
              name="content"
              :loading="mutateLoading"
              :helper="{
                type: !!errors.content ? 'error' : undefined,
                message: errors.content,
              }"
            />
          </div>
        </template>
        <template #footer>
          <div class="flex mt-xl flex-row-reverse justify-between">
            <div class="flex justify-end mt-md md:mt-0">
              <ui-Dropzone
                v-model:uploaded-file="uploadedFile"
                :description="false"
                :accept="['.png', '.jpg', '.jpeg', '.zip']"
                :max-size="20.12e5"
                :percent="percentUpload"
                :upload-error="uploadError"
                :max-files="1"
                @on-cancel="handleUploadCancel"
                @on-upload="uploadFile"
              />
            </div>
            <div class="mt-md md:mt-0">
              <ui-Button
                html-type="submit"
                :text="$t('_common.buttons.sendTicket')"
                :loading="mutateLoading"
                :disabled="!meta?.valid"
              />
            </div>
          </div>
        </template>
      </ui-Card>
    </form>
  </div>
</template>

<script setup lang="ts">
import { MutationTicketAddReply } from '@zarindesk/js-sdk/dist/types';
import { useTicketMutation } from '@/composables/ticket/useTicketMutation';
import { useTicketReplySchema } from '@/composables/ticket/useTicketReplySchema';

const { $notify } = useNuxtApp();
const t = useI18n();
const router = useRouter();
export interface Response {
  meta: {
    file_id: string;
  };
}
const { replyTicket } = useTicketMutation();
const editor = ref();
const { uploadFile, percentUpload, uploadError, uploadedFile, handleUploadCancel } =
  useUpload(false);
const { loading: mutateLoading, mutate } = replyTicket();
const route = useRoute();
const { schema } = useTicketReplySchema();
const { handleSubmit, errors, resetForm, meta } = useForm({
  validationSchema: schema,
});
const onSubmit = handleSubmit(values => {
  const variables = Object.assign(
    {
      ticket_id: route.params.id,
      content: values.content && editor.value,
    },
    uploadedFile.value && {
      attachments: uploadedFile.value || undefined,
    }
  );
  mutate(variables as unknown as MutationTicketAddReply, () => {
    $notify({
      isRead: false,
      message: t('common.success'),
      type: 'success',
    });
    resetForm();
    router.push('/panel/ticket');
  });
});
</script>
