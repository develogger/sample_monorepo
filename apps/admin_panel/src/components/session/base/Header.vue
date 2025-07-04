<template>
  <ui-PageHeading
    :title="$t('common.sessions')"
    :description="!!data?.length && $t('session.description')"
    :loading="loadingData"
  >
    <template #action>
      <div class="w-fit">
        <ui-Button
          type="tertiary"
          after-icon="ArrowTopLeft"
          :loading="loadingData"
          :text="$t('_common.buttons.export_create')"
          @click.stop="toggleModal"
        />
      </div>
    </template>
  </ui-PageHeading>
  <SharedExport
    v-model:name="name"
    :show="exportModal"
    :filter-name="filterName"
    :loading="loading || fieldLoading || normalLoading"
    @action="exportExcel()"
    @close="toggleModal"
  >
    <template #custom>
      <div class="flex flex-col mt-lg">
        <div class="pb-xl border-b border-border-divider">
          <div class="mb-md text-body-400-b3 text-text-soft dark:text-text-dark-soft">
            {{ $t('_form.export.exportFormat') }}
          </div>
          <div dir="rtl" class="flex flex-col items-start gap-sm">
            <ui-Radio
              :label="$t('_helper.export.excel_XLSX')"
              :value="ExportFileTypeEnum.Xlsx"
              name="export_type_radio"
              dir="ltr"
              :picked="exportTypeRadio"
              @selected-value="handleChangeTypeRadio(ExportFileTypeEnum.Xlsx)"
            />
            <ui-Radio
              label="CSV"
              :value="ExportFileTypeEnum.Csv"
              name="CSV"
              dir="ltr"
              :picked="exportTypeRadio"
              @selected-value="handleChangeTypeRadio(ExportFileTypeEnum.Csv)"
            />
            <div class="text-body-400-b3 text-text-soft">
              {{ $t('_helper.export.description_type') }}
            </div>
          </div>
        </div>
        <span class="text-body-400-b3 text-text-soft dark:text-text-dark-soft my-md">
          {{ $t('_helper.export.excel_column') }}
        </span>
        <div dir="rtl" class="flex items-start gap-sm">
          <ui-RadioCard
            v-model="exportRadio"
            :label="$t('status.ALL')"
            :val="ExportFieldRadio.Default"
            name="export_radio"
            dir="ltr"
            :description="$t('_helper.export.excel_detail')"
            :picked="exportRadio"
            @update:model-value="handleChangeRadio(ExportFieldRadio.Default)"
          />
          <ui-RadioCard
            v-model="exportRadio"
            :label="$t('_helper.export.optional_select')"
            :val="ExportFieldRadio.Optional"
            name="export_radio"
            dir="ltr"
            :description="$t('_helper.export.optional_select_detail')"
            :picked="exportRadio"
            :helper="$t('status.NEW')"
            @update:model-value="handleChangeRadio(ExportFieldRadio.Optional)"
          />
        </div>
        <div
          v-if="exportRadio === ExportFieldRadio.Optional"
          ref="fieldsContainerRef"
          class="mt-lg"
        >
          <div v-for="item in exportFieldDataTemp" :key="item?.id" class="flex flex-col gap-sm">
            <span class="py-md border-border-divider border-b text-body-500-b2">{{
              item.key
            }}</span>
            <div class="flex flex-wrap">
              <div
                v-for="field in item.fields"
                :key="field"
                class="w-1/2 mt-sm"
                @click="handleMaxError(field.slug)"
              >
                <ui-Checkbox
                  :checked="field.is_selected"
                  :disabled="field.is_required || hasDisable(field.slug)"
                  :name="field.slug"
                  :label="field.title"
                  @change="handleToggleExportGroups(field.slug)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </SharedExport>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { nextTick } from 'vue';
import {
  ExportableField,
  ExportableFieldsCategory,
  FilterEnum,
  Maybe,
  ExportFileTypeEnum,
} from '@/graphql/graphql';
import { useSessionFilter } from '@/composables/session/useSessionFilter';
import { useSessionExcelExportMutation } from '@/composables/excelExport/useSessionExcelExportMutation';
const { snakeToCamel } = useSnakeToCamel();
const { schema } = useExcelNameSchema();
const { setFieldError, errors } = useForm({
  validationSchema: schema,
});
type validateType = 'name';
enum ExportFieldRadio {
  Optional = 'OPTIONAL',
  Default = 'DEFAULT',
}
const { $notify } = useNuxtApp();
const sessionStore = useSessionStore();
const { data, loading: loadingData } = storeToRefs(sessionStore);
const t = useI18n();
const { convert, subtract } = useDate();
const { data: exportFieldData, onResult, load, loading: fieldLoading } = sessionExportFieldQuery();
const { activeTerminal } = useTerminalQuery();
const { statusHandler } = useSessionFilter();
const filterName = computed(
  () =>
    (route.query.status && statusHandler(route.query.status as FilterEnum).text) ??
    t('_common.status.SUCCESS')
);
const exportModal = ref(false);
const store = useTerminalStore();
const route = useRoute();
const router = useRouter();
const { sessionExcelExpor, normalSessionExcelExport } = useSessionExcelExportMutation();
const { mutate, onDone, loading } = sessionExcelExpor((input, message, params) => {
  setFieldError(snakeToCamel(input) as validateType, t('_validation.' + message, params));
});
const {
  mutate: normalMutate,
  onDone: normalOnDone,
  loading: normalLoading,
} = normalSessionExcelExport((input, message, params) => {
  setFieldError(snakeToCamel(input) as validateType, t('_validation.' + message, params));
});
const exportFieldDataTemp = ref();
const exportRadio = ref(ExportFieldRadio.Default);
const exportTypeRadio = ref(ExportFileTypeEnum.Xlsx);
const exportGroups = ref(new Set<string>());
const maxSelectItems = 99;
const fieldsContainerRef = ref();
/**
 * Close modal and Reset step of modal for exporExcel
 * ------------------------------
 * */
const toggleModal = () => {
  exportModal.value = !exportModal.value;
  exportRadio.value = ExportFieldRadio.Default;
  exportGroups.value.clear();

  if (exportModal.value) {
    load();
  }
};
const name = ref(
  t('_form.export.session', {
    terminal: activeTerminal.value?.name,
  })
);
watchEffect(() => {
  name.value = t('_form.export.session', {
    terminal: activeTerminal.value?.name,
  });
});
/**
 * Request func for exporExcel in session list
 * ------------------------------
 * */
const handleChangeRadio = (val: ExportFieldRadio) => {
  if (val === ExportFieldRadio.Optional) {
    scrollToItem();
  }
};
const handleChangeTypeRadio = (val: ExportFileTypeEnum) => {
  exportTypeRadio.value = val;
};
const handleToggleExportGroups = (slug: string) => {
  if (exportGroups.value.has(slug)) {
    exportGroups.value.delete(slug);
  } else {
    exportGroups.value.add(slug);
  }
};
const scrollToItem = () => {
  nextTick(() => {
    fieldsContainerRef.value?.scrollIntoView({ behavior: 'smooth' });
  });
};
const requiredFields = computed(() =>
  exportFieldDataTemp.value.flatMap(
    (item: ExportableFieldsCategory) =>
      item.fields?.filter((field: Maybe<ExportableField>) => field?.is_required) || []
  )
);
const requiredFieldsCount = computed(() => requiredFields.value.length);
const hasDisable = (slug: string) => {
  if (exportGroups.value.size + requiredFieldsCount.value === maxSelectItems) {
    return !Array.from(exportGroups.value).includes(slug);
  }

  return false;
};
const handleMaxError = (slugField: string) => {
  if (hasDisable(slugField)) {
    $notify({
      isRead: false,
      message: t('_helper.export.notify_max'),
      type: 'error',
    });
  }
};
const exportExcel = () => {
  const exportGroupsArray = Array.from(exportGroups.value);
  const variables = {
    terminal_id: store.currentTerminal,
    filter: route.query.status || FilterEnum.Active,
    created_from_date:
      (route.query.from && convert(route.query.from as string, 'jYYYY-jMM-jDD', 'YYYY-MM-DD')) ||
      subtract(1, 'YYYY-MM-DD', 'years'),
    created_to_date:
      (route.query.to && convert(route.query.to as string, 'jYYYY-jMM-jDD', 'YYYY-MM-DD')) ||
      convert('', undefined, 'YYYY-MM-DD'),
    min_amount: Number(route.query.moreAmount) || undefined,
    max_amount: Number(route.query.lessAmount) || undefined,
    amount: Number(route.query.equalAmount) || undefined,
    type: route.query.type || undefined,
    reference_id: route.query.reference_id || undefined,
    relation_id: route.query.relation_id || undefined,
    email: route.query.email || undefined,
    mobile: route.query.mobile || undefined,
    card_pan: route.query.card_pan || undefined,
    session_id: route.query.id || undefined,
    name: name.value,
    fields: exportGroupsArray,
    export_file_type: exportTypeRadio.value,
  };
  if (exportRadio.value === ExportFieldRadio.Default) {
    normalMutate(variables);
  } else {
    mutate(variables);
  }
};
onDone(() => router.push('/panel/export'));
normalOnDone(() => router.push('/panel/export'));
onResult(() => {
  exportFieldDataTemp.value = JSON.parse(JSON.stringify(exportFieldData.value));
  exportFieldDataTemp.value &&
    exportFieldDataTemp.value.forEach((element: ExportableFieldsCategory) => {
      element.fields &&
        element.fields.forEach((field: Maybe<ExportableField>) => {
          if (field?.is_selected) {
            exportGroups.value.add(field?.slug as string);
          }
          if (field?.is_required) {
            exportGroups.value.add(field?.slug as string);
            field.is_selected = true;
          }
        });
    });
});
provide('export_excel_errors', errors);
</script>
