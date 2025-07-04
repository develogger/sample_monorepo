<template>
  <div class="root" dir="rtl">
    <ui-Modal
      v-if="show"
      :text="$t('_referral.payment_report')"
      close-icon
      header
      class="lg:max-w-[600px] h-[500px]"
      @close="modalToggleHandler"
    >
      <template #body>
        <ui-Select
          v-if="store.data && store.data.length"
          :data="generateYears"
          class="w-[100px] h-3xl"
          after-icon="AngleDown"
          name="dropDown"
          :disabled="loading || !lastIndex"
          :value="year"
          @selected-item="selectedYear"
        />
        <ui-EmptyState
          v-if="!loading && data && data?.length === 0"
          :title="$t('_common.empty.nothing_found')"
          :description="$t('_common.empty.no_payment_has_been_made_yet')"
          vector="NoResult"
        >
        </ui-EmptyState>
        <ui-Table
          v-else-if="data && !md"
          :columns="invoiceColumns"
          :items="data"
          :loading="loading"
          class="mt-xl"
        >
          <!-- amount template -->
          <template #column-amount="header">
            <ui-Skeleton :loading="loading" :width="40" class="mt-2xs">
              <div class="h-fit flex -mt-2xs">
                <span class="truncate">{{ header.label }}</span>
                <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs" />
              </div>
            </ui-Skeleton>
          </template>
          <!-- status template -->
          <template #item-status="{ status }">
            <div class="h-fit">
              <ui-Status :text="statusHandler(status).text" :type="statusHandler(status).type" />
            </div>
          </template>
          <!-- loading template -->
          <template #loadingSkeleton>
            <div v-for="index in pageSize" :key="index" class="loading">
              <div
                class="grid border-t border-t-border-divider"
                style="grid-template-columns: 208px 208px 208px 208px 40px"
              >
                <div class="my-auto">
                  <ui-Skeleton :width="104" :height="12" class="px-sm py-md" />
                </div>
                <div class="my-auto">
                  <ui-Skeleton :width="104" :height="12" class="px-sm py-md" />
                </div>
                <div class="my-auto">
                  <ui-Skeleton :width="60" :height="12" class="px-sm py-md" />
                </div>
                <div class="my-auto">
                  <ui-Skeleton :width="60" :height="24" class="px-sm py-md" radius="md" />
                </div>
                <div class="my-auto justify-self-end">
                  <ui-Skeleton :width="32" :height="32" class="px-sm py-md" radius="sm" />
                </div>
              </div>
            </div>
          </template>
        </ui-Table>
        <div v-if="data && md">
          <ui-TableCard v-for="i in data" :key="i?.id" class="mt-xl">
            <template #main>
              <div class="flex justify-between">
                <div class="root__main--title__label">
                  {{ invoiceColumns[1].label }}
                </div>
                <div class="root__main--title__title">
                  <span class="px-2xs"> {{ i.amount }} </span>
                  <ui-Label :text="$t('_common.currency.rial')" type="neutral" />
                </div>
              </div>
              <div class="flex justify-between mt-sm">
                <div class="root__main--title__label">
                  {{ invoiceColumns[2].label }}
                </div>
                <div class="root__main--title__title">
                  <ui-Status
                    v-if="i.status"
                    :text="statusHandler(i.status).text"
                    :type="statusHandler(i.status).type"
                  />
                </div>
              </div>
            </template>
          </ui-TableCard>
        </div>
      </template>
    </ui-Modal>
  </div>
</template>
<script setup lang="ts">
import { ReferrerInvoiceType } from '@/graphql/graphql';
import { useReferralColumns } from '@/composables/referral/useReferralColumns';
import { useReferrerInvoiceFilter } from '@/composables/invoice/useReferrerInvoiceFilter';

export interface Props {
  data: ReferrerInvoiceType[];
  lastIndex: ReferrerInvoiceType;
  loading: boolean;
  show: boolean;
}
const { invoiceColumns } = useReferralColumns();
const props = withDefaults(defineProps<Props>(), {});
const route = useRoute();
const config = useRuntimeConfig();
const { data, show, loading, lastIndex } = toRefs(props);
const { statusHandler } = useReferrerInvoiceFilter();
const { convert } = useDate();
const store = useReferralStore();
const emit = defineEmits(['update:show', 'changeYear']);
const { md } = useSize();
const modalToggleHandler = () => {
  emit('update:show', !show.value);
};
const year = ref({
  title: convert('', undefined, 'jYYYY'),
  value: convert('', undefined, 'jYYYY'),
});
const years = ref<{ title: string; value: string; id: string }[]>([]);
const selectedLen = ref(0);
const generateYears = computed(() => {
  if (data.value && data.value.length) {
    years.value = [];
    const currentYear = convert('', undefined, 'jYYYY');
    const lastYear = convert(lastIndex.value?.from_date, '', 'jYYYY');
    const numbLastYear = Number(lastYear);

    for (let year = Number(currentYear); year >= numbLastYear; --year) {
      years.value.push({
        title: `${year}`,
        value: `${year}`,
        id: `${year}`,
      });
    }
  }

  return years.value;
});
const selectedYear = (item: Record<string, string>) => {
  selectedLen.value++;
  if (selectedLen.value > 1) {
    year.value.title = item.title;
    year.value.value = item.value;
    emit('changeYear', convert(item.value, 'jYYYY', 'YYYY'));
  }
};
const pageSize = computed(() => Number(route.query.pageSize) || config.public.pageSize);
</script>
