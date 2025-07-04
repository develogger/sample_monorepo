<template>
  <div class="px-md mb-3xl min-h-[400px]">
    <!-- table -->
    <ui-Table v-if="data || loading" :loading="loading" :columns="columns" :items="data">
      <!-- iban template -->
      <template #item-title="{ iban, issuing_bank, holder_name }">
        <div class="flex gap-sm items-center">
          <div
            v-if="issuing_bank?.slug_image"
            class="h-[40px] w-[40px] max-h-[40px] border border-border-soft rounded-md relative overflow-hidden"
          >
            <NuxtImg
              :src="issuing_bank?.slug_image"
              :alt="holder_name"
              width="100%"
              height="100%"
              fit="containt"
              :placeholder="[40, 40]"
              loading="lazy"
              class="rounded-md"
            />
          </div>
          <ui-Avatar v-else shape="square" type="Box" />
          <div class="flex flex-col gap-2xs">
            <span>{{ iban }}</span>
            <span class="text-caption-400-c1 text-text-soft">#{{ holder_name }}</span>
          </div>
        </div>
      </template>
      <!-- header template -->
      <template #column-amount="header">
        <ui-Skeleton :loading="loading" :width="40" class="mt-2xs">
          <div class="h-fit flex -mt-2xs md:w-5xl lg:w-6xl xl:w-full">
            <span class="truncate text-text">{{ header.label }}</span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs" />
          </div>
        </ui-Skeleton>
      </template>

      <!-- loading template -->
      <template #loadingSkeleton>
        <div v-for="index in 5" :key="index" class="loading">
          <div
            class="grid border-t border-t-border-divider"
            style="
              grid-template-columns: 56px minmax(350px, 2fr) minmax(120px, 1fr) minmax(120px, 1fr);
            "
          >
            <div class="flex items-center">
              <ui-Skeleton :width="20" :height="20" class="px-xs py-md pr-md" radius="xs" />
            </div>
            <div class="my-auto">
              <div class="flex">
                <ui-Skeleton :width="40" :height="40" class="px-md py-md" radius="sm" />
                <div class="flex flex-col">
                  <ui-Skeleton :width="60" class="py-md" />
                  <ui-Skeleton :width="40" />
                </div>
              </div>
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="60" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="40" :height="24" class="px-md py-md" radius="xl" />
            </div>
          </div>
        </div>
      </template>
    </ui-Table>
  </div>
</template>

<script setup lang="ts">
import { useBankAccountColumns } from '@/composables/bank/useBankAccountColumns';
import { FilteredDataType } from '@/types/filteredDataType';

const data = inject<Ref<FilteredDataType[]>>('data');
const { columns } = useBankAccountColumns();
const loading = inject('loading');
</script>
