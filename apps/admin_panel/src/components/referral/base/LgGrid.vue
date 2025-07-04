<template>
  <div>
    <ReferralBaseEmptyGrid v-if="!loading && data && data?.length === 0" />
    <ui-Table v-else-if="data || loading" :columns="columns" :items="data" :loading="loading">
      <!-- commission template -->
      <template #column-commission="header">
        <ui-Skeleton :loading="loading" :width="40" class="mt-2xs">
          <div class="h-fit flex -mt-2xs">
            <span class="truncate">{{ header.label }}</span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs" />
          </div>
        </ui-Skeleton>
      </template>
      <template #item-name="{ name, id, avatar }">
        <ui-Skeleton :loading="loading" :width="40" class="mt-2xs truncate">
          <div class="flex gap-sm">
            <ui-Avatar :src="avatar" />
            <div class="h-fit flex flex-col -mt-2xs">
              <span class="truncate">{{ name }}</span>
              <span class="text-text-soft text-body-400-b3">ZP.{{ id }}</span>
            </div>
          </div>
        </ui-Skeleton>
      </template>
      <!-- loading template -->
      <template #loadingSkeleton>
        <div v-for="index in pageSize" :key="index" class="loading">
          <div
            class="grid border-t border-t-border-divider"
            style="grid-template-columns: 40% 20% 20% 20%"
          >
            <div class="flex items-center">
              <ui-Skeleton :width="40" :height="40" circle class="px-sm" />
              <div>
                <ui-Skeleton :width="104" :height="12" class="px-sm pt-md" />
                <ui-Skeleton :width="104" :height="12" class="px-sm py-md" />
              </div>
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="104" :height="12" class="px-sm py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="104" :height="12" class="px-sm py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="104" :height="12" class="px-sm py-md" />
            </div>
          </div>
        </div>
      </template>
    </ui-Table>
    <InvoiceBaseNoResult v-if="!loading && !data" />
  </div>
</template>

<script setup lang="ts">
import { useReferralColumns } from '@/composables/referral/useReferralColumns';
import { UserReferred } from '@/graphql/graphql';

export interface Props {
  data: UserReferred[];
  loading: boolean;
}

const props = withDefaults(defineProps<Props>(), {});
const { data } = toRefs(props);
const { columns } = useReferralColumns();
const config = useRuntimeConfig();
const route = useRoute();
const pageSize = computed(() => Number(route.query.pageSize) || config.public.pageSize);
</script>
