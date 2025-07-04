<template>
  <div class="notification" dir="rtl">
    <div>
      <div class="notification__header">{{ $t('_user.notification.title') }}</div>
      <div class="notification__header--description">
        {{ $t('_user.notification.description') }}
      </div>
    </div>
    <div>
      <!-- Notification item -->
      <div class="notification__header">
        {{ $t('_user.notification.channels.notification') }}
      </div>
      <div dir="ltr" class="notification__toggles">
        <ui-Toggle
          v-model="togglePushItems.notificationPush"
          :label="$t('_common.page_title.addTicket')"
          class="w-full flex justify-end"
          name="pushTicketNew"
          :loading="loading || notificationLoading"
          @update:model-value="handleChangToggle(NotificationPreferenceTypeEnum.TicketNew)"
        />
        <ui-Toggle
          v-model="togglePushItems.sessionPush"
          :label="$t('_user.notification.success_transaction')"
          class="w-full flex justify-end"
          name="pushSessionSuccess"
          :loading="loading || notificationLoading"
          @update:model-value="handleChangToggle(NotificationPreferenceTypeEnum.SessionSuccess)"
        />
        <ui-Toggle
          v-model="togglePushItems.reconcilePush"
          :label="$t('_user.notification.output_transactions')"
          class="w-full flex justify-end"
          name="pushReconcile"
          :loading="loading || notificationLoading"
          @update:model-value="handleChangToggle(NotificationPreferenceTypeEnum.Reconcile)"
        />
      </div>
      <ui-Divider class="w-full my-xl" />
      <!-- Sms item -->
      <div class="notification__header mt-xl">
        {{ $t('_user.notification.channels.sms') }}
      </div>
      <div dir="ltr" class="notification__toggles">
        <ui-Toggle
          v-if="toggleSmsItems.sessionPush || loading || notificationLoading"
          v-model="toggleSmsItems.sessionPush"
          :label="$t('_user.notification.success_transaction')"
          class="w-full flex justify-end"
          name="pushTicketNew"
          :disabled="true"
          :loading="loading || notificationLoading"
          @update:model-value="handleChangToggle(NotificationPreferenceTypeEnum.SessionSuccess)"
        />
        <span v-else class="text-text-soft text-body-400-b3" dir="rtl">{{
          $t('_user.notification.description_sms')
        }}</span>
        <ui-Button
          variant="outlined"
          type="tertiary"
          size="Medium"
          :after-icon="!toggleSmsItems.sessionPush ? 'Letter' : ''"
          :text="
            !toggleSmsItems.sessionPush
              ? $t('_user.notification.activate_sms')
              : $t('_user.notification.deActive')
          "
          :loading="loading || notificationLoading"
          @click="!toggleSmsItems.sessionPush ? (showVerify = true) : (showConfirmSms = true)"
        />
      </div>
      <!-- Telegram item -->
      <ui-Divider class="w-full my-xl" />
      <div class="notification__header mt-xl">
        {{ $t('_user.notification.channels.telegram') }}
      </div>
      <div dir="ltr" class="notification__toggles">
        <ui-Toggle
          v-if="hasTelegram"
          v-model="toggleTelegramItems.notificationPush"
          :label="$t('_common.page_title.addTicket')"
          class="w-full flex justify-end"
          name="telegramTicketNew"
          :loading="loading || notificationLoading"
          @update:model-value="handleChangToggle(NotificationPreferenceTypeEnum.TicketNew)"
        />
        <ui-Toggle
          v-if="hasTelegram"
          v-model="toggleTelegramItems.sessionPush"
          :label="$t('_user.notification.success_transaction')"
          class="w-full flex justify-end"
          name="telegramSessionSuccess"
          :loading="loading || notificationLoading"
          @update:model-value="handleChangToggle(NotificationPreferenceTypeEnum.SessionSuccess)"
        />
        <ui-Toggle
          v-if="hasTelegram"
          v-model="toggleTelegramItems.reconcilePush"
          :label="$t('_user.notification.output_transactions')"
          class="w-full flex justify-end"
          name="telegramReconcile"
          :loading="loading || notificationLoading"
          @update:model-value="handleChangToggle(NotificationPreferenceTypeEnum.Reconcile)"
        />
        <span v-else class="text-text-soft text-body-400-b3" dir="rtl">{{
          $t('_user.notification.description_telegram')
        }}</span>
        <ui-Button
          variant="outlined"
          type="tertiary"
          size="Medium"
          :after-icon="!hasTelegram ? 'Telegram' : ''"
          :text="
            !hasTelegram
              ? $t('_user.notification.activate_teleram_bot')
              : $t('_user.notification.deActive')
          "
          :loading="loading || notificationLoading"
          @click="handleTelegramBot"
        />
      </div>
      <ui-Divider class="w-full my-xl" />
      <!-- Email item -->
      <div class="notification__header mt-xl">
        {{ $t('_user.notification.channels.mail') }}
      </div>
      <div dir="ltr" class="notification__toggles">
        <ui-Toggle
          v-if="userData?.email || loading || notificationLoading"
          v-model="toggleMailItems.notificationPush"
          :label="$t('_common.page_title.addTicket')"
          class="w-full flex justify-end"
          name="pushTicketNew"
          :loading="loading || notificationLoading"
          @update:model-value="handleChangToggle(NotificationPreferenceTypeEnum.TicketNew)"
        />
        <ui-Toggle
          v-if="userData?.email || loading || notificationLoading"
          v-model="toggleMailItems.sessionPush"
          :label="$t('_user.notification.success_transaction')"
          class="w-full flex justify-end"
          name="pushSessionSuccess"
          :loading="loading || notificationLoading"
          @update:model-value="handleChangToggle(NotificationPreferenceTypeEnum.SessionSuccess)"
        />
        <ui-Toggle
          v-if="userData?.email || loading || notificationLoading"
          v-model="toggleMailItems.reconcilePush"
          :label="$t('_user.notification.output_transactions')"
          class="w-full flex justify-end"
          name="pushReconcile"
          :loading="loading || notificationLoading"
          @update:model-value="handleChangToggle(NotificationPreferenceTypeEnum.Reconcile)"
        />
        <ui-Button
          v-else
          variant="outlined"
          type="tertiary"
          size="Medium"
          after-icon="Email"
          :text="$t('_user.notification.add_email')"
          :loading="loading || notificationLoading"
          @click="showVerifyEmail = true"
        />
      </div>
    </div>
    <UserBaseVerifySmsService
      v-if="showVerify"
      @close="showVerify = false"
      @submit="handleSmsVerify"
    />
    <UserBaseVerifyEmail
      v-if="showVerifyEmail"
      @close="showVerifyEmail = false"
      @submit="handleSmsVerify"
    />
    <SharedShareModalConfirm
      v-if="showConfirmSms"
      cancel-label="_common.buttons.cancel"
      submit-label="_common.buttons.accept"
      description="_user.notification.question_sms"
      title="_user.notification.deactivate_sms"
      @close="showConfirmSms = false"
      @confirm="
        () => {
          showConfirmSms = false;
          toggleSmsItems.sessionPush = false;
          handleChangToggle(NotificationPreferenceTypeEnum.SessionSuccess);
        }
      "
      @cancel="showConfirmSms = false"
    />
    <SharedShareModalConfirm
      v-if="showConfirmTelegram"
      cancel-label="_common.buttons.cancel"
      submit-label="_common.buttons.accept"
      description="_user.notification.question_telegram"
      title="_user.notification.deActivate_teleram_bot"
      @close="showConfirmTelegram = false"
      @confirm="deActiveMutate"
      @cancel="showConfirmTelegram = false"
    />
  </div>
</template>
<script lang="ts" setup>
import { usePreferencesEditMutation } from '@/composables/notification/useNotificationMutation';
import { useNotificationQuery } from '@/composables/notification/useNotificationQuery';
import { useDeactivateTelegramMutation } from '@/composables/user/useDeactivateTelegramMutation';
import { useUserIdQuery } from '@/composables/user/useUserIdQuery';
import {
  NotificationPreferenceChannelEnum,
  PreferencesEditMutationVariables,
  NotificationPreferenceTypeEnum,
  UserNotificationPreferencesType,
  PreferencesEditMutation,
  Maybe,
} from '@/graphql/graphql';

const { $notify } = useNuxtApp();
const t = useI18n();
useHead({
  title: t('_user.notification.title'),
});
const togglePushItems = ref({
  notificationPush: false,
  sessionPush: false,
  reconcilePush: false,
});
const toggleTelegramItems = ref({
  notificationPush: false,
  sessionPush: false,
  reconcilePush: false,
});
const toggleSmsItems = ref({
  sessionPush: false,
});
const toggleMailItems = ref({
  notificationPush: false,
  sessionPush: false,
  reconcilePush: false,
});
const showVerify = ref(false);
const showConfirmSms = ref(false);
const showConfirmTelegram = ref(false);
const showVerifyEmail = ref(false);
const currentChannel = ref<NotificationPreferenceChannelEnum[]>([]);
const { data: userData } = useUserIdQuery();
const { data, onResult, loading: notificationLoading, refetch } = useNotificationQuery();
const { preferencesEdit } = usePreferencesEditMutation();
const { mutate: editMutate, onDone, loading } = preferencesEdit();
const { deactivateTelegram } = useDeactivateTelegramMutation();
const config = useRuntimeConfig();
const { mutate: deActiveMutate, onDone: deActiveOnDone } = deactivateTelegram();
const hasTelegram = computed(
  () =>
    data.value?.social_info &&
    data.value.social_info.length > 0 &&
    data.value.social_info[0]?.active
);
const handleTelegramBot = () => {
  if (hasTelegram.value) {
    showConfirmTelegram.value = true;
  } else {
    window.open(config.public.bot_url as string, '_blank');
  }
};
const handleSmsVerify = () => {
  showVerify.value = false;
  toggleSmsItems.value.sessionPush = true;
  handleChangToggle(NotificationPreferenceTypeEnum.SessionSuccess);
};
const fillChannelData = (type: NotificationPreferenceTypeEnum) => {
  currentChannel.value = [];
  if (type === NotificationPreferenceTypeEnum.SessionSuccess) {
    if (togglePushItems.value.sessionPush) {
      currentChannel.value.push(NotificationPreferenceChannelEnum.Push);
    }
    if (toggleSmsItems.value.sessionPush) {
      currentChannel.value.push(NotificationPreferenceChannelEnum.Sms);
    }
    if (toggleMailItems.value.sessionPush) {
      currentChannel.value.push(NotificationPreferenceChannelEnum.Mail);
    }
    if (toggleTelegramItems.value.sessionPush) {
      currentChannel.value.push(NotificationPreferenceChannelEnum.Telegram);
    }
  } else if (type === NotificationPreferenceTypeEnum.Reconcile) {
    if (togglePushItems.value.reconcilePush) {
      currentChannel.value.push(NotificationPreferenceChannelEnum.Push);
    }
    if (toggleMailItems.value.reconcilePush) {
      currentChannel.value.push(NotificationPreferenceChannelEnum.Mail);
    }
    if (toggleTelegramItems.value.reconcilePush) {
      currentChannel.value.push(NotificationPreferenceChannelEnum.Telegram);
    }
  } else if (type === NotificationPreferenceTypeEnum.TicketNew) {
    if (togglePushItems.value.notificationPush) {
      currentChannel.value.push(NotificationPreferenceChannelEnum.Push);
    }
    if (toggleMailItems.value.notificationPush) {
      currentChannel.value.push(NotificationPreferenceChannelEnum.Mail);
    }
    if (toggleTelegramItems.value.notificationPush) {
      currentChannel.value.push(NotificationPreferenceChannelEnum.Telegram);
    }
  }
};
const getPreferenceData = (data: Maybe<UserNotificationPreferencesType>[]) => {
  const notificationPreferences = data;
  const filterPreferencesByChannel = (channel: NotificationPreferenceChannelEnum) =>
    notificationPreferences.filter(item => item?.channels.includes(channel));
  const processFilteredPreferences = (
    channel: NotificationPreferenceChannelEnum,
    filteredPreferences: Maybe<UserNotificationPreferencesType>[]
  ) => {
    if (filteredPreferences.length) {
      handleCheckData(channel, filteredPreferences);
    }
  };
  const pushFiltered = filterPreferencesByChannel(NotificationPreferenceChannelEnum.Push);
  const telegramFiltered = filterPreferencesByChannel(NotificationPreferenceChannelEnum.Telegram);
  const smsFiltered = filterPreferencesByChannel(NotificationPreferenceChannelEnum.Sms);
  const mailFiltered = filterPreferencesByChannel(NotificationPreferenceChannelEnum.Mail);
  processFilteredPreferences(NotificationPreferenceChannelEnum.Push, pushFiltered);
  processFilteredPreferences(NotificationPreferenceChannelEnum.Telegram, telegramFiltered);
  processFilteredPreferences(NotificationPreferenceChannelEnum.Sms, smsFiltered);
  processFilteredPreferences(NotificationPreferenceChannelEnum.Mail, mailFiltered);
};
const handleCheckData = (
  type: NotificationPreferenceChannelEnum,
  data: Maybe<UserNotificationPreferencesType>[]
) => {
  if (type === NotificationPreferenceChannelEnum.Push) {
    data.forEach(item => {
      switch (item?.type) {
        case NotificationPreferenceTypeEnum.SessionSuccess:
          return (togglePushItems.value.sessionPush = true);
        case NotificationPreferenceTypeEnum.Reconcile:
          return (togglePushItems.value.reconcilePush = true);
        case NotificationPreferenceTypeEnum.TicketNew:
          return (togglePushItems.value.notificationPush = true);
      }
    });
  } else if (type === NotificationPreferenceChannelEnum.Telegram) {
    data.forEach(item => {
      switch (item?.type) {
        case NotificationPreferenceTypeEnum.SessionSuccess:
          return (toggleTelegramItems.value.sessionPush = true);
        case NotificationPreferenceTypeEnum.Reconcile:
          return (toggleTelegramItems.value.reconcilePush = true);
        case NotificationPreferenceTypeEnum.TicketNew:
          return (toggleTelegramItems.value.notificationPush = true);
      }
    });
  } else if (type === NotificationPreferenceChannelEnum.Sms) {
    switch (data[0]?.type) {
      case NotificationPreferenceTypeEnum.SessionSuccess:
        return (toggleSmsItems.value.sessionPush = true);
    }
  } else if (type === NotificationPreferenceChannelEnum.Mail) {
    data.forEach(item => {
      switch (item?.type) {
        case NotificationPreferenceTypeEnum.SessionSuccess:
          return (toggleMailItems.value.sessionPush = true);
        case NotificationPreferenceTypeEnum.Reconcile:
          return (toggleMailItems.value.reconcilePush = true);
        case NotificationPreferenceTypeEnum.TicketNew:
          return (toggleMailItems.value.notificationPush = true);
      }
    });
  }
};
const handleChangToggle = (typePreference: NotificationPreferenceTypeEnum) => {
  fillChannelData(typePreference);
  const variables = {
    notification_preferences: [
      {
        type: typePreference,
        channels: currentChannel.value,
      },
    ],
  } as PreferencesEditMutationVariables;
  editMutate(variables);
};
onDone(result => {
  const data = result.data as PreferencesEditMutation;
  if (data?.PreferencesEdit && data.PreferencesEdit.notification_preferences) {
    getPreferenceData(data.PreferencesEdit.notification_preferences);
  }
  $notify({
    isRead: false,
    message: t('common.success'),
    type: 'success',
  });
});
deActiveOnDone(() => {
  refetch();
  showConfirmTelegram.value = false;
});
onResult(() => {
  if (data.value && data.value?.notification_preferences) {
    getPreferenceData(data.value?.notification_preferences);
  }
});
refetch();
</script>
<style lang="scss" scoped>
.notification {
  &__header {
    @apply mb-md font-bold;
    &--description {
      @apply mb-xl text-body-400-b3 text-text-soft;
    }
  }
  &__toggles {
    @apply flex flex-col items-end gap-md;
  }
}
</style>
