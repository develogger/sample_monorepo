<template>
  <ui-PageHeading
    sticky
    size="lg"
    has-back
    :loading="loading"
    :title="data ? $t('_form.add_invoice.edit') : $t('_common.page_title.create_invoice')"
    @back-roll="$router.push(`/panel/${domain}/invoice`)"
  >
    <template #action>
      <div class="w-fit flex gap-xs">
        <ui-Button
          :text="data ? $t('_common.buttons.save') : $t('_common.page_title.create_invoice')"
          :disabled="!formMeta?.valid || formLoading || loading"
          :loading="formLoading || loading"
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
import { useInvoiceQueryById } from '@/composables/invoice/useInvoiceQueryById';
import { useTerminalStore } from '@/stores/terminalStore';
const { data } = useInvoiceQueryById();
const router = useRouter();
const loading = inject('form_loading_edit');
const domain = useTerminalStore().currentDomain;
const showConfirm = ref(false);
const formSubmit = inject('form_submit');
const formLoading = inject('form_loading');
const formMeta:
  | globalThis.ComputedRef<
      FormMeta<
        Partial<{
          name: string;
        }>
      >
    >
  | undefined = inject('form_meta');
const handleConfirm = () => {
  router.push('/panel/' + domain + '/invoice');
};
</script>
