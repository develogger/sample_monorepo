<template>
  <div>
    <ui-Table :columns="columns" :items="data" :loading="loading" @click-row="clicked">
      <template #item-id="{ id, seen }">
        <div class="flex items-center gap-sm">
          <ui-Avatar v-if="!seen" type="Letter" shape="square" class-icon="!text-primary" />
          <ui-Avatar v-else type="LetterOpen" shape="square" />
          <span>{{ id }}</span>
        </div>
      </template>
      <!-- status template -->
      <template #item-status="{ status }">
        <div class="h-fit">
          <ui-Status :text="statusHandler(status).text" :type="statusHandler(status).type" />
        </div>
      </template>
      <!-- action template -->
      <template #item-action="{ action, id }">
        <div class="justify-self-end">
          <ui-Button
            v-if="action"
            icon="RatingEdit"
            type="tertiary"
            class="w-2xl h-2xl z-20"
            @click.stop="rateModalToggle(id)"
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
                190px minmax(100px, 420px) minmax(160px, 150px) minmax(130px, 160px)
                minmax(60px, 1fr);
            "
          >
            <div class="flex items-center">
              <ui-Skeleton :width="40" :height="40" class="px-md py-md" radius="md" />
              <ui-Skeleton :width="104" :height="12" class="px-sm py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="104" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="104" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="60" :height="12" class="px-md py-md" />
            </div>
          </div>
        </div>
      </template>
    </ui-Table>
    <ui-Modal
      v-if="rateToggle"
      header
      close-icon
      class="w-full lib-view lg:max-w-[400px] !lg:max-h-[400px] h-[230px]"
      :text="$t('_common.modal.feedback')"
      @close="rateModalToggle"
    >
      <template #body>
        <div dir="ltr">
          <ui-Rate
            class="text-center"
            :text="$t('_common.rate.ticketText')"
            @selected="rateActionHandler"
          />
        </div>
      </template>
    </ui-Modal>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFeedbackMutation } from '@/composables/ticket/useFeedbackMutation';
import { useTicketColumns } from '@/composables/ticket/useTicketColumns';
import { useTicketQuery } from '@/composables/ticket/useTicketQuery';
import { useTicketStatus } from '@/composables/ticket/useTicketStatus';

const { $notify } = useNuxtApp();
const t = useI18n();
const { columns } = useTicketColumns();
const { statusHandler } = useTicketStatus();
const ticketStore = useTicketStore();
const { fetchData } = useTicketQuery();
const { mutate } = useFeedbackMutation();
const { loading, data } = storeToRefs(ticketStore);
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const rateToggle = ref(false);
const rateSelectedId = ref<string>();
const clicked = (item: { id: string | number }) => {
  router.push(`/panel/ticket/${item.id}`);
};
const rateActionHandler = (value: number) => {
  rateSelectedId.value &&
    mutate(value, rateSelectedId.value, () => {
      $notify({
        isRead: false,
        message: t('common.success'),
        type: 'success',
      });
    });
  rateModalToggle();
  fetchData();
};
/**
 * open rate modal
 * @param rateToggle boolean
 */
const rateModalToggle = (id?: string) => {
  if (id) {
    rateToggle.value = !rateToggle.value;
    rateSelectedId.value = id;
  } else {
    rateToggle.value = !rateToggle.value;
  }
};
const pageSize = computed(() => Number(route.query.pageSize) || config.public.pageSize);
</script>
