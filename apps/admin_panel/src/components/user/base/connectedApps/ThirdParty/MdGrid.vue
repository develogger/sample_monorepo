<template>
  <div>
    <ui-Card class="w-full h-full mb-2xl" dir="rtl">
      <template #main>
        <div>
          <UserBaseConnectedAppsThirdPartyHeader />
          <UserBaseConnectedAppsThirdPartyMdGridLoading v-if="loading" />
          <UserBaseConnectedAppsThirdPartyEmptyGrid
            v-else-if="!loading && !thirdPartyData?.length"
          />
          <div v-else>
            <ui-TableCard v-for="i in thirdPartyData" :key="i?.id" class="root">
              <template #header>
                <div class="root__header">
                  <!-- avatar column -->
                  <div class="root__header--id">
                    <div class="flex gap-sm">
                      <ui-Avatar :src="i?.avatar" :alt="i?.name" />
                      <div class="h-fit flex flex-col -mt-2xs">
                        <span class="truncate">{{ i?.name }}</span>
                        <span class="text-text-soft text-body-400-b3">{{ i?.name }}</span>
                      </div>
                    </div>
                    <!-- </ui-Skeleton> -->
                  </div>
                </div>
              </template>
              <template #main>
                <!-- permission column -->
                <div class="root__main--title mt-sm items-center">
                  <div class="root__main--title__label">
                    {{ columns[1].label }}
                  </div>
                  <div class="root__main--title__title">
                    <span class="truncate">{{ i?.updated_at }}</span>
                  </div>
                </div>
              </template>
              <template #footer>
                <!-- details & actions -->
                <div class="mt-sm flex justify-end">
                  <div v-if="!i?.current" class="flex justify-end">
                    <ui-Tooltip
                      :content="$t('_user.accessToken.removeToken')"
                      @click="toggleModal(i?.id)"
                    >
                      <ui-Icon
                        name="CircleDelete"
                        class="text-icon-danger w-xl h-xl float-left cursor-pointer"
                      />
                    </ui-Tooltip>
                  </div>
                </div>
              </template>
            </ui-TableCard>
          </div>
        </div>
      </template>
    </ui-Card>
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
  </div>
</template>

<script setup lang="ts">
import { useThirdPartyAccessTokenClumns } from '@/composables/accessToken/useAccessTokenClumns';
import { useAccessTokenMutation } from '@/composables/accessToken/useAccessTokenMutation';
import { useAccessTokenQuery } from '@/composables/accessToken/useAccessTokenQuery';
import { AccessTokenEnum } from '@/graphql/graphql';

const { columns } = useThirdPartyAccessTokenClumns();
const { accessTokenRemove } = useAccessTokenMutation();
const { mutate: deleteMutate, onDone: deleteDone, loading: deleteLoading } = accessTokenRemove();
const { loading, data, refetch } = useAccessTokenQuery();
const { $notify } = useNuxtApp();
const t = useI18n();
const thirdPartyData = computed(
  () => data.value?.filter(i => i?.client_type === AccessTokenEnum.Thirdparty)
);
const uniqId = ref<string | undefined>();
const addModal = ref(false);
const toggleModal = (id: string | undefined) => {
  addModal.value = !addModal.value;
  uniqId.value = id;
};
const handleConfirm = () => {
  const variablesDelete = {
    token_id: uniqId.value,
  };
  deleteMutate(variablesDelete);
  deleteDone(() => {
    refetch();
    addModal.value = false;
    uniqId.value = '';
    $notify({
      isRead: false,
      message: t('_user.accessToken.success_remove'),
      type: 'success',
    });
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
