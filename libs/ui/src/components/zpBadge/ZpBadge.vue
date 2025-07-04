<template>
  <div class="zp" :class="levelClass" dir="rtl">
    <Icon name="Premium" class="text-[20px] text-white text-opacity-20" />
    <span> ZP.{{ id }} </span>
  </div>
</template>
<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import Icon from '../icon/Icon.vue';

export interface Props {
  level: string;
  id?: number | string;
}
const props = withDefaults(defineProps<Props>(), {
  id: '',
});
const { level, id } = toRefs(props);
const levelClass = computed(() => {
  switch (level.value) {
    case 'BASIC':
      return 'zp--basic';
    case 'GOLD':
      return 'zp--gold';
    case 'NEW':
      return 'zp--new';
    case 'SILVER':
      return 'zp--silver';
    case 'BLUE':
      return 'zp--blue';
  }

  return '';
});
</script>
<style lang="scss" scoped>
@use './zpBadge.scss';
</style>
