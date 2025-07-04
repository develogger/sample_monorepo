<template>
  <div>
    <ui-Modal
      close-icon
      :text="$t('_common.modal.redirect_old_panel.title')"
      width="480px"
      @close="$emit('close')"
    >
      <template #body>
        <div class="flex justify-center mb-xl">
          <ui-Illustration name="OldPanelSession" />
        </div>
        <div class="text-text text-body-400-b2 mb-xs">
          {{ $t('_common.modal.redirect_old_panel.description_one') }}
        </div>
        <div class="text-text text-body-400-b2 mb-xs">
          {{ $t('_common.modal.redirect_old_panel.description_two') }}
        </div>
        <div class="flex flex-col justify-end items-end gap-sm ltr mt-xl">
          <ui-Radio
            v-for="(item, index) in reasonListKey"
            :key="index"
            :disabled="loading"
            name="receipt"
            :label="$t(`_common.modal.redirect_old_panel.${item}`)"
            :value="item"
            :picked="reason"
            :loading="loading"
            @selected-value="reasonSelected"
          />
          <ui-Textarea
            v-if="reason !== 'feedback_one' && reason !== 'skippedToProvideFeedback'"
            ref="textarea"
            v-model="otherReason"
            :disabled="loading"
            auto-focus
            dir="ltr"
            class="w-full float-right"
            :max-length="1000"
            name="description"
            :placeholder="buttonPlaceholder"
          />
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-xs w-full">
          <ui-Button :loading="loading" :text="buttonText" type="light" block @click="setData" />
        </div>
      </template>
    </ui-Modal>
  </div>
</template>

<script setup lang="ts">
import { UiTextarea } from '#components';
const t = useI18n();
const emit = defineEmits(['close', 'redirect']);
const reason = ref('skippedToProvideFeedback');
const textarea = ref<InstanceType<typeof UiTextarea> | null>(null);
const otherReason = ref('');
const loading = ref(false);
const reasonListKey = ['feedback_one', 'feedback_two', 'feedback_three', 'feedback_four'];
const buttonText = computed(() => {
  if (reason.value !== 'skippedToProvideFeedback') {
    return t('_common.modal.redirect_old_panel.button_two');
  } else {
    return t('_common.modal.redirect_old_panel.button_one');
  }
});
const buttonPlaceholder = computed(() => {
  switch (reason.value) {
    case 'feedback_two':
      return t('_common.modal.redirect_old_panel.placeholderOne');
    case 'feedback_three':
      return t('_common.modal.redirect_old_panel.placeholderTwo');
    case 'feedback_four':
      return t('_common.modal.redirect_old_panel.placeholderThree');
    default:
      return t('_common.modal.redirect_old_panel.placeholderThree');
  }
});
const reasonSelected = async (value: string) => {
  reason.value = value;
  await nextTick();

  if (textarea.value) {
    textarea.value.$el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};
const setData = () => {
  loading.value = true;
  if (reason.value === 'feedback_four' && otherReason.value.length) {
    emit('redirect', otherReason.value);
  } else {
    emit('redirect', reason.value);
  }
};
</script>
