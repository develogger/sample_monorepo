<template>
  <div>
    <ui-Modal
      close-icon
      :text="$t('_common.modal.out_of_service')"
      width="480px"
      @close="$emit('close')"
    >
      <template #body>
        <div class="flex justify-center mb-xl">
          <ui-Illustration name="TimeRange" />
        </div>
        <div class="text-text-soft text-body-400-b2 mb-xs font-medium">
          {{ text }}
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-xs w-full">
          <ui-Button :text="$t('_common.buttons.ok')" type="light" block @click="$emit('close')" />
        </div>
      </template>
    </ui-Modal>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  text: string;
}
defineProps<Props>();
defineEmits(['close']);
</script>
