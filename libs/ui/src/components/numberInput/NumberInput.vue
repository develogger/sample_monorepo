<template>
  <div class="input">
    <div ref="controller" dir="rtl" :class="[styleValue]" class="group input__inner">
      <!-- label -->
      <Transition name="label">
        <div v-if="showLabel" class="input__inner__label">
          <label class="input__inner__label__container" :for="name">
            {{ placeholder }}
          </label>
        </div>
      </Transition>
      <!-- input -->
      <div class="flex">
        <Skeleton v-if="loading" class="input__inner--loading" />
        <input
          :id="name"
          ref="inputRef"
          v-model="value"
          class="outline-none !font-yekanFa"
          :disabled="disabled"
          :placeholder="!showLabel && !loading ? placeholder : ''"
          :readonly="loading"
          @blur="blurInput"
          @focus="focusInput"
          @input="toNumberValue"
        />
        <div v-if="stepper" class="input__inner__stepper">
          <Button
            icon="FilledArrowUp"
            class="w-xs up-button"
            type="secondary"
            :disabled="max === Number(value)"
            @click="increase"
          />
          <Button
            icon="FilledArrowDown"
            class="w-xs down-button"
            type="secondary"
            :disabled="min === Number(value)"
            @click="decrease"
          />
        </div>
      </div>
    </div>
    <div class="input__description">
      <!-- helper -->
      <div>
        <div v-if="helper" class="input__description__helper" dir="rtl">
          <div v-if="helper.type === 'error'" class="input__description__helper--error">
            <Icon name="InfoFill" />
            {{ helper.message }}
          </div>
          <div v-if="helper.type === 'success'" class="input__description__helper--success">
            <Icon name="CheckMarkCircleFill" />
            {{ helper.message }}
          </div>
          <div v-if="helper.type === 'info'" class="input__description__helper--info">
            {{ helper.message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useField } from 'vee-validate';
import { toRefs, ref, onMounted, computed, type VNode, watch } from 'vue';
import Skeleton from '../skeleton/Skeleton.vue';
import Button from '../button/Button.vue';
import Icon from '../icon/Icon.vue';
import { useInput } from '../textField/input';

export interface Props {
  name: string;
  disabled?: boolean;
  label?: boolean;
  placeholder?: string;
  loading?: boolean;
  modelValue?: number;
  stepper?: string | boolean;
  min?: number;
  max?: typeof Infinity;
  helper?: {
    type: 'error' | 'success' | 'info' | undefined;
    message: string | undefined;
  };
  maxLength?: number;
}
const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  modelValue: 0,
  beforeIcon: undefined,
  afterIcon: undefined,
  unit: undefined,
  button: undefined,
  stepper: false,
  min: 0,
  max: undefined,
  helper: undefined,
  label: true,
  maxLength: 0,
});
// emits
const emits = defineEmits(['buttonAction', 'update:modelValue']);
const { toEnNumber } = useInput();
// reactivate props values
const { modelValue, placeholder, loading, maxLength, disabled, min, max, label } = toRefs(props);
const showLabel = ref<boolean>();
// vee-validate field hook
const { value, handleChange, errors } = useField(() => props.name, undefined, {
  syncVModel: true,
});
const inputRef = ref<VNode>();
// input style handler
const styleValue = computed(() => {
  if (!!errors.value.length && !showLabel.value) {
    return 'input__inner--error';
  } else if (!!disabled.value) {
    return 'input__inner--disabled';
  }

  return 'input__inner--default';
});
const toNumberValue = (e: Event) => {
  const character = toEnNumber((e.target as HTMLInputElement)?.value);
  const val = character.replace(/[^0-9]/g, '');
  if (maxLength.value) {
    handleChange(+val.substring(0, maxLength.value));
  } else {
    val ? handleChange(+val) : handleChange(min.value);
  }
  emits('update:modelValue', +val);
};
const increase = () => {
  if (Number(value.value) < Number(max.value) || typeof max.value === 'undefined') {
    handleChange(Number(value.value) + 1);
    emits('update:modelValue', Number(value.value) + 1);
  }
};
const decrease = () => {
  if (
    Number(value.value) > Number(min.value) ||
    (typeof min.value === 'undefined' && Number(value.value) > 0)
  ) {
    handleChange(Number(value.value) - 1);
    emits('update:modelValue', Number(value.value) - 1);
  }
};
const handleLabel = (ctx: boolean) => {
  if (ctx && placeholder.value && !loading.value && label.value) {
    showLabel.value = true;
  } else if (!ctx && !value.value) {
    showLabel.value = false;
  }
};
const focusInput = () => {
  handleLabel(true);
};
const blurInput = () => {
  handleLabel(false);
};

onMounted(() => {
  if (modelValue.value && placeholder.value && !loading.value && label.value) {
    showLabel.value = true;
  }
});

watch(modelValue, () => {
  if (modelValue.value !== value.value) {
    emits('update:modelValue', +modelValue.value);
    handleChange(+modelValue.value);
    handleLabel(true);
  }
});
defineExpose({
  inputRef,
});
</script>

<style lang="scss" scoped>
@use '../textField/input.scss';
</style>

<style lang="scss">
.input {
  .up-button {
    i {
      @apply w-[10px] h-[10px];
      font-size: 10px;
    }
  }
  .down-button {
    i {
      @apply w-[10px] h-[10px];
      font-size: 10px;
    }
  }
}
</style>
