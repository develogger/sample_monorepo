<template>
  <div dir="rtl" class="checkbox">
    <label :for="`${label}--id`" class="label-checkbox">
      <Skeleton :loading="loading" :width="20" :height="20">
        <input
          :checked="isChecked"
          :class="{ indeterminate }"
          type="checkbox"
          :disabled="disabled"
          @change="handleCheckbox"
        />
      </Skeleton>
      <Skeleton
        v-if="loading && showLabel"
        :loading="loading && Boolean(label)"
        :width="96"
        class="mx-xs"
      />
      <span v-else-if="showLabel" class="px-xs" :class="{ 'text-text-disabled': disabled }">
        {{ label }}
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, toRefs, onMounted } from 'vue';
import { useField } from 'vee-validate';
import Skeleton from '../skeleton/Skeleton.vue';

export interface Props {
  label?: string;
  name: string;
  disabled?: boolean;
  loading?: boolean;
  showLabel?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  showLabel: true,
  label: '',
});
const emits = defineEmits(['update:modelValue']);
const isChecked = ref();
const { checked } = toRefs(props);
const { handleChange } = useField(() => props.name, undefined, {
  syncVModel: true,
});
const handleCheckbox = (event: Event) => {
  const target = event.target as HTMLInputElement;
  isChecked.value = target.checked;
  handleChange(target.checked);
  emits('update:modelValue', target.checked);
};
onMounted(() => {
  isChecked.value = checked.value;
  handleChange(isChecked.value);
});
watch(checked, value => {
  isChecked.value = value;
  handleChange(value);
});
</script>

<style lang="scss" scoped>
.checkbox {
  @apply flex items-center;

  .label-checkbox {
    @apply text-text text-body-400-b2 flex items-center cursor-pointer;
  }
  input[type='checkbox'] {
    @apply appearance-none w-lg h-lg border-border border-2 rounded-sm grid content-center cursor-pointer bg-surface;
    @apply hover:bg-surface-hover;
    @apply disabled:bg-surface focus:border-2 disabled:border-border-disabled;
    @apply focus-visible:outline-none focus-visible:border-2 focus-visible:ring-interactive-focus focus-visible:ring-offset-1 focus-visible:ring-2;
    &:disabled {
      @apply cursor-not-allowed;
    }
    &::before {
      @apply w-lg h-lg rounded-sm scale-0;
      content: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20.000000000000004' height='20.000000000000004' fill='none'><path id='svg_2' stroke-linejoin='round' stroke-linecap='round' stroke-width='1.5' stroke='white' d='m14,7l-4.99628,6l-3.00372,-3.00372'/></svg>");
      // content: url("data:image/svg+xml;utf8,<svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M5.25002 12.0001C5.25002 11.5858 5.5858 11.2501 6.00002 11.2501H18C18.4142 11.2501 18.75 11.5858 18.75 12.0001C18.75 12.4143 18.4142 12.7501 18 12.7501H6.00002C5.5858 12.7501 5.25002 12.4143 5.25002 12.0001Z' fill='white'/></svg>");
      box-shadow: inset -2em 1em #0a33ff;
    }
    &.indeterminate {
      &::before {
        content: url("data:image/svg+xml;utf8,<svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M5.25002 12.0001C5.25002 11.5858 5.5858 11.2501 6.00002 11.2501H18C18.4142 11.2501 18.75 11.5858 18.75 12.0001C18.75 12.4143 18.4142 12.7501 18 12.7501H6.00002C5.5858 12.7501 5.25002 12.4143 5.25002 12.0001Z' fill='white'/></svg>");
      }
    }

    &:checked::before {
      transform: scale(1) translateX(2px);
    }
    &:checked:hover::before {
      box-shadow: inset -2em 1em #082bd5;
    }
    &:checked:disabled::before {
      box-shadow: inset -2em 1em #9dadff;
    }
  }
}
</style>
