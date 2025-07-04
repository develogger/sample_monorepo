<template>
  <div class="flex justify-between mb-xl">
    <span class="text-heading-600-h2 flex items-center">
      {{ $t('_user.accessToken.title') }}
    </span>
    <ui-Button
      variant="outlined"
      type="neutral"
      :text="$t('_user.accessToken.remove_other_tokens')"
      @click="toggleModal"
    />
  </div>
  <p class="text-text-soft text-body-400-b3 mb-xl">{{ $t('_user.accessToken.subTitle') }}</p>

  <SharedShareModalConfirm
    v-if="addModal"
    submit-label="terminal.yes"
    cancel-label="_common.buttons.cancel"
    description="_user.accessToken.removeAllOk"
    title="_user.accessToken.remove_other_tokens"
    :loading="deleteLoading"
    @close="addModal = false"
    @confirm="handleConfirm"
    @cancel="addModal = false"
  />
</template>
<script setup lang="ts">
import { useAccessTokenMutation } from '@/composables/accessToken/useAccessTokenMutation';

const addModal = ref(false);
const toggleModal = () => {
  addModal.value = !addModal.value;
};
const t = useI18n();
const { $notify } = useNuxtApp();
const emit = defineEmits(['remove-all']);
const { accessTokenRemove } = useAccessTokenMutation();
const { mutate: deleteMutate, onDone: deleteDone, loading: deleteLoading } = accessTokenRemove();
const handleConfirm = () => {
  const variablesDelete = {
    token_id: 'logout_all',
  };
  deleteMutate(variablesDelete);
  deleteDone(res => {
    emit('remove-all');
    addModal.value = false;
    if (res.data.AccessTokenRemove) {
      $notify({
        isRead: false,
        message: t('_user.accessToken.removeSuccess'),
        type: 'success',
      });
    } else {
      $notify({
        isRead: false,
        message: t('_user.accessToken.removeErr'),
        type: 'error',
      });
    }
  });
};
provide('toggleModal', toggleModal);
</script>
