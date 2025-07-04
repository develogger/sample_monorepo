<template>
  <div class="w-full">
    <ui-Table :loading="loading" :columns="columns" :items="data" @hover-row="eventHandler">
      <!-- product template -->
      <template #item-name="{ name, logo, have_logo }">
        <div class="flex gap-sm items-center">
          <SharedTerminalLogo :logo="have_logo ? logo : undefined" />
          <div class="flex flex-col gap-sm w-[116px]">
            <span class="truncate"> {{ name }}</span>
          </div>
        </div>
      </template>
      <!-- status template -->
      <template #item-status="{ status }">
        <div class="h-fit flex gap-2xs">
          <ui-Status :text="statusHandler(status).text" :type="statusHandler(status).type" />
        </div>
      </template>
      <!-- action template -->
      <template #item-action="{ id, flag, permissions }">
        <div class="flex justify-end">
          <ui-Action
            :id="id"
            v-model:eventType="eventType"
            :selected-id="idValue"
            :limit="2"
            :items="
              actionHandle(id, flag, _includes(permissions, TerminalPermissionEnum.TerminalEdit))
            "
            dir="rtl"
            @id-value="idValueHandler"
          />
        </div>
      </template>
      <!-- loading template -->
      <template #loadingSkeleton>
        <div v-for="index in pageSize" :key="index" class="loading">
          <div
            class="grid border-t border-t-border-divider"
            style="
              grid-template-columns:
                minmax(180px, 1fr)
                minmax(150px, 1fr)
                160px
                64px;
            "
          >
            <div class="flex gap-sm items-center p-md">
              <ui-Skeleton :width="40" :height="40" radius="md" />
              <ui-Skeleton :width="60" :height="12" class="" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="60" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="60" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto flex justify-end">
              <ui-Skeleton :width="24" :height="12" class="px-md py-md" />
            </div>
          </div>
        </div>
      </template>
    </ui-Table>
  </div>
</template>

<script setup lang="ts">
import { useTerminalAction } from '@/composables/terminal/useTerminalAction';
import { useTerminalColumns } from '@/composables/terminal/useTerminalClumns';
import { useTerminalStatus } from '@/composables/terminal/useTerminalStatus';
import { TerminalPermissionEnum, TerminalType } from '@/graphql/graphql';

const { columns } = useTerminalColumns();
const { statusHandler } = useTerminalStatus();
const { data, loading } = useTerminalQuery();
const config = useRuntimeConfig();
const route = useRoute();
const { actionHandle } = useTerminalAction();
const idValue = ref();
const eventType = ref();
const idValueHandler = (value: string) => {
  idValue.value = value;
};
const eventHandler = (event: MouseEvent, item: TerminalType) => {
  eventType.value = { event: event.type, uniqueId: item.id };
};
const pageSize = computed(() => Number(route.query.pageSize) || config.public.pageSize);
</script>
