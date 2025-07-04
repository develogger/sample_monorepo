import { defineStore } from 'pinia';

export interface NotificationType {
  duration?: number;
  hasClose?: boolean;
  id?: number;
  isRead: boolean;
  message: string;
  title?: string;
  type: 'error' | 'info' | 'success';
}

export const useNotificationStore = defineStore('notificationStore', {
  actions: {
    notify(data: NotificationType) {
      const notification = { ...data };
      if (!notification.hasClose) notification.duration = 5;
      notification.id = Math.floor(Math.random() * Date.now()) as number;
      this.all.unshift(notification);
    },
    remove(data: NotificationType) {
      const notification = { ...data };
      const index = this.all.findIndex(item => item.id === notification.id);
      index !== -1 && this.all.splice(index, 1);
    },
  },
  getters: {
    unreads: state => {
      const result = [];
      const success = state.all.filter(item => !item.isRead && item.type === 'success');
      const errors = state.all.filter(item => !item.isRead && item.type === 'error');

      success[0] && result.unshift(success[0]);
      errors[0] && result.unshift(errors[0]);

      return result;
    },
  },
  state: () => ({
    all: <NotificationType[]>[],
  }),
});
