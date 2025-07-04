<template>
  <ui-PageHeading
    sticky
    has-back
    :title="data?.title"
    :status="data?.status && statusHandler(data.status as TicketStatusEnum)"
    :description="
      $t('_common.pageHeading.ticket_details_description_id', {
        id: data?.id,
      })
    "
    :loading="loading || feedbackLoading || closeTicketLoading"
    size="2xl"
    @back-roll="backrollHandler"
  >
    <template #action>
      <ui-Button
        v-if="data?.status !== TicketStatusEnum.Closed"
        :loading="loading || feedbackLoading || closeTicketLoading"
        type="tertiary"
        :text="$t('_common.buttons.close_ticket')"
        @click.stop="data?.feedback_value ? closeTicket() : toggleModal()"
      />
    </template>
  </ui-PageHeading>
  <!-- rate modal -->
  <ui-Modal
    v-if="rateToggle"
    close-icon
    :text="$t('_common.modal.feedback')"
    class="w-full lib-view max-w-[400px] h-[250px]"
    @close="toggleModal"
  >
    <template #body>
      <div dir="ltr">
        <div v-if="avatars" class="h-4xl relative mb-xl">
          <div v-for="(avatar, index) in avatars" :key="index" class="">
            <div
              class="absolute translate-x-full md:translate-x-[130%]"
              :style="{
                'z-index': index,
                left: index * 56 + 'px',
              }"
            >
              <ui-Avatar :src="avatar" size="lg" class="border-2 border-surface rounded-circle" />
            </div>
          </div>
        </div>
        <ui-Rate :text="$t('_common.rate.ticketText')" @selected="rateActionHandler" />
      </div>
    </template>
  </ui-Modal>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { TicketReplyType, TicketStatusEnum } from '@/graphql/graphql';
import { useTicketStatus } from '@/composables/ticket/useTicketStatus';
import { useCloseTicketMutation } from '@/composables/ticket/useCloseTicketMutation';
import { useFeedbackMutation } from '@/composables/ticket/useFeedbackMutation';

const ticketStore = useTicketStore();
const { detailsData: data, detailsLoading: loading } = storeToRefs(ticketStore);
const { $notify } = useNuxtApp();
const { statusHandler } = useTicketStatus();
const t = useI18n();
const route = useRoute();
const rateToggle = ref(false);
const avatars = computed(() => {
  if (data.value && _isArray(data.value.ticketReplies)) {
    if (data.value.replies) {
      const avatars = data.value.ticketReplies.map((i: TicketReplyType) => i?.user?.avatar);
      const unique = [...new Set(avatars)];

      return unique;
    }
  }
});
const { mutate, loading: closeTicketLoading } = useCloseTicketMutation();
const { mutate: feedbackMutate, loading: feedbackLoading } = useFeedbackMutation();
const router = useRouter();
const backrollHandler = () => {
  router.push('/panel/ticket');
};
const toggleModal = () => {
  rateToggle.value = !rateToggle.value;
};
const closeTicket = () => {
  mutate(route.params.id as string, () => {
    backrollHandler();
  });
};
const rateActionHandler = (value: number) => {
  rateToggle.value = false;
  feedbackMutate(value, route.params.id as string, () => {
    $notify({
      isRead: false,
      message: t('common.success'),
      type: 'success',
    });
    closeTicket();
  });
};
</script>
