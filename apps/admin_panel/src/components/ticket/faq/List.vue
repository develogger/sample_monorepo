<template>
  <div>
    <div v-if="slugs && slugs.length">
      <ui-NavLink
        v-for="i in slugs"
        :key="i.value"
        :label="$t(`_common.slug.${i.value}`)"
        :loading="loading"
        :active="i.value === slugStore.slug"
        @click="selectedSlug(i.value)"
      >
        <template #meta>
          <span class="text-text-soft">({{ i.length }})</span>
        </template>
      </ui-NavLink>
    </div>
    <div v-else>
      <ui-NavLink v-for="i in 4" :key="i" label="loading" :loading="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFaqQuery } from '@/composables/faq/useFaqQuery';

const { loading, slugs } = useFaqQuery();
const slugStore = useFaqStore();
const selectedSlug = (value: string) => {
  slugStore.slug = value;
};
</script>
