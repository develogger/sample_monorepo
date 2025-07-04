<template>
  <div>
    <ReconciliationDetailsMdGridLoading v-if="loading" />
    <ReconciliationDetailsEmptyGrid v-if="!loading && data && data?.length === 0" />
    <ui-TableCard v-for="i in data" :key="i?.id" class="root">
      <template #header>
        <div class="root__header">
          <div class="root__header--title">
            <span class="px-2xs"> {{ i.amount }} </span>
          </div>
          <div class="root__header--sub-title">
            <span class="px-2xs"> {{ `${$t('_common.amount.fee')} ${i.fee}` }} </span>
          </div>
        </div>
      </template>
      <template #main>
        <!-- id column -->
        <div class="root__main--title mt-sm">
          <div class="root__main--title__label">
            {{ detailColumns[1].label }}
          </div>
          <div class="root__main--title__title">
            {{ i.id }}
          </div>
        </div>
        <ui-Divider />
        <!-- created_at column -->
        <div class="root__main--title mt-sm">
          <div class="root__main--title__label">
            {{ detailColumns[2].label }}
          </div>
          <div class="root__main--title__title">
            {{ i.created_at }}
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
import { useReconciliationColumns } from '@/composables/reconciliation/useReconciliationColumns';
import { ReconciliationType } from '@/graphql/graphql';

export interface Props {
  data: ReconciliationType[];
  loading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {});
const { loading, data } = toRefs(props);
const { detailColumns } = useReconciliationColumns();
const router = useRouter();
const domain = useTerminalStore().currentDomain;
const clicked = (item: ReconciliationType) => {
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
