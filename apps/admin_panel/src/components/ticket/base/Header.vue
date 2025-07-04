<template>
  <div class="head">
    <ui-PageHeading :title="$t('_common.page_title.tickets')" has-back @back-roll="back">
      <template #action>
        <div class="w-fit">
          <NuxtLink to="/panel/ticket/faq">
            <ui-Button :text="$t('_common.buttons.new_ticket')" />
          </NuxtLink>
        </div>
      </template>
    </ui-PageHeading>
  </div>
</template>
<script setup lang="ts">
const router = useRouter();
const { homeUrl } = useRedirectToHome();
const back = () => {
  router.push(homeUrl.value);
};
</script>
