<template>
  <ui-Card>
    <template #main>
      <div class="replies">
        <!-- loading -->
        <div v-if="loading || feedbackLoading || !replies?.length">
          <TicketDetailsLoading v-for="i in 2" :key="i" :loading="loading || feedbackLoading" />
        </div>
        <!-- success -->
        <div v-else-if="replies && !!replies.length && !loading">
          <div>
            <TicketDetailsContentLoop />
            <div class="flex flex-col justify-center items-center gap-xs">
              <ui-Divider
                v-if="route.query.more !== 'full' && replies.length > 3"
                type="vertical"
                :height="24"
                class="mx-sm w-[1px]"
                border-style="dashed"
              />
              <ui-Button
                v-if="route.query.more !== 'full' && replies.length > 3"
                :text="$t('_common.buttons.load_more', { count: replies.length - 3 })"
                variant="outlined"
                @click="routeQueryHandler"
              />
              <ui-Divider
                v-if="route.query.more !== 'full' && replies.length > 3"
                type="vertical"
                :height="24"
                class="mx-sm w-[1px] mb-xl"
                border-style="dashed"
              />
            </div>
            <TicketDetailsContentLoop
              v-if="route.query.more !== 'full' && replies.length > 3"
              :drop="true"
            />
          </div>
        </div>
      </div>
      <!-- show rate if auto closed ticket -->
      <div v-if="rateToggle && data && !data.rate && (!loading || !feedbackLoading)">
        <div class="text-body-400-b3 text-text-soft font-medium text-center mx-auto">
          {{ $t('_common.rate.ticketText') }}
        </div>
        <div class="mb-xl mx-auto md:w-[20rem]">
          <ui-Rate class="text-center" @selected="rateActionHandler" />
        </div>
      </div>
    </template>
  </ui-Card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { TicketStatusEnum } from '@/graphql/graphql';
import { useTicketDetailsQuery } from '@/composables/ticket/useTicketDetailsQuery';
import { useFeedbackMutation } from '@/composables/ticket/useFeedbackMutation';

const { $notify } = useNuxtApp();
const t = useI18n();
const route = useRoute();
const router = useRouter();
const { substract } = useDate();
const ticketStore = useTicketStore();
const { detailsData: data, detailsLoading: loading } = storeToRefs(ticketStore);
const { fetchData } = useTicketDetailsQuery();
const { mutate, loading: feedbackLoading } = useFeedbackMutation();
const updateTime = computed(() => substract(data.value?.updated_at, 10, 'days'));
// show rate for closed status
const rateToggle = computed(() => {
  if (
    data.value &&
    data.value.status === TicketStatusEnum.Closed &&
    updateTime.value &&
    !data.value.feedback_value
  ) {
    return true;
  }
});
const replies = computed(() => {
  if (data.value && _isArray(data.value.ticketReplies)) {
    return data.value.ticketReplies;
  }
});
/**
 * This function handles the rate action.
 *
 * @param {number} value - The rate value to be set.
 */
const rateActionHandler = (value: number) => {
  mutate(value, route.params.id as string, () => {
    $notify({
      isRead: false,
      message: t('common.success'),
      type: 'success',
    });
    fetchData();
  });
};
/**
 * Handle the route query by updating the query parameters and navigating to the new route.
 */
const routeQueryHandler = () => {
  router.push({
    query: {
      ...route.query,
      more: 'full',
    },
  });
};
</script>

<style lang="scss" scoped>
.replies {
  &__root--default {
    @apply w-full border border-border-divider rounded-l-md rounded-br-md rounded-tr-sm p-lg;
  }
  &__root--second-user {
    @apply w-full bg-surface-soft rounded-l-md rounded-br-md rounded-tr-sm p-lg;
  }
  &__date-section {
    @apply text-body-400-b3 text-text-soft text-center mb-xl break-all;
  }
  &__content {
    @apply mb-md text-body-400-b2 text-text break-all;
  }
  &__footer {
    @apply text-text-soft text-caption-400-c1 text-left;
  }
}
</style>
