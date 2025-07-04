<template>
  <ui-PageHeading
    sticky
    size="lg"
    has-back
    class="instance-payout-add-header"
    :title="$t('_common.page_title.instant_payout')"
    @back-roll="$router.back()"
  >
    <template #action>
      <div class="w-fit flex gap-xs">
        <ui-Button
          :text="$t('_common.buttons.registration_settlement')"
          :disabled="!formMeta?.valid || formLoading"
          :loading="formLoading"
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
import { useTerminalStore } from '@/stores/terminalStore';

const router = useRouter();
const domain = useTerminalStore().currentDomain;
const showConfirm = ref(false);
const formSubmit = inject('form_submit');
const formLoading = inject('form_loading');
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
  router.push('/panel/' + domain + '/instant-payout');
};
</script>
<style lang="scss" scoped>
.instance-payout-add-header {
  @apply px-md lg:px-0;

  &.sticky {
    @apply px-0;
  }
}
</style>
