<template>
  <div>
    <UserBaseAccessTokenHeader @remove-all="refetch()" />
    <UserBaseAccessTokenMdGridLoading v-if="loading" />
    <UserBaseAccessTokenEmptyGrid v-if="!loading && data?.length === 0" />
    <div v-else>
      <ui-TableCard v-for="i in data" :key="i?.id" :loading="loading" class="root">
        <template #main>
          <!-- id column -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[0].label }}
            </div>
            <div class="root__main--title__title">
              {{ i?.name }}
            </div>
          </div>
          <ui-Divider />
          <!-- login_ip colum -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[1].label }}
            </div>
            <div class="root__main--title__title flex items-center gap-sm">
              <ui-Flag
                v-if="i?.country_code"
                class="h-xl w-xl rounded-circle"
                :name="i?.country_code"
              />
              <span class="font-yekanRd">{{ i?.login_ip }}</span>
            </div>
          </div>
          <ui-Divider />

          <!-- updated_at colum -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[2].label }}
            </div>
            <div class="root__main--title__title">
              {{ i?.updated_at }}
            </div>
          </div>
          <ui-Divider v-if="!i?.current" />

          <div v-if="!i?.current" class="flex justify-end mt-sm">
            <ui-Tooltip :content="$t('_user.accessToken.removeToken')" @click="toggleModal(i?.id)">
              <ui-Icon
                name="CircleDelete"
                class="text-icon-danger w-xl h-xl float-left cursor-pointer"
              />
            </ui-Tooltip>
          </div>
        </template>
      </ui-TableCard>
    </div>
  </div>
  <SharedShareModalConfirm
    v-if="addModal"
    submit-label="terminal.yes"
    cancel-label="_common.buttons.cancel"
    description="_user.accessToken.removeOk"
    title="_user.accessToken.removeToken"
    :loading="deleteLoading"
    @close="addModal = false"
    @confirm="handleConfirm"
    @cancel="addModal = false"
  />
</template>

<script setup lang="ts">
import { useAccessTokenClumns } from '@/composables/accessToken/useAccessTokenClumns';
import { useAccessTokenMutation } from '@/composables/accessToken/useAccessTokenMutation';
import { useAccessTokenQuery } from '@/composables/accessToken/useAccessTokenQuery';

const t = useI18n();
const { $notify } = useNuxtApp();
const { data, loading, refetch } = useAccessTokenQuery();
const { accessTokenRemove } = useAccessTokenMutation();
const { mutate: deleteMutate, onDone: deleteDone, loading: deleteLoading } = accessTokenRemove();
const { columns } = useAccessTokenClumns();
const addModal = ref(false);
const uniqId = ref<string | undefined>();
const toggleModal = (id: string | undefined) => {
  addModal.value = !addModal.value;
  uniqId.value = id;
};
const handleConfirm = () => {
  const variablesDelete = {
    token_id: uniqId?.value,
  };
  deleteMutate(variablesDelete);
  deleteDone(res => {
    refetch();
    addModal.value = false;
    uniqId.value = '';
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
provide('toggleModal', toggleModal);
</script>

<style lang="scss" scoped>
.root {
  @apply mt-md;
  &__header {
    @apply flex justify-between;
    &--id {
      @apply flex items-center gap-2xs;
      &__text {
        @apply text-body-400-b2 text-text;
      }
    }
    &--status {
      @apply flex gap-2xs -mt-sm;
    }
  }
  &__main {
    &--title {
      @apply flex justify-between mb-sm;
      &__label {
        @apply text-body-400-b3 text-text-soft font-medium pl-sm;
      }
      &__title {
        @apply text-body-400-b2 text-text;
      }
    }
  }
  &__footer {
    @apply flex justify-between;
    &__detail {
      @apply text-body-400-b2 text-primary font-medium my-auto;
    }
    &__button {
      @apply text-body-400-b2 text-text;
    }
  }
}
</style>
