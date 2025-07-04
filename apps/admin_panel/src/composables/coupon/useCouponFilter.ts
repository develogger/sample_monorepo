import type { Value } from '@/types/value';

import { CouponFilterEnum, CouponStatusEnum } from '@/graphql/graphql';

export const useCouponFilter = () => {
  const t = useI18n();
  const statusHandler = (value: CouponStatusEnum) => {
    switch (value) {
      case CouponStatusEnum.Active:
        return {
          text: t('_common.status.ACTIVE'),
          type: 'positive',
        };
      case CouponStatusEnum.Deleted:
        return {
          text: t('_common.status.INACTIVE'),
          type: 'neutral',
        };
      case CouponStatusEnum.Finished:
        return {
          text: t('_common.status.ENDED'),
          type: 'warning',
        };
      case CouponStatusEnum.Expired:
        return {
          text: t('_common.status.EXPIRED'),
          type: 'neutral',
        };

      default:
        return {
          text: value,
          type: 'neutral',
        };
    }
  };
  const statusList = ref<Value[]>([
    {
      label: t('_common.status.ALL'),
      value: CouponFilterEnum.All,
    },
    {
      label: t('_common.status.ACTIVE'),
      value: CouponFilterEnum.Active,
    },
    {
      label: t('_common.status.INACTIVE'),
      value: CouponFilterEnum.Deleted,
    },
    {
      label: t('_common.status.ENDED'),
      value: CouponFilterEnum.Finished,
    },
    {
      label: t('_common.status.EXPIRED'),
      value: CouponFilterEnum.Expired,
    },
  ]);

  return {
    statusHandler,
    statusList,
  };
};
