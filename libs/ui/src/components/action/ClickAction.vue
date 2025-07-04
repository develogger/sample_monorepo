<template>
  <Card class="!p-xs" style="width: {{ width }}">
    <template #main>
      <div class="flex flex-col">
        <div v-for="item in items.filter(i => i.active)" :key="item.id">
          <NavLink
            dir="ltr"
            :label="item.label"
            :icon="item.icon"
            :style="item.style"
            :arrow="false"
            @click.stop="onClick(item.command)"
          />
          <Divider v-if="item.divider" class="my-xs" />
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { toRefs, inject } from 'vue';
import NavLink from '../navLink/NavLink.vue';
import Divider from '../divider/Divider.vue';
import Card from '../card/Card.vue';
import { type Props } from './actionTypes';
const toggleShow = inject<() => void>('toggleShow');
const props = withDefaults(defineProps<Props>(), {
  width: '200px',
});
const { items } = toRefs(props);
const onClick = (item: (() => void) | undefined) => {
  if (item && toggleShow) {
    toggleShow();
    item();
  }
};
</script>
