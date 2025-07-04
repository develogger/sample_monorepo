<template>
  <div>
    <InstantPayoutBaseMdGridLoading v-if="loading" />
    <InstantPayoutBaseEmptyGrid v-if="!loading && data && data?.length === 0" />
    <div v-else-if="data && !loading">
      <ui-TableCard v-for="i in data" :key="i?.id" class="root">
        <template #header>
          <div class="root__header">
            <!-- amount column -->
            <div class="root__header--id">
              <span class="root__header--id__text">{{ i?.amount.toLocaleString() }}</span>
              <ui-Label :text="$t('_common.currency.rial')" type="neutral" />
            </div>
            <!-- status column -->
            <div class="root__header--status flex items-center">
              <ui-Status
                :text="statusHandler(i?.status as unknown as InstantPayoutStatusEnum).text"
                :type="statusHandler(i?.status as unknown as InstantPayoutStatusEnum).type"
              />
            </div>
          </div>
        </template>
        <template #main>
          <!-- id column -->
          <div class="root__main--title">
            <div class="root__main--title__label">
              {{ columns[1].label }}
            </div>
            <div class="root__main--title__title">
              {{ i?.id }}
            </div>
          </div>
          <ui-Divider />
          <!-- reconcile id colum -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[2].label }}
            </div>
            <div class="root__main--title__title">
              {{ i?.reference_id }}
            </div>
          </div>
          <ui-Divider />
          <!-- date column -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[3].label }}
            </div>
            <div class="root__main--title__title">
              {{ i?.created_at ? toJalali(i.created_at) : '_' }}
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex justify-between">
            <div>
              <ui-Button
                variant="text"
                :text="$t('_common.buttons.details_preview')"
                after-icon="AngleLeft"
                @click="clicked(i)"
              />
            </div>
            <div class="mt-sm">
              <ui-Action
                v-model:eventType="eventType"
                :limit="1"
                :items="actionHandle(i.url_code)"
                dir="rtl"
              />
            </div>
          </div>
        </template>
      </ui-TableCard>
    </div>
    <InstantPayoutBaseNoResult v-if="!loading && !data" />
    <InstantPayoutBaseReceipt
      v-if="toggleInQuiry"
      :data="filteredData"
      @close="toggleInQuiry = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useInstantPayoutColumns } from '@/composables/instant-payout/useInstantPayoutColumns';
import { InstantPayoutType, InstantPayoutStatusEnum } from '@/graphql/graphql';

const data = inject<InstantPayoutType[]>('instantPayout');
const loading = inject<boolean>('instantPayoutLoading');
const inquiry = ref<InstantPayoutType[]>();
const filteredData = ref<InstantPayoutType>();
const toggleInQuiry = ref(false);
const { columns } = useInstantPayoutColumns();
const { statusHandler } = useInstantFilter();
const { actionHandle } = useInstantPayoutAction();
const { toJalali } = useDate();
const eventType = ref<string>();
onMounted(async () => {
  try {
    inquiry.value = await data;
  } catch {
    inquiry.value = [];
  }
});

const clicked = (item: InstantPayoutType) => {
  filteredData.value = item;
  toggleInQuiry.value = true;
};
</script>

<style lang="scss" scoped>
.root {
  @apply mt-md;
  &__header {
    @apply flex justify-between flex-wrap;
    &--id {
      @apply flex items-center;
      &__text {
        @apply text-text pl-xs  text-body-400-b1 font-medium;
      }
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
