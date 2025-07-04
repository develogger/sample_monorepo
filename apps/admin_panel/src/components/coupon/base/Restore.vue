<template>
  <div class="root" dir="rtl">
    <ui-Modal
      ref="filterRef"
      :text="$t('_common.modal.active_coupon')"
      close-icon
      header
      class="lg:max-w-[400px]"
      @close="toggleModal"
    >
      <template #body>
        <div class="text-text text-body-400-b2 mb-xs">{{ $t('_form.add_coupon.restore') }}</div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-xs w-full">
          <ui-Button
            type="secondary"
            size="medium"
            :disabled="loading"
            :text="$t('_common.buttons.cancel')"
            @click="toggleModal"
          />
          <ui-Button
            :disabled="loading"
            :loading="loading"
            size="medium"
            :text="$t('_common.buttons.save')"
            @click="restore()"
          />
        </div>
      </template>
    </ui-Modal>
  </div>
</template>

<script lang="ts" setup>
import { useCouponMutation } from '@/composables/coupon/useCouponMutation';

export interface Props {
  modal?: boolean;
  id: string;
}
const emit = defineEmits(['close', 'done']);
const t = useI18n();
const { $notify } = useNuxtApp();
const props = withDefaults(defineProps<Props>(), {});
const { id } = toRefs(props);
const { restoreCoupon } = useCouponMutation();
const { mutate, onDone, loading } = restoreCoupon();
const toggleModal = inject<(() => void | undefined) | undefined>('toggleRestore');
const restore = () => {
  const variablesDelete = {
    id: id.value,
  };
  mutate(variablesDelete);
};
onDone(() => {
  emit('done');
  $notify({
    isRead: false,
    message: t('_form.add_coupon.success_recycle'),
    type: 'success',
  });
});
</script>
