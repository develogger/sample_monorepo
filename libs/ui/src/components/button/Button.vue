<template>
  <button
    :class="[
      variant,
      size,
      { 'w-full': block },
      { '!bg-decretive': loading && type === 'decretive' },
      { 'dark:!bg-decretive-dark': loading && type === 'decretive' },
      { '!bg-transparent': loading && variant === 'outlined' },
    ]"
    class="root disabled:cursor-not-allowed"
    :disabled="disabled || loading"
    :type="htmlType"
  >
    <div v-if="loading" class="root__loading" :class="loadingIndicator">&nbsp;</div>
    <div class="root__content">
      <slot />
      <Icon
        v-if="!(icon || '') && text && beforeIcon"
        :name="beforeIcon"
        :class="loading ? 'opacity-0' : 'opacity-100'"
      />
      <Icon v-if="icon && !text" :name="icon" :class="loading ? 'opacity-0' : 'opacity-100'" />
      <div v-if="!icon && text" class="root__content__text">
        <span :class="loading ? 'opacity-0' : 'opacity-100'">{{ text }}</span>
      </div>
      <Icon
        v-if="!icon && text && afterIcon"
        :name="afterIcon"
        :class="loading ? 'opacity-0' : 'opacity-100'"
      />
    </div>
  </button>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import Icon from '../icon/Icon.vue';
import { useButton } from './useButton';

export interface Props {
  afterIcon?: string;
  beforeIcon?: string;
  block?: boolean;
  disabled?: boolean;
  htmlType?: 'button' | 'reset' | 'submit' | undefined;
  icon?: string;
  loading?: boolean;
  size?: 'large' | 'medium' | 'small';
  text?: string;
  type?: 'decretive' | 'light' | 'primary' | 'secondary' | 'tertiary';
  variant?: 'contained' | 'outlined' | 'text';
}

const props = withDefaults(defineProps<Props>(), {
  afterIcon: undefined,
  beforeIcon: undefined,
  block: false,
  disabled: false,
  icon: undefined,
  size: 'medium',
  text: '',
  type: 'primary',
  variant: 'contained',
  htmlType: 'button',
});
const { icon, beforeIcon, afterIcon, block } = toRefs(props);
const { loadingIndicator, size, variant } = useButton(props);
</script>

<style lang="scss" scoped>
@use './button.scss';
</style>
