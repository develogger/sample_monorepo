<template>
  <UserBaseConnectedAppsPersonalLgGrid v-if="!md" />
  <UserBaseConnectedAppsPersonalMdGrid v-else />
</template>
<script setup lang="ts">
const { md } = useSize();
</script>

<style lang="scss" scoped>
.root {
  @apply font-yekanFa;
}
.loading {
  @apply flex;
}
</style>
