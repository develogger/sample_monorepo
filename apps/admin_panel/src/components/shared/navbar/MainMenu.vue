<template>
  <div class="bg-surface relative">
    <SharedNavbarOverlayMenu
      :class="store.menuState === Status.VISIBLE ? 'visible' : 'invisible'"
    />
    <div
      v-if="store.navigateState !== Nav.HIDDEN"
      id="sidebar"
      class="navbar-menu fixed z-10 right-0"
      dir="rtl"
      :class="store.navigateState === Nav.EXPANDED ? 'expanded' : 'collapsed'"
    >
      <SharedTerminalHub
        id="product_tour_terminal"
        class="terminal--hub"
        :class="
          store.navigateState === Nav.EXPANDED
            ? 'terminal--hub--expanded'
            : 'terminal--hub--collapsed'
        "
      />
      <div
        class="navbar--menu-item"
        :class="store.navigateState === Nav.EXPANDED ? 'expanded--item' : 'collapsed--item'"
      >
        <SharedNavbarMenuItem ref="navBarMenuRef" @complete="handleProductTour" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Nav } from '@/stores/navigateStore';
const t = useI18n();
const { handleAddStep } = useProductTour();
const store = useNavigateStore();
const navBarMenuRef = ref();
const handleProductTour = () => {
  if (breakpoint.sm < window.innerWidth) {
    handleAddStep(navBarMenuRef, t);
  }
};
</script>

<style lang="scss" scoped>
.navbar-menu {
  @apply bg-surface sticky right-0 top-[56px];
  transition: width 0.3s ease-in-out;
}
.expanded {
  @apply w-[16rem] h-[calc(100vh-56px)];
}
.collapsed {
  @apply w-[4.5rem] h-[calc(100vh-56px)];
}
.expanded--item {
  @apply w-[16rem];
}
.collapsed--item {
  @apply w-[4.5rem];
  transition: all 0.3s ease-in-out;
}
.terminal--hub {
  transition: all 0.3s ease-in-out;
  // @apply fixed z-10 right-0;
}

@keyframes terminal-expanded {
  0% {
    width: 72px;
  }
  30% {
    width: 72px;
  }
  90% {
    width: 16rem;
  }
}
.terminal--hub--expanded {
  @apply w-[255px];
}
.terminal--hub--collapsed {
  @apply w-[72px];
}

.navbar--menu-item {
  // @apply flex flex-col pt-[72px] pb-0 h-[calc(100vh-56px)] fixed right-0;
  @apply flex flex-col pb-0 h-[calc(100vh-128px)];
  transition: all 0.3s ease-in-out;
}
body.overflow-y-hidden {
  #sidebar {
    @apply right-xs;
  }
}
</style>
