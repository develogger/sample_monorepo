<template>
  <ui-PageHeading
    :loading="loading"
    :description="!!data?.length && $t('_common.pageHeading.invoice_description')"
    :title="$t('_common.page_title.invoice')"
  >
    <template #action>
      <div class="w-fit flex gap-xs">
        <NuxtLink v-if="hasPermission" :to="`/panel/${domain}/invoice/add`">
          <ui-Button
            v-if="!md"
            :text="$t('_common.page_title.create_invoice')"
            after-icon="Plus"
            :loading="loading"
          />
          <ui-Button v-else icon="Plus" :loading="loading" />
        </NuxtLink>
      </div>
    </template>
  </ui-PageHeading>
</template>

<script setup lang="ts">
import { TerminalPermissionEnum, Invoice } from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';
const data = inject<Invoice[]>('invoice');
const { md } = useSize();
const loading = inject<boolean>('invoiceLoading');
const domain = useTerminalStore().currentDomain;
const { hasPermission } = usePermissionValidate(TerminalPermissionEnum.InvoiceEdit);
</script>
