import {
  IssuingBank,
  ReconciliationStatusEnum,
  SessionFeeTypeEnum,
  SessionPayerInfoType,
  SessionTryTypeEnum,
  SessionType,
} from '@/graphql/graphql';

export const useSessionDetailSchema = () => {
  const { toJalali } = useDate();
  const { numberFormat } = useMath();
  const t = useI18n();
  const sessionType = (type: string) => {
    switch (type) {
      case SessionTryTypeEnum.Zarinak:
        return t('session.show.type.ZARINAK');
      case 'WEBGATE':
        return t('session.show.type.WEBGATE');
      case SessionTryTypeEnum.Zaringate:
        return t('session.show.type.ZARINGATE');
      case SessionTryTypeEnum.Zarinlink:
        return t('session.show.type.ZARINLINK');
      case SessionTryTypeEnum.Ussdgate:
        return t('session.show.type.USSDGATE');
      case SessionTryTypeEnum.Personallink:
        return t('session.show.type.PERSONALLINK');
      case SessionTryTypeEnum.Requestmoney:
        return t('session.show.type.REQUESTMONEY');
      case SessionTryTypeEnum.Addfund:
        return t('session.show.type.ADDFUND');
      case 'DIRECT_DEBIT':
        return t('_form.search.sessionType.DirectDebit');
      case 'BILL':
        return t('session.show.type.BILL');
      default:
        break;
    }

    return '';
  };
  const detailList = reactive([
    {
      title: t('session.show.amount'),
      value: (val: SessionPayerInfoType & SessionType) =>
        `${numberFormat(val?.amount)}  ${t('product.details.rials')}` ?? '-',
    },
    {
      title: t('product.details.payId'),
      value: (val: SessionPayerInfoType & SessionType) => val?.id ?? '-',
    },
    {
      title: t('session.show.time_line.verified_id'),
      value: (val: SessionPayerInfoType & SessionType) => val?.reference_id ?? '-',
    },
    {
      title: t('title.date_time'),
      value: (val: SessionPayerInfoType & SessionType) => toJalali(val?.created_at) ?? '-',
    },
    {
      title: t('_common.amount.payment_Method'),
      value: (val: SessionPayerInfoType & SessionType) =>
        (val?.type && sessionType(val.type)) ?? '-',
    },
    {
      title: t('session.show.order_id'),
      value: (val: SessionPayerInfoType & SessionType) => val?.order_id ?? '-',
    },
    {
      title: t('session.show.fee'),
      value: (val: SessionPayerInfoType & SessionType) =>
        `${numberFormat(val?.fee)}  ${t('product.details.rials')}` ?? '-',
    },
    {
      title: t('session.show.fee_payer'),
      value: (val: SessionPayerInfoType & SessionType) =>
        val?.fee_type === SessionFeeTypeEnum.Merchant
          ? t('terminal.edit.merchant')
          : t('terminal.edit.payer'),
    },
    {
      title: t('_session.show.authority'),
      value: (val: SessionPayerInfoType & SessionType) => val?.authority ?? '-',
    },
  ]);
  const invoiceList = reactive([
    {
      title: t('_session.show.payer_info.cardPan'),
      value: 'card_pan',
    },
    {
      cardPanInquery: (val: SessionPayerInfoType) => val?.card_holder_name,
      title: t('_session.show.CustomerName'),
      value: 'card_holder_name',
    },
    {
      logo: (val: IssuingBank) => val?.slug,
      title: t('_session.show.payer_info.issuing_bank'),
      value: 'card_info',
    },
    {
      title: t('_session.show.payer_info.ipPayer'),
      value: 'payer_ip',
    },
    {
      title: t('title.reference_number'),
      value: 'rrn',
    },
    {
      title: t('user.profile.mobile'),
      value: 'mobile',
    },
    {
      title: t('user.profile.email'),
      value: 'email',
    },
  ]);
  const getStatusReconcileInfo = (value?: ReconciliationStatusEnum) => {
    switch (value) {
      case 'PAID':
        return {
          class: 'text-text-success',
          icon: 'DollarFill',
          text: t('session.show.time_line.reconciled'),
        };
      case 'IN_PROGRESS':
        return {
          class: 'text-text-information',
          icon: 'SyncArrowsCircle',
          text: t('status.PENDING_SHAPARAK'),
        };
      case 'REJECTED':
        return {
          class: 'text-text-danger',
          icon: 'DeleteCircle',
          text: t('session.show.time_line.canceled_reconcile'),
        };
      case 'REVERSED':
        return {
          class: 'text-text-disabled',
          icon: 'ArrowCircleDownLeft',
          text: t('_common.status.REVERSED'),
        };
    }
  };

  return {
    detailList,
    getStatusReconcileInfo,
    invoiceList,
  };
};
