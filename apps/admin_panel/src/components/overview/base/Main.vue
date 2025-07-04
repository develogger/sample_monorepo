<template>
  <div class="overview" dir="rtl">
    <ui-Card class="max-w-[360px] w-full">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-heading-600-h2">{{ $t('dashboard.terminals') }}</span>
          <ui-Button
            icon="Plus"
            type="tertiary"
            variant="outlined"
            class="w-[40px] h-[40px]"
            @click="$router.push(addTerminalUrl())"
          />
        </div>
      </template>
      <template #main>
        <div class="text-body-400-b2 text-text-soft mb-md mt-xl">
          {{ $t('terminal.selectTerminal') }}
        </div>
        <div v-if="loading">
          <SharedTerminalSkeleton
            v-for="i in 2"
            :key="i"
            dir="ltr"
            class="border border-border-divider"
          />
        </div>
        <!-- list of terminals -->
        <div v-if="data" dir="ltr">
          <div
            v-for="(i, index) in sortedTerminal"
            :key="i?.id"
            class="hover:bg-surface-hover border-border-divider active:bg-surface-pressed focus-visible:border focus-visible:border-interactive-focus p-md cursor-pointer"
            :class="terminalItemDynamicClass(index)"
            @click="handleChangeTerminal(i)"
          >
            <!-- description -->
            <div class="flex gap-sm justify-between">
              <div>
                <ui-Icon name="AngleLeft" />
              </div>
              <div class="flex gap-sm truncate">
                <div class="flex flex-col gap-2xs items-end truncate">
                  <div
                    class="text-body-400-b2 font-medium text-text truncate w-full text-right"
                    dir="rtl"
                  >
                    {{ i?.name }}
                  </div>
                  <div class="text-caption-400-c1 text-text-soft truncate w-full text-right">
                    {{ i?.domain }}
                  </div>
                </div>
                <SharedTerminalLogo :logo="i?.have_logo ? i?.logo : undefined" />
              </div>
            </div>
            <!-- badges -->
            <div class="flex justify-end pr-[50px] mt-sm">
              <div>
                <ui-Icon
                  v-if="Number(i?.pin)"
                  name="PinFill"
                  class="text-zarin-dark !text-heading-600-h3"
                />
              </div>
              <div v-if="Number(i?.pin)">
                <ui-Divider type="vertical" :height="24" class="mx-sm" />
              </div>
              <div>
                <ui-Status
                  :text="statusHandler(i?.status).text"
                  :type="statusHandler(i?.status).type"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </ui-Card>
  </div>
</template>
<script lang="ts" setup>
import { TerminalType } from '@/graphql/graphql';

const { data, loading } = useTerminalQuery();
const { addTerminalUrl } = useAuth();
const { statusHandler } = useTerminalStatus();
const router = useRouter();
const { setActiveTerminal } = useActiveTerminal();
const handleChangeTerminal = (terminal: TerminalType) => {
  setActiveTerminal(terminal);

  return router.push(`/panel/${encodeURIComponent(terminal?.domain as string)}/dashboard`);
};
const sortedTerminal = computed(() => {
  if (data.value && data.value.length) {
    const terminals = [...data.value];

    return terminals?.sort((a, b) => {
      if (a.pin === b.pin) {
        return 0;
      }
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
const terminalItemDynamicClass = (index: number) => {
  if (index === 0) {
    return 'border rounded-t-sm';
  }
  if (index === sortedTerminal.value.length - 1) {
    return 'border-b border-x rounded-b-sm';
  }

  return 'border-b border-x';
};
</script>
<style lang="scss" scoped>
.overview {
  @apply flex justify-center;
}
</style>
