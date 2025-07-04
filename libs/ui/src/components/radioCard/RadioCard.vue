<template>
  <div
    class="radio-card"
    :class="[classes, disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
    @click="onSelect"
  >
    <div class="flex flex-col justify-center items-end gap-2xs">
      <div class="flex">
        <Label v-if="helper" :text="helper" type="informative" />
        <Radio
          :label="label"
          :name="name"
          :selected-value="modelValue"
          :value="val"
          :picked="modelValue"
          :disabled="disabled"
          :loading="loading"
          @click="onSelect"
        />
      </div>

      <div
        dir="rtl"
        class="radio-card__description"
        :class="[disabled ? 'text-text-disabled' : '']"
      >
        <div v-if="loading" class="flex gap-sm flex-col">
          <Skeleton :width="220" />
          <Skeleton :width="150" />
        </div>
        <template v-else>
          {{ description }}
        </template>
      </div>
    </div>
    <div v-if="!!vector" class="radio-card__section">
      <Illustration :name="vector" />
    </div>
    <div v-if="withDetails" class="radio-card__bottom">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, toRefs, ref } from 'vue';
import Radio from '../radio/Radio.vue';
import Illustration from '../illustration/Illustration.vue';
import Skeleton from '../skeleton/Skeleton.vue';
import Label from '../label/Label.vue';

export interface Props {
  modelValue: string | number | undefined;
  val: string | number;
  disabled?: boolean;
  label?: string;
  loading?: boolean;
  name: string;
  description?: string;
  withDetails?: boolean;
  vector?: string;
  helper?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  label: '',
  loading: false,
  description: '',
  vector: '',
  val: undefined,
  helper: '',
});
const { modelValue, label, description, disabled, loading, val, helper } = toRefs(props);
const emit = defineEmits(['update:modelValue', 'change']);
const focusVal = ref(false);
const onSelect = () => {
  emit('change');
  if (!disabled.value && !val.value) {
    emit('update:modelValue', !modelValue.value);
  } else if (!disabled.value && val.value) {
    emit('update:modelValue', val.value);
  }
};
const classes = computed(() => {
  if (!loading.value && !disabled.value && !modelValue.value && !focusVal.value) {
    return 'outline outline-border outline-1 hover:bg-surface-hover bg-surface';
  } else if (modelValue.value && modelValue.value === val.value && disabled.value) {
    return 'outline outline-2 outline-primary-disabled bg-surface';
  } else if (modelValue.value && modelValue.value === val.value) {
    return 'outline outline-2 outline-interactive-link bg-surface';
  }

  return 'outline outline-1 outline-border bg-surface';
});
</script>
<style lang="scss" scoped>
@use './radioCard.scss';
</style>
