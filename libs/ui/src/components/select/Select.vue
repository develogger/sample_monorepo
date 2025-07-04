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
      max-width="none"
      theme="select"
    >
      <div
        ref="selectRef"
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
            v-model="value"
            class="w-full outline-none cursor-pointer"
            :disabled="disabled"
            :placeholder="!showLabel && !loading ? placeholder : ''"
            :readonly="true"
            @blur="blurInput"
            @focus="focusInput"
          />
          <div v-if="afterIcon">
            <Icon :name="afterIcon" class="input__inner__icon--after flex items-center" />
          </div>
        </div>
      </div>
    </Tippy>
    <div class="input__description">
      <!-- helper -->
      <div>
        <div v-if="helper" class="input__description__helper" dir="rtl">
          <div
            v-if="helper.type === 'error'"
            class="input__description__helper--error flex items-center gap-2xs"
          >
            <Icon name="InfoFill" />
            {{ helper.message }}
          </div>
          <div
            v-if="helper.type === 'success'"
            class="input__description__helper--success flex items-center gap-2xs"
          >
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
import Skeleton from '../skeleton/Skeleton.vue';
import Icon from '../icon/Icon.vue';
import SelectBox from './SelectBox.vue';

export interface DataType {
  id: number | string | undefined;
  title: string | null | undefined;
  icon?: string;
  description?: string;
  disabled?: boolean;
}

export interface Props {
  name: string;
  disabled?: boolean;
  placeholder?: string;
  loading?: boolean;
  value?: DataType;
  afterIcon?: string;
  helper?: {
    type: undefined | string;
    message: string | undefined;
  };
  data: DataType[] | undefined;
  loadingBox?: boolean;
}

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
} = toRefs(props);
const emits = defineEmits(['selectedItem']);
const { value, handleChange } = useField(() => props.name, undefined, {
  initialValue: propsValue.value.title,
});
const showLabel = ref<boolean>();
const tippyRef = ref<typeof Tippy>();
const selectRef = ref<HTMLElement>();
const selectWidth = ref<number>(0);
const selectedIcon = ref<string>();
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
  if (value.title) {
    selectedIcon.value = value.icon;
    handleChange(value.title);
  } else {
    selectedIcon.value = undefined;
  }
  tippyRef.value?.hide();
};
// select box component assignee
const Content = h(SelectBox as never, {
  parentWidth: selectWidth,
  data,
  loading: loadingBox,
  onSelected: selectedValueHandler,
  value: propsValue,
});
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
onMounted(() => {
  if (propsValue.value.title) {
    handleChange(propsValue.value);
  }
});

watch(propsValue, () => {
  handleChange(propsValue.value.title);
});
</script>

<style lang="scss" scoped>
@use '../textField/input.scss';
</style>
