<template>
  <button class="root" :class="{ 'cursor-not-allowed': disabled }">
    <div
      class="root__item"
      :class="[
        !arrow && !label ? 'justify-center' : 'justify-between',
        disabled ? 'text-text-disabled' : '',
      ]"
    >
      <div class="root__item__end">
        <div v-if="arrow" class="root__item__arrow">
          <Skeleton v-if="loading" class="mt-2xs" :width="24" :height="24" />
          <Icon v-else name="AngleLeft" :class="{ active }" />
        </div>
        <div v-if="$slots.meta">
          <slot name="meta" />
        </div>
      </div>
      <div class="root__item__start">
        <div v-if="label" :class="labelClasses">
          <Skeleton v-if="loading" class="mb-sm" />
          <span v-else dir="rtl" class="root__item__start--label" :class="[active ? 'active' : '']">
            {{ label }}
          </span>
          <template v-if="status">
            <Skeleton v-if="loading" :width="58" :height="24" radius="lg" />
            <Status v-else class="h-fit" :text="status.text" :type="status.type" />
          </template>
          <template v-if="subText">
            <Skeleton v-if="loading" />
            <span v-else class="text-body-400-b3 text-text-soft text-right" dir="rtl">
              {{ subText }}
            </span>
          </template>
        </div>
        <div v-if="icon" class="flex items-center">
          <Skeleton v-if="loading" :width="24" :height="24" />
          <Icon v-else :name="icon" :class="{ active }" />
        </div>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import Icon from '../icon/Icon.vue';
import Skeleton from '../skeleton/Skeleton.vue';
import Status from '../status/Status.vue';

export interface Props {
  icon?: string;
  label?: string;
  subText?: string;
  arrow?: boolean;
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
  status?: {
    type: string;
    text: string;
    isHorizontal?: boolean;
  };
}
const props = withDefaults(defineProps<Props>(), {
  arrow: true,
  active: false,
  disabled: false,
  icon: '',
  label: '',
  subText: '',
  status: undefined,
});
const { status } = toRefs(props);
const labelClasses = computed(() => [
  'flex',
  !status?.value?.isHorizontal
    ? 'flex-col items-end justify-between gap-xs'
    : 'items-center gap-sm flex-row-reverse',
]);
</script>

<style lang="scss" scoped>
@use './navLink.scss';
</style>
