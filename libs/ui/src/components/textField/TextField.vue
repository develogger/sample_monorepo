<template>
  <div class="input">
    <div ref="controller" dir="rtl" :class="[styleValue]" class="group input__inner">
      <!-- label -->
      <Transition name="label">
        <div v-if="showLabel && label" class="input__inner__label">
          <label class="input__inner__label__container" :for="name">
            {{ placeholder }}
          </label>
        </div>
      </Transition>
      <!-- input -->
      <div class="input__inner__input-section">
        <div v-if="beforeIcon">
          <Icon :name="beforeIcon" class="input__inner__icon--before" />
        </div>
        <Skeleton v-if="loading" class="input__inner--loading" />
        <input
          :id="name"
          ref="inputRef"
          v-model="value"
          class="outline-none"
          :class="[inputCustomClass, isNumber || amount ? '!font-yekanFa' : '']"
          :disabled="disabled"
          :isNumber="isNumber"
          :placeholder="!showLabel && !loading ? placeholder : ''"
          :readonly="loading"
          spellcheck="false"
          @blur="blurInput"
          @focus="focusInput"
          @input="handleInput"
          @keypress="onlyNumber"
        />
        <div v-if="afterIcon" class="flex items-center">
          <Icon
            :name="afterIcon"
            class="input__inner__icon--after"
            @click="$emit('buttonAction')"
          />
        </div>
        <div v-else-if="unit" class="input__inner__unit">
          <slot name="unit">
            {{ unit }}
          </slot>
        </div>
        <div v-else-if="button" class="input__inner__button">
          <Button :text="button" @click="$emit('buttonAction')" />
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
      <!-- limit -->
      <div v-if="maxLength > 0 && !amount && showMaxLengthLimit" class="input__description__limit">
        <div>{{ maxLength }}/{{ modelValue.length || 0 }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useField } from 'vee-validate';
import { toRefs, ref, onMounted, computed, watch } from 'vue';
import { useTippy } from 'vue-tippy';
import Skeleton from '../skeleton/Skeleton.vue';
import Icon from '../icon/Icon.vue';
import Button from '../button/Button.vue';
import numFa from '../../composables/num_fa';
import { useInput } from './input';

type Instance = {
  hide: () => void;
};

export interface Props {
  isNumber?: boolean;
  isLTR?: boolean;
  name: string;
  disabled?: boolean;
  label?: boolean;
  placeholder?: string;
  loading?: boolean;
  beforeIcon?: string;
  afterIcon?: string;
  unit?: string;
  autoFocus?: boolean;
  button?: string;
  helper?: {
    type: 'error' | 'success' | 'info' | undefined;
    message: string | undefined;
  };
  maxLength?: number;
  modelValue?: string;
  amount?: boolean;
  inputCustomClass?: string;
  showMaxLengthLimit?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  modelValue: '',
  beforeIcon: undefined,
  afterIcon: undefined,
  unit: undefined,
  button: undefined,
  stepper: false,
  isNumber: false,
  helper: undefined,
  label: true,
  maxLength: 0,
  isLTR: false,
  inputCustomClass: '',
  showMaxLengthLimit: true,
});
// emits
defineEmits(['buttonAction', 'update:modelValue']);
// reactivate props values
const {
  placeholder,
  loading,
  label,
  modelValue,
  amount,
  disabled,
  maxLength,
  autoFocus,
  isNumber,
} = toRefs(props);
const showLabel = ref<boolean>();
// vee-validate field hook
const { value, handleChange, errors } = useField(() => props.name, undefined, {
  syncVModel: true,
});
const inputRef = ref<HTMLInputElement>();
const { toEnNumber } = useInput();
// tippy content
useTippy(inputRef as unknown as Element, {
  content: computed(() => {
    if (amount.value) {
      const valueOfModel = Number(modelValue.value?.replace(/,/g, ''));
      if (isNaN(valueOfModel)) {
        return undefined;
      }

      const rialValue = Number(valueOfModel % 10);
      const amount = (valueOfModel - rialValue) / 10;
      if (rialValue === 0) {
        return numFa(Math.round(Number(modelValue.value?.replace(/,/g, '')) / 10)) + ' تومان ';
      } else {
        return numFa(Number(amount)) + ' تومان و ' + numFa(rialValue) + ' ریال';
      }
    }

    return undefined;
  }),
  trigger: 'keydown',
  theme: 'tips-medium',
  placement: 'top',
  onAfterUpdate: (instance: Instance) => {
    amount.value && modelValue.value === '0' && instance.hide();
  },
});
// input style handler
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
const handleInput = (e: Event) => {
  let character = (e.target as HTMLInputElement)?.value;
  if ((e as InputEvent)?.inputType === 'insertFromPaste') {
    character = character.trim();
  }
  if (character.startsWith(' ')) {
    character = character.trimStart();
  }
  if (isNumber.value === true || amount.value === true) {
    character = toEnNumber(character);
  }
  const nf = new Intl.NumberFormat('en-US');
  const amountValue = +character.replace(/,/g, '');
  const amountFormated = nf.format(amountValue);
  if (amount.value && !Number.isNaN(amountValue)) {
    if (maxLength.value > 0) {
      const x = String(amountValue).substring(0, maxLength.value);
      handleChange(nf.format(+x));
    } else {
      handleChange(amountFormated);
    }
  } else if (!amount.value) {
    if (maxLength.value > 0) {
      handleChange(character.substring(0, maxLength.value));
    } else {
      handleChange(character);
    }
  } else if (amount.value && Number.isNaN(amountValue)) {
    const outputArray = character.replace(/,/g, '').match(/\d+/g);
    handleChange(outputArray && nf.format(+outputArray[0]));
  } else {
    Number.isNaN(amountValue) && handleChange('0');
  }
};
const onlyNumber = (e: KeyboardEvent) => {
  if (isNumber.value === true) {
    if (!/\d/.test(toEnNumber(e.key))) {
      return e.preventDefault();
    }

    return true;
  }
};
onMounted(() => {
  if (modelValue.value && placeholder.value && !loading.value && label.value) {
    showLabel.value = true;
  }
  if (autoFocus.value) {
    inputRef.value?.focus();
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
@use './input.scss';
</style>
