<template>
  <div>
    <UserBaseConnectedAppsThirdPartyContent />
    <UserBaseConnectedAppsPersonalContent />
  </div>
</template>

<script setup lang="ts">
const t = useI18n();
useHead({
  title: t('_user.connected_apps.title'),
});
</script>
