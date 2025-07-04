<template>
  <div>
    <ui-Card>
      <template #main>
        <div class="mb-xl flex justify-start flex-row-reverse gap-xs flex-wrap">
          <ui-Skeleton :loading="loading" :width="83" :height="33" radius="xl">
            <InvoiceBaseFilter />
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
              :placeholder="$t('_form.search.invoice')"
              @submit="onSubmit"
            />
          </ui-Skeleton>
        </div>
        <InvoiceBaseContent />
      </template>
    </ui-Card>
  </div>
</template>
<script lang="ts" setup>
export interface RowType {
  label: string;
  value: string;
  helper: string;
  model: string;
}
const t = useI18n();
const router = useRouter();
const route = useRoute();
const loading = inject<boolean>('invoiceLoading');
const items = [
  {
    label: `${t('_common.table.id')}:`,
    value: 'id',
    helper: t('_helper.searchHelper.invoice_id'),
  },
  {
    label: `${t('_common.table.payer')}:`,
    value: 'payer',
    helper: t('_helper.searchHelper.invoice_payer'),
  },
  {
    label: `${t('_common.table.description')}:`,
    value: 'description',
    helper: t('_helper.searchHelper.invoice_description'),
  },
  {
    label: `${t('_form.add_invoice.email')}:`,
    value: 'email',
    helper: t('_helper.searchHelper.invoice_email'),
  },
  {
    label: `${t('_form.add_invoice.mobile')}:`,
    value: 'mobile',
    helper: t('_helper.searchHelper.invoice_mobile'),
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
