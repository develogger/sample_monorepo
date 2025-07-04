<template>
  <UserBaseLoadInfo v-if="loading" />
  <div v-else>
    <div class="mb-xl user-info" dir="rtl">
      {{ $t('_common.buttons.userProfile') }}
    </div>
    <div class="flex items-center justify-between mb-xl">
      <ui-Avatar :src="userId?.avatar" shape="rounded" size="lg" />
      <ui-ZpBadge :id="userId?.id" :level="userId?.level" />
    </div>

    <ui-InlineMessage
      class="!mb-xl !mt-0"
      :type="isSilverLevelDown ? 'informative' : 'neutral'"
      :show-icon="false"
    >
      <template v-if="isSilverLevelDown" #description>
        <i18n-t keypath="_user.info_description_silver_down" tag="p">
          <template #profile>
            <NuxtLink :to="connectProfileUrl" target="_blank" class="text-primary">
              {{ $t('_onboarding.inline_message.zarinpal_account') }}
            </NuxtLink>
          </template>
        </i18n-t>
      </template>
      <template v-else #description>
        <i18n-t keypath="_user.info_description_silver_up" tag="p">
          <template #profile>
            <NuxtLink :to="connectProfileUrl" target="_blank" class="text-primary">
              {{ $t('_onboarding.inline_message.zarinpal_account') }}
            </NuxtLink>
          </template>
        </i18n-t>
      </template>
    </ui-InlineMessage>
    <div
      class="main block border border-border-divider rounded-sm flex-row items-center border-b-0"
    >
      <div class="flex w-full gap-xs flex-row main__item--detail">
        <span class="text-body-400-b3 text-text-soft main__item--heading">
          {{ $t('_user.full_name') }}
        </span>
        <span class="text-body-400-b2 truncate flex-1"> {{ userId?.full_name }}</span>
      </div>
      <div class="flex w-full gap-xs flex-row main__item--detail">
        <span class="text-body-400-b3 text-text-soft main__item--heading">
          {{ $t('_user.ssn') }}
        </span>
        <span class="text-body-400-b2 truncate flex-1"> {{ userId?.ssn }}</span>
      </div>
      <div class="flex w-full gap-xs flex-row main__item--detail">
        <span class="text-body-400-b3 text-text-soft main__item--heading">
          {{ $t('_form.add_invoice.mobile') }}
        </span>
        <span class="text-body-400-b2 truncate flex-1"> {{ userId?.cell_number }}</span>
      </div>
      <div class="flex w-full gap-xs flex-row main__item--detail">
        <span class="text-body-400-b3 text-text-soft main__item--heading">
          {{ $t('_user.levelTitle') }}
        </span>
        <span class="text-body-400-b2 truncate flex-1">
          {{ $t('_user.level') }} {{ $t(`_user.levelType.${userId?.level}`) }}
        </span>
      </div>
    </div>
    <div class="mt-xl rtl text-text text-body-400-b3">
      <span v-if="years">{{ `${years.toLocaleString('fa')}  سال و` }} </span>
      <span v-if="months">{{ ` ${months.toLocaleString('fa')} ماه ` }}</span>
      <span class="text-text-soft"> {{ $t('_user.companionOfZarinPal') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserIdQuery } from '@/composables/user/useUserIdQuery';

const config = useRuntimeConfig();
const { data: userId, loading } = useUserIdQuery();
const { isSilverLevelDown } = useAuth();
const { getNow, getMoment } = useDate();
const createdAt = userId?.value?.created_at;
const now = getNow();
const duration = getMoment().duration(now.diff(createdAt));
const [years, months] = [duration.years(), duration.months()];
const connectProfileUrl = `${config.public.connect_url}profile?call=beta`;
</script>
<style lang="scss" scoped>
.main {
  @apply lg:flex-row flex-col gap-sm;
  direction: rtl;
  &__item--detail {
    @apply flex justify-between w-full gap-xs p-md  border-b border-border-divider;
  }
  &__item--heading {
    @apply text-body-400-b2 flex flex-col ml-[-1px] mb-[-1px]  min-w-[200px]  ml-[-1px] mb-[-1px]  gap-xs;
    @apply flex-[1_0_25%];
  }
}
.rtl {
  direction: rtl;
}
</style>
