<template>
  <ui-PageHeading
    :loading="loading"
    size="2xl"
    class="setting-add-header"
    :title="
      flag === TerminalFlagEnum.Normal
        ? $t('_common.links.terminal_settings')
        : $t('_common.page_title.zarin_link_setting')
    "
    @back-roll="$router.back()"
  />
</template>

<script lang="ts" setup>
import { useTerminalQuery } from '@/composables/terminal/useTerminalQuery';
import { TerminalFlagEnum } from '@/graphql/graphql';

const { activeTerminal, loading } = useTerminalQuery();
const flag = computed(() => activeTerminal.value?.flag);
</script>
<style lang="scss">
.setting-add-header {
  @apply px-md lg:px-0;

  &.sticky {
    @apply px-0;
  }
}
</style>
