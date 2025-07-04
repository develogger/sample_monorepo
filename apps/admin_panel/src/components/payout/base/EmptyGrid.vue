<template>
  <ui-EmptyState
    :title="!_isEmpty(route.query) ? $t('_common.empty.titleNoResult') : $t('_empty.payout.title')"
    :description="
      !_isEmpty(route.query) ? $t('_common.empty.descriptionNoResult') : $t('_empty.payout.caption')
    "
    :vector="!_isEmpty(route.query) ? 'NoResult' : 'Payout'"
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
const route = useRoute();
const router = useRouter();
const removeFilters = () => {
  router.push({
    query: undefined,
  });
};
</script>
