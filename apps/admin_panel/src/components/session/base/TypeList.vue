<template>
  <div class="root mt-[5px]">
    <ui-Card>
      <template #header>
        <div class="flex justify-between flex-row-reverse items-center">
          <div class="root__header">{{ $t('_form.search.paymentMethod') }}</div>
          <ui-Button
            v-if="!!route.query.type"
            :text="$t('_common.buttons.removeFilter')"
            type="tertiary"
            variant="text"
            before-icon="DeleteFill"
            size="small"
            class="pl-0 -ml-2xs !text-text-soft"
            @click="handleClear"
          />
        </div>
      </template>
      <template #main>
        <div class="root__list w-[300px]">
          <ui-Radio
            v-for="(item, index) in data"
            :key="item.value"
            :tabindex="index"
            name="type"
            :label="item.label"
            :value="item.value"
            :picked="selectedValue"
            @click="selectFilter(item)"
          />
        </div>
      </template>
      <template #footer>
        <div class="root__footer">
          <ui-Button :text="$t('_common.buttons.confirm')" block @click="handleData" />
        </div>
      </template>
    </ui-Card>
  </div>
</template>

<script setup lang="ts">
import intersectionBy from 'lodash/intersectionBy';
import { useSessionFilter } from '@/composables/session/useSessionFilter';

export interface Value {
  label: string;
  name?: string;
  value: string;
}
interface Props {
  isShow: Ref;
}
const props = defineProps<Props>();
const { isShow } = toRefs(props);
const selectedValue = ref<string>();
const emit = defineEmits(['action', 'clear']);
const handleClear = () => {
  emit('clear');
};
const route = useRoute();
const { typeList } = useSessionFilter();
const store = useSessionStore();
const data = computed(() => {
  if (store.sessionType) {
    return intersectionBy(typeList.value, store.sessionType, 'name') as Value[];
  }

  return typeList.value as Value[];
});
const handleData = () => {
  emit('action', selectedValue.value);
};
const selectFilter = (item: Value) => {
  selectedValue.value = item.value;
};
watch(
  () => [route.query, isShow.value],
  () => {
    if (!route.query.type) {
      selectedValue.value = '';
    } else {
      selectedValue.value = route.query.type as string;
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.root {
  &__header {
    @apply text-right text-heading-600-h3;
  }
  &__list {
    @apply flex flex-col items-end gap-sm w-[266px] my-md;
  }
}
</style>
