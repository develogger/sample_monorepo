<template>
  <label class="switcher relative" :data-checked="modelValue">
    <Skeleton v-if="loading && label" :width="69" class="px-xs cursor-default" />
    <span v-else-if="!loading && label" class="switcher__label">
      {{ label }}
    </span>
    <input
      :checked="modelValue"
      class="switcher__input"
      type="checkbox"
      :disabled="disabled"
      @change="
        (event: Event) => $emit('update:modelValue', (event.target as HTMLInputElement).checked)
      "
    />
    <Skeleton v-if="loading" :width="40" :height="24" class="px-xs cursor-default" radius="xl" />
    <span v-else class="switcher__switch" :tabindex="0"></span>
  </label>
</template>

<script setup lang="ts">
import { watch, toRefs } from 'vue';
import { useField } from 'vee-validate';
import Skeleton from '../skeleton/Skeleton.vue';

export interface Props {
  label?: string;
  loading?: boolean;
  name: string;
  disabled?: boolean;
  modelValue: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  label: undefined,
});
defineEmits(['update:modelValue']);
const { disabled, modelValue } = toRefs(props);
const { handleChange } = useField(() => props.name, undefined, {
  syncVModel: true,
});
watch(modelValue, () => {
  handleChange(modelValue.value);
});
</script>
<style lang="scss" scoped>
.switcher {
  @apply cursor-pointer flex items-center h-lg outline-none;
  &__input {
    @apply absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden whitespace-nowrap border-0;
    clip: rect(0, 0, 0, 0);
    &:checked + .switcher__switch {
      @apply bg-primary;
    }
    &:checked + .switcher__switch:before {
      @apply -translate-x-[18px];
    }
    &:disabled + .switcher__switch {
      @apply bg-surface-disabled cursor-not-allowed;
    }
    &:disabled:checked + .switcher__switch {
      @apply bg-primary-disabled cursor-not-allowed;
    }
  }
  &__switch {
    @apply flex items-center relative flex-shrink-0 bg-surface-heavy h-lg w-[2.5rem] rounded-[20px] outline-none;
    @apply focus-visible:rounded-lg;
    &:focus-visible {
      box-shadow:
        0px 0px 0px 1px white,
        0px 0px 0px 3px rgba(102, 166, 255, 1);
    }
    transition: background-color 0.2s ease-in-out;
    &:before {
      @apply content-[''] absolute right-[1px] rounded-circle bg-surface w-sm h-sm m-2xs shadow-elevation-100;
      transition: transform 0.3s ease-in-out;
    }
  }
  &__label {
    @apply text-text text-body-400-b2 px-xs;
    &__disabled {
      @apply text-text-disabled cursor-default;
    }
  }
}
</style>
