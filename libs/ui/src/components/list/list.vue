<template>
  <div class="root" :style="{ width: width + 'px' }" dir="rtl">
    <div
      v-for="i in data"
      :key="i.id"
      dir="ltr"
      class="root__item"
      @click="onClick(i.id, i.value, i.action)"
    >
      {{ i.value }}
      <Icon v-if="i.icon" :name="i.icon" class="root__item__icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../icon/Icon.vue';

export interface Data {
  action?: (id: number | string, value: number | string) => void;
  icon?: string;
  id: number | string;
  value: number | string;
}
export interface Props {
  data: Data[];
  width?: null | number;
}
withDefaults(defineProps<Props>(), {
  width: null,
});
const emit = defineEmits(['action']);
const onClick = (
  id: number | string,
  value: string | number,
  action: ((id: string | number, value: string | number) => void) | undefined
) => {
  if (action) {
    action(id, value);
  }
  emit('action', id, value);
};
</script>

<style lang="scss" scoped>
@use './list.scss';
</style>
