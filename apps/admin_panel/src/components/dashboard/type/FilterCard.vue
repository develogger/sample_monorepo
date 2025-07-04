<template>
  <div class="root mt-[5px]">
    <ui-Card>
      <template #main>
        <div class="root__list flex flex-col gap-xs text-body-400-b2">
          <ui-NavLink
            v-for="item in dateFilterList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
            :picked="selectedValue"
            :active="item.id === selectedValue"
            :arrow="false"
            @click="selectFilter(item)"
          >
          </ui-NavLink>
        </div>
      </template>
    </ui-Card>
  </div>
</template>

<script setup lang="ts">
export interface Value {
  label: string;
  value: string;
}
const selectedValue = ref<string>('month');
const emit = defineEmits(['action', 'clear']);
const route = useRoute();
const handleData = () => {
  emit('action', selectedValue.value);
};
const selectFilter = (item: Record<string, string>) => {
  selectedValue.value = item.id;
  handleData();
};
const { dateFilterList } = useDateFilterColumn();
watch(
  () => route.query,
  () => {
    if (route.query.dateType) {
      selectedValue.value = route.query.dateType as string;
    } else {
      selectedValue.value = 'month';
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.root {
  &__header {
    @apply text-right text-heading-600-h3;
  }
  &__list {
    @apply flex flex-col items-end gap-sm w-[266px];
  }
}
</style>
