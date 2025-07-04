<template>
  <div>
    <InvoiceDetailsMdGridLoading v-if="loading" />
    <InvoiceDetailsEmptyGrid v-if="!loading && data && data?.length === 0" />
    <ui-TableCard v-for="i in data" :key="i?.id" class="root">
      <template #header>
        <div class="root__header">
          <div class="root__header--title flex items-center">
            <span class="px-2xs"> {{ i.amount }} </span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs" />
          </div>
          <ui-Status
            v-if="i.status"
            class="mt-sm"
            :text="getStatusInfo(i.status).text"
            :type="getStatusInfo(i.status).type"
          />
        </div>
      </template>
      <template #main>
        <!-- id column -->
        <div class="root__main--title mt-sm">
          <div class="root__main--title__label">
            {{ detailColumns[1].label }}
          </div>
          <div class="root__main--title__title">
            {{ i.metadata }}
          </div>
        </div>
        <ui-Divider />
        <!-- created_at column -->
        <div class="root__main--title mt-sm">
          <div class="root__main--title__label">
            {{ detailColumns[2].label }}
          </div>
          <div class="root__main--title__title">
            {{ i.payer_info }}
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <!-- details & actions -->
          <div>
            <ui-Button
              variant="text"
              :text="$t('_common.buttons.details_preview')"
              after-icon="AngleLeft"
              class="-mr-xs"
              @click="clicked(i)"
            />
          </div>
        </div>
      </template>
    </ui-TableCard>
  </div>
</template>
<script setup lang="ts">
import { SessionType } from '@/graphql/graphql';
import { useInvoiceColumns } from '@/composables/invoice/useInvoiceColumns';
import { useSessionStatus } from '@/composables/session/useSessionStatus';

export interface Props {
  data: SessionType[];
  loading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {});
const { loading, data } = toRefs(props);
const { detailColumns } = useInvoiceColumns();
const { getStatusInfo } = useSessionStatus();
const router = useRouter();
const domain = useTerminalStore().currentDomain;
const clicked = (item: SessionType) => {
  router.push(`/panel/${domain}/session/${item.id}`);
};
</script>
<style lang="scss" scoped>
.root {
  &__header {
    @apply flex flex-col justify-between flex-wrap;
    &--sub-title {
      @apply text-body-400-b3 text-text-soft;
    }
  }
  &__main {
    &--title {
      @apply flex justify-between mb-sm;
      &__label {
        @apply text-body-400-b3 text-text-soft font-medium pl-sm;
      }
      &__title {
        @apply text-body-400-b2 text-text;
      }
    }
  }
  &__footer {
    @apply flex justify-between;
    &__detail {
      @apply text-body-400-b2 text-primary font-medium my-auto;
    }
    &__button {
      @apply text-body-400-b2 text-text;
    }
  }
}
</style>
