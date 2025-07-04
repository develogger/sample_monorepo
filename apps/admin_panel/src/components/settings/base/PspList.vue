<template>
  <div>
    <SettingsBasePrioritize
      v-if="showPrioritize"
      @close="closePrioritize"
      @done="onDonePrioritize"
    />
    <div class="flex justify-between items-center">
      <ui-Button
        v-if="showPriority"
        :text="$t('_common.buttons.priority')"
        variant="outlined"
        type="tertiary"
        class="!mt-0"
        @click="showPrioritize = true"
      />
      <span class="text-heading-600-h2 text-text ml-auto">{{ $t('terminal.pspName') }}</span>
    </div>
    <ui-EmptyState
      v-if="!loading && !data?.length"
      :title="$t('_common.empty.titleNoResult')"
      vector="NoResult"
    />
    <ui-Table v-else :columns="columns" :items="data" :loading="loading">
      <!-- psp template -->
      <template #item-psp="{ title, pspLogo }">
        <div class="flex gap-sm items-center">
          <div
            v-if="pspLogo"
            class="h-[40px] w-[40px] max-h-[40px] flex justify-center items-center border border-border-soft rounded-md relative overflow-hidden bg-surface-soft"
          >
            <ui-PspLogo :name="pspLogo" />
          </div>
          <div class="flex flex-col gap-2xs">
            <span>{{ title }}</span>
          </div>
        </div>
      </template>
      <!-- status template -->
      <template #item-status="{ status }">
        <div v-if="status" class="h-fit">
          <ui-Status :text="statusHandler(status).text" :type="statusHandler(status).type" />
        </div>
      </template>
      <!-- loading template -->
      <template #loadingSkeleton>
        <div v-for="index in 10" :key="index" class="loading">
          <div
            class="grid border-t border-t-border-divider"
            style="
              grid-template-columns:
                40%
                20%
                25%
                15%;
            "
          >
            <div class="flex items-center px-md py-md gap-xs">
              <ui-Skeleton :width="32" :height="32" radius="sm" />
              <ui-Skeleton :width="60" :height="12" class="" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="60" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="60" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="60" :height="12" class="px-md py-md" />
            </div>
          </div>
        </div>
      </template>
    </ui-Table>
  </div>
</template>
<script lang="ts" setup>
import { usePspColumns } from '@/composables/setting/usePspColumns';
import { useTerminalPayoutStatus } from '@/composables/terminal/useTerminalPayoutStatus';
import { useTerminalQuery } from '@/composables/terminal/useTerminalQuery';
import { useUserIdQuery } from '@/composables/user/useUserIdQuery';

const t = useI18n();
const { columns } = usePspColumns();
const { activeTerminal, loading } = useTerminalQuery();
const { statusHandler } = useTerminalPayoutStatus();
const { data: userId } = useUserIdQuery();
const showPrioritize = ref(false);
const data = computed(() => {
  if (!activeTerminal.value) {
    return [];
  }

  return activeTerminal.value?.zarin_gate?.map(i => ({
    title: i?.payment ? i.payment.name : t('terminal.psp.' + i?.psp),
    pspLogo: i?.psp,
    terminal_id: i?.terminal_id,
    merchant_id: i?.merchant_id,
    status: i?.status,
  }));
});
const showPriority = computed(() => {
  if (
    (userId.value?.vip_level === 'LEVEL_1' ||
      userId.value?.vip_level === 'LEVEL_2' ||
      userId.value?.vip_level === 'LEVEL_3') &&
    activeTerminal.value?.status &&
    activeTerminal.value?.psp_priority?.length
  ) {
    return true;
  }

  return false;
});
const closePrioritize = () => {
  showPrioritize.value = false;
};
const onDonePrioritize = () => {
  closePrioritize();
};
</script>
<style lang="scss" scoped>
div.root {
  @apply mt-xl;
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
