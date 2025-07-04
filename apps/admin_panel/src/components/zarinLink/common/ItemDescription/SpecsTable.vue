<template dir="rtl">
  <div class="my-lg rounded-lg">
    <div
      v-for="(item, index) in rows"
      :key="item.id"
      class="flex items-center w-full flex-row-reverse mb-sm"
    >
      <ui-TextField
        v-model="item.key"
        :max-length="30"
        :show-max-length-limit="false"
        class="ml-md w-full"
        :name="`key-${item.id}`"
        :placeholder="$t('_zarin_link.form.spec_table.title')"
      />
      <ui-TextField
        v-model="item.value"
        :max-length="100"
        :show-max-length-limit="false"
        class="w-full"
        :name="`value-${item.id}`"
        :placeholder="$t('_zarin_link.form.spec_table.value')"
      />

      <div
        :class="{ 'w-1/3 justify-end flex items-center': rows.length > 0, invisible: index === 0 }"
      >
        <ui-Button class="mr-md" icon="Trash" type="tertiary" @click="removeRow(index)" />
      </div>
    </div>
    <div class="w-full flex justify-end">
      <ui-Button
        v-if="!hideAddRow"
        class="mb-sm"
        before-icon="Plus"
        variant="outlined"
        :disabled="!canAddRow"
        :text="$t('_zarin_link.form.spec_table.add_new_row')"
        @click="addRow"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SetValueType } from '~/components/zarinLink/subscription/add/Main.vue';
const props = defineProps<{ specRowsData: Array<{ key: string; value: string }> }>();
const emit = defineEmits(['update:specRowsData']);
const formSetValues: SetValueType | undefined = inject('form_set_values');
const { specRowsData } = toRefs(props);
const rows = ref(
  specRowsData.value.map((item, index) => ({
    ...item,
    id: `${Date.now()}-${index}`,
  }))
);

function addRow() {
  if (canAddRow.value) {
    const newRow = {
      id: `${Date.now()}-${Math.random()}`,
      key: '',
      value: '',
    };
    rows.value.push(newRow);
  }
}

function removeRow(index: number) {
  rows.value.splice(index, 1);
}
const hideAddRow = computed(() => rows.value.length === 10);
const canAddRow = computed(() => {
  const lastRow = rows.value[rows.value.length - 1];
  const key = lastRow?.key.trim();
  const value = lastRow?.value.trim();

  if (key?.length >= 1 && key?.length <= 30 && value?.length >= 1 && value?.length <= 100) {
    return true;
  }
});

watchEffect(() => {
  if (formSetValues) {
    formSetValues(
      {
        isSpecTableValid: canAddRow.value === undefined ? false : canAddRow.value,
      },
      false
    );
  }
});

onUnmounted(() => {
  if (formSetValues) {
    formSetValues(
      {
        isSpecTableValid: true,
      },
      false
    );
  }
});

watch(
  rows,
  newVal => {
    const newSpecRowsData = newVal.map(item => ({ key: item.key, value: item.value }));

    return emit('update:specRowsData', [...newSpecRowsData]);
  },
  { deep: true }
);
</script>

<style scoped></style>
