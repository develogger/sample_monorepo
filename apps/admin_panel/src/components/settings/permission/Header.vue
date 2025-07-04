<template>
  <header>
    <div class="flex justify-between items-center">
      <ui-Button
        :text="$t('_common.buttons.add_session')"
        :disabled="disableCreateButton"
        variant="outlined"
        type="tertiary"
        @click="emit('click-button')"
      />
      <span class="text-heading-600-h2 text-text">{{ $t('_common.slug.level') }}</span>
    </div>
    <ui-Skeleton :loading="loading" :width="200" class="my-xl" dir="rtl">
      <p v-if="hasCaption" class="text-body-400-b3 text-text-soft">
        {{ $t('_empty.terminalEdit.caption') }}
      </p>
    </ui-Skeleton>
  </header>
</template>

<script lang="ts" setup>
import { TerminalStatusEnum } from '@/graphql/graphql';

interface Props {
  hasCaption: boolean;
  loading: boolean;
}
defineProps<Props>();
const emit = defineEmits(['click-button']);
const { activeTerminal } = useTerminalQuery();
const disableCreateButton = computed(
  () => activeTerminal.value?.status !== TerminalStatusEnum.Active
);
</script>
