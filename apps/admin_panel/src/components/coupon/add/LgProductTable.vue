<template>
  <div class="w-full">
    <!-- table -->
    <ui-Table :loading="loading" :columns="columns" :items="filteredData">
      <!-- product template -->
      <template #item-title="{ title, image, id }">
        <div class="flex gap-sm items-center basis-0 truncate">
          <div
            v-if="image"
            class="h-[40px] w-[40px] max-h-[40px] border border-border-soft rounded-md relative overflow-hidden"
          >
            <NuxtImg
              :src="image"
              :alt="title"
              width="100%"
              height="100%"
              fit="containt"
              :placeholder="[40, 40]"
              loading="lazy"
              class="rounded-md h-full object-cover w-full"
            />
          </div>
          <ui-Avatar v-else shape="square" type="Box" />
          <div class="flex flex-col gap-2xs truncate">
            <span class="truncate">{{ title }}</span>
            <span class="text-caption-400-c1 text-text-soft">#{{ id }}</span>
          </div>
        </div>
      </template>
      <!-- action template -->
      <template #item-action="{ id }">
        <div class="h-fit">
          <ui-Button
            variant="tertiary"
            icon="Trash"
            class="w-[40px] !text-text"
            @click="deselectProduct(id)"
          />
        </div>
      </template>
    </ui-Table>
  </div>
</template>

<script setup lang="ts">
import { useCouponStore } from '@/stores/couponStore';
const emit = defineEmits(['delete']);
const t = useI18n();
const { data, loading } = useZarinLinkOverviewQuery();
const store = useCouponStore();
const filteredData = computed(
  () => data?.value?.filter(i => store.product.includes(String(i?.id)))
);
const deselectProduct = (value: string) => {
  emit('delete');
  const productIndex = store.product.findIndex(item => item === value);

  if (productIndex !== -1) {
    store.product.splice(productIndex, 1);
  }

  if (store.product.length === 0) {
    store.showToggleSelectedProduct = false;
  }
};
const columns = [
  {
    id: 1,
    label: t('_common.slug.payment_link'),
    name: 'title',
    width: '1fr',
  },
  {
    id: 2,
    label: '',
    name: 'action',
    width: '80px',
  },
];
</script>
