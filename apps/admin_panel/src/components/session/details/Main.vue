<template>
  <div class="main pb-3xl container-xl mb-xl" dir="rtl">
    <div class="basis-full lg:mb-xl">
      <!-- section-1 -->
      <ui-Card>
        <template #header>
          <span v-if="!loading" class="text-heading-600-h2 flex items-center">
            {{ $t('title.session_detail') }}
          </span>
          <ui-Skeleton v-else :width="140" :height="20" />
        </template>
        <template #main>
          <div v-if="!hasOrderForm" class="border border-border-divider mt-xl rounded-sm">
            <div class="main__item--detail">
              <ui-Skeleton v-if="loading" :width="64" />
              <div v-else class="text-body-400-b3 text-text-soft">
                {{ $t('_session.show.details') }}
              </div>
              <ui-Skeleton v-if="loading" :width="120" />
              <p v-else class="text-body-400-b2 break-word">
                {{ data?.description }}
              </p>
            </div>
          </div>
          <div class="grid grid-cols-6 border border-border-divider rounded-sm mt-xl">
            <div
              v-for="(item, index) in detailList"
              :key="item.title"
              :class="detailStyle(index)"
              class="main__item--detail"
            >
              <ui-Skeleton v-if="loading" :width="64" />
              <div v-else class="text-body-400-b3 text-text-soft">
                {{ item.title }}
              </div>
              <ui-Skeleton v-if="loading" :width="120" />
              <div
                v-else-if="index === authorityIndex && data?.authority"
                class="flex gap-2xs text-body-400-b2 items-center"
              >
                <span>{{ data?.authority?.slice(-8) }}</span>
                <ui-Tooltip :content="data?.authority">
                  <ui-Label text="···" type="neutral" class="flex items-center" />
                </ui-Tooltip>
                <span>{{ data?.authority?.substring(0, 4) }}</span>
              </div>
              <div
                v-else-if="index === feeIndex && data?.fee"
                class="flex gap-2xs text-body-400-b2 items-center"
              >
                <span>{{ `${numberFormat(data?.fee)}  ${t('product.details.rials')}` }}</span>
                <ui-Tooltip
                  v-if="hasTooltipDetail && data.fee_detail"
                  :content="h(TooltipHelper, { data: data.fee_detail })"
                  position="top"
                  :max-width="280"
                >
                  <ui-Icon
                    name="InfoFill"
                    class="flex items-center text-text-soft cursor-pointer"
                    style="font-size: 16px"
                  />
                </ui-Tooltip>
              </div>
              <div
                v-else-if="index === sessionIdIndex && data?.wage_payouts?.length"
                class="text-body-400-b2"
              >
                {{ item.value(data as SessionPayerInfoType & SessionType) }}
                <div
                  class="flex gap-xs items-center text-body-400-b3 text-primary cursor-pointer"
                  @click="handleWagePayoutsLink"
                >
                  <div>{{ $t('_session.show.wage_payouts') }}</div>
                  <ui-Icon name="AngleLeft" />
                </div>
              </div>
              <div v-else class="text-body-400-b2">
                {{ item.value(data as SessionPayerInfoType & SessionType) }}
              </div>
            </div>
          </div>
          <div
            v-if="data?.type === SessionTypeEnum.Zarinlink"
            class="border border-border-divider my-xl rounded-sm"
          >
            <div class="main__item--detail">
              <ui-Skeleton v-if="loading" :width="64" />
              <div v-else class="text-body-400-b3 text-text-soft">
                {{ $t('_common.slug.payment_link_name') }}
              </div>
              <ui-Skeleton v-if="loading" :width="120" />
              <div
                v-else
                class="flex gap-xs items-center text-body-400-b2 text-primary cursor-pointer"
                @click="handleProductLink"
              >
                <div class="break-word">{{ data?.product?.title }}</div>
                <ui-Icon name="ArrowTopLeft" />
              </div>
            </div>
          </div>
        </template>
      </ui-Card>
      <!-- section-2 -->
      <ui-Card v-if="hasPayerForm || loading" class="mt-md">
        <template #header>
          <div class="flex justify-between items-center">
            <span v-if="!loading" class="text-heading-600-h2">
              {{ $t('invoice.addInvoice.payer_info') }}
            </span>
            <ui-Skeleton v-else :width="140" :height="20" />
            <div class="w-fit">
              <ui-Button
                v-if="refundPermission && !!payerInfo?.card_pan"
                type="tertiary"
                variant="outlined"
                :text="$t('_common.status.REFUND')"
                before-icon="Refund"
                :loading="loadingService"
                :disabled="disableRefoundButton"
                @click="handleAddRefund"
              />
            </div>
          </div>
        </template>
        <template #main>
          <SessionDetailsShow
            :data="data"
            :payer-info="payerInfo"
            :loading="loading"
            @handle-inquiry="cardPanInqueryModal"
          />
        </template>
      </ui-Card>
      <ui-Card v-if="hasOrderForm" class="mt-md">
        <template #header>
          <div class="flex justify-between items-center">
            <span v-if="!loading" class="text-heading-600-h2">
              {{ $t('_common.slug.order') }}
            </span>
            <ui-Skeleton v-else :width="140" :height="20" />
          </div>
        </template>
        <template #main>
          <SessionDetailsOrderForm
            :data="data"
            :payer-info="payerInfo"
            :loading="loading"
            @handle-inquiry="cardPanInqueryModal"
          />
        </template>
      </ui-Card>
    </div>
    <div class="lg:w-[368px]">
      <!-- time-line -->
      <ui-Card class="lg:w-[368px]">
        <template #header>
          <div class="flex justify-between items-center">
            <span v-if="!loading" class="text-heading-600-h2">
              {{ $t('session.show.transaction_history') }}
            </span>
            <ui-Skeleton v-else :width="140" :height="20" />
            <ui-Button
              v-if="permission"
              before-icon="Plus"
              variant="outlined"
              type="neutral"
              :loading="loading"
              :disabled="payerNotes && payerNotes.length === 3"
              :text="$t('_form.note.title')"
              @click="handleToggleNoteInput"
            />
          </div>
          <div v-show="showNote">
            <ui-Textarea
              v-model="noteValue"
              class="mt-xl mb-md"
              :disabled="formLoading"
              name="note"
              auto-focus
              :placeholder="$t('_form.note.placeHolder')"
              :helper="{
                type: !!errors?.note ? 'error' : undefined,
                message: errors?.note,
              }"
            />
            <div
              class="flex justify-between float-left"
              :class="{ 'float-none': payerNotes && payerNotes[0]?.content }"
            >
              <div class="float-left">
                <ui-Button
                  size="medium"
                  class="inline-flex main__item--button"
                  type="secondary"
                  :text="$t('common.cancel')"
                  :disabled="formLoading"
                  @click="cancel()"
                />
                <ui-Button
                  class="inline-flex mr-xs main__item--button"
                  size="medium"
                  type="primary"
                  :text="$t('common.save')"
                  :disabled="!formMeta?.valid || !noteValue"
                  :loading="formLoading"
                  @click="formSubmit"
                />
              </div>
            </div>
          </div>
        </template>
        <template #main>
          <div class="flex flex-col mt-xl">
            <ui-TimeLine
              v-for="(item, index) in payerNotes"
              :key="item"
              icon-class="text-text-warning"
              :class="getMarginClass(index, payerNotes)"
              :is-first="index === 0"
              :is-last="index === (payerNotes && payerNotes?.length - 1)"
              icon="MessageEditFill"
              :caption="
                item?.user && $t('_session.show.note.noteBy').concat(' ', item.user.name as string)
              "
              :loading="loading"
              :title="item.content"
            >
              <template #action>
                <div class="flex justify-between items-center">
                  <ui-Skeleton :loading="loading" :width="104" class="truncate">
                    <span v-if="areDatesSame(item)" class="text-body-400-b3 text-text-soft">{{
                      toJalali(item.created_at)
                    }}</span>
                    <span v-else class="text-body-400-b3 text-text-soft">
                      {{ $t('_common.buttons.edit').concat(' ', toJalali(item.updated_at)) }}
                    </span>
                  </ui-Skeleton>
                  <ui-Action
                    v-if="permission && !loading"
                    :id="item.id"
                    v-model:eventType="eventType"
                    :selected-id="item.id"
                    :limit="2"
                    :items="actionHandle(item.id, item.content as string, callbackAction)"
                    dir="rtl"
                    @id-value="idValueHandler"
                  />
                </div>
              </template>
            </ui-TimeLine>
            <ui-TimeLine
              v-for="(item, index) in timeLineList()"
              :key="item.id"
              :is-first="index === 0"
              :is-last="index === timeLineList().length - 1"
              :icon="item.icon"
              :icon-class="item.class"
              :title="item.title"
              :loading="loading"
              :caption="item.date && toJalali(item.date)"
              :sub-title="item.subText"
            >
              <template #action>
                <div v-if="item.reconciled_id || item.refund_time">
                  <ui-Button
                    after-icon="AngleLeft"
                    variant="text"
                    class="-mr-xs"
                    :loading="loading"
                    :text="
                      item.reconciled_id ? $t('common.reconciliationDetail') : $t('refund.receipt')
                    "
                    @click="item.reconciled_id ? reconciliatioDetail(item.reconciled_id) : refund()"
                  />
                </div>
              </template>
            </ui-TimeLine>
          </div>
        </template>
      </ui-Card>
    </div>
  </div>
  <SessionDetailsCardPanInquery
    v-if="showModal"
    :session-id="data?.id"
    @close="() => (showModal = false)"
  />
  <SharedShareModalPayout
    v-if="timeRangeModal"
    :text="$t('_common.modal.service_refund', { end: '23:00', start: '05:00' })"
    @close="timeRangeModal = false"
  />
  <SessionDetailsRefundDetails v-model:show="showRefund" :data="data?.refund" />
  <RefundAdd v-if="!timeRangeModal && refundAdd" v-model:show="refundAdd" :session-data="data" />
</template>
<script lang="ts" setup>
import moment from 'moment';
import { toRefs } from 'vue';
import { FormMeta } from 'vee-validate';
import TooltipHelper from './TooltipHelper.vue';
import {
  SessionPayerInfoType,
  SessionTimeLineType,
  SessionType,
  SessionTypeEnum,
  TerminalPermissionEnum,
  SessionStatusEnum,
  NoteType,
  SessionTryType,
  TerminalStatusEnum,
} from '@/graphql/graphql';
import { useTerminalQuery } from '@/composables/terminal/useTerminalQuery';
import { useSessionDetailSchema } from '@/composables/session/useSessionDetailSchema';
import { useTimeQuery } from '@/composables/user/useTimeQuery';
interface ExtraTimeLine {
  reconciled_success_time: string;
  reconciled_status: string;
}
export type ErrorsType = globalThis.ComputedRef<Partial<Record<'note', string | undefined>>>;
export interface Props {
  payerInfo?: SessionPayerInfoType & SessionTryType;
  timeLine?: SessionTimeLineType & ExtraTimeLine;
  payerNotes?: NoteType[];
  data?: SessionType;
  loading?: boolean;
  showNote?: boolean;
  noteId: string | null;
}
const { actionHandle } = useSessionAction();
const noteValue = ref();
const showModal = ref(false);
const refundAdd = ref(false);
const authorityIndex = 8;
const feeIndex = 6;
const sessionIdIndex = 1;
const formMeta:
  | globalThis.ComputedRef<
      FormMeta<
        Partial<{
          note: string;
        }>
      >
    >
  | undefined = inject('form_meta');
const toggle = inject<(() => void | undefined) | undefined>('toggle');
const cardPanInqueryModal = () => {
  showModal.value = !showModal.value;
};
const deleteNote = inject<(() => void | undefined) | undefined>('deleteNote');
const formLoading = inject('form_loading');
const formSubmit = inject('form_submit');
const errors: globalThis.ComputedRef<Partial<Record<'note', string | undefined>>> | undefined =
  inject('form_errors');
const props = withDefaults(defineProps<Props>(), {
  payerInfo: undefined,
  timeLine: undefined,
  payerNotes: undefined,
  data: undefined,
  noteId: '',
});
const emit = defineEmits(['update:noteId']);
const eventType = ref();
const { setTimeRange, convert, compareDates } = useDate();
const { payerInfo, timeLine, data, payerNotes, showNote } = toRefs(props);
const domain = useTerminalStore().currentDomain;
const { toJalali } = useDate();
const t = useI18n();
const { activeTerminal } = useTerminalQuery();
const router = useRouter();
const { detailList, getStatusReconcileInfo } = useSessionDetailSchema();
const { $notify } = useNuxtApp();
const { numberFormat } = useMath();
const showRefund = ref(false);
const timeLineList = () => {
  const arr = ref([
    {
      id: 0,
      title: t('session.show.time_line.cancel'),
      date: timeLine.value?.canceled_time,
      show: !!timeLine.value?.canceled_time,
      icon: 'Close',
      class: 'text-text-danger',
    },
    {
      id: 1,
      title: t('session.show.time_line.refund'),
      subText: t('session.show.time_line.refund_amount', {
        amount: timeLine.value?.refund_amount ? timeLine.value?.refund_amount.toLocaleString() : '',
      }),
      date: timeLine.value?.refund_time,
      show: !!timeLine.value?.refund_time,
      refund_time: timeLine.value?.refund_time,
      linkText: t('refund.receipt'),
      icon: 'RefundFill',
      class: 'text-text-warning',
    },
    {
      id: 2,
      title: getStatusReconcileInfo(timeLine.value?.reconciled_status)?.text,
      subText: t('session.show.time_line.reconciled_id', {
        id: timeLine.value?.reconciled_id,
      }),
      linkText:
        timeLine.value?.reconciled_status === 'PAID' && t('session.show.time_line.reconciled_link'),
      date: timeLine.value?.reconciled_success_time,
      show: !!timeLine.value?.reconciled_status,
      reconciled_id: timeLine.value?.reconciled_id,
      icon: getStatusReconcileInfo(timeLine.value?.reconciled_status)?.icon,
      class: getStatusReconcileInfo(timeLine.value?.reconciled_status)?.class,
    },
    {
      id: 3,
      title: t('session.show.time_line.create_reconcile'),
      date: timeLine.value?.reconciled_time,
      show: !!timeLine.value?.reconciled_time,
      icon: 'DollarStatus',
      class: 'text-text-success border border-border-success rounded-circle !text-[21px]',
    },
    {
      id: 4,
      title: t('session.show.time_line.verified'),
      subText: t('session.show.time_line.verified_id', { id: data.value?.reference_id }),
      date: timeLine.value?.verified_time,
      show: !!timeLine.value?.verified_time,
      icon: 'CheckMarkCircleFill',
      class: 'text-text-information',
    },
    {
      id: 5,
      title: t('session.show.time_line.paid'),
      date: timeLine.value?.settled_time,
      show: !!timeLine.value?.settled_time,
      icon: 'CheckMarkCircleOutlined',
      class: 'text-text-success',
    },
    {
      id: 6,
      title: `${t('session.show.time_line.bank')} ${timeLine.value?.in_bank_name}`,
      date: timeLine.value?.in_bank_time,
      show: !!timeLine.value?.in_bank_time,
      icon: 'BankSignalSquare',
      class: 'text-text-disabled',
    },
    {
      id: 7,
      title: t('session.show.time_line.create'),
      date: timeLine.value?.created_time,
      show: !!timeLine.value?.created_time,
      icon: 'InvoicePlus',
      class: 'text-text-disabled',
    },
  ]);

  return arr.value
    .filter(i => !!i.show)
    .sort(function (a, b) {
      if (!a.date) {
        return -1;
      }
      if (!b.date) {
        return 1;
      }

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
};
const handleToggleNoteInput = () => {
  emit('update:noteId', null);
  toggle && toggle();
};
const idValueHandler = (value: string) => {
  emit('update:noteId', value);
};
const callbackAction = (id: string, value: string, type: string) => {
  if (type === 'edit') {
    emit('update:noteId', id);
    handleToggleNote(value);
  } else {
    emit('update:noteId', id);
    handleDeleteNote();
  }
};
const timeRangeModal = ref(false);
const loadingService = ref(false);
const toggleModal = () => {
  refundAdd.value = !refundAdd.value;
};
const refundPermission = computed(
  () =>
    data?.value &&
    data?.value.terminal &&
    data?.value.terminal.refund_active &&
    (data?.value.status === SessionStatusEnum.Verified ||
      data?.value.status === SessionStatusEnum.Paid)
);
const handleAddRefund = async () => {
  if (data.value && data.value.amount < 20000) {
    $notify({
      isRead: false,
      message: t('refund.amount_valid_Refund'),
      type: 'error',
    });

    return;
  }
  if (hasRefund.value) {
    $notify({
      isRead: false,
      message: t('refund.checkingRefund'),
      type: 'error',
    });

    return;
  }
  loadingService.value = true;
  const { onResult } = await useTimeQuery();
  onResult(result => {
    const time = result.data.Time?.current_time;
    if (data.value && data.value.created_at) {
      const createdDate = moment(data.value.created_at);
      const currenDate = moment(result.data.Time?.current_time);
      const sixtyMonthsAgo = currenDate.subtract(6, 'months');
      if (createdDate.isBefore(sixtyMonthsAgo)) {
        $notify({
          isRead: false,
          message: t('refund.date_valid_Refund'),
          type: 'error',
        });
        loadingService.value = false;

        return;
      }
    }
    const refundTime = convert(time, 'YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD HH:mm:ss');
    const startTime = setTimeRange(5, 0, 23, 0).startTime;
    const endTime = setTimeRange(5, 0, 23, 0).endTime;
    const isRefundValid =
      compareDates(refundTime, endTime).result === 'before' ||
      compareDates(refundTime, startTime).result === 'after' ||
      compareDates(refundTime, endTime).result === 'same';

    isRefundValid && (refundAdd.value = !refundAdd.value);
    isRefundValid || (timeRangeModal.value = true);
    loadingService.value = false;
  });
};
const permission = computed(
  () =>
    activeTerminal.value &&
    _includes(activeTerminal.value?.permissions, TerminalPermissionEnum.NoteEdit)
);
const cancel = () => {
  if (toggle) {
    noteValue.value = '';
    toggle();
  }
};
const detailStyle = (index: number) => {
  switch (index) {
    case 0:
      return 'col-span-6 lg:col-span-2 border-b';
    case 1:
      return 'col-span-6 lg:col-span-2 lg:border-r lg:border-l border-b';
    case 2:
      return 'col-span-6 lg:col-span-2 font-medium lg:rounded-tl-sm border-b';
    case 3:
      return 'col-span-6 lg:col-span-2 border-b';
    case 4:
      return 'lg:col-span-2 col-span-6 lg:border-r border-l border-b';
    case 5:
      return 'lg:col-span-2 col-span-6 border-b';
    case 6:
      return 'lg:col-span-2 col-span-6 lg:rounded-br-sm border-b md:border-b-0 md:border-l';
    case 7:
      return 'lg:col-span-2 col-span-6 border-b md:border-b-0 md:border-l';
    case 8:
      return 'lg:col-span-2 col-span-6 lg:rounded-bl-sm';
    default:
      break;
  }
};
const reconciliatioDetail = (id: string | number) => {
  router.push(`/panel/${domain}/reconciliation/${id}`);
};
const refund = () => {
  showRefund.value = true;
};
const areDatesSame = (item: NoteType) =>
  compareDates(item.created_at, item.updated_at).result === 'same';
const getMarginClass = (index: number, payerNotes?: NoteType[]) =>
  index === (payerNotes && payerNotes.length - 1) ? 'mb-lg' : '';
const hasRefund = computed(() => !!timeLine.value?.refund_amount);
const handleDeleteNote = () => {
  noteValue.value = '';
  deleteNote && deleteNote();
};
const handleToggleNote = (value: string) => {
  if (!showNote.value) {
    noteValue.value = value;
  }
  toggle && toggle();
};
const handleProductLink = () => {
  router.push({
    path: `/panel/${domain}/zarin-link`,
    query: {
      zarinLinkId: data?.value?.payer_info?.zarin_link_id,
    },
  });
};
const handleWagePayoutsLink = () => {
  router.push({
    path: `/panel/${domain}/payout`,
    query: {
      reference: data?.value?.id,
    },
  });
};
const hasOrderForm = computed(
  () =>
    data.value &&
    (data.value.type === SessionTypeEnum.Zarinlink ||
      data.value.type === SessionTypeEnum.Personallink)
);
const hasPayerForm = computed(
  () =>
    data.value &&
    !!data.value.session_tries?.length &&
    (data.value?.session_tries[0]?.card_pan || data.value?.session_tries[0]?.rrn)
);
const disableRefoundButton = computed(
  () => activeTerminal.value?.status !== TerminalStatusEnum.Active
);
const hasTooltipDetail = computed(() => {
  if (data.value && data.value.fee_detail) {
    return data.value.fee !== data.value.fee_detail.raw_fee;
  }

  return undefined;
});
provide('toggleModal', toggleModal);
</script>
<style lang="scss" scoped>
.main {
  @apply flex lg:flex-row flex-col gap-sm;
  &__item--detail {
    @apply flex flex-col w-full gap-xs p-md border-border-divider;
  }
  &__item--button {
    @apply inline-flex;
  }
}
</style>
