import {
  ZarinLinkRequiredFieldsInputEnum as InputEnum,
  ZarinLinkRequiredFieldsStatusEnum as StatusEnum,
} from '@/graphql/graphql';

export const fieldItems = () => {
  const t = useI18n();

  return [
    {
      label: t('_form.addProduct.name_family'),
      name: InputEnum.Name,
      type: StatusEnum.Required,
      value: true,
    },
    {
      label: t('_form.addProduct.mobile'),
      name: InputEnum.Mobile,
      type: StatusEnum.Required,
      value: true,
    },
    {
      label: t('_form.addProduct.email'),
      name: InputEnum.Email,
      type: StatusEnum.Optional,
      value: true,
    },
    {
      label: t('_form.addProduct.order_description'),
      name: InputEnum.Description,
      type: StatusEnum.Optional,
      value: true,
    },
    {
      label: '',
      name: InputEnum.CustomField_1,
      type: StatusEnum.Hidden,
      value: false,
    },
    {
      label: '',
      name: InputEnum.CustomField_2,
      type: StatusEnum.Hidden,
      value: false,
    },
  ];
};
export const useProductDetails = () => {
  const t = useI18n();
  const segments = [
    {
      id: StatusEnum.Required,
      label: t('_common.buttons.required'),
    },
    {
      id: StatusEnum.Optional,
      label: t('_common.buttons.optional'),
    },
  ];

  return { fieldItems, segments };
};
