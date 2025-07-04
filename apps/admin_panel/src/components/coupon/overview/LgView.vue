<template>
  <ui-Modal
    close-icon
    :text="$t('_coupon.select_payment_link')"
    class="w-full lib-view lg:max-w-[992px] max-h-[700px] min-h-[65vh]"
    main-class="select-product"
    @close="$emit('close')"
  >
    <template #body>
      <div class="grid grid-cols-[265px_1fr] h-full">
        <!-- sidebar -->
        <div class="relative border-l border-border-soft overflow-auto overflow-x-hidden">
          <div class="w-[265px] space-y-md px-md py-md border-l border-border-soft">
            <ui-TextField
              v-model="store.searchText"
              :placeholder="$t('_form.search.title')"
              before-icon="Search"
              :after-icon="store.searchText ? 'DeleteFill' : ''"
              name="productSearch"
              class="search-input"
              :label="false"
              @update:model-value="searchHandler"
              @button-action="handleClear"
            />
            <div dir="ltr" class="mt-md">
              <div v-if="loading">
                <ui-NavLink v-for="i in 3" :key="i" :loading="loading" :label="i.toString()" />
              </div>
              <div v-else-if="!store.searchText">
                <ui-NavLink
                  v-for="i in navLinkValue"
                  :key="i.label"
                  :label="i.label"
                  :active="i.active"
                  @click="changeNavLink(i.value)"
                >
                  <template #meta>
                    <span class="text-caption-400-c1 text-text-soft">
                      {{ i.meta }}
                    </span>
                  </template>
                </ui-NavLink>
              </div>
            </div>
          </div>
        </div>

        <!-- content -->
        <div
          :class="{
            hidden: store.showToggleSelectedProduct,
            'pb-[96px]': selectedProductIds.length,
          }"
          class="overflow-auto space-y-xl px-2xl relative pt-md pb-2xl"
        >
          <ui-Skeleton v-if="loading" :width="120" :height="16" />
          <div v-else class="flex items-center h-[34px] mb-xl">
            <span v-if="store.searchText">
              {{ $t('_common.slug.search_for', { data: selectedLabel }) }}
            </span>
            <span v-else>{{ selectedLabel }}</span>
          </div>
          <div
            v-if="!loading && temp?.length === 0"
            class="border border-border-soft px-md py-2xl rounded-sm max-w-[648px]"
          >
            <ui-EmptyState
              v-if="_isEmpty(store.searchText)"
              :title="$t('_common.page_title.payment_links')"
              :description="$t('_common.pageHeading.payment_link_empty_description')"
              vector="ProductPaymentLink"
            />
            <ui-EmptyState
              v-else
              :title="$t('_common.empty.titleNoResult')"
              :description="$t('_common.empty.descriptionNoResult')"
              vector="NoResult"
            >
              <template #action>
                <div class="flex justify-center">
                  <ui-Button
                    after-icon="Trash"
                    :text="$t('_common.buttons.removeFilters')"
                    type="secondary"
                    @click="removeFilter"
                  />
                </div>
              </template>
            </ui-EmptyState>
          </div>
          <template v-else>
            <!-- table -->
            <ui-Table
              v-if="!store.showToggleSelectedProduct"
              :loading="loading"
              :columns="columns"
              :items="temp"
              :is-pointer="false"
              @click-row="checkedProduct"
            >
              <!-- mark header template -->
              <template #column-mark>
                <ui-Checkbox
                  label="label-lg"
                  :loading="loading"
                  :show-label="false"
                  :checked="isChecked"
                  :indeterminate="isIndeterminate"
                  :disabled="isDisabled"
                  class="ml-2xs"
                  name="selected"
                  @change="checker($event)"
                />
              </template>
              <!-- mark template -->
              <template #item-mark="{ id, selected, status }">
                <ui-Checkbox
                  :label="id"
                  :loading="loading"
                  :show-label="false"
                  :checked="selected"
                  :disabled="!!status"
                  class="ml-2xs"
                  :name="id"
                />
              </template>
              <!-- product template -->
              <template #item-title="{ title, image, id }">
                <div class="flex gap-sm items-center">
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
                  <div class="flex flex-col gap-2xs">
                    <span class="truncate max-w-[200px]">{{ title }}</span>
                    <span class="text-caption-400-c1 text-text-soft">#{{ id }}</span>
                  </div>
                </div>
              </template>
              <!-- amount header template -->
              <template #column-amount="header">
                <ui-Skeleton :loading="loading" :width="40" class="mt-2xs">
                  <div class="h-fit flex -mt-2xs md:w-5xl lg:w-6xl xl:w-full">
                    <span class="truncate text-text">{{ header.label }}</span>
                    <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs" />
                  </div>
                </ui-Skeleton>
              </template>
              <!-- status template -->
              <template #item-link="{ status }">
                <div class="h-fit">
                  <ui-Status
                    :text="statusHandler(status).text"
                    :type="statusHandler(status).type"
                  />
                </div>
              </template>
              <!-- loading template -->
              <template #loadingSkeleton>
                <div v-for="index in 5" :key="index" class="loading">
                  <div
                    class="grid border-t border-t-border-divider"
                    style="
                      grid-template-columns: 56px minmax(350px, 2fr) minmax(120px, 1fr) minmax(
                          120px,
                          1fr
                        );
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
          </template>
        </div>
      </div>
      <Transition name="slide">
        <CouponOverviewDropItems
          v-if="selectedProductIds.length"
          class="absolute !bottom-0 right-[297px] !w-[655px]"
          :class="store.showToggleSelectedProduct ? 'h-full top-[16px] ' : ''"
          @delete-all="deleteAll"
          @delete="deleteItem"
        />
      </Transition>
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
import { useProductFilter } from '@/composables/product/useProductFilter';
import { useProductOverviewColumn } from '@/composables/coupon/useProductOverviewColumn';
import { ZarinLinkTypeEnum } from '~/graphql/graphql';
const store = useCouponStore();
const emit = defineEmits(['close', 'select']);
const selectAction = () => {
  store.product = selectedProductIds.value;
  emit('select', store.product);
  emit('close');
};
const data = inject<Ref<FilteredDataTypeZarinLink[]>>('data');
const loading = inject('loading');
const disabledButton = ref(true);
const t = useI18n();
const { columns } = useProductOverviewColumn();
const { statusHandler } = useProductFilter();
const linkValue = ref<ZarinLinkTypeEnum | 'ALL'>('ALL');
const selectedProductIds = ref<string[]>([]);
interface ProductInDiscount extends FilteredDataTypeZarinLink {
  selected: boolean;
}
interface INavLinkValue {
  label: string;
  meta: string;
  active: boolean;
  value: ZarinLinkTypeEnum | 'ALL';
}
const temp = ref<ProductInDiscount[]>([]);
const origin = ref<ProductInDiscount[]>([]);
onMounted(() => {
  disabledButton.value = true;
  selectedProductIds.value = store.product;
  origin.value = normalizeData(data?.value ?? []);
  temp.value = origin.value;
});
const normalizeData = (data: FilteredDataTypeZarinLink[]) =>
  (data ?? []).map((item: FilteredDataTypeZarinLink) => {
    const isSelected = selectedProductIds.value.includes(item.id);
    const customClass = item.status ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

    return { ...item, selected: isSelected, class: customClass } as unknown as ProductInDiscount;
  });
const selectedLabel = computed(
  () => store.searchText || navLinkValue.value.find(i => i.value === linkValue.value)?.label
);
const navLinkValue = computed<INavLinkValue[]>(() => [
  {
    label: t('_coupon.all_links'),
    meta: `(${zarinLinkLength.value.ALL})`,
    active: linkValue.value === 'ALL',
    value: 'ALL',
  },
  {
    label: t('_coupon.all_product_links'),
    meta: `(${zarinLinkLength.value[ZarinLinkTypeEnum.Product]})`,
    active: linkValue.value === ZarinLinkTypeEnum.Product,
    value: ZarinLinkTypeEnum.Product,
  },
  {
    label: t('_coupon.all_event_links'),
    meta: `(${zarinLinkLength.value[ZarinLinkTypeEnum.Reservation]})`,
    active: linkValue.value === ZarinLinkTypeEnum.Reservation,
    value: ZarinLinkTypeEnum.Reservation,
  },
]);
const zarinLinkLength = computed(() => {
  const allLength = data?.value?.length;
  const eventLinkLength = data?.value.filter(item => item.type === ZarinLinkTypeEnum.Reservation)
    .length;
  const productLinkLength = data?.value.filter(item => item.type === ZarinLinkTypeEnum.Product)
    .length;

  return {
    ALL: allLength,
    [ZarinLinkTypeEnum.Reservation]: eventLinkLength,
    [ZarinLinkTypeEnum.Product]: productLinkLength,
  };
});
const isIndeterminate = computed(() => {
  const tempLength = temp.value.filter(item => item.selected === true).length;

  return tempLength !== temp.value.length && tempLength !== 0;
});
const isDisabled = computed(() => {
  const tempLength = temp.value.filter(item => !!item.status).length;

  return tempLength === temp.value.length && tempLength !== 0;
});
const isChecked = computed(() => {
  const tempLength = temp.value.filter(item => item.selected === true).length;

  return tempLength !== 0;
});
const checkedProduct = (item: ProductInDiscount) => {
  if (!!item.status) {
    return;
  }
  disabledButton.value = false;
  item.selected = !item.selected;
  fillProductIds();
};
const handleClear = () => {
  store.searchText = '';
  changeNavLink(linkValue.value);
};
const checker = (event: Event) => {
  if ((event.target as HTMLInputElement).checked) {
    temp.value.map(item => (!item.status ? (item.selected = true) : (item.selected = false)));
  } else {
    temp.value.map(item => (item.selected = false));
  }
  fillProductIds();
  disabledButton.value = !selectedProductIds.value.length;
};
const removeFilter = () => {
  store.searchText = '';
  changeNavLink(linkValue.value);
};
const changeNavLink = (item: ZarinLinkTypeEnum | 'ALL') => {
  linkValue.value = item;
  store.showToggleSelectedProduct = false;
  switch (linkValue.value) {
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
const fillProductIds = () => {
  const originData = [...origin.value];
  selectedProductIds.value = originData.filter(item => item.selected === true).map(i => i.id);
};
const searchHandler = () => {
  if (_isEmpty(store.searchText)) {
    changeNavLink(linkValue.value);

    return;
  }
  temp.value = origin?.value?.filter(i => i?.title?.includes(store.searchText));
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
watch(
  () => data?.value,
  () => {
    if (!data?.value) {
      return;
    }
    if (!!temp.value?.length) {
      return;
    }

    origin.value = normalizeData(data?.value);
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
  .input__inner__icon--after {
    @apply cursor-pointer text-text-soft;
  }
  .modal__body__slot {
    @apply relative;
  }
  .modal__footer {
    @apply z-10 bg-surface;
  }
  .input__inner--default {
    @apply border-border-divider;
  }
}
.select-product {
  @apply overflow-hidden;
  .modal__body__slot {
    @apply p-0;
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
</style>
