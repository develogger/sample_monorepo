<template>
  <div>
    <ui-TableCard v-for="i in data" :key="i?.id" class="root">
      <template #header>
        <div class="root__header">
          <!-- id column -->
          <div class="root__header--id">
            <ui-Avatar v-if="!i?.seen" type="Letter" shape="square" class-icon="!text-primary" />
            <ui-Avatar v-else type="LetterOpen" shape="square" />
            <span class="root__header--id__text">{{ i?.id }}</span>
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
        <!-- title column -->
        <div class="root__main--title">
          <div class="root__main--title__label">
            {{ columns[1].label }}
          </div>
          <div class="root__main--title__title">
            {{ i?.title }}
          </div>
        </div>
        <ui-Divider />
        <!-- date colum -->
        <div class="root__main--title mt-sm">
          <div class="root__main--title__label">
            {{ columns[2].label }}
          </div>
          <div class="root__main--title__title">
            {{ i?.updated }}
          </div>
        </div>
      </template>
      <template #footer>
        <!-- action column -->
        <div class="root__footer">
          <div class="root__footer__detail">
            <NuxtLink class="flex items-center" :to="`/panel/ticket/${i?.id}`" no-prefetch>
              <span>{{ $t('_common.table.detail') }}</span>
              <ui-Icon name="AngleLeft" />
            </NuxtLink>
          </div>
          <div class="root__footer__button">
            <ui-Button
              v-if="i?.action"
              icon="RatingEdit"
              type="tertiary"
              class="w-2xl h-2xl z-20"
              @click.stop="rateModalToggle"
            />
          </div>
        </div>
      </template>
    </ui-TableCard>
    <ui-Modal
      v-if="rateToggle"
      header
      close-icon
      class="w-full lib-view lg:max-w-[400px] !lg:max-h-[400px]"
      :text="$t('_common.modal.feedback')"
      @close="rateModalToggle"
    >
      <template #body>
        <div>
          <ui-Rate :text="$t('_common.rate.ticketText')" />
        </div>
      </template>
    </ui-Modal>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTicketColumns } from '@/composables/ticket/useTicketColumns';
import { useTicketStatus } from '@/composables/ticket/useTicketStatus';

const { columns } = useTicketColumns();
const rateToggle = ref(false);
const ticketStore = useTicketStore();
const { data } = storeToRefs(ticketStore);
const { statusHandler } = useTicketStatus();
/**
 * open rate modal
 * @param rateToggle boolean
 */
const rateModalToggle = () => {
  rateToggle.value = !rateToggle.value;
};

// todo: separate rate modal for usable
</script>

<style lang="scss" scoped>
.root {
  @apply mt-md;
  &__header {
    @apply flex justify-between flex-wrap;
    &--id {
      @apply flex items-center gap-sm;
      &__text {
        @apply text-body-400-b2 text-text pl-sm;
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
