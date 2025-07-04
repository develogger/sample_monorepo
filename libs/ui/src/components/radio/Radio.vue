<template>
  <div class="radio">
    <Skeleton v-if="loading && (label || $slots.default)" :width="96" :height="12" />
    <label
      v-if="!loading && (label || $slots.default)"
      class="radio__label"
      dir="auto"
      :class="{
        'radio__label--disabled cursor-not-allowed': disabled,
        'cursor-pointer': !loading && !disabled,
      }"
      :for="unref(computedId)"
    >
      <slot v-if="$slots.default"></slot>
      <span v-else>{{ label }}</span>
    </label>
    <Skeleton v-if="loading" :width="24" :height="24" circle class="ml-xs" />
    <input
      v-if="!loading"
      :id="unref(computedId)"
      ref="inputRef"
      :class="{ 'cursor-pointer': !loading && !disabled }"
      class="radio__input disabled:cursor-not-allowed mx-[2px]"
      type="radio"
      :name="name"
      :disabled="disabled"
      :checked="picked === value"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { onMounted, unref, computed } from 'vue';
import Skeleton from '../skeleton/Skeleton.vue';

export interface Props {
  disabled?: boolean;
  label?: string;
  loading?: boolean;
  name: string;
  value?: string | number;
  picked?: string | number;
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
  modelValue: '',
  value: '',
  picked: '',
});
const computedId = computed(() => `${props.name}-${props.value}`);
const emits = defineEmits(['selectedValue']);
const handleInput = () => {
  emits('selectedValue', props.value);
  handleChange(props.value);
};
const { handleChange } = useField(() => props.name, undefined, {});
onMounted(() => {
  handleChange(props.value);
});
</script>
<style lang="scss" scoped>
@use './radio.scss';
</style>
