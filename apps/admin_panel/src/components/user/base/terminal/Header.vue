<template>
  <div class="flex justify-between mb-xl">
    <span class="text-heading-600-h2 flex items-center">
      {{ $t('_terminal.title') }}
    </span>
    <NuxtLink :to="addTerminalUrl()">
      <ui-Button
        before-icon="Plus"
        variant="outlined"
        type="neutral"
        :text="$t('_common.buttons.new_terminal')"
      />
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
const { addTerminalUrl } = useAuth();
</script>
