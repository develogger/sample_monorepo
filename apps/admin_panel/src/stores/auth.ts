import broadcast from '@/broadcast/broadcast';
import { UserType } from '@/graphql/graphql';
// import { DataStatusType } from '@/graphql/graphql';
import { UserAnnouncementTypeCustom } from '@/types/userCustomTypes';
import { defineStore } from 'pinia';
interface IUser {
  // address_count: number;
  avatar: string;
  // data_status?: DataStatusType;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  level: string;
  personal_link: {
    domain: string;
  };
  referral_id: string;
  username: string;
}
interface INotification {
  body: string;
  id: string;
  isPersonal: boolean;
  isSeen?: boolean;
  title: string;
  type: string;
}
interface IResponse {
  data: INotification;
}

export const useAuthStore = defineStore(
  'authStore',
  () => {
    const socket = new broadcast();
    const isFirstTime = ref(true);
    const hasLogged = ref(true);
    const spaLoading = ref(true);
    const personal_link = ref<string>();
    const showLogOut = ref<boolean>(false);
    const userAuth = ref<IUser>({} as IUser);
    const notifications = ref<INotification[]>([]);
    const announcements = ref<UserAnnouncementTypeCustom[]>([]);
    const version = ref<string>();
    const tourActive = ref(false);
    const getConnected = () => {
      socket.subscribe(`$panel:App.User.${userAuth.value.id}`, (res: IResponse) => {
        if (notifications.value.length < 30) {
          notifications.value.push(res.data);
        } else {
          notifications.value[notifications.value.length - 1] = res.data;
        }
      });
    };

    function setSpaLoading(value: boolean) {
      spaLoading.value = value;
    }

    function setUserAuth(me: UserType) {
      userAuth.value.level = me?.level ? me.level : '';
    }

    return {
      announcements,
      getConnected,
      hasLogged,
      isFirstTime,
      notifications,
      personal_link,
      setSpaLoading,
      setUserAuth,
      showLogOut,
      spaLoading,
      tourActive,
      userAuth,
      version,
    };
  },
  {
    persist: {
      paths: [
        'announcements',
        'hasLogged',
        'isFirstTime',
        'personal_link',
        'showLogOut',
        'spaLoading',
        'userAuth',
        'version',
      ],
      storage: persistedState.localStorage,
    },
  }
);
