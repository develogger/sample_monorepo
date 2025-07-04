<template>
  <div>
    <UserBaseTerminalMdGridLoading v-if="loading" />
    <UserBaseTerminalEmptyGrid v-if="!loading && data && data?.length === 0" />
    <div v-else-if="data && !loading">
      <ui-TableCard v-for="i in data" :key="i?.id" class="root" @hover-row="eventHandler">
        <template #header>
          <div class="root__header">
            <!-- product column -->
            <div class="root__header--id">
              <ui-Skeleton :loading="loading" :width="104" class="mt-2xs truncate">
                <div class="flex gap-sm items-center">
                  <SharedTerminalLogo :logo="i?.have_logo ? i?.logo : undefined" />
                  <div class="truncate">{{ i.name }}</div>
                </div>
              </ui-Skeleton>
            </div>
            <!-- status column -->
            <div class="root__header--status">
              <ui-Status
                :text="statusHandler(i?.status).text"
                :type="statusHandler(i?.status).type"
              />
            </div>
          </div>
        </template>

        <template #main>
          <!-- domain colum -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[1].label }}
            </div>
            <div class="root__main--title__title truncate">
              {{ i?.domain }}
            </div>
          </div>
          <ui-Divider />
        </template>
        <template #footer>
          <div class="flex justify-end">
            <ui-Action
              :id="i?.id"
              v-model:eventType="eventType"
              :selected-id="idValue"
              :limit="2"
              :items="
                actionHandle(
                  i?.id,
                  i?.flag!,
                  _includes(i?.permissions, TerminalPermissionEnum.TerminalEdit)
                )
              "
              dir="rtl"
              @id-value="idValueHandler"
            />
          </div>
        </template>
      </ui-TableCard>
    </div>
    <CouponBaseNoResult v-if="!loading && !data" />
  </div>
</template>

<script setup lang="ts">
import { useTerminalAction } from '@/composables/terminal/useTerminalAction';
import { useTerminalColumns } from '@/composables/terminal/useTerminalClumns';
import { useTerminalStatus } from '@/composables/terminal/useTerminalStatus';
import { useUserIdQuery } from '@/composables/user/useUserIdQuery';
import { TerminalPermissionEnum, TerminalType } from '@/graphql/graphql';

const { columns } = useTerminalColumns();
const { statusHandler } = useTerminalStatus();
const { loading: userLoading } = useUserIdQuery();
const { actionHandle } = useTerminalAction();
const { data, loading: terminalLoading } = useTerminalQuery();
const loading = computed(() => userLoading.value || terminalLoading.value);
const idValue = ref();
const eventType = ref();
const idValueHandler = (value: string) => {
  idValue.value = value;
};
const eventHandler = (event: MouseEvent, item: TerminalType) => {
  eventType.value = { event: event.type, uniqueId: item.id };
};
</script>

<style lang="scss" scoped>
.root {
  @apply mt-md;
  &__header {
    @apply flex justify-between flex-wrap items-center gap-2xl;
    &--id {
      @apply flex items-center grow basis-0 truncate;
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
