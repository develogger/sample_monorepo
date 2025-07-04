<template>
  <NuxtErrorBoundary>
    <div class="w-full" :class="{ 'overflow-x-hidden': route.name === 'dashboard' }">
      <NuxtPage />
    </div>
    <template #error="{ error }">
      <div
        style="min-height: calc(-56px + 100vh)"
        class="flex justify-center items-center h-full bg-white dark:bg-surface-dark w-full min-w-0 pb-2xl"
      >
        <div>
          <ui-ErrorMessage :text="$t('_error.unknown_error')" icon="Error">
            <template #actions>
              <ui-Button
                class="w-full"
                type="tertiary"
                :text="$t('_error.back_to_dashboard')"
                @click="() => handleError(error)"
              />
            </template>
          </ui-ErrorMessage>
        </div>
      </div>
    </template>
  </NuxtErrorBoundary>
</template>
<script setup lang="ts">
import { useTerminalStore } from '@/stores/terminalStore';
const route = useRoute();
async function fetch() {
  // eslint-disable-next-line promise/param-names
  await new Promise(res => setTimeout(res, 1000));
}

await fetch();
// eslint-disable-next-line require-await
const handleError = async (error: Ref<Error>) => {
  const domain = useTerminalStore().currentDomain;
  const redirectRoute = domain ? `/panel/${domain}/dashboard` : '/panel/overview';

  clearError({ redirect: redirectRoute });

  setTimeout(() => {
    error.value = null!;
  }, 10);
};
</script>
