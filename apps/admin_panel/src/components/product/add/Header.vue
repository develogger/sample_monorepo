<template>
  <ui-PageHeading
    sticky
    :title="data ? $t('_form.addProduct.edit_product') : $t('_common.buttons.create_product')"
    size="lg"
    class="product-add-header"
    has-back
    :loading="formLoadingImage || formLoading || formLoadingEdit || loading"
    @back-roll="handleConfirm"
  >
    <template #action>
      <div class="w-fit flex gap-xs">
        <ui-Button
          :text="data ? $t('_common.buttons.save') : $t('_common.buttons.create_product')"
          :loading="formLoadingImage || formLoading || formLoadingEdit || loading"
          :disabled="!formMeta?.valid || (updated && isFormDirty)"
          @click="formSubmit"
        />
        <ui-Button
          :text="$t('_common.buttons.cancel')"
          type="tertiary"
          :loading="formLoadingImage || formLoading || formLoadingEdit || loading"
          :disabled="formLoadingImage || formLoading || formLoadingEdit"
          @click="showConfirm = true"
        />
      </div>
    </template>
  </ui-PageHeading>
  <SharedShareModalConfirm
    v-if="showConfirm"
    cancel-label="_common.buttons.continue"
    submit-label="_common.buttons.cancel_event"
    :loading="formLoadingImage || formLoading || formLoadingEdit"
    @close="showConfirm = false"
    @confirm="handleConfirm"
    @cancel="showConfirm = false"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { FormMeta } from 'vee-validate';
import { useTerminalStore } from '@/stores/terminalStore';
import { useProductQueryById } from '@/composables/product/useProductQueryById';
const router = useRouter();
const route = useRoute();
const domain = useTerminalStore().currentDomain;
const productStore = useProductStore();
const { updated, isFormDirty } = storeToRefs(productStore);
const { data, loading } = useProductQueryById();
const showConfirm = ref(false);
const formSubmit = inject('form_submit');
const formLoading = inject('form_loading');
const formLoadingImage = inject('form_loading_with_image');
const formLoadingEdit = inject('form_loading_edit');
const formMeta:
  | globalThis.ComputedRef<
      FormMeta<
        Partial<{
          amount: string;
          iban: string;
          content: string;
        }>
      >
    >
  | undefined = inject('form_meta');
const handleConfirm = () => {
  router.push({
    path: '/panel/' + domain + '/product',
    query: { ...route.query },
  });
};
</script>
<style lang="scss" scoped>
.product-add-header {
  @apply px-md lg:px-0;

  &.sticky {
    @apply px-0;
  }
}
</style>
