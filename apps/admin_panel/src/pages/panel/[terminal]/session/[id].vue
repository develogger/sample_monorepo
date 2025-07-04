<template>
  <div class="w-full">
    <SessionDetailsHeader :loading="loading" :data="result && result[0]" />
    <SessionDetailsMain
      v-model:noteId="noteId"
      :time-line="result && result[0]?.timeline"
      :payer-info="result && result[0]?.payer_info"
      :payer-notes="result && result[0]?.notes"
      :data="result && result[0]"
      :show-note="showNote"
      :loading="loading"
    />
  </div>
</template>
<script setup lang="ts">
import { useNoteMutation } from '@/composables/note/useNoteMutation';
import { useSessionQueryById } from '@/composables/session/useSessionQueryById';
import { useSessionSchema } from '@/composables/session/useSessionSchema';

definePageMeta({
  name: 'sessionDetails',
  layout: 'terminal',
});
const t = useI18n();
useHead({
  title: t('_common.page_title.sessions_details'),
});
const router = useRouter();
const { active: terminal } = useActiveTerminal();
const { noteAdd } = useNoteMutation();
const { noteEdit } = useNoteMutation();
const { noteDelete } = useNoteMutation();
const { mutate, onDone, loading: addLoading } = noteAdd();
const { mutate: editMutate, onDone: editDone, loading: editLoading } = noteEdit();
const { mutate: deleteMutate, onDone: deleteDone, loading: deleteLoading } = noteDelete();
const route = useRoute();
const { schema } = useSessionSchema();
const { refetch, result, loading, onResult } = useSessionQueryById();
const showNote = ref<boolean>(false);
const noteId = ref();
const { errors, handleSubmit, meta, resetForm } = useForm({
  validationSchema: schema,
});
const toggle = (forceVal?: boolean) => {
  showNote.value = forceVal ?? !showNote.value;
};
const onSubmit = handleSubmit(values => {
  const variables = {
    content: values.note,
    model_type: 'SESSION',
    model_id: route.params.id,
  };

  if (noteId.value) {
    const variablesEdit = {
      id: noteId.value,
      content: values.note,
    };
    editMutate(variablesEdit);
    editDone(async () => {
      resetForm();
      noteId.value = '';
      toggle(false);
      await refetch();
    });
  } else {
    mutate(variables);
    onDone(async () => {
      resetForm();
      noteId.value = '';
      toggle(false);
      await refetch();
    });
  }
});
const deleteNote = () => {
  if (result && result.value) {
    if (noteId.value) {
      const variablesDelete = {
        id: noteId.value,
      };

      deleteMutate(variablesDelete);

      deleteDone(() => {
        resetForm();
        if (toggle) {
          toggle(false);
        }
        refetch();
        noteId.value = '';
      });
    }
  }
};
onResult(() => {
  if (_isEmpty(result.value)) {
    loading.value = true;

    return router.push(`/panel/${encodeURIComponent(terminal.domain as string)}/session`);
  }
});
const noteLoading = computed(() => addLoading.value || editLoading.value || deleteLoading.value);
provide('form_submit', onSubmit);
provide('form_meta', meta);
provide('form_done', onDone);
provide('form_errors', errors);
provide('toggle', toggle);
provide('deleteNote', deleteNote);
provide('form_loading', noteLoading);
</script>
