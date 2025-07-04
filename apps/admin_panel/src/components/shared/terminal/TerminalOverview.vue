<template>
  <div dir="rtl" class="w-full lg:w-[21rem] bg-surface md:shadow-elevation-100 max-h-[70vh]">
    <div class="">
      <template v-if="loading">
        <SharedTerminalSkeleton v-for="i in 2" :key="i" dir="ltr" />
      </template>
      <div
        v-else-if="!loading && !sortedTerminal.length"
        class="flex flex-col items-center px-md py-xl"
      >
        <ui-Illustration name="Placeholder" class="mb-xl" />
        <p class="font-medium text-body-400-b1 mb-sm">{{ $t('_empty.terminal.title') }}</p>
        <p class="text-body-400-b2 text-text-soft hidden">{{ $t('_empty.terminal.caption') }}</p>
      </div>
      <!-- list of terminals -->
      <div v-else dir="rtl" class="overflow-auto lg:max-h-[calc(70vh-56px)]">
        <div
          v-for="i in sortedTerminal"
          :key="i?.id"
          dir="rtl"
          class="hover:bg-surface-hover rounded-sm active:bg-surface-pressed focus-visible:border focus-visible:border-interactive-focus m-xs cursor-pointer"
          @click="handleChangeTerminal(i?.domain, i?.id)"
        >
          <!-- description -->
          <div class="rounded-sm flex gap-sm justify-between px-xs pt-xs">
            <div class="flex gap-sm truncate">
              <SharedTerminalLogo :logo="i?.have_logo ? i?.logo : undefined" />
              <div class="flex flex-col gap-2xs truncate">
                <div class="text-body-400-b2 font-medium text-text truncate">{{ i?.name }}</div>
                <div class="text-caption-400-c1 text-text-soft">{{ i?.domain }}</div>
              </div>
            </div>
            <div>
              <ui-Icon
                v-if="i?.id === activeTerminal?.id"
                name="CheckMarkCircleFill"
                class="my-auto text-primary"
              />
            </div>
          </div>
          <!-- badges -->
          <div class="flex justify-start pr-[60px] pb-md mt-sm">
            <div>
              <ui-Status
                :text="statusHandler(i?.status).text"
                :type="statusHandler(i?.status).type"
              />
            </div>
            <div v-if="Number(i?.pin)">
              <ui-Divider type="vertical" :height="24" class="mx-sm" />
            </div>
            <div>
              <ui-Icon
                v-if="Number(i?.pin)"
                name="PinFill"
                class="w-md h-md text-zarin-dark !text-heading-600-h3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- new terminal -->
    <div class="border-t border-t-border-divider p-xs sticky bottom-0 bg-surface">
      <div>
        <ui-Button
          :text="$t('_common.buttons.new_terminal')"
          type="tertiary"
          block
          after-icon="Plus"
          @click="$router.push(addTerminalUrl())"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useTerminalQuery } from '@/composables/terminal/useTerminalQuery';
import { useTerminalStatus } from '@/composables/terminal/useTerminalStatus';
import { Maybe, TerminalType } from '@/graphql/graphql';

const { data, loading } = useTerminalQuery();
const { addTerminalUrl } = useAuth();
const { statusHandler } = useTerminalStatus();
const router = useRouter();
const { activeTerminal } = useTerminalQuery();
const { setActiveTerminal } = useActiveTerminal();
const emits = defineEmits(['close']);
const handleChangeTerminal = (domain: Maybe<string> | undefined, id: string | undefined) => {
  const currentTerminal = sortedTerminal.value?.find(t => t.id === id);
  if (!currentTerminal) {
    return;
  }
  setActiveTerminal(currentTerminal as TerminalType);
  emits('close');

  return router.push({
    params: {
      terminal: domain,
    },
  });
};
const sortedTerminal = computed(() => {
  if (data.value && data.value.length) {
    const terminals = [...data.value];

    // sort terminals as pin
    return terminals?.sort((a, b) => {
      if (a.pin === b.pin) {
        return 0;
      }
      // !!a.pin
      if (a.pin === null || a.pin === undefined) {
        return 1;
      }
      if (b.pin === null || b.pin === undefined) {
        return -1;
      }

      return a.pin < b.pin ? 1 : -1;
    });
  }

  return [];
});
</script>
