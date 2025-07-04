<template>
  <div>
    <ui-Card class="w-full h-full" dir="rtl">
      <template #main>
        <div>
          <UserBaseConnectedAppsPersonalHeader @add="refetch()" />
          <UserBaseConnectedAppsPersonalEmptyGrid v-if="!loading && !personalData?.length" />
          <ui-Table v-else :columns="columns" :items="personalData" :loading="loading">
            <!-- clientName template -->
            <template #item-name="{ name }">
              <div class="flex items-center gap-sm md:w-1/2 lg:w-1/2 xl:w-full">
                <span class="truncate">{{ name }}</span>
              </div>
            </template>

            <!-- updated_at template -->
            <template #item-updated_at="{ updated_at }">
              <div class="flex items-center gap-sm md:w-1/2 lg:w-1/2 xl:w-full">
                <span class="truncate">{{ updated_at }}</span>
              </div>
            </template>

            <!-- action template -->
            <template #item-action="{ id, current }">
              <div v-if="!current && id" class="flex justify-end">
                <ui-Tooltip :content="$t('_user.accessToken.removeToken')" @click="toggleModal(id)">
                  <ui-Icon name="CircleDelete" class="text-icon-danger w-xl h-xl float-left" />
                </ui-Tooltip>
              </div>
            </template>
            <!-- loading template -->
            <template #loadingSkeleton>
              <div v-for="index in pageSize" :key="index" class="loading">
                <div
                  class="grid border-t border-t-border-divider"
                  style="grid-template-columns: 50% 25% 25%"
                >
                  <div class="flex items-center">
                    <ui-Skeleton :width="60" :height="12" class="px-sm py-md" />
                  </div>
                  <div class="my-auto">
                    <ui-Skeleton :width="60" :height="12" class="px-md py-md" />
                  </div>
                  <div class="mr-auto">
                    <ui-Skeleton :width="24" :height="24" circle class="px-md py-md" />
                  </div>
                </div>
              </div>
            </template>
          </ui-Table>
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
import { usePersonalAccessTokenClumns } from '@/composables/accessToken/useAccessTokenClumns';
import { useAccessTokenMutation } from '@/composables/accessToken/useAccessTokenMutation';
import { useAccessTokenQuery } from '@/composables/accessToken/useAccessTokenQuery';
import { AccessTokenEnum } from '~/graphql/graphql';

const { accessTokenRemove } = useAccessTokenMutation();
const { mutate: deleteMutate, onDone: deleteDone, loading: deleteLoading } = accessTokenRemove();
const { columns } = usePersonalAccessTokenClumns();
const { loading, data, refetch } = useAccessTokenQuery();
const personalData = computed(
  () => data.value?.filter(i => i?.client_type === AccessTokenEnum.Personal)
);
const t = useI18n();
const { $notify } = useNuxtApp();
const config = useRuntimeConfig();
const route = useRoute();
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
const pageSize = computed(() => Number(route.query.pageSize) || config.public.pageSize);
</script>
<style lang="scss" scoped>
.ip {
  font-family: IRANYekanRd;
}
</style>
