<template>
  <div class="clip-board" dir="rtl" @click="copy">
    <span v-if="title" class="clip-board__title">
      {{ title }}
    </span>
    <Tooltip
      ref="tooltip"
      class="w-full"
      trigger="click"
      :duration="[1000, 1000]"
      content="کپی شد"
      position="top"
    >
      <div class="clip-board__main">
        <div class="clip-board__main--actions">
          <Button type="secondary" icon="Copy" />
          <Divider v-if="hasArrow" type="vertical" class="mx-xs" />
          <Button v-if="hasArrow" type="secondary" icon="ArrowTopRight" @click="$emit('newTab')" />
        </div>
        <span dir="ltr" class="clip-board__main--link">
          {{ content }}
        </span>
      </div>
    </Tooltip>
  </div>
</template>
<script setup lang="ts">
import { toRefs, ref } from 'vue';
import Divider from '../divider/Divider.vue';
import Tooltip from '../tooltip/Tooltip.vue';
import Button from '../button/Button.vue';

export interface Props {
  title?: string;
  hasArrow?: boolean;
  content?: string;
  width?: number;
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  hasArrow: false,
  content: '',
  width: 356,
});
const { content, hasArrow, title } = toRefs(props);
const tooltip = ref();
const emits = defineEmits(['newTab', 'copy']);
const copy = () => {
  navigator.clipboard.writeText(content.value);
  setTimeout(() => {
    tooltip.value && tooltip.value.hide();
  }, 2000);
  emits('copy');
};
</script>
<style lang="scss" scoped>
@use './clipBoard.scss';
</style>
