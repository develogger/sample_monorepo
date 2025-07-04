<template>
  <div class="root" dir="rtl">
    <ui-Modal
      v-if="show"
      ref="filterRef"
      :text="$t('_user.accessToken.removeToken')"
      close-icon
      header
      width="480px"
      @close="toggleModal"
    >
      <template #body>
        <div>
          <p class="p-md text-body-400-b2 text-text">{{ $t('_user.accessToken.removeOk') }}</p>
          <div class="flex justify-between float-left my-md">
            <ui-Button
              size="medium"
              class="inline-flex main__item--button"
              type="secondary"
              :text="$t('common.cancel')"
              @click="toggleModal"
            />
            <ui-Button
              class="inline-flex mr-xs main__item--button"
              size="medium"
              type="decretive"
              :text="$t('_common.buttons.iisOkRemove')"
              :loading="loading"
              @click="remove()"
            />
          </div>
        </div>
      </template>
    </ui-Modal>
  </div>
</template>
<script setup lang="ts">
import { useAccessTokenMutation } from '@/composables/accessToken/useAccessTokenMutation';
import { useAccessTokenQuery } from '@/composables/accessToken/useAccessTokenQuery';

export interface Props {
  id?: string;
  show?: boolean;
  modal?: boolean;
  loading?: boolean;
}
const t = useI18n();
const { $notify } = useNuxtApp();
const emit = defineEmits(['close']);
const props = withDefaults(defineProps<Props>(), {
  id: '',
});
const { loading, id, show } = toRefs(props);
const toggleModal = inject<(() => void | undefined) | undefined>('toggleModal');
const { accessTokenRemove } = useAccessTokenMutation();
const { refetch } = useAccessTokenQuery();
const { mutate: deleteMutate, onDone: deleteDone } = accessTokenRemove();
const remove = () => {
  const variablesDelete = {
    token_id: id?.value,
  };
  deleteMutate(variablesDelete);
  deleteDone(res => {
    emit('close');
    refetch();
    if (res.data.AccessTokenRemove) {
      $notify({
        isRead: false,
        message: t('_user.accessToken.success_remove'),
        type: 'success',
      });
    } else {
      $notify({
        isRead: false,
        message: t('_user.accessToken.err_remove'),
        type: 'error',
      });
    }
  });
};
</script>
