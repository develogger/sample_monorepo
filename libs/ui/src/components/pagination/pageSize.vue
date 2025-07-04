<template>
  <div>
    <List :data="pageSizeList" :width="65" class="!max-h-[unset]" @action="listAction" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import List from '../list/list.vue';

const emit = defineEmits(['action']);
const listAction = (id: string | number, value: string) => {
  emit('action', id, value);
};
/**
 * page size list
 */
const pageSizeList = ref([
  {
    id: 1,
    value: 5,
  },
  {
    id: 2,
    value: 10,
  },
  {
    id: 3,
    value: 15,
  },
  {
    id: 4,
    value: 20,
  },
  {
    id: 5,
    value: 25,
  },
]);
</script>
