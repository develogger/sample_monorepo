<template>
  <div>
    <ui-Card class="w-full h-full mb-xl" dir="rtl">
      <template #main>
        <div>
          <UserBaseConnectedAppsThirdPartyHeader class="mb-2xl" />
          <UserBaseConnectedAppsThirdPartyEmptyGrid v-if="!loading && !thirdPartyData?.length" />
          <div v-else>
            <ui-Table :columns="columns" :items="thirdPartyData" :loading="loading">
              <!-- clientName template -->

              <template #item-name="{ name, avatar }">
                <ui-Skeleton :loading="loading" :width="104" class="mt-2xs">
                  <div class="flex gap-sm">
                    <ui-Avatar :src="avatar" shape="rounded" size="md" />
                    <div>
                      <div class="text-body-400-b2 text-text">{{ name }}</div>
                      <div class="text-caption-400-c1 text-text-soft">{{ name }}</div>
                    </div>
                  </div>
                </ui-Skeleton>
              </template>

              <!-- updated_at template -->
              <template #item-updated_at="{ updated_at }">
                <div class="flex items-center gap-sm md:w-1/2 lg:w-1/2 xl:w-full">
                  <span class="truncate">{{ updated_at }}</span>
                </div>
              </template>

              <!-- action template -->
              <template #item-action="{ id, current }">
                <div v-if="!current" class="flex justify-end">
                  <ui-Tooltip
                    :content="$t('_user.accessToken.removeToken')"
                    @click="toggleModal(id)"
                  >
                    <ui-Icon
                      name="CircleDelete"
                      class="text-icon-danger w-xl h-xl float-left cursor-pointer"
                    />
                  </ui-Tooltip>
                </div>
              </template>
              <!-- loading template -->
              <template #loadingSkeleton>
                <div v-for="index in pageSize" :key="Number(index)" class="loading">
                  <div
                    class="grid border-t border-t-border-divider"
                    style="grid-template-columns: 50% 25% 25%"
                  >
                    <div class="flex gap-sm items-center p-md">
                      <ui-Skeleton :width="40" :height="40" circle />
                      <div class="flex flex-col gap-xs">
                        <ui-Skeleton :width="100" :height="12" class="" />
                        <ui-Skeleton :width="64" :height="12" class="" />
                      </div>
                    </div>
                    <div class="my-auto">
                      <ui-Skeleton :width="60" :height="12" class="px-md py-md" />
                    </div>
                    <div class="mr-auto">
                      <ui-Skeleton :width="24" :height="24" circle class="px-md py-md rounded-md" />
                    </div>
                  </div>
                </div>
              </template>
            </ui-Table>
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

const t = useI18n();
const { $notify } = useNuxtApp();
const { columns } = useThirdPartyAccessTokenClumns();
const { refetch, loading, data } = useAccessTokenQuery();
const thirdPartyData = computed(
  () => data.value?.filter(i => i?.client_type === AccessTokenEnum.Thirdparty)
);
const { accessTokenRemove } = useAccessTokenMutation();
const { mutate: deleteMutate, onDone: deleteDone, loading: deleteLoading } = accessTokenRemove();
const config = useRuntimeConfig();
const route = useRoute();
const addModal = ref(false);
const uniqId = ref<string | undefined>();
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
