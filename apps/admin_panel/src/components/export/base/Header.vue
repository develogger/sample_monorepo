<template>
  <ui-PageHeading
    :title="$t('_form.export.exportList')"
    :description="store?.data?.length ? $t('_form.export.subTitle') : ''"
    has-back
    class="w-full lg:mx-auto max-w-[944px]"
    :class="md ? '!h-auto' : ''"
    @back-roll="$router.back()"
  >
    <template #action>
      <div class="w-fit">
        <ui-Button
          :text="$t('_form.export.syncData')"
          after-icon="Refresh"
          type="tertiary"
          class="h-[40px]"
          @click="store.refetch"
        />
      </div>
    </template>
  </ui-PageHeading>
</template>

<script setup lang="ts">
import useSize from '@zarinpal/ui/src/composables/useSize';

const store = useSessionExportStore();
const { md } = useSize();
onMounted(() => {
  store.refetch();
});
</script>
