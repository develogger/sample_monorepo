<template>
  <ui-Modal
    close-icon
    :text="$t('_coupon.select_payment_link')"
    class="w-full lib-view h-full lg:max-w-[992px] lg:max-h-[700px]"
    @close="$emit('close')"
  >
    <template #body>
      <div class="lib-view__body">
        <ui-TextField
          v-if="!store.showToggleSelectedProduct || !selectedProductIds.length"
          v-model="store.searchText"
          class="search-input"
          :placeholder="$t('_form.search.title')"
          before-icon="Search"
          name="productSearch"
          :after-icon="store.searchText ? 'DeleteFill' : ''"
          @button-action="handleClear"
          @update:model-value="searchHandler"
        />
        <CouponOverviewTabs
          v-if="!store.showToggleSelectedProduct || !selectedProductIds.length"
          :data="temp"
          :tabs="tabs"
          @select="selectHandler"
          @remove-filter="removeFilter"
          @change-tab="(item: ZarinLinkTypeEnum | 'ALL') => changeTab(item)"
        />
        <Transition name="slide">
          <CouponOverviewDropItems
            v-if="selectedProductIds.length"
            class="fixed bottom-[73px] w-[calc(100%-40px)]"
            :class="store.showToggleSelectedProduct ? '!-bottom-[27px] overflow-auto' : ''"
            @delete-all="deleteAll"
            @delete="deleteItem"
          />
        </Transition>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-xs w-full">
        <ui-Button :text="$t('_common.buttons.cancel')" type="secondary" @click="$emit('close')" />
        <ui-Button
          :text="$t('_common.buttons.select')"
          :disabled="disabledButton || selectedProductIds.length === 0"
          @click="selectAction"
        />
      </div>
    </template>
  </ui-Modal>
</template>

<script setup lang="ts">
import { useCouponStore } from '@/stores/couponStore';
import { ZarinLinkTypeEnum } from '~/graphql/graphql';
const store = useCouponStore();
const emit = defineEmits(['close', 'select']);
const t = useI18n();
const tab = ref<ZarinLinkTypeEnum | 'ALL'>('ALL');
const data = inject<Ref<FilteredDataTypeZarinLink[]>>('data');
const disabledButton = ref(true);
const selectedProductIds = ref<string[]>([]);
interface ProductInDiscount extends FilteredDataTypeZarinLink {
  selected: boolean;
}
interface ITabValue {
  label: string;
  value: ZarinLinkTypeEnum | 'ALL';
}
const temp = ref<ProductInDiscount[]>([]);
const origin = ref<ProductInDiscount[]>([]);
const zarinLinkLength = computed(() => {
  const allLength = data?.value?.length;
  const eventLinkLength = data?.value?.filter(item => item.type === ZarinLinkTypeEnum.Reservation)
    .length;
  const productLinkLength = data?.value?.filter(item => item.type === ZarinLinkTypeEnum.Product)
    .length;

  return {
    ALL: allLength,
    [ZarinLinkTypeEnum.Reservation]: eventLinkLength,
    [ZarinLinkTypeEnum.Product]: productLinkLength,
  };
});
const tabs = computed<ITabValue[]>(() => [
  {
    label: `${t('_coupon.all_links')} (${zarinLinkLength.value.ALL ?? 0})`,
    value: 'ALL',
  },
  {
    label: `${t('_coupon.all_product_links')} (${
      zarinLinkLength.value[ZarinLinkTypeEnum.Product] ?? 0
    })`,
    value: ZarinLinkTypeEnum.Product,
  },
  {
    label: `${t('_coupon.all_event_links')} (${
      zarinLinkLength.value[ZarinLinkTypeEnum.Reservation] ?? 0
    })`,
    value: ZarinLinkTypeEnum.Reservation,
  },
]);
onMounted(() => {
  disabledButton.value = true;
  selectedProductIds.value = store.product;
  origin.value = normalizeData(data?.value ?? []);
  temp.value = origin.value;
});
const selectAction = () => {
  store.product = selectedProductIds.value;
  emit('select', store.product);
  emit('close');
};
const fillProductIds = () => {
  const originData = [...origin.value];
  selectedProductIds.value = originData?.filter(item => item.selected === true).map(i => i.id);
};
const selectHandler = (item: ProductInDiscount) => {
  disabledButton.value = false;
  item.selected = !item.selected;
  fillProductIds();
};
const deleteAll = () => {
  origin.value.map(item => (item.selected = false));
  temp.value.map(item => (item.selected = false));
  fillProductIds();
};
const deleteItem = (value: string) => {
  const item = origin.value?.find(i => i.id === value);
  if (!item) {
    return;
  }
  item.selected = false;
  fillProductIds();
};
const normalizeData = (data: FilteredDataTypeZarinLink[]) =>
  (data ?? []).map((item: FilteredDataTypeZarinLink) => {
    const isSelected = selectedProductIds.value.includes(item.id);

    return { ...item, selected: isSelected } as unknown as ProductInDiscount;
  });
const changeTab = (item: ZarinLinkTypeEnum | 'ALL') => {
  tab.value = item;
  store.showToggleSelectedProduct = false;
  switch (tab.value) {
    case ZarinLinkTypeEnum.Product:
      temp.value = origin?.value?.filter(i => i?.type === ZarinLinkTypeEnum.Product);
      break;
    case ZarinLinkTypeEnum.Reservation:
      temp.value = origin?.value?.filter(i => i?.type === ZarinLinkTypeEnum.Reservation);
      break;
    default:
      temp.value = origin?.value;
  }
};
const handleClear = () => {
  store.searchText = '';
  changeTab(tab.value);
};
const searchHandler = () => {
  if (_isEmpty(store.searchText)) {
    changeTab(tab.value);

    return;
  }
  temp.value = origin?.value?.filter(i => i?.title?.includes(store.searchText));
};
const removeFilter = () => {
  store.searchText = '';
  changeTab(tab.value);
};
watch(
  () => data?.value,
  () => {
    if (!data?.value) {
      return;
    }
    if (!!temp.value?.length) {
      return;
    }

    origin.value = normalizeData(data?.value ?? []);
    temp.value = origin.value;
  }
);
provide('selected_product_ids', selectedProductIds);
</script>

<style lang="scss">
.lib-view {
  &__body {
    @apply space-y-md;
  }
  .modal__body {
    @apply relative h-[calc(100vh-56px)] lg:h-[69.5vh];
  }
  .modal__body__slot {
    @apply relative lg:h-full;
  }
  .modal__footer {
    @apply z-10 bg-surface;
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}
.search-input {
  input {
    @apply py-2xs pr-0 #{!important};
  }
  .input__inner__icon--before {
    @apply my-2xs ml-2xs;
  }
  .input__inner__icon--after {
    @apply my-2xs ml-2xs;
  }
}
</style>
