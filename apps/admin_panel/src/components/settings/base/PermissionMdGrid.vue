<template>
  <div>
    <SharedShareModalConfirm
      v-if="showConfirm"
      submit-label="terminal.yes"
      cancel-label="_common.buttons.cancel"
      description="terminal.removePermission"
      title="terminal.remove"
      :loading="deleteLoading"
      @close="showConfirm = false"
      @confirm="handleConfirm"
      @cancel="showConfirm = false"
    />
    <SettingsBasePermission
      v-if="showPermission"
      :user-data="userData"
      @close="closePermission"
      @done="onDonePermission"
    />
    <SettingsPermissionHeader
      :has-caption="!!tableData.length"
      @click-button="showPermission = true"
    />
    <SettingsBaseMdGridLoading v-if="loading" />
    <ui-EmptyState
      v-if="!loading && !tableData?.length"
      :title="$t('_empty.terminalEdit.title')"
      :description="$t('_empty.terminalEdit.caption')"
      vector="PersonalAccess"
    />
    <template v-else>
      <ui-TableCard v-for="i in tableData" :id="i.id" :key="i.id" class="root">
        <template #header>
          <div class="root__header">
            <!-- avatar column -->
            <div class="root__header--id">
              <div class="flex gap-sm">
                <ui-Avatar :src="i.avatar" :alt="i.name" />
                <div class="h-fit flex flex-col -mt-2xs">
                  <span class="truncate">ZP.{{ i.zp }}</span>
                  <span class="text-text-soft text-body-400-b3">{{ i.name }}</span>
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
              <div class="h-fit">
                <ui-Tooltip :content="i.status" position="top" :max-width="300">
                  <ui-Status class="!mt-0" :text="i.permissions" type="informative" />
                </ui-Tooltip>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <!-- details & actions -->
          <div class="mt-sm flex justify-end">
            <ui-Action
              :limit="2"
              :items="
                actionHandle(
                  i.id!,
                  i.avatar!,
                  i.name,
                  i.zp!,
                  i.status,
                  i.access_list as TerminalPermissionEnum[],
                  callbackAction
                )
              "
              dir="rtl"
            />
          </div>
        </template>
      </ui-TableCard>
    </template>
  </div>
</template>

<script setup lang="ts">
import { usePermissionAction } from '@/composables/setting/usePermissionAction';
import { useSettingColumns } from '@/composables/setting/useSettingColumn';
import { useTerminalMutation } from '@/composables/terminal/useTerminalMutation';
import { useTerminalUserQuery } from '@/composables/terminal/userTerminalUserQuery';
import { TerminalPermissionEnum } from '@/graphql/graphql';
const { $notify } = useNuxtApp();
const t = useI18n();
const idValue = ref<string>();
const { data, loading, refetch } = useTerminalUserQuery();
const { deleteAccess } = useTerminalMutation();
const { mutate: mutateDelete, onDone: onDoneDelete, loading: deleteLoading } = deleteAccess();
const { columns } = useSettingColumns();
const store = useTerminalStore();
const { actionHandle } = usePermissionAction();
const showConfirm = ref(false);
const showPermission = ref(false);
const userData = ref({
  id: '',
  avatar: '',
  name: '',
  zp: '',
  status: '',
  access_list: [] as TerminalPermissionEnum[],
});
const tableData = computed(() => {
  if (data.value && data.value.length) {
    return data.value.map(i => {
      let listOfAccess = '';
      if (i.access_list) {
        listOfAccess =
          (i.access_list.includes(TerminalPermissionEnum.Session)
            ? t('_common.links.session')
            : '') +
          (i.access_list.includes(TerminalPermissionEnum.Refund)
            ? '، ' + t('_session.show.time_line.refund')
            : '') +
          (i.access_list.includes(TerminalPermissionEnum.Reconcile)
            ? '، ' + t('_common.links.reconcile')
            : '') +
          (i.access_list.includes(TerminalPermissionEnum.InstantPayout)
            ? '، ' + t('_common.page_title.instant_payout')
            : '') +
          (i.access_list.includes(TerminalPermissionEnum.Payout)
            ? '، ' + t('_common.links.payout')
            : '') +
          (i.access_list.includes(TerminalPermissionEnum.WagePayout)
            ? '، ' + t('_terminal.permission.wage_payout')
            : '') +
          (i.access_list.includes(TerminalPermissionEnum.Invoice)
            ? '، ' + t('_common.page_title.invoice')
            : '') +
          (i.access_list.includes(TerminalPermissionEnum.Product)
            ? '، ' + t('_common.links.product')
            : '') +
          (i.access_list.includes(TerminalPermissionEnum.Coupon)
            ? '، ' + t('_common.table.coupon')
            : '');
      }

      return {
        id: i.id,
        zp: i.user_id,
        title: i.user_id ? 'ZP.' + i.user_id : ' --',
        name: i.user_name ? i.user_name : ' --',
        avatar: i.user_avatar,
        permissions: i.access_list && i.access_list.length + ' دسترسی',
        status: listOfAccess,
        access_list: i.access_list as TerminalPermissionEnum[] | [],
      };
    });
  }

  return [];
});
const callbackAction = (
  id: string,
  avatar: string,
  name: string,
  zp: string,
  status: string,
  accessList: TerminalPermissionEnum[],
  type: string
) => {
  idValue.value = id;
  if (type === 'delete') {
    showConfirm.value = true;
  } else {
    userData.value.id = id;
    userData.value.avatar = avatar;
    userData.value.name = name;
    userData.value.zp = zp;
    userData.value.status = status;
    userData.value.access_list = accessList;
    showPermission.value = true;
  }
};
const handleConfirm = () => {
  if (store.currentTerminal && idValue.value) {
    mutateDelete({
      id: idValue.value,
      terminal_id: store.currentTerminal,
    });
    onDoneDelete(() => {
      showConfirm.value = false;
      refetch();
      $notify({
        isRead: false,
        message: t('common.success'),
        type: 'success',
      });
    });
  }
};
const closePermission = () => {
  showPermission.value = false;
  userData.value = {
    id: '',
    avatar: '',
    name: '',
    zp: '',
    status: '',
    access_list: [],
  };
};
const onDonePermission = () => {
  closePermission();
  refetch();
};
</script>

<style lang="scss" scoped>
.root {
  @apply mt-md;
  &__header {
    @apply flex justify-between flex-wrap items-center;
    &--id {
      @apply flex items-center;
      &__text {
        @apply text-text pl-sm  text-body-400-b1 font-medium;
      }
    }
    &--status {
      @apply -mt-sm;
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
