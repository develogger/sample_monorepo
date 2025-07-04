<template>
  <List :data="data" @action="onSelect" />
</template>

<script setup lang="ts">
import { toRefs, type Ref } from 'vue';
import List from '../list/list.vue';

export interface Props {
  data: Ref;
}
const props = withDefaults(defineProps<Props>(), {});
const { data } = toRefs(props);
const emit = defineEmits(['select']);
const onSelect = (id: string, value: string) => {
  emit('select', id, value);
};
</script>
