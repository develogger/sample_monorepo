<template>
  <div class="fixed z-[10001] left-1/2" :class="index !== 1 ? 'bottom-0' : 'bottom-3xl'">
    <ui-Toast :show="show" :close="data.hasClose" @close="closeToast">
      <template #default>
        <div class="flex items-center">
          <ui-Icon
            :name="data.type === 'success' ? 'CheckMarkCircleFill' : 'Info'"
            class="w-lg h-lg !text-[20px]"
            :class="data.type === 'success' ? 'text-icon-success' : 'text-icon-danger'"
          />
          <span class="mx-2xs text-body-400-b3">{{ data.message }}</span>
        </div>
      </template>
    </ui-Toast>
  </div>
</template>
<script setup lang="ts">
export interface Props {
  data: NotificationType;
  index?: number;
}
const props = withDefaults(defineProps<Props>(), {
  index: 1,
});
const { data, index } = toRefs(props);
const notiticationStore = useNotificationStore();
const show = ref(false);
const closeToast = () => {
  notiticationStore.remove(data.value);
};
const { start } = useCountDown(data.value.duration, closeToast);

onMounted(() => {
  if (!data.value.hasClose) {
    start();
  }
  show.value = true;
});
</script>
