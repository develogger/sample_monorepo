<template>
  <div>
    <InvoiceBaseEmptyGrid v-if="!loading && data && data?.length === 0" />
    <ui-Table
      v-else-if="data || loading"
      :columns="columns"
      :items="data"
      :loading="loading"
      @click-row="clicked"
      @hover-row="eventHandler"
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
      <!-- action template -->
      <template #item-action="{ id }">
        <div class="flex justify-end">
          <ui-Action
            :id="id"
            v-model:eventType="eventType"
            :selected-id="idValue"
            :limit="2"
            :items="actionHandle(id)"
            dir="rtl"
            @id-value="idValueHandler"
          />
        </div>
      </template>
      <!-- loading template -->
      <template #loadingSkeleton>
        <div v-for="index in pageSize" :key="index" class="loading">
          <div
            class="grid border-t border-t-border-divider"
            style="grid-template-columns: 208px 208px 208px 208px 208px 40px"
          >
            <div class="flex items-center">
              <ui-Skeleton :width="104" class="px-md py-md" />
            </div>
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
    <InvoiceBaseNoResult v-if="!loading && !data" />
  </div>
</template>

<script setup lang="ts">
import { useInvoiceFilter } from '../../../composables/invoice/useInvoiceFilter';
import { useInvoiceAction } from '@/composables/invoice/useInvoiceAction';
import { useInvoiceColumns } from '@/composables/invoice/useInvoiceColumns';
import { Invoice } from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';
const router = useRouter();
const domain = useTerminalStore().currentDomain;
const data = inject<Invoice[]>('invoice');
const loading = inject<boolean>('invoiceLoading');
const idValue = ref();
const idValueHandler = (value: string) => {
  idValue.value = value;
};
const { actionHandle } = useInvoiceAction();
const { columns } = useInvoiceColumns();
const { statusHandler } = useInvoiceFilter();
const config = useRuntimeConfig();
const route = useRoute();
const eventType = ref();
const eventHandler = (event: MouseEvent, item: Invoice) => {
  eventType.value = { event: event.type, uniqueId: item.id };
};
const clicked = (item: { id: string | number }) => {
  router.push(`/panel/${domain}/invoice/details/${item.id}`);
};
const pageSize = computed(() => Number(route.query.pageSize) || config.public.pageSize);
</script>
