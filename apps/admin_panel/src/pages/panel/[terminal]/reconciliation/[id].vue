<template>
  <div class="w-full">
    <reconciliationDetailsHeader
      :title="headerTitle"
      :reconciliation-id="data?.id"
      :loading="loading"
      :reconciliation-status="reconciliationStatus"
    />
    <reconciliationDetailsMain
      v-model:noteId="noteId"
      class="container-xl mb-xl"
      :data="data"
      :loading="loading"
      :payer-notes="data && data?.notes"
      :show-note="showNote"
    />
  </div>
</template>
<script setup lang="ts">
import { useNoteMutation } from '@/composables/note/useNoteMutation';
import { useReconciliationQueryById } from '@/composables/reconciliation/useReconciliationByIdQuery';
import { useReconciliationSchema } from '@/composables/reconciliation/useReconciliationSchema';
import { TerminalPermissionEnum } from '@/graphql/graphql';

definePageMeta({
  name: 'reconciliationDetails',
  layout: 'terminal',
  middleware: ['permission'],
  permission: TerminalPermissionEnum.Reconcile,
});
const t = useI18n();
useHead({
  title: t('_common.page_title.reconciliation_details'),
});
const terminal = useTerminalStore();
const router = useRouter();
const { noteAdd, noteEdit, noteDelete } = useNoteMutation();
const { mutate, onDone, loading: addLoading } = noteAdd();
const { mutate: editMutate, onDone: editDone, loading: editLoading } = noteEdit();
const { mutate: deleteMutate, onDone: deleteDone, loading: deleteLoading } = noteDelete();
const { schema } = useReconciliationSchema();
const showNote = ref<boolean>(false);
const route = useRoute();
const noteId = ref();
const { numberFormat } = useMath();
const { refetch, data, loading, onResult } = useReconciliationQueryById();
const headerTitle = computed(() => data.value && numberFormat(data.value.amount - data.value.fee));
const reconciliationStatus = computed(() => data.value && data.value?.status);
const { errors, handleSubmit, meta, resetForm } = useForm({
  validationSchema: schema,
});
const toggle = (forceVal?: boolean) => {
  showNote.value = forceVal ?? !showNote.value;
};
const onSubmit = handleSubmit(values => {
  const variables = {
    content: values.note,
    model_type: 'RECONCILE',
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
  if (data && data.value) {
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
  if (_isEmpty(data.value)) {
    loading.value = true;

    return router.push(
      `/panel/${encodeURIComponent(terminal.currentDomain as string)}/reconciliation`
    );
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
