<template>
  <div class="flex flex-row-reverse">
    <div v-for="item in items.filter(i => i.active).splice(0, limit)" :key="item.id" class="anime">
      <Button
        v-if="item.icon"
        type="tertiary"
        :icon="item.icon"
        class="w-[32px] h-[32px] ml-xs"
        :style="item.style"
        @click.stop="item.command"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import Button from '../button/Button.vue';
import { type Props } from './actionTypes';
const props = withDefaults(defineProps<Props>(), {});
const { items, limit } = toRefs(props);
</script>
<style lang="scss" scoped>
.anime {
  animation: anime 0.3s linear;
}
@keyframes anime {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>
