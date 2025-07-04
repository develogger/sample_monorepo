<template>
  <div class="root" dir="rtl">
    <!-- head -->
    <div class="root__head" :style="{ 'grid-template-columns': gridTemplate }">
      <div
        v-for="column in columns"
        :key="column.id"
        class="root__head__item"
        :class="column.class"
      >
        <slot
          v-if="slots[`column-${column.name.toLowerCase()}`]"
          :name="`column-${column.name}`"
          v-bind="column"
        />
        <div v-else>
          <Skeleton v-if="loading && column.label" :width="60" class="mt-[6px]">
            {{ column.label }}
          </Skeleton>
          <div v-else>
            {{ column.label }}
          </div>
        </div>
      </div>
    </div>
    <!-- body -->
    <div v-if="loading">
      <slot name="loadingSkeleton" />
    </div>
    <div v-else>
      <template v-for="(item, index) in items" :key="index">
        <div
          class="root__row--default"
          :class="item.class"
          :style="{ 'grid-template-columns': gridTemplate }"
          @mouseenter="event => $emit('hoverRow', event, item, index)"
          @mouseleave="event => $emit('hoverRow', event, item, index)"
        >
          <div
            v-for="(column, i) in headersLabel"
            :key="i"
            :class="{ 'cursor-pointer': isPointer }"
            class="root__row__rows"
            @click="$emit('clickRow', item)"
          >
            <slot
              v-if="slots[`item-${column.toLowerCase()}`]"
              :name="`item-${column.toLowerCase()}`"
              v-bind="item"
            />
            <template v-else>
              <Skeleton v-if="loading" :width="64" class="mt-[6px]">
                {{ itemTextContent(column, item) }}
              </Skeleton>
              <div v-else class="truncate">
                {{ itemTextContent(column, item) }}
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import Skeleton from '../skeleton/Skeleton.vue';
import { itemTextContent, type ColumnType, type ItemType } from './useTable';

export interface Props {
  columns: ColumnType[];
  items: ItemType[] | undefined;
  isPointer?: boolean;
  loading?: boolean;
  loadingItem?: number | undefined;
}
const props = withDefaults(defineProps<Props>(), {
  isPointer: true,
  loadingItem: undefined,
});
defineEmits(['clickRow', 'hoverRow']);
const slots = useSlots();
const headersLabel = computed((): string[] => props.columns.map(col => col.name));
/**
 * template generator width for grid table
 */
const gridTemplate = computed(() =>
  props.columns
    .map((column: ColumnType) => {
      if (column.width) {
        return `${column.width}`;
      } else {
        return 'minmax(100px, 1fr)';
      }
    })
    .join(' ')
);
</script>

<style lang="scss" scoped>
@use './table.scss';
</style>
