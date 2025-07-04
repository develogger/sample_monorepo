<template>
  <div ref="userHeader">
    <ui-PageHeading
      has-back
      :title="$t('_common.buttons.userProfile')"
      @back-roll="$router.push(`/panel/${domain}/dashboard`)"
    >
    </ui-PageHeading>
  </div>
</template>

<script setup lang="ts">
const domain = useTerminalStore().currentDomain;
const userHeader = ref();
const calcUserHeaderHeight = () =>
  userHeader.value && userHeader.value.getBoundingClientRect().height;
defineExpose({ calcUserHeaderHeight });
</script>
