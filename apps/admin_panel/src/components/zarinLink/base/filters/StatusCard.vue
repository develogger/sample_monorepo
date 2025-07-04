<template>
  <div class="root">
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
        <div class="root__list w-[300px]">
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
        <div class="root__footer">
          <ui-Button :text="$t('_common.buttons.confirm')" block @click="handleData" />
        </div>
      </template>
    </ui-Card>
  </div>
</template>

<script setup lang="ts">
import { ZarinLinkFilterEnum } from '@/graphql/graphql';
import { useZarinLinkFilter } from '@/composables/zarinlink/useZarinLinkFilter';
const { statusList } = useZarinLinkFilter();
interface Props {
  isShow: Ref;
}
const props = defineProps<Props>();
const { isShow } = toRefs(props);
const selectedValue = ref<string>();
const emit = defineEmits(['action', 'clear']);
const route = useRoute();
const handleData = () => {
  emit('action', selectedValue.value);
};
const handleClear = () => {
  emit('clear');
};
const selectFilter = (item: { label: string; value: string }) => {
  selectedValue.value = item.value;
};
onMounted(() => {
  if (route.query.status) {
    selectedValue.value = route.query.status as string;
  } else {
    selectedValue.value = ZarinLinkFilterEnum.All;
  }
});
watch(
  () => [route.query, isShow.value],
  () => {
    if (!route.query.status) {
      selectedValue.value = ZarinLinkFilterEnum.All;
    }
  }
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
