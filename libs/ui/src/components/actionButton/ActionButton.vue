<template>
  <div>
    <Tippy
      ref="tippyRef"
      class="w-fit"
      :content="content"
      :arrow="false"
      interactive
      :offset="[0, 5]"
      placement="bottom-end"
      trigger="click"
    >
      <Button
        v-if="!$slots.default"
        type="tertiary"
        size="small"
        variant="outlined"
        :text="value"
        before-icon="AngleDown"
        @click="closeCard"
      />
      <slot v-else />
    </Tippy>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Tippy } from 'vue-tippy';
import Button from '../button/Button.vue';

export interface Props {
  content: Element;
  value: string | undefined;
}
const emits = defineEmits(['clear', 'close']);
withDefaults(defineProps<Props>(), {});
const tippyRef = ref<typeof Tippy>();
const closeCard = () => {
  emits('close', tippyRef.value?.hide);
};
defineExpose({ tippyRef });
</script>

<style lang="scss" scoped>
.root {
  @apply bg-surface font-yekanFa;
}
</style>
