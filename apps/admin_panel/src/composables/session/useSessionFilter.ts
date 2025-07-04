import type { FilterList } from '@/types/filterList';
import type { Value } from '@/types/value';

import { FilterEnum, SessionTypeEnum } from '@/graphql/graphql';

/**
 * handle filter generate
 */
export function useSessionFilter() {
  const t = useI18n();
  const list = reactive<FilterList[]>([
    {
      checked: false,
      label: t('_common.status.ALL'),
      value: FilterEnum.All,
    },
    {
      checked: false,
      label: t('status.SUCCESS'),
      value: FilterEnum.Active,
    },
    {
      checked: false,
      label: t('status.FINALIZED'),
      value: FilterEnum.Verified,
    },

    {
      checked: false,
      label: t('status.NOT_FINALIZED'),
      value: FilterEnum.Paid,
    },
    {
      checked: false,
      label: t('status.UNSUCCESS'),
      value: FilterEnum.Trash,
    },
    {
      checked: false,
      label: t('status.REFUNDED'),
      value: FilterEnum.Refunded,
    },
  ]);
  const statusHandler = (value: FilterEnum) => {
    switch (value) {
      case FilterEnum.All:
        return {
          text: t('_common.status.ALL'),
          type: 'All',
        };
      case FilterEnum.Active:
        return {
          text: t('_common.status.SUCCESS'),
          type: 'Active',
        };

      case FilterEnum.Verified:
        return {
          text: t('_common.status.FINALIZED'),
          type: 'Verified',
        };
      case FilterEnum.Paid:
        return {
          text: t('_common.status.NOT_FINALIZED'),
          type: 'Paid',
        };
      case FilterEnum.Trash:
        return {
          text: t('_common.status.UNSUCCESS'),
          type: 'Trash',
        };
      case FilterEnum.Refunded:
        return {
          text: t('_common.status.REFUND'),
          type: 'Refunded',
        };
      default:
        return {
          text: '',
        };
    }
  };
  const statusList = ref<Value[]>([
    {
      label: t('_common.status.ALL'),
      value: FilterEnum.All,
    },
    {
      label: t('_common.status.SUCCESS'),
      value: FilterEnum.Active,
    },
    {
      label: t('_common.status.FINALIZED'),
      value: FilterEnum.Verified,
    },
    {
      label: t('_common.status.NOT_FINALIZED'),
      value: FilterEnum.Paid,
    },
    {
      label: t('_common.status.UNSUCCESS'),
      value: FilterEnum.Trash,
    },
    {
      label: t('_common.status.REFUND'),
      value: FilterEnum.Refunded,
    },
  ]);
  const typeList = ref<Value[]>([
    {
      label: t('_session.show.type.PERSONALLINK'),
      name: SessionTypeEnum.Personallink,
      value: SessionTypeEnum.Personallink,
    },
    {
      label: t('_form.search.sessionType.Addfund'),
      name: SessionTypeEnum.Addfund,
      value: SessionTypeEnum.Addfund,
    },
    {
      label: t('_form.search.sessionType.Bill'),
      name: SessionTypeEnum.Bill,
      value: SessionTypeEnum.Bill,
    },
    {
      label: t('_form.search.sessionType.DirectDebit'),
      name: SessionTypeEnum.DirectDebit,
      value: SessionTypeEnum.DirectDebit,
    },

    {
      label: t('_form.search.sessionType.Posgate'),
      name: SessionTypeEnum.Posgate,
      value: SessionTypeEnum.Posgate,
    },
    {
      label: t('_form.search.sessionType.TwoStep'),
      name: SessionTypeEnum.TwoStep,
      value: SessionTypeEnum.TwoStep,
    },
    {
      label: t('_session.show.type.USSDGATE'),
      name: SessionTypeEnum.Ussdgate,
      value: SessionTypeEnum.Ussdgate,
    },
    {
      label: t('_form.search.sessionType.Zarinak'),
      name: SessionTypeEnum.Zarinak,
      value: SessionTypeEnum.Zarinak,
    },
    {
      label: t('_form.search.sessionType.Zaringate'),
      name: SessionTypeEnum.Zaringate,
      value: SessionTypeEnum.Zaringate,
    },
    {
      label: t('_form.search.sessionType.Zarinlink'),
      name: SessionTypeEnum.Zarinlink,
      value: SessionTypeEnum.Zarinlink,
    },
  ]);

  return {
    list,
    statusHandler,
    statusList,
    typeList,
  };
}
