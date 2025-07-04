<template>
  <ui-EmptyState
    :title="!_isEmpty(route.query) ? $t('_common.empty.titleNoResult') : $t('_empty.product.title')"
    :description="
      !_isEmpty(route.query)
        ? $t('_common.empty.descriptionNoResult')
        : $t('_empty.product.caption')
    "
    :vector="!_isEmpty(route.query) ? 'NoResult' : 'ProductPaymentLink'"
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
