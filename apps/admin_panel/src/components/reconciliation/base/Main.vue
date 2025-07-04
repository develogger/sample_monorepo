<template>
  <div>
    <ui-Card>
      <template #main>
        <div class="mb-xl flex justify-start flex-row-reverse gap-xs flex-wrap">
          <ui-Skeleton :loading="loading" :width="83" :height="33" radius="xl">
            <reconciliationBaseFilter />
          </ui-Skeleton>
          <ui-Skeleton :loading="loading" :width="67" :height="33" radius="xl">
            <SharedDateFilter />
          </ui-Skeleton>
          <ui-Skeleton :loading="loading" :width="63" :height="33" radius="xl">
            <SharedAmountFilter />
          </ui-Skeleton>
          <ui-Divider type="vertical" height="32" class="mx-2xs hidden md:flex" />
          <ui-Skeleton :loading="loading" :width="180" :height="32" radius="xl">
            <SharedSearchFilter
              :rows="items"
              :placeholder="$t('_form.search.reconcile')"
              @submit="onSubmit"
            />
          </ui-Skeleton>
        </div>
        <reconciliationBaseContent />
      </template>
    </ui-Card>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';

export interface RowType {
  label: string;
  value: string;
  helper: string;
  model: string;
}
const t = useI18n();
const router = useRouter();
const route = useRoute();
const reconciliationStore = useReconciliationStore();
const { loading } = storeToRefs(reconciliationStore);
const items = [
  {
    label: `${t('_common.table.reconcile_id')}:`,
    value: 'id',
    helper: t('_common.table.reconcile_id'),
  },
  {
    label: `${t('_common.table.refrenceId')}:`,
    value: 'reference',
    helper: t('_common.table.refrenceId'),
  },
  {
    label: `${t('_common.table.iban')}:`,
    value: 'iban',
    helper: t('_common.table.iban'),
  },
];
const onSubmit = (selected: RowType[]) => {
  const newQuery = { ...route.query };
  items.forEach(item => {
    delete newQuery[item.value];
  });
  selected.forEach(i => {
    newQuery[i.value] = i.model;
  });

  router.push({
    query: newQuery,
  });
};
</script>
