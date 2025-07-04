<template>
  <div class="toast-box" dir="rtl">
    <div class="text-text-dark dark:text-primary">
      <slot>
        {{ contentItem }}
      </slot>
    </div>
    <Icon
      v-if="hasClose"
      name="Close"
      class="cursor-pointer w-md h-md text-text-dark dark:text-primary"
      @click="closeToast"
    />
  </div>
</template>
<script setup lang="ts">
import { toRefs } from 'vue';
import Icon from '../icon/Icon.vue';

export interface Props {
  contentItem: string;
  hasClose?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  contentItem: '',
  hasClose: false,
});
const { contentItem, hasClose } = toRefs(props);
const emits = defineEmits(['close']);
const closeToast = () => {
  emits('close');
};
</script>
<style lang="scss">
@use './toast.scss';
</style>
