export default defineNuxtPlugin(() => ({
  name: 'notify',
  provide: {
    notify: (data: NotificationType) => {
      const notiticationStore = useNotificationStore();
      notiticationStore.notify({
        isRead: false,
        message: data.message,
        type: data.type,
      });
    },
  },
}));
