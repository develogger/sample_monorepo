<template>
  <div class="bank-card">
    <!-- isDefault section -->
    <div
      v-if="isDefault"
      class="bank-card__is-default"
      :style="{
        'box-shadow': `inset 4px 4px 0px 0px ${cardHandler(
          logo ?? ''
        )} ,inset -4px 4px 0px 0px ${cardHandler(logo ?? '')}`,
      }"
    >
      &nbsp;
    </div>
    <!-- iban & logo section -->
    <div
      class="bank-card__main"
      :class="{
        'bank-card__main--not-default': !isDefault,
        'bank-card__main--is-default': isDefault,
        'bank-card__main--no-items': !items,
        'bank-card__main--items': items,
      }"
    >
      <Skeleton v-if="loading" :width="40" :height="40" class="mt-2xs" />
      <div v-else class="bank-card__main__logo">
        <BankLogo :name="logo ?? ''" class="w-[24px] -mt-[1px]" />
      </div>
      <div>
        <Skeleton v-if="loading" :width="200" :height="12" class="mt-2xs" />
        <div v-else class="bank-card__main__iban">{{ iban ?? '' }}</div>
        <div class="bank-card__main__description">
          <Skeleton v-if="loading" :width="80" :height="12" class="mt-2xs" />
          <slot v-else name="description">
            {{ description }}
          </slot>
        </div>
      </div>
      <div v-if="loading" class="flex justify-between w-full mt-lg">
        <Skeleton :height="12" class="mt-2xs" />
        <Skeleton :width="80" :height="12" class="mt-2xs" />
      </div>
      <div v-if="loading" class="flex justify-between w-full">
        <Skeleton :width="60" :height="12" class="mt-2xs" />
        <Skeleton :width="130" :height="12" class="mt-2xs" />
      </div>
    </div>
    <!-- rows -->
    <div v-if="items" class="bank-card__rows">
      <div v-for="item in items" :key="item.id" class="">
        <slot :name="`item(${item.id})`">
          <div class="bank-card__rows__inner">
            <Skeleton v-if="loading" :width="80 / +item.id" :height="12" class="mt-2xs" />
            <div v-else class="bank-card__rows__inner__label">{{ item.label }}</div>
            <Skeleton v-if="loading" :width="80 * +item.id" :height="12" class="mt-2xs" />
            <div v-else class="bank-card__rows__inner__value" dir="rtl">{{ item.value }}</div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BankLogo from '../bankLogo/BankLogo.vue';
import Skeleton from '../skeleton/Skeleton.vue';
import bankCard from './bankCard';

export interface Props {
  iban: string | undefined;
  logo: string | undefined;
  loading?: boolean;
  description?: string;
  isDefault?: boolean;
  items?: [
    {
      id: string | number;
      label: string;
      value: string;
    },
  ];
}
withDefaults(defineProps<Props>(), {
  description: '',
  items: undefined,
});
const { cardHandler } = bankCard();
</script>

<style lang="scss" scoped>
@use './bankCard.scss';
</style>
