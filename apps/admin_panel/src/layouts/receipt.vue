<template>
  <div class="py-3xl px-md md:m-0 mt-2xl mb-md pb-3xl h-full">
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
</template>
<script setup lang="ts">
const notificationStore = useNotificationStore();
</script>
