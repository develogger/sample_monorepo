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
        @click="showPrioritize = true"
      />
      <span class="text-heading-600-h2 mb-md mt-sm text-text ml-auto">
        {{ $t('terminal.pspName') }}
      </span>
    </div>
    <div v-if="data && !loading">
      <ui-TableCard v-for="i in data" :id="i.terminal_id" :key="i.terminal_id" class="root">
        <template #header>
          <div class="flex justify-between items-center">
            <div class="flex gap-sm items-center">
              <div
                v-if="i?.pspLogo"
                class="h-[40px] w-[40px] max-h-[40px] flex justify-center items-center border border-border-soft rounded-md relative overflow-hidden bg-surface-soft"
              >
                <ui-PspLogo :name="i?.pspLogo" />
              </div>
              <div class="flex flex-col gap-2xs">
                <span>{{ i?.title }}</span>
              </div>
            </div>
            <div v-if="i?.status" class="h-fit">
              <ui-Status
                :text="statusHandler(i.status).text"
                :type="statusHandler(i.status).type"
              />
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
              <ui-Skeleton :loading="loading" :width="40" class="truncate">
                <div class="h-fit">
                  {{ i.terminal_id }}
                </div>
              </ui-Skeleton>
            </div>
          </div>
          <ui-Divider />
          <div class="root__main--title mt-sm items-center">
            <div class="root__main--title__label">
              {{ columns[2].label }}
            </div>
            <div class="root__main--title__title">
              <ui-Skeleton :loading="loading" :width="40" class="truncate">
                <div class="h-fit">
                  {{ i.merchant_id }}
                </div>
              </ui-Skeleton>
            </div>
          </div>
        </template>
      </ui-TableCard>
    </div>
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
    activeTerminal.value?.status
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
