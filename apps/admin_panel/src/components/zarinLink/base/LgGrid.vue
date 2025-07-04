<template>
  <div>
    <ZarinLinkBaseEmptyGrid v-if="!loading && data && data?.length === 0" />
    <ui-Table
      v-else-if="data || loading"
      :columns="columns"
      :items="data"
      :is-pointer="false"
      :loading="loading"
      @hover-row="eventHandler"
    >
      <!-- product template -->
      <template #item-title="{ title, image, id, type }">
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
          <ui-Avatar v-else shape="square" :type="getImageNameHandler(type)" />
          <div class="flex flex-col gap-2xs">
            <span class="title">{{ title }}</span>
            <span class="text-caption-400-c1 text-text-soft">{{
              getDescriptionHandler(id, type)
            }}</span>
          </div>
        </div>
      </template>
      <!-- amount header template -->
      <template #column-amount="header">
        <ui-Skeleton :loading="loading" :width="60" class="mt-2xs">
          <div class="h-fit flex -mt-2xs md:w-5xl lg:w-6xl xl:w-full">
            <span class="truncate text-text">{{ header.label }}</span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs" />
          </div>
        </ui-Skeleton>
      </template>
      <!-- amount template -->
      <template #item-amount="{ amount, amount_type }">
        <div
          :class="{
            'h-fit': true,
            'text-text-disabled': amount_type === ZarinLinkAmountTypeEnum.Optional,
          }"
        >
          {{
            amount_type === ZarinLinkAmountTypeEnum.Optional ? $t('_zarin_link.by_payer') : amount
          }}
        </div>
      </template>
      <!-- status template -->
      <template #item-status="{ status }">
        <div class="h-fit">
          <ui-Status :text="statusHandler(status).text" :type="statusHandler(status).type" />
        </div>
      </template>
      <!-- type template -->
      <template #item-limit="{ limit, type }">
        <div :class="getLimitClassHandler(limit)">{{ getLimitHandler(limit, type) }}</div>
      </template>
      <!-- action template -->
      <template #item-action="{ status, id, type }">
        <div class="flex justify-end">
          <ui-Action
            :id="id"
            v-model:eventType="eventType"
            :selected-id="idValue"
            :limit="2"
            :items="actionHandle(status, id, activeTerminal, callbackAction, type)"
            dir="rtl"
            @id-value="idValueHandler"
          />
        </div>
      </template>
      <!-- loading template -->
      <template #loadingSkeleton>
        <div v-for="index in pageSize" :key="index" class="loading">
          <div
            class="grid border-t border-t-border-divider px-sm"
            style="
              grid-template-columns:
                minmax(300px, 2fr) minmax(100px, 10rem) minmax(100px, 10rem) minmax(60px, 10rem)
                80px;
            "
          >
            <div class="flex items-center">
              <ui-Skeleton :width="40" :height="40" class="pl-sm pr-xs" />
              <div>
                <ui-Skeleton :width="110" :height="12" class="py-sm" />
                <ui-Skeleton :width="60" :height="12" />
              </div>
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="110" :height="12" class="pl-lg pr-[28px] py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="60" :height="12" class="pl-md pr-[28px] py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="60" :height="12" class="pl-md pr-[28px] py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="32" :height="32" class="px-md py-md" />
            </div>
          </div>
        </div>
      </template>
    </ui-Table>
    <ZarinLinkBaseNoResult v-if="!loading && !data" />
  </div>
</template>

<script setup lang="ts">
import {
  ProductFormType,
  NewZarinLinkType,
  ZarinLinkTypeEnum,
  ZarinLinkAmountTypeEnum,
} from '@/graphql/graphql';
import { useZarinLinkColumns } from '@/composables/zarinlink/useZarinLinkColumns';
import { useZarinLinkFilter } from '@/composables/zarinlink/useZarinLinkFilter';
import { useZarinLinkAction } from '@/composables/zarinlink/useZarinLinkAction';

const config = useRuntimeConfig();
const { actionHandle } = useZarinLinkAction();
const route = useRoute();
const t = useI18n();
const { statusHandler } = useZarinLinkFilter();
const { columns } = useZarinLinkColumns();
const { activeTerminal } = useTerminalQuery();
// const activeTerminal = computed(() => terminalSelected.value && terminalSelected.value[0]);
const data = inject<NewZarinLinkType[]>('zarinLinks');
const loading = inject<boolean>('zarinLinksLoading');
const idValue = ref();
const eventType = ref();
const idValueHandler = (value: string) => {
  idValue.value = value;
};
const callbackActionInjection = inject<((id: string, type: string) => void) | undefined>(
  'zarinLinkCallbackAction'
);
const callbackAction = (id: NewZarinLinkType['id'], type: string) => {
  if (callbackActionInjection) {
    callbackActionInjection(id, type);
  }
};
const eventHandler = (event: MouseEvent, item: ProductFormType) => {
  eventType.value = { event: event.type, uniqueId: item.id };
};
const pageSize = computed(() => Number(route.query.pageSize) || config.public.pageSize);
const getDescriptionHandler = (id: string, type: ZarinLinkTypeEnum) =>
  `${id}  • ${t(`_common.status.zarin_link_prefix.${type}`)}`;
const getImageNameHandler = (type: ZarinLinkTypeEnum) => {
  switch (type) {
    case ZarinLinkTypeEnum.Reservation:
      return 'EventLink';
    case ZarinLinkTypeEnum.Payment:
      return 'TakePaymentLink';
    case ZarinLinkTypeEnum.Subscription:
      return 'DonationLink';
    default:
      return 'Box';
  }
};
const getLimitClassHandler = (limit: number) => ({
  'h-fit': true,
  'text-text-disabled': limit === null,
  'text-text-warning': limit !== null && limit <= 0,
});
const getLimitHandler = (limit: number, type: ZarinLinkTypeEnum) => {
  let limitValue: string | number = '';

  if (limit === null) {
    limitValue = t('_common.slug.not_specified');
  } else {
    limitValue = limit > 0 ? limit : t('_product.entity_limit');
  }

  switch (type) {
    case ZarinLinkTypeEnum.Payment:
      return '--';
    case ZarinLinkTypeEnum.Subscription:
      return '--';
    default:
      return limitValue;
  }
};
</script>

<style lang="scss" scoped>
.title {
  @apply truncate w-full sm:max-w-[250px] md:max-w-[150px] lg:max-w-[180px] 2xl:max-w-[250px];
}
</style>
