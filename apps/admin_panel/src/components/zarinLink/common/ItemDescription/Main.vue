<template>
  <div class="flex flex-col w-full">
    <ui-Textarea
      v-model="localModelDescription"
      auto-focus
      :loading="loading"
      :disabled="loading"
      class="w-full float-right"
      :max-length="maxLength"
      :name="descriptionName"
      :placeholder="placeholder || $t('_zarin_link.form.description')"
      :helper="{
        type: errors?.[descriptionName] ? 'error' : 'info',
        message: errors?.[descriptionName] || extraDescription,
      }"
    />
    <div v-if="showSpecTable" class="my-sm">
      <ui-Checkbox
        v-model="showSpecTableModel"
        :checked="showSpecTableModel"
        :label="$t('_zarin_link.form.spec_table.add_spec_table')"
        class="ml-2xs"
        name="spec"
      />
      <SpecsTable v-if="showSpecTableModel" v-model:specRowsData="specRowsDataComputed" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SpecsTable from './SpecsTable.vue';

const props = withDefaults(
  defineProps<{
    description: string;
    specRowsData: { key: string; value: string }[];
    loading: boolean;
    maxLength?: number;
    errors: Record<string, string> | null;
    showSpecTable: boolean;
    descriptionName?: string;
    placeholder?: string;
    extraDescription?: string;
  }>(),
  {
    showSpecTable: false,
    loading: false,
    maxLength: 250,
    descriptionName: 'description',
    placeholder: '',
    extraDescription: '',
  }
);
const {
  description,
  specRowsData,
  errors,
  descriptionName,
  extraDescription,
  loading,
  placeholder,
  showSpecTable,
  maxLength,
} = toRefs(props);
const emit = defineEmits(['update:description', 'update:specRowsData', 'submit']);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const t = useI18n();
const showSpecTableModel = ref(specRowsData.value && specRowsData.value.length > 0);

watch(description, newValue => {
  emit('update:description', newValue);
});
const localModelDescription = computed({
  get: () => description,
  set: value => emit('update:description', value),
});
const specRowsDataComputed = computed({
  get: () => props.specRowsData,
  set: val => emit('update:specRowsData', val),
});
watch(showSpecTableModel, () => {
  if (showSpecTableModel.value === false) {
    return emit('update:specRowsData', null);
  } else {
    return emit('update:specRowsData', [{ key: '', value: '', id: `${Date.now()}` }]);
  }
});
watch(specRowsData, () => {
  showSpecTableModel.value = specRowsData.value !== null && specRowsData.value.length > 0;
});
</script>
