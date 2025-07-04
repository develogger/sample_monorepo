<template>
  <div class="sidebar" :class="[show ? 'show' : 'close']">
    <div id="sidebar-container" class="sidebar__container">
      <div v-if="$slots.header" class="sidebar__header">
        <slot name="header" />
      </div>
      <div v-if="$slots.main" class="sidebar__main">
        <slot name="main" />
      </div>
      <div v-if="$slots.footer" class="sidebar__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
  <Teleport v-if="show" to="body">
    <div class="drawer"></div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, toRefs } from 'vue';

export interface Props {
  show: boolean;
  text?: string;
  closeIcon?: boolean;
  header?: boolean;
  outsideClick?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  text: '',
  outsideClick: true,
});
const { outsideClick, show } = toRefs(props);
const emits = defineEmits(['close']);
// directive for outside click
const vOutsideClick = (event: MouseEvent) => {
  const sidebarContainer = document.getElementById('sidebar-container');
  if (outsideClick.value && sidebarContainer && !sidebarContainer.contains(event.target as Node)) {
    closeSidebar(event);
  }
};

onMounted(() => {
  document.body.addEventListener('click', vOutsideClick);
});
const closeSidebar = (value: MouseEvent) => {
  emits('close', value);
};
</script>
<style lang="scss">
@use './sidebar.scss';
</style>
