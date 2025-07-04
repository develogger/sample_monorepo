<template>
  <ui-Modal
    :text="$t('_onboarding.blue_level_required.title')"
    close-icon
    class="md:!w-[400px] md:max-h-[88vh] lg:max-h-[88vh]"
    header
    :outside-click="false"
    @close="close"
  >
    <template #body>
      <div class="flex flex-col gap-xl" dir="">
        <div class="py-xs w-full flex items-center justify-center">
          <Ui-Icon
            style="font-size: 80px"
            name="ProfileCard"
            class="bg-surface-information text-icon-information p-xl rounded-circle w-6xl h-6xl"
          />
        </div>
        <p class="text-body-400-b2 text-text">
          {{ $t('_onboarding.blue_level_required.caption') }}
        </p>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-center w-full">
        <NuxtLink :to="connectProfileUrl" class="w-full">
          <ui-Button
            size="medium"
            type="primary"
            :text="$t('_onboarding.blue_level_required.button')"
            block
          />
        </NuxtLink>
      </div>
    </template>
  </ui-Modal>
</template>
<script lang="ts" setup>
const emit = defineEmits(['close']);
const config = useRuntimeConfig();
const connectProfileUrl = `${config.public.connect_url}profile?call=beta`;
const close = () => {
  emit('close');
};
</script>
