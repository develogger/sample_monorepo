<template>
  <ui-PageHeading
    sticky
    size="lg"
    has-back
    class="coupon-add-header"
    :loading="loading"
    :title="data ? $t('_form.add_coupon.edit_coupon') : $t('_common.page_title.create_coupon')"
    @back-roll="$router.back()"
  >
    <template #action>
      <div class="w-fit flex gap-xs">
        <ui-Button
          v-if="!md"
          :text="data ? $t('_common.buttons.save') : $t('_common.page_title.create_coupon')"
          :disabled="!formMeta?.valid || formLoading || loading || assignLoading || !!disableButton"
          :loading="formLoading || loading || assignLoading"
          @click="formSubmit"
        />
        <ui-Button
          v-else
          icon="Plus"
          :disabled="!formMeta?.valid || formLoading || loading || assignLoading"
          :loading="formLoading || loading || assignLoading"
          @click="formSubmit"
        />
        <ui-Button
          :text="$t('_common.buttons.cancel')"
          type="tertiary"
          @click="showConfirm = true"
        />
      </div>
    </template>
  </ui-PageHeading>
  <SharedShareModalConfirm
    v-if="showConfirm"
    cancel-label="_common.buttons.continue"
    submit-label="_common.buttons.cancel_event"
    @close="showConfirm = false"
    @confirm="handleConfirm"
    @cancel="showConfirm = false"
  />
</template>

<script setup lang="ts">
import { FormMeta } from 'vee-validate';
import { useCouponQueryById } from '@/composables/coupon/useCouponQueryById';
import { useTerminalStore } from '@/stores/terminalStore';
const { data } = useCouponQueryById();
const router = useRouter();
const { md } = useSize();
const loading = inject('form_loading_edit');
const assignLoading = inject('form_assing_loading');
const domain = useTerminalStore().currentDomain;
const showConfirm = ref(false);
const disableButton = inject('disable_button');
const formSubmit = inject('form_submit');
const formLoading = inject('form_loading');
const formMeta:
  | globalThis.ComputedRef<
      FormMeta<
        Partial<{
          code: string;
          discount_percent: string;
        }>
      >
    >
  | undefined = inject('form_meta');
const handleConfirm = () => router.push('/panel/' + domain + '/coupon');
</script>
<style lang="scss">
.coupon-add-header {
  @apply px-md lg:px-0;

  &.sticky {
    @apply px-0;
  }
}
</style>
