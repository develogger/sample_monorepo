<template>
  <ui-PageHeading
    :loading="loading"
    :description="
      !data?.length && _isEmpty(route.query)
        ? ''
        : $t('_common.pageHeading.instant_payout_description')
    "
    :title="$t('_common.page_title.instant_payout')"
  >
    <template #action>
      <div class="w-fit flex gap-xs">
        <template v-if="hasPermission">
          <ui-Button
            v-if="!md"
            :text="$t('_common.buttons.instant_request')"
            after-icon="Plus"
            :loading="loadingService || loading"
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
          :loading="loading || loadingService"
          @click.stop="toggleModal"
        />
        <ui-Button
          v-else
          type="tertiary"
          icon="ArrowTopLeft"
          :loading="loading || loadingService"
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
    :text="$t('_common.modal.service_instant_payout', { end: '23:00', start: '05:00' })"
    @close="timeRangeModal = false"
  />
</template>

<script setup lang="ts">
import {
  InstantPayoutExcelExportMutationVariables,
  TerminalPermissionEnum,
  InstantPayoutType,
  TerminalStatusEnum,
} from '@/graphql/graphql';
import { useTimeQuery } from '@/composables/user/useTimeQuery';
import { useInstantPayoutExcelExportMutation } from '@/composables/excelExport/useInstantPayoutExcelExportMutation';
import { StatusItem } from '@/types/statusItem';

const { snakeToCamel } = useSnakeToCamel();
const { schema } = useExcelNameSchema();
const { setFieldError, errors } = useForm({
  validationSchema: schema,
});
const data = inject<InstantPayoutType[]>('instantPayout');
const { activeTerminal } = useTerminalQuery();
const route = useRoute();
const t = useI18n();
const router = useRouter();
const { setTimeRange, convert, compareDates, subtract } = useDate();
const exportModal = ref(false);
const { md } = useSize();
const { statusList } = useInstantFilter();
const timeRangeModal = ref(false);
const loadingService = ref(false);
const handleAddPayout = async () => {
  loadingService.value = true;
  const { onResult } = await useTimeQuery();
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
        `/panel/${encodeURIComponent(activeTerminal.value?.domain as string)}/instant-payout/add`
      );
    isPaymentValid || (timeRangeModal.value = true);
    loadingService.value = false;
  });
};
/**
 * Request func for exportExcel in instant-payout list
 * ------------------------------
 * */
const { hasPermission } = usePermissionValidate(TerminalPermissionEnum.InstantPayoutEdit);
const activeItem = computed(() =>
  statusList.value.filter((i: StatusItem) => i.value === route.query.status)
);
const filterName = computed(() => activeItem.value[0]?.label || t('status.ALL'));
const { InstantPayoutExcelExport } = useInstantPayoutExcelExportMutation();
type validateType = 'name';
const {
  mutate,
  onDone,
  loading: loadingExport,
} = InstantPayoutExcelExport((input, message, params) => {
  setFieldError(snakeToCamel(input) as validateType, t('_validation.' + message, params));
});
const toggleModal = () => {
  exportModal.value = !exportModal.value;
};
const name = ref(
  t('_form.export.instant_payout', {
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
    filter: route.query.status || 'ALL',
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
  } as InstantPayoutExcelExportMutationVariables;
  mutate(variables);
};
onDone(() => router.push('/panel/export'));
const loading = inject<boolean>('instantPayoutLoading');
const disableCreateButton = computed(
  () => activeTerminal.value?.status !== TerminalStatusEnum.Active
);
provide('export_excel_errors', errors);
</script>
