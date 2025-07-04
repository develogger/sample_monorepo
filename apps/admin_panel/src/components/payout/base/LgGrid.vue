<template>
  <div>
    <PayoutBaseEmptyGrid v-if="!loading && !data?.length" />
    <ui-Table
      v-else
      :columns="columns"
      :items="data"
      :loading="loading"
      @click-row="clicked"
      @hover-row="eventHandler"
    >
      <!-- iban template -->
      <template #item-bank_data="{ bank_account }">
        <ui-Skeleton :loading="loading" :width="104" class="mt-2xs">
          <div class="flex gap-sm">
            <div
              v-if="bank_account?.issuing_bank?.slug"
              class="h-[40px] w-[40px] border border-border-soft bg-surface-soft rounded-md p-xs"
            >
              <ui-BankLogo :name="bank_account.issuing_bank.slug" class="w-[24px] h-[24px]" />
            </div>

            <ui-Avatar v-else shape="square" type="Box" />

            <div>
              <div class="flex gap-2xs items-center mb-2xs font-Mono">
                <span class="flex items-center">{{ bank_account?.iban?.slice(-6) }}</span>
                <ui-Tooltip font="font-Mono" :content="bank_account?.iban">
                  <ui-Label text="···" type="neutral" class="flex items-center" />
                </ui-Tooltip>
                <span class="flex items-center">{{ bank_account?.iban?.substring(0, 2) }}</span>
              </div>
              <div class="text-caption-400-c1 text-text-soft">
                {{ bank_account?.holder_name ?? '--' }}
              </div>
            </div>
          </div>
        </ui-Skeleton>
      </template>
      <!-- amount header template -->
      <template #column-amount="header">
        <ui-Skeleton v-if="loading" :loading="loading" :width="140" class="mt-[6px]" />
        <div v-else class="h-fit flex gap-2xs md:w-6xl lg:w-6xl xl:w-full">
          <span class="truncate text-text">{{ header.label }}</span>
          <ui-Label :text="$t('_common.currency.rial')" type="neutral" />
        </div>
      </template>
      <!-- status template -->
      <template #item-status="{ status }">
        <div class="h-fit">
          <ui-Status :text="statusHandler(status).text" :type="statusHandler(status).type" />
        </div>
      </template>
      <template #item-created_at="{ created_at }">
        <div>
          {{ created_at ? toJalali(created_at) : '_' }}
        </div>
      </template>
      <!-- action template -->
      <template #item-action="{ percent, reference_session, status, url_code, id }">
        <div class="flex justify-end">
          <ui-Action
            :id="id"
            v-model:eventType="eventType"
            :selected-id="idValue"
            :limit="2"
            :items="
              actionHandle(percent, reference_session?.id, status, url_code, id, confirmCancel)
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
              grid-template-columns: minmax(170px, 1fr) 18% 15% 15% minmax(160px, 1fr) minmax(
                  50px,
                  1fr
                );
            "
          >
            <div class="my-auto">
              <div class="flex items-center gap-sm px-md py-md">
                <ui-Skeleton :width="40" :height="40" radius="sm" />
                <div class="flex flex-col">
                  <ui-Skeleton :width="104" :height="12" class="pb-2xs" />
                  <ui-Skeleton :width="64" />
                </div>
              </div>
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="104" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="104" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="64" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="64" :height="12" class="px-md py-md" />
            </div>
            <div class="mr-auto my-auto">
              <ui-Skeleton :width="24" :height="24" class="px-md py-md" radius="sm" />
            </div>
          </div>
        </div>
      </template>
    </ui-Table>
    <PayoutBaseNoResult v-if="!loading && !data" />
    <PayoutBaseReceipt v-if="toggleInQuiry" :data="inquiry" @close="toggleInQuiry = false" />

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
  </div>
</template>

<script setup lang="ts">
import { usePayoutAction } from '../../../composables/payout/usePayoutAction';
import { usePayoutColumns } from '../../../composables/payout/usePayoutColumns';
import { PayoutStatusEnum, PayoutType } from '@/graphql/graphql';
import { usePayoutFilter } from '@/composables/payout/usePayoutFilter';
import { usePayoutQuery } from '@/composables/payout/usePayoutQuery';
const data = inject<PayoutType[]>('payout');
const loading = inject<boolean>('payoutLoading');
const inquiry = ref<PayoutType>();
const toggleInQuiry = ref(false);
const { toJalali } = useDate();
const idValue = ref();
const idValueHandler = (value: string) => {
  idValue.value = value;
};
const showConfirm = ref(false);
const selectedId = ref();
const emit = defineEmits(['refresh']);
const { payoutEditMutation } = usePayoutQuery();
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
const confirmCancel = (id: PayoutType['id']) => {
  selectedId.value = id;
  showConfirm.value = true;
};
const { actionHandle } = usePayoutAction();
const { columns } = usePayoutColumns();
const { statusHandler } = usePayoutFilter();
const config = useRuntimeConfig();
const route = useRoute();
const clicked = (item: PayoutType) => {
  inquiry.value = item;
  toggleInQuiry.value = true;
};
const closeModal = () => {
  showConfirm.value = false;
  selectedId.value = undefined;
};
const eventType = ref();
const eventHandler = (event: MouseEvent, item: PayoutType) => {
  eventType.value = { event: event.type, uniqueId: item.id };
};
const pageSize = computed(() => Number(route.query.pageSize) || config.public.pageSize);
</script>
