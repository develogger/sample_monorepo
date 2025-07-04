<template>
  <ui-PageHeading
    :title="$t('notif_settings.referrer')"
    :description="$t('_common.pageHeading.referral_description')"
    has-back
    class="w-full lg:mx-auto max-w-[944px]"
    :loading="loading"
    @back-roll="$router.push(homeUrl)"
  >
    <template #action>
      <div class="w-fit flex gap-xs">
        <ui-Button
          :text="$t('common.setting')"
          type="tertiary"
          after-icon="SettingsRound"
          :loading="loading"
          @click="() => (showModal = true)"
        />
      </div>
    </template>
  </ui-PageHeading>
  <ReferralBaseIban :show="showModal" @close="() => (showModal = false)" />
</template>
<script lang="ts" setup>
import { useReferralQuery } from '@/composables/referral/useReferralQuery';

const showModal = ref();
const { loading } = useReferralQuery();
const { homeUrl } = useRedirectToHome();
</script>
