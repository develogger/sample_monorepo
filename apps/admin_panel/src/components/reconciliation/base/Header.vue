<template>
  <ui-PageHeading
    :description="!!data?.length && $t('reconcilation.subtitle')"
    :title="$t('common.reconciliations')"
    :loading="loadingData"
  >
    <template #action>
      <div class="w-fit">
        <ui-Button
          type="tertiary"
          after-icon="ArrowTopLeft"
          :text="$t('common.export.create')"
          :loading="loadingData"
          @click.stop="toggleModal"
        />
      </div>
    </template>
  </ui-PageHeading>
  <SharedExport
    v-model:name="name"
    :show="exportModal"
    :loading="loading"
    :filter-name="filterName"
    @action="exportExcel()"
    @close="toggleModal"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {
  ReconciliationExcelExportMutationVariables,
  ReconciliationStatusEnum,
} from '@/graphql/graphql';
import { useReconciliationFilter } from '@/composables/reconciliation/useReconciliationFilter';
import { useSessionExportStatus } from '@/composables/export/useSessionExportStatus';
import { useReconciliationExcelExportMutation } from '@/composables/excelExport/useReconciliationExcelExportMutation';

const { snakeToCamel } = useSnakeToCamel();
const { schema } = useExcelNameSchema();
const { setFieldError, errors } = useForm({
  validationSchema: schema,
});
const reconciliationStore = useReconciliationStore();
const { data, loading: loadingData } = storeToRefs(reconciliationStore);
const route = useRoute();
const router = useRouter();
const { activeTerminal } = useTerminalQuery();
const { filterHandler } = useSessionExportStatus();
const exportModal = ref(false);
const t = useI18n();
const { convert, subtract } = useDate();
const { statusHandler } = useReconciliationFilter();
const filterName = computed(
  () =>
    (route.query.status && statusHandler(route.query.status as ReconciliationStatusEnum).text) ||
    t('status.ALL')
);
type validateType = 'name';
const { reconciliationExcelExport } = useReconciliationExcelExportMutation();
const { mutate, onDone, loading } = reconciliationExcelExport((input, message, params) => {
  setFieldError(snakeToCamel(input) as validateType, t('_validation.' + message, params));
});
const name = ref(
  t('_form.export.reconciliation', {
    terminal: activeTerminal.value?.name,
  })
);
watchEffect(() => {
  name.value = t('_form.export.session', {
    terminal: activeTerminal.value?.name,
  });
});
const store = useTerminalStore();
/**
 * Close modal and Reset step of modal for exporExcel
 * ------------------------------
 * */
const toggleModal = () => {
  exportModal.value = !exportModal.value;
};
/**
 * Request func for exporExcel in reconcilation list
 * ------------------------------
 * */
const exportExcel = () => {
  const variables = {
    terminal_id: store.currentTerminal,
    filter: filterHandler(route.query.status as string),
    created_from_date:
      (route.query.from && convert(route.query.from as string, 'jYYYY-jMM-jDD', 'YYYY-MM-DD')) ||
      subtract(1, 'YYYY-MM-DD', 'years'),
    created_to_date:
      (route.query.to && convert(route.query.to as string, 'jYYYY-jMM-jDD', 'YYYY-MM-DD')) ||
      convert('', undefined, 'YYYY-MM-DD'),
    min_amount: Number(route.query.moreAmount) || undefined,
    max_amount: Number(route.query.lessAmount) || undefined,
    amount: Number(route.query.equalAmount) || undefined,
    reference_id: route.query.reference || undefined,
    name: name.value,
  } as ReconciliationExcelExportMutationVariables;
  mutate(variables);
};
onDone(() => router.push('/panel/export'));
provide('export_excel_errors', errors);
</script>
