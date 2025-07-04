<template>
  <div class="referral">
    <ui-Card>
      <template #main>
        <div class="referral__content">
          <div class="referral__content--item" :class="{ 'w-[264px]': loading }">
            <ui-Skeleton v-if="loading" :width="164" :height="164" circle />
            <ui-Illustration v-else name="Referral" />
          </div>
          <div dir="rtl" class="referral__content--main">
            <ui-Skeleton v-if="loading" class="w-full" content-class="!w-full" :height="12" />
            <ui-Skeleton v-if="loading" class="w-full" content-class="!w-full" :height="12" />
            <ui-Skeleton v-if="loading" :width="150" :height="12" />
            <ui-Skeleton v-if="loading" :width="80" :height="12" />
            <span v-else dir="rtl" class="text-text-soft text-body-400-b3">
              {{ $t('_helper.referral.description') }}
            </span>
            <ui-Skeleton v-if="loading" class="w-full" content-class="!w-full" :height="56" />
            <ui-ClipBoard
              v-else
              :title="$t('_common.slug.invite_link')"
              class="w-full"
              :content="`${config.public.next_panel_link}auth/register?ref_id=${userData?.referral_id}`"
            />
          </div>
        </div>
      </template>
    </ui-Card>
    <ReferralBaseContent />
    <ui-Card dir="rtl">
      <template #main>
        <div class="referral__bottom">
          <ui-Skeleton v-if="loading" :width="104" :height="24" class="px-sm py-md" />
          <span v-else class="referral__bottom--title"> {{ $t('_referral.invited_users') }} </span>
          <div class="referral__bottom--content">
            <div class="referral__bottom--content--item">
              <ui-Skeleton v-if="loading" />
              <ui-Skeleton v-if="loading" :width="240" :height="24" class="mt-md" />
              <span v-if="!loading" class="text-body-400-b3 text-text-soft">
                {{ $t('_referral.active_users_of_this_month') }}
              </span>
              <span v-if="!loading" class="text-display-700-d3">
                {{ data?.month_active_referrers ?? '-' }}
              </span>
            </div>
            <div class="referral__bottom--content--item border-x border-border-divider">
              <ui-Skeleton v-if="loading" />
              <ui-Skeleton v-if="loading" :width="240" :height="24" class="mt-md" />
              <span v-if="!loading" class="text-body-400-b3 text-text-soft">
                {{ $t('_referral.new_users_this_month') }}
              </span>
              <span v-if="!loading" class="text-display-700-d3">
                {{ data?.sum_referrers ?? '-' }}
              </span>
            </div>
            <div class="referral__bottom--content--item">
              <ui-Skeleton v-if="loading" />
              <ui-Skeleton v-if="loading" :width="240" :height="24" class="mt-md" />
              <span v-if="!loading" class="text-body-400-b3 text-text-soft">
                {{ $t('_referral.total_number_users_invited_far') }}
              </span>
              <span v-if="!loading" class="text-display-700-d3">
                {{ data?.all_referrers ?? '-' }}
              </span>
            </div>
          </div>
          <div>
            <ReferralBaseLgGrid v-if="!md" :loading="loading" :data="tableData" />
            <ReferralBaseMdGrid v-if="md" :loading="loading" :data="tableData" />
            <div v-if="tableData?.length" class="mt-xl" dir="ltr">
              <ReferralBasePagination :pagination="pagination" :loading="loading" />
            </div>
          </div>
        </div>
      </template>
    </ui-Card>
  </div>
</template>
<script lang="ts" setup>
import { useReferralQuery } from '@/composables/referral/useReferralQuery';
import { useUserIdQuery } from '@/composables/user/useUserIdQuery';
import { UserReferred } from '@/graphql/graphql';
const { toJalali } = useDate();
const { numberFormat } = useMath();
const { data: userData } = useUserIdQuery();
const { md } = useSize();
const { data, loading, pagination, refetch } = useReferralQuery();
const route = useRoute();
const config = useRuntimeConfig();
const tableData = computed(() => {
  if (data.value && data.value.user && data.value.user?.length) {
    return data.value.user.map(item => ({
      commission: (item?.commission && numberFormat(item.commission)) ?? '-',
      last_session_time:
        (item?.last_session_time &&
          toJalali(item.last_session_time, 'jDD jMMMM jYYYY', 'jDD jMMMM jYYYY', '', '')) ??
        '-',
      registered_at: (item?.registered_at && toJalali(item.registered_at)) ?? '-',
      avatar: item?.avatar,
      id: item?.id,
      name: item?.name,
    })) as UserReferred[];
  }

  return [];
});

watch(
  () => route.query,
  () => {
    refetch({
      limit: Number(route.query.pageSize) || config.public.pageSize,
      offset:
        (Number(route.query.pageSize) || config.public.pageSize) *
        ((Number(route.query.page) || config.public.page) - 1),
    });
  }
);
</script>
<style lang="scss" scoped>
.referral {
  @apply flex flex-col gap-md;
  &__content {
    @apply flex gap-xl flex-col md:flex-row;
    &--item {
      @apply flex justify-center;
    }
    &--main {
      @apply w-full flex flex-col gap-md justify-between;
    }
  }
  &__bottom {
    @apply flex flex-col gap-xl;
    &--title {
      @apply text-heading-600-h2;
    }
    &--content {
      @apply grid grid-cols-3 border border-border-divider;
      &--item {
        @apply col-span-3 lg:col-span-1 flex flex-col justify-center items-center gap-sm p-md;
      }
    }
  }
}
</style>
