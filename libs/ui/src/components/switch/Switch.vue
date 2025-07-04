<template>
  <label class="switcher relative" :data-checked="checked">
    <Skeleton v-if="loading && label" :width="69" class="px-xs cursor-default" />
    <span v-else-if="!loading && label" class="switcher__label">
      {{ label }}
    </span>
    <input class="switcher__input" type="checkbox" :checked="checked" :disabled="disabled" />
    <Skeleton v-if="loading" :width="40" :height="24" class="px-xs cursor-default" radius="xl" />
    <span v-else class="switcher__switch" :tabindex="0"></span>
  </label>
</template>

<script setup lang="ts">
import { toRefs, watch } from 'vue';
import { useField } from 'vee-validate';
import Skeleton from '../skeleton/Skeleton.vue';

export interface Props {
  label?: string;
  checked: boolean;
  loading?: boolean;
  name: string;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  label: undefined,
});
const { checked, disabled } = toRefs(props);
const { value, handleChange } = useField(() => props.name, undefined, {
  syncVModel: true,
});
watch(checked, () => {
  if (checked.value !== value.value) {
    handleChange(checked.value);
  }
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
      @apply bg-surface-disabled cursor-default;
    }
    &:disabled:checked + .switcher__switch {
      @apply bg-primary-disabled cursor-default;
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
