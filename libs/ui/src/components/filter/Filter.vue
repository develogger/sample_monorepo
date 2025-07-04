<template>
  <div class="relative">
    <div>
      <Icon
        v-if="value"
        name="DeleteFill"
        class="icon--with-value icon--shared"
        @click="$emit('clear')"
      />
      <Icon
        v-else
        name="AngleDown"
        width="24"
        height="24"
        class="icon--default icon--shared mr-2xs"
        @click="toggleCard"
      />
    </div>
    <Tippy
      ref="tippyRef"
      :content="content"
      :arrow="false"
      interactive
      :offset="[0, -5]"
      placement="bottom-end"
      trigger="click"
    >
      <button
        class="filter"
        :class="value ? 'filter--with-value' : 'filter--default'"
        @click="closeCard"
      >
        <div :class="value ? 'filter__inner--with-value' : 'filter__inner--default'">
          <div :class="value ? 'mr-sm' : 'mr-[20px]'">&nbsp;</div>
          <div>{{ value || placeholder }}</div>
        </div>
      </button>
    </Tippy>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue';
import { Tippy } from 'vue-tippy';
import Icon from '../icon/Icon.vue';

export interface Props {
  content: Element;
  placeholder: string;
  value: string | undefined;
}
const emits = defineEmits(['clear', 'close']);
const props = withDefaults(defineProps<Props>(), {});
const tippyRef = ref<typeof Tippy>();
const { value } = toRefs(props);
onMounted(() => {
  emits('close', tippyRef.value?.hide);
});
const closeCard = () => {
  emits('close', tippyRef.value?.hide);
};
const toggleCard = () => {
  tippyRef.value?.state && tippyRef.value?.state.isShown
    ? emits('close', tippyRef.value?.hide)
    : tippyRef.value?.show();
};
defineExpose({ tippyRef });
</script>

<style lang="scss" scoped>
@use './filter.scss';
</style>
