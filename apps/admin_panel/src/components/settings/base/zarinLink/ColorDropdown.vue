<template>
  <div class="grid grid-cols-8 gap-sm bg-white-100 p-md shadow-elevation-200 rounded-md">
    <div
      v-for="color in colors"
      :key="color"
      :class="[
        'w-[24px] h-[24px] rounded-circle cursor-pointer',
        {
          'border-2 border-interactive-focus p-[2px] w-[30px] h-[30px] relative left-[3px] bottom-[3px]':
            colors.includes(selectedColor) && (activeColor || selectedColor) === color,
        },
      ]"
      @click="selectColor(color, true)"
    >
      <div :class="['w-full h-full rounded-circle']" :style="{ backgroundColor: color }"></div>
    </div>

    <div class="flex items-center space-x-reverse space-x-md w-[60px]">
      <ui-Divider type="vertical" :height="30" />

      <div
        :class="{
          'w-[24px] h-[24px] bg-[#fff] rounded-circle relative bottom-[2px] overflow-hidden': true,
          'border-2 border-interactive-focus w-[28px] h-[28px]': !colors.includes(
            activeColor || selectedColor
          ),
        }"
      >
        <input
          :value="colorInputValue"
          type="color"
          name="color"
          class="w-[50px] h-[50px] absolute -top-[5px] -left-[5px] cursor-pointer"
          @input="handleColorInput"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  selectedColor: string;
}

const props = withDefaults(defineProps<Props>(), {});
const { selectedColor } = toRefs(props);
const activeColor = ref<string>();
const emit = defineEmits(['colorSelected']);
const colors = [
  '#662929',
  '#662957',
  '#472966',
  '#293866',
  '#296666',
  '#296638',
  '#476629',
  '#665729',
  '#b22424',
  '#b2248f',
  '#6b24b2',
  '#2447b2',
  '#0e8c8c',
  '#0e8c2e',
  '#4d8c0e',
  '#8c6d0e',
  '#2d3040',
  '#0a33ff',
];
const selectColor = (color: string, isPicking: boolean) => {
  activeColor.value = color;
  emit('colorSelected', color, isPicking);
};
const handleColorInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    selectColor(target.value, false);
  }
};
const colorInputValue = computed(() =>
  !colors.includes(activeColor.value || selectedColor.value)
    ? activeColor.value || selectedColor.value
    : '#ffd60a'
);
</script>
