<template>
  <div>
    <PayoutBaseMdGridLoading v-if="loading" />
    <PayoutBaseEmptyGrid v-if="!loading && data && data?.length === 0" />
    <div v-else-if="data && !loading">
      <ui-TableCard v-for="i in data" :key="i?.id" class="root">
        <template #header>
          <div class="root__header">
            <!-- iban column -->
            <div class="root__header--id">
              <ui-Skeleton :loading="loading" :width="104" class="mt-2xs">
                <div class="flex gap-sm">
                  <ui-BankLogo
                    v-if="i.bank_account?.issuing_bank"
                    :name="i.bank_account?.issuing_bank?.slug"
                    class="w-[32px] h-[32px]"
                  />
                  <div>
                    <div class="text-body-400-b2 text-text font-Mono">
                      {{ i.bank_account?.iban }}
                    </div>
                    <div class="text-caption-400-c1 text-text-soft">
                      {{ i.bank_account?.holder_name }}
                    </div>
                  </div>
                </div>
              </ui-Skeleton>
            </div>
          </div>
        </template>
        <template #main>
          <!-- status column -->
          <div class="root__main--title">
            <div class="root__main--title__label">
              {{ columns[4].label }}
            </div>
            <div class="root__main--status">
              <ui-Status
                :text="statusHandler(i?.status as unknown as PayoutStatusEnum).text"
                :type="statusHandler(i?.status as unknown as PayoutStatusEnum).type"
              />
            </div>
          </div>
          <ui-Divider />
          <!-- amount column -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[1].label }}
            </div>
            <div class="root__main--title__title">
              {{ i?.amount }}
              <ui-Label :text="$t('_common.currency.rial')" type="neutral" />
            </div>
          </div>
          <ui-Divider />
          <!-- id column -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[2].label }}
            </div>
            <div class="root__main--title__title">
              {{ i?.id }}
            </div>
          </div>
          <ui-Divider />
          <!-- date colum -->
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
            <!-- details & actions -->
            <div>
              <ui-Button
                class="-mr-xs"
                variant="text"
                :text="$t('_common.buttons.details_preview')"
                after-icon="AngleLeft"
                @click="clicked(i)"
              />
            </div>
            <div class="mt-sm">
              <ui-Action
                v-model:eventType="eventType"
                :limit="2"
                :items="
                  actionHandle(
                    i.percent,
                    i.reference_session?.id,
                    i.status,
                    i.url_code,
                    i.id,
                    confirmCancel
                  )
                "
                dir="rtl"
              />
            </div>
          </div>
        </template>
      </ui-TableCard>
    </div>
    <PayoutBaseNoResult v-if="!loading && !data" />
    <SharedShareModalConfirm
      v-if="showConfirm"
      submit-label="_payout.cancel_payout.confirm"
      cancel-label="_common.buttons.cancel"
      description="_payout.cancel_payout.description"
      title="_payout.cancel_payout.title"
      :loading="cancelPayoutLoading"
      @close="closeModal"
      @confirm="cancellationOfTheSettlement"
      @cancel="showConfirm = false"
    />
    <PayoutBaseReceipt v-if="toggleInQuiry" :data="filteredData" @close="toggleInQuiry = false" />
  </div>
</template>

<script setup lang="ts">
import { usePayoutAction } from '@/composables/payout/usePayoutAction';
import { usePayoutColumns } from '@/composables/payout/usePayoutColumns';
import { usePayoutFilter } from '@/composables/payout/usePayoutFilter';
import { payoutEditMutation } from '@/composables/payout/usePayoutQuery';
import { PayoutType, PayoutStatusEnum } from '@/graphql/graphql';
const data = inject<PayoutType[]>('payout');
const loading = inject<boolean>('payoutLoading');
const inquiry = ref<PayoutType[]>();
const filteredData = ref<PayoutType>();
const toggleInQuiry = ref(false);
const showConfirm = ref(false);
const selectedId = ref();
const eventType = ref<string>();
const emit = defineEmits(['refresh']);
const { columns } = usePayoutColumns();
const { actionHandle } = usePayoutAction();
const { statusHandler } = usePayoutFilter();
const { toJalali } = useDate();
const { mutate, onDone, loading: cancelPayoutLoading } = payoutEditMutation();
const cancellationOfTheSettlement = () => {
  mutate({
    id: selectedId.value,
    status: PayoutStatusEnum.DeActive,
  });
};
onDone(() => {
  emit('refresh', selectedId.value);
  showConfirm.value = false;
  selectedId.value = undefined;
});
onMounted(async () => {
  try {
    inquiry.value = await data;
  } catch {
    inquiry.value = [];
  }
});
const confirmCancel = (id: PayoutType['id']) => {
  selectedId.value = id;
  showConfirm.value = true;
};
const clicked = (item: PayoutType) => {
  filteredData.value = item;
  toggleInQuiry.value = true;
};
const closeModal = () => {
  showConfirm.value = false;
  selectedId.value = undefined;
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
        @apply text-text pl-sm  text-body-400-b1 font-medium;
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
