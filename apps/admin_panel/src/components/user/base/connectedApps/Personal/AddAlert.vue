<template>
  <div class="root" dir="rtl">
    <ui-InlineMessage type="warning" :title="$t('_user.accessToken.personal.alert')" />
    <p class="text-text-soft text-body-400-b3 mt-xl mb-md">
      {{ $t('_user.accessToken.personal.permission') }}
    </p>
    <ui-ClipBoard class="w-full" :content="personalToken" @copy="handleCopy" />
    <ui-Divider class="mt-xl" />

    <div class="flex justify-between float-left my-md">
      <ui-Button
        size="medium"
        class="inline-flex main__item--button"
        type="secondary"
        :text="$t('_common.buttons.ok')"
        @click="toggleModal"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const t = useI18n();
const { $notify } = useNuxtApp();

export interface Props {
  personalToken?: string;
}
withDefaults(defineProps<Props>(), {
  personalToken: '',
});
const toggleModal = inject<(() => void | undefined) | undefined>('toggleModal');
const handleCopy = () => {
  $notify({
    isRead: false,
    message: t('common.copied'),
    type: 'success',
  });
};
</script>
