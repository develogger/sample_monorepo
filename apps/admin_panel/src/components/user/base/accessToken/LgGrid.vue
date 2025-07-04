<template>
  <div>
    <UserBaseAccessTokenHeader @remove-all="refetch()" />
    <UserBaseConnectedAppsPersonalEmptyGrid v-if="data?.length === 0" />
    <ui-Table v-else :columns="columns" :items="data" :loading="loading">
      <!-- clientName template -->
      <template #item-name="{ name }">
        <div class="flex items-center gap-sm md:w-1/2 lg:w-1/2 xl:w-full">
          <span class="truncate">{{ name }}</span>
        </div>
      </template>
      <!-- loginIp template -->
      <template #item-login_ip="{ login_ip, country_code }">
        <div class="flex items-center gap-sm ip">
          <ui-Flag v-if="country_code" class="h-xl w-xl rounded-circle" :name="country_code" />
          <span>{{ login_ip }}</span>
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
        <div v-if="!current" class="flex justify-end">
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
            style="grid-template-columns: 30% 26% 30% 80px"
          >
            <div class="flex items-center">
              <ui-Skeleton :width="60" :height="12" class="px-sm py-md" />
            </div>
            <div class="my-auto flex items-center gap-sm px-md py-md">
              <ui-Skeleton :width="22" :height="22" circle />
              <ui-Skeleton :width="60" :height="12" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="60" :height="12" class="px-md py-md" />
            </div>
            <!-- <div v-if="i !== 0" class="mr-auto">
              <ui-Skeleton :width="24" :height="24" circle class="px-md py-md" />
            </div> -->
          </div>
        </div>
      </template>
    </ui-Table>
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
import { useAccessTokenClumns } from '@/composables/accessToken/useAccessTokenClumns';
import { useAccessTokenMutation } from '@/composables/accessToken/useAccessTokenMutation';
import { useAccessTokenQuery } from '@/composables/accessToken/useAccessTokenQuery';

const t = useI18n();
const { $notify } = useNuxtApp();
const { columns } = useAccessTokenClumns();
const { data, loading, refetch } = useAccessTokenQuery();
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
const pageSize = computed(() => Number(route.query.pageSize) || config.public.pageSize);
</script>
<style lang="scss" scoped>
.ip {
  font-family: IRANYekanRd;
}
</style>
