<template>
  <div>
    <ui-PageHeading
      :title="data?.title"
      :status="status"
      :description="description"
      :loading="loading"
      has-back
      @back-roll="$router.back()"
    >
      <template #action>
        <div class="w-fit flex gap-xs">
          <ui-Button
            :text="md ? '' : $t('_common.buttons.edit')"
            :after-icon="md ? '' : 'PenEdit'"
            :icon="md ? 'PenEdit' : ''"
            type="tertiary"
            :loading="loading"
            :disabled="activeTerminal?.status !== TerminalStatusEnum.Active"
            @click="editHandler"
          />
          <ui-Button
            :text="md ? '' : buttonStatus.title"
            :after-icon="md ? '' : buttonStatus.icon"
            :icon="md ? buttonStatus.icon : ''"
            type="secondary"
            :loading="loading || removeLoading || restoreLoading"
            :disabled="buttonStatus.disabled"
            @click="statusManagementHandler"
          />
        </div>
      </template>
    </ui-PageHeading>
    <ui-Skeleton :loading="loading" full-width :height="58" class="my-2xl sm:my-md">
      <ui-InlineMessage
        v-if="data?.limit !== null && data?.limit === 0"
        type="warning"
        :title="$t('_zarin_link.detail.out_of_stock')"
        :description="$t('_zarin_link.detail.out_of_stock_description')"
      />
    </ui-Skeleton>
  </div>
</template>

<script setup lang="ts">
import { NewZarinLinkType, TerminalStatusEnum } from '@/graphql/graphql';

// api
const { removeProduct, restoreProduct } = useProductMutation();
const { mutate: removeMutate, loading: removeLoading, onDone: onRemoveDone } = removeProduct();
const { mutate: restoreMutate, loading: restoreLoading, onDone: onRestoreDone } = restoreProduct();
// composable
const { statusHandler } = useTerminalStatus();
const { toJalali } = useDate();
const router = useRouter();
const route = useRoute();
const domain = useTerminalStore().currentDomain;
const { activeTerminal } = useTerminalQuery();
const t = useI18n();
const { md } = useSize();
// injects
const loading = inject('loading');
const data = inject<Ref<NewZarinLinkType> | undefined>('data');
const refetch = inject<() => void | undefined>('refetch');
// computed
const status = computed(() =>
  statusHandler(data?.value?.deleted_at ? TerminalStatusEnum.Inactive : TerminalStatusEnum.Active)
);
const buttonStatus = computed(() => ({
  icon: data?.value?.deleted_at ? 'EyeShow' : 'EyeHidden',
  title: data?.value?.deleted_at ? t('_common.buttons.active') : t('_common.buttons.inactive'),
  disabled:
    activeTerminal.value?.status !== TerminalStatusEnum.Active ||
    removeLoading.value ||
    restoreLoading.value,
}));
const description = computed(() => {
  if (!data?.value) {
    return '';
  }

  return `شناسه لینک پرداخت ${data.value?.id} • آخرین ویرایش ${toJalali(
    data.value?.updated_at as string
  )}`;
});
// utils
const editHandler = () => {
  router.push(
    `/panel/${domain}/zarin-link/${(data?.value?.type + '').toLowerCase()}/${route.params.id}`
  );
};
const statusManagementHandler = () => {
  if (!data?.value) {
    return;
  }

  if (data?.value?.deleted_at) {
    restoreMutate({ id: data.value && data.value.id });
    onRestoreDone(async () => {
      refetch && (await refetch());
    });
  } else {
    removeMutate({ id: data.value && data.value.id });
    onRemoveDone(async () => {
      refetch && (await refetch());
    });
  }
};
onRemoveDone(() => {
  refetch && refetch();
});
</script>
