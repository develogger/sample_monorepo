<template>
  <div class="root">
    <div class="root__text">{{ text }}</div>
    <div class="root__button">
      <RateButton
        v-for="(i, index) in range"
        :key="i"
        :text="i.toString()"
        class="border-r-0"
        :class="{
          'root__button--first': index === 0,
          'root__button--last': index === range.length - 1,
        }"
        @click="$emit('selected', i)"
      />
    </div>
    <div class="flex justify-between mt-sm text-caption-400-c1 text-text-soft">
      <div>ضعیف</div>
      <div>عالی</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import RateButton from '../button/RateButton.vue';

export interface Props {
  text?: string;
}
withDefaults(defineProps<Props>(), {
  text: '',
});
defineEmits(['selected']);
const range = computed(() => Array.from({ length: 5 }, (_, index) => index + 1));
</script>

<style lang="scss" scoped>
@use './rate.scss';
</style>
