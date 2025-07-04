import { ref } from 'vue';

export function useAccessTokenClumns() {
  const t = useI18n();
  const columns = ref([
    {
      id: 1,
      label: t('_user.accessToken.accessToken'),
      name: 'name',
      width: '30%',
    },
    {
      id: 2,
      label: t('_user.accessToken.loginIp'),
      name: 'login_ip',
      width: '26%',
    },
    {
      id: 3,
      label: t('_user.accessToken.lastSeen'),
      name: 'updated_at',
      width: '30%',
    },

    {
      id: 4,
      label: '',
      name: 'action',
      width: '80px',
    },
  ]);

  return {
    columns,
  };
}
export function usePersonalAccessTokenClumns() {
  const t = useI18n();
  const columns = ref([
    {
      id: 1,
      label: t('_user.accessToken.accessToken'),
      name: 'name',
      width: '50%',
    },

    {
      id: 2,
      label: t('_user.accessToken.personal.lastUse'),
      name: 'updated_at',
      width: '25%',
    },

    {
      id: 3,
      label: '',
      name: 'action',
      width: '25%',
    },
  ]);

  return {
    columns,
  };
}
export function useThirdPartyAccessTokenClumns() {
  const t = useI18n();
  const columns = ref([
    {
      id: 1,
      label: t('_common.table.title'),
      name: 'name',
      width: '50%',
    },

    {
      id: 2,
      label: t('_user.accessToken.personal.lastUse'),
      name: 'updated_at',
      width: '25%',
    },

    {
      id: 4,
      label: '',
      name: 'action',
      width: '25%',
    },
  ]);

  return {
    columns,
  };
}
