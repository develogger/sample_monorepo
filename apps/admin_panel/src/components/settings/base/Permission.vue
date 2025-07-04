<template>
  <div>
    <ui-Modal
      close-icon
      :text="userData.id ? $t('_common.modal.edit_session') : $t('_common.buttons.add_session')"
      width="430px"
      @close="$emit('close')"
    >
      <template #body>
        <form @submit.prevent="onSubmit">
          <div v-if="!userData.id" class="text-text-soft text-body-400-b3 mb-xl">
            {{ $t('_helper.settings.add_help') }}
          </div>
          <div v-if="userData.id">
            <div class="flex gap-sm">
              <ui-Avatar :alt="userData.name" :src="userData.avatar" />
              <div class="h-fit flex flex-col -mt-2xs">
                <span class="truncate">ZP.{{ userData.zp }}</span>
                <span class="text-text-soft text-body-400-b3">{{ userData.name }}</span>
              </div>
            </div>
            <ui-Divider class="my-xl" />
          </div>
          <ui-TextField
            v-if="!userData.zp"
            v-model:model-value="zpId"
            dir="ltr"
            class="w-full mb-xl"
            input-custom-class="font-Mono"
            :disabled="isLoading"
            name="user_id"
            :helper="{
              type: !!errors?.user_id ? 'error' : undefined,
              message: errors?.user_id,
            }"
            unit=".ZP"
            is-number
            :loading="loading"
            label
            :placeholder="$t('_common.table.zpId')"
            @update:model-value="updateActions"
          >
          </ui-TextField>
          <ui-Divider v-if="!userData.id" class="w-full mb-xl" />
          <div class="text-text-soft text-body-400-b3 mb-xl">
            {{ $t('_common.slug.list_session') }}
          </div>
          <div class="flex flex-col gap-md">
            <template v-for="(item, index) in items" :key="index">
              <SettingsPermissionItem
                v-model:checked="item.checked"
                :disabled="item.disabled"
                :name="item.name"
                :label="item.label"
                @change="updateToggle"
              />
            </template>
          </div>
        </form>
      </template>
      <template #footer>
        <div class="flex justify-end gap-xs w-full">
          <ui-Button
            :text="$t('_common.buttons.cancel')"
            :disabled="isLoading"
            type="secondary"
            @click="$emit('close')"
          />
          <ui-Button
            :text="userData.id ? $t('_common.buttons.save') : $t('terminal.givePermission')"
            :disabled="loading || disableSubmit"
            :loading="isLoading"
            type="primary"
            @click="onSubmit"
          />
        </div>
      </template>
    </ui-Modal>
  </div>
</template>

<script setup lang="ts">
import { TerminalPermissionEnum } from '@/graphql/graphql';

interface UserData {
  id: string;
  name: string;
  avatar: string;
  zp: string;
  status: string;
  access_list: [];
}
export interface Props {
  userData: UserData;
}
interface PermissionItem {
  value: TerminalPermissionEnum;
  name: string;
  label: string;
  checked: boolean;
  disabled: boolean;
}
type validateType = 'user_id';
const props = withDefaults(defineProps<Props>(), {});
const { userData } = toRefs(props);
const emit = defineEmits(['close', 'done']);
const { schema } = usePermissionSchema();
const { handleSubmit, errors, setFieldError } = useForm({
  validationSchema: schema,
});
const { $notify } = useNuxtApp();
const t = useI18n();
const store = useTerminalStore();
const { assignAccess, editAccess } = useTerminalMutation();
const { mutate, loading, onDone } = assignAccess((input, message /* params */) =>
  setFieldError(
    input as validateType,
    t('_validation.' + message, { _field_: t(`_validation.name.${input}`) })
  )
);
const { mutate: editMutate, loading: editLoading, onDone: onDoneEdit } = editAccess();
const disableSubmit = ref(true);
const isLoading = computed(() => loading.value || editLoading.value);
const items = ref<PermissionItem[]>([
  {
    value: TerminalPermissionEnum.Session,
    name: 'session',
    label: t('_permission.session'),
    checked: false,
    disabled: true,
  },
  {
    value: TerminalPermissionEnum.Refund,
    name: 'refund',
    label: t('_permission.refund'),
    checked: false,
    disabled: true,
  },
  {
    value: TerminalPermissionEnum.Reconcile,
    name: 'reconcile',
    label: t('_permission.reconcile'),
    checked: false,
    disabled: true,
  },
  {
    value: TerminalPermissionEnum.InstantPayout,
    name: 'instant_payout',
    label: t('_permission.instant_payout'),
    checked: false,
    disabled: true,
  },
  {
    value: TerminalPermissionEnum.Payout,
    name: 'payout',
    label: t('_permission.payout'),
    checked: false,
    disabled: true,
  },
  {
    value: TerminalPermissionEnum.WagePayout,
    name: 'wage_payout',
    label: t('_permission.wage_payout'),
    checked: false,
    disabled: true,
  },
  {
    value: TerminalPermissionEnum.Invoice,
    name: 'invoice',
    label: t('_permission.invoice'),
    checked: false,
    disabled: true,
  },
  {
    value: TerminalPermissionEnum.Product,
    name: 'product',
    label: t('_permission.product'),
    checked: false,
    disabled: true,
  },
  {
    value: TerminalPermissionEnum.Coupon,
    name: 'coupon',
    label: t('_permission.coupon'),
    checked: false,
    disabled: true,
  },
  {
    value: TerminalPermissionEnum.NoteEdit,
    name: 'note',
    label: t('_permission.note_edit'),
    checked: false,
    disabled: true,
  },
]);
(function () {
  const permissionList = userData.value.access_list;
  const isEdit = !!userData.value.id;
  items.value.forEach((item: PermissionItem) => {
    item.checked =
      _includes(permissionList, item.value) ||
      (!isEdit && item.value === TerminalPermissionEnum.Session);
    item.disabled =
      !usePermissionValidate(item.value).hasPermission.value ||
      item.value === TerminalPermissionEnum.Session;
  });
})();
const { activeTerminal: terminalSelected } = useTerminalQuery();
const activeTerminal = computed(() => terminalSelected.value);
const zpId = ref();
const updateActions = (e: string) => {
  if (!e) {
    disableSubmit.value = true;
  } else {
    disableSubmit.value = false;
  }
};
const updateToggle = () => {
  if (!userData.value.zp) {
    return;
  }
  disableSubmit.value = false;
};
const onSubmit = handleSubmit(values => {
  const accessList: TerminalPermissionEnum[] = items.value
    .filter(
      (item: PermissionItem) =>
        item.checked && _includes(activeTerminal.value?.permissions, item.value)
    )
    .map((item: PermissionItem) => item.value);
  if (userData.value.id) {
    editMutate({
      terminal_id: store.currentTerminal,
      access_list: accessList,
      id: userData.value.id,
    });
  } else {
    mutate({
      terminal_id: store.currentTerminal,
      access_list: accessList,
      user_id: values.user_id,
    });
  }
});
onDone(() => {
  $notify({
    isRead: false,
    message: t('common.success'),
    type: 'success',
  });
  emit('done');
  disableSubmit.value = true;
});
onDoneEdit(() => {
  $notify({
    isRead: false,
    message: t('common.success'),
    type: 'success',
  });
  emit('done');
});
</script>
