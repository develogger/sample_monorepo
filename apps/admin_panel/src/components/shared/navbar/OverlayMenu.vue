<template>
  <div class="relative">
    <ui-Sidebar
      :show="store.menuState === Status.VISIBLE"
      @close="store.toggleNavigatorInSidebar()"
    >
      <template #header>
        <div class="px-md pt-xs flex justify-end items-center">
          <ui-Logo name="zarinpalFaLight" />
          <ui-Button
            type="tertiary"
            icon="MenuBurger"
            class="w-[40px] h-[40px] ml-xs"
            @click="store.toggleNavigatorInSidebar()"
          />
        </div>
      </template>
      <template #main>
        <div ref="sideBarRef" class="flex flex-col py-xs">
          <SharedTerminalHub v-show="store.currentTerminalState === Status.VISIBLE" />
          <SharedNavbarMenuItem ref="navBarMenuRef" @complete="handleProductTour" />
        </div>
      </template>
    </ui-Sidebar>
  </div>
</template>

<script setup lang="ts">
import { Status } from '@/stores/navigateStore';
const { handleAddStep } = useProductTour();
const t = useI18n();
const store = useNavigateStore();
const navBarMenuRef = ref();
const sideBarRef = ref();
const handleProductTour = () => {
  if (breakpoint.sm > window.innerWidth) {
    handleAddStep(navBarMenuRef, t);
  }
};
</script>

<style lang="scss"></style>
