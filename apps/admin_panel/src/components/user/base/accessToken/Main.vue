<template>
  <UserBaseAccessTokenContent />
</template>
<script setup lang="ts">
const t = useI18n();
useHead({
  title: t('_user.accessToken.title'),
});
</script>
