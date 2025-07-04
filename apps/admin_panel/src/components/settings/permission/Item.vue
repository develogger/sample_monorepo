<template>
  <div class="flex justify-between">
    <span
      class="text-body-400-b2"
      :class="{ 'text-text-disabled dark:text-text-dark-disabled': disabled }"
    >
      {{ label }}
    </span>
    <ui-Toggle
      :model-value="checked"
      :disabled="disabled"
      :name="name"
      @update:model-value="updateChecked"
    />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  name: string;
  label: string;
  checked: boolean;
  disabled: boolean;
}
const emit = defineEmits(['update:checked']);
withDefaults(defineProps<Props>(), {});

function updateChecked(value: boolean) {
  emit('update:checked', value);
}
</script>
