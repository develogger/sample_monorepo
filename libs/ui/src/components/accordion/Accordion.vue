<template>
  <div class="root">
    <div
      class="root__header"
      :class="disabled ? 'root__header--disabled' : 'root__header--default'"
      @click="toggleContent"
    >
      <div v-if="!loading" class="root__header--end">
        <div v-if="iconPosition === 'end'" class="root__header__icon">
          <Icon v-if="active || toggle" name="AngleUp" />
          <Icon v-else name="AngleDown" />
        </div>
      </div>
      <div v-if="!loading" class="root__header--start">
        <div class="root__header__label">{{ label }}</div>
        <div v-if="iconPosition === 'start'" class="root__header__icon">
          <Icon v-if="active || toggle" name="AngleUp" />
          <Icon v-else name="AngleDown" />
        </div>
      </div>
      <div v-else-if="loading" class="w-full flex justify-between items-center">
        <Skeleton :width="24" :height="24" />
        <Skeleton :width="200" />
      </div>
    </div>
    <div v-if="toggle" class="root__body">
      <div :class="iconPosition === 'start' ? 'root__body--start' : 'root__body--default'">
        <slot name="content">{{ content }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type VNode, toRefs } from 'vue';
import Icon from '../icon/Icon.vue';
import Skeleton from '../skeleton/Skeleton.vue';

export interface Props {
  label: string;
  iconPosition?: 'start' | 'end';
  active?: boolean;
  disabled?: boolean;
  content?: string | VNode;
  loading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  iconPosition: 'end',
  content: '',
  loading: false,
});
const { active } = toRefs(props);
const toggle = ref(false);
const toggleContent = () => {
  toggle.value = !toggle.value;
};
</script>

<style lang="scss" scoped>
@use './accordion.scss';
</style>
