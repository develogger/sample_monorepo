<template>
  <div>
    <ReferralBaseMdGridLoading v-if="loading" />
    <ReferralBaseEmptyGrid v-if="!loading && data && data?.length === 0" />
    <div v-else-if="data && !loading">
      <ui-TableCard v-for="i in data" :key="i?.id" class="root">
        <template #header>
          <div class="root__header">
            <!-- title column -->
            <div class="root__header--id">
              <ui-Avatar :src="i?.avatar" />
              <div class="flex flex-col">
                <span class="root__header--id__text">{{ i?.name }}</span>
                <span class="text-text-soft text-body-400-b3">ZP.{{ i?.id }}</span>
              </div>
            </div>
          </div>
        </template>
        <template #main>
          <!-- commission column -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[1].label }}
            </div>
            <div class="root__main--title__title">
              <span class="px-2xs"> {{ i.commission }} </span>
              <ui-Label :text="$t('_common.currency.rial')" type="neutral" />
            </div>
          </div>
          <ui-Divider />
          <!-- last_session_time colum -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[2].label }}
            </div>
            <div class="root__main--title__title">
              {{ i.last_session_time }}
            </div>
          </div>
          <ui-Divider />
          <!-- registered_at colum -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[3].label }}
            </div>
            <div class="root__main--title__title">
              {{ i.registered_at }}
            </div>
          </div>
        </template>
      </ui-TableCard>
    </div>
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
</script>

<style lang="scss" scoped>
.root {
  @apply mt-md;
  &__header {
    @apply flex justify-between flex-wrap;
    &--id {
      @apply flex items-center gap-xs;
      &__text {
        @apply text-text pl-sm  text-body-400-b2 font-medium;
      }
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
}
</style>
