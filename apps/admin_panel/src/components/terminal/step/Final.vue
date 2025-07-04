<template>
  <div class="flex flex-col gap-md">
    <ui-Button
      :text="$t('_common.buttons.navigate_to_dashboard')"
      :loading="loading"
      size="large"
      @click="navigateToDashboard"
    />
  </div>
</template>
<script lang="ts" setup>
interface Props {
  terminalId: string;
}
const props = withDefaults(defineProps<Props>(), {});
const { terminalId } = toRefs(props);
const { homeUrl } = useRedirectToHome();
const router = useRouter();
const { data: terminals, loading, refetch } = useTerminalQuery();
onMounted(() => {
  refetch();
});
const { setActiveTerminal } = useActiveTerminal();
const navigateToDashboard = () => {
  const terminal = terminals.value?.find(t => t.id === terminalId.value);
  if (!terminal) {
    return router.push(homeUrl.value);
  }
  setActiveTerminal(terminal);

  return router.push(`/panel/${encodeURIComponent(terminal.domain as string)}/dashboard`);
};
</script>
