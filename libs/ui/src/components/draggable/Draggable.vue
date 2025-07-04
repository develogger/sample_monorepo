<template>
  <draggable
    v-model="localList"
    :disabled="false"
    item-key="title"
    ghost-class="ghost"
    @start="dragging = true"
    @end="endHandler"
  >
    <template #item="{ element }">
      <div>
        <slot :element="element"></slot>
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';
import draggable from 'vuedraggable';

const emit = defineEmits(['end']);
interface DraggableItem {
  id: number;
  title: string;
}
export interface Props {
  list: DraggableItem[];
}
const props = withDefaults(defineProps<Props>(), {});
const { list: items } = toRefs(props);
const localList = ref(items.value);
const dragging = ref<boolean>(false);
const endHandler = () => {
  dragging.value = false;
  emit('end', localList.value);
};
</script>
