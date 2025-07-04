<template>
  <div class="flex items-center">
    <ui-Avatar v-if="logoUrl" :src="`${logoUrl}?v=${version}`" shape="square" />
    <ui-Icon
      v-else
      name="Terminal"
      class="flex items-center justify-center rounded-md"
      :class="[
        active
          ? 'text-surface bg-surface-blur'
          : 'text-black-40 bg-surface-soft border-border-soft border',
        defaultLogoSize,
      ]"
    />
  </div>
</template>

<script setup lang="ts">
export interface Props {
  logo?: string | undefined | null;
  active?: boolean;
  size?: 'medium' | 'large';
}
const store = useTerminalStore();
const version = computed(() => store.logoVersion);
const props = withDefaults(defineProps<Props>(), {
  logo: undefined,
  active: false,
  size: 'medium',
});
const { logo, size } = toRefs(props);
const logoUrl = computed(() => {
  if (!logo.value) {
    return undefined;
  }

  return `${logo.value}/40x40.png`;
});
const defaultLogoSize = computed(() => {
  switch (size.value) {
    case 'medium':
      return 'w-[40px] h-[40px]';
    case 'large':
      return 'w-[64px] h-[64px] !text-display-700-d3';
    default:
      return 'w-[40px] h-[40px]';
  }
});
</script>
