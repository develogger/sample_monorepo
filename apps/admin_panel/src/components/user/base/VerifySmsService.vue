<template>
  <ui-Modal
    close-icon
    :text="$t('_user.notification.activate_sms')"
    class="w-full lib-view lg:max-w-[440px] max-h-[300px]"
    @close="emit('close')"
  >
    <template #body>
      <ui-InlineMessage
        class="mb-md mt-xs"
        type="informative"
        :title="$t('_form.user.verify_service')"
      >
        <template #description>
          <div class="alert-box" dir="rtl">
            <p
              class="alert-box__description before:content-[''] before:absolute right-[1px] before:rounded-circle before:bg-black-100 before:w-[3px] before:h-[3px] before:mt-[9px] before:mr-[-8px]"
            >
              {{ $t('_form.user.verfy_sms_des1') }}
            </p>
            <p
              class="alert-box__description before:content-[''] before:absolute right-[1px] before:rounded-circle before:bg-black-100 before:w-[3px] before:h-[3px] before:mt-[9px] before:mr-[-8px]"
            >
              {{ $t('_form.user.verfy_sms_des2') }}
            </p>
          </div>
        </template>
      </ui-InlineMessage>
    </template>
    <template #footer>
      <div class="flex justify-end w-full">
        <ui-Button :text="$t('_common.buttons.activate')" @click="emit('submit')" />
      </div>
    </template>
  </ui-Modal>
</template>
<script lang="ts" setup>
const emit = defineEmits(['close', 'submit']);
</script>
