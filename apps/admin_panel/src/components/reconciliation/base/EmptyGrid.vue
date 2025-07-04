<template>
  <ui-EmptyState
    :title="!_isEmpty(route.query) ? $t('_common.empty.titleNoResult') : ''"
    :description="
      !_isEmpty(route.query)
        ? $t('_common.empty.descriptionNoResult')
        : $t('_empty.reconcileHome.caption')
    "
    :vector="!_isEmpty(route.query) ? 'NoResult' : 'Reconciliation'"
  >
    <template v-if="!_isEmpty(route.query)" #action>
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
const router = useRouter();
const route = useRoute();
const removeFilters = () => {
  router.push({
    query: undefined,
  });
};
</script>
