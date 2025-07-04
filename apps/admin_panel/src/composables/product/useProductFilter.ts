import type { Value } from '@/types/value';

import { ZarinLinkFilterEnum } from '@/graphql/graphql';

const statusHandler = (value: string) => {
  const t = useI18n();
  if (!value) {
    return {
      text: t('_common.status.ACTIVE'),
      type: 'positive',
    };
  }

  return {
    text: value,
    type: 'neutral',
  };
};
export const useProductFilter = () => {
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

  return {
    statusHandler,
    statusList,
    // useFilterSchema,
  };
};
