<template>
  <div class="input">
    <div dir="rtl" :class="styleValue" class="input__inner">
      <!-- label -->
      <Transition name="label">
        <div v-if="showLabel" class="input__inner__label">
          <label class="input__inner__label__container" :for="name" @click="focusInput">
            {{ placeholder }}
          </label>
        </div>
      </Transition>
      <!-- input -->
      <div class="flex">
        <Skeleton v-if="loading && !value" class="input__inner--loading" />
        <textarea
          :id="name"
          ref="inputRef"
          v-model="fieldValue"
          class="textarea"
          :rows="rows"
          :disabled="disabled"
          :placeholder="!showLabel && !loading ? placeholder : ''"
          :readonly="loading"
          @blur="blurInput"
          @focus="focusInput"
          @input="handleInput"
        />
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
      <!-- limit -->
      <div v-if="maxLength > 0 && showMaxLengthLimit" class="input__description__limit">
        <div>{{ maxLength }}/{{ (fieldValue && fieldValue.length) || 0 }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useField } from 'vee-validate';
import { toRefs, ref, onMounted, computed, type VNode, watch } from 'vue';
import Skeleton from '../skeleton/Skeleton.vue';
import Icon from '../icon/Icon.vue';

export interface Props {
  name: string;
  disabled?: boolean;
  placeholder?: string;
  label?: boolean;
  loading?: boolean;
  rows?: number;
  modelValue?: string;
  helper?: {
    type: 'error' | 'success' | 'info' | undefined;
    message: string | undefined;
  };
  maxLength?: number;
  showMaxLengthLimit?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  modelValue: '',
  helper: undefined,
  maxLength: 0,
  rows: 4,
  showMaxLengthLimit: true,
});
// emits
const emits = defineEmits(['update:modelValue']);
const { modelValue, placeholder, loading, label } = toRefs(props);
const showLabel = ref<boolean>();
const { disabled, maxLength } = toRefs(props);
// vee-validate field hook
const { value, handleChange, errors } = useField(() => props.name, undefined, {
  syncVModel: true,
});
const fieldValue = computed({
  get: () => value.value as string,
  set: newValue => (value.value = newValue),
});
const inputRef = ref<VNode>();
const styleValue = computed(() => {
  if (!!errors.value.length) {
    return 'input__inner--error';
  } else if (!!disabled.value) {
    return 'input__inner--disabled';
  }

  return 'input__inner--default';
});
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
/**
 * handle limiter for character
 * @param character length of character
 */
const handleInput = (e: Event) => {
  let character = (e.target as HTMLInputElement)?.value;
  if ((e as InputEvent)?.inputType === 'insertFromPaste') {
    character = character.trim();
  }
  if (character.startsWith(' ')) {
    character = character.trimStart();
  }
  if (maxLength.value > 0) {
    handleChange(character.substring(0, maxLength.value));
    emits('update:modelValue', character.substring(0, maxLength.value));
  } else {
    handleChange(character);
    emits('update:modelValue', character);
  }
};
onMounted(() => {
  if (modelValue.value && placeholder.value && !loading.value && label.value) {
    showLabel.value = true;
    handleChange(modelValue.value);
  }
});
watch(modelValue, () => {
  if (modelValue.value !== value.value) {
    handleChange(modelValue.value);
    handleLabel(true);
  }
});
defineExpose({
  inputRef,
});
</script>

<style lang="scss" scoped>
@use '../textField/input.scss';
.textarea {
  @apply w-full bg-transparent p-sm font-yekanRd text-body-400-b2 text-text relative disabled:text-text-disabled;
  @apply outline-none focus:outline-[#66a6ff66] focus:outline-offset-0 focus:border focus:border-interactive-focus focus:rounded-sm;
}
</style>
