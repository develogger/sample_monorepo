<template>
  <div>
    <ui-Modal
      close-icon
      :text="$t('_common.buttons.priority')"
      width="480px"
      @close="$emit('close')"
    >
      <template #body>
        <div class="root">
          <div class="root__head" style="grid-template-columns: 12.6% 87.4%">
            <div class="root__head__item">
              <div><div></div></div>
            </div>
            <div class="root__head__item">
              <div>
                <div>{{ t('_common.table.pspTitle') }}</div>
              </div>
            </div>
          </div>
          <ui-Draggable :list="tableData" @end="endDragHandler">
            <template #default="{ element }">
              <div class="root__row--default" style="grid-template-columns: 12.6% 87.4%">
                <div class="cursor-pointer root__row__rows justify-center">
                  <ui-Icon name="DragHandle" />
                </div>
                <div class="cursor-pointer root__row__rows">
                  <div class="flex gap-sm items-center">
                    <div
                      class="h-[40px] w-[40px] max-h-[40px] flex justify-center items-center border border-border-soft rounded-md relative overflow-hidden bg-surface-soft"
                    >
                      <ui-PspLogo :name="element.pspLogo" />
                    </div>
                    <div class="flex flex-col gap-2xs">
                      <span>{{ element.title }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </ui-Draggable>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-xs w-full">
          <ui-Button
            :text="$t('_common.buttons.cancel')"
            :disabled="loading"
            type="secondary"
            @click="$emit('close')"
          />
          <ui-Button
            :text="$t('_common.buttons.save')"
            :disabled="loading || disableSubmit"
            :loading="loading"
            type="primary"
            @click="onSubmit"
          />
        </div>
      </template>
    </ui-Modal>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close', 'done']);
const { schema } = usePermissionSchema();
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const { $notify } = useNuxtApp();
const t = useI18n();
const { activeTerminal, refetch } = useTerminalQuery();
const { terminalEdit } = useTerminalMutation();
const { snakeToCamel } = useSnakeToCamel();
const { setFieldError } = useForm({
  validationSchema: null,
});
type validateType = '';
const {
  mutate: editMutate,
  onDone,
  loading,
} = terminalEdit((input, message, params) =>
  setFieldError(snakeToCamel(input) as validateType, t('_validation.' + message, params))
);
const disableSubmit = ref(true);
const pspPriority = ref<string[]>([]);
const onSubmit = handleSubmit(() => {
  editMutate({
    id: activeTerminal.value?.id,
    psp_priority: pspPriority.value,
    bank_account_id: activeTerminal.value?.preferred_bank_account_id,
  });
  onDone(async () => {
    disableSubmit.value = true;
    await refetch();
    $notify({
      isRead: false,
      message: t('common.success'),
      type: 'success',
    });
    emit('done');
  });
});
interface ZarinGateType {
  title: string;
  pspLogo: string;
  psp: string;
}
const tableData = computed(() => {
  if (!activeTerminal.value) {
    return [];
  }
  const pspPriority = activeTerminal.value?.psp_priority?.map(i => ({
    title: i?.payment ? i.payment.name : t('terminal.psp.' + i?.psp),
    pspLogo: i?.psp,
    psp: i?.psp,
  }));
  if (!pspPriority?.length) {
    return [];
  }

  return pspPriority;
});
const endDragHandler = (items: ZarinGateType[]) => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].title !== tableData.value?.[i].title) {
      disableSubmit.value = false;
    }
  }

  pspPriority.value = items.map(item => item.psp);
};
</script>

<style lang="scss" scoped>
.root {
  @apply rounded-md border border-border-divider;
  &__head {
    @apply grid;
    &__item {
      @apply px-md text-body-400-b2 font-medium py-md flex text-text border-none justify-start;
    }
  }
  &__row {
    &--default {
      @apply text-body-400-b2 font-normal border-none grid;
      @apply hover:bg-surface-hover;
      @apply active:bg-surface-pressed;
      @apply focus-visible:bg-surface-focus;
    }
    &--loading {
      @apply text-body-400-b2 font-normal text-text border-none grid;
    }
    &__rows {
      @apply grid border-t border-t-border-divider px-md py-md items-center;
    }
  }
}
</style>
