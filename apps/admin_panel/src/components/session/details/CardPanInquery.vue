<template>
  <div class="root" dir="rtl">
    <ui-Modal
      ref="filterRef"
      :text="$t('_session.show.inquery')"
      close-icon
      header
      width="480px"
      @close="toggleModal"
    >
      <template #body>
        <div>
          <ui-InlineMessage
            :title="$t('_session.show.inquery')"
            class="mb-md mt-xs"
            type="informative"
          >
            <template #title>
              <div class="alert-box" dir="rtl">
                <p
                  class="alert-box__description before:content-[''] before:absolute right-[1px] before:rounded-circle before:bg-black-100 before:w-[3px] before:h-[3px] before:mt-[9px] before:mr-[-8px]"
                >
                  {{ $t('_session.show.inquery') }}
                </p>
              </div>
            </template>
            <template #description>
              <div class="alert-box" dir="rtl">
                <p
                  class="alert-box__description before:content-[''] before:absolute right-[1px] before:rounded-circle before:bg-black-100 before:w-[3px] before:h-[3px] before:mt-[9px] before:mr-[-8px]"
                >
                  {{ $t('_session.show.inqueryDescribe') }}
                </p>
              </div>
            </template>
          </ui-InlineMessage>
        </div>
      </template>
      <template #rightFooter>
        <NuxtLink :to="`/panel/${terminal.currentDomain}/settings`">
          <ui-Icon name="SettingsRound" class="float-left" />
        </NuxtLink>
      </template>
      <template #leftFooter>
        <form dir="rtl" @submit.prevent="">
          <ui-Button
            class="inline-flex mr-xs main__item--button"
            size="medium"
            type="primary"
            :loading="loading"
            :disabled="loading"
            :text="$t('_common.buttons.inquerySubmit')"
            @click="cardPanInquery"
          />
        </form>
      </template>
    </ui-Modal>
  </div>
</template>

<script lang="ts" setup>
import { useSessionMutation } from '@/composables/session/useSessionMutation';
import { useSessionQueryById } from '@/composables/session/useSessionQueryById';

export interface Props {
  modal?: boolean;
  sessionId: string;
}
const terminal = useTerminalStore();
const emit = defineEmits(['close']);
const t = useI18n();
const { $notify } = useNuxtApp();
const props = withDefaults(defineProps<Props>(), {});
const { sessionId } = toRefs(props);
const { refetch } = useSessionQueryById();
const { sessionCardHolder } = useSessionMutation();
const { mutate, onDone, loading } = sessionCardHolder();
const toggleModal = () => {
  emit('close');
};
const cardPanInquery = () => {
  const variablesDelete = {
    session_id: sessionId.value,
  };
  mutate(variablesDelete);
};
onDone(() => {
  refetch();
  emit('close');
  $notify({
    isRead: false,
    message: t('_session.show.inquerySucsess'),
    type: 'success',
  });
});
</script>
