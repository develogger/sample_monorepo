<template>
  <div class="flex flex-col justify-center items-center gap-sm mb-md">
    <div class="flex flex-col justify-center items-center">
      <ui-Avatar :src="data?.avatar" size="xl" />
      <ui-ZpBadge :id="data?.id" :level="data?.level" class="-mt-md" />
    </div>
    <div class="flex flex-col justify-center items-center gap-xs">
      <span class="text-body-400-b1">{{ data?.full_name }}</span>
      <span class="text-body-400-b2 text-text-soft">{{ data?.cell_number }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserIdQuery } from '../../../composables/user/useUserIdQuery';
const { data } = useUserIdQuery();
</script>
