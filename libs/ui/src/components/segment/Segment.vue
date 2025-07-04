<template>
  <div class="segment">
    <div
      v-for="item in items"
      :key="item.id"
      class="flex rounded-sm p-2xs grow justify-center cursor-pointer"
      :class="[{ 'bg-surface shadow-elevation-50': modelValue === item.id }]"
      @click="onItemClick(item.id)"
    >
      <div class="text-text text-body-400-b2">{{ item.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Item {
  id: string | number;
  label: string;
}
export interface Props {
  items: Item[];
  modelValue: string | number;
}
withDefaults(defineProps<Props>(), {});
const emit = defineEmits(['update:modelValue']);
const onItemClick = (itemId: string | number) => {
  emit('update:modelValue', itemId);
};
</script>

<style lang="scss" scoped>
.segment {
  @apply rounded-sm bg-secondary p-2xs flex justify-between;
}
</style>
