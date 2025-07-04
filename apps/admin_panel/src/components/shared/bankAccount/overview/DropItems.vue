<template>
  <div
    class="bg-surface rounded-t-md shadow-elevation-100 border-t border-border-soft border-r border-l fixed bottom-[73px] w-[calc(100%-32px)] lg:w-[640px] lg:sticky"
    :class="store.showToggleSelectedBankAccount ? 'h-[calc(100vh-150px)] lg:h-fit' : 'h-[64px]'"
  >
    <!-- header of bank -->
    <div
      class="flex justify-between p-md rounded-t-md"
      :class="{
        'border-b border-border-soft': store.showToggleSelectedBankAccount,
      }"
    >
      <ui-Button :icon="computedIcon" type="tertiary" class="w-2xl h-2xl" @click="toggleItems" />
    </div>
    <!-- card of bank -->
    <div v-if="store.showToggleSelectedBankAccount" class="h-full py-xl overflow-y-auto">
      <ui-TableCard v-for="i in data" :key="i?.id" class="tableCard">
        <template #header>
          <div class="tableCard__header">
            <!-- bank column -->
            <div class="tableCard__header--id">
              <div class="flex gap-xs items-center">
                <ui-Skeleton v-if="loading" :width="40" :height="40" radius="sm" />
                <div
                  v-else-if="i.issuing_bank?.slug_image"
                  class="h-[40px] w-[40px] border border-border-soft rounded-md"
                >
                  <NuxtImg
                    :src="i.issuing_bank?.slug_image"
                    :alt="i.holder_name"
                    sizes="40px"
                    :placeholder="[40, 40]"
                    loading="lazy"
                    class="rounded-md"
                  />
                </div>
                <div v-else-if="!loading && !i.issuing_bank?.slug_image">
                  <ui-Avatar shape="square" type="Box" />
                </div>
                <div class="flex flex-col gap-2xs">
                  <ui-Skeleton v-if="loading" />
                  <span v-else class="text-body-400-b2 text-text">{{ i.holder_name }}</span>
                  <ui-Skeleton v-if="loading" :width="40" />
                  <span v-else class="text-caption-400-c1 text-text-soft">#{{ i.id }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #main>
          <!-- amount iban -->
          <div class="tableCard__main--title">
            <ui-Skeleton v-if="loading" />
            <div v-else class="tableCard__main--title__label">
              {{ columns[1].label }}
            </div>
            <ui-Skeleton v-if="loading" :width="60" :height="24" />
            <div v-else class="tableCard__main--title__title">
              {{ i?.iban }}
              <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mr-xs" />
            </div>
          </div>
        </template>
        <template #footer>
          <div class="mb-md flex justify-end">
            <ui-Button variant="tertiary" icon="Trash" class="w-[40px] !text-text" />
          </div>
        </template>
      </ui-TableCard>
      <SharedBankAccountOverviewLgItems class="hidden lg:block" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBankAccountColumns } from '@/composables/bank/useBankAccountColumns';
import { BankAccount } from '@/graphql/graphql';

const store = useBankAccountStore();
const data = inject<Ref<BankAccount[]>>('data');
const loading = inject('loading');
const { columns } = useBankAccountColumns();
const anime = ref('');
const computedIcon = computed(() =>
  store.showToggleSelectedBankAccount ? 'AngleDown' : 'AngleUp'
);
const toggleItems = () => {
  if (store.showToggleSelectedBankAccount) {
    store.showToggleSelectedBankAccount = false;
    anime.value = 'maximize';
  } else {
    store.showToggleSelectedBankAccount = true;
    anime.value = 'minimize';
  }
};
</script>

<style lang="scss" scoped>
.tableCard {
  @apply flex flex-col gap-md mb-md pb-0 mx-md lg:hidden;
  &__header {
    @apply flex justify-between flex-wrap items-center;
    &--id {
      @apply flex items-center;
      &__text {
        @apply text-text pl-sm text-body-400-b1 font-medium;
      }
    }
    &--status {
      @apply -mt-sm;
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
