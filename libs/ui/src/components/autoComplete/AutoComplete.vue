<template>
  <div class="input">
    <Tippy
      ref="tippyRef"
      :content="Content as any"
      :arrow="false"
      interactive
      :offset="[0, -60]"
      placement="bottom-start"
      trigger="focusin"
      :on-mount="getClientParentWidth"
      :sticky="true"
      theme="select"
      :on-trigger="onTrigger"
      :on-hide="onTrigger"
    >
      <div
        ref="selectRef"
        dir="rtl"
        :class="[styleValue, focusStyledValue]"
        class="input__inner flex w-full"
      >
        <!-- label -->
        <Transition name="label">
          <div v-if="value && placeholder && label" class="input__inner__label">
            <label class="input__inner__label__container" :for="name" @click="focusInput">
              {{ placeholder }}
            </label>
          </div>
        </Transition>
        <div v-if="selectedIcon">
          <Icon :name="selectedIcon" class="input__inner__icon--before" />
        </div>
        <div v-if="selectedLogo && value">
          <BankLogo :name="selectedLogo" class="input__inner__icon--before w-xl h-xl" />
        </div>
        <!-- input -->
        <div class="flex w-full">
          <Skeleton v-if="loading && !value && !showLabel" class="input__inner--loading" />
          <input
            :id="name"
            v-model="value"
            class="w-full outline-none"
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
import { toRefs, ref, h, computed, useSlots, watch } from 'vue';
import Skeleton from '../skeleton/Skeleton.vue';
import Icon from '../icon/Icon.vue';
import BankLogo from '../bankLogo/BankLogo.vue';
import AutoCompleteBox from './AutoCompleteBox.vue';
import type { DataType, Props } from './autoCompleteTypes';

const props = withDefaults(defineProps<Props>(), {
  value: () => ({
    title: undefined,
    id: 0,
  }),
  placeholder: '',
  beforeIcon: undefined,
  afterIcon: undefined,
  unit: undefined,
  button: undefined,
  stepper: false,
  helper: undefined,
  label: true,
});
const {
  value: propsValue,
  placeholder,
  loading,
  disabled,
  data,
  loadingBox,
  name,
  helper,
  searchPlaceholder,
  hasSearch,
} = toRefs(props);
const emits = defineEmits(['selectedItem', 'handleSearch']);
const { value, handleChange } = useField(() => props.name, undefined, {
  syncVModel: true,
});
const slots = useSlots();
const showLabel = ref<boolean>();
const tippyRef = ref<typeof Tippy>();
const selectRef = ref<HTMLElement>();
const selectWidth = ref<number>(0);
const selectedIcon = ref<string>();
const selectedLogo = ref<string>();
const showBox = ref();
const onTrigger = () => {
  showBox.value = !showBox.value;
};
const computedSlots = computed(() => !!slots.custom);
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
    return 'outline-none outline-[#66a6ff66] outline-offset-0 focus:border border-interactive-focus rounded-sm';
  } else {
    return 'outline-none focus:outline-[#66a6ff66] focus:outline-offset-0 focus:border focus:border-interactive-focus focus:rounded-sm';
  }
});
/**
 * handler for selected value from box
 * @param value data values like: icon,title ,...
 */
const selectedValueHandler = (value: DataType) => {
  emits('selectedItem', value);
  handleChange(value.title);
  if (value.title) {
    selectedIcon.value = value.icon;
    selectedLogo.value = value.logo;
  } else {
    selectedIcon.value = undefined;
    selectedLogo.value = undefined;
  }
  tippyRef.value?.hide();
};
const handleSearch = (value: string) => emits('handleSearch', value);
// select box component assignee
const Content = h(
  AutoCompleteBox as never,
  {
    parentWidth: selectWidth,
    data,
    hasSearch,
    loading: loadingBox,
    onSelected: selectedValueHandler,
    onSearch: handleSearch,
    value: propsValue.value,
    computedSlots: computedSlots.value,
    show: showBox,
    placeholder: searchPlaceholder?.value,
  },
  {
    custom: () => [slots.custom && slots.custom()],
  }
);
// get parent client width for pass to select box component
const getClientParentWidth = () => {
  if (selectRef.value) {
    selectWidth.value = selectRef.value.clientWidth;
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
watch(propsValue, () => {
  if (propsValue.value.title) {
    handleChange(propsValue.value);
  }
});
</script>

<style lang="scss" scoped>
@use '../textField/input.scss';
</style>
