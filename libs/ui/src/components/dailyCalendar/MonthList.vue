<template>
  <List :data="list" @action="onSelect" />
</template>

<script setup lang="ts">
import List from '../list/list.vue';
import { useDate } from '../../../../date-picker/src/composables/date';
const { monthList } = useDate();
const list = monthList.map((month, index) => ({
  id: index,
  value: month,
}));
const emit = defineEmits(['select']);
const onSelect = (id: string, value: string) => {
  emit('select', id, value);
};
</script>
