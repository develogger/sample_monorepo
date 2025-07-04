<template>
  <ui-EmptyState
    :title="$t('_common.empty.titleNoResult')"
    :description="$t('_common.empty.descriptionNoResult')"
    vector="NoResult"
  >
    <template #action>
      <div class="flex justify-center">
        <ui-Button
          after-icon="Trash"
          :text="$t('_common.buttons.removeFilters')"
          type="secondary"
          @click="removeFilters"
        />
      </div>
    </template>
  </ui-EmptyState>
</template>

<script setup lang="ts">
const tickets = await useTicketStore();
const route = useRoute();
const router = useRouter();
const removeFilters = () => {
  tickets.statusFilter = '';
  router.push({
    query: {
      ...route.query,
      status: undefined,
    },
  });
};
</script>
