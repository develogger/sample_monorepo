<template>
  <div class="time-line" dir="rtl">
    <div class="time-line__icon">
      <span class="time-line__icon--before" :class="{ '!bg-transparent': isFirst }" />
      <Skeleton v-if="loading" :width="24" :height="24" radius="circle" />
      <Icon v-else :name="icon" :class="iconClass" />
      <span class="time-line__icon--after" :class="{ '!bg-transparent': isLast }" />
    </div>
    <div class="time-line__main" :class="isLast ? 'mt-xs' : isFirst ? 'mb-xs' : 'my-xs'">
      <div v-if="title && !loading" class="time-line__main--title">
        {{ title }}
      </div>
      <Skeleton v-if="loading" :width="80" :height="16" class="mb-sm" />
      <div v-if="subTitle && !loading" class="time-line__main--subTitle">
        {{ subTitle }}
      </div>
      <Skeleton v-if="loading" :width="140" :height="12" class="mb-sm" />
      <div v-if="caption && !loading" class="time-line__main--caption">
        {{ caption }}
      </div>
      <Skeleton v-if="loading" :width="120" :height="12" />
      <slot name="action" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { toRefs } from 'vue';
import Icon from '../icon/Icon.vue';
import Skeleton from '../skeleton/Skeleton.vue';

export interface Props {
  icon?: string;
  iconClass?: string;
  subTitle?: string;
  title?: string;
  caption?: string;
  loading?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  icon: '',
  title: '',
  caption: '',
  subTitle: '',
  iconClass: '',
});
const { title } = toRefs(props);
</script>
<style lang="scss" scoped>
@use './timeLine.scss';
</style>
