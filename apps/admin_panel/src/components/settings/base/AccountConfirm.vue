<template>
  <div class="root" dir="rtl">
    <ui-Modal
      :text="$t('_helper.settings.bankAccount_question')"
      close-icon
      header
      class="lg:max-w-[480px]"
      @close="toggleModal"
    >
      <template #body>
        <ui-InlineMessage
          :description="$t('_helper.settings.shaparak_confirm_hint')"
          class="mb-md mt-xs"
          type="warning"
        />
        <div class="text-text-soft text-body-400-b3 mb-md mt-xl">
          {{ $t('_helper.settings.selected_bankAccount') }}
        </div>
        <div
          v-if="bankAccount"
          class="flex px-md py-lg border border-border-divider rounded-sm gap-sm mb-md"
        >
          <div
            v-if="bankAccount?.issuing_bank?.slug"
            class="h-[40px] w-[40px] border border-border-soft bg-surface-soft rounded-md p-xs"
          >
            <ui-BankLogo :name="bankAccount.issuing_bank.slug" class="w-[24px] h-[24px]" />
          </div>
          <div class="flex flex-col gap-2xs">
            <span
              class="font-Mono text-body-400-b2 max-w-[220px] break-words break-all sm:max-w-none"
            >
              {{ bankAccount?.iban }}
            </span>
            <span class="text-caption-400-c1 text-text-soft">
              {{ bankAccount?.holder_name }} |
              {{ bankAccount?.issuing_bank?.name }}
            </span>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-xs w-full">
          <ui-Button :text="$t('_common.buttons.cancel')" type="secondary" @click="toggleModal" />
          <ui-Button :text="$t('_common.buttons.submit_save')" @click="handleSubmit" />
        </div>
      </template>
    </ui-Modal>
  </div>
</template>

<script lang="ts" setup>
import { BankAccount } from '~/graphql/graphql';

export interface Props {
  modelValue: boolean;
  bankAccount: BankAccount;
}
const emit = defineEmits(['update:modelValue', 'done']);
const props = withDefaults(defineProps<Props>(), {});
const { bankAccount } = toRefs(props);
const handleSubmit = () => {
  emit('done');
  toggleModal();
};
const toggleModal = () => {
  emit('update:modelValue', false);
};
</script>
