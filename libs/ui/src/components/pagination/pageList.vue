<template>
  <div>
    <List :data="listPage" :width="65" @action="listAction" />
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs, type Ref } from 'vue';

import List from '../list/list.vue';

export interface Props {
  data: Ref;
}
const props = withDefaults(defineProps<Props>(), {});
const { data } = toRefs(props);
/**
 * create list from page number length
 */
const listPage = computed(() =>
  Array.from({ length: data.value }, (_, index) => ({
    action: () => {},
    id: index + 1,
    value: index + 1,
  }))
);
const emit = defineEmits(['action']);
const listAction = (id: number | string, value: string) => {
  emit('action', id, value);
};
</script>
