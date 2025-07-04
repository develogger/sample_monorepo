<template>
  <div class="filter mt-[5px]">
    <ui-Card>
      <template #header>
        <div class="flex justify-between flex-row-reverse items-center">
          <div class="root__header">{{ $t('_common.filters.status') }}</div>
          <ui-Button
            v-if="!!route.query.status"
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
        <div class="filter__list w-[300px]">
          <ui-Radio
            v-for="(item, index) in statusList"
            :key="item.value"
            :tabindex="index"
            name="status"
            :label="item.label"
            :value="item.value"
            :picked="selectedValue"
            @click="selectFilter(item)"
          />
        </div>
      </template>
      <template #footer>
        <div class="mt-xl">
          <ui-Button :text="$t('_common.buttons.confirm')" block @click="handleData" />
        </div>
      </template>
    </ui-Card>
  </div>
</template>

<script setup lang="ts">
import { FilterEnum, InstantPayoutStatusEnum } from '@/graphql/graphql';

export interface Value {
  label: string;
  value: string;
}
interface Props {
  isShow: Ref;
}
const props = defineProps<Props>();
const { isShow } = toRefs(props);
const selectedValue = ref<string>();
const route = useRoute();
const emit = defineEmits(['action', 'clear']);
const handleData = () => {
  emit('action', selectedValue.value);
};
const handleClear = () => {
  emit('clear');
};
const selectFilter = (item: Value) => {
  selectedValue.value = item.value;
};
const { statusList } = useInstantFilter();
watch(
  () => [route.query, isShow.value],
  () => {
    const status = Object.values(InstantPayoutStatusEnum).includes(
      route.query.status as InstantPayoutStatusEnum
    );
    if (!route.query.status || !status) {
      selectedValue.value = FilterEnum.All;
    } else {
      selectedValue.value = route.query.status as string;
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.filter {
  &__list {
    @apply flex flex-col items-end mt-xl gap-sm;
  }
}
.root {
  &__header {
    @apply text-right text-heading-600-h3;
  }
  &__list {
    @apply flex flex-col items-end gap-sm w-[266px] my-md;
  }
}
</style>
