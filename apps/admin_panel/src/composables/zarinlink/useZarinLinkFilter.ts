import { ZarinLinkFilterEnum, ZarinLinkTypeEnum } from '@/graphql/graphql';

export interface ZarinLinkStatusFilterValue {
  label: string;
  value: boolean | string;
}

const statusHandler = (value: string) => {
  const t = useI18n();
  if (!value) {
    return {
      text: t('_common.status.ACTIVE'),
      type: 'positive',
    };
  }

  return {
    text: t('_common.status.INACTIVE'),
    type: 'neutral',
  };
};

export const useZarinLinkFilter = () => {
  const t = useI18n();
  const statusList = ref<Value[]>([
    {
      label: t('_common.status.ALL'),
      value: ZarinLinkFilterEnum.All,
    },
    {
      label: t('_common.status.ACTIVE'),
      value: ZarinLinkFilterEnum.Active,
    },
    {
      label: t('_common.status.INACTIVE'),
      value: ZarinLinkFilterEnum.Trash,
    },
  ]);
  const typesList = ref<ZarinLinkStatusFilterValue[]>([
    {
      label: t('_common.status.zarin_link.PAYMENT'),
      value: ZarinLinkTypeEnum.Payment,
    },
    {
      label: t('_common.status.zarin_link.PRODUCT'),
      value: ZarinLinkTypeEnum.Product,
    },
    {
      label: t('_common.status.zarin_link.RESERVATION'),
      value: ZarinLinkTypeEnum.Reservation,
    },
    {
      label: t('_common.status.zarin_link.SUBSCRIPTION'),
      value: ZarinLinkTypeEnum.Subscription,
    },
  ]);

  return {
    statusHandler,
    statusList,
    typesList,
  };
};
