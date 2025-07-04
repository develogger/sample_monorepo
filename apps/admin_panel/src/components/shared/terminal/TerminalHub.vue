<template>
  <div>
    <Tippy
      ref="tippyRef"
      class="w-fit"
      :content="content as unknown as Element"
      :arrow="false"
      interactive
      :offset="[0, 2]"
      placement="right-start"
      trigger="click"
    >
      <div class="terminal-section" dir="rtl">
        <div class="terminal-section__root overflow-hidden">
          <div class="flex gap-sm">
            <ui-Skeleton :width="40" :height="40" :loading="loading">
              <SharedTerminalLogo
                :logo="activeTerminal?.have_logo ? activeTerminal?.logo : undefined"
                active
              />
            </ui-Skeleton>
            <div
              class="terminal-section__root__inner transition-opacity ease-in-out duration-600"
              :class="
                store.navigateState === Nav.EXPANDED || store.menuState === Status.VISIBLE
                  ? 'opacity-100'
                  : 'opacity-0'
              "
            >
              <ui-Skeleton :width="40" :loading="loading">
                <div class="text-body-400-b2 font-medium truncate max-w-[135px]" dir="rtl">
                  {{ activeTerminal?.name }}
                </div>
              </ui-Skeleton>
              <ui-Skeleton :width="40" :height="5" :loading="loading">
                <div class="text-caption-400-c1 truncate max-w-[135px]">
                  {{ activeTerminal?.domain }}
                </div>
              </ui-Skeleton>
            </div>
          </div>
          <ui-Skeleton
            :width="16"
            :height="16"
            :loading="loading"
            class="terminal-section__root__arrow"
          >
            <ui-Icon name="AngleLeft" class="transition-opacity ease-in-out duration-600" />
          </ui-Skeleton>
        </div>
      </div>
    </Tippy>
  </div>
</template>

<script setup lang="ts">
import { Tippy } from 'vue-tippy';
import TerminalOverview from '@/components/shared/terminal/TerminalOverview.vue';
import { useTerminalQuery } from '@/composables/terminal/useTerminalQuery';
const { activeTerminal, loading } = useTerminalQuery();
const tippyRef = ref<typeof Tippy>();
const store = useNavigateStore();
// hide terminal popover
const hide = () => {
  tippyRef.value?.hide();
};
const content = h(TerminalOverview, {
  onClose: hide,
});
</script>

<style lang="scss" scoped>
@keyframes itemTextContent {
  0% {
    display: none;
  }
  70% {
    display: none;
  }
  90% {
    display: flex;
  }
}
.terminal-section {
  @apply bg-primary text-text-onPrimary p-xs;
  &__root {
    @apply bg-surface-blur flex  gap-sm justify-between p-xs cursor-pointer rounded-sm;
    @apply hover:bg-surface-blur-hover;
    @apply active:bg-surface-blur;
    &__inner {
      @apply flex flex-col gap-2xs justify-around;
    }
    &__arrow {
      @apply my-auto flex items-center;
    }
  }
}
</style>
