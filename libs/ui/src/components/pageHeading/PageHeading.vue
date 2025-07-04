<template>
  <div
    :class="[
      fixed ? 'sticky top-[56px] z-50' : '',
      md && description ? 'h-[110px]' : description ? 'h-[100px]' : 'h-[70px]',
      md && hasBack ? '!h-[128px]' : '',
    ]"
  >
    <div dir="rtl" class="transition-opacity py-md" :class="fixed && classFixed">
      <div class="flex flex-col gap-xs lg:gap-2xs" :class="sizeStyle">
        <div class="flex gap-md">
          <div v-if="hasBack">
            <Button
              icon="ArrowRight"
              type="tertiary"
              class="w-[40px] h-[40px]"
              :loading="loading"
              @click="emit('backRoll')"
            />
          </div>
          <div class="flex justify-between items-center w-full gap-xs truncate">
            <div class="flex gap-xs truncate items-center">
              <div
                v-if="(!loading && !md) || (md && !hasBack && !loading) || (fixed && !loading)"
                class="text-heading-600-h1 truncate heading-title"
              >
                {{ title }}
                <slot name="title" />
              </div>
              <Skeleton v-else-if="loading" />
              <Status
                v-if="(status && !loading && !fixed && hasBack && !md) || (status && !hasBack)"
                :text="status.text"
                :type="status.type"
                class="h-fit"
              />
              <slot v-if="slots.content && !md" name="content" />
            </div>
            <span v-if="slots.action" dir="ltr">
              <slot name="action" />
            </span>
          </div>
        </div>
        <div v-if="!fixed" class="flex flex-col gap-xs" :class="{ 'mr-[56px]': hasBack && !md }">
          <div v-if="hasBack && md" class="flex gap-xs truncate items-center">
            <div v-if="!loading" class="text-heading-600-h1 truncate">
              {{ title }}

              <slot name="title" />
            </div>
            <Skeleton v-else />
            <Status
              v-if="status && !loading"
              class="h-fit"
              :text="status.text"
              :type="status.type"
            />
            <slot v-if="slots.content" name="content" />
          </div>
          <span v-if="!loading" class="text-body-400-b2 text-text-soft">{{
            description ? description : ''
          }}</span>
          <Skeleton v-else-if="loading && description" class="mt-2xs" :width="180" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots, toRefs, computed, onMounted, onUnmounted, ref, nextTick } from 'vue';
import useSize from '../../composables/useSize';
import Button from '../button/Button.vue';
import Status from '../status/Status.vue';
import Skeleton from '../skeleton/Skeleton.vue';

export interface Props {
  sticky?: boolean;
  classFixed?: string;
  size?: 'lg' | 'md' | 'xl' | '2xl';
  title: string;
  description?: string;
  hasBack?: boolean;
  status?: {
    type: string;
    text: string;
  };
  loading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  sticky: false,
  classFixed:
    'sticky bg-surface z-50 w-full -left-[0px] shadow-elevation-100 top-[56px] !py-sm px-md',
  size: undefined,
  description: '',
  status: undefined,
});
const { classFixed, sticky, size, description, title, hasBack, status } = toRefs(props);
const emit = defineEmits(['backRoll']);
const fixed = ref();
const { md } = useSize();
const slots = useSlots();
const sizeStyle = computed(() =>
  size.value && size.value === '2xl'
    ? 'w-full lg:mx-auto max-w-[910px] px-md md:px-0'
    : `container-${size.value} ${size.value === 'lg' && 'xl:px-3xl'}`
);
const logScroll = () => {
  nextTick(() => {
    fixed.value = window.scrollY >= 10;
  });
};

onMounted(() => {
  if (sticky.value) {
    window.addEventListener('scroll', logScroll);
  }
});

onUnmounted(() => {
  if (sticky.value) {
    window.removeEventListener('scroll', logScroll);
  }
});
</script>

<style lang="scss" scoped>
@use './pageHeading.scss';
</style>
