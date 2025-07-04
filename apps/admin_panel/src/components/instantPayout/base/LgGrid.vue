<template>
  <div>
    <InstantPayoutBaseEmptyGrid v-if="!loading && data && data?.length === 0" />
    <ui-Table
      v-else-if="data || loading"
      :columns="columns"
      :items="data"
      :loading="loading"
      @click-row="clicked"
      @hover-row="eventHandler"
    >
      <!-- amount template -->
      <template #column-amount="header">
        <ui-Skeleton :loading="loading" :width="64" class="mt-2xs">
          <div class="h-fit flex -mt-2xs">
            <span class="truncate">{{ header.label }}</span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs" />
          </div>
        </ui-Skeleton>
      </template>
      <!-- status template -->
      <template #item-status="{ status }">
        <ui-Skeleton :loading="loading" :width="104" class="mt-2xs">
          <div class="h-fit">
            <ui-Status :text="statusHandler(status).text" :type="statusHandler(status).type" />
          </div>
        </ui-Skeleton>
      </template>
      <template #item-created_at="{ created_at }">
        <div>
          {{ created_at ? toJalali(created_at) : '_' }}
        </div>
      </template>
      <!-- action template -->
      <template #item-action="{ url_code, id }">
        <div class="flex justify-end">
          <ui-Action
            :id="id as string"
            v-model:eventType="eventType"
            :selected-id="idValue"
            :limit="1"
            :items="actionHandle(url_code as string)"
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
                minmax(170px, 1fr)
                minmax(120px, 1fr)
                minmax(300px, 2fr)
                minmax(170px, 1fr)
                1fr;
            "
          >
            <div class="flex items-center">
              <ui-Skeleton :width="104" :height="12" class="px-sm py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="104" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="250" :height="12" class="px-md py-md" />
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
    <InstantPayoutBaseNoResult v-if="!loading && !data" />
    <InstantPayoutBaseReceipt v-if="toggleInQuiry" :data="inquiry" @close="toggleInQuiry = false" />
  </div>
</template>

<script setup lang="ts">
import { useInstantPayoutColumns } from '../../../composables/instant-payout/useInstantPayoutColumns';
import { InstantPayoutType } from '@/graphql/graphql';

const data = inject<InstantPayoutType[]>('instantPayout');
const loading = inject<boolean>('instantPayoutLoading');
const inquiry = ref<InstantPayoutType>();
const toggleInQuiry = ref(false);
const { toJalali } = useDate();
const { columns } = useInstantPayoutColumns();
const { statusHandler } = useInstantFilter();
const { actionHandle } = useInstantPayoutAction();
const config = useRuntimeConfig();
const route = useRoute();
const idValue = ref();
const clicked = (item: InstantPayoutType) => {
  inquiry.value = item;
  toggleInQuiry.value = true;
};
const eventType = ref();
const eventHandler = (event: MouseEvent, item: InstantPayoutType) => {
  eventType.value = { event: event.type, uniqueId: item.id };
};
const idValueHandler = (value: string) => {
  idValue.value = value;
};
const pageSize = computed(() => Number(route.query.pageSize) || config.public.pageSize);
</script>
