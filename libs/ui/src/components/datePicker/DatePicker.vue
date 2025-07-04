<template>
  <div class="input">
    <Tippy
      ref="tippyRef"
      :content="time ? (TimePickerBox as any) : (DateBox as any)"
      :arrow="false"
      interactive
      :offset="[0, -60]"
      placement="bottom-start"
      trigger="focusin"
      :on-mount="getClientParentWidth"
      :sticky="true"
      theme="select"
    >
      <div
        ref="pickerRef"
        dir="rtl"
        :class="[styleValue, focusStyledValue]"
        class="input__inner flex w-full"
      >
        <!-- label -->
        <Transition name="label">
          <div v-if="value && placeholder" class="input__inner__label">
            <label class="input__inner__label__container" :for="name" @click="focusInput">
              {{ placeholder }}
            </label>
          </div>
        </Transition>
        <div v-if="selectedIcon">
          <Icon :name="selectedIcon" class="input__inner__icon--before" />
        </div>
        <!-- input -->
        <div class="flex w-full">
          <Skeleton v-if="loading && !value && !showLabel" class="input__inner--loading" />
          <input
            :id="name"
            ref="inputRef"
            v-model="selectedDateLabel"
            class="w-full outline-none !font-bold cursor-pointer !font-yekanFa"
            :disabled="disabled"
            :placeholder="!showLabel && !loading ? placeholder : ''"
            :readonly="true"
            @blur="blurInput"
            @focus="focusInput"
          />
          <div v-if="afterIcon">
            <Icon :name="afterIcon" class="input__inner__icon--after" />
          </div>
        </div>
      </div>
    </Tippy>
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
import { Tippy } from 'vue-tippy';
import { useField } from 'vee-validate';
import { toRefs, ref, h, computed, onMounted, watch } from 'vue';
import moment from 'moment-jalaali';
import Skeleton from '../skeleton/Skeleton.vue';
import Icon from '../icon/Icon.vue';
import { type Boundary } from '../../../../date-picker/src/composables/date';
import CalendarBox from './CalendarBox.vue';
import TimeBox from './TimeBox.vue';

export interface Props {
  name: string;
  time?: boolean;
  disabled?: boolean;
  placeholder?: string;
  loading?: boolean;
  afterIcon?: string;
  steps?: [string, string, string | undefined] | undefined;
  label?: boolean;
  modelValue?: string;
  onlyMonth?: boolean;
  inValidDates?: Boundary;
  initialDate?: string;
  min?: boolean;
  max?: boolean;
  helper?: {
    type: undefined | string;
    message: string | undefined;
  };
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  placeholder: '',
  initialDate: '',
  beforeIcon: undefined,
  afterIcon: undefined,
  unit: undefined,
  button: undefined,
  modelValue: '',
  label: true,
  helper: undefined,
  steps: undefined,
  inValidDates: undefined,
});
const {
  modelValue,
  placeholder,
  loading,
  disabled,
  name,
  helper,
  label,
  onlyMonth,
  steps,
  time,
  inValidDates,
  min,
  max,
} = toRefs(props);
const emits = defineEmits(['selectedItem', 'update:modelValue']);
const { value, handleChange } = useField(() => props.name, undefined, {
  syncVModel: true,
});
const showLabel = ref<boolean>();
const tippyRef = ref<typeof Tippy>();
const pickerRef = ref<HTMLElement>();
const selectWidth = ref<number>(0);
const selectedIcon = ref<string>();
moment.updateLocale('fa', {
  jMonths: [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'اَمرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ],
});

const timeComputed = computed(() => {
  if (time.value) {
    const timeArray = modelValue.value?.split(':');

    return {
      hour: parseInt(timeArray[0]),
      minute: parseInt(timeArray[1]),
    };
  }

  return {
    hour: 0,
    minute: 0,
  };
});
const hide = () => {
  tippyRef.value?.hide();
};
const styleValue = computed(() => {
  if (helper.value && helper.value.type === 'error' && !showLabel.value) {
    return 'input__inner--error';
  } else if (!!disabled.value) {
    return 'input__inner--disabled';
  }

  return 'input__inner--default';
});
const focusStyledValue = computed(() => {
  if ((props.beforeIcon || props.afterIcon) && showLabel.value) {
    return 'outline-none outline-offset-0 focus:border border-interactive-focus rounded-sm';
  } else {
    return 'outline-none focus:outline-interactive-focus focus:outline-offset-0 focus:border focus:border-interactive-focus focus:rounded-sm';
  }
});
/**
 * handler for selected value from box
 * @param value data values like: icon,title ,...
 */
const selectedDateHandler = (value: string) => {
  emits('selectedItem', value);
  tippyRef.value?.hide();
};
const selectedTimeHandler = (value: string) => {
  emits('selectedItem', value);
};
// calendar box component assignee
const show = computed(() => {
  if (tippyRef.value) {
    return tippyRef.value && tippyRef.value.state.isShown;
  }

  return false;
});
const DateBox = h(CalendarBox as never, {
  parentWidth: 400,
  onSelected: selectedDateHandler,
  onlyMonth: onlyMonth.value,
  inValidDates: inValidDates?.value,
  value: value.value,
  steps: steps.value,
  min: min.value,
  max: max.value,
  show,
});
// time box component assignee
const TimePickerBox = h(TimeBox as never, {
  parentWidth: 400,
  hide,
  onSelected: selectedTimeHandler,
  hour: timeComputed.value.hour,
  minute: timeComputed.value.minute,
});
// get parent client width for pass to select box component
const getClientParentWidth = () => {
  if (pickerRef.value) {
    selectWidth.value = pickerRef.value.clientWidth;
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
  if (!value.value && placeholder.value && !loading.value) {
    showLabel.value = true;
  }
};
const blurInput = () => {
  if (!value.value && placeholder.value && !loading.value) {
    showLabel.value = false;
  }
};

onMounted(() => {
  if (modelValue.value && placeholder.value && !loading.value && label.value) {
    showLabel.value = true;
  }
});

watch(modelValue, () => {
  if (modelValue.value !== value.value) {
    handleChange(modelValue.value);
    handleLabel(true);
  }
});

const selectedDateLabel = computed({
  get() {
    // moment.loadPersian();
    moment.locale('fa');

    if (onlyMonth.value && !time.value) {
      return value.value ? moment(value.value, 'jYYYY/jMM/jDD').format('jMMMM jYYYY') : '';
    }
    if (!time.value) {
      return value.value ? moment(value.value, 'jYYYY/jMM/jDD').format('jD jMMMM') : '';
    } else {
      return modelValue.value ? modelValue.value : '';
    }
  },
  set() {
    emits('selectedItem', value);
    if (modelValue.value !== value.value) {
      handleChange(modelValue.value);
      handleLabel(true);
    }
  },
});
</script>

<style lang="scss" scoped>
@use '../textField/input.scss';
</style>
