<template>
  <div class="tab" :class="styleValue">
    <button
      v-for="item in items"
      :key="item.value"
      :class="[
        !item.loading
          ? item.value === modelValue
            ? 'tab__button--active'
            : 'tab__button--hover'
          : '',
        isBlock,
      ]"
      class="tab__button"
      @click="onChange(item)"
    >
      <Skeleton v-if="item.loading" :width="56" :height="12" />
      <span
        v-else
        class="flex items-center justify-center text-body-400-b2"
        :class="item.isNotif ? ' tab__button--label' : ''"
      >
        {{ item.label }}
      </span>
    </button>
  </div>
</template>
<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import Skeleton from '../skeleton/Skeleton.vue';
interface tabModel {
  value: string;
  label: string;
  isActive?: boolean;
  isNotif?: boolean;
  loading?: boolean;
  hasBorder?: boolean;
}
export interface Props {
  items: tabModel[];
  modelValue: string | number;
  align?: 'end' | 'start';
  block?: boolean;
  hasBorder?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  align: 'end',
  block: false,
  hasBorder: false,
});
const emit = defineEmits(['update:modelValue']);
const { align, modelValue, items, block, hasBorder } = toRefs(props);
const styleValue = computed(() => {
  let style = '';
  if (block.value) {
    style = style.concat(' ', 'justify-between');
  } else {
    style = style.concat(' ', `justify-${align.value}`);
  }
  if (hasBorder.value) {
    style = style.concat(' ', 'border-b border-border-divider');
  }

  return style;
});
const isBlock = computed(() => (block.value ? 'w-full' : ''));
const onChange = (item: tabModel) => {
  emit('update:modelValue', item.value);
};
</script>
<style lang="scss" scoped>
@use './tab.scss';
</style>
