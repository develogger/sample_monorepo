<script lang="ts" setup>
const { active } = useActiveTerminal();

nextTick(() => {
  navigateTo({
    path: active.domain
      ? `/panel/${encodeURIComponent(active.domain)}/dashboard`
      : '/panel/overview',
  });
});
</script>
