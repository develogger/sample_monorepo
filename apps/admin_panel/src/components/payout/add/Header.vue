<template>
  <ui-PageHeading
    sticky
    size="lg"
    has-back
    class="payout-add-header"
    :title="
      payout?.id ? $t('_common.page_title.edit_payout') : $t('_common.page_title.create_payout')
    "
    @back-roll="$router.back()"
  >
    <template #action>
      <div class="w-fit flex gap-xs">
        <ui-Button
          :text="
            payout?.id
              ? $t('_common.buttons.edit_account')
              : $t('_common.buttons.registration_settlement')
          "
          :disabled="!formMeta?.valid || formLoading || !store.selectedBankAccountId"
          :loading="formLoading"
          @click="formSubmit"
        />

        <ui-Button
          :text="$t('_common.buttons.cancel')"
          type="tertiary"
          :disabled="formLoading"
          @click="showConfirm = true"
        />
      </div>
    </template>
  </ui-PageHeading>
  <SharedShareModalConfirm
    v-if="showConfirm"
    cancel-label="_common.buttons.continue"
    submit-label="_common.buttons.cancel_event"
    :loading="loading"
    @close="showConfirm = false"
    @confirm="handleConfirm"
    @cancel="showConfirm = false"
  />
</template>

<script setup lang="ts">
import { FormMeta } from 'vee-validate';
import { PayoutType } from '@/graphql/graphql';
import { useBankAccountStore } from '@/stores/bankAccountStore';
import { useTerminalStore } from '@/stores/terminalStore';
const store = useBankAccountStore();
const router = useRouter();
const domain = useTerminalStore().currentDomain;
const loading = ref(false);
const showConfirm = ref(false);
const payout = inject<Ref<PayoutType>>('data');
const formSubmit = inject('form_submit');
const formLoading = inject('form_loading');
const formMeta:
  | globalThis.ComputedRef<
      FormMeta<
        Partial<{
          amount: string;
          content: string;
        }>
      >
    >
  | undefined = inject('form_meta');
const handleConfirm = () => {
  loading.value = true;

  return router.push('/panel/' + domain + '/payout');
};
</script>
<style lang="scss">
.payout-add-header {
  @apply px-md lg:px-0;

  &.sticky {
    @apply px-0;
  }
}
</style>
