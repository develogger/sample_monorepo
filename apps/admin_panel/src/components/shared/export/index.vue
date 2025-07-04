<template>
  <div class="root" dir="rtl">
    <ui-Modal
      v-if="show"
      ref="filterRef"
      :text="$t(modalTitle)"
      close-icon
      header
      width="480px"
      footer-boarder
      @close="modalToggleHandler"
    >
      <template #body>
        <div>
          <div class="pb-xl border-b border-border-divider dark:border-border-dark-divider">
            <span class="mb-md text-body-400-b3 text-text-soft dark:text-text-dark-soft">
              {{ $t('_form.export.fileName') }}
            </span>
            <div class="mt-md" dir="rtl">
              <ui-TextField
                :model-value="name"
                auto-focus
                :loading="false"
                :helper="{
                  type: !!errors?.name ? 'error' : undefined,
                  message: errors?.name,
                }"
                name="name"
                @update:model-value="
                  (value: string) => {
                    emit('update:name', value);
                  }
                "
              />
            </div>
          </div>
          <div class="pb-xl border-b border-border-divider dark:border-border-dark-divider mt-xl">
            <span class="mb-md text-body-400-b3 text-text-soft dark:text-text-dark-soft">
              {{ $t('_form.export.filterBy') }}
            </span>
            <div class="mt-md flex gap-xs flex-wrap">
              <ui-label
                size="medium"
                type="neutral"
                :text="`${$t('common.table.status')}: ${filterName}`"
              />
              <ui-label v-if="methodFilter" size="medium" type="neutral" :text="methodFilter" />
              <ui-label v-if="dateFilter" size="medium" type="neutral" :text="dateFilter" />
              <ui-label v-if="amountFilter" size="medium" type="neutral" :text="amountFilter" />
            </div>
          </div>
          <div v-if="!$slots.custom" class="mt-xl">
            <div class="mb-md text-body-400-b3 text-text-soft dark:text-text-dark-soft">
              {{ $t('_form.export.exportFormat') }}
            </div>
            <div class="export flex items-center">
              <ui-Icon name="Excel" class="text-green-500" />
              <span class="text-body-400-b2 mx-2xs">
                {{ $t('_form.export.xlsx') }}
              </span>
            </div>
          </div>
          <slot name="custom" />
        </div>
      </template>
      <template #leftFooter>
        <div class="flex gap-xs">
          <ui-Button
            type="primary"
            size="medium"
            :loading="loading"
            :text="submitLabel"
            @click="exportCreate"
          />
        </div>
      </template>
      <template #rightFooter>
        <ui-Button
          :text="$t('_form.export.exportList')"
          type="secondary"
          size="medium"
          before-icon="BulletList"
          @click="navigateExport"
        />
      </template>
    </ui-Modal>
  </div>
</template>
<script setup lang="ts">
import { SessionTypeEnum } from '~/graphql/graphql';

export interface Props {
  modal?: boolean;
  name: string;
  filterName: string;
  show: boolean;
  loading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {});
const router = useRouter();
const route = useRoute();
const { typeList } = useSessionFilter();
const t = useI18n();
const { loading } = toRefs(props);
const { amountHandler } = useAmountFilter();
const filteredValue = (value: SessionTypeEnum) =>
  typeList.value.filter((i: Value) => i.value === value)[0]?.label;
const amountFilter = computed(() =>
  amountHandler(
    route.query.lessAmount as string,
    route.query.moreAmount as string,
    route.query.equalAmount as string
  )
);
const dateFilter = computed(() => {
  if (route.query.from && route.query.to) {
    const toDate = route.query.to;
    const fromDate = route.query.from;

    if (toDate === fromDate) {
      return `${t('_common.filters.date')}: ${toDate}`;
    } else {
      return `${t('_common.filters.date')}: ${fromDate} - ${toDate}`;
    }
  } else {
    return `${t('_common.filters.date')}: ${t('_common.filters.default_year')}`;
  }
});
const methodFilter = computed(() => {
  if (route.query.type) {
    return `${t('_form.search.paymentMethod')}: ${filteredValue(
      route.query.type as SessionTypeEnum
    )}`;
  }

  return '';
});
const modalTitle = computed(() => '_common.buttons.export_create');
const submitLabel = computed(() => t('_common.buttons.export_create'));
const emit = defineEmits(['action', 'close', 'update:step', 'update:name']);
const navigateExport = () => router.push('/panel/export');
const exportCreate = () => {
  emit('action');
};
const modalToggleHandler = () => {
  emit('close');
};
const errors: Record<'name', string | undefined> | undefined = inject('export_excel_errors');
</script>
<style scoped lang="scss">
:deep(.input__description) {
  @apply flex-row;
}
</style>
