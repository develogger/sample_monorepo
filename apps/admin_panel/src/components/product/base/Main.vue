<template>
  <div>
    <ui-Card>
      <template #main>
        <div class="mb-xl flex justify-start flex-row-reverse gap-xs flex-wrap items-center">
          <ui-Skeleton :loading="loading" :width="83" :height="33" radius="xl">
            <ProductBaseFilter />
          </ui-Skeleton>
          <ui-Skeleton :loading="loading" :width="63" :height="33" radius="xl">
            <SharedAmountFilter />
          </ui-Skeleton>
          <ui-Divider type="vertical" height="32" class="mx-2xs hidden md:flex" />
          <ui-Skeleton :loading="loading" :width="180" :height="32" radius="xl">
            <SharedSearchFilter
              :rows="items"
              :placeholder="$t('_form.search.product')"
              @submit="onSubmit"
            />
          </ui-Skeleton>
        </div>
        <ProductBaseContent />
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
const loading = inject<boolean>('productLoading');
const items = [
  {
    label: `${t('_common.modal.product_id')}:`,
    value: 'productId',
    helper: t('_helper.searchHelper.reconcile_id'),
  },
  {
    label: `${t('_common.slug.product_name')}:`,
    value: 'title',
    helper: t('_helper.searchHelper.product_name'),
  },
  {
    label: `${t('_common.table.description')}:`,
    value: 'description',
    helper: t('_helper.searchHelper.product_description'),
  },
  {
    label: `${t('_form.addProduct.prev_link_available')}:`,
    value: 'successful_redirect_url',
    helper: t('_helper.searchHelper.link'),
  },
  {
    label: `${t('_form.addProduct.prev_link_unavailable')}:`,
    value: 'failed_redirect_url',
    helper: t('_helper.searchHelper.link'),
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
