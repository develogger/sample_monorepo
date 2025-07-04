<template>
  <div>
    <ZarinLinkBaseMdGridLoading v-if="loading" />
    <ZarinLinkBaseEmptyGrid v-if="!loading && data && data?.length === 0" />
    <div v-else-if="data && !loading">
      <ui-TableCard v-for="i in data" :id="i.id" :key="i.id" class="root">
        <template #header>
          <div class="root__header">
            <!-- product column -->
            <div class="root__header--id">
              <ui-Skeleton :loading="loading" :width="104" class="mt-2xs">
                <div class="flex gap-sm items-center">
                  <div
                    v-if="i.image"
                    class="h-[40px] w-[40px] max-h-[40px] border border-border-soft rounded-md relative overflow-hidden"
                  >
                    <NuxtImg
                      :src="i.image"
                      :alt="i.title"
                      width="100%"
                      height="100%"
                      fit="containt"
                      :placeholder="[40, 40]"
                      loading="lazy"
                      class="rounded-md h-full object-cover w-full"
                    />
                  </div>
                  <ui-Avatar v-else shape="square" :type="getImageNameHandler(i?.type)" />
                  <div class="space-y-2xs">
                    <div class="truncate sm:max-w-[300px] max-w-[150px]">
                      {{ i.title }}
                    </div>
                    <div class="text-caption-400-c1 text-text-soft">
                      {{ getDescriptionHandler(i?.id, i?.type) }}
                    </div>
                  </div>
                </div>
              </ui-Skeleton>
            </div>
            <!-- status column -->
            <div class="root__header--status">
              <ui-Status
                :text="statusHandler(i?.status as unknown as string).text"
                :type="statusHandler(i?.status as unknown as string).type"
              />
            </div>
          </div>
        </template>
        <template #main>
          <!-- amount column -->
          <div class="root__main--title">
            <div class="root__main--title__label">
              {{ columns[1].label }}
            </div>
            <div
              :class="[
                'root__main--title__title',
                i?.amount_type === ZarinLinkAmountTypeEnum.Optional ? '!text-text-disabled' : '',
              ]"
            >
              {{
                i?.amount_type === ZarinLinkAmountTypeEnum.Optional
                  ? $t('_zarin_link.by_payer')
                  : i?.amount
              }}
              <ui-Label
                v-if="i?.amount_type !== ZarinLinkAmountTypeEnum.Optional"
                :text="$t('_common.currency.rial')"
                type="neutral"
              />
            </div>
          </div>
          <ui-Divider />
          <!-- created_at column -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[3].label }}
            </div>
            <div class="root__main--title__title">
              {{ i?.created_at }}
            </div>
          </div>
          <!-- limit column -->
          <div class="root__main--title mt-sm">
            <div class="root__main--title__label">
              {{ columns[2].label }}
            </div>
            <div :class="getLimitClassHandler(i?.limit)">
              {{ getLimitHandler(i?.limit, i?.type) }}
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex justify-end">
            <!-- details & actions -->
            <div class="mt-sm">
              <ui-Action
                v-model:eventType="eventType"
                :limit="2"
                :items="actionHandle(i.status, i.id, activeTerminal, callbackAction, i.type)"
                dir="rtl"
              />
            </div>
          </div>
        </template>
      </ui-TableCard>
    </div>
    <ZarinLinkBaseNoResult v-if="!loading && !data" />
  </div>
</template>

<script setup lang="ts">
import { useTerminalQuery } from '@/composables/terminal/useTerminalQuery';
import { useZarinLinkAction } from '~/composables/zarinlink/useZarinLinkAction';
import { useZarinLinkFilter } from '~/composables/zarinlink/useZarinLinkFilter';
import { FilteredDataTypeZarinLink } from '~/composables/zarinlink/useZarinLinkQuery';
import { ZarinLinkTypeEnum, ZarinLinkAmountTypeEnum } from '~/graphql/graphql';
const data = inject<FilteredDataTypeZarinLink[]>('zarinLinks');
const loading = inject<boolean>('zarinLinksLoading');
const callbackActionInjection = inject<((id: string, type: string) => void) | undefined>(
  'zarinLinkCallbackAction'
);
const t = useI18n();
const { columns } = useZarinLinkColumns();
const { actionHandle } = useZarinLinkAction();
const { statusHandler } = useZarinLinkFilter();
const { activeTerminal: terminalSelected } = useTerminalQuery();
const eventType = ref<string>();
const activeTerminal = computed(() => terminalSelected.value);
const callbackAction = (id: FilteredDataTypeZarinLink['id'], type: string) => {
  if (callbackActionInjection) {
    callbackActionInjection(id, type);
  }
};
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
const getLimitClassHandler = (limit: number) => [
  'root__main--title__title',
  limit === null ? '!text-text-disabled' : '',
  limit !== null && limit <= 0 ? '!text-text-warning' : '',
];
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
.root {
  @apply mt-md;
  &__header {
    @apply flex justify-between items-center;
    &--id {
      @apply flex items-center;
      &__text {
        @apply text-text pl-sm  text-heading-600-h2 font-medium;
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
