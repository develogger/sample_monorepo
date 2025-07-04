<template>
  <div>
    <SharedShareModalConfirm
      v-if="showConfirm"
      :submit-label="'terminal.yes'"
      :cancel-label="'_common.buttons.cancel'"
      :description="'terminal.removePermission'"
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
      :loading="loading"
      @click-button="showPermission = true"
    />

    <ui-EmptyState
      v-if="!loading && !tableData?.length"
      :title="$t('_empty.terminalEdit.title')"
      :description="$t('_empty.terminalEdit.caption')"
      vector="PersonalAccess"
    />
    <ui-Table
      v-else
      :columns="columns"
      :items="tableData"
      :loading="loading"
      @hover-row="eventHandler"
    >
      <!-- avatar template -->
      <template #item-zp="{ name, zp, avatar }">
        <div class="flex gap-sm">
          <ui-Avatar :src="avatar" :alt="name" has-border />
          <div class="h-fit flex flex-col -mt-2xs">
            <span class="truncate">ZP.{{ zp }}</span>
            <span class="text-text-soft text-body-400-b3">{{ name }}</span>
          </div>
        </div>
      </template>
      <!-- permission template -->
      <template #item-permission="{ permissions, status }">
        <div class="h-fit w-fit">
          <ui-Tooltip position="top" :max-width="300" :content="status">
            <ui-Status :text="permissions" type="informative" />
          </ui-Tooltip>
        </div>
      </template>
      <!-- action template -->
      <template #item-action="{ id, avatar, name, zp, status, access_list }">
        <div class="flex justify-end">
          <ui-Action
            :id="id"
            v-model:eventType="eventType"
            :selected-id="idValue"
            :limit="2"
            :items="actionHandle(id, avatar, name, zp, status, access_list, callbackAction)"
            dir="rtl"
            @id-value="idValueHandler"
          />
        </div>
      </template>
      <!-- loading template -->
      <template #loadingSkeleton>
        <div v-for="index in 5" :key="index" class="loading">
          <div
            class="grid border-t border-t-border-divider"
            style="grid-template-columns: minmax(300px, 2fr) minmax(100px, 10rem) 80px"
          >
            <div class="flex items-center gap-sm">
              <ui-Skeleton
                :width="40"
                :height="40"
                circle
                class="pr-sm flex items-center justify-center"
              />
              <div class="h-fit flex flex-col gap-xs">
                <ui-Skeleton :width="65" :height="12" class="" />
                <ui-Skeleton :width="65" :height="12" class="" />
              </div>
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="60" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto flex justify-end">
              <ui-Skeleton :width="32" :height="32" class="px-md py-md" />
            </div>
          </div>
        </div>
      </template>
    </ui-Table>
  </div>
</template>

<script setup lang="ts">
import { usePermissionAction } from '@/composables/setting/usePermissionAction';
import { useSettingColumns } from '@/composables/setting/useSettingColumn';
import { useTerminalMutation } from '@/composables/terminal/useTerminalMutation';
import { useTerminalUserQuery } from '@/composables/terminal/userTerminalUserQuery';
import { TerminalPermissionEnum, TerminalUserType } from '@/graphql/graphql';
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
const eventType = ref();
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
        access_list: i.access_list,
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
    userData.value.access_list = accessList as TerminalPermissionEnum[];
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
const idValueHandler = (value: string) => {
  idValue.value = value;
};
const eventHandler = (event: MouseEvent, item: TerminalUserType) => {
  eventType.value = { event: event.type, uniqueId: item.id };
};
const onDonePermission = () => {
  closePermission();
  refetch();
};
</script>
