<template>
  <!-- <UserBaseAccessTokenEmptyGrid v-if="typeof value.value === 'undefined' && !fetchLoading.value" /> -->
  <UserBaseAccessTokenLgGrid v-if="!md" />
  <!-- <UserBaseAccessTokenMdGridLoading v-if="md && fetchLoading.value" /> -->
  <UserBaseAccessTokenMdGrid v-else />
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
