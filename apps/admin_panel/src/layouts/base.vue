<template>
  <div>
    <SharedLoadingSPALoading v-if="authStore.spaLoading" />
    <div v-else class="root">
      <ui-Topbar class="sticky">
        <template #startSection>
          <ui-Button
            name="Close"
            type="tertiary"
            icon="Close"
            class="!p-0"
            @click="$router.push(homeUrl)"
          />
        </template>
        <template #centerSection>
          <NuxtLink :to="homeUrl" class="mr-xl">
            <ui-Logo name="zarinpalFaLight" class="cursor-pointer" />
          </NuxtLink>
        </template>
      </ui-Topbar>
      <slot />
      <Teleport to="body">
        <LazySharedToast
          v-for="(item, index) in notificationStore.unreads"
          :key="item.id"
          :data="item"
          :index="index"
        />
      </Teleport>
    </div>
  </div>
</template>
<script setup lang="ts">
onMounted(() => {
  document.body.classList.add('!bg-surface');
});
onBeforeUnmount(() => {
  document.body.classList.remove('!bg-surface');
});
const notificationStore = useNotificationStore();
const authStore = useAuthStore();
const { homeUrl } = useRedirectToHome();
</script>
