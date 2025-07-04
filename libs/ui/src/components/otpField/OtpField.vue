<template>
  <div dir="ltr" class="otp">
    <div class="flex gap-xs justify-center">
      <input
        v-for="index in codeLength"
        :key="index"
        ref="inputRefs"
        v-model="otp[index - 1]"
        class="otp__input"
        :class="{
          'otp__input__inner--error': isError,
          '': index !== 1,
        }"
        :model-value="otp[index - 1]"
        @keyup="focusOnPrev($event, index - 1)"
        @input="focusOrSubmit($event, index)"
        @paste="onPaste($event, index)"
      />
    </div>
    <div v-if="helper">
      <div v-if="helper.type === 'error'" class="otp__description__helper--error">
        {{ helper.message }}
        <Icon name="InfoFill" class="ml-2xs" />
      </div>
      <div v-if="helper.type === 'success'" class="otp__description__helper--success">
        {{ helper.message }}
        <Icon name="CheckMarkCircleFill" class="ml-2xs" />
      </div>
      <div v-if="helper.type === 'info'" class="otp__description__helper--info">
        {{ helper.message }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, nextTick, toRefs, computed, onMounted } from 'vue';
import { useField } from 'vee-validate';
import Icon from '../icon/Icon.vue';

export interface Props {
  codeLength?: number;
  modelValue: number | string;
  name?: string;
  helper?: {
    type: 'error' | 'success' | 'info' | undefined;
    message: string | undefined;
  };
}

const props = withDefaults(defineProps<Props>(), {
  codeLength: 6,
  name: '',
  helper: undefined,
});
const { codeLength, modelValue, name } = toRefs(props);
const emit = defineEmits(['update:modelValue']);
const { errors, handleChange } = useField(() => name.value, undefined, {
  initialValue: modelValue,
});
const inputRefs = ref<HTMLElement[]>();
const otp = ref<number[] | string[] | null[]>([]);
const isError = computed(() => !!errors.value.length);
const submit = () => {
  if (otp.value.join('').length === codeLength.value) {
    handleChange(otp.value.join(''));
    emit('update:modelValue', otp.value.join(''));
  }
};
const focusOrSubmit = async (val: Event, index: number) => {
  const isNumber =
    (val.target as HTMLInputElement) &&
    (val.target as HTMLInputElement).value.replace(/[^0-9]/g, '');
  if (!!isNumber) {
    otp.value[index - 1] = isNumber.charAt(isNumber.length - 1);
    if (index > codeLength.value) {
      await nextTick();
      inputRefs.value && inputRefs.value[1]?.focus();
    } else {
      inputRefs.value && inputRefs.value[index]?.focus();
    }
  } else {
    otp.value[index - 1] = null;
  }
  submit();
};
const focusOnPrev = (e: KeyboardEvent, index: number) => {
  if (e.key === 'Backspace' && index) {
    inputRefs.value && inputRefs.value[index - 1].focus();
  }
};
const onPaste = (val: ClipboardEvent, indexVal: number) => {
  if (indexVal === 1 && val.clipboardData) {
    const isNumber = val.clipboardData.getData('text').replace(/[^0-9]/g, '');
    const value = val.clipboardData && val.clipboardData.getData('text').split('');
    if (value && isNumber) {
      value.map((num: string, index: number) => {
        nextTick();

        inputRefs.value && inputRefs.value[0]?.blur();
        if (index === 0) {
          return (otp.value[index] = num);
        }
        if (index < codeLength.value) {
          return (otp.value[index] = num);
        }

        return num;
      });
    }
  }
  submit();

  return otp.value;
};

onMounted(() => {
  if (modelValue.value && typeof modelValue.value === 'string') {
    const splitOtp = modelValue.value.split('');
    splitOtp.map((item: string, index: number) => (otp.value[index] = item));
  }
});
</script>
<style lang="scss" scoped>
@use './otpField.scss';
</style>
