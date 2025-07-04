<template>
  <div v-if="show" dir="rtl" :class="typeOfInlineMessage.type">
    <Icon v-if="showIcon" name="Warning" :class="typeOfInlineMessage.icon" />
    <div class="inline-msg-main">
      <div class="inline-msg-header">
        <div class="inline-msg-title">
          {{ title }}
        </div>
        <Icon v-if="toggle" name="Delete" @click="showAlertHandler" />
      </div>
      <div v-if="description" class="inline-msg-des" :class="[title ? 'mt-xs' : '']">
        {{ description }}
      </div>
      <div v-if="$slots.description" class="inline-msg-des">
        <slot name="description" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs, toValue } from 'vue';
import Icon from '../icon/Icon.vue';
const show = ref(true);
export interface Props {
  title?: string;
  toggle?: boolean;
  type?: 'neutral' | 'informative' | 'negative' | 'positive' | 'warning';
  description?: string;
  showIcon?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  toggle: false,
  type: 'neutral',
  title: '',
  description: '',
  showIcon: true,
});
const { toggle, type } = toRefs(props);
const showAlertHandler = () => {
  show.value = false;
};
const typeHandler = (value: Props['type']) => {
  switch (value) {
    case 'informative':
      return {
        type: 'inline-msg--informative',
        icon: 'inline-msg--informative__icon',
      };
    case 'negative':
      return {
        type: 'inline-msg--negative',
        icon: 'inline-msg--negative__icon',
      };
    case 'warning':
      return {
        type: 'inline-msg--warning',
        icon: 'inline-msg--warning__icon',
      };
    case 'positive':
      return {
        type: 'inline-msg--positive',
        icon: 'inline-msg--positive__icon',
      };
    default:
      return {
        type: 'inline-msg--neutral',
        icon: 'inline-msg--neutral__icon',
      };
  }
};
const useType = (props: Props['type']) => {
  const typeValues = ref<{ [key: string]: string }>({
    type: 'inline-msg--neutral',
    icon: 'inline-msg--neutral__icon',
  });

  typeValues.value = typeHandler(props);

  return { type: typeValues };
};
const { type: typeOfInlineMessage } = useType(toValue(type));
</script>

<style lang="scss" scoped>
@use './inlineMessage.scss';
</style>
