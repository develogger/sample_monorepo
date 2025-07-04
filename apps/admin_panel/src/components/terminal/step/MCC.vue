<template>
  <div class="flex flex-col gap-md">
    <ui-AutoComplete
      name="mcc"
      :data="categories"
      after-icon="AngleDown"
      :value="mcc"
      :placeholder="$t('_common.slug.category')"
      :loading="isLoading"
      :disable="isLoading"
      @selected-item="selectCategory"
    />
  </div>
  <div class="flex flex-col gap-sm">
    <ui-Button
      :text="$t('_common.buttons.confirm_and_submit')"
      :disabled="isLoading || !mcc.id"
      :loading="loading"
      size="large"
      @click="submit"
    />
    <ui-Button
      :text="$t('_common.buttons.return')"
      type="tertiary"
      size="large"
      @click="$emit('preview')"
    />
  </div>
</template>

<script lang="ts" setup>
import { useTerminalCategoriesQuery } from '@/composables/terminal/useTerminalCategoriesQuery';
interface SelectValue {
  title: string;
  id: number;
}
interface Props {
  loading: boolean;
  mcc: SelectValue;
}
const props = withDefaults(defineProps<Props>(), {});
const { loading, mcc } = toRefs(props);
const emit = defineEmits(['submit', 'preview']);
const { data, loading: categoriesLoading } = useTerminalCategoriesQuery();
const categories: Ref<SelectValue[]> = computed(() => {
  if (!data.value?.length) {
    return [] as SelectValue[];
  }

  return data.value.map(category => ({
    id: category?.id as unknown as number,
    title: category?.title as string,
    disabled: !category?.parent_id,
  }));
});
const selectCategory = (item: SelectValue) => {
  mcc.value.id = item.id;
  mcc.value.title = item.title;
};
const submit = () => {
  emit('submit', mcc.value);
};
const isLoading = computed(() => loading.value || categoriesLoading.value);
</script>
