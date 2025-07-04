<template>
  <div class="flex flex-col gap-md">
    <ui-TextField
      v-model="name"
      :placeholder="$t('_terminal.add.name.placeholder')"
      :label="false"
      class="w-full"
      name="name"
      :helper="{
        type: !!errors?.name ? 'error' : undefined,
        message: errors?.name,
      }"
      @update:model-value="(e: string) => $emit('update:modelValue', e)"
    />
  </div>
  <div class="flex flex-col gap-sm">
    <ui-Button
      :text="$t('_common.buttons.confirm_and_continue')"
      :disabled="!meta.valid"
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
import { useTerminalNameSchema } from '@/composables/terminal/useTerminalSchema';
const emit = defineEmits(['next', 'preview', 'update:modelValue']);
interface Props {
  name: string;
}
const props = withDefaults(defineProps<Props>(), {});
const { name } = toRefs(props);
const { schema } = useTerminalNameSchema();
const { errors, meta } = useForm({
  validationSchema: schema,
});
const submit = () => {
  emit('next', name.value);
};
</script>
