<template>
  <div>
    <ui-Modal
      class="w-full lib-view lg:max-w-[400px] h-[200px]"
      close-icon
      :text="$t(title)"
      @close="$emit('close')"
    >
      <template #body>
        <div class="text-text text-body-400-b2 mb-xs">{{ $t(description) }}</div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-xs w-full">
          <ui-Button
            :disabled="loading"
            :text="$t(cancelLabel)"
            type="secondary"
            @click="$emit('cancel')"
          />
          <ui-Button
            :text="$t(submitLabel)"
            type="decretive"
            :loading="loading"
            :disabled="loading"
            @click="$emit('confirm')"
          />
        </div>
      </template>
    </ui-Modal>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  title?: string;
  description?: string;
  submitLabel?: string;
  cancelLabel?: string;
  loading: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '_common.modal.un_saved',
  description: '_common.modal.close_page',
  submitLabel: '_common.buttons.continue',
  cancelLabel: '_common.buttons.cancel_event',
});
const { title, description, submitLabel, cancelLabel } = toRefs(props);
defineEmits(['close', 'cancel', 'confirm']);
</script>
