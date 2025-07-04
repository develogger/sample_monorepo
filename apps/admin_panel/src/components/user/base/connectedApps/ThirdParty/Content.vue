<template>
  <UserBaseConnectedAppsThirdPartyLgGrid v-if="!md" />
  <UserBaseConnectedAppsThirdPartyMdGrid v-else />
</template>
<script setup lang="ts">
const { md } = useSize();
</script>
