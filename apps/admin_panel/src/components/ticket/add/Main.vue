<template>
  <div class="root">
    <div class="w-full md:w-1/3 flex md:flex-col flex-row md:items-center">
      <ui-Illustration v-if="!md" name="SupportAvatars" />
      <div class="text-right w-full my-md relative text-body-400-b3">
        <ul class="list-disc text-text-soft space-y-xl list-outside mx-md" dir="rtl">
          <li>{{ $t('_helper.addTicket.part1') }}</li>
          <li>{{ $t('_helper.addTicket.part2') }}</li>
          <li>{{ $t('_helper.addTicket.part3') }}</li>
        </ul>
      </div>
    </div>
    <div class="w-full md:w-2/3">
      <ui-Card>
        <template #main>
          <form @submit.prevent="onSubmit">
            <div class="text-text-soft text-body-400-b2 text-right flex flex-col gap-sm">
              <span>{{ $t('_form.addTicket.description') }}</span>
              <!-- department -->
              <div class="flex flex-col mt-xl w-full justify-between gap-sm">
                <div class="w-full">
                  <ui-Select
                    after-icon="AngleDown"
                    :loading="loading || mutateLoading"
                    name="department"
                    :data="data"
                    :value="selectedDepartment"
                    :placeholder="$t('_form.addTicket.department')"
                    :helper="{
                      type: isDirty && !!errors.department ? 'error' : undefined,
                      message: errors.department,
                    }"
                    @selected-item="handleSelectedDepartment"
                  />
                </div>
                <div class="w-full">
                  <!-- session id filed -->
                  <ui-TextField
                    v-if="selectedDepartment.id === 22"
                    name="sessionId"
                    is-number
                    :loading="loading"
                    :placeholder="$t('_form.addTicket.sessionId')"
                    :helper="{
                      type: !!errors.sessionId ? 'error' : undefined,
                      message: errors.sessionId,
                    }"
                  />
                  <!-- terminal field -->
                  <ui-Select
                    v-if="selectedDepartment.id === 19 || selectedDepartment.id === 21"
                    after-icon="AngleDown"
                    :loading="terminalLoading || mutateLoading"
                    name="terminal"
                    :data="terminalsData"
                    :value="selectedTerminal"
                    :placeholder="$t('_form.addTicket.terminal')"
                    :helper="{
                      type: !!errors.terminal ? 'error' : undefined,
                      message: errors.terminal || '',
                    }"
                    @selected-item="handleSelectedTerminal"
                  />
                </div>
              </div>
              <div>
                <ui-TextField
                  :placeholder="$t('_form.addTicket.title')"
                  name="title"
                  :loading="loading"
                  :helper="{
                    type: !!errors.title ? 'error' : undefined,
                    message: errors.title,
                  }"
                />
              </div>
              <div>
                <ui-Textarea
                  :placeholder="$t('_form.addTicket.content')"
                  name="content"
                  :loading="loading || mutateLoading"
                  :helper="{
                    type: !!errors.content ? 'error' : undefined,
                    message: errors.content,
                  }"
                />
              </div>
              <div class="md:flex md:mt-xl md:flex-row-reverse md:justify-between">
                <div class="flex justify-end">
                  <ui-Dropzone
                    v-model:uploaded-file="uploadedFile"
                    :description="false"
                    :max-size="20.12e5"
                    :accept="['.png', '.jpg', '.jpeg', '.zip']"
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
            </div>
          </form>
        </template>
      </ui-Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MutationTicketAddArgs } from '@zarindesk/js-sdk/dist/types';
import { ModelEnum } from '@/graphql/graphql';
import { useTicketMutation } from '@/composables/ticket/useTicketMutation';
import { useDepartmentQuery } from '@/composables/ticket/useDepartmentQuery';
import { useTerminalMenuQuery } from '@/composables/terminal/useTerminalMenuQuery';
import { useTicketSchema } from '@/composables/ticket/useTicketSchema';

export interface Response {
  meta: {
    file_id: string;
  };
}
const t = useI18n();
const router = useRouter();
const { $notify } = useNuxtApp();
const { addTicket } = useTicketMutation();
const { md } = useSize();
const { loading, data, fetchData } = useDepartmentQuery();
const { loading: terminalLoading, data: terminals } = useTerminalMenuQuery();
const terminalsData = computed(() => {
  if (terminals.value && terminals.value.length) {
    return terminals.value.map(item => ({
      ...item,
      title: item?.name ?? '',
      id: item?.id ?? '',
      description: item?.domain,
    }));
  }
});
const selectedDepartment = ref({
  id: 0,
  title: '',
});
const selectedTerminal = ref({
  id: '',
  title: '',
});
const { uploadFile, percentUpload, uploadError, uploadedFile, handleUploadCancel } =
  useUpload(false);
const { schema } = useTicketSchema(selectedDepartment);
const { handleSubmit, errors, setFieldError, meta } = useForm({
  validationSchema: schema,
});
const isDirty = useIsFormDirty();
const { snakeToCamel } = useSnakeToCamel();
type validationType = 'title' | 'content' | 'department' | 'sessionId' | 'terminal';
const { mutate, loading: mutateLoading } = addTicket((input, message, params) => {
  setFieldError(snakeToCamel(input) as validationType, t('_validation.' + message, params));
});
/**
 * set id for show or hide dynamic field
 * @param value item of selected department , id,name of field
 */
const handleSelectedDepartment = (value: { id: string; title: string }) => {
  if (Number(value.id) !== 19 || Number(value.id) !== 21) {
    selectedTerminal.value = {
      id: '',
      title: '',
    };
  }
  selectedDepartment.value.id = Number(value.id);
  selectedDepartment.value.title = value.title;
};
const handleSelectedTerminal = (value: { id: string; title: string }) => {
  selectedTerminal.value = value;
};
/**
 * upload attachment
 * @param value html input file
 */
const model = (value: number) => {
  const types: { [key: number]: string } = {
    1: 'TERMINAL',
    6: 'TERMINAL',
    5: 'BANKACCOUNT',
  };

  return types[value] ?? types[0];
};
const onSubmit = handleSubmit(values => {
  const content = ref<string>();
  if (values.sessionId) {
    content.value = t('_form.addTicket.sessionId') + ': ' + values.sessionId + values.content;
  } else {
    content.value = values.content;
  }
  const variables: MutationTicketAddArgs = Object.assign(
    {
      ticket_department_id: selectedDepartment.value.id.toString(),
      title: values.title,
      content: content.value,
      priority: 'MEDIUM',
    },

    model(+selectedDepartment.value.id) && {
      model_type: model(+selectedDepartment.value.id) as ModelEnum,
    },
    values.terminal && { model_id: values.terminal ? selectedTerminal.value.id : undefined },
    uploadedFile.value && { attachments: uploadedFile.value ? uploadedFile.value : undefined }
  );
  mutate(variables, res => {
    mutateLoading.value = true;
    $notify({
      isRead: false,
      message: t('common.success'),
      type: 'success',
    });
    router.push(`/panel/ticket/${res?.id}`);
  });
});
onMounted(() => {
  fetchData();
});
</script>

<style lang="scss" scoped>
.root {
  @apply flex flex-col-reverse md:flex-row gap-md font-yekanFa;
}
</style>
