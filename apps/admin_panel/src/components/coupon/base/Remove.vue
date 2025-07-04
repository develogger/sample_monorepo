<template>
  <div class="root" dir="rtl">
    <ui-Modal
      ref="filterRef"
      :text="$t('_common.modal.disable_coupon')"
      close-icon
      header
      class="lg:max-w-[400px] h-[250px]"
      @close="toggleModal"
    >
      <template #body>
        <div class="text-text text-body-400-b2 mb-xs">{{ $t('_form.add_coupon.deeactive') }}</div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-xs w-full">
          <ui-Button
            :disabled="loading"
            type="secondary"
            size="medium"
            :text="$t('_common.buttons.cancel')"
            @click="toggleModal"
          />
          <ui-Button
            :loading="loading"
            :disabled="loading"
            type="decretive"
            size="medium"
            :text="$t('_common.buttons.deactivate_button')"
            @click="remove()"
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
const { removeCoupon } = useCouponMutation();
const { mutate, onDone, loading } = removeCoupon();
const toggleModal = inject<(() => void | undefined) | undefined>('toggleModal');
const remove = () => {
  const variablesDelete = {
    id: id.value,
  };
  mutate(variablesDelete);
};
onDone(() => {
  emit('done');
  $notify({
    isRead: false,
    message: t('_form.add_coupon.success_deactive'),
    type: 'success',
  });
});
</script>
