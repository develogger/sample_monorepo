<template>
  <div class="head">
    <ui-PageHeading
      :loading="loading"
      :description="
        !data?.length && _isEmpty(route.query) ? '' : $t('_common.pageHeading.payout_description')
      "
      :title="$t('_common.page_title.payout')"
    >
      <template #action>
        <div class="w-fit flex gap-xs">
          <template v-if="hasPermission">
            <ui-Button
              v-if="!md"
              :text="$t('_common.buttons.instant_request')"
              after-icon="Plus"
              :loading="loading || loadingService"
              :disabled="disableCreateButton"
              @click="handleAddPayout"
            />
            <ui-Button
              v-else
              icon="Plus"
              :loading="loading || loadingService"
              :disabled="disableCreateButton"
              @click="handleAddPayout"
            />
          </template>
          <ui-Button
            v-if="!md"
            :text="$t('_common.buttons.export_create')"
            type="tertiary"
            after-icon="ArrowTopLeft"
            :loading="loading"
            @click.stop="toggleModal"
          />
          <ui-Button
            v-else
            :loading="loading"
            type="tertiary"
            icon="ArrowTopLeft"
            @click.stop="toggleModal"
          />
        </div>
      </template>
    </ui-PageHeading>
    <SharedExport
      v-model:name="name"
      :show="exportModal"
      :filter-name="filterName"
      :loading="loadingExport"
      @action="exportExcel"
      @close="toggleModal"
    />
    <SharedShareModalPayout
      v-if="timeRangeModal"
      :text="$t('_common.modal.service_payout', { end: '23:00', start: '05:00' })"
      @close="timeRangeModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { usePayoutFilter } from '@/composables/payout/usePayoutFilter';
import { useTimeQuery } from '@/composables/user/useTimeQuery';
import {
  PayoutExcelExportMutationVariables,
  TerminalPermissionEnum,
  PayoutType,
  FilterEnum,
  PayoutStatusEnum,
  TerminalStatusEnum,
} from '@/graphql/graphql';
import { usePayoutExcelExportMutation } from '@/composables/excelExport/usePayoutExcelExportMutation';
import { StatusItem } from '@/types/statusItem';

const { snakeToCamel } = useSnakeToCamel();
const { schema } = useExcelNameSchema();
const { setFieldError, errors } = useForm({
  validationSchema: schema,
});
const route = useRoute();
const t = useI18n();
const { md } = useSize();
const { setTimeRange, convert, compareDates, subtract } = useDate();
const data = inject<PayoutType[]>('payout');
const { hasPermission } = usePermissionValidate(TerminalPermissionEnum.PayoutEdit);
const { statusList } = usePayoutFilter();
const router = useRouter();
const timeRangeModal = ref(false);
const loadingService = ref(false);
const exportModal = ref(false);
const handleAddPayout = () => {
  loadingService.value = true;
  const { onResult } = useTimeQuery();
  onResult(result => {
    const time = result.data.Time?.current_time;
    const paymentTime = convert(time, 'YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD HH:mm:ss');
    const startTime = setTimeRange(5, 0, 23, 0).startTime;
    const endTime = setTimeRange(5, 0, 23, 0).endTime;
    const isPaymentValid =
      compareDates(paymentTime, endTime).result === 'before' ||
      compareDates(paymentTime, startTime).result === 'after' ||
      compareDates(paymentTime, endTime).result === 'same';

    isPaymentValid &&
      router.push(
        `/panel/${encodeURIComponent(activeTerminal.value?.domain as string)}/payout/add`
      );
    isPaymentValid || (timeRangeModal.value = true);
    loadingService.value = false;
  });
};
/**
 * Request func for exportExcel in payout list
 * ------------------------------
 * */
const activeItem = computed(() =>
  statusList.value.filter((i: StatusItem) => i.value === route.query.status)
);
const filterName = computed(() => activeItem.value[0]?.label || t('status.ALL'));
const { PayoutExcelExport } = usePayoutExcelExportMutation();
type validateType = 'name';
const {
  mutate,
  onDone,
  loading: loadingExport,
} = PayoutExcelExport((input, message, params) => {
  setFieldError(snakeToCamel(input) as validateType, t('_validation.' + message, params));
});
const { activeTerminal } = useTerminalQuery();
const toggleModal = () => {
  exportModal.value = !exportModal.value;
};
const name = ref(
  t('_form.export.payout', {
    terminal: activeTerminal.value?.name,
  })
);
watchEffect(() => {
  name.value = t('_form.export.session', {
    terminal: activeTerminal.value?.name,
  });
});
const exportExcel = () => {
  const variables = {
    terminal_id: activeTerminal.value?.id,
    status: route.query.status ? castFilterToStatus(route.query.status as FilterEnum) : undefined,
    created_from_date:
      (route.query.from && convert(route.query.from as string, 'jYYYY-jMM-jDD', 'YYYY-MM-DD')) ||
      subtract(1, 'YYYY-MM-DD', 'years'),
    created_to_date:
      (route.query.to && convert(route.query.to as string, 'jYYYY-jMM-jDD', 'YYYY-MM-DD')) ||
      convert('', undefined, 'YYYY-MM-DD'),
    min_amount: Number(route.query.moreAmount) || undefined,
    max_amount: Number(route.query.lessAmount) || undefined,
    amount: Number(route.query.equalAmount) || undefined,
    name: name.value,
  } as PayoutExcelExportMutationVariables;
  mutate(variables);
};
onDone(() => router.push('/panel/export'));
const loading = inject<boolean>('payoutLoading');
const castFilterToStatus = (filter: FilterEnum): PayoutStatusEnum => {
  switch (filter) {
    case FilterEnum.Trash:
      return PayoutStatusEnum.DeActive;
    case FilterEnum.Active:
      return PayoutStatusEnum.PendingShaparak;
    case FilterEnum.Rejected:
      return PayoutStatusEnum.Reject;

    default:
      return filter as unknown as PayoutStatusEnum;
  }
};
const disableCreateButton = computed(
  () => activeTerminal.value?.status !== TerminalStatusEnum.Active
);
provide('export_excel_errors', errors);
</script>
