/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** Big int */
  BigInteger: { input: any; output: any };
  /** valid cell number */
  CellNumber: { input: any; output: any };
  /** date */
  Date: { input: any; output: any };
  /** date and time */
  DateTime: { input: any; output: any };
  /** ip address */
  IP: { input: any; output: any };
  /** Masked pan, PCI-DSS */
  MaskedPan: { input: any; output: any };
  /**
   * The `Upload` special type represents a file to be uploaded in the same HTTP request as specified by
   *  [graphql-multipart-request-spec](https://github.com/jaydenseric/graphql-multipart-request-spec).
   */
  Upload: { input: any; output: any };
  /** valid file id */
  ValidFile: { input: any; output: any };
};

/** user fetch access token enum */
export enum AccessTokenEnum {
  Personal = 'PERSONAL',
  Thirdparty = 'THIRDPARTY',
  Zarinpal = 'ZARINPAL',
}

/** Access Token type */
export type AccessTokenType = {
  __typename?: 'AccessTokenType';
  /** terminal avatar */
  avatar?: Maybe<Scalars['String']['output']>;
  /** client persian name */
  client_fa_name: Scalars['String']['output'];
  /** client id */
  client_id: Scalars['String']['output'];
  /** client name */
  client_name: Scalars['String']['output'];
  /** client type */
  client_type?: Maybe<AccessTokenEnum>;
  /** country */
  country?: Maybe<Scalars['String']['output']>;
  /** country code */
  country_code?: Maybe<Scalars['String']['output']>;
  /** is current */
  current?: Maybe<Scalars['Boolean']['output']>;
  /** expires at */
  expires_at?: Maybe<Scalars['DateTime']['output']>;
  /** id */
  id: Scalars['ID']['output'];
  /** ip */
  login_ip?: Maybe<Scalars['IP']['output']>;
  /** name */
  name?: Maybe<Scalars['String']['output']>;
  /** is personal */
  personal?: Maybe<Scalars['Boolean']['output']>;
  /** personal token */
  personal_token?: Maybe<Scalars['String']['output']>;
  /** is revoked */
  revoked?: Maybe<Scalars['Boolean']['output']>;
  /** terminal domain address */
  terminal_domain?: Maybe<Scalars['String']['output']>;
  /** expires at */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  /** user_agent */
  user_agent?: Maybe<Scalars['String']['output']>;
};

/** AdditionalIdentificationInfo type */
export type AdditionalIdentificationInfoType = {
  __typename?: 'AdditionalIdentificationInfoType';
  /** biz info data */
  biz_info?: Maybe<BizInfoType>;
  /** passport type */
  passport?: Maybe<PassportType>;
  /** registration info data */
  registration?: Maybe<RegistrationInfoType>;
  /** ssh info data */
  ssh_info?: Maybe<SshInfoType>;
};

/** Address status type enum */
export enum AddressStatusTypeEnum {
  Completed = 'COMPLETED',
  NotCompleted = 'NOT_COMPLETED',
}

/** Address type */
export type AddressType = {
  __typename?: 'AddressType';
  /** address */
  address?: Maybe<Scalars['String']['output']>;
  /** address id */
  id: Scalars['ID']['output'];
  /** is postal_code verified? */
  is_postal_code_verified?: Maybe<Scalars['Boolean']['output']>;
  /** landline */
  landline?: Maybe<Scalars['String']['output']>;
  /** address location */
  location?: Maybe<Scalars['String']['output']>;
  /** postal_code */
  postal_code?: Maybe<Scalars['String']['output']>;
  /** tax */
  tax_id?: Maybe<Scalars['String']['output']>;
  /** title */
  title?: Maybe<Scalars['String']['output']>;
  /** address type */
  type?: Maybe<AddressTypeEnum>;
};

/** Address type enum */
export enum AddressTypeEnum {
  Home = 'HOME',
  Other = 'OTHER',
  Work = 'WORK',
}

/** data of analysis chart  */
export type AnalysisDetailsType = {
  __typename?: 'AnalysisDetailsType';
  /** amount */
  amount?: Maybe<Scalars['BigInteger']['output']>;
  /** count */
  count?: Maybe<Scalars['BigInteger']['output']>;
  /** date */
  date?: Maybe<Scalars['Date']['output']>;
  /** Type */
  type?: Maybe<Scalars['String']['output']>;
};

/** application type */
export type ApplicationType = {
  __typename?: 'ApplicationType';
  /** stable version */
  application?: Maybe<Scalars['String']['output']>;
  /** latest url */
  latest_url?: Maybe<Scalars['String']['output']>;
  /** latest version */
  latest_version?: Maybe<Scalars['BigInteger']['output']>;
  /** stable version */
  platform?: Maybe<Scalars['String']['output']>;
  /** stable url */
  stable_url?: Maybe<Scalars['String']['output']>;
  /** stable version */
  stable_version?: Maybe<Scalars['BigInteger']['output']>;
};

export type BankAccount = {
  __typename?: 'BankAccount';
  /** account created date-time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** account deleted date-time */
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  /** account expire date */
  expired_at?: Maybe<Scalars['Date']['output']>;
  /** account holder name */
  holder_name?: Maybe<Scalars['String']['output']>;
  /** account iban */
  iban?: Maybe<Scalars['String']['output']>;
  /** The id of the card */
  id: Scalars['ID']['output'];
  /** account legal status */
  is_legal?: Maybe<Scalars['Boolean']['output']>;
  /** issuing bank */
  issuing_bank?: Maybe<IssuingBank>;
  /** account name */
  name?: Maybe<Scalars['String']['output']>;
  /** pin */
  pin?: Maybe<Scalars['Int']['output']>;
  /** account status */
  status?: Maybe<BankAccountStatusEnum>;
  /** account type */
  type?: Maybe<BankAccountTypeEnum>;
  /** account updated date-time */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

/** BankAccount status enum */
export enum BankAccountStatusEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING',
  PendingShaparak = 'PENDING_SHAPARAK',
  Rejected = 'REJECTED',
  RejectedShaparak = 'REJECTED_SHAPARAK',
  ZarinCardPending = 'ZARIN_CARD_PENDING',
}

/** Bank account status type enum */
export enum BankAccountStatusTypeEnum {
  Completed = 'COMPLETED',
  NotCompleted = 'NOT_COMPLETED',
  Processing = 'PROCESSING',
  Rejected = 'REJECTED',
}

/** BankAccount type enum */
export enum BankAccountTypeEnum {
  NeoZarin = 'NEO_ZARIN',
  Personal = 'PERSONAL',
  Refund = 'REFUND',
  Share = 'SHARE',
  ZarinCard = 'ZARIN_CARD',
  ZarinDax = 'ZARIN_DAX',
}

/** Biz Info type */
export type BizInfoType = {
  __typename?: 'BizInfoType';
  /** bcn */
  enamad_id?: Maybe<Scalars['Int']['output']>;
  /** bcn */
  nsr_id?: Maybe<Scalars['String']['output']>;
  tax_id?: Maybe<Scalars['String']['output']>;
};

/** Card type */
export type Card = {
  __typename?: 'Card';
  /** card created date-time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** card deleted date-time */
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  /** card expire date */
  expired_at?: Maybe<Scalars['Date']['output']>;
  /** The id of card */
  id: Scalars['ID']['output'];
  /** issuing bank */
  issuing_bank?: Maybe<IssuingBank>;
  /** 16 digit pan number, Masked */
  pan?: Maybe<Scalars['MaskedPan']['output']>;
  /** card status */
  status?: Maybe<CardStatus>;
  /** card updated date-time */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  /** The id of card holder */
  user_id?: Maybe<Scalars['ID']['output']>;
};

/** BankAccount status enum */
export enum CardStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING',
  PendingShaparak = 'PENDING_SHAPARAK',
  Rejected = 'REJECTED',
  RejectedShaparak = 'REJECTED_SHAPARAK',
  ZarinCardPending = 'ZARIN_CARD_PENDING',
}

/** Category type enum */
export enum CategoryTypeEnum {
  Payment = 'PAYMENT',
  Product = 'PRODUCT',
  Reservation = 'RESERVATION',
  Subscription = 'SUBSCRIPTION',
}

/** in progress , pending  reconcile sum and count */
export type ChartCountAmountType = {
  __typename?: 'ChartCountAmountType';
  /** pending, in progress reconcile sum amount */
  amount?: Maybe<Scalars['BigInteger']['output']>;
  /** pending, in progress reconcile count */
  count?: Maybe<Scalars['BigInteger']['output']>;
};

/** Coupon status enum */
export enum CouponFilterEnum {
  Active = 'ACTIVE',
  All = 'ALL',
  AllNotActive = 'ALL_NOT_ACTIVE',
  Deleted = 'DELETED',
  Expired = 'EXPIRED',
  Finished = 'FINISHED',
}

/** Coupon session  type */
export type CouponSessionType = {
  __typename?: 'CouponSessionType';
  /** coupon_id */
  coupon_id?: Maybe<Scalars['ID']['output']>;
  /** type */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** discount amount */
  discount_amount?: Maybe<Scalars['BigInteger']['output']>;
  /** The id of coupon session */
  id: Scalars['ID']['output'];
  /** The id of session */
  session_id: Scalars['ID']['output'];
};

/** Coupon status enum */
export enum CouponStatusEnum {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Expired = 'EXPIRED',
  Finished = 'FINISHED',
}

/** Coupon type */
export type CouponType = {
  __typename?: 'CouponType';
  /** account updated date-time */
  code: Scalars['String']['output'];
  /** account created date-time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** account deleted date-time */
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  /** account created date-time */
  discount_percent: Scalars['BigInteger']['output'];
  /** account deleted date-time */
  expired_at?: Maybe<Scalars['DateTime']['output']>;
  /** terminal id */
  id: Scalars['ID']['output'];
  /** limit */
  limit?: Maybe<Scalars['BigInteger']['output']>;
  /** account expire date */
  max_discount_amount: Scalars['BigInteger']['output'];
  /** min amount */
  min_amount: Scalars['BigInteger']['output'];
  notes?: Maybe<Array<Maybe<NoteType>>>;
  /** list of assigned products */
  products?: Maybe<Array<Maybe<ZarinLinkType>>>;
  /** status */
  status?: Maybe<CouponStatusEnum>;
  /** terminal id */
  terminal_id: Scalars['ID']['output'];
  /** account updated date-time */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  /** the number of times a coupon has been used */
  used?: Maybe<Scalars['Int']['output']>;
  /** zarin link id */
  zarin_link_id?: Maybe<Scalars['ID']['output']>;
};

/** Create kyc type */
export type CreateKycType = {
  __typename?: 'CreateKycType';
  /** kyc session key */
  session_key?: Maybe<Scalars['String']['output']>;
  /** kyc verify status */
  verify?: Maybe<Scalars['Boolean']['output']>;
};

/** Terminal currency enum */
export enum CurrencyEnum {
  Rial = 'RIAL',
  Toman = 'TOMAN',
}

/** customer terminal type */
export type CustomersTerminalType = {
  __typename?: 'CustomersTerminalType';
  /** associated domain */
  domain?: Maybe<Scalars['String']['output']>;
  /** Terminal`s logo */
  logo?: Maybe<Scalars['String']['output']>;
  /** name */
  name?: Maybe<Scalars['String']['output']>;
  /** Terminal`s support phone number */
  support_phone?: Maybe<Scalars['String']['output']>;
};

/** daily report details  */
export type DailyReportDetailsType = {
  __typename?: 'DailyReportDetailsType';
  /** amount */
  amount?: Maybe<Scalars['BigInteger']['output']>;
  /** count */
  count?: Maybe<Scalars['BigInteger']['output']>;
  /** date */
  date?: Maybe<Scalars['Date']['output']>;
};

/** daily report total  */
export type DailyReportTotalType = {
  __typename?: 'DailyReportTotalType';
  /** total reconciliation amount */
  total_reconciliation_amount?: Maybe<Scalars['BigInteger']['output']>;
  /** total reconciliation count */
  total_reconciliation_count?: Maybe<Scalars['BigInteger']['output']>;
  /** total session amount */
  total_session_amount?: Maybe<Scalars['BigInteger']['output']>;
  /** total session count */
  total_session_count?: Maybe<Scalars['BigInteger']['output']>;
};

/** daily report  */
export type DailyReportType = {
  __typename?: 'DailyReportType';
  /** reconciliations */
  reconciliations?: Maybe<Array<Maybe<DailyReportDetailsType>>>;
  /** sessions */
  sessions?: Maybe<Array<Maybe<DailyReportDetailsType>>>;
  /** total */
  total?: Maybe<DailyReportTotalType>;
};

/** data status type */
export type DataStatusType = {
  __typename?: 'DataStatusType';
  /** legal status */
  address?: Maybe<AddressStatusTypeEnum>;
  /** bank account status */
  bank_account?: Maybe<BankAccountStatusTypeEnum>;
  /** Email status */
  email?: Maybe<EmailStatusTypeEnum>;
  /** KYC status */
  kyc?: Maybe<KycStatusTypeEnum>;
  /** legal status */
  legal?: Maybe<LegalStatusTypeEnum>;
  /** legal status */
  level?: Maybe<PersonalStatusTypeEnum>;
  /** Personal status */
  personal?: Maybe<PersonalStatusTypeEnum>;
};

/** return number for average of day transactions */
export type DayTransactionAvgType = {
  __typename?: 'DayTransactionAvgType';
  /** average value */
  value?: Maybe<Scalars['BigInteger']['output']>;
};

/** Day Transactions Details */
export type DayTransactionsDetailsType = {
  __typename?: 'DayTransactionsDetailsType';
  /** Count */
  count?: Maybe<Scalars['BigInteger']['output']>;
  /** Date */
  date?: Maybe<Scalars['Date']['output']>;
  /** value */
  value?: Maybe<Scalars['BigInteger']['output']>;
};

/** Day Transactions */
export type DayTransactionsType = {
  __typename?: 'DayTransactionsType';
  /** today */
  today?: Maybe<Array<Maybe<DayTransactionsDetailsType>>>;
  /** yesterday */
  yesterday?: Maybe<Array<Maybe<DayTransactionsDetailsType>>>;
};

/** Email status type enum */
export enum EmailStatusTypeEnum {
  Completed = 'COMPLETED',
  NotCompleted = 'NOT_COMPLETED',
}

/** Enamad history */
export type EnamadHistoryType = {
  __typename?: 'EnamadHistoryType';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** available in inquiry */
  domain?: Maybe<Scalars['String']['output']>;
  /** enamad status (available in inquiry) */
  enamad_status?: Maybe<Scalars['Int']['output']>;
  /** available in inquiry */
  expire_date?: Maybe<Scalars['String']['output']>;
  /** available in inquiry */
  message?: Maybe<Scalars['String']['output']>;
  result?: Maybe<Scalars['String']['output']>;
  result_info?: Maybe<Scalars['String']['output']>;
  /** available in inquiry. check terminal's owner national code with national code in enamad response */
  same_national?: Maybe<Scalars['Boolean']['output']>;
  /** available in inquiry */
  star?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type EnamadPaymentType = {
  __typename?: 'EnamadPaymentType';
  status?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** graphQl error messages type */
export type ErrorMessageType = {
  __typename?: 'ErrorMessageType';
  /** graphql error messages */
  messages?: Maybe<Array<Maybe<Translation>>>;
  /** translation version */
  version?: Maybe<Scalars['String']['output']>;
};

/** event type enum */
export enum EventTypeEnum {
  Location = 'LOCATION',
  Online = 'ONLINE',
}

/** exportable fields enum */
export enum ExportFileTypeEnum {
  Csv = 'CSV',
  Xlsx = 'XLSX',
}

/** exportable fields enum */
export enum ExportGroupEnum {
  Session = 'SESSION',
}

/** Session export status enum */
export enum ExportStatusEnum {
  Done = 'DONE',
  Pending = 'PENDING',
}

/** Exportable field with title, slug, and is_required */
export type ExportableField = {
  __typename?: 'ExportableField';
  /** Indicates if the field is required */
  is_required?: Maybe<Scalars['Boolean']['output']>;
  /** Field is selected */
  is_selected?: Maybe<Scalars['Boolean']['output']>;
  /** Field slug */
  slug?: Maybe<Scalars['String']['output']>;
  /** Field title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Category of exportable fields */
export type ExportableFieldsCategory = {
  __typename?: 'ExportableFieldsCategory';
  /** List of fields in this category */
  fields?: Maybe<Array<Maybe<ExportableField>>>;
  /** Category name */
  key?: Maybe<Scalars['String']['output']>;
};

/** Group of exportable fields with categories */
export type ExportableFieldsGroup = {
  __typename?: 'ExportableFieldsGroup';
  /** List of categories with their fields */
  categories?: Maybe<Array<Maybe<ExportableFieldsCategory>>>;
  /** Group name */
  key?: Maybe<Scalars['String']['output']>;
};

/** Faq type */
export type FaqType = {
  __typename?: 'FaqType';
  /** answer of question */
  answer?: Maybe<Scalars['String']['output']>;
  /** faq`s department */
  faq_department_id?: Maybe<Scalars['ID']['output']>;
  /** faq id */
  id?: Maybe<Scalars['ID']['output']>;
  /** question text */
  question?: Maybe<Scalars['String']['output']>;
  /** slug of question */
  slug?: Maybe<Scalars['String']['output']>;
};

/** A type */
export type FeeGroupType = {
  __typename?: 'FeeGroupType';
  /** cycle */
  cycle?: Maybe<Scalars['String']['output']>;
  /** discount percent */
  discount_percent?: Maybe<Scalars['Float']['output']>;
  /** slug */
  expire_in?: Maybe<Scalars['Int']['output']>;
  fix_fee_amount?: Maybe<Scalars['Float']['output']>;
  /** The id of fee group */
  id?: Maybe<Scalars['ID']['output']>;
  /** slug */
  is_manual?: Maybe<Scalars['Boolean']['output']>;
  /** discount percent */
  max_fee_amount?: Maybe<Scalars['BigInteger']['output']>;
  /** name */
  name?: Maybe<Scalars['String']['output']>;
  /** percent */
  percent?: Maybe<Scalars['Float']['output']>;
  /** slug */
  slug?: Maybe<Scalars['String']['output']>;
  type?: Maybe<FeeGroupTypeEnum>;
  /** zarincard percent */
  zarincard_percent?: Maybe<Scalars['Float']['output']>;
};

/** FeeGroup type enum */
export enum FeeGroupTypeEnum {
  DirectDebit = 'DIRECT_DEBIT',
  InstantPayout = 'INSTANT_PAYOUT',
  Invoice = 'INVOICE',
  Payout = 'PAYOUT',
  Terminal = 'TERMINAL',
}

/** File */
export type FileType = {
  __typename?: 'FileType';
  /** id */
  id: Scalars['String']['output'];
  /** file URL */
  url?: Maybe<Scalars['String']['output']>;
};

/** zarin links fetch filter enum */
export enum FilterEnum {
  Active = 'ACTIVE',
  All = 'ALL',
  Paid = 'PAID',
  ReachedAmount = 'REACHED_AMOUNT',
  Refunded = 'REFUNDED',
  Rejected = 'REJECTED',
  RejectReversed = 'REJECT_REVERSED',
  Reversed = 'REVERSED',
  Trash = 'TRASH',
  Verified = 'VERIFIED',
}

/** foreign national type */
export type ForeignNationalType = {
  __typename?: 'ForeignNationalType';
  /** country code */
  country_code?: Maybe<Scalars['String']['output']>;
  /** foreign pervasive code */
  foreign_pervasive_code?: Maybe<Scalars['String']['output']>;
  /** passport expire date */
  passport_expire_date?: Maybe<Scalars['Date']['output']>;
  /** passport number */
  passport_number?: Maybe<Scalars['String']['output']>;
};

/** gender enum */
export enum GenderEnum {
  Female = 'FEMALE',
  Male = 'MALE',
}

/** IBAN type */
export type Iban = {
  __typename?: 'IBAN';
  /** name of bank issuer */
  bank_name?: Maybe<Scalars['String']['output']>;
  bank_slug?: Maybe<Scalars['String']['output']>;
  bank_status?: Maybe<BankAccountStatusEnum>;
  /** deposit description */
  deposit_description?: Maybe<Scalars['String']['output']>;
  /** name of account holder */
  holder_name?: Maybe<Scalars['String']['output']>;
  /** IBAN */
  iban: Scalars['String']['output'];
  /** issuing bank */
  issuing_bank?: Maybe<IssuingBank>;
  /** Only the card number entered by the user */
  pan?: Maybe<Scalars['String']['output']>;
};

/** income chart data details */
export type IncomeChartDetailsType = {
  __typename?: 'IncomeChartDetailsType';
  /** value of chart date */
  count?: Maybe<Scalars['BigInteger']['output']>;
  /** date of chart */
  date?: Maybe<Scalars['String']['output']>;
  /** value of chart date */
  value?: Maybe<Scalars['BigInteger']['output']>;
};

/** data of income chart  */
export type IncomeChartType = {
  __typename?: 'IncomeChartType';
  /** data of chart */
  data?: Maybe<Array<Maybe<IncomeChartDetailsType>>>;
  /** name of chart data */
  key?: Maybe<Scalars['String']['output']>;
};

/** A type */
export type InputReconcileWageType = {
  __typename?: 'InputReconcileWageType';
  /** amount */
  amount?: Maybe<Scalars['BigInteger']['output']>;
  /** bank account id */
  bank_account_id: Scalars['ID']['output'];
};

/** User notification preferences type */
export type InputUserNotificationPreferencesType = {
  /** notification channel */
  channels: Array<InputMaybe<NotificationPreferenceChannelEnum>>;
  /** notification type */
  type: NotificationPreferenceTypeEnum;
};

export enum InstantPayoutActionTypeEnum {
  Card = 'CARD',
  Paya = 'PAYA',
}

export enum InstantPayoutBalanceStatusEnum {
  HighBalance = 'HIGH_BALANCE',
  LowBalance = 'LOW_BALANCE',
  NoBalance = 'NO_BALANCE',
}

/** data of instant payout chart  */
export type InstantPayoutChartType = {
  __typename?: 'InstantPayoutChartType';
  /** instantPayouts */
  instantPayouts?: Maybe<Array<Maybe<AnalysisDetailsType>>>;
  /** total */
  total?: Maybe<InstantPayoutTotalType>;
};

/** InstantPayoutInquiry type */
export type InstantPayoutInquiry = {
  __typename?: 'InstantPayoutInquiry';
  fee?: Maybe<Scalars['BigInteger']['output']>;
  fee_percent?: Maybe<Scalars['Float']['output']>;
  fixed_fee_amount?: Maybe<Scalars['BigInteger']['output']>;
  max_amount?: Maybe<Scalars['BigInteger']['output']>;
  max_fee_amount?: Maybe<Scalars['BigInteger']['output']>;
  min_satna?: Maybe<Scalars['BigInteger']['output']>;
  raw_max_amount?: Maybe<Scalars['BigInteger']['output']>;
  type?: Maybe<InstantPayoutTypeEnum>;
};

/** Instant Payout Inquiry Banks Details Type  */
export type InstantPayoutInquiryBanksDetailsType = {
  __typename?: 'InstantPayoutInquiryBanksDetailsType';
  bank_name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<InstantPayoutBalanceStatusEnum>;
};

/** Instant Payout Inquiry Banks Type  */
export type InstantPayoutInquiryBanksType = {
  __typename?: 'InstantPayoutInquiryBanksType';
  banks?: Maybe<Array<Maybe<InstantPayoutInquiryBanksDetailsType>>>;
};

export enum InstantPayoutMethodEnum {
  Ach = 'ACH',
  C2C = 'C2C',
  Internal = 'INTERNAL',
  Ips = 'IPS',
  Rtgs = 'RTGS',
}

/** Instant Payout type */
export type InstantPayoutReceipt = {
  __typename?: 'InstantPayoutReceipt';
  /** amount */
  amount?: Maybe<Scalars['BigInteger']['output']>;
  /** related bank account */
  bank_account?: Maybe<BankAccount>;
  /** account created date-time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** description */
  description?: Maybe<Scalars['String']['output']>;
  /** fee */
  fee?: Maybe<Scalars['BigInteger']['output']>;
  /** The id of the card */
  id: Scalars['ID']['output'];
  /** priority order */
  owner_name?: Maybe<Scalars['String']['output']>;
  /** time reconciled date-time */
  reconciled_at?: Maybe<Scalars['DateTime']['output']>;
  /** paya */
  shaparak_tracking_number?: Maybe<Scalars['String']['output']>;
  /** status */
  status?: Maybe<InstantPayoutStatusEnum>;
  /** account updated date-time */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

/** Instant Payout status enum */
export enum InstantPayoutStatusEnum {
  BankRejected = 'BANK_REJECTED',
  InProgress = 'IN_PROGRESS',
  Paid = 'PAID',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Reversed = 'REVERSED',
}

/** instant payout total  */
export type InstantPayoutTotalType = {
  __typename?: 'InstantPayoutTotalType';
  /** total instant payout amount */
  total_instant_payout_amount?: Maybe<Scalars['BigInteger']['output']>;
  /** total instant payout count */
  total_instant_payout_count?: Maybe<Scalars['BigInteger']['output']>;
};

/** InstantPayout type */
export type InstantPayoutType = {
  __typename?: 'InstantPayoutType';
  /** amount */
  amount?: Maybe<Scalars['BigInteger']['output']>;
  /** related bank account */
  bank_account?: Maybe<BankAccount>;
  /** account created date-time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** description */
  description?: Maybe<Scalars['String']['output']>;
  /** fee */
  fee?: Maybe<Scalars['BigInteger']['output']>;
  /** The id of the card */
  id: Scalars['ID']['output'];
  /** method */
  method?: Maybe<InstantPayoutMethodEnum>;
  /** when this reconciliation reconciled. */
  reconciled_at?: Maybe<Scalars['DateTime']['output']>;
  /** reference_id. */
  reference_id?: Maybe<Scalars['String']['output']>;
  /** paya */
  shaparak_tracking_number?: Maybe<Scalars['String']['output']>;
  /** status */
  status?: Maybe<ReconciliationStatusEnum>;
  /** related terminal */
  terminal?: Maybe<TerminalType>;
  /** account updated date-time */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  /** url code */
  url_code?: Maybe<Scalars['String']['output']>;
};

export enum InstantPayoutTypeEnum {
  Internal = 'INTERNAL',
  Paya = 'PAYA',
  Satna = 'SATNA',
}

/** Interval Type Enum */
export enum IntervalTypeEnum {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY',
}

/** Investment type */
export type Investment = {
  __typename?: 'Investment';
  /** related bank account */
  bank_account?: Maybe<BankAccount>;
  /** investment fund */
  investment_fund?: Maybe<InvestmentFund>;
  /** max limit */
  max_limit?: Maybe<Scalars['Int']['output']>;
  /** percent */
  percent?: Maybe<Scalars['Int']['output']>;
  /** terminal id */
  terminal_id?: Maybe<Scalars['Int']['output']>;
};

/** Investment Fund type */
export type InvestmentFund = {
  __typename?: 'InvestmentFund';
  /** account created date-time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** description */
  description?: Maybe<Scalars['String']['output']>;
  /** id */
  id?: Maybe<Scalars['ID']['output']>;
  /** name */
  name?: Maybe<Scalars['String']['output']>;
};

/** Invoice type */
export type Invoice = {
  __typename?: 'Invoice';
  /** amount */
  amount?: Maybe<Scalars['BigInteger']['output']>;
  /** account created date-time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** account deleted date-time */
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  /** description */
  description?: Maybe<Scalars['String']['output']>;
  /** fee */
  fee?: Maybe<Scalars['BigInteger']['output']>;
  /** fee type */
  fee_type?: Maybe<SessionFeeTypeEnum>;
  /** terminal id */
  id: Scalars['ID']['output'];
  /** note */
  note?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Array<Maybe<NoteType>>>;
  /** notify_type */
  notify_type?: Maybe<NotifyTypeEnum>;
  /** payer_email */
  payer_email?: Maybe<Scalars['String']['output']>;
  /** payer_mobile */
  payer_mobile?: Maybe<Scalars['String']['output']>;
  /** payer_name */
  payer_name?: Maybe<Scalars['String']['output']>;
  sessions?: Maybe<Array<Maybe<SessionType>>>;
  /** status */
  status?: Maybe<InvoiceStatusEnum>;
  /** terminal id */
  terminal_id: Scalars['ID']['output'];
  /** account updated date-time */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export enum InvoiceStatusEnum {
  InProgress = 'IN_PROGRESS',
  Paid = 'PAID',
  Pending = 'PENDING',
}

/** issuing bank type */
export type IssuingBank = {
  __typename?: 'IssuingBank';
  /** issuing bank name */
  name: Scalars['String']['output'];
  /** issuing bank slug */
  slug: Scalars['String']['output'];
  /** issuing bank swift code */
  slug_image?: Maybe<Scalars['String']['output']>;
};

/** Kyc status type enum */
export enum KycStatusTypeEnum {
  Completed = 'COMPLETED',
  NotCompleted = 'NOT_COMPLETED',
  Processing = 'PROCESSING',
  Rejected = 'REJECTED',
}

/** Legal status type enum */
export enum LegalStatusTypeEnum {
  Completed = 'COMPLETED',
  NotCompleted = 'NOT_COMPLETED',
  Processing = 'PROCESSING',
}

/** Level status type enum */
export enum LevelStatusTypeEnum {
  Completed = 'COMPLETED',
  NotCompleted = 'NOT_COMPLETED',
  Processing = 'PROCESSING',
  Rejected = 'REJECTED',
}

/** 3cx live chat type */
export type LiveChatType = {
  __typename?: 'LiveChatType';
  /** chat_url */
  chat_url?: Maybe<Scalars['String']['output']>;
};

/** All Model names enum */
export enum ModelEnum {
  Bankaccount = 'BANKACCOUNT',
  Terminal = 'TERMINAL',
}

export type Mutation = {
  __typename?: 'Mutation';
  /** remove access token mutation */
  AccessTokenRemove?: Maybe<Scalars['Boolean']['output']>;
  /** update user telegram id */
  ActiveTelegram?: Maybe<Scalars['Boolean']['output']>;
  /** Add new product form */
  AddProductForm?: Maybe<ProductFormType>;
  /** Add session refund */
  AddRefund?: Maybe<SessionType>;
  /** Add new address mutation */
  AddressAdd?: Maybe<AddressType>;
  /** Edit address mutation */
  AddressEdit?: Maybe<AddressType>;
  /** Remove user`s address */
  AddressRemove?: Maybe<Scalars['Boolean']['output']>;
  /** BankAccount Add mutation */
  BankAccountAdd?: Maybe<BankAccount>;
  /** Add BankAccount by Card mutation */
  BankAccountByCardAdd?: Maybe<BankAccount>;
  /** BankAccount edit mutation */
  BankAccountEdit?: Maybe<BankAccount>;
  /** BankAccount pin mutation */
  BankAccountPin?: Maybe<BankAccount>;
  /** Remove a users BankAccount */
  BankAccountRemove?: Maybe<Scalars['Boolean']['output']>;
  /** Add card mutation */
  CardAdd?: Maybe<Card>;
  CheckTax?: Maybe<UserTaxRegisterType>;
  /** Coupon Add mutation */
  CouponAdd?: Maybe<CouponType>;
  /** Add or Remove products to/from the coupon */
  CouponAssignProduct?: Maybe<CouponType>;
  /** Coupon edit mutation */
  CouponEdit?: Maybe<CouponType>;
  /** Remove a users BankAccount */
  CouponRemove?: Maybe<Scalars['Boolean']['output']>;
  /** Restore removed coupon mutation */
  CouponRestore?: Maybe<CouponType>;
  /** update user telegram id */
  DeactivateTelegram?: Maybe<Scalars['Boolean']['output']>;
  /** Delete a product form */
  DeleteProductForm?: Maybe<Scalars['Boolean']['output']>;
  /** delete user */
  DeleteUser?: Maybe<Scalars['Boolean']['output']>;
  /** request ENAMAD inquiry */
  EnamadInquiry?: Maybe<EnamadHistoryType>;
  EnamadRegisterPayment?: Maybe<EnamadPaymentType>;
  /** ForeignNational Add mutation */
  ForeignNationalAdd?: Maybe<ForeignNationalType>;
  /** Add a Guest ticket mutation */
  GuestTicketAdd?: Maybe<OutTicketType>;
  /** Terminal`s Iban`s Reconciliation excel export mutation */
  IbanReconciliationExcelExport?: Maybe<Scalars['Boolean']['output']>;
  /** add instant payout */
  InstantPayoutAdd?: Maybe<InstantPayoutType>;
  /** Terminal`s InstantPayout excel export mutation */
  InstantPayoutExcelExport?: Maybe<Scalars['Boolean']['output']>;
  /** Investment */
  Investment?: Maybe<Investment>;
  /** Invoice Add mutation */
  InvoiceAdd?: Maybe<Invoice>;
  /** Invoice edit mutation */
  InvoiceEdit?: Maybe<Invoice>;
  /** Add more new Payout mutation */
  MorePayoutAdd?: Maybe<Array<Maybe<PayoutType>>>;
  /** Add new zarinLink mutation */
  NewZarinLinkAdd?: Maybe<NewZarinLinkType>;
  /** Edit zarinlink mutation */
  NewZarinLinkEdit?: Maybe<NewZarinLinkType>;
  NoteAdd?: Maybe<NoteType>;
  NoteDelete?: Maybe<Scalars['Boolean']['output']>;
  NoteEdit?: Maybe<NoteType>;
  /** Add new Payout mutation */
  PayoutAdd?: Maybe<PayoutType>;
  /** Edit Payout mutation */
  PayoutEdit?: Maybe<PayoutType>;
  /** Terminal`s Payout excel export mutation */
  PayoutExcelExport?: Maybe<Scalars['Boolean']['output']>;
  PayoutRetryAdd?: Maybe<PayoutType>;
  /** personal access token mutation */
  PersonalAccessToken?: Maybe<AccessTokenType>;
  /** edit personal link */
  PersonalLinkEdit?: Maybe<TerminalType>;
  /** request personal link for user */
  PersonalLinkRequest?: Maybe<TerminalType>;
  /** pin terminal mutation */
  PinTerminal?: Maybe<TerminalType>;
  /** edit user's preferences mutation */
  PreferencesEdit?: Maybe<UserType>;
  /** Terminal`s Reconciliation excel export mutation */
  ReconciliationExcelExport?: Maybe<Scalars['Boolean']['output']>;
  /** modify note in reconciliation */
  ReconciliationModifyNote?: Maybe<ReconciliationType>;
  /** Remove Investment */
  RemoveInvestment?: Maybe<Array<Maybe<Investment>>>;
  /** Add a Report Terminal mutation */
  ReportTerminalAdd?: Maybe<Scalars['Boolean']['output']>;
  ReturnToOldVersion?: Maybe<Scalars['Boolean']['output']>;
  /** Send Otp Contract Confirm mutation */
  SendOtpContractConfirm?: Maybe<SendOtpContractConfirmType>;
  /** send verify email */
  SendVerifyEmail?: Maybe<Scalars['Boolean']['output']>;
  /** card holder in sessions */
  SessionCardHolder?: Maybe<Scalars['Boolean']['output']>;
  /** card Pan in sessions */
  SessionCardPan?: Maybe<Scalars['Boolean']['output']>;
  /** Export sessions with dynamic fields */
  SessionDynamicExcelExport?: Maybe<Scalars['Boolean']['output']>;
  /** Terminal`s session excel export mutation */
  SessionExcelExport?: Maybe<Scalars['Boolean']['output']>;
  /** modify note in sessions */
  SessionModifyNote?: Maybe<SessionType>;
  /** Add terminal mutation */
  TerminalAdd?: Maybe<TerminalType>;
  /** Add new person to access the terminal mutation */
  TerminalAssignAccess?: Maybe<TerminalUserType>;
  /** delete access the terminal mutation */
  TerminalDeleteAccess?: Maybe<Scalars['Boolean']['output']>;
  /** terminal edit mutation */
  TerminalEdit?: Maybe<TerminalType>;
  /** edit access the terminal mutation */
  TerminalEditAccess?: Maybe<TerminalUserType>;
  /** Remove a users terminal */
  TerminalRemove?: Maybe<Scalars['Boolean']['output']>;
  /** terminal setting  mutation */
  TerminalSettingBranding?: Maybe<TerminalBrandingSettingType>;
  /** terminal setting  mutation */
  TerminalSettingDefaultForm?: Maybe<TerminalDefaultFormType>;
  /** terminal setting  mutation */
  TerminalSettingZarinLinkAfterPayment?: Maybe<TerminalSettingZarinLinkAfterPaymentType>;
  /** Add a ticket mutation */
  TicketAdd?: Maybe<TicketType>;
  /** Add ticket reply mutation */
  TicketAddReply?: Maybe<TicketReplyType>;
  /** close ticket */
  TicketClose?: Maybe<Scalars['Boolean']['output']>;
  /**  Feedback  */
  TicketFeedback?: Maybe<Scalars['Boolean']['output']>;
  /** Reply Feedback  */
  TicketReplyFeedback?: Maybe<Scalars['Boolean']['output']>;
  /** update user documents */
  UpdateDocuments?: Maybe<UserType>;
  /** verify email */
  VerifyEmail?: Maybe<Scalars['Boolean']['output']>;
  /** Verify Otp Contract Confirm mutation */
  VerifyOtpContractConfirm?: Maybe<VerifyOtpContractConfirmType>;
  /** add zarin card mutation */
  ZarinCardAdd?: Maybe<ZarinCardAddType>;
  /** verify payment mutation */
  ZarinCardVerifyPayment?: Maybe<ZarinCardVerifyPayment>;
  /** Add new zarinLink mutation */
  ZarinLinkAdd?: Maybe<ZarinLinkType>;
  /** Add images to product */
  ZarinLinkAddImage?: Maybe<ZarinLinkType>;
  /** Delete a product image */
  ZarinLinkDeleteImage?: Maybe<Scalars['Boolean']['output']>;
  /** Edit zarinlink mutation */
  ZarinLinkEdit?: Maybe<ZarinLinkType>;
  /** remove zarinlink mutation */
  ZarinLinkRemove?: Maybe<Scalars['Boolean']['output']>;
  /** Restore zarin link mutation */
  ZarinLinkRestore?: Maybe<ZarinLinkType>;
  referrerInvoiceSetIban?: Maybe<BankAccount>;
};

export type MutationAccessTokenRemoveArgs = {
  token_id: Scalars['ID']['input'];
};

export type MutationActiveTelegramArgs = {
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type MutationAddProductFormArgs = {
  fields: Array<InputMaybe<ZarinLinkRequiredFieldsInput>>;
  is_default: Scalars['Boolean']['input'];
  terminal_id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type MutationAddRefundArgs = {
  amount: Scalars['BigInteger']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  method?: InputMaybe<InstantPayoutActionTypeEnum>;
  reason?: InputMaybe<RefundReasonEnum>;
  session_id: Scalars['ID']['input'];
};

export type MutationAddressAddArgs = {
  address: Scalars['String']['input'];
  landline: Scalars['String']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  postal_code: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AddressTypeEnum>;
};

export type MutationAddressEditArgs = {
  address: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  landline: Scalars['String']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  postal_code: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AddressTypeEnum>;
};

export type MutationAddressRemoveArgs = {
  id: Scalars['ID']['input'];
};

export type MutationBankAccountAddArgs = {
  iban: Scalars['String']['input'];
  is_legal: Scalars['Boolean']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<BankAccountTypeEnum>;
};

export type MutationBankAccountByCardAddArgs = {
  is_legal: Scalars['Boolean']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  pan: Scalars['MaskedPan']['input'];
  type?: InputMaybe<BankAccountTypeEnum>;
};

export type MutationBankAccountEditArgs = {
  iban?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  is_legal?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type MutationBankAccountPinArgs = {
  id: Scalars['ID']['input'];
  pin: Scalars['Boolean']['input'];
};

export type MutationBankAccountRemoveArgs = {
  id: Scalars['ID']['input'];
};

export type MutationCardAddArgs = {
  pan: Scalars['String']['input'];
};

export type MutationCheckTaxArgs = {
  address_id?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<TaxTypeEnum>;
};

export type MutationCouponAddArgs = {
  code: Scalars['String']['input'];
  discount_percent: Scalars['Int']['input'];
  expired_at?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  max_discount_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount: Scalars['Int']['input'];
  terminal_id: Scalars['ID']['input'];
  zarin_link_id?: InputMaybe<Scalars['ID']['input']>;
};

export type MutationCouponAssignProductArgs = {
  id: Scalars['ID']['input'];
  product_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type MutationCouponEditArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  discount_percent?: InputMaybe<Scalars['Int']['input']>;
  expired_at?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  max_discount_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  zarin_link_id?: InputMaybe<Scalars['ID']['input']>;
};

export type MutationCouponRemoveArgs = {
  id: Scalars['ID']['input'];
};

export type MutationCouponRestoreArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteProductFormArgs = {
  id: Scalars['ID']['input'];
};

export type MutationEnamadInquiryArgs = {
  terminal_id: Scalars['ID']['input'];
};

export type MutationEnamadRegisterPaymentArgs = {
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
};

export type MutationForeignNationalAddArgs = {
  country_code: Scalars['String']['input'];
  foreign_pervasive_code: Scalars['String']['input'];
  passport_expire_date?: InputMaybe<Scalars['Date']['input']>;
  passport_number: Scalars['String']['input'];
};

export type MutationGuestTicketAddArgs = {
  attachment?: InputMaybe<Scalars['String']['input']>;
  cell_number: Scalars['CellNumber']['input'];
  content: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  priority?: InputMaybe<TicketPriorityEnum>;
  ticket_department_id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type MutationIbanReconciliationExcelExportArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  reconcile_id: Scalars['ID']['input'];
  terminal_id: Scalars['ID']['input'];
};

export type MutationInstantPayoutAddArgs = {
  amount: Scalars['BigInteger']['input'];
  bank_account_id: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  terminal_id: Scalars['ID']['input'];
};

export type MutationInstantPayoutExcelExportArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  filter?: InputMaybe<FilterEnum>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<InstantPayoutStatusEnum>;
  terminal_id: Scalars['ID']['input'];
};

export type MutationInvestmentArgs = {
  investment_fund_id: Scalars['ID']['input'];
  max_limit: Scalars['Int']['input'];
  percent: Scalars['Int']['input'];
  terminal_id: Scalars['ID']['input'];
};

export type MutationInvoiceAddArgs = {
  amount: Scalars['BigInteger']['input'];
  callback_url?: InputMaybe<Scalars['String']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  description: Scalars['String']['input'];
  fee_type?: InputMaybe<TerminalFeeTypeEnum>;
  merchant_id?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  notify_type?: InputMaybe<NotifyTypeEnum>;
  payer_email?: InputMaybe<Scalars['String']['input']>;
  payer_mobile: Scalars['String']['input'];
  payer_name: Scalars['String']['input'];
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
};

export type MutationInvoiceEditArgs = {
  description: Scalars['String']['input'];
  id: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  notify_type?: InputMaybe<NotifyTypeEnum>;
  payer_email?: InputMaybe<Scalars['String']['input']>;
  payer_mobile: Scalars['String']['input'];
  payer_name: Scalars['String']['input'];
};

export type MutationMorePayoutAddArgs = {
  amount: Scalars['BigInteger']['input'];
  bank_account_id: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  reconciliation_parts?: InputMaybe<ReconciliationPartsEnum>;
  terminal_id: Scalars['ID']['input'];
};

export type MutationNewZarinLinkAddArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  amount_type?: InputMaybe<ZarinLinkAmountTypeEnum>;
  category_id?: InputMaybe<Scalars['Int']['input']>;
  custom_options?: InputMaybe<ZarinLinkCustomOptionInput>;
  description: Scalars['String']['input'];
  failed_redirect_url?: InputMaybe<Scalars['String']['input']>;
  form_id?: InputMaybe<Scalars['ID']['input']>;
  is_coupon_active: Scalars['Boolean']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  meta_data?: InputMaybe<ZarinLinkMetaDataInput>;
  required_fields?: InputMaybe<Array<InputMaybe<ZarinLinkRequiredFieldsInput>>>;
  show_receipt: Scalars['Boolean']['input'];
  specifications?: InputMaybe<Array<InputMaybe<ZarinLinkSpecificationInput>>>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
  successful_redirect_url?: InputMaybe<Scalars['String']['input']>;
  terminal_id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  type?: InputMaybe<ZarinLinkTypeEnum>;
};

export type MutationNewZarinLinkEditArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  amount_type?: InputMaybe<ZarinLinkAmountTypeEnum>;
  category_id?: InputMaybe<Scalars['Int']['input']>;
  custom_options?: InputMaybe<ZarinLinkCustomOptionInput>;
  description: Scalars['String']['input'];
  failed_redirect_url?: InputMaybe<Scalars['String']['input']>;
  form_id?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  is_coupon_active: Scalars['Boolean']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  meta_data?: InputMaybe<ZarinLinkMetaDataInput>;
  required_fields?: InputMaybe<Array<InputMaybe<ZarinLinkRequiredFieldsInput>>>;
  show_receipt: Scalars['Boolean']['input'];
  specifications?: InputMaybe<Array<InputMaybe<ZarinLinkSpecificationInput>>>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
  successful_redirect_url?: InputMaybe<Scalars['String']['input']>;
  terminal_id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  type?: InputMaybe<ZarinLinkTypeEnum>;
};

export type MutationNoteAddArgs = {
  content: Scalars['String']['input'];
  model_id: Scalars['ID']['input'];
  model_type?: InputMaybe<NoteModelTypeEnum>;
};

export type MutationNoteDeleteArgs = {
  id: Scalars['ID']['input'];
};

export type MutationNoteEditArgs = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type MutationPayoutAddArgs = {
  amount: Scalars['BigInteger']['input'];
  bank_account_id: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  reconciliation_parts?: InputMaybe<ReconciliationPartsEnum>;
  terminal_id: Scalars['ID']['input'];
};

export type MutationPayoutEditArgs = {
  id: Scalars['ID']['input'];
  priority?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<PayoutStatusEnum>;
};

export type MutationPayoutExcelExportArgs = {
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PayoutStatusEnum>;
  terminal_id: Scalars['ID']['input'];
};

export type MutationPayoutRetryAddArgs = {
  bank_account_id: Scalars['ID']['input'];
  payout_id: Scalars['ID']['input'];
  terminal_id: Scalars['ID']['input'];
};

export type MutationPersonalAccessTokenArgs = {
  token_name: Scalars['String']['input'];
};

export type MutationPersonalLinkEditArgs = {
  required_fields?: InputMaybe<Array<InputMaybe<PersonalLinkRequiredFieldsInputType>>>;
};

export type MutationPersonalLinkRequestArgs = {
  bank_account_id?: InputMaybe<Scalars['ID']['input']>;
  username: Scalars['String']['input'];
};

export type MutationPinTerminalArgs = {
  id: Scalars['ID']['input'];
  pin: Scalars['Boolean']['input'];
};

export type MutationPreferencesEditArgs = {
  birthday?: InputMaybe<Scalars['Date']['input']>;
  company_name?: InputMaybe<Scalars['String']['input']>;
  company_registered_at?: InputMaybe<Scalars['Date']['input']>;
  company_rid?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  foreign_pervasive_code?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderEnum>;
  is_foreign?: InputMaybe<Scalars['Boolean']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  mail_subscription?: InputMaybe<Scalars['Boolean']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  notification_preferences?: InputMaybe<Array<InputMaybe<InputUserNotificationPreferencesType>>>;
  passport_expire_date?: InputMaybe<Scalars['Date']['input']>;
  passport_number?: InputMaybe<Scalars['String']['input']>;
  ssn?: InputMaybe<Scalars['String']['input']>;
  tax_id?: InputMaybe<Scalars['String']['input']>;
};

export type MutationReconciliationExcelExportArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  filter?: InputMaybe<FilterEnum>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  terminal_id: Scalars['ID']['input'];
};

export type MutationReconciliationModifyNoteArgs = {
  note?: InputMaybe<Scalars['String']['input']>;
  reconciliation_id: Scalars['ID']['input'];
};

export type MutationRemoveInvestmentArgs = {
  investment_fund_id: Scalars['ID']['input'];
  terminal_id: Scalars['ID']['input'];
};

export type MutationReportTerminalAddArgs = {
  category_id: Scalars['ID']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  product_id?: InputMaybe<Scalars['ID']['input']>;
  user_id?: InputMaybe<Scalars['ID']['input']>;
};

export type MutationReturnToOldVersionArgs = {
  description: Scalars['String']['input'];
};

export type MutationSessionCardHolderArgs = {
  session_id: Scalars['ID']['input'];
};

export type MutationSessionCardPanArgs = {
  session_id: Scalars['ID']['input'];
};

export type MutationSessionDynamicExcelExportArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  card_pan?: InputMaybe<Scalars['String']['input']>;
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  export_file_type?: InputMaybe<ExportFileTypeEnum>;
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  filter?: InputMaybe<FilterEnum>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  mobile?: InputMaybe<Scalars['CellNumber']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  reconciliation_id?: InputMaybe<Scalars['ID']['input']>;
  reference_id?: InputMaybe<Scalars['String']['input']>;
  relation_id?: InputMaybe<Scalars['ID']['input']>;
  session_id?: InputMaybe<Scalars['ID']['input']>;
  terminal_id: Scalars['ID']['input'];
  type?: InputMaybe<SessionTypeEnum>;
};

export type MutationSessionExcelExportArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  card_pan?: InputMaybe<Scalars['String']['input']>;
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  export_file_type?: InputMaybe<ExportFileTypeEnum>;
  filter?: InputMaybe<FilterEnum>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  mobile?: InputMaybe<Scalars['CellNumber']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  reconciliation_id?: InputMaybe<Scalars['ID']['input']>;
  reference_id?: InputMaybe<Scalars['String']['input']>;
  relation_id?: InputMaybe<Scalars['ID']['input']>;
  session_id?: InputMaybe<Scalars['ID']['input']>;
  terminal_id: Scalars['ID']['input'];
  type?: InputMaybe<SessionTypeEnum>;
};

export type MutationSessionModifyNoteArgs = {
  note?: InputMaybe<Scalars['String']['input']>;
  session_id: Scalars['ID']['input'];
};

export type MutationTerminalAddArgs = {
  address_id?: InputMaybe<Scalars['ID']['input']>;
  bank_account_id?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  domain: Scalars['String']['input'];
  is_default?: InputMaybe<Scalars['Boolean']['input']>;
  logo?: InputMaybe<Scalars['ValidFile']['input']>;
  mcc_id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  reconcile_priority?: InputMaybe<ReconcileCycleTypeEnum>;
  reconcile_wage_type?: InputMaybe<ReconcileWageTypeEnum>;
  support_phone: Scalars['CellNumber']['input'];
};

export type MutationTerminalAssignAccessArgs = {
  access_list: Array<InputMaybe<TerminalPermissionEnum>>;
  terminal_id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
};

export type MutationTerminalDeleteAccessArgs = {
  id: Scalars['ID']['input'];
  terminal_id: Scalars['ID']['input'];
};

export type MutationTerminalEditArgs = {
  address_id?: InputMaybe<Scalars['ID']['input']>;
  bank_account_id?: InputMaybe<Scalars['ID']['input']>;
  chn_type?: InputMaybe<TerminalChnTypeEnum>;
  customer_strategy?: InputMaybe<TerminalCustomerStrategyEnum>;
  description?: InputMaybe<Scalars['String']['input']>;
  fee_type?: InputMaybe<TerminalFeeTypeEnum>;
  id: Scalars['ID']['input'];
  is_default?: InputMaybe<Scalars['Boolean']['input']>;
  logo?: InputMaybe<Scalars['ValidFile']['input']>;
  mcc_id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  psp_priority?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  reconcile_priority?: InputMaybe<ReconcileCycleTypeEnum>;
  reconcile_wage_type?: InputMaybe<ReconcileWageTypeEnum>;
  server_ip?: InputMaybe<Scalars['IP']['input']>;
  support_phone?: InputMaybe<Scalars['CellNumber']['input']>;
  webhook_url?: InputMaybe<Scalars['String']['input']>;
};

export type MutationTerminalEditAccessArgs = {
  access_list: Array<InputMaybe<TerminalPermissionEnum>>;
  id: Scalars['ID']['input'];
  terminal_id: Scalars['ID']['input'];
};

export type MutationTerminalRemoveArgs = {
  id: Scalars['ID']['input'];
};

export type MutationTerminalSettingBrandingArgs = {
  bio?: InputMaybe<Scalars['String']['input']>;
  contacts?: InputMaybe<TerminalContactsInput>;
  template?: InputMaybe<TerminalTemplateSettingInput>;
  terminal_id: Scalars['Int']['input'];
};

export type MutationTerminalSettingDefaultFormArgs = {
  required_fields?: InputMaybe<Array<InputMaybe<ZarinLinkRequiredFieldsInput>>>;
  terminal_id: Scalars['Int']['input'];
};

export type MutationTerminalSettingZarinLinkAfterPaymentArgs = {
  default_option?: InputMaybe<TerminalSettingZarinLinkDefaultOptionAfterPaymentEnum>;
  receipt?: InputMaybe<ZarinLinkCustomOptionInput>;
  redirect?: InputMaybe<TerminalSettingRedirectInput>;
  terminal_id: Scalars['Int']['input'];
};

export type MutationTicketAddArgs = {
  attachment?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  model_id?: InputMaybe<Scalars['ID']['input']>;
  model_type?: InputMaybe<ModelEnum>;
  priority?: InputMaybe<TicketPriorityEnum>;
  ticket_department_id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type MutationTicketAddReplyArgs = {
  attachment?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  ticket_id: Scalars['ID']['input'];
};

export type MutationTicketCloseArgs = {
  id: Scalars['ID']['input'];
};

export type MutationTicketFeedbackArgs = {
  feedback_type?: InputMaybe<TicketFeedbackTypeEnum>;
  id: Scalars['ID']['input'];
  rate?: InputMaybe<Scalars['Int']['input']>;
};

export type MutationTicketReplyFeedbackArgs = {
  feedback_type?: InputMaybe<TicketReplyFeedbackTypeEnum>;
  id: Scalars['ID']['input'];
};

export type MutationUpdateDocumentsArgs = {
  has_legal_documents?: InputMaybe<Scalars['Boolean']['input']>;
  legal_documents?: InputMaybe<Scalars['ValidFile']['input']>;
  national_card_documents?: InputMaybe<Scalars['ValidFile']['input']>;
  selfie_documents?: InputMaybe<Scalars['ValidFile']['input']>;
};

export type MutationVerifyEmailArgs = {
  otp_code: Scalars['String']['input'];
};

export type MutationVerifyOtpContractConfirmArgs = {
  domain: Scalars['String']['input'];
  otp_code: Scalars['String']['input'];
};

export type MutationZarinCardAddArgs = {
  branch_id: Scalars['ID']['input'];
};

export type MutationZarinCardVerifyPaymentArgs = {
  authority: Scalars['String']['input'];
  branch_id: Scalars['ID']['input'];
  status: Scalars['String']['input'];
};

export type MutationZarinLinkAddArgs = {
  amount: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  failed_redirect_url?: InputMaybe<Scalars['String']['input']>;
  form_id?: InputMaybe<Scalars['ID']['input']>;
  is_coupon_active: Scalars['Boolean']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  required_fields?: InputMaybe<Array<InputMaybe<ZarinLinkRequiredFieldsInput>>>;
  show_receipt: Scalars['Boolean']['input'];
  status?: InputMaybe<Scalars['Boolean']['input']>;
  successful_redirect_url?: InputMaybe<Scalars['String']['input']>;
  terminal_id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type MutationZarinLinkAddImageArgs = {
  images: Array<Scalars['String']['input']>;
  product_id: Scalars['ID']['input'];
};

export type MutationZarinLinkDeleteImageArgs = {
  image_id: Scalars['String']['input'];
  product_id: Scalars['ID']['input'];
};

export type MutationZarinLinkEditArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  failed_redirect_url?: InputMaybe<Scalars['String']['input']>;
  form_id?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  is_coupon_active?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  required_fields?: InputMaybe<Array<InputMaybe<ZarinLinkRequiredFieldsInput>>>;
  show_receipt?: InputMaybe<Scalars['Boolean']['input']>;
  successful_redirect_url?: InputMaybe<Scalars['String']['input']>;
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MutationZarinLinkRemoveArgs = {
  id: Scalars['ID']['input'];
};

export type MutationZarinLinkRestoreArgs = {
  id: Scalars['ID']['input'];
};

export type MutationReferrerInvoiceSetIbanArgs = {
  bank_account_id?: InputMaybe<Scalars['ID']['input']>;
};

/** ZarinLink type */
export type NewZarinLinkType = {
  __typename?: 'NewZarinLinkType';
  /** amount(in toman format) */
  amount?: Maybe<Scalars['BigInteger']['output']>;
  /** amount type */
  amount_type?: Maybe<ZarinLinkAmountTypeEnum>;
  /** category */
  category?: Maybe<Array<Maybe<ZarinLinkCategory>>>;
  /** coupons */
  coupons?: Maybe<Array<Maybe<CouponType>>>;
  /** created date-time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** customize options */
  custom_options?: Maybe<ZarinLinkCustomOptionType>;
  /** deleted date-time */
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  /** description */
  description?: Maybe<Scalars['String']['output']>;
  /** failed redirect url */
  failed_redirect_url?: Maybe<Scalars['String']['output']>;
  /** form_id */
  form_id?: Maybe<Scalars['ID']['output']>;
  /** id */
  id: Scalars['ID']['output'];
  /** product images */
  images?: Maybe<Array<Maybe<FileType>>>;
  /** determine zarinLink has coupon or no */
  is_coupon_active?: Maybe<Scalars['Boolean']['output']>;
  /** is goal reached */
  is_goal_reached?: Maybe<Scalars['Boolean']['output']>;
  /** limit */
  limit?: Maybe<Scalars['BigInteger']['output']>;
  /** link */
  link?: Maybe<Scalars['String']['output']>;
  /** meta_data */
  meta_data?: Maybe<ZarinLinkMetaDataType>;
  notes?: Maybe<Array<Maybe<NoteType>>>;
  /** required fields */
  required_fields?: Maybe<Array<Maybe<ZarinLinkRequiredFieldsOutput>>>;
  /** show receipt option */
  show_receipt?: Maybe<Scalars['Boolean']['output']>;
  /** specifications */
  specifications?: Maybe<Array<Maybe<ZarinLinkSpecificationType>>>;
  /** successful redirect url */
  successful_redirect_url?: Maybe<Scalars['String']['output']>;
  /** terminal id */
  terminal_id?: Maybe<Scalars['ID']['output']>;
  /** title */
  title?: Maybe<Scalars['String']['output']>;
  /** type */
  type?: Maybe<ZarinLinkTypeEnum>;
  /** updated date-time */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export enum NoteModelTypeEnum {
  Coupon = 'COUPON',
  Invoice = 'INVOICE',
  Payout = 'PAYOUT',
  Product = 'PRODUCT',
  Reconcile = 'RECONCILE',
  Session = 'SESSION',
  Terminal = 'TERMINAL',
  TerminalCustomer = 'TERMINAL_CUSTOMER',
  User = 'USER',
}

export type NoteType = {
  __typename?: 'NoteType';
  content?: Maybe<Scalars['String']['output']>;
  /** Ticket_reply created date-time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** id */
  id: Scalars['String']['output'];
  /** Ticket_reply updated date-time */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<UserPublicType>;
};

/** notification preference channel enum */
export enum NotificationPreferenceChannelEnum {
  Mail = 'MAIL',
  Push = 'PUSH',
  Sms = 'SMS',
  Telegram = 'TELEGRAM',
  Webhook = 'WEBHOOK',
}

/** notification preference type enum */
export enum NotificationPreferenceTypeEnum {
  NewSession = 'NEW_SESSION',
  Reconcile = 'RECONCILE',
  SessionSuccess = 'SESSION_SUCCESS',
  TicketNew = 'TICKET_NEW',
  TicketReply = 'TICKET_REPLY',
}

export enum NotifyTypeEnum {
  Email = 'EMAIL',
  Mobile = 'MOBILE',
  MobileEmail = 'MOBILE_EMAIL',
  None = 'NONE',
}

/** orders in system */
export enum OrderEnum {
  CreatedAtAsc = 'CREATED_AT_ASC',
  PayableAtAsc = 'PAYABLE_AT_ASC',
  ReconciledAtAsc = 'RECONCILED_AT_ASC',
  ReconciledAtDesc = 'RECONCILED_AT_DESC',
}

/** Ticket type */
export type OutTicketType = {
  __typename?: 'OutTicketType';
  /** assigned user to ticket */
  assigned_user?: Maybe<UserPublicType>;
  /** Ticket`s created date-time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** Ticket department */
  department?: Maybe<Array<Maybe<TicketDepartmentType>>>;
  /** Ticket`s first user seen status */
  first_user_seen?: Maybe<Scalars['Boolean']['output']>;
  /** Ticket id */
  id: Scalars['ID']['output'];
  /** related model id */
  model_id?: Maybe<Scalars['ID']['output']>;
  /** related model */
  model_type?: Maybe<Scalars['String']['output']>;
  /** Ticket`s priority */
  priority?: Maybe<TicketPriorityEnum>;
  /** Ticket replies */
  replies?: Maybe<Array<Maybe<TicketReplyType>>>;
  /** second user of ticket */
  second_user?: Maybe<UserPublicType>;
  /** Ticket`s second user seen status */
  second_user_seen?: Maybe<Scalars['Boolean']['output']>;
  /** Ticket`s status */
  status?: Maybe<TicketStatusEnum>;
  /** Ticket`s department */
  ticket_department_id?: Maybe<Scalars['ID']['output']>;
  /** Ticket`s title */
  title?: Maybe<Scalars['String']['output']>;
  /** Ticket`s updated date-time */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type PackagePaymentType = {
  __typename?: 'PackagePaymentType';
  status?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** Pagination info type */
export type PaginationType = {
  __typename?: 'PaginationType';
  /** pagination last page */
  last_page?: Maybe<Scalars['BigInteger']['output']>;
  /** pagination limit per page */
  limit?: Maybe<Scalars['BigInteger']['output']>;
  /** pagination current page */
  name?: Maybe<Scalars['String']['output']>;
  /** pagination total */
  total?: Maybe<Scalars['BigInteger']['output']>;
};

/** Passport type */
export type PassportType = {
  __typename?: 'PassportType';
  /** expire date data */
  expire_date?: Maybe<Scalars['Date']['output']>;
  /** nationality type */
  nationality?: Maybe<Scalars['String']['output']>;
  /** passport number data */
  passport_number?: Maybe<Scalars['String']['output']>;
};

/** PaymentTerminal status enum */
export enum PaymentTerminalStatusEnum {
  Active = 'Active',
  DeActive = 'DeActive',
  FollowupPspError = 'FollowupPspError',
  InProgressDefine = 'InProgressDefine',
  InProgressDefineError = 'InProgressDefineError',
  InProgressPsp = 'InProgressPsp',
  InProgressShaparak = 'InProgressShaparak',
  InProgressShaparakActive = 'InProgressShaparakActive',
  InProgressShaparakError = 'InProgressShaparakError',
  NewPasswordFailed = 'NewPasswordFailed',
  Pending = 'Pending',
  Reject = 'Reject',
}

/** Payment type */
export type PaymentType = {
  __typename?: 'PaymentType';
  /** payment description */
  description?: Maybe<Scalars['String']['output']>;
  /** payment swift code */
  id?: Maybe<Scalars['ID']['output']>;
  /** payment name */
  name?: Maybe<Scalars['String']['output']>;
  /** payment swift code */
  swift_code?: Maybe<Scalars['String']['output']>;
};

/** data of payout chart  */
export type PayoutChartType = {
  __typename?: 'PayoutChartType';
  /** payouts */
  payouts?: Maybe<Array<Maybe<AnalysisDetailsType>>>;
  /** total */
  total?: Maybe<PayoutTotalType>;
};

/** Payout type */
export type PayoutReceipt = {
  __typename?: 'PayoutReceipt';
  /** amount */
  amount?: Maybe<Scalars['BigInteger']['output']>;
  /** related bank account */
  bank_account?: Maybe<BankAccount>;
  /** account created date-time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** description */
  description?: Maybe<Scalars['String']['output']>;
  /** The id of the card */
  id: Scalars['ID']['output'];
  /** priority order */
  owner_name?: Maybe<Scalars['String']['output']>;
  /** reached percent */
  percent?: Maybe<Scalars['Int']['output']>;
  /** priority order */
  priority?: Maybe<Scalars['Int']['output']>;
  /** reached amount */
  reached_amount?: Maybe<Scalars['BigInteger']['output']>;
  reconciled_at?: Maybe<Scalars['DateTime']['output']>;
  /** reconciliation_parts */
  reconciliation_parts?: Maybe<ReconciliationPartsEnum>;
  /** status */
  status?: Maybe<PayoutStatusEnum>;
  /** priority order */
  tracking_id?: Maybe<Scalars['String']['output']>;
  /** type */
  type?: Maybe<PayoutTypeEnum>;
  /** account updated date-time */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

/** Payout status enum */
export enum PayoutStatusEnum {
  Active = 'ACTIVE',
  DeActive = 'DE_ACTIVE',
  Paid = 'PAID',
  PendingShaparak = 'PENDING_SHAPARAK',
  ReachedAmount = 'REACHED_AMOUNT',
  Reject = 'REJECT',
  RejectReversed = 'REJECT_REVERSED',
}

/** payout total  */
export type PayoutTotalType = {
  __typename?: 'PayoutTotalType';
  /** total payout amount */
  total_payout_amount?: Maybe<Scalars['BigInteger']['output']>;
  /** total payout count */
  total_payout_count?: Maybe<Scalars['BigInteger']['output']>;
};

export type PayoutType = {
  __typename?: 'PayoutType';
  /** amount */
  amount?: Maybe<Scalars['BigInteger']['output']>;
  /** related bank account */
  bank_account?: Maybe<BankAccount>;
  /** account created date-time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** description */
  description?: Maybe<Scalars['String']['output']>;
  /** fee */
  fee?: Maybe<Scalars['BigInteger']['output']>;
  /** The id of the card */
  id: Scalars['ID']['output'];
  notes?: Maybe<Array<Maybe<NoteType>>>;
  /** priority order */
  owner_name?: Maybe<Scalars['String']['output']>;
  /** reached percent */
  percent?: Maybe<Scalars['Int']['output']>;
  /** priority order */
  priority?: Maybe<Scalars['Int']['output']>;
  /** reached amount */
  reached_amount?: Maybe<Scalars['BigInteger']['output']>;
  reconciled_at?: Maybe<Scalars['DateTime']['output']>;
  /** related reconciliation */
  reconciliation?: Maybe<ReconciliationType>;
  /** reconciliation_parts */
  reconciliation_parts?: Maybe<ReconciliationPartsEnum>;
  /** reference session */
  reference_session?: Maybe<SessionType>;
  related_payout?: Maybe<Scalars['String']['output']>;
  /** status */
  status?: Maybe<PayoutStatusEnum>;
  /** related terminal */
  terminal?: Maybe<TerminalType>;
  /** priority order */
  tracking_id?: Maybe<Scalars['String']['output']>;
  /** type */
  type?: Maybe<PayoutTypeEnum>;
  /** account updated date-time */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  /** url code */
  url_code?: Maybe<Scalars['String']['output']>;
};

/** Payout type enum */
export enum PayoutTypeEnum {
  Fixed = 'FIXED',
  Floating = 'FLOATING',
  Offline = 'OFFLINE',
  TwoStep = 'TWO_STEP',
}

/** required fields type enum */
export enum PersonalLinkRequiredFieldsInputEnum {
  Address = 'ADDRESS',
  Description = 'DESCRIPTION',
  Email = 'EMAIL',
  Landline = 'LANDLINE',
  Mobile = 'MOBILE',
  Name = 'NAME',
}

/** Personal required fields type */
export type PersonalLinkRequiredFieldsInputType = {
  input?: InputMaybe<PersonalLinkRequiredFieldsInputEnum>;
  placeholder?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PersonalLinkRequiredFieldsStatusEnum>;
};

/** Personal required fields type */
export type PersonalLinkRequiredFieldsOutputType = {
  __typename?: 'PersonalLinkRequiredFieldsOutputType';
  input?: Maybe<PersonalLinkRequiredFieldsInputEnum>;
  placeholder?: Maybe<Scalars['String']['output']>;
  status?: Maybe<PersonalLinkRequiredFieldsStatusEnum>;
};

/** Required fields type field status enum */
export enum PersonalLinkRequiredFieldsStatusEnum {
  Hidden = 'HIDDEN',
  Optional = 'OPTIONAL',
  Required = 'REQUIRED',
}

/** Personal status type enum */
export enum PersonalStatusTypeEnum {
  Completed = 'COMPLETED',
  NotCompleted = 'NOT_COMPLETED',
  Processing = 'PROCESSING',
  Rejected = 'REJECTED',
}

/** Predefine Response eModel Type Enum */
export enum PredefineResponseModelTypeEnum {
  BankAccount = 'BankAccount',
  Kyc = 'KYC',
  Terminal = 'Terminal',
  Ticket = 'Ticket',
  User = 'User',
}

/** Predefined response type */
export type PredefinedResponseType = {
  __typename?: 'PredefinedResponseType';
  /** Predefined response id */
  id: Scalars['ID']['output'];
  /** Predefined response message */
  message?: Maybe<Scalars['String']['output']>;
  /** Predefined response related model */
  model_type?: Maybe<PredefineResponseModelTypeEnum>;
  /** Predefined response title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Product form type */
export type ProductFormType = {
  __typename?: 'ProductFormType';
  /** created date-time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** deleted date-time */
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  /** required fields */
  fields?: Maybe<Array<Maybe<ZarinLinkRequiredFieldsOutput>>>;
  /** id */
  id: Scalars['ID']['output'];
  /** failed redirect url */
  is_default?: Maybe<Scalars['Boolean']['output']>;
  /** successful redirect url */
  successful_redirect_url?: Maybe<Scalars['String']['output']>;
  /** terminal id */
  terminal_id?: Maybe<Scalars['ID']['output']>;
  /** title */
  title?: Maybe<Scalars['String']['output']>;
  /** updated date-time */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /** A query */
  AccessTokens?: Maybe<Array<Maybe<AccessTokenType>>>;
  /** Show the sum of active payouts by terminal */
  ActivePayoutAmount?: Maybe<Scalars['String']['output']>;
  /** fetch addresses query */
  Addresses?: Maybe<Array<Maybe<AddressType>>>;
  /** Application information */
  Application?: Maybe<Array<Maybe<ApplicationType>>>;
  /** show balance */
  BalanceChart?: Maybe<DayTransactionAvgType>;
  /** A query */
  BankAccounts?: Maybe<Array<Maybe<BankAccount>>>;
  Cards?: Maybe<Array<Maybe<Card>>>;
  CheckCardIBAN?: Maybe<Iban>;
  Connect?: Maybe<Scalars['String']['output']>;
  /** Checking if code is available for new or not */
  CouponCodeIsAvailable?: Maybe<Scalars['Boolean']['output']>;
  /** Coupon query */
  Coupons?: Maybe<Array<Maybe<CouponType>>>;
  CreateKyc?: Maybe<CreateKycType>;
  /** daily report query */
  DailyReport?: Maybe<DailyReportType>;
  /** Day Transactions */
  DayTransactions?: Maybe<DayTransactionsType>;
  /** session advance search query */
  ElasticSession?: Maybe<Array<Maybe<SessionType>>>;
  /** Fetch all graphQl error messages */
  ErrorMessages?: Maybe<ErrorMessageType>;
  /** Get all exportable fields grouped by key for different sections */
  ExportableFields?: Maybe<Array<Maybe<ExportableFieldsGroup>>>;
  /** Fetch faqs */
  Faqs?: Maybe<Array<Maybe<FaqType>>>;
  /** chart query */
  IncomeChart?: Maybe<Array<Maybe<IncomeChartType>>>;
  /** InstantPayout Query */
  InstantPayout?: Maybe<Array<Maybe<InstantPayoutType>>>;
  /** instant payout chart query */
  InstantPayoutChart?: Maybe<Array<Maybe<InstantPayoutChartType>>>;
  /** InstantPayoutInquiry Query */
  InstantPayoutInquiry?: Maybe<InstantPayoutInquiry>;
  /** show banks balance */
  InstantPayoutInquiryBanks?: Maybe<InstantPayoutInquiryBanksType>;
  /** Instant Payout Receipt Query */
  InstantPayoutReceipt?: Maybe<InstantPayoutReceipt>;
  /** Invoice query */
  Invoice?: Maybe<Array<Maybe<Invoice>>>;
  KycUrl?: Maybe<Scalars['String']['output']>;
  /** 3cx live chat */
  LiveChat?: Maybe<LiveChatType>;
  Me?: Maybe<UserType>;
  /** Zarin link query */
  NewZarinLinks?: Maybe<Array<Maybe<NewZarinLinkType>>>;
  PackagePaymentRequest?: Maybe<PackagePaymentType>;
  /** Pagination */
  Pagination?: Maybe<Array<Maybe<PaginationType>>>;
  /** Payout query */
  Payout?: Maybe<Array<Maybe<PayoutType>>>;
  /** show balance */
  PayoutBalance?: Maybe<DayTransactionAvgType>;
  /** payout chart query */
  PayoutChart?: Maybe<Array<Maybe<PayoutChartType>>>;
  /** PayoutInquiry Query */
  PayoutInquiry?: Maybe<InstantPayoutInquiry>;
  /** Payout Receipt Query */
  PayoutReceipt?: Maybe<PayoutReceipt>;
  /** fetch user personal link */
  PersonalLink?: Maybe<ZarinLinkType>;
  /** reconciliation query */
  Reconciliation?: Maybe<Array<Maybe<ReconciliationType>>>;
  /** instant payout chart query */
  ReconciliationChart?: Maybe<Array<Maybe<ReconciliationChartType>>>;
  /** pending or in progress reconciliation */
  ReconciliationCountChart?: Maybe<ChartCountAmountType>;
  /** Query to fetch wages reconciliations based on filters */
  ReconciliationWages?: Maybe<Array<Maybe<ReconcileWageType>>>;
  ReferrerInvoice?: Maybe<Array<Maybe<ReferrerInvoiceType>>>;
  ReferrerInvoiceGetIban?: Maybe<BankAccount>;
  Referrers?: Maybe<Referrers>;
  ReferrersByUserReport?: Maybe<ReferrersByUserType>;
  ReferrersReport?: Maybe<Referrers>;
  /** refund chart query */
  RefundChart?: Maybe<Array<Maybe<RefundChartType>>>;
  RefundFeeInquiry?: Maybe<RefundFeeInquiryType>;
  ReleaseChangeLogQuery?: Maybe<ReleaseChangeLogType>;
  /** Report Terminal Category Query */
  ReportTerminalCategory?: Maybe<Array<Maybe<ReportTerminalCategoryType>>>;
  /** chart query */
  RevenueChart?: Maybe<Array<Maybe<RevenueChartType>>>;
  /** chart method query */
  RevenueMethodChart?: Maybe<Array<Maybe<RevenueMethodChartType>>>;
  /** session query */
  Session?: Maybe<Array<Maybe<SessionType>>>;
  /** Fetch Session Exports */
  SessionExport?: Maybe<Array<Maybe<SessionExportType>>>;
  /** A query for session types */
  SessionType?: Maybe<Array<Maybe<SessionTypeType>>>;
  /** suggest answer for ticket title. */
  SuggestAnswer?: Maybe<Array<Maybe<SuggestAnswerType>>>;
  SupportResponseTicketsCount?: Maybe<Scalars['Int']['output']>;
  /** Terminal branding setting query */
  TerminalBrandingSetting?: Maybe<TerminalBrandingSettingType>;
  /** A query */
  TerminalCategories?: Maybe<Array<Maybe<TerminalCategoryType>>>;
  /** A query for terminal contract */
  TerminalContract?: Maybe<TerminalContractType>;
  /** A query to get all customers of terminal */
  TerminalCustomer?: Maybe<Array<Maybe<TerminalCustomerType>>>;
  /** check domain type  */
  TerminalDomainCheck?: Maybe<TerminalDomainType>;
  /** A query to get all fee groups */
  TerminalFeeGroups?: Maybe<Array<Maybe<FeeGroupType>>>;
  /** Terminal branding setting query */
  TerminalSettingDefaultForm?: Maybe<TerminalDefaultFormType>;
  /** Terminal after payment setting query */
  TerminalSettingZarinLinkAfterPayment?: Maybe<TerminalSettingZarinLinkAfterPaymentType>;
  /** A query to get all user terminals */
  TerminalUser?: Maybe<Array<Maybe<TerminalUserType>>>;
  /** A query */
  Terminals?: Maybe<Array<Maybe<TerminalType>>>;
  /** ticket departments */
  TicketDepartments?: Maybe<Array<Maybe<TicketDepartmentType>>>;
  /** Fetch User tickets */
  Tickets?: Maybe<Array<Maybe<TicketType>>>;
  Time?: Maybe<TimeType>;
  /** today sessions sum */
  TodaySessionChart?: Maybe<ChartCountAmountType>;
  /** day transaction average */
  TodayTransactionAvgChart?: Maybe<DayTransactionAvgType>;
  /** Two Day Chart Query */
  TwoDayChart?: Maybe<TwoDayChartType>;
  UnreadTicketsCount?: Maybe<Scalars['Int']['output']>;
  /** Show User Announcement */
  UserAnnouncement?: Maybe<Array<Maybe<UserAnnouncementType>>>;
  /** Query to retrieve user transactions based on specified filters. */
  UserTransactionQuery?: Maybe<TransactionListType>;
  /** Yesterday sessions sum */
  YesterdaySessionChart?: Maybe<ChartCountAmountType>;
  /** Zarin Card Branch List */
  ZarinCardBranchList?: Maybe<Array<Maybe<ZarinCardBranchType>>>;
  ZarinLinkCategories?: Maybe<Array<Maybe<ZarinLinkCategory>>>;
  /** Zarin Link Transactions Aggregate */
  ZarinLinkTransactionsAggregate?: Maybe<ZarinLinkAggregateTransactionsType>;
  /** Zarin link query */
  ZarinLinks?: Maybe<Array<Maybe<ZarinLinkType>>>;
};

export type QueryActivePayoutAmountArgs = {
  terminal_id: Scalars['ID']['input'];
};

export type QueryBalanceChartArgs = {
  terminal_id: Scalars['ID']['input'];
};

export type QueryBankAccountsArgs = {
  holder_name?: InputMaybe<Scalars['String']['input']>;
  iban?: InputMaybe<Scalars['String']['input']>;
  iban_holder_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<CardStatus>;
  type?: InputMaybe<BankAccountTypeEnum>;
};

export type QueryCheckCardIbanArgs = {
  iban?: InputMaybe<Scalars['String']['input']>;
  pan?: InputMaybe<Scalars['MaskedPan']['input']>;
};

export type QueryConnectArgs = {
  mobile?: InputMaybe<Scalars['String']['input']>;
  redirect?: InputMaybe<Scalars['String']['input']>;
};

export type QueryCouponCodeIsAvailableArgs = {
  code: Scalars['String']['input'];
  terminal_id: Scalars['ID']['input'];
};

export type QueryCouponsArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<CouponFilterEnum>;
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  terminal_id: Scalars['ID']['input'];
  zarin_link_id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryDailyReportArgs = {
  from_date: Scalars['Date']['input'];
  terminal_id: Scalars['ID']['input'];
  to_date: Scalars['Date']['input'];
};

export type QueryDayTransactionsArgs = {
  terminal_id: Scalars['ID']['input'];
};

export type QueryElasticSessionArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  card_pan?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  mobile?: InputMaybe<Scalars['CellNumber']['input']>;
  rrn?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type QueryExportableFieldsArgs = {
  group?: InputMaybe<ExportGroupEnum>;
  terminal_id: Scalars['Int']['input'];
};

export type QueryFaqsArgs = {
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type QueryIncomeChartArgs = {
  terminal_id: Scalars['ID']['input'];
};

export type QueryInstantPayoutArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  filter?: InputMaybe<FilterEnum>;
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  reference_id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<InstantPayoutStatusEnum>;
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  url_code?: InputMaybe<Scalars['String']['input']>;
};

export type QueryInstantPayoutChartArgs = {
  from_date?: InputMaybe<Scalars['Date']['input']>;
  interval?: InputMaybe<IntervalTypeEnum>;
  terminal_id: Scalars['ID']['input'];
  to_date?: InputMaybe<Scalars['Date']['input']>;
};

export type QueryInstantPayoutInquiryArgs = {
  amount?: InputMaybe<Scalars['BigInteger']['input']>;
  bank_account_id: Scalars['ID']['input'];
  terminal_id: Scalars['ID']['input'];
};

export type QueryInstantPayoutReceiptArgs = {
  url_code: Scalars['String']['input'];
};

export type QueryInvoiceArgs = {
  amount?: InputMaybe<Scalars['BigInteger']['input']>;
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  payer_email?: InputMaybe<Scalars['String']['input']>;
  payer_mobile?: InputMaybe<Scalars['String']['input']>;
  payer_name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<InvoiceStatusEnum>;
  terminal_id: Scalars['ID']['input'];
};

export type QueryKycUrlArgs = {
  only_identifier?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryNewZarinLinksArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  amount_type?: InputMaybe<ZarinLinkAmountTypeEnum>;
  description?: InputMaybe<Scalars['String']['input']>;
  failed_redirect_url?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ZarinLinkFilterEnum>;
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  successful_redirect_url?: InputMaybe<Scalars['String']['input']>;
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ZarinLinkTypeEnum>;
};

export type QueryPackagePaymentRequestArgs = {
  package_id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryPayoutArgs = {
  amount?: InputMaybe<Scalars['BigInteger']['input']>;
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  except?: InputMaybe<Array<InputMaybe<FilterEnum>>>;
  filter?: InputMaybe<FilterEnum>;
  iban?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  reference_session_id?: InputMaybe<Scalars['ID']['input']>;
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  url_code?: InputMaybe<Scalars['String']['input']>;
};

export type QueryPayoutBalanceArgs = {
  terminal_id: Scalars['ID']['input'];
};

export type QueryPayoutChartArgs = {
  from_date?: InputMaybe<Scalars['Date']['input']>;
  interval?: InputMaybe<IntervalTypeEnum>;
  terminal_id: Scalars['ID']['input'];
  to_date?: InputMaybe<Scalars['Date']['input']>;
};

export type QueryPayoutInquiryArgs = {
  terminal_id: Scalars['ID']['input'];
};

export type QueryPayoutReceiptArgs = {
  url_code: Scalars['String']['input'];
};

export type QueryReconciliationArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  except?: InputMaybe<Array<InputMaybe<ReconciliationStatusEnum>>>;
  filter?: InputMaybe<ReconciliationStatusEnum>;
  iban?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderEnum>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  reference_id?: InputMaybe<Scalars['String']['input']>;
  sessions_limit?: InputMaybe<Scalars['Int']['input']>;
  sessions_offset?: InputMaybe<Scalars['Int']['input']>;
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  wages_limit?: InputMaybe<Scalars['Int']['input']>;
  wages_offset?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryReconciliationChartArgs = {
  from_date?: InputMaybe<Scalars['Date']['input']>;
  interval?: InputMaybe<IntervalTypeEnum>;
  terminal_id: Scalars['ID']['input'];
  to_date?: InputMaybe<Scalars['Date']['input']>;
};

export type QueryReconciliationCountChartArgs = {
  terminal_id: Scalars['ID']['input'];
};

export type QueryReconciliationWagesArgs = {
  holder_name?: InputMaybe<Scalars['String']['input']>;
  iban?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  reconciliation_id: Scalars['ID']['input'];
  terminal_id: Scalars['ID']['input'];
};

export type QueryReferrerInvoiceArgs = {
  from_date?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  reference_id?: InputMaybe<Scalars['String']['input']>;
  to_date?: InputMaybe<Scalars['DateTime']['input']>;
};

export type QueryReferrersArgs = {
  from_date?: InputMaybe<Scalars['DateTime']['input']>;
  to_date?: InputMaybe<Scalars['DateTime']['input']>;
};

export type QueryReferrersByUserReportArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryReferrersReportArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryRefundChartArgs = {
  from_date?: InputMaybe<Scalars['Date']['input']>;
  interval?: InputMaybe<IntervalTypeEnum>;
  terminal_id: Scalars['ID']['input'];
  to_date?: InputMaybe<Scalars['Date']['input']>;
};

export type QueryRefundFeeInquiryArgs = {
  method?: InputMaybe<InstantPayoutActionTypeEnum>;
};

export type QueryRevenueChartArgs = {
  from_date?: InputMaybe<Scalars['Date']['input']>;
  interval?: InputMaybe<IntervalTypeEnum>;
  terminal_id: Scalars['ID']['input'];
  to_date?: InputMaybe<Scalars['Date']['input']>;
};

export type QueryRevenueMethodChartArgs = {
  from_date?: InputMaybe<Scalars['Date']['input']>;
  interval?: InputMaybe<IntervalTypeEnum>;
  terminal_id: Scalars['ID']['input'];
  to_date?: InputMaybe<Scalars['Date']['input']>;
};

export type QuerySessionArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  authority?: InputMaybe<Scalars['String']['input']>;
  card_pan?: InputMaybe<Scalars['String']['input']>;
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterEnum>;
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  mobile?: InputMaybe<Scalars['CellNumber']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderEnum>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  reconciliation_id?: InputMaybe<Scalars['ID']['input']>;
  reference_id?: InputMaybe<Scalars['String']['input']>;
  relation_id?: InputMaybe<Scalars['ID']['input']>;
  rrn?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<SessionTypeEnum>;
};

export type QuerySessionExportArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type QuerySessionTypeArgs = {
  terminal_id: Scalars['ID']['input'];
};

export type QuerySuggestAnswerArgs = {
  title?: InputMaybe<Scalars['String']['input']>;
};

export type QueryTerminalBrandingSettingArgs = {
  terminal_id: Scalars['ID']['input'];
};

export type QueryTerminalCustomerArgs = {
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['Int']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  sessions_limit?: InputMaybe<Scalars['Int']['input']>;
  sessions_offset?: InputMaybe<Scalars['Int']['input']>;
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryTerminalDomainCheckArgs = {
  domain: Scalars['String']['input'];
};

export type QueryTerminalSettingDefaultFormArgs = {
  terminal_id: Scalars['ID']['input'];
};

export type QueryTerminalSettingZarinLinkAfterPaymentArgs = {
  terminal_id: Scalars['ID']['input'];
};

export type QueryTerminalUserArgs = {
  terminal_id: Scalars['ID']['input'];
};

export type QueryTerminalsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<CardStatus>;
};

export type QueryTicketsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<TicketStatusEnum>;
};

export type QueryTodaySessionChartArgs = {
  terminal_id: Scalars['ID']['input'];
};

export type QueryTodayTransactionAvgChartArgs = {
  terminal_id: Scalars['ID']['input'];
};

export type QueryTwoDayChartArgs = {
  date: Scalars['Date']['input'];
  terminal_id: Scalars['ID']['input'];
};

export type QueryUserTransactionQueryArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pan?: InputMaybe<Scalars['String']['input']>;
  terminal_domain?: InputMaybe<Scalars['String']['input']>;
  terminal_name?: InputMaybe<Scalars['String']['input']>;
};

export type QueryYesterdaySessionChartArgs = {
  terminal_id: Scalars['ID']['input'];
};

export type QueryZarinCardBranchListArgs = {
  province: Scalars['String']['input'];
};

export type QueryZarinLinkCategoriesArgs = {
  type?: InputMaybe<CategoryTypeEnum>;
};

export type QueryZarinLinkTransactionsAggregateArgs = {
  relation_id: Scalars['ID']['input'];
  terminal_id: Scalars['ID']['input'];
};

export type QueryZarinLinksArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  failed_redirect_url?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ZarinLinkFilterEnum>;
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  successful_redirect_url?: InputMaybe<Scalars['String']['input']>;
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Terminal Reconcile  Cycle Type Enum */
export enum ReconcileCycleTypeEnum {
  Daily = 'DAILY',
  GoldenTuesday = 'GOLDEN_TUESDAY',
  Monthly_1 = 'MONTHLY_1',
  Monthly_2 = 'MONTHLY_2',
  Monthly_3 = 'MONTHLY_3',
  Monthly_4 = 'MONTHLY_4',
  Monthly_5 = 'MONTHLY_5',
  Monthly_6 = 'MONTHLY_6',
  Monthly_7 = 'MONTHLY_7',
  Monthly_8 = 'MONTHLY_8',
  Monthly_9 = 'MONTHLY_9',
  Monthly_10 = 'MONTHLY_10',
  Monthly_11 = 'MONTHLY_11',
  Monthly_12 = 'MONTHLY_12',
  Monthly_13 = 'MONTHLY_13',
  Monthly_14 = 'MONTHLY_14',
  Monthly_15 = 'MONTHLY_15',
  Monthly_16 = 'MONTHLY_16',
  Monthly_17 = 'MONTHLY_17',
  Monthly_18 = 'MONTHLY_18',
  Monthly_19 = 'MONTHLY_19',
  Monthly_20 = 'MONTHLY_20',
  Monthly_21 = 'MONTHLY_21',
  Monthly_22 = 'MONTHLY_22',
  Monthly_23 = 'MONTHLY_23',
  Monthly_24 = 'MONTHLY_24',
  Monthly_25 = 'MONTHLY_25',
  Monthly_26 = 'MONTHLY_26',
  Monthly_27 = 'MONTHLY_27',
  Monthly_28 = 'MONTHLY_28',
  Monthly_29 = 'MONTHLY_29',
  OddDays = 'ODD_DAYS',
  Off = 'OFF',
  WeeklyMonday = 'WEEKLY_MONDAY',
  WeeklySaturday = 'WEEKLY_SATURDAY',
  WeeklySunday = 'WEEKLY_SUNDAY',
  WeeklyThursday = 'WEEKLY_THURSDAY',
  WeeklyTuesday = 'WEEKLY_TUESDAY',
  WeeklyWednesday = 'WEEKLY_WEDNESDAY',
}

/** A type */
export type ReconcileStatusType = {
  __typename?: 'ReconcileStatusType';
  /** amount */
  amount?: Maybe<Scalars['BigInteger']['output']>;
  /** last session id */
  last_session_id?: Maybe<Scalars['ID']['output']>;
};

/** Terminal  Type Enum */
export enum ReconcileTypeEnum {
  Normal = 'NORMAL',
  Wallet = 'WALLET',
}

/** A type */
export type ReconcileWageType = {
  __typename?: 'ReconcileWageType';
  /** amount */
  amount?: Maybe<Scalars['BigInteger']['output']>;
  /** bank account */
  bank_account?: Maybe<BankAccount>;
  /** fee */
  fee?: Maybe<Scalars['BigInteger']['output']>;
  /** id */
  id?: Maybe<Scalars['BigInteger']['output']>;
  /** returned_at */
  returned_at?: Maybe<Scalars['DateTime']['output']>;
  /** shaparak_error_message */
  shaparak_error_message?: Maybe<Scalars['String']['output']>;
  /** shaparak_error_type */
  shaparak_error_type?: Maybe<Scalars['String']['output']>;
  /** shaparak_tracking_number */
  shaparak_tracking_number?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ReconciliationWageTypeEnum>;
  type_id?: Maybe<Scalars['String']['output']>;
};

/** Terminal wage Type Enum */
export enum ReconcileWageTypeEnum {
  Direct = 'DIRECT',
  Fix = 'FIX',
  Float = 'FLOAT',
  Normal = 'NORMAL',
  Offline = 'OFFLINE',
  OfflineStatic = 'OFFLINE_STATIC',
}

/** data of reconciliation chart  */
export type ReconciliationChartType = {
  __typename?: 'ReconciliationChartType';
  /** instantPayouts */
  instantPayouts?: Maybe<Array<Maybe<AnalysisDetailsType>>>;
  /** normal */
  normalReconciliations?: Maybe<Array<Maybe<AnalysisDetailsType>>>;
  /** payouts */
  payouts?: Maybe<Array<Maybe<AnalysisDetailsType>>>;
  /** refunds */
  refunds?: Maybe<Array<Maybe<AnalysisDetailsType>>>;
};

/** BankAccount Reconciliation Parts enum */
export enum ReconciliationPartsEnum {
  Multi = 'MULTI',
  Single = 'SINGLE',
}

/** An enum */
export enum ReconciliationStatusEnum {
  All = 'ALL',
  BankRejected = 'BANK_REJECTED',
  ConflictedReversed = 'CONFLICTED_REVERSED',
  InProgress = 'IN_PROGRESS',
  Paid = 'PAID',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Reversed = 'REVERSED',
}

/** reconciliation type */
export type ReconciliationType = {
  __typename?: 'ReconciliationType';
  /** amount */
  amount?: Maybe<Scalars['BigInteger']['output']>;
  /** when this reconciliation created. */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** description */
  description?: Maybe<Scalars['String']['output']>;
  estimated_payed_at?: Maybe<Scalars['DateTime']['output']>;
  /** fee */
  fee?: Maybe<Scalars['BigInteger']['output']>;
  /** The id of reconciliation */
  id: Scalars['ID']['output'];
  /** note. */
  note?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Array<Maybe<NoteType>>>;
  /** when this reconciliation can be reconciled. */
  payable_at?: Maybe<Scalars['DateTime']['output']>;
  /** payment type */
  payment?: Maybe<PaymentType>;
  /** when this reconciliation reconciled. */
  reconciled_at?: Maybe<Scalars['DateTime']['output']>;
  /** reference_id. */
  reference_id?: Maybe<Scalars['String']['output']>;
  /** terminal sessions */
  sessions?: Maybe<Array<Maybe<SessionType>>>;
  sessions_count?: Maybe<Scalars['Int']['output']>;
  shaparak_fee?: Maybe<Scalars['BigInteger']['output']>;
  /** status */
  status?: Maybe<ReconciliationStatusEnum>;
  /** reconciliation terminal */
  terminal?: Maybe<TerminalType>;
  /** The id of terminal */
  terminal_id?: Maybe<Scalars['ID']['output']>;
  /** wages */
  wages?: Maybe<Array<Maybe<ReconcileWageType>>>;
  wages_count?: Maybe<Scalars['Int']['output']>;
};

export enum ReconciliationWageTypeEnum {
  InstantPayout = 'INSTANT_PAYOUT',
  Payout = 'PAYOUT',
  Refund = 'REFUND',
  TwoStep = 'TWO_STEP',
}

export enum ReferrerInvoiceStatusEnum {
  Paid = 'PAID',
  Pending = 'PENDING',
}

export type ReferrerInvoiceType = {
  __typename?: 'ReferrerInvoiceType';
  amount?: Maybe<Scalars['BigInteger']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  from_date?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  reference_id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ReferrerInvoiceStatusEnum>;
  to_date?: Maybe<Scalars['DateTime']['output']>;
};

/** user referrers type */
export type Referrers = {
  __typename?: 'Referrers';
  /** all_referrers */
  all_referrers: Scalars['Int']['output'];
  /** sum_referrers */
  month_active_referrers: Scalars['Int']['output'];
  /** sum_commission */
  sum_commission: Scalars['Int']['output'];
  /** sum_referrers */
  sum_referrers: Scalars['Int']['output'];
  /** user_id */
  user?: Maybe<Array<Maybe<UserReferred>>>;
};

/** user referrers by user type */
export type ReferrersByUserType = {
  __typename?: 'ReferrersByUserType';
  /** all_referrers */
  all_referrers: Scalars['Int']['output'];
  /** sum_referrers */
  month_active_referrers: Scalars['Int']['output'];
  /** sum_commission */
  sum_commission: Scalars['Int']['output'];
  /** sum_referrers */
  sum_referrers: Scalars['Int']['output'];
  /** user_id */
  user?: Maybe<Array<Maybe<UserReferred>>>;
};

/** data of refund chart  */
export type RefundChartType = {
  __typename?: 'RefundChartType';
  /** refunds */
  refunds?: Maybe<Array<Maybe<AnalysisDetailsType>>>;
  /** total */
  total?: Maybe<RefundTotalType>;
};

/** Fee inquiry type */
export type RefundFeeInquiryType = {
  __typename?: 'RefundFeeInquiryType';
  /** base_fee */
  base_fee?: Maybe<Scalars['BigInteger']['output']>;
  /** step_amount */
  step_amount?: Maybe<Scalars['BigInteger']['output']>;
  /** step fee */
  step_fee?: Maybe<Scalars['BigInteger']['output']>;
};

/** Refund reason enum */
export enum RefundReasonEnum {
  CustomerRequest = 'CUSTOMER_REQUEST',
  DuplicateTransaction = 'DUPLICATE_TRANSACTION',
  Other = 'OTHER',
  SuspiciousTransaction = 'SUSPICIOUS_TRANSACTION',
}

/** Refund total  */
export type RefundTotalType = {
  __typename?: 'RefundTotalType';
  /** total refund amount */
  total_refund_amount?: Maybe<Scalars['BigInteger']['output']>;
  /** total refund count */
  total_refund_count?: Maybe<Scalars['BigInteger']['output']>;
};

/** Refund type */
export type RefundType = {
  __typename?: 'RefundType';
  /** account created date-time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** refund id */
  id: Scalars['ID']['output'];
  /** instant payout */
  instant_payout?: Maybe<InstantPayoutType>;
  /** reason */
  reason?: Maybe<RefundReasonEnum>;
  /** refund session */
  session_id: Scalars['ID']['output'];
  /** account updated date-time */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

/** Registration info type */
export type RegistrationInfoType = {
  __typename?: 'RegistrationInfoType';
  /** purpose */
  purpose?: Maybe<Scalars['String']['output']>;
};

/** Release change log type */
export type ReleaseChangeLogType = {
  __typename?: 'ReleaseChangeLogType';
  /** Release content */
  content?: Maybe<Scalars['String']['output']>;
  /** Release date and time */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Release version */
  version?: Maybe<Scalars['String']['output']>;
};

/** Report Terminal Category Type */
export type ReportTerminalCategoryType = {
  __typename?: 'ReportTerminalCategoryType';
  /** The children categories */
  children?: Maybe<Array<Maybe<ReportTerminalCategoryType>>>;
  /** The ID of the category */
  id?: Maybe<Scalars['Int']['output']>;
  /** The name of the category */
  name?: Maybe<Scalars['String']['output']>;
  /** The ID of the parent category */
  parent_id?: Maybe<Scalars['Int']['output']>;
};

/** data of revenue chart  */
export type RevenueChartType = {
  __typename?: 'RevenueChartType';
  /** revenues */
  revenues?: Maybe<Array<Maybe<AnalysisDetailsType>>>;
  /** total */
  total?: Maybe<RevenueTotalType>;
};

/** data of revenue method chart */
export type RevenueMethodChartType = {
  __typename?: 'RevenueMethodChartType';
  /** Date */
  date?: Maybe<Scalars['String']['output']>;
  /** Jalali Date */
  jalaliDate?: Maybe<Scalars['String']['output']>;
  /** Types */
  types?: Maybe<Array<Maybe<AnalysisDetailsType>>>;
};

/** Revenue total  */
export type RevenueTotalType = {
  __typename?: 'RevenueTotalType';
  /** total revenue amount */
  total_revenue_amount?: Maybe<Scalars['BigInteger']['output']>;
  /** total revenue count */
  total_revenue_count?: Maybe<Scalars['BigInteger']['output']>;
};

/** send otp contract confirm type */
export type SendOtpContractConfirmType = {
  __typename?: 'SendOtpContractConfirmType';
  /** Expiration time for the OTP contract confirmation */
  expiration_time?: Maybe<Scalars['String']['output']>;
  /** Additional message related to the confirmation */
  message?: Maybe<Scalars['String']['output']>;
  /** Status of the contract confirmation process */
  status: Scalars['Boolean']['output'];
};

/** Session Export type */
export type SessionExportType = {
  __typename?: 'SessionExportType';
  /** created at time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** export id */
  id?: Maybe<Scalars['ID']['output']>;
  /** name of file */
  name?: Maybe<Scalars['String']['output']>;
  /** size in bytes */
  size?: Maybe<Scalars['BigInteger']['output']>;
  /** status of export */
  status?: Maybe<ExportStatusEnum>;
  /** export type */
  type?: Maybe<Scalars['String']['output']>;
  /** url of file */
  url?: Maybe<Scalars['String']['output']>;
  /** size in bytes */
  uuid?: Maybe<Scalars['String']['output']>;
};

/** Describe session's fee detail */
export type SessionFeeDetailType = {
  __typename?: 'SessionFeeDetailType';
  /** Ayan fee */
  ayan?: Maybe<Scalars['Int']['output']>;
  /** session raw fee */
  raw_fee?: Maybe<Scalars['Int']['output']>;
  /** SMS fee */
  sms?: Maybe<Scalars['Int']['output']>;
};

/** Session fee type enum */
export enum SessionFeeTypeEnum {
  Merchant = 'MERCHANT',
  Payer = 'PAYER',
}

export enum SessionFlagEnum {
  AyanFee = 'AYAN_FEE',
}

/** Payer info type */
export type SessionPayerInfoType = {
  __typename?: 'SessionPayerInfoType';
  card_holder_account_number?: Maybe<Scalars['String']['output']>;
  card_holder_iban?: Maybe<Scalars['String']['output']>;
  card_holder_name?: Maybe<Scalars['String']['output']>;
  custom_field_1?: Maybe<Scalars['String']['output']>;
  custom_field_1_name?: Maybe<Scalars['String']['output']>;
  custom_field_2?: Maybe<Scalars['String']['output']>;
  custom_field_2_name?: Maybe<Scalars['String']['output']>;
  /** Pay description */
  description?: Maybe<Scalars['String']['output']>;
  /** Payer email */
  email?: Maybe<Scalars['String']['output']>;
  /** Payer cell number */
  mobile?: Maybe<Scalars['String']['output']>;
  /** Payer last name */
  name?: Maybe<Scalars['String']['output']>;
  order_id?: Maybe<Scalars['String']['output']>;
  /** zarin link id */
  zarin_link_id?: Maybe<Scalars['ID']['output']>;
};

/** Session status enum */
export enum SessionStatusEnum {
  Conflicted = 'CONFLICTED',
  Failed = 'FAILED',
  Inbank = 'INBANK',
  Paid = 'PAID',
  Reversed = 'REVERSED',
  Verified = 'VERIFIED',
}

/** Session TimeLine Type */
export type SessionTimeLineType = {
  __typename?: 'SessionTimeLineType';
  /** session created_at */
  canceled_time?: Maybe<Scalars['DateTime']['output']>;
  /** session created_at */
  created_reference?: Maybe<Scalars['DateTime']['output']>;
  /** session created_at */
  created_time?: Maybe<Scalars['DateTime']['output']>;
  disputed_by?: Maybe<Scalars['String']['output']>;
  disputed_description?: Maybe<Scalars['String']['output']>;
  disputed_resolve_by?: Maybe<Scalars['String']['output']>;
  disputed_resolve_description?: Maybe<Scalars['DateTime']['output']>;
  disputed_resolve_session_id?: Maybe<Scalars['BigInteger']['output']>;
  disputed_resolve_time?: Maybe<Scalars['DateTime']['output']>;
  disputed_session_id?: Maybe<Scalars['BigInteger']['output']>;
  disputed_time?: Maybe<Scalars['DateTime']['output']>;
  /** session created_at */
  in_bank_name?: Maybe<Scalars['String']['output']>;
  /** session created_at */
  in_bank_time?: Maybe<Scalars['DateTime']['output']>;
  /** session created_at */
  reconciled_id?: Maybe<Scalars['BigInteger']['output']>;
  reconciled_status?: Maybe<ReconciliationStatusEnum>;
  reconciled_success_time?: Maybe<Scalars['DateTime']['output']>;
  /** session created_at */
  reconciled_time?: Maybe<Scalars['DateTime']['output']>;
  /** refund amount */
  refund_amount?: Maybe<Scalars['BigInteger']['output']>;
  /** refund id */
  refund_id?: Maybe<Scalars['BigInteger']['output']>;
  /** refund_reference_id */
  refund_reference_id?: Maybe<Scalars['String']['output']>;
  /** refund status */
  refund_status?: Maybe<ReconciliationStatusEnum>;
  /** refund created_at */
  refund_time?: Maybe<Scalars['DateTime']['output']>;
  /** session created_at */
  settled_time?: Maybe<Scalars['DateTime']['output']>;
  /** session created_at */
  verified_reference?: Maybe<Scalars['DateTime']['output']>;
  /** session created_at */
  verified_time?: Maybe<Scalars['DateTime']['output']>;
};

export type SessionTryAgentType = {
  __typename?: 'SessionTryAgentType';
  agent?: Maybe<Scalars['String']['output']>;
  browser?: Maybe<Scalars['String']['output']>;
  browser_version?: Maybe<Scalars['String']['output']>;
  country_code?: Maybe<Scalars['String']['output']>;
  device?: Maybe<Scalars['String']['output']>;
  device_type?: Maybe<Scalars['String']['output']>;
  /** The id of session */
  id: Scalars['ID']['output'];
  /** The ip of payer */
  ip?: Maybe<Scalars['IP']['output']>;
  os?: Maybe<Scalars['String']['output']>;
  os_version?: Maybe<Scalars['String']['output']>;
  /** The id of session */
  session_id: Scalars['ID']['output'];
};

/** Payment Try status enum */
export enum SessionTryStatusEnum {
  Failed = 'FAILED',
  Inbank = 'INBANK',
  Paid = 'PAID',
  Verified = 'VERIFIED',
}

/** payment try type */
export type SessionTryType = {
  __typename?: 'SessionTryType';
  agent?: Maybe<SessionTryAgentType>;
  /** card info. */
  card_info?: Maybe<IssuingBank>;
  /** card pan, Masked */
  card_pan?: Maybe<Scalars['MaskedPan']['output']>;
  /** type. */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** The id of session */
  id: Scalars['ID']['output'];
  /** init time. */
  init_time?: Maybe<Scalars['BigInteger']['output']>;
  /** whether the card and the mobile owner is same or not (NULL means not checked yet) */
  is_card_mobile_verified?: Maybe<Scalars['Boolean']['output']>;
  /** The ip of payer */
  payer_ip?: Maybe<Scalars['IP']['output']>;
  /** payer user */
  payer_user?: Maybe<UserPublicType>;
  /** The id of payment */
  payment_id?: Maybe<Scalars['ID']['output']>;
  /** rrn. */
  rrn?: Maybe<Scalars['ID']['output']>;
  /** The id of session */
  session_id: Scalars['ID']['output'];
  /** status. */
  status?: Maybe<SessionTryStatusEnum>;
  /** token. */
  token?: Maybe<Scalars['ID']['output']>;
  /** verify time. */
  verify_time?: Maybe<Scalars['BigInteger']['output']>;
};

/** SessionTry type enum */
export enum SessionTryTypeEnum {
  Addfund = 'ADDFUND',
  Personallink = 'PERSONALLINK',
  Requestmoney = 'REQUESTMONEY',
  Ussdgate = 'USSDGATE',
  Zarinak = 'ZARINAK',
  Zaringate = 'ZARINGATE',
  Zarinlink = 'ZARINLINK',
}

/** session type */
export type SessionType = {
  __typename?: 'SessionType';
  /** amount. */
  amount?: Maybe<Scalars['BigInteger']['output']>;
  /** authority */
  authority?: Maybe<Scalars['String']['output']>;
  /** callback url. */
  callback_url?: Maybe<Scalars['String']['output']>;
  /** The coupon used in this session */
  coupon?: Maybe<CouponType>;
  /** coupon_session */
  coupon_session?: Maybe<CouponSessionType>;
  /** reconciled at. */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** description. */
  description?: Maybe<Scalars['String']['output']>;
  /** expire in. */
  expire_in?: Maybe<Scalars['DateTime']['output']>;
  /** fee. */
  fee?: Maybe<Scalars['BigInteger']['output']>;
  /** fee detail. */
  fee_detail?: Maybe<SessionFeeDetailType>;
  /** fee type */
  fee_type?: Maybe<SessionFeeTypeEnum>;
  flag?: Maybe<SessionFlagEnum>;
  /** The id of session */
  id: Scalars['ID']['output'];
  /** metadata. */
  metadata?: Maybe<Scalars['String']['output']>;
  /** note. */
  note?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Array<Maybe<NoteType>>>;
  /** payable at. */
  payable_at?: Maybe<Scalars['DateTime']['output']>;
  /** session user payer info */
  payer_info?: Maybe<SessionPayerInfoType>;
  product?: Maybe<ZarinLinkType>;
  /** reconciled at. */
  reconciled_at?: Maybe<Scalars['DateTime']['output']>;
  /** The id of reconciliation if it reconciled */
  reconciliation_id?: Maybe<Scalars['ID']['output']>;
  /** The reference number */
  reference_id?: Maybe<Scalars['String']['output']>;
  /** referer url. */
  referer_url?: Maybe<Scalars['String']['output']>;
  /** refund detail */
  refund?: Maybe<RefundType>;
  /** server ip. */
  server_ip?: Maybe<Scalars['IP']['output']>;
  /** payment tries */
  session_tries?: Maybe<Array<Maybe<SessionTryType>>>;
  /** sessions shaparak fee */
  shaparak_fee?: Maybe<Scalars['BigInteger']['output']>;
  /** status */
  status?: Maybe<SessionStatusEnum>;
  /** terminal */
  terminal?: Maybe<TerminalType>;
  /** The id of terminal */
  terminal_id: Scalars['ID']['output'];
  /** time line */
  timeline?: Maybe<SessionTimeLineType>;
  /** type */
  type?: Maybe<SessionTypeEnum>;
  /** session wage payout */
  wage_payouts?: Maybe<Array<Maybe<PayoutType>>>;
  /** wages. */
  wages?: Maybe<Scalars['String']['output']>;
};

/** Session type enum */
export enum SessionTypeEnum {
  Addfund = 'ADDFUND',
  Bill = 'BILL',
  DirectDebit = 'DIRECT_DEBIT',
  Disputed = 'DISPUTED',
  Personallink = 'PERSONALLINK',
  Posgate = 'POSGATE',
  Requestmoney = 'REQUESTMONEY',
  ReturnedInstantPayout = 'RETURNED_INSTANT_PAYOUT',
  TwoStep = 'TWO_STEP',
  Ussdgate = 'USSDGATE',
  Zarinak = 'ZARINAK',
  Zaringate = 'ZARINGATE',
  Zarinlink = 'ZARINLINK',
}

/** A type representing a session type */
export type SessionTypeType = {
  __typename?: 'SessionTypeType';
  /** The name of the session type */
  name?: Maybe<SessionTypeEnum>;
};

/** Signature query type */
export type SignatureType = {
  __typename?: 'SignatureType';
  /** Signature content */
  content?: Maybe<Scalars['String']['output']>;
  /** Signature id */
  id: Scalars['ID']['output'];
};

/** SocialInfo type */
export type SocialInfoType = {
  __typename?: 'SocialInfoType';
  /** true if it's is active */
  active?: Maybe<Scalars['Boolean']['output']>;
  /** SocialInfo service */
  type?: Maybe<Scalars['String']['output']>;
};

/** Social input */
export type SocialInput = {
  /** Aparat channel */
  aparat?: InputMaybe<Scalars['String']['input']>;
  /** Discord ID */
  discord?: InputMaybe<Scalars['String']['input']>;
  /** ETA handle */
  eta?: InputMaybe<Scalars['String']['input']>;
  /** Facebook username */
  facebook?: InputMaybe<Scalars['String']['input']>;
  /** GitHub username */
  github?: InputMaybe<Scalars['String']['input']>;
  /** Instagram username */
  instagram?: InputMaybe<Scalars['String']['input']>;
  /** LinkedIn profile */
  linkedin?: InputMaybe<Scalars['String']['input']>;
  /** Telegram username */
  telegram?: InputMaybe<Scalars['String']['input']>;
  /** Twitter username */
  twitter?: InputMaybe<Scalars['String']['input']>;
  /** WhatsApp contact */
  whatsapp?: InputMaybe<Scalars['String']['input']>;
  /** YouTube channel */
  youtube?: InputMaybe<Scalars['String']['input']>;
};

/** Social type */
export type SocialType = {
  __typename?: 'SocialType';
  /** Aparat channel */
  aparat?: Maybe<Scalars['String']['output']>;
  /** Discord ID */
  discord?: Maybe<Scalars['String']['output']>;
  /** ETA handle */
  eta?: Maybe<Scalars['String']['output']>;
  /** Facebook username */
  facebook?: Maybe<Scalars['String']['output']>;
  /** GitHub username */
  github?: Maybe<Scalars['String']['output']>;
  /** Instagram username */
  instagram?: Maybe<Scalars['String']['output']>;
  /** LinkedIn profile */
  linkedin?: Maybe<Scalars['String']['output']>;
  /** Telegram username */
  telegram?: Maybe<Scalars['String']['output']>;
  /** Twitter username */
  twitter?: Maybe<Scalars['String']['output']>;
  /** WhatsApp contact */
  whatsapp?: Maybe<Scalars['String']['output']>;
  /** YouTube channel */
  youtube?: Maybe<Scalars['String']['output']>;
};

/** SshInfo type */
export type SshInfoType = {
  __typename?: 'SshInfoType';
  /** bcn */
  bcn?: Maybe<Scalars['String']['output']>;
  /** bcn */
  bcs?: Maybe<Scalars['String']['output']>;
  /** bcsl */
  bcsl?: Maybe<Scalars['String']['output']>;
  /** bcsn */
  bcsn?: Maybe<Scalars['String']['output']>;
};

/** suggest answer type */
export type SuggestAnswerType = {
  __typename?: 'SuggestAnswerType';
  /** suggest`s title */
  content?: Maybe<Scalars['String']['output']>;
  /** suggest`s id */
  relation_id?: Maybe<Scalars['ID']['output']>;
  /** suggest`s type */
  relation_key?: Maybe<Scalars['ID']['output']>;
  /** suggest`s title */
  title?: Maybe<Scalars['String']['output']>;
  /** suggest`s url */
  url?: Maybe<Scalars['String']['output']>;
};

export enum TaxTypeEnum {
  Inquiry = 'INQUIRY',
  Register = 'REGISTER',
}

/** Branding setting input */
export type TerminalBrandingSettingInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  contacts?: InputMaybe<TerminalContactsInput>;
  template?: InputMaybe<TerminalTemplateSettingInput>;
};

/** Branding setting type */
export type TerminalBrandingSettingType = {
  __typename?: 'TerminalBrandingSettingType';
  /** Bio */
  bio?: Maybe<Scalars['String']['output']>;
  /** Contacts */
  contacts?: Maybe<TerminalContactsType>;
  /** Template */
  template?: Maybe<TerminalTemplateSettingType>;
};

/** terminal type */
export type TerminalCategoryType = {
  __typename?: 'TerminalCategoryType';
  /** category identifier */
  category_identifier?: Maybe<Scalars['ID']['output']>;
  /** Children */
  children?: Maybe<Array<Maybe<TerminalCategoryType>>>;
  /** id */
  id: Scalars['ID']['output'];
  /** parent category id */
  parent_id?: Maybe<Scalars['ID']['output']>;
  /** slug */
  slug?: Maybe<Scalars['String']['output']>;
  /** title */
  title?: Maybe<Scalars['String']['output']>;
};

/** Terminal chn fee type enum */
export enum TerminalChnTypeEnum {
  Session = 'SESSION',
  Wallet = 'WALLET',
}

/** Terminal Cms enum */
export enum TerminalCmsEnum {
  Drupal = 'DRUPAL',
  Joomla = 'JOOMLA',
  Magento = 'MAGENTO',
  Mybb = 'MYBB',
  Opencart = 'OPENCART',
  Prestashop = 'PRESTASHOP',
  Unknown = 'UNKNOWN',
  Wordpress = 'WORDPRESS',
  Xenforo = 'XENFORO',
}

/** Contacts input */
export type TerminalContactsInput = {
  /** address */
  address?: InputMaybe<Scalars['String']['input']>;
  /** email */
  email?: InputMaybe<Scalars['String']['input']>;
  /** phone */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** primary color */
  socials?: InputMaybe<SocialInput>;
};

/** Contacts input */
export type TerminalContactsType = {
  __typename?: 'TerminalContactsType';
  /** address */
  address?: Maybe<Scalars['String']['output']>;
  /** secondary color */
  email?: Maybe<Scalars['String']['output']>;
  /** primary color */
  phone?: Maybe<Scalars['String']['output']>;
  /** primary color */
  socials?: Maybe<SocialType>;
};

/** terminal  contract detail type */
export type TerminalContractDetailType = {
  __typename?: 'TerminalContractDetailType';
  /** Get Terminal contract created date */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** Get Terminal contract domain */
  domain?: Maybe<Scalars['String']['output']>;
  /** Get Terminal contract full name */
  full_name?: Maybe<Scalars['String']['output']>;
  /** Get Terminal contract national code */
  national_code?: Maybe<Scalars['String']['output']>;
  /** Get Terminal contract phone */
  phone?: Maybe<Scalars['String']['output']>;
  /** Get Terminal contract uuid */
  uuid?: Maybe<Scalars['String']['output']>;
};

/** terminal  contract type */
export type TerminalContractType = {
  __typename?: 'TerminalContractType';
  /** Get Terminal contract details */
  context?: Maybe<Scalars['String']['output']>;
};

export enum TerminalCustomerStrategyEnum {
  Disable = 'DISABLE',
  Email = 'EMAIL',
  Mobile = 'MOBILE',
}

/** terminal  customers type */
export type TerminalCustomerType = {
  __typename?: 'TerminalCustomerType';
  /** created date-time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** The custom id of  customer */
  custom_id?: Maybe<Scalars['ID']['output']>;
  /** The email of  customer */
  email?: Maybe<Scalars['String']['output']>;
  first_session_date?: Maybe<Scalars['DateTime']['output']>;
  /** id */
  id?: Maybe<Scalars['ID']['output']>;
  last_session_date?: Maybe<Scalars['DateTime']['output']>;
  /** The method of detecting customer */
  method?: Maybe<TerminalFeeTypeEnum>;
  /** The mobile number of  customer */
  mobile?: Maybe<Scalars['CellNumber']['output']>;
  /** The name of customer */
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Array<Maybe<NoteType>>>;
  /** terminal sessions */
  sessions?: Maybe<Array<Maybe<SessionType>>>;
  /** terminal sessions count */
  sessions_count?: Maybe<Scalars['Int']['output']>;
  /** terminal sessions sum */
  sessions_sum?: Maybe<Scalars['Int']['output']>;
};

/** Default form setting input */
export type TerminalDefaultFormType = {
  __typename?: 'TerminalDefaultFormType';
  required_fields?: Maybe<Array<Maybe<ZarinLinkRequiredFieldsOutput>>>;
};

/** terminal domain type */
export type TerminalDomainType = {
  __typename?: 'TerminalDomainType';
  /** cms */
  cms?: Maybe<TerminalCmsEnum>;
  /** site description */
  description?: Maybe<Scalars['String']['output']>;
  /** site title */
  title?: Maybe<Scalars['String']['output']>;
  /** type */
  type?: Maybe<TerminalTypeEnum>;
};

/** Terminal fee type enum */
export enum TerminalFeeTypeEnum {
  Merchant = 'MERCHANT',
  Payer = 'PAYER',
}

/** Flags of terminals */
export enum TerminalFlagEnum {
  Normal = 'NORMAL',
  PersonalLink = 'PERSONAL_LINK',
}

/** Terminal permission enum */
export enum TerminalPermissionEnum {
  Coupon = 'COUPON',
  CouponEdit = 'COUPON_EDIT',
  InstantPayout = 'INSTANT_PAYOUT',
  InstantPayoutEdit = 'INSTANT_PAYOUT_EDIT',
  Investment = 'INVESTMENT',
  InvestmentEdit = 'INVESTMENT_EDIT',
  Invoice = 'INVOICE',
  InvoiceEdit = 'INVOICE_EDIT',
  NoteEdit = 'NOTE_EDIT',
  Payout = 'PAYOUT',
  PayoutEdit = 'PAYOUT_EDIT',
  Product = 'PRODUCT',
  ProductEdit = 'PRODUCT_EDIT',
  Reconcile = 'RECONCILE',
  ReconcileEdit = 'RECONCILE_EDIT',
  Refund = 'REFUND',
  RefundEdit = 'REFUND_EDIT',
  Session = 'SESSION',
  SessionEdit = 'SESSION_EDIT',
  SettingEdit = 'SETTING_EDIT',
  TerminalEdit = 'TERMINAL_EDIT',
  WagePayout = 'WAGE_PAYOUT',
  Zarinlink = 'ZARINLINK',
  ZarinlinkEdit = 'ZARINLINK_EDIT',
}

/** The reason for the rejection of the Terminal */
export enum TerminalRejectionDueEnum {
  Enamad = 'ENAMAD',
  Other = 'OTHER',
}

/** redirect setting input */
export type TerminalSettingRedirectInput = {
  /** fail redirect url */
  fail_url?: InputMaybe<Scalars['String']['input']>;
  /** success redirect url */
  success_url?: InputMaybe<Scalars['String']['input']>;
};

/** redirect setting type */
export type TerminalSettingRedirectType = {
  __typename?: 'TerminalSettingRedirectType';
  /** fail redirect url */
  fail_url?: Maybe<Scalars['String']['output']>;
  /** success redirect url */
  success_url?: Maybe<Scalars['String']['output']>;
};

/** After payment setting type */
export type TerminalSettingZarinLinkAfterPaymentType = {
  __typename?: 'TerminalSettingZarinLinkAfterPaymentType';
  default_option?: Maybe<TerminalSettingZarinLinkDefaultOptionAfterPaymentEnum>;
  receipt?: Maybe<ZarinLinkCustomOptionType>;
  redirect?: Maybe<TerminalSettingRedirectType>;
};

/** Terminal type enum */
export enum TerminalSettingZarinLinkDefaultOptionAfterPaymentEnum {
  Receipt = 'RECEIPT',
  Redirect = 'REDIRECT',
}

/** Terminal status enum */
export enum TerminalStatusEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING',
  PendingShaparak = 'PENDING_SHAPARAK',
  Rejected = 'REJECTED',
  RejectedShaparak = 'REJECTED_SHAPARAK',
  Suspend = 'SUSPEND',
}

/** Branding setting input */
export type TerminalTemplateSettingInput = {
  /** primary color */
  primary_color?: InputMaybe<Scalars['String']['input']>;
  /** secondary color */
  secondary_color?: InputMaybe<Scalars['String']['input']>;
};

/** Branding setting type */
export type TerminalTemplateSettingType = {
  __typename?: 'TerminalTemplateSettingType';
  /** primary color */
  primary_color?: Maybe<Scalars['String']['output']>;
  /** secondary color */
  secondary_color?: Maybe<Scalars['String']['output']>;
};

/** terminal type */
export type TerminalType = {
  __typename?: 'TerminalType';
  /** terminal active psp */
  active_psp?: Maybe<Array<Maybe<ZarinGateType>>>;
  address?: Maybe<AddressType>;
  /** user payout access */
  can_payout?: Maybe<Scalars['Boolean']['output']>;
  category?: Maybe<TerminalCategoryType>;
  /** terminal chn types */
  chn_type?: Maybe<TerminalChnTypeEnum>;
  /** contract type */
  contracts?: Maybe<Array<Maybe<TerminalContractDetailType>>>;
  /** created date-time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  customer_strategy?: Maybe<TerminalCustomerStrategyEnum>;
  day_transactions?: Maybe<DayTransactionsType>;
  /** deleted date-time */
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  /** description */
  description?: Maybe<Scalars['String']['output']>;
  /** associated domain */
  domain?: Maybe<Scalars['String']['output']>;
  /** enamad expiration date */
  enamad_expire_date?: Maybe<Scalars['Date']['output']>;
  /** enamad inquiry history */
  enamad_inquiry_history?: Maybe<EnamadHistoryType>;
  /** enamad request history */
  enamad_register_history?: Maybe<EnamadHistoryType>;
  /** fee group */
  fee_group?: Maybe<FeeGroupType>;
  /** terminal fee types */
  fee_type?: Maybe<TerminalFeeTypeEnum>;
  /** terminal flag. its for somethings like personal link */
  flag?: Maybe<TerminalFlagEnum>;
  /** Terminal`s have logo */
  have_logo?: Maybe<Scalars['Boolean']['output']>;
  /** id */
  id: Scalars['ID']['output'];
  income_chart?: Maybe<Array<Maybe<IncomeChartType>>>;
  /** is default */
  is_default?: Maybe<Scalars['Boolean']['output']>;
  /** terminal key */
  key?: Maybe<Scalars['ID']['output']>;
  /** Terminal`s logo */
  logo?: Maybe<Scalars['String']['output']>;
  /** terminal max amount */
  max_amount?: Maybe<Scalars['Int']['output']>;
  /** 16 digit pan number */
  mcc_id?: Maybe<Scalars['ID']['output']>;
  /** name */
  name?: Maybe<Scalars['String']['output']>;
  /** should probably buy enamad */
  needs_buy_enamad?: Maybe<Scalars['Boolean']['output']>;
  notes?: Maybe<Array<Maybe<NoteType>>>;
  /** Notify user to set terminal preferred account. */
  notify_set_reconcile?: Maybe<Scalars['Boolean']['output']>;
  /** The id of terminal holder */
  owner_id?: Maybe<Scalars['ID']['output']>;
  /** access list */
  permissions?: Maybe<Array<Maybe<TerminalPermissionEnum>>>;
  /** pin */
  pin?: Maybe<Scalars['Int']['output']>;
  /** preferred bank account to reconcile to. */
  preferred_bank_account_id?: Maybe<Scalars['ID']['output']>;
  /** terminal psp priority */
  psp_priority?: Maybe<Array<Maybe<ZarinGateType>>>;
  /** terminal reconcile priority */
  reconcile_priority?: Maybe<ReconcileCycleTypeEnum>;
  /** reconcile status */
  reconcile_status?: Maybe<ReconcileStatusType>;
  reconcile_type?: Maybe<ReconcileTypeEnum>;
  reconcile_wage_type?: Maybe<ReconcileWageTypeEnum>;
  /** refund active */
  refund_active?: Maybe<Scalars['Boolean']['output']>;
  /** terminal predefined response for reject status */
  reject_reason?: Maybe<Array<Maybe<PredefinedResponseType>>>;
  rejection_due?: Maybe<TerminalRejectionDueEnum>;
  /** personal link required fields */
  required_fields?: Maybe<Array<Maybe<PersonalLinkRequiredFieldsOutputType>>>;
  /** server ip */
  server_ip?: Maybe<Scalars['IP']['output']>;
  /** status */
  status?: Maybe<TerminalStatusEnum>;
  /** support phone number */
  support_phone?: Maybe<Scalars['CellNumber']['output']>;
  today_session?: Maybe<ChartCountAmountType>;
  /** updated date-time */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  /** terminal fee types */
  verify_type?: Maybe<VerifyTypeEnum>;
  yesterday_session?: Maybe<ChartCountAmountType>;
  /** terminal zarin gate status */
  zarin_gate?: Maybe<Array<Maybe<ZarinGateType>>>;
};

/** Terminal type enum */
export enum TerminalTypeEnum {
  ApproveList = 'APPROVE_LIST',
  BlackList = 'BLACK_LIST',
  ModifyList = 'MODIFY_LIST',
  SocialList = 'SOCIAL_LIST',
  WhiteList = 'WHITE_LIST',
}

/** terminal  users type */
export type TerminalUserType = {
  __typename?: 'TerminalUserType';
  /** access list */
  access_list?: Maybe<Array<Maybe<TerminalPermissionEnum>>>;
  /** id */
  id?: Maybe<Scalars['ID']['output']>;
  /** terminal id */
  terminal_id?: Maybe<Scalars['ID']['output']>;
  /** The name of  user */
  user_avatar?: Maybe<Scalars['String']['output']>;
  /** The id of  user */
  user_id?: Maybe<Scalars['ID']['output']>;
  /** The name of  user */
  user_name?: Maybe<Scalars['String']['output']>;
};

/** ticket department type */
export type TicketDepartmentType = {
  __typename?: 'TicketDepartmentType';
  /** Ticket_reply id */
  id: Scalars['ID']['output'];
  /** description */
  title?: Maybe<Scalars['String']['output']>;
  /** user_access */
  user_access?: Maybe<Scalars['Boolean']['output']>;
  weight?: Maybe<Scalars['Int']['output']>;
};

/** Ticket Feedback Type Enum */
export enum TicketFeedbackTypeEnum {
  Good = 'GOOD',
  Happy = 'HAPPY',
  Neutral = 'NEUTRAL',
  None = 'NONE',
  Perfect = 'PERFECT',
  Poor = 'POOR',
  Sad = 'SAD',
}

/** Ticket priority */
export enum TicketPriorityEnum {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
}

/** Ticket Reply Feedback Type Enum */
export enum TicketReplyFeedbackTypeEnum {
  Disrespectful = 'DISRESPECTFUL',
  Helpful = 'HELPFUL',
  Insufficient = 'INSUFFICIENT',
  Irrelevant = 'IRRELEVANT',
  None = 'NONE',
}

/** Ticket reply query type */
export type TicketReplyType = {
  __typename?: 'TicketReplyType';
  /** Ticket_reply attachment */
  attachment?: Maybe<Scalars['String']['output']>;
  /** Ticket_reply content */
  content?: Maybe<Scalars['String']['output']>;
  /** Ticket_reply created date-time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** Ticket_reply feedback_type */
  feedback_type?: Maybe<TicketReplyFeedbackTypeEnum>;
  /** Ticket_reply id */
  id: Scalars['ID']['output'];
  /** Ticket_reply main ticket id */
  ticket_id?: Maybe<Scalars['ID']['output']>;
  /** Ticket_reply updated date-time */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  /** Ticket_reply user info */
  user?: Maybe<UserPublicType>;
};

/** Ticket status enum */
export enum TicketStatusEnum {
  All = 'ALL',
  Closed = 'CLOSED',
  InProgress = 'IN_PROGRESS',
  New = 'NEW',
  SupportResponse = 'SUPPORT_RESPONSE',
}

/** Ticket type */
export type TicketType = {
  __typename?: 'TicketType';
  /** assigned user to ticket */
  assigned_user?: Maybe<UserPublicType>;
  /** Ticket`s created date-time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** Ticket department */
  department?: Maybe<TicketDepartmentType>;
  /** Ticket_reply feedback_type */
  feedback_type?: Maybe<TicketFeedbackTypeEnum>;
  /** Ticket`s first user seen status */
  first_user_seen?: Maybe<Scalars['Boolean']['output']>;
  /** ticket flag */
  flag?: Maybe<Scalars['String']['output']>;
  /** Ticket id */
  id?: Maybe<Scalars['ID']['output']>;
  /** related model id */
  model_id?: Maybe<Scalars['ID']['output']>;
  /** related model */
  model_type?: Maybe<Scalars['String']['output']>;
  /** Ticket`s priority */
  priority?: Maybe<TicketPriorityEnum>;
  /** Ticket_reply rate */
  rate?: Maybe<Scalars['Int']['output']>;
  /** Ticket replies */
  replies?: Maybe<Array<Maybe<TicketReplyType>>>;
  /** second user of ticket */
  second_user?: Maybe<UserPublicType>;
  /** Ticket`s second user seen status */
  second_user_seen?: Maybe<Scalars['Boolean']['output']>;
  /** Ticket`s status */
  status?: Maybe<TicketStatusEnum>;
  /** Ticket`s department */
  ticket_department_id?: Maybe<Scalars['ID']['output']>;
  /** Ticket`s title */
  title?: Maybe<Scalars['String']['output']>;
  /** Ticket`s updated date-time */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

/** get server time */
export type TimeType = {
  __typename?: 'TimeType';
  /** current date-time */
  current_time?: Maybe<Scalars['DateTime']['output']>;
};

/** Transaction List representing a transaction in Elasticsearch. */
export type TransactionListType = {
  __typename?: 'TransactionListType';
  limit?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
  transactions?: Maybe<Array<Maybe<TransactionType>>>;
};

/** Transaction Status Enum */
export enum TransactionStatusEnum {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Success = 'SUCCESS',
}

/** Transaction type representing a session in Elasticsearch. */
export type TransactionType = {
  __typename?: 'TransactionType';
  /** The amount of the transaction. */
  amount?: Maybe<Scalars['Int']['output']>;
  /** The callback URL for the transaction. */
  callback_url?: Maybe<Scalars['String']['output']>;
  /** The timestamp when the transaction was created. */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** The description of the transaction. */
  description?: Maybe<Scalars['String']['output']>;
  /** The timestamp when the transaction expires. */
  expire_in?: Maybe<Scalars['DateTime']['output']>;
  /** The ID of the transaction. */
  id: Scalars['Int']['output'];
  /** The pan number of the transaction. */
  pan?: Maybe<Scalars['String']['output']>;
  /** The referer URL for the transaction. */
  referer_url?: Maybe<Scalars['String']['output']>;
  /** The server IP associated with the transaction. */
  server_ip?: Maybe<Scalars['String']['output']>;
  /** The timestamp when the transaction was settled. */
  settled_at?: Maybe<Scalars['DateTime']['output']>;
  /** The status of the transaction (e.g., Verified). */
  status?: Maybe<Scalars['String']['output']>;
  /** The ID of the terminal associated with the transaction. */
  terminal?: Maybe<CustomersTerminalType>;
  /** type of transaction. */
  type?: Maybe<Scalars['String']['output']>;
  /** The timestamp when the transaction was last updated. */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

/** graphQl error messages type */
export type Translation = {
  __typename?: 'Translation';
  /** english error message */
  en?: Maybe<Scalars['String']['output']>;
  /** farsi error message */
  fa?: Maybe<Scalars['String']['output']>;
  /** key of error message */
  key?: Maybe<Scalars['String']['output']>;
};

/** data of two day chart  */
export type TwoDayChartType = {
  __typename?: 'TwoDayChartType';
  /** data of chart */
  other_day?: Maybe<Array<Maybe<DayTransactionsDetailsType>>>;
  /** data of chart */
  today?: Maybe<Array<Maybe<DayTransactionsDetailsType>>>;
};

export type UserAnnouncementType = {
  __typename?: 'UserAnnouncementType';
  created_at?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type?: Maybe<Array<Maybe<UserAnnouncementTypeEnum>>>;
  url?: Maybe<Scalars['String']['output']>;
  url_title?: Maybe<Scalars['String']['output']>;
};

/** user announcemen type enum */
export enum UserAnnouncementTypeEnum {
  TypeAll = 'TYPE_ALL',
  TypeBasicUser = 'TYPE_BASIC_USER',
  TypeGoldUser = 'TYPE_GOLD_USER',
  TypeNewUser = 'TYPE_NEW_USER',
  TypeShaparaTerminal = 'TYPE_SHAPARA_TERMINAL',
  TypeSilverUser = 'TYPE_SILVER_USER',
  TypeVipPlusUser = 'TYPE_VIP_PLUS_USER',
  TypeVipUser = 'TYPE_VIP_USER',
  TypeWalletTerminal = 'TYPE_WALLET_TERMINAL',
  TypeZarinpalEmployee = 'TYPE_ZARINPAL_EMPLOYEE',
}

/** user level enum */
export enum UserLevelEnum {
  Admin = 'ADMIN',
  Basic = 'BASIC',
  Blue = 'BLUE',
  Gold = 'GOLD',
  New = 'NEW',
  Silver = 'SILVER',
}

/** User notification preferences type */
export type UserNotificationPreferencesType = {
  __typename?: 'UserNotificationPreferencesType';
  /** notification channel */
  channels: Array<Maybe<NotificationPreferenceChannelEnum>>;
  /** notification type */
  type: NotificationPreferenceTypeEnum;
};

/** User type */
export type UserPublicType = {
  __typename?: 'UserPublicType';
  /** user avatar */
  avatar?: Maybe<Scalars['String']['output']>;
  /** company name */
  company_name?: Maybe<Scalars['String']['output']>;
  /** user id */
  id: Scalars['ID']['output'];
  /** operator */
  is_operator?: Maybe<Scalars['Boolean']['output']>;
  /** user avatar */
  managed_avatar?: Maybe<Scalars['String']['output']>;
  /** user name */
  name?: Maybe<Scalars['String']['output']>;
};

/** referred user type */
export type UserReferred = {
  __typename?: 'UserReferred';
  /** user name */
  avatar?: Maybe<Scalars['String']['output']>;
  /** sum_commission */
  commission: Scalars['Int']['output'];
  /** user id */
  id: Scalars['ID']['output'];
  /** user name */
  last_session_time?: Maybe<Scalars['Date']['output']>;
  /** User level */
  level?: Maybe<UserLevelEnum>;
  /** user name */
  name?: Maybe<Scalars['String']['output']>;
  /** user name */
  registered_at?: Maybe<Scalars['Date']['output']>;
};

export type UserTaxRegisterType = {
  __typename?: 'UserTaxRegisterType';
  errorMessage?: Maybe<Scalars['String']['output']>;
  errorStatus?: Maybe<Scalars['String']['output']>;
  followCode?: Maybe<Scalars['String']['output']>;
  shahkarValid?: Maybe<Scalars['String']['output']>;
  tprID?: Maybe<Scalars['String']['output']>;
  trackingNumber?: Maybe<Scalars['String']['output']>;
};

/** A type */
export type UserType = {
  __typename?: 'UserType';
  /** User additional identification info */
  additional_identification_info?: Maybe<AdditionalIdentificationInfoType>;
  /** addresses */
  addresses?: Maybe<Array<Maybe<AddressType>>>;
  /** user name */
  avatar?: Maybe<Scalars['String']['output']>;
  /** birthday */
  birthday?: Maybe<Scalars['Date']['output']>;
  can_handle_edit_permissions?: Maybe<Scalars['Boolean']['output']>;
  /** primary cell number. */
  cell_number?: Maybe<Scalars['CellNumber']['output']>;
  /** company name */
  company_name?: Maybe<Scalars['String']['output']>;
  /** company register id */
  company_register_id?: Maybe<Scalars['String']['output']>;
  /** company registered time */
  company_registered_at?: Maybe<Scalars['Date']['output']>;
  /** company rid */
  company_rid?: Maybe<Scalars['ID']['output']>;
  /** User ip country code */
  country_code?: Maybe<Scalars['String']['output']>;
  /** User created date-time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** data status */
  data_status?: Maybe<DataStatusType>;
  /** email */
  email?: Maybe<Scalars['String']['output']>;
  encrypted_id?: Maybe<Scalars['String']['output']>;
  /** first_name */
  first_name?: Maybe<Scalars['String']['output']>;
  /** User full name */
  full_name?: Maybe<Scalars['String']['output']>;
  /** gender */
  gender?: Maybe<GenderEnum>;
  /** The id of user */
  id: Scalars['ID']['output'];
  /** Purchase Enamad */
  is_enamad_flow?: Maybe<Scalars['Boolean']['output']>;
  /** User suspend status */
  is_suspend?: Maybe<Scalars['Boolean']['output']>;
  /** last_name */
  last_name?: Maybe<Scalars['String']['output']>;
  /** User level */
  level?: Maybe<UserLevelEnum>;
  /** User login ip */
  login_ip?: Maybe<Scalars['String']['output']>;
  /** mail subscription */
  mail_subscription?: Maybe<Scalars['Boolean']['output']>;
  /** New panel */
  new_panel?: Maybe<Scalars['Boolean']['output']>;
  /** User next level */
  next_level?: Maybe<Scalars['String']['output']>;
  /** User next level steps */
  next_level_step?: Maybe<Scalars['String']['output']>;
  /** show user preferences details */
  notification_preferences?: Maybe<Array<Maybe<UserNotificationPreferencesType>>>;
  /** User permissions */
  permissions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** user personal link */
  personal_link?: Maybe<TerminalType>;
  /** user referral system unique id */
  referral_id?: Maybe<Scalars['String']['output']>;
  /** referrer user id */
  referrer_user_id?: Maybe<Scalars['ID']['output']>;
  /** fetch all user referred */
  referrers?: Maybe<Array<Maybe<UserPublicType>>>;
  /** User roles */
  roles?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** user signature */
  signature?: Maybe<SignatureType>;
  /** show user social info details */
  social_info?: Maybe<Array<Maybe<SocialInfoType>>>;
  /** social security number */
  ssn?: Maybe<Scalars['String']['output']>;
  /** Support */
  support?: Maybe<UserType>;
  tax_id?: Maybe<Scalars['String']['output']>;
  /** user terminals */
  terminals?: Maybe<Array<Maybe<TerminalType>>>;
  username?: Maybe<Scalars['String']['output']>;
  /** User verification step step */
  verification_step?: Maybe<VerificationStepType>;
  /** Verification */
  verifications?: Maybe<Array<Maybe<VerificationOutputType>>>;
  /** User vip level */
  vip_level?: Maybe<UserVipLevelEnum>;
  /** unique uuid for detect user in web socket connection */
  ws_id?: Maybe<Scalars['String']['output']>;
};

/** verification type enum */
export enum UserVerificationTypeEnum {
  Address = 'ADDRESS',
  Birthday = 'BIRTHDAY',
  CivilInquiry = 'CIVIL_INQUIRY',
  Connect = 'CONNECT',
  LegalDocuments = 'LEGAL_DOCUMENTS',
  Mail = 'MAIL',
  NationalCardDocuments = 'NATIONAL_CARD_DOCUMENTS',
  NationalCode = 'NATIONAL_CODE',
  PostalCode = 'POSTAL_CODE',
  SelfieDocuments = 'SELFIE_DOCUMENTS',
  Shahkar = 'SHAHKAR',
  Sms = 'SMS',
  Ssn = 'SSN',
}

/** user vip level enum */
export enum UserVipLevelEnum {
  Level_1 = 'LEVEL_1',
  Level_2 = 'LEVEL_2',
  Level_3 = 'LEVEL_3',
  Regular = 'REGULAR',
}

/** verification type */
export type VerificationInputType = {
  /** verification data */
  data?: InputMaybe<Scalars['String']['input']>;
  /** verification type */
  type?: InputMaybe<UserVerificationTypeEnum>;
  /** true if it's is verified */
  verify?: InputMaybe<Scalars['Boolean']['input']>;
};

/** verification type */
export type VerificationOutputType = {
  __typename?: 'VerificationOutputType';
  /** verification data */
  data?: Maybe<Scalars['String']['output']>;
  /** verification type */
  type?: Maybe<UserVerificationTypeEnum>;
  /** true if it's is verified */
  verify?: Maybe<Scalars['Boolean']['output']>;
};

/** verification step and status */
export type VerificationStepType = {
  __typename?: 'VerificationStepType';
  /** status of step */
  status?: Maybe<Scalars['String']['output']>;
  /** step of verification */
  step?: Maybe<Scalars['String']['output']>;
};

/** verify otp contract confirm type */
export type VerifyOtpContractConfirmType = {
  __typename?: 'VerifyOtpContractConfirmType';
  /** Additional message related to the confirmation */
  message?: Maybe<Scalars['String']['output']>;
  /** Status of the contract confirmation process */
  status: Scalars['Boolean']['output'];
  /** UUID of the contract confirmation process */
  uuid?: Maybe<Scalars['String']['output']>;
};

/** Terminal verify Type Enum */
export enum VerifyTypeEnum {
  Automated = 'AUTOMATED',
  Manual = 'MANUAL',
}

/** Zarin Card Add Type */
export type ZarinCardAddType = {
  __typename?: 'ZarinCardAddType';
  /** status */
  status?: Maybe<Scalars['String']['output']>;
  /** url */
  url?: Maybe<Scalars['String']['output']>;
};

/** Zarin Card Branch Type */
export type ZarinCardBranchType = {
  __typename?: 'ZarinCardBranchType';
  /** address */
  address?: Maybe<Scalars['String']['output']>;
  /** branch_id */
  branch_id?: Maybe<Scalars['Int']['output']>;
  /** name */
  name?: Maybe<Scalars['String']['output']>;
};

/** Zarin Card Verify Payment Type */
export type ZarinCardVerifyPayment = {
  __typename?: 'ZarinCardVerifyPayment';
  /** ref_id */
  ref_id?: Maybe<Scalars['String']['output']>;
  /** status */
  status?: Maybe<Scalars['String']['output']>;
};

/** list of zarin gate */
export type ZarinGateType = {
  __typename?: 'ZarinGateType';
  /** zarin gate deleted date-time */
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  /** does not send or not */
  dont_send_tax?: Maybe<Scalars['Boolean']['output']>;
  /** zarin gate error */
  error?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** zarin gate merchant_id */
  merchant_id?: Maybe<Scalars['String']['output']>;
  /** Payment */
  payment?: Maybe<PaymentType>;
  /** zarin gate psp */
  psp?: Maybe<Scalars['String']['output']>;
  /** zarin gate status */
  status?: Maybe<PaymentTerminalStatusEnum>;
  /** zarin gate status */
  system_status?: Maybe<TerminalStatusEnum>;
  /** zarin gate terminal_id */
  terminal_id?: Maybe<Scalars['String']['output']>;
};

/** in progress , pending  reconcile sum and count */
export type ZarinLinkAggregateTransactionsType = {
  __typename?: 'ZarinLinkAggregateTransactionsType';
  all?: Maybe<ZarinLinkCountAmountType>;
  current_day?: Maybe<ZarinLinkCountAmountType>;
  current_month?: Maybe<ZarinLinkCountAmountType>;
};

/** Aggregate zarin link type enum */
export enum ZarinLinkAggregateTypeEnum {
  All = 'ALL',
  CurrentDay = 'CURRENT_DAY',
  CurrentMonth = 'CURRENT_MONTH',
}

/** zarin links amount type enum */
export enum ZarinLinkAmountTypeEnum {
  Fix = 'FIX',
  Optional = 'OPTIONAL',
}

/** A type for categories */
export type ZarinLinkCategory = {
  __typename?: 'ZarinLinkCategory';
  /** The subcategories of this category */
  children?: Maybe<Array<Maybe<ZarinLinkCategory>>>;
  /** The ID of the category */
  id?: Maybe<Scalars['ID']['output']>;
  /** The parent category of this category */
  parent?: Maybe<ZarinLinkCategory>;
  /** The name of the category */
  slug?: Maybe<Scalars['String']['output']>;
  /** The name of the category */
  title?: Maybe<Scalars['String']['output']>;
  /** The type of the category */
  type?: Maybe<CategoryTypeEnum>;
};

/** in progress , pending  reconcile sum and count */
export type ZarinLinkCountAmountType = {
  __typename?: 'ZarinLinkCountAmountType';
  /** sum amount */
  amount?: Maybe<Scalars['BigInteger']['output']>;
  /** count */
  count?: Maybe<Scalars['BigInteger']['output']>;
};

/** customize options input */
export type ZarinLinkCustomOptionInput = {
  /** receipt button url */
  receipt_button_url?: InputMaybe<Scalars['String']['input']>;
  /** receipt text message */
  receipt_message_text?: InputMaybe<Scalars['String']['input']>;
  /** Use default value */
  use_default?: InputMaybe<Scalars['Boolean']['input']>;
};

/** zarin link customize option type */
export type ZarinLinkCustomOptionType = {
  __typename?: 'ZarinLinkCustomOptionType';
  /** receipt button url */
  receipt_button_url?: Maybe<Scalars['String']['output']>;
  /** receipt message text */
  receipt_message_text?: Maybe<Scalars['String']['output']>;
  /** Use default value */
  use_default?: Maybe<Scalars['Boolean']['output']>;
};

/** zarin links fetch filter enum */
export enum ZarinLinkFilterEnum {
  Active = 'ACTIVE',
  All = 'ALL',
  ProductEvent = 'PRODUCT_EVENT',
  Trash = 'TRASH',
}

/** meta data input */
export type ZarinLinkMetaDataInput = {
  /** address */
  address?: InputMaybe<Scalars['String']['input']>;
  /** city */
  city?: InputMaybe<Scalars['String']['input']>;
  /** end_date */
  end_date?: InputMaybe<Scalars['String']['input']>;
  /** end_time */
  end_time?: InputMaybe<Scalars['String']['input']>;
  /** event_type */
  event_type?: InputMaybe<EventTypeEnum>;
  /** province */
  province?: InputMaybe<Scalars['String']['input']>;
  /** start_date */
  start_date?: InputMaybe<Scalars['String']['input']>;
  /** start_time */
  start_time?: InputMaybe<Scalars['String']['input']>;
  /** target_amount */
  target_amount?: InputMaybe<Scalars['Int']['input']>;
  /** url */
  url?: InputMaybe<Scalars['String']['input']>;
};

/** meta  data type */
export type ZarinLinkMetaDataType = {
  __typename?: 'ZarinLinkMetaDataType';
  /** address */
  address?: Maybe<Scalars['String']['output']>;
  /** city */
  city?: Maybe<Scalars['String']['output']>;
  /** end_date */
  end_date?: Maybe<Scalars['String']['output']>;
  /** end_time */
  end_time?: Maybe<Scalars['String']['output']>;
  /** event_type */
  event_type?: Maybe<EventTypeEnum>;
  /** province */
  province?: Maybe<Scalars['String']['output']>;
  /** start_date */
  start_date?: Maybe<Scalars['String']['output']>;
  /** start_time */
  start_time?: Maybe<Scalars['String']['output']>;
  /** target_amount */
  target_amount?: Maybe<Scalars['Int']['output']>;
  /** url */
  url?: Maybe<Scalars['String']['output']>;
};

/** ZarinLink required fields type */
export type ZarinLinkRequiredFieldsInput = {
  /** Zarinlink required fields type */
  input?: InputMaybe<ZarinLinkRequiredFieldsInputEnum>;
  /** Zarinlink required field placeholder */
  placeholder?: InputMaybe<Scalars['String']['input']>;
  /** Zarinlink required fields status */
  status?: InputMaybe<ZarinLinkRequiredFieldsStatusEnum>;
};

/** required fields type enum */
export enum ZarinLinkRequiredFieldsInputEnum {
  Address = 'ADDRESS',
  CustomField_1 = 'CUSTOM_FIELD_1',
  CustomField_2 = 'CUSTOM_FIELD_2',
  Description = 'DESCRIPTION',
  Email = 'EMAIL',
  Mobile = 'MOBILE',
  Name = 'NAME',
}

/** ZarinLink required fields type */
export type ZarinLinkRequiredFieldsOutput = {
  __typename?: 'ZarinLinkRequiredFieldsOutput';
  /** Zarinlink required fields type */
  input?: Maybe<ZarinLinkRequiredFieldsInputEnum>;
  /** Zarinlink required field placeholder */
  placeholder?: Maybe<Scalars['String']['output']>;
  /** Zarinlink required fields status */
  status?: Maybe<ZarinLinkRequiredFieldsStatusEnum>;
};

/** Required fields type field status enum */
export enum ZarinLinkRequiredFieldsStatusEnum {
  Hidden = 'HIDDEN',
  Optional = 'OPTIONAL',
  Required = 'REQUIRED',
}

/** specification input */
export type ZarinLinkSpecificationInput = {
  /** key specification */
  key?: InputMaybe<Scalars['String']['input']>;
  /** value specification */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** specification type */
export type ZarinLinkSpecificationType = {
  __typename?: 'ZarinLinkSpecificationType';
  /** key specification */
  key: Scalars['String']['output'];
  /** value specification */
  value: Scalars['String']['output'];
};

/** ZarinLink type */
export type ZarinLinkType = {
  __typename?: 'ZarinLinkType';
  /** amount(in toman format) */
  amount?: Maybe<Scalars['BigInteger']['output']>;
  /** created date-time */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** deleted date-time */
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  /** description */
  description?: Maybe<Scalars['String']['output']>;
  /** failed redirect url */
  failed_redirect_url?: Maybe<Scalars['String']['output']>;
  /** form_id */
  form_id?: Maybe<Scalars['ID']['output']>;
  /** id */
  id: Scalars['ID']['output'];
  /** product images */
  images?: Maybe<Array<Maybe<FileType>>>;
  /** determine zarinLink has coupon or no */
  is_coupon_active?: Maybe<Scalars['Boolean']['output']>;
  /** limit */
  limit?: Maybe<Scalars['BigInteger']['output']>;
  /** link */
  link?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Array<Maybe<NoteType>>>;
  /** required fields */
  required_fields?: Maybe<Array<Maybe<ZarinLinkRequiredFieldsOutput>>>;
  /** show receipt option */
  show_receipt?: Maybe<Scalars['Boolean']['output']>;
  /** successful redirect url */
  successful_redirect_url?: Maybe<Scalars['String']['output']>;
  /** terminal id */
  terminal_id?: Maybe<Scalars['ID']['output']>;
  /** title */
  title?: Maybe<Scalars['String']['output']>;
  /** updated date-time */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

/** zarin links type enum */
export enum ZarinLinkTypeEnum {
  Payment = 'PAYMENT',
  Product = 'PRODUCT',
  Reservation = 'RESERVATION',
  Subscription = 'SUBSCRIPTION',
}

export type GetUserAccessTokensQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserAccessTokensQuery = {
  __typename?: 'Query';
  AccessTokens?: Array<{
    __typename?: 'AccessTokenType';
    id: string;
    client_id: string;
    client_type?: AccessTokenEnum | null;
    name?: string | null;
    avatar?: string | null;
    login_ip?: any | null;
    current?: boolean | null;
    country?: string | null;
    country_code?: string | null;
    updated_at?: any | null;
  } | null> | null;
};

export type AccessTokenRemoveMutationVariables = Exact<{
  token_id: Scalars['ID']['input'];
}>;

export type AccessTokenRemoveMutation = {
  __typename?: 'Mutation';
  AccessTokenRemove?: boolean | null;
};

export type PersonalAccessTokenMutationVariables = Exact<{
  token_name: Scalars['String']['input'];
}>;

export type PersonalAccessTokenMutation = {
  __typename?: 'Mutation';
  PersonalAccessToken?: {
    __typename?: 'AccessTokenType';
    id: string;
    personal_token?: string | null;
    client_name: string;
    client_type?: AccessTokenEnum | null;
    client_id: string;
    name?: string | null;
    login_ip?: any | null;
    country?: string | null;
    updated_at?: any | null;
  } | null;
};

export type AddressAddMutationVariables = Exact<{
  type: AddressTypeEnum;
  title?: InputMaybe<Scalars['String']['input']>;
  address: Scalars['String']['input'];
  landline: Scalars['String']['input'];
  postal_code: Scalars['String']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
}>;

export type AddressAddMutation = {
  __typename?: 'Mutation';
  AddressAdd?: {
    __typename?: 'AddressType';
    id: string;
    title?: string | null;
    address?: string | null;
    landline?: string | null;
    postal_code?: string | null;
  } | null;
};

export type AddressEditMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  type: AddressTypeEnum;
  title?: InputMaybe<Scalars['String']['input']>;
  address: Scalars['String']['input'];
  landline: Scalars['String']['input'];
  postal_code: Scalars['String']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
}>;

export type AddressEditMutation = {
  __typename?: 'Mutation';
  AddressEdit?: {
    __typename?: 'AddressType';
    id: string;
    title?: string | null;
    address?: string | null;
    landline?: string | null;
    postal_code?: string | null;
  } | null;
};

export type GetUserAddressQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserAddressQuery = {
  __typename?: 'Query';
  Me?: {
    __typename?: 'UserType';
    id: string;
    level?: UserLevelEnum | null;
    addresses?: Array<{
      __typename?: 'AddressType';
      id: string;
      title?: string | null;
      type?: AddressTypeEnum | null;
      address?: string | null;
      landline?: string | null;
      is_postal_code_verified?: boolean | null;
      postal_code?: string | null;
      location?: string | null;
    } | null> | null;
  } | null;
};

export type BankAccountListQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<BankAccountTypeEnum>;
}>;

export type BankAccountListQuery = {
  __typename?: 'Query';
  BankAccounts?: Array<{
    __typename?: 'BankAccount';
    id: string;
    iban?: string | null;
    type?: BankAccountTypeEnum | null;
    holder_name?: string | null;
    status?: BankAccountStatusEnum | null;
    pin?: number | null;
    issuing_bank?: {
      __typename?: 'IssuingBank';
      slug: string;
      slug_image?: string | null;
      name: string;
    } | null;
  } | null> | null;
};

export type BankAccountPinMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  pin: Scalars['Boolean']['input'];
}>;

export type BankAccountPinMutation = {
  __typename?: 'Mutation';
  BankAccountPin?: { __typename?: 'BankAccount'; pin?: number | null } | null;
};

export type BankAccountDetailQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  iban_holder_name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<BankAccountTypeEnum>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type BankAccountDetailQuery = {
  __typename?: 'Query';
  BankAccounts?: Array<{
    __typename?: 'BankAccount';
    id: string;
    iban?: string | null;
    status?: BankAccountStatusEnum | null;
    is_legal?: boolean | null;
    holder_name?: string | null;
    type?: BankAccountTypeEnum | null;
    pin?: number | null;
    expired_at?: any | null;
    deleted_at?: any | null;
    issuing_bank?: {
      __typename?: 'IssuingBank';
      name: string;
      slug_image?: string | null;
      slug: string;
    } | null;
  } | null> | null;
  Pagination?: Array<{
    __typename?: 'PaginationType';
    last_page?: any | null;
    total?: any | null;
  } | null> | null;
};

export type CheckCardIbanQueryVariables = Exact<{
  pan?: InputMaybe<Scalars['MaskedPan']['input']>;
  iban?: InputMaybe<Scalars['String']['input']>;
}>;

export type CheckCardIbanQuery = {
  __typename?: 'Query';
  CheckCardIBAN?: {
    __typename?: 'IBAN';
    iban: string;
    holder_name?: string | null;
    bank_name?: string | null;
    pan?: string | null;
    bank_slug?: string | null;
    bank_status?: BankAccountStatusEnum | null;
    issuing_bank?: { __typename?: 'IssuingBank'; name: string; slug: string } | null;
  } | null;
};

export type BankAccountAddMutationVariables = Exact<{
  iban: Scalars['String']['input'];
  is_legal: Scalars['Boolean']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<BankAccountTypeEnum>;
}>;

export type BankAccountAddMutation = {
  __typename?: 'Mutation';
  BankAccountAdd?: {
    __typename?: 'BankAccount';
    id: string;
    iban?: string | null;
    type?: BankAccountTypeEnum | null;
    holder_name?: string | null;
    status?: BankAccountStatusEnum | null;
    issuing_bank?: { __typename?: 'IssuingBank'; slug: string; slug_image?: string | null } | null;
  } | null;
};

export type BankAccountByCardAddMutationVariables = Exact<{
  pan: Scalars['MaskedPan']['input'];
  is_legal: Scalars['Boolean']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<BankAccountTypeEnum>;
}>;

export type BankAccountByCardAddMutation = {
  __typename?: 'Mutation';
  BankAccountByCardAdd?: {
    __typename?: 'BankAccount';
    id: string;
    iban?: string | null;
    type?: BankAccountTypeEnum | null;
    holder_name?: string | null;
    status?: BankAccountStatusEnum | null;
    issuing_bank?: { __typename?: 'IssuingBank'; slug: string; slug_image?: string | null } | null;
  } | null;
};

export type TwoDayChartQueryVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  date: Scalars['Date']['input'];
}>;

export type TwoDayChartQuery = {
  __typename?: 'Query';
  TwoDayChart?: {
    __typename?: 'TwoDayChartType';
    other_day?: Array<{
      __typename?: 'DayTransactionsDetailsType';
      date?: any | null;
      value?: any | null;
      count?: any | null;
    } | null> | null;
    today?: Array<{
      __typename?: 'DayTransactionsDetailsType';
      date?: any | null;
      value?: any | null;
      count?: any | null;
    } | null> | null;
  } | null;
};

export type BalanceChartQueryVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
}>;

export type BalanceChartQuery = {
  __typename?: 'Query';
  BalanceChart?: { __typename?: 'DayTransactionAvgType'; value?: any | null } | null;
};

export type FetchIncomeChartQueryVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
}>;

export type FetchIncomeChartQuery = {
  __typename?: 'Query';
  IncomeChart?: Array<{
    __typename?: 'IncomeChartType';
    key?: string | null;
    data?: Array<{
      __typename?: 'IncomeChartDetailsType';
      date?: string | null;
      value?: any | null;
      count?: any | null;
    } | null> | null;
  } | null> | null;
};

export type GetCouponsQueryVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<CouponFilterEnum>;
}>;

export type GetCouponsQuery = {
  __typename?: 'Query';
  Coupons?: Array<{
    __typename?: 'CouponType';
    id: string;
    expired_at?: any | null;
    code: string;
    deleted_at?: any | null;
    status?: CouponStatusEnum | null;
    limit?: any | null;
    used?: number | null;
    min_amount: any;
    discount_percent: any;
    max_discount_amount: any;
    products?: Array<{ __typename?: 'ZarinLinkType'; id: string } | null> | null;
  } | null> | null;
  Pagination?: Array<{
    __typename?: 'PaginationType';
    total?: any | null;
    last_page?: any | null;
  } | null> | null;
};

export type CouponRemoveMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type CouponRemoveMutation = { __typename?: 'Mutation'; CouponRemove?: boolean | null };

export type CouponRestoreMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type CouponRestoreMutation = {
  __typename?: 'Mutation';
  CouponRestore?: { __typename?: 'CouponType'; id: string } | null;
};

export type CouponEditMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  max_discount_amount?: InputMaybe<Scalars['Int']['input']>;
  discount_percent?: InputMaybe<Scalars['Int']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  expired_at?: InputMaybe<Scalars['DateTime']['input']>;
}>;

export type CouponEditMutation = {
  __typename?: 'Mutation';
  CouponEdit?: { __typename?: 'CouponType'; id: string } | null;
};

export type CouponAddMutationVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  discount_percent: Scalars['Int']['input'];
  code: Scalars['String']['input'];
  max_discount_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  expired_at?: InputMaybe<Scalars['DateTime']['input']>;
}>;

export type CouponAddMutation = {
  __typename?: 'Mutation';
  CouponAdd?: { __typename?: 'CouponType'; id: string } | null;
};

export type CouponAssignProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  product_ids?: InputMaybe<
    Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>
  >;
}>;

export type CouponAssignProductMutation = {
  __typename?: 'Mutation';
  CouponAssignProduct?: { __typename?: 'CouponType'; id: string } | null;
};

export type GetCouponByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  terminal_id: Scalars['ID']['input'];
}>;

export type GetCouponByIdQuery = {
  __typename?: 'Query';
  Coupons?: Array<{
    __typename?: 'CouponType';
    id: string;
    expired_at?: any | null;
    code: string;
    status?: CouponStatusEnum | null;
    limit?: any | null;
    min_amount: any;
    used?: number | null;
    discount_percent: any;
    max_discount_amount: any;
    products?: Array<{ __typename?: 'ZarinLinkType'; id: string } | null> | null;
  } | null> | null;
};

export type GetFaqQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetFaqQuery = {
  __typename?: 'Query';
  Faqs?: Array<{
    __typename?: 'FaqType';
    id?: string | null;
    slug?: string | null;
    question?: string | null;
    answer?: string | null;
  } | null> | null;
};

export type GetInstantPayoutQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  reference_id?: InputMaybe<Scalars['String']['input']>;
  url_code?: InputMaybe<Scalars['String']['input']>;
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<InstantPayoutStatusEnum>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  amount?: InputMaybe<Scalars['Int']['input']>;
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetInstantPayoutQuery = {
  __typename?: 'Query';
  InstantPayout?: Array<{
    __typename?: 'InstantPayoutType';
    id: string;
    status?: ReconciliationStatusEnum | null;
    amount?: any | null;
    reference_id?: string | null;
    created_at?: any | null;
    reconciled_at?: any | null;
    description?: string | null;
    url_code?: string | null;
    fee?: any | null;
    method?: InstantPayoutMethodEnum | null;
    bank_account?: {
      __typename?: 'BankAccount';
      iban?: string | null;
      holder_name?: string | null;
      issuing_bank?: { __typename?: 'IssuingBank'; slug: string } | null;
    } | null;
  } | null> | null;
  Pagination?: Array<{
    __typename?: 'PaginationType';
    total?: any | null;
    last_page?: any | null;
  } | null> | null;
};

export type InstantPayoutInquiryQueryVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  bank_account_id: Scalars['ID']['input'];
}>;

export type InstantPayoutInquiryQuery = {
  __typename?: 'Query';
  InstantPayoutInquiry?: {
    __typename?: 'InstantPayoutInquiry';
    fee_percent?: number | null;
    fixed_fee_amount?: any | null;
    type?: InstantPayoutTypeEnum | null;
    max_amount?: any | null;
  } | null;
};

export type InstantPayoutInquiryBanksQueryVariables = Exact<{ [key: string]: never }>;

export type InstantPayoutInquiryBanksQuery = {
  __typename?: 'Query';
  InstantPayoutInquiryBanks?: {
    __typename?: 'InstantPayoutInquiryBanksType';
    banks?: Array<{
      __typename?: 'InstantPayoutInquiryBanksDetailsType';
      bank_name?: string | null;
      status?: InstantPayoutBalanceStatusEnum | null;
    } | null> | null;
  } | null;
};

export type InstantPayoutAddMutationVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  bank_account_id: Scalars['ID']['input'];
  amount: Scalars['BigInteger']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;

export type InstantPayoutAddMutation = {
  __typename?: 'Mutation';
  InstantPayoutAdd?: {
    __typename?: 'InstantPayoutType';
    id: string;
    status?: ReconciliationStatusEnum | null;
  } | null;
};

export type InstantPayoutExcelExportMutationVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  filter?: InputMaybe<FilterEnum>;
  amount?: InputMaybe<Scalars['Int']['input']>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<InstantPayoutStatusEnum>;
  name?: InputMaybe<Scalars['String']['input']>;
}>;

export type InstantPayoutExcelExportMutation = {
  __typename?: 'Mutation';
  InstantPayoutExcelExport?: boolean | null;
};

export type GetInvoicesQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  terminal_id: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<InvoiceStatusEnum>;
  amount?: InputMaybe<Scalars['BigInteger']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  payer_name?: InputMaybe<Scalars['String']['input']>;
  payer_mobile?: InputMaybe<Scalars['String']['input']>;
  payer_email?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetInvoicesQuery = {
  __typename?: 'Query';
  Invoice?: Array<{
    __typename?: 'Invoice';
    id: string;
    amount?: any | null;
    created_at?: any | null;
    payer_name?: string | null;
    status?: InvoiceStatusEnum | null;
  } | null> | null;
  Pagination?: Array<{
    __typename?: 'PaginationType';
    total?: any | null;
    last_page?: any | null;
  } | null> | null;
};

export type GetInvoiceByIdQueryVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type GetInvoiceByIdQuery = {
  __typename?: 'Query';
  Invoice?: Array<{
    __typename?: 'Invoice';
    id: string;
    amount?: any | null;
    description?: string | null;
    payer_name?: string | null;
    payer_mobile?: string | null;
    payer_email?: string | null;
    notify_type?: NotifyTypeEnum | null;
    fee_type?: SessionFeeTypeEnum | null;
  } | null> | null;
};

export type InvoiceAddMutationVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  amount: Scalars['BigInteger']['input'];
  description: Scalars['String']['input'];
  payer_name: Scalars['String']['input'];
  payer_mobile: Scalars['String']['input'];
  payer_email?: InputMaybe<Scalars['String']['input']>;
  notify_type?: InputMaybe<NotifyTypeEnum>;
  count?: InputMaybe<Scalars['Int']['input']>;
  fee_type?: InputMaybe<TerminalFeeTypeEnum>;
}>;

export type InvoiceAddMutation = {
  __typename?: 'Mutation';
  InvoiceAdd?: { __typename?: 'Invoice'; id: string } | null;
};

export type InvoiceEditMutationVariables = Exact<{
  id: Scalars['String']['input'];
  payer_name: Scalars['String']['input'];
  payer_mobile: Scalars['String']['input'];
  payer_email?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  notify_type?: InputMaybe<NotifyTypeEnum>;
}>;

export type InvoiceEditMutation = {
  __typename?: 'Mutation';
  InvoiceEdit?: { __typename?: 'Invoice'; id: string } | null;
};

export type InvoicesQueryVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type InvoicesQuery = {
  __typename?: 'Query';
  Invoice?: Array<{
    __typename?: 'Invoice';
    id: string;
    payer_email?: string | null;
    terminal_id: string;
    status?: InvoiceStatusEnum | null;
    amount?: any | null;
    fee?: any | null;
    notify_type?: NotifyTypeEnum | null;
    description?: string | null;
    fee_type?: SessionFeeTypeEnum | null;
    payer_name?: string | null;
    payer_mobile?: string | null;
    created_at?: any | null;
    updated_at?: any | null;
    deleted_at?: any | null;
    sessions?: Array<{
      __typename?: 'SessionType';
      id: string;
      terminal_id: string;
      amount?: any | null;
      status?: SessionStatusEnum | null;
      payer_info?: { __typename?: 'SessionPayerInfoType'; order_id?: string | null } | null;
      timeline?: {
        __typename?: 'SessionTimeLineType';
        created_time?: any | null;
        created_reference?: any | null;
        canceled_time?: any | null;
        in_bank_time?: any | null;
        in_bank_name?: string | null;
        settled_time?: any | null;
        verified_time?: any | null;
        verified_reference?: any | null;
        reconciled_time?: any | null;
        reconciled_id?: any | null;
      } | null;
    } | null> | null;
  } | null> | null;
};

export type NoteAddMutationVariables = Exact<{
  model_type?: InputMaybe<NoteModelTypeEnum>;
  model_id: Scalars['ID']['input'];
  content: Scalars['String']['input'];
}>;

export type NoteAddMutation = {
  __typename?: 'Mutation';
  NoteAdd?: { __typename?: 'NoteType'; id: string; content?: string | null } | null;
};

export type NoteEditMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  content: Scalars['String']['input'];
}>;

export type NoteEditMutation = {
  __typename?: 'Mutation';
  NoteEdit?: { __typename?: 'NoteType'; id: string; content?: string | null } | null;
};

export type NoteDeleteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type NoteDeleteMutation = { __typename?: 'Mutation'; NoteDelete?: boolean | null };

export type GetUserNotificationQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserNotificationQuery = {
  __typename?: 'Query';
  Me?: {
    __typename?: 'UserType';
    id: string;
    email?: string | null;
    notification_preferences?: Array<{
      __typename?: 'UserNotificationPreferencesType';
      type: NotificationPreferenceTypeEnum;
      channels: Array<NotificationPreferenceChannelEnum | null>;
    } | null> | null;
    social_info?: Array<{
      __typename?: 'SocialInfoType';
      type?: string | null;
      active?: boolean | null;
    } | null> | null;
    verifications?: Array<{
      __typename?: 'VerificationOutputType';
      type?: UserVerificationTypeEnum | null;
      verify?: boolean | null;
    } | null> | null;
  } | null;
};

export type PreferencesEditMutationVariables = Exact<{
  notification_preferences?: InputMaybe<
    | Array<InputMaybe<InputUserNotificationPreferencesType>>
    | InputMaybe<InputUserNotificationPreferencesType>
  >;
  email?: InputMaybe<Scalars['String']['input']>;
}>;

export type PreferencesEditMutation = {
  __typename?: 'Mutation';
  PreferencesEdit?: {
    __typename?: 'UserType';
    email?: string | null;
    notification_preferences?: Array<{
      __typename?: 'UserNotificationPreferencesType';
      type: NotificationPreferenceTypeEnum;
      channels: Array<NotificationPreferenceChannelEnum | null>;
    } | null> | null;
  } | null;
};

export type GetPayoutQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  url_code?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<FilterEnum>;
  amount?: InputMaybe<Scalars['BigInteger']['input']>;
  iban?: InputMaybe<Scalars['String']['input']>;
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  reference_session_id?: InputMaybe<Scalars['ID']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetPayoutQuery = {
  __typename?: 'Query';
  Payout?: Array<{
    __typename?: 'PayoutType';
    id: string;
    status?: PayoutStatusEnum | null;
    amount?: any | null;
    fee?: any | null;
    created_at?: any | null;
    reconciled_at?: any | null;
    url_code?: string | null;
    percent?: number | null;
    description?: string | null;
    reference_session?: { __typename?: 'SessionType'; id: string } | null;
    bank_account?: {
      __typename?: 'BankAccount';
      iban?: string | null;
      holder_name?: string | null;
      issuing_bank?: { __typename?: 'IssuingBank'; slug: string } | null;
    } | null;
  } | null> | null;
  Pagination?: Array<{
    __typename?: 'PaginationType';
    total?: any | null;
    last_page?: any | null;
  } | null> | null;
};

export type GetPayoutByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type GetPayoutByIdQuery = {
  __typename?: 'Query';
  Payout?: Array<{
    __typename?: 'PayoutType';
    id: string;
    status?: PayoutStatusEnum | null;
    amount?: any | null;
    created_at?: any | null;
    reconciled_at?: any | null;
    url_code?: string | null;
    percent?: number | null;
    description?: string | null;
    reference_session?: { __typename?: 'SessionType'; id: string } | null;
    bank_account?: {
      __typename?: 'BankAccount';
      iban?: string | null;
      holder_name?: string | null;
      issuing_bank?: { __typename?: 'IssuingBank'; slug: string } | null;
    } | null;
  } | null> | null;
  Pagination?: Array<{
    __typename?: 'PaginationType';
    total?: any | null;
    last_page?: any | null;
  } | null> | null;
};

export type PayoutEditMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  status?: InputMaybe<PayoutStatusEnum>;
}>;

export type PayoutEditMutation = {
  __typename?: 'Mutation';
  PayoutEdit?: { __typename?: 'PayoutType'; id: string; status?: PayoutStatusEnum | null } | null;
};

export type PayoutInquiryQueryVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
}>;

export type PayoutInquiryQuery = {
  __typename?: 'Query';
  PayoutInquiry?: {
    __typename?: 'InstantPayoutInquiry';
    fee_percent?: number | null;
    max_amount?: any | null;
    fee?: any | null;
    type?: InstantPayoutTypeEnum | null;
    fixed_fee_amount?: any | null;
    min_satna?: any | null;
    max_fee_amount?: any | null;
  } | null;
};

export type PayoutAddMutationVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  bank_account_id: Scalars['ID']['input'];
  amount: Scalars['BigInteger']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  reconciliation_parts?: InputMaybe<ReconciliationPartsEnum>;
}>;

export type PayoutAddMutation = {
  __typename?: 'Mutation';
  PayoutAdd?: { __typename?: 'PayoutType'; id: string; status?: PayoutStatusEnum | null } | null;
};

export type PayoutRetryAddMutationVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  bank_account_id: Scalars['ID']['input'];
  payout_id: Scalars['ID']['input'];
}>;

export type PayoutRetryAddMutation = {
  __typename?: 'Mutation';
  PayoutRetryAdd?: {
    __typename?: 'PayoutType';
    id: string;
    status?: PayoutStatusEnum | null;
  } | null;
};

export type PayoutExcelExportMutationVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<PayoutStatusEnum>;
  name?: InputMaybe<Scalars['String']['input']>;
}>;

export type PayoutExcelExportMutation = {
  __typename?: 'Mutation';
  PayoutExcelExport?: boolean | null;
};

export type GetPayoutBalanceQueryVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
}>;

export type GetPayoutBalanceQuery = {
  __typename?: 'Query';
  PayoutBalance?: { __typename?: 'DayTransactionAvgType'; value?: any | null } | null;
};

export type ActivePayoutAmountQueryVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
}>;

export type ActivePayoutAmountQuery = { __typename?: 'Query'; ActivePayoutAmount?: string | null };

export type PersonalLinkRequestMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;

export type PersonalLinkRequestMutation = {
  __typename?: 'Mutation';
  PersonalLinkRequest?: { __typename?: 'TerminalType'; id: string; domain?: string | null } | null;
};

export type GetProductsQueryVariables = Exact<{
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ZarinLinkFilterEnum>;
  failed_redirect_url?: InputMaybe<Scalars['String']['input']>;
  successful_redirect_url?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['Int']['input']>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetProductsQuery = {
  __typename?: 'Query';
  ZarinLinks?: Array<{
    __typename?: 'ZarinLinkType';
    id: string;
    title?: string | null;
    amount?: any | null;
    limit?: any | null;
    deleted_at?: any | null;
    images?: Array<{ __typename?: 'FileType'; url?: string | null } | null> | null;
  } | null> | null;
  Pagination?: Array<{
    __typename?: 'PaginationType';
    total?: any | null;
    last_page?: any | null;
  } | null> | null;
};

export type GetProductsOverviewQueryVariables = Exact<{
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
  filter?: InputMaybe<ZarinLinkFilterEnum>;
}>;

export type GetProductsOverviewQuery = {
  __typename?: 'Query';
  ZarinLinks?: Array<{
    __typename?: 'ZarinLinkType';
    id: string;
    title?: string | null;
    amount?: any | null;
    deleted_at?: any | null;
    images?: Array<{ __typename?: 'FileType'; url?: string | null } | null> | null;
  } | null> | null;
};

export type GetProductsByIdQueryVariables = Exact<{
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type GetProductsByIdQuery = {
  __typename?: 'Query';
  ZarinLinks?: Array<{
    __typename?: 'ZarinLinkType';
    id: string;
    title?: string | null;
    link?: string | null;
    description?: string | null;
    show_receipt?: boolean | null;
    is_coupon_active?: boolean | null;
    amount?: any | null;
    limit?: any | null;
    deleted_at?: any | null;
    successful_redirect_url?: string | null;
    failed_redirect_url?: string | null;
    required_fields?: Array<{
      __typename?: 'ZarinLinkRequiredFieldsOutput';
      input?: ZarinLinkRequiredFieldsInputEnum | null;
      status?: ZarinLinkRequiredFieldsStatusEnum | null;
      placeholder?: string | null;
    } | null> | null;
    images?: Array<{ __typename?: 'FileType'; id: string; url?: string | null } | null> | null;
  } | null> | null;
};

export type ZarinLinkRemoveMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type ZarinLinkRemoveMutation = { __typename?: 'Mutation'; ZarinLinkRemove?: boolean | null };

export type ZarinLinkRestoreMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type ZarinLinkRestoreMutation = {
  __typename?: 'Mutation';
  ZarinLinkRestore?: { __typename?: 'ZarinLinkType'; id: string } | null;
};

export type ZarinLinkAddImageMutationVariables = Exact<{
  product_id: Scalars['ID']['input'];
  images: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;

export type ZarinLinkAddImageMutation = {
  __typename?: 'Mutation';
  ZarinLinkAddImage?: { __typename?: 'ZarinLinkType'; id: string } | null;
};

export type ZarinLinkAddMutationVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  amount: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  show_receipt: Scalars['Boolean']['input'];
  is_coupon_active: Scalars['Boolean']['input'];
  required_fields?: InputMaybe<
    Array<InputMaybe<ZarinLinkRequiredFieldsInput>> | InputMaybe<ZarinLinkRequiredFieldsInput>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  successful_redirect_url?: InputMaybe<Scalars['String']['input']>;
  failed_redirect_url?: InputMaybe<Scalars['String']['input']>;
}>;

export type ZarinLinkAddMutation = {
  __typename?: 'Mutation';
  ZarinLinkAdd?: { __typename?: 'ZarinLinkType'; id: string } | null;
};

export type ZarinLinkEditMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  show_receipt?: InputMaybe<Scalars['Boolean']['input']>;
  is_coupon_active?: InputMaybe<Scalars['Boolean']['input']>;
  required_fields?: InputMaybe<
    Array<InputMaybe<ZarinLinkRequiredFieldsInput>> | InputMaybe<ZarinLinkRequiredFieldsInput>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  successful_redirect_url?: InputMaybe<Scalars['String']['input']>;
  failed_redirect_url?: InputMaybe<Scalars['String']['input']>;
}>;

export type ZarinLinkEditMutation = {
  __typename?: 'Mutation';
  ZarinLinkEdit?: { __typename?: 'ZarinLinkType'; id: string } | null;
};

export type ZarinLinkDeleteImageMutationVariables = Exact<{
  product_id: Scalars['ID']['input'];
  image_id: Scalars['String']['input'];
}>;

export type ZarinLinkDeleteImageMutation = {
  __typename?: 'Mutation';
  ZarinLinkDeleteImage?: boolean | null;
};

export type InstantPayoutReceiptQueryVariables = Exact<{
  url_code: Scalars['String']['input'];
}>;

export type InstantPayoutReceiptQuery = {
  __typename?: 'Query';
  resource?: {
    __typename?: 'InstantPayoutReceipt';
    id: string;
    status?: InstantPayoutStatusEnum | null;
    description?: string | null;
    fee?: any | null;
    amount?: any | null;
    owner_name?: string | null;
    created_at?: any | null;
    updated_at?: any | null;
    shaparak_tracking_number?: string | null;
    reconciled_at?: any | null;
    bank_account?: {
      __typename?: 'BankAccount';
      id: string;
      iban?: string | null;
      holder_name?: string | null;
      issuing_bank?: { __typename?: 'IssuingBank'; slug: string; name: string } | null;
    } | null;
  } | null;
};

export type PayoutReceiptQueryVariables = Exact<{
  url_code: Scalars['String']['input'];
}>;

export type PayoutReceiptQuery = {
  __typename?: 'Query';
  resource?: {
    __typename?: 'PayoutReceipt';
    id: string;
    amount?: any | null;
    owner_name?: string | null;
    tracking_id?: string | null;
    status?: PayoutStatusEnum | null;
    created_at?: any | null;
    description?: string | null;
    bank_account?: {
      __typename?: 'BankAccount';
      id: string;
      iban?: string | null;
      holder_name?: string | null;
      issuing_bank?: { __typename?: 'IssuingBank'; slug: string; name: string } | null;
    } | null;
  } | null;
};

export type ReconciliationQueryVariables = Exact<{
  filter?: InputMaybe<ReconciliationStatusEnum>;
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  reference_id?: InputMaybe<Scalars['String']['input']>;
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  amount?: InputMaybe<Scalars['Int']['input']>;
  iban?: InputMaybe<Scalars['String']['input']>;
}>;

export type ReconciliationQuery = {
  __typename?: 'Query';
  Reconciliation?: Array<{
    __typename?: 'ReconciliationType';
    id: string;
    status?: ReconciliationStatusEnum | null;
    reconciled_at?: any | null;
    amount?: any | null;
    payable_at?: any | null;
    created_at?: any | null;
    fee?: any | null;
    reference_id?: string | null;
    estimated_payed_at?: any | null;
  } | null> | null;
  Pagination?: Array<{
    __typename?: 'PaginationType';
    total?: any | null;
    last_page?: any | null;
  } | null> | null;
};

export type ReconciliationExcelExportMutationVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  amount?: InputMaybe<Scalars['Int']['input']>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterEnum>;
}>;

export type ReconciliationExcelExportMutation = {
  __typename?: 'Mutation';
  ReconciliationExcelExport?: boolean | null;
};

export type ReconciliationByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sessions_limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type ReconciliationByIdQuery = {
  __typename?: 'Query';
  Reconciliation?: Array<{
    __typename?: 'ReconciliationType';
    id: string;
    terminal_id?: string | null;
    status?: ReconciliationStatusEnum | null;
    amount?: any | null;
    note?: string | null;
    payable_at?: any | null;
    estimated_payed_at?: any | null;
    description?: string | null;
    reference_id?: string | null;
    reconciled_at?: any | null;
    fee?: any | null;
    sessions_count?: number | null;
    notes?: Array<{
      __typename?: 'NoteType';
      id: string;
      content?: string | null;
      created_at?: any | null;
      updated_at?: any | null;
      user?: { __typename?: 'UserPublicType'; name?: string | null } | null;
    } | null> | null;
    sessions?: Array<{
      __typename?: 'SessionType';
      amount?: any | null;
      created_at?: any | null;
      fee?: any | null;
      reference_id?: string | null;
      id: string;
    } | null> | null;
    wages?: Array<{
      __typename?: 'ReconcileWageType';
      id?: any | null;
      fee?: any | null;
      shaparak_tracking_number?: string | null;
      amount?: any | null;
      type?: ReconciliationWageTypeEnum | null;
      type_id?: string | null;
      bank_account?: {
        __typename?: 'BankAccount';
        id: string;
        iban?: string | null;
        holder_name?: string | null;
        issuing_bank?: {
          __typename?: 'IssuingBank';
          name: string;
          slug: string;
          slug_image?: string | null;
        } | null;
      } | null;
    } | null> | null;
  } | null> | null;
};

export type ReferrersReportQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type ReferrersReportQuery = {
  __typename?: 'Query';
  ReferrersReport?: {
    __typename?: 'Referrers';
    all_referrers: number;
    sum_referrers: number;
    month_active_referrers: number;
    sum_commission: number;
    user?: Array<{
      __typename?: 'UserReferred';
      id: string;
      name?: string | null;
      avatar?: string | null;
      commission: number;
      registered_at?: any | null;
      last_session_time?: any | null;
    } | null> | null;
  } | null;
  Pagination?: Array<{
    __typename?: 'PaginationType';
    total?: any | null;
    last_page?: any | null;
    name?: string | null;
  } | null> | null;
};

export type ReferrerInvoiceQueryVariables = Exact<{
  from_date?: InputMaybe<Scalars['DateTime']['input']>;
  to_date?: InputMaybe<Scalars['DateTime']['input']>;
}>;

export type ReferrerInvoiceQuery = {
  __typename?: 'Query';
  ReferrerInvoice?: Array<{
    __typename?: 'ReferrerInvoiceType';
    id: string;
    status?: ReferrerInvoiceStatusEnum | null;
    amount?: any | null;
    from_date?: any | null;
    to_date?: any | null;
    created_at?: any | null;
  } | null> | null;
};

export type ReferrerInvoiceGetIbanQueryVariables = Exact<{ [key: string]: never }>;

export type ReferrerInvoiceGetIbanQuery = {
  __typename?: 'Query';
  ReferrerInvoiceGetIban?: {
    __typename?: 'BankAccount';
    id: string;
    iban?: string | null;
    holder_name?: string | null;
    issuing_bank?: { __typename?: 'IssuingBank'; name: string; slug: string } | null;
  } | null;
};

export type ReferrerInvoiceSetIbanMutationVariables = Exact<{
  bank_account_id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type ReferrerInvoiceSetIbanMutation = {
  __typename?: 'Mutation';
  referrerInvoiceSetIban?: {
    __typename?: 'BankAccount';
    id: string;
    issuing_bank?: { __typename?: 'IssuingBank'; name: string; slug: string } | null;
  } | null;
};

export type RefundFeeInquiryQueryVariables = Exact<{
  method?: InputMaybe<InstantPayoutActionTypeEnum>;
}>;

export type RefundFeeInquiryQuery = {
  __typename?: 'Query';
  RefundFeeInquiry?: {
    __typename?: 'RefundFeeInquiryType';
    base_fee?: any | null;
    step_amount?: any | null;
    step_fee?: any | null;
  } | null;
};

export type AddRefundMutationVariables = Exact<{
  session_id: Scalars['ID']['input'];
  amount: Scalars['BigInteger']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<RefundReasonEnum>;
  method?: InputMaybe<InstantPayoutActionTypeEnum>;
}>;

export type AddRefundMutation = {
  __typename?: 'Mutation';
  AddRefund?: {
    __typename?: 'SessionType';
    id: string;
    amount?: any | null;
    fee?: any | null;
    terminal_id: string;
    timeline?: {
      __typename?: 'SessionTimeLineType';
      created_time?: any | null;
      created_reference?: any | null;
      canceled_time?: any | null;
      in_bank_time?: any | null;
      in_bank_name?: string | null;
      verified_time?: any | null;
      verified_reference?: any | null;
      reconciled_time?: any | null;
      refund_amount?: any | null;
      refund_time?: any | null;
    } | null;
  } | null;
};

export type SendVerifyEmailMutationVariables = Exact<{ [key: string]: never }>;

export type SendVerifyEmailMutation = { __typename?: 'Mutation'; SendVerifyEmail?: boolean | null };

export type GetSessionsQueryVariables = Exact<{
  reconciliation_id?: InputMaybe<Scalars['ID']['input']>;
  filter?: InputMaybe<FilterEnum>;
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<SessionTypeEnum>;
  amount?: InputMaybe<Scalars['Int']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  reference_id?: InputMaybe<Scalars['String']['input']>;
  relation_id?: InputMaybe<Scalars['ID']['input']>;
  mobile?: InputMaybe<Scalars['CellNumber']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  card_pan?: InputMaybe<Scalars['String']['input']>;
  rrn?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetSessionsQuery = {
  __typename?: 'Query';
  Session?: Array<{
    __typename?: 'SessionType';
    id: string;
    type?: SessionTypeEnum | null;
    status?: SessionStatusEnum | null;
    created_at?: any | null;
    description?: string | null;
    reconciliation_id?: string | null;
    amount?: any | null;
    fee?: any | null;
    timeline?: {
      __typename?: 'SessionTimeLineType';
      refund_id?: any | null;
      refund_status?: ReconciliationStatusEnum | null;
      reconciled_id?: any | null;
      reconciled_time?: any | null;
      reconciled_status?: ReconciliationStatusEnum | null;
    } | null;
  } | null> | null;
  Pagination?: Array<{
    __typename?: 'PaginationType';
    total?: any | null;
    last_page?: any | null;
  } | null> | null;
};

export type SessionDynamicExcelExportMutationVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  fields?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>
  >;
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  reconciliation_id?: InputMaybe<Scalars['ID']['input']>;
  amount?: InputMaybe<Scalars['Int']['input']>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<FilterEnum>;
  name?: InputMaybe<Scalars['String']['input']>;
  session_id?: InputMaybe<Scalars['ID']['input']>;
  mobile?: InputMaybe<Scalars['CellNumber']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  card_pan?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  reference_id?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<SessionTypeEnum>;
  relation_id?: InputMaybe<Scalars['ID']['input']>;
  export_file_type?: InputMaybe<ExportFileTypeEnum>;
}>;

export type SessionDynamicExcelExportMutation = {
  __typename?: 'Mutation';
  SessionDynamicExcelExport?: boolean | null;
};

export type SessionExcelExportMutationVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  created_from_date?: InputMaybe<Scalars['DateTime']['input']>;
  created_to_date?: InputMaybe<Scalars['DateTime']['input']>;
  reconciliation_id?: InputMaybe<Scalars['ID']['input']>;
  amount?: InputMaybe<Scalars['Int']['input']>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<FilterEnum>;
  name?: InputMaybe<Scalars['String']['input']>;
  session_id?: InputMaybe<Scalars['ID']['input']>;
  mobile?: InputMaybe<Scalars['CellNumber']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  card_pan?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  reference_id?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<SessionTypeEnum>;
  relation_id?: InputMaybe<Scalars['ID']['input']>;
  export_file_type?: InputMaybe<ExportFileTypeEnum>;
}>;

export type SessionExcelExportMutation = {
  __typename?: 'Mutation';
  SessionExcelExport?: boolean | null;
};

export type SessionCardHolderMutationVariables = Exact<{
  session_id: Scalars['ID']['input'];
}>;

export type SessionCardHolderMutation = {
  __typename?: 'Mutation';
  SessionCardHolder?: boolean | null;
};

export type SessionTypeQueryVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
}>;

export type SessionTypeQuery = {
  __typename?: 'Query';
  Session?: Array<{ __typename?: 'SessionTypeType'; name?: SessionTypeEnum | null } | null> | null;
};

export type SessionByIdQueryVariables = Exact<{
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type SessionByIdQuery = {
  __typename?: 'Query';
  Session?: Array<{
    __typename?: 'SessionType';
    id: string;
    note?: string | null;
    reference_id?: string | null;
    reconciliation_id?: string | null;
    type?: SessionTypeEnum | null;
    fee?: any | null;
    fee_type?: SessionFeeTypeEnum | null;
    status?: SessionStatusEnum | null;
    amount?: any | null;
    authority?: string | null;
    description?: string | null;
    created_at?: any | null;
    fee_detail?: {
      __typename?: 'SessionFeeDetailType';
      sms?: number | null;
      ayan?: number | null;
      raw_fee?: number | null;
    } | null;
    notes?: Array<{
      __typename?: 'NoteType';
      id: string;
      content?: string | null;
      created_at?: any | null;
      updated_at?: any | null;
      user?: { __typename?: 'UserPublicType'; name?: string | null } | null;
    } | null> | null;
    wage_payouts?: Array<{ __typename?: 'PayoutType'; id: string } | null> | null;
    payer_info?: {
      __typename?: 'SessionPayerInfoType';
      card_holder_name?: string | null;
      description?: string | null;
      email?: string | null;
      mobile?: string | null;
      name?: string | null;
      order_id?: string | null;
      zarin_link_id?: string | null;
      custom_field_1_name?: string | null;
      custom_field_2_name?: string | null;
      custom_field_1?: string | null;
      custom_field_2?: string | null;
    } | null;
    terminal?: { __typename?: 'TerminalType'; id: string; refund_active?: boolean | null } | null;
    session_tries?: Array<{
      __typename?: 'SessionTryType';
      is_card_mobile_verified?: boolean | null;
      card_pan?: any | null;
      payer_ip?: any | null;
      rrn?: string | null;
      status?: SessionTryStatusEnum | null;
      card_info?: { __typename?: 'IssuingBank'; name: string; slug: string } | null;
      agent?: { __typename?: 'SessionTryAgentType'; country_code?: string | null } | null;
    } | null> | null;
    refund?: {
      __typename?: 'RefundType';
      id: string;
      session_id: string;
      instant_payout?: {
        __typename?: 'InstantPayoutType';
        id: string;
        amount?: any | null;
        fee?: any | null;
        reference_id?: string | null;
        reconciled_at?: any | null;
        created_at?: any | null;
        status?: ReconciliationStatusEnum | null;
        terminal?: { __typename?: 'TerminalType'; id: string } | null;
        bank_account?: {
          __typename?: 'BankAccount';
          id: string;
          iban?: string | null;
          holder_name?: string | null;
          issuing_bank?: {
            __typename?: 'IssuingBank';
            name: string;
            slug: string;
            slug_image?: string | null;
          } | null;
        } | null;
      } | null;
    } | null;
    product?: { __typename?: 'ZarinLinkType'; title?: string | null } | null;
    timeline?: {
      __typename?: 'SessionTimeLineType';
      canceled_time?: any | null;
      created_time?: any | null;
      in_bank_name?: string | null;
      in_bank_time?: any | null;
      reconciled_id?: any | null;
      reconciled_time?: any | null;
      reconciled_status?: ReconciliationStatusEnum | null;
      reconciled_success_time?: any | null;
      settled_time?: any | null;
      verified_reference?: any | null;
      verified_time?: any | null;
      refund_status?: ReconciliationStatusEnum | null;
      refund_amount?: any | null;
      refund_time?: any | null;
    } | null;
  } | null> | null;
};

export type ExportableFieldsQueryVariables = Exact<{
  group?: InputMaybe<ExportGroupEnum>;
  terminal_id: Scalars['Int']['input'];
}>;

export type ExportableFieldsQuery = {
  __typename?: 'Query';
  Session?: Array<{
    __typename?: 'ExportableFieldsGroup';
    key?: string | null;
    categories?: Array<{
      __typename?: 'ExportableFieldsCategory';
      key?: string | null;
      fields?: Array<{
        __typename?: 'ExportableField';
        title?: string | null;
        slug?: string | null;
        is_required?: boolean | null;
        is_selected?: boolean | null;
      } | null> | null;
    } | null> | null;
  } | null> | null;
};

export type GetSessionExportQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetSessionExportQuery = {
  __typename?: 'Query';
  SessionExport?: Array<{
    __typename?: 'SessionExportType';
    id?: string | null;
    type?: string | null;
    name?: string | null;
    url?: string | null;
    size?: any | null;
    uuid?: string | null;
    status?: ExportStatusEnum | null;
    created_at?: any | null;
  } | null> | null;
  Pagination?: Array<{
    __typename?: 'PaginationType';
    total?: any | null;
    last_page?: any | null;
  } | null> | null;
};

export type PinTerminalMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  pin: Scalars['Boolean']['input'];
}>;

export type PinTerminalMutation = {
  __typename?: 'Mutation';
  PinTerminal?: { __typename?: 'TerminalType'; pin?: number | null } | null;
};

export type GetTerminalsListMenuQueryVariables = Exact<{ [key: string]: never }>;

export type GetTerminalsListMenuQuery = {
  __typename?: 'Query';
  Terminals?: Array<{
    __typename?: 'TerminalType';
    reconcile_priority?: ReconcileCycleTypeEnum | null;
    reconcile_type?: ReconcileTypeEnum | null;
    id: string;
    created_at?: any | null;
    have_logo?: boolean | null;
    max_amount?: number | null;
    pin?: number | null;
    is_default?: boolean | null;
    status?: TerminalStatusEnum | null;
    permissions?: Array<TerminalPermissionEnum | null> | null;
    name?: string | null;
    domain?: string | null;
    owner_id?: string | null;
    preferred_bank_account_id?: string | null;
    key?: string | null;
    logo?: string | null;
    chn_type?: TerminalChnTypeEnum | null;
    fee_type?: TerminalFeeTypeEnum | null;
    support_phone?: any | null;
    server_ip?: any | null;
    flag?: TerminalFlagEnum | null;
    fee_group?: { __typename?: 'FeeGroupType'; id?: string | null } | null;
    zarin_gate?: Array<{
      __typename?: 'ZarinGateType';
      psp?: string | null;
      merchant_id?: string | null;
      status?: PaymentTerminalStatusEnum | null;
      terminal_id?: string | null;
      error?: Array<string | null> | null;
      payment?: { __typename?: 'PaymentType'; name?: string | null } | null;
    } | null> | null;
    psp_priority?: Array<{
      __typename?: 'ZarinGateType';
      psp?: string | null;
      merchant_id?: string | null;
      status?: PaymentTerminalStatusEnum | null;
      terminal_id?: string | null;
      error?: Array<string | null> | null;
      payment?: { __typename?: 'PaymentType'; name?: string | null } | null;
    } | null> | null;
    active_psp?: Array<{
      __typename?: 'ZarinGateType';
      psp?: string | null;
      merchant_id?: string | null;
      status?: PaymentTerminalStatusEnum | null;
      terminal_id?: string | null;
      error?: Array<string | null> | null;
      payment?: { __typename?: 'PaymentType'; name?: string | null } | null;
    } | null> | null;
  } | null> | null;
};

export type GetTerminalsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetTerminalsQuery = {
  __typename?: 'Query';
  Terminals?: Array<{
    __typename?: 'TerminalType';
    id: string;
    status?: TerminalStatusEnum | null;
    name?: string | null;
    domain?: string | null;
    logo?: string | null;
  } | null> | null;
  Pagination?: Array<{
    __typename?: 'PaginationType';
    total?: any | null;
    last_page?: any | null;
  } | null> | null;
};

export type TerminalEditMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  logo?: InputMaybe<Scalars['ValidFile']['input']>;
  bank_account_id?: InputMaybe<Scalars['ID']['input']>;
  reconcile_priority?: InputMaybe<ReconcileCycleTypeEnum>;
  support_phone?: InputMaybe<Scalars['CellNumber']['input']>;
  server_ip?: InputMaybe<Scalars['IP']['input']>;
  fee_type?: InputMaybe<TerminalFeeTypeEnum>;
  chn_type?: InputMaybe<TerminalChnTypeEnum>;
  psp_priority?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>
  >;
}>;

export type TerminalEditMutation = {
  __typename?: 'Mutation';
  TerminalEdit?: {
    __typename?: 'TerminalType';
    id: string;
    chn_type?: TerminalChnTypeEnum | null;
    logo?: string | null;
  } | null;
};

export type TerminalAddMutationVariables = Exact<{
  mcc_id: Scalars['ID']['input'];
  domain: Scalars['String']['input'];
  name: Scalars['String']['input'];
  support_phone: Scalars['CellNumber']['input'];
}>;

export type TerminalAddMutation = {
  __typename?: 'Mutation';
  TerminalAdd?: { __typename?: 'TerminalType'; id: string } | null;
};

export type TerminalDomainCheckQueryVariables = Exact<{
  domain: Scalars['String']['input'];
}>;

export type TerminalDomainCheckQuery = {
  __typename?: 'Query';
  TerminalDomainCheck?: {
    __typename?: 'TerminalDomainType';
    type?: TerminalTypeEnum | null;
    title?: string | null;
  } | null;
};

export type TerminalUserQueryVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
}>;

export type TerminalUserQuery = {
  __typename?: 'Query';
  TerminalUser?: Array<{
    __typename?: 'TerminalUserType';
    id?: string | null;
    user_id?: string | null;
    user_name?: string | null;
    user_avatar?: string | null;
    terminal_id?: string | null;
    access_list?: Array<TerminalPermissionEnum | null> | null;
  } | null> | null;
};

export type TerminalDeleteAccessMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  terminal_id: Scalars['ID']['input'];
}>;

export type TerminalDeleteAccessMutation = {
  __typename?: 'Mutation';
  TerminalDeleteAccess?: boolean | null;
};

export type TerminalAssignAccessMutationVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
  access_list: Array<InputMaybe<TerminalPermissionEnum>> | InputMaybe<TerminalPermissionEnum>;
}>;

export type TerminalAssignAccessMutation = {
  __typename?: 'Mutation';
  TerminalAssignAccess?: {
    __typename?: 'TerminalUserType';
    id?: string | null;
    user_id?: string | null;
    user_name?: string | null;
    terminal_id?: string | null;
    access_list?: Array<TerminalPermissionEnum | null> | null;
    user_avatar?: string | null;
  } | null;
};

export type TerminalEditAccessMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  terminal_id: Scalars['ID']['input'];
  access_list: Array<InputMaybe<TerminalPermissionEnum>> | InputMaybe<TerminalPermissionEnum>;
}>;

export type TerminalEditAccessMutation = {
  __typename?: 'Mutation';
  TerminalEditAccess?: {
    __typename?: 'TerminalUserType';
    id?: string | null;
    user_id?: string | null;
    user_name?: string | null;
    terminal_id?: string | null;
    access_list?: Array<TerminalPermissionEnum | null> | null;
    user_avatar?: string | null;
  } | null;
};

export type TerminalCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type TerminalCategoriesQuery = {
  __typename?: 'Query';
  TerminalCategories?: Array<{
    __typename?: 'TerminalCategoryType';
    id: string;
    title?: string | null;
    slug?: string | null;
    category_identifier?: string | null;
    parent_id?: string | null;
    children?: Array<{
      __typename?: 'TerminalCategoryType';
      id: string;
      title?: string | null;
      slug?: string | null;
      category_identifier?: string | null;
      parent_id?: string | null;
    } | null> | null;
  } | null> | null;
};

export type GetReleaseChangeLogQueryQueryVariables = Exact<{ [key: string]: never }>;

export type GetReleaseChangeLogQueryQuery = {
  __typename?: 'Query';
  ReleaseChangeLogQuery?: {
    __typename?: 'ReleaseChangeLogType';
    version?: string | null;
    content?: string | null;
    created_at?: string | null;
  } | null;
};

export type GetTerminalsListAndMeQueryVariables = Exact<{ [key: string]: never }>;

export type GetTerminalsListAndMeQuery = {
  __typename?: 'Query';
  Terminals?: Array<{
    __typename?: 'TerminalType';
    id: string;
    permissions?: Array<TerminalPermissionEnum | null> | null;
    domain?: string | null;
    status?: TerminalStatusEnum | null;
    owner_id?: string | null;
    reconcile_type?: ReconcileTypeEnum | null;
    fee_group?: { __typename?: 'FeeGroupType'; id?: string | null } | null;
  } | null> | null;
  Me?: {
    __typename?: 'UserType';
    id: string;
    ssn?: string | null;
    cell_number?: any | null;
    level?: UserLevelEnum | null;
    created_at?: any | null;
    avatar?: string | null;
    full_name?: string | null;
    referral_id?: string | null;
    email?: string | null;
    vip_level?: UserVipLevelEnum | null;
    personal_link?: { __typename?: 'TerminalType'; domain?: string | null } | null;
    addresses?: Array<{ __typename?: 'AddressType'; id: string } | null> | null;
    data_status?: {
      __typename?: 'DataStatusType';
      kyc?: KycStatusTypeEnum | null;
      email?: EmailStatusTypeEnum | null;
      personal?: PersonalStatusTypeEnum | null;
    } | null;
  } | null;
};

export type TerminalDailyReportQueryVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  from_date: Scalars['Date']['input'];
  to_date: Scalars['Date']['input'];
}>;

export type TerminalDailyReportQuery = {
  __typename?: 'Query';
  DailyReport?: {
    __typename?: 'DailyReportType';
    sessions?: Array<{
      __typename?: 'DailyReportDetailsType';
      date?: any | null;
      amount?: any | null;
      count?: any | null;
    } | null> | null;
    reconciliations?: Array<{
      __typename?: 'DailyReportDetailsType';
      date?: any | null;
      amount?: any | null;
      count?: any | null;
    } | null> | null;
    total?: {
      __typename?: 'DailyReportTotalType';
      total_session_amount?: any | null;
      total_session_count?: any | null;
      total_reconciliation_amount?: any | null;
      total_reconciliation_count?: any | null;
    } | null;
  } | null;
};

export type GetTicketsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<TicketStatusEnum>;
}>;

export type GetTicketsQuery = {
  __typename?: 'Query';
  Tickets?: Array<{
    __typename?: 'TicketType';
    title?: string | null;
    id?: string | null;
    status?: TicketStatusEnum | null;
    updated_at?: any | null;
    first_user_seen?: boolean | null;
    rate?: number | null;
  } | null> | null;
  Pagination?: Array<{
    __typename?: 'PaginationType';
    total?: any | null;
    last_page?: any | null;
  } | null> | null;
};

export type GetDepartmentQueryVariables = Exact<{ [key: string]: never }>;

export type GetDepartmentQuery = {
  __typename?: 'Query';
  TicketDepartments?: Array<{
    __typename?: 'TicketDepartmentType';
    id: string;
    title?: string | null;
    user_access?: boolean | null;
  } | null> | null;
};

export type TicketAddMutationVariables = Exact<{
  ticket_department_id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
  attachment?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<TicketPriorityEnum>;
  model_type?: InputMaybe<ModelEnum>;
  model_id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type TicketAddMutation = {
  __typename?: 'Mutation';
  TicketAdd?: { __typename?: 'TicketType'; id?: string | null } | null;
};

export type TicketAddReplyMutationVariables = Exact<{
  ticket_id: Scalars['ID']['input'];
  content: Scalars['String']['input'];
  attachment?: InputMaybe<Scalars['String']['input']>;
}>;

export type TicketAddReplyMutation = {
  __typename?: 'Mutation';
  TicketAddReply?: { __typename?: 'TicketReplyType'; id: string } | null;
};

export type TicketCloseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type TicketCloseMutation = { __typename?: 'Mutation'; TicketClose?: boolean | null };

export type TicketFeedbackMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  rate?: InputMaybe<Scalars['Int']['input']>;
}>;

export type TicketFeedbackMutation = { __typename?: 'Mutation'; TicketFeedback?: boolean | null };

export type GetTicketByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetTicketByIdQuery = {
  __typename?: 'Query';
  Tickets?: Array<{
    __typename?: 'TicketType';
    id?: string | null;
    status?: TicketStatusEnum | null;
    title?: string | null;
    created_at?: any | null;
    updated_at?: any | null;
    rate?: number | null;
    model_id?: string | null;
    replies?: Array<{
      __typename?: 'TicketReplyType';
      id: string;
      content?: string | null;
      attachment?: string | null;
      created_at?: any | null;
      user?: {
        __typename?: 'UserPublicType';
        name?: string | null;
        id: string;
        managed_avatar?: string | null;
      } | null;
    } | null> | null;
  } | null> | null;
};

export type GetTicketCountQueryVariables = Exact<{ [key: string]: never }>;

export type GetTicketCountQuery = { __typename?: 'Query'; UnreadTicketsCount?: number | null };

export type GetUserIdQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserIdQuery = {
  __typename?: 'Query';
  Me?: {
    __typename?: 'UserType';
    id: string;
    ssn?: string | null;
    cell_number?: any | null;
    level?: UserLevelEnum | null;
    created_at?: any | null;
    avatar?: string | null;
    full_name?: string | null;
    referral_id?: string | null;
    email?: string | null;
    vip_level?: UserVipLevelEnum | null;
    personal_link?: { __typename?: 'TerminalType'; domain?: string | null } | null;
    addresses?: Array<{ __typename?: 'AddressType'; id: string } | null> | null;
    data_status?: {
      __typename?: 'DataStatusType';
      kyc?: KycStatusTypeEnum | null;
      email?: EmailStatusTypeEnum | null;
      personal?: PersonalStatusTypeEnum | null;
    } | null;
  } | null;
};

export type DeactivateTelegramMutationVariables = Exact<{ [key: string]: never }>;

export type DeactivateTelegramMutation = { __typename?: 'Mutation'; resource?: boolean | null };

export type GetNowQueryVariables = Exact<{ [key: string]: never }>;

export type GetNowQuery = {
  __typename?: 'Query';
  Time?: { __typename?: 'TimeType'; current_time?: any | null } | null;
};

export type UserAnnouncementQueryVariables = Exact<{ [key: string]: never }>;

export type UserAnnouncementQuery = {
  __typename?: 'Query';
  UserAnnouncement?: Array<{
    __typename?: 'UserAnnouncementType';
    id: string;
    title: string;
    message: string;
    url_title?: string | null;
    url?: string | null;
    created_at?: any | null;
  } | null> | null;
};

export type ReturnToOldVersionMutationVariables = Exact<{
  description: Scalars['String']['input'];
}>;

export type ReturnToOldVersionMutation = {
  __typename?: 'Mutation';
  ReturnToOldVersion?: boolean | null;
};

export type VerifyEmailMutationVariables = Exact<{
  otp_code: Scalars['String']['input'];
}>;

export type VerifyEmailMutation = { __typename?: 'Mutation'; VerifyEmail?: boolean | null };

export type GetNewZarinLinksQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<ZarinLinkTypeEnum>;
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  amount_type?: InputMaybe<ZarinLinkAmountTypeEnum>;
  amount?: InputMaybe<Scalars['Int']['input']>;
  max_amount?: InputMaybe<Scalars['Int']['input']>;
  min_amount?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  successful_redirect_url?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ZarinLinkFilterEnum>;
}>;

export type GetNewZarinLinksQuery = {
  __typename?: 'Query';
  NewZarinLinks?: Array<{
    __typename?: 'NewZarinLinkType';
    id: string;
    link?: string | null;
    title?: string | null;
    limit?: any | null;
    type?: ZarinLinkTypeEnum | null;
    created_at?: any | null;
    deleted_at?: any | null;
    amount?: any | null;
    amount_type?: ZarinLinkAmountTypeEnum | null;
    images?: Array<{ __typename?: 'FileType'; url?: string | null } | null> | null;
  } | null> | null;
  Pagination?: Array<{
    __typename?: 'PaginationType';
    total?: any | null;
    last_page?: any | null;
  } | null> | null;
};

export type GetZarinLinkByIdQueryVariables = Exact<{
  terminal_id?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<ZarinLinkTypeEnum>;
}>;

export type GetZarinLinkByIdQuery = {
  __typename?: 'Query';
  NewZarinLinks?: Array<{
    __typename?: 'NewZarinLinkType';
    id: string;
    title?: string | null;
    link?: string | null;
    description?: string | null;
    show_receipt?: boolean | null;
    is_coupon_active?: boolean | null;
    amount?: any | null;
    limit?: any | null;
    deleted_at?: any | null;
    updated_at?: any | null;
    created_at?: any | null;
    successful_redirect_url?: string | null;
    failed_redirect_url?: string | null;
    amount_type?: ZarinLinkAmountTypeEnum | null;
    type?: ZarinLinkTypeEnum | null;
    required_fields?: Array<{
      __typename?: 'ZarinLinkRequiredFieldsOutput';
      input?: ZarinLinkRequiredFieldsInputEnum | null;
      status?: ZarinLinkRequiredFieldsStatusEnum | null;
      placeholder?: string | null;
    } | null> | null;
    specifications?: Array<{
      __typename?: 'ZarinLinkSpecificationType';
      key: string;
      value: string;
    } | null> | null;
    meta_data?: {
      __typename?: 'ZarinLinkMetaDataType';
      start_date?: string | null;
      start_time?: string | null;
      end_time?: string | null;
      end_date?: string | null;
      event_type?: EventTypeEnum | null;
      province?: string | null;
      city?: string | null;
      address?: string | null;
      url?: string | null;
      target_amount?: number | null;
    } | null;
    category?: Array<{
      __typename?: 'ZarinLinkCategory';
      id?: string | null;
      title?: string | null;
      parent?: {
        __typename?: 'ZarinLinkCategory';
        id?: string | null;
        title?: string | null;
      } | null;
    } | null> | null;
    images?: Array<{ __typename?: 'FileType'; id: string; url?: string | null } | null> | null;
    coupons?: Array<{
      __typename?: 'CouponType';
      id: string;
      discount_percent: any;
      code: string;
    } | null> | null;
  } | null> | null;
};

export type ZarinLinkCreateMutationMutationVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  amount: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  show_receipt: Scalars['Boolean']['input'];
  is_coupon_active: Scalars['Boolean']['input'];
  required_fields?: InputMaybe<
    Array<InputMaybe<ZarinLinkRequiredFieldsInput>> | InputMaybe<ZarinLinkRequiredFieldsInput>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<ZarinLinkTypeEnum>;
  successful_redirect_url?: InputMaybe<Scalars['String']['input']>;
  failed_redirect_url?: InputMaybe<Scalars['String']['input']>;
  amount_type?: InputMaybe<ZarinLinkAmountTypeEnum>;
  meta_data?: InputMaybe<ZarinLinkMetaDataInput>;
  specifications?: InputMaybe<
    Array<InputMaybe<ZarinLinkSpecificationInput>> | InputMaybe<ZarinLinkSpecificationInput>
  >;
  category_id?: InputMaybe<Scalars['Int']['input']>;
}>;

export type ZarinLinkCreateMutationMutation = {
  __typename?: 'Mutation';
  NewZarinLinkAdd?: { __typename?: 'NewZarinLinkType'; id: string } | null;
};

export type ZarinLinkUpdateMutationMutationVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  amount: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  show_receipt: Scalars['Boolean']['input'];
  is_coupon_active: Scalars['Boolean']['input'];
  required_fields?: InputMaybe<
    Array<InputMaybe<ZarinLinkRequiredFieldsInput>> | InputMaybe<ZarinLinkRequiredFieldsInput>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<ZarinLinkTypeEnum>;
  successful_redirect_url?: InputMaybe<Scalars['String']['input']>;
  failed_redirect_url?: InputMaybe<Scalars['String']['input']>;
  amount_type?: InputMaybe<ZarinLinkAmountTypeEnum>;
  meta_data?: InputMaybe<ZarinLinkMetaDataInput>;
  specifications?: InputMaybe<
    Array<InputMaybe<ZarinLinkSpecificationInput>> | InputMaybe<ZarinLinkSpecificationInput>
  >;
  category_id?: InputMaybe<Scalars['Int']['input']>;
}>;

export type ZarinLinkUpdateMutationMutation = {
  __typename?: 'Mutation';
  NewZarinLinkEdit?: { __typename?: 'NewZarinLinkType'; id: string } | null;
};

export type ZarinLinkCategoriesQueryVariables = Exact<{
  type?: InputMaybe<CategoryTypeEnum>;
}>;

export type ZarinLinkCategoriesQuery = {
  __typename?: 'Query';
  ZarinLinkCategories?: Array<{
    __typename?: 'ZarinLinkCategory';
    id?: string | null;
    title?: string | null;
    slug?: string | null;
    type?: CategoryTypeEnum | null;
    children?: Array<{
      __typename?: 'ZarinLinkCategory';
      id?: string | null;
      title?: string | null;
    } | null> | null;
  } | null> | null;
};

export type UpdateZarinLinkSettingBrandingMutationVariables = Exact<{
  terminal_id: Scalars['Int']['input'];
  template?: InputMaybe<TerminalTemplateSettingInput>;
  bio?: InputMaybe<Scalars['String']['input']>;
  contacts?: InputMaybe<TerminalContactsInput>;
}>;

export type UpdateZarinLinkSettingBrandingMutation = {
  __typename?: 'Mutation';
  TerminalSettingBranding?: {
    __typename?: 'TerminalBrandingSettingType';
    bio?: string | null;
    template?: {
      __typename?: 'TerminalTemplateSettingType';
      primary_color?: string | null;
      secondary_color?: string | null;
    } | null;
    contacts?: {
      __typename?: 'TerminalContactsType';
      phone?: string | null;
      email?: string | null;
      address?: string | null;
      socials?: {
        __typename?: 'SocialType';
        telegram?: string | null;
        facebook?: string | null;
        instagram?: string | null;
        twitter?: string | null;
        youtube?: string | null;
        linkedin?: string | null;
        discord?: string | null;
        github?: string | null;
        eta?: string | null;
        whatsapp?: string | null;
        aparat?: string | null;
      } | null;
    } | null;
  } | null;
};

export type GetZarinLinkSettingBrandingQueryVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
}>;

export type GetZarinLinkSettingBrandingQuery = {
  __typename?: 'Query';
  TerminalBrandingSetting?: {
    __typename?: 'TerminalBrandingSettingType';
    bio?: string | null;
    template?: {
      __typename?: 'TerminalTemplateSettingType';
      primary_color?: string | null;
      secondary_color?: string | null;
    } | null;
    contacts?: {
      __typename?: 'TerminalContactsType';
      phone?: string | null;
      email?: string | null;
      address?: string | null;
      socials?: {
        __typename?: 'SocialType';
        telegram?: string | null;
        facebook?: string | null;
        instagram?: string | null;
        twitter?: string | null;
        youtube?: string | null;
        linkedin?: string | null;
        discord?: string | null;
        github?: string | null;
        eta?: string | null;
        whatsapp?: string | null;
        aparat?: string | null;
      } | null;
    } | null;
  } | null;
};

export type GetZarinLinkTransactionsAggregateQueryVariables = Exact<{
  terminal_id: Scalars['ID']['input'];
  relation_id: Scalars['ID']['input'];
}>;

export type GetZarinLinkTransactionsAggregateQuery = {
  __typename?: 'Query';
  ZarinLinkTransactionsAggregate?: {
    __typename?: 'ZarinLinkAggregateTransactionsType';
    all?: {
      __typename?: 'ZarinLinkCountAmountType';
      count?: any | null;
      amount?: any | null;
    } | null;
    current_day?: {
      __typename?: 'ZarinLinkCountAmountType';
      count?: any | null;
      amount?: any | null;
    } | null;
    current_month?: {
      __typename?: 'ZarinLinkCountAmountType';
      count?: any | null;
      amount?: any | null;
    } | null;
  } | null;
};

export const GetUserAccessTokensDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUserAccessTokens' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'AccessTokens' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'client_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'client_type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                { kind: 'Field', name: { kind: 'Name', value: 'login_ip' } },
                { kind: 'Field', name: { kind: 'Name', value: 'current' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country_code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'current' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserAccessTokensQuery, GetUserAccessTokensQueryVariables>;
export const AccessTokenRemoveDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AccessTokenRemove' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'token_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'AccessTokenRemove' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'token_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'token_id' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AccessTokenRemoveMutation, AccessTokenRemoveMutationVariables>;
export const PersonalAccessTokenDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PersonalAccessToken' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'token_name' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'PersonalAccessToken' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'token_name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'token_name' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'personal_token' } },
                { kind: 'Field', name: { kind: 'Name', value: 'client_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'client_type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'client_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'login_ip' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PersonalAccessTokenMutation, PersonalAccessTokenMutationVariables>;
export const AddressAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddressAdd' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'AddressTypeEnum' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'address' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'landline' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'postal_code' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'location' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'AddressAdd' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'address' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'address' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'landline' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'landline' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'postal_code' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'postal_code' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'location' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'location' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                { kind: 'Field', name: { kind: 'Name', value: 'landline' } },
                { kind: 'Field', name: { kind: 'Name', value: 'postal_code' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddressAddMutation, AddressAddMutationVariables>;
export const AddressEditDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddressEdit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'AddressTypeEnum' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'address' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'landline' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'postal_code' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'location' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'AddressEdit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'address' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'address' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'landline' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'landline' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'postal_code' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'postal_code' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'location' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'location' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                { kind: 'Field', name: { kind: 'Name', value: 'landline' } },
                { kind: 'Field', name: { kind: 'Name', value: 'postal_code' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddressEditMutation, AddressEditMutationVariables>;
export const GetUserAddressDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUserAddress' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Me' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'level' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'landline' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'is_postal_code_verified' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'postal_code' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserAddressQuery, GetUserAddressQueryVariables>;
export const BankAccountListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'BankAccountList' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'BankAccountTypeEnum' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'BankAccounts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'holder_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pin' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'issuing_bank' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug_image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BankAccountListQuery, BankAccountListQueryVariables>;
export const BankAccountPinDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'BankAccountPin' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pin' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'BankAccountPin' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pin' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pin' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'pin' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BankAccountPinMutation, BankAccountPinMutationVariables>;
export const BankAccountDetailDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'BankAccountDetail' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'iban_holder_name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'BankAccountTypeEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pagination' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'BankAccounts' },
            name: { kind: 'Name', value: 'BankAccounts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'iban_holder_name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'iban_holder_name' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pagination' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pagination' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'is_legal' } },
                { kind: 'Field', name: { kind: 'Name', value: 'holder_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pin' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'issuing_bank' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug_image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'expired_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deleted_at' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Pagination' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'last_page' } },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BankAccountDetailQuery, BankAccountDetailQueryVariables>;
export const CheckCardIbanDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CheckCardIBAN' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pan' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'MaskedPan' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'iban' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'CheckCardIBAN' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pan' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pan' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'iban' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'iban' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
                { kind: 'Field', name: { kind: 'Name', value: 'holder_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bank_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pan' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bank_slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bank_status' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'issuing_bank' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CheckCardIbanQuery, CheckCardIbanQueryVariables>;
export const BankAccountAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'BankAccountAdd' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'iban' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'is_legal' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'BankAccountTypeEnum' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'BankAccountAdd' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'iban' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'iban' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'is_legal' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'is_legal' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'holder_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'issuing_bank' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug_image' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BankAccountAddMutation, BankAccountAddMutationVariables>;
export const BankAccountByCardAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'BankAccountByCardAdd' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pan' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'MaskedPan' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'is_legal' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'BankAccountTypeEnum' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'BankAccountByCardAdd' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pan' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pan' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'is_legal' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'is_legal' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'holder_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'issuing_bank' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug_image' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BankAccountByCardAddMutation, BankAccountByCardAddMutationVariables>;
export const TwoDayChartDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'TwoDayChart' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'date' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Date' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'TwoDayChart' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'date' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'other_day' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'today' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TwoDayChartQuery, TwoDayChartQueryVariables>;
export const BalanceChartDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'BalanceChart' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'BalanceChart' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'value' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BalanceChartQuery, BalanceChartQueryVariables>;
export const FetchIncomeChartDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'fetchIncomeChart' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'IncomeChart' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FetchIncomeChartQuery, FetchIncomeChartQueryVariables>;
export const GetCouponsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCoupons' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'CouponFilterEnum' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'Coupons' },
            name: { kind: 'Name', value: 'Coupons' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pagination' },
                value: { kind: 'BooleanValue', value: true },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'expired_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deleted_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                { kind: 'Field', name: { kind: 'Name', value: 'used' } },
                { kind: 'Field', name: { kind: 'Name', value: 'min_amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'discount_percent' } },
                { kind: 'Field', name: { kind: 'Name', value: 'max_discount_amount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'products' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Pagination' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_page' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCouponsQuery, GetCouponsQueryVariables>;
export const CouponRemoveDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CouponRemove' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'CouponRemove' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CouponRemoveMutation, CouponRemoveMutationVariables>;
export const CouponRestoreDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CouponRestore' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'CouponRestore' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CouponRestoreMutation, CouponRestoreMutationVariables>;
export const CouponEditDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CouponEdit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'max_discount_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'discount_percent' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'code' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'expired_at' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'CouponEdit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'min_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'max_discount_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'max_discount_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'discount_percent' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'discount_percent' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'code' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'code' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'expired_at' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'expired_at' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CouponEditMutation, CouponEditMutationVariables>;
export const CouponAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CouponAdd' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'discount_percent' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'code' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'max_discount_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'expired_at' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'CouponAdd' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'min_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'discount_percent' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'discount_percent' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'code' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'code' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'max_discount_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'max_discount_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'expired_at' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'expired_at' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CouponAddMutation, CouponAddMutationVariables>;
export const CouponAssignProductDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CouponAssignProduct' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'product_ids' } },
          type: {
            kind: 'ListType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'CouponAssignProduct' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'product_ids' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'product_ids' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CouponAssignProductMutation, CouponAssignProductMutationVariables>;
export const GetCouponByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCouponById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Coupons' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'expired_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                { kind: 'Field', name: { kind: 'Name', value: 'min_amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'used' } },
                { kind: 'Field', name: { kind: 'Name', value: 'discount_percent' } },
                { kind: 'Field', name: { kind: 'Name', value: 'max_discount_amount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'products' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCouponByIdQuery, GetCouponByIdQueryVariables>;
export const GetFaqDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetFaq' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Faqs' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'question' } },
                { kind: 'Field', name: { kind: 'Name', value: 'answer' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetFaqQuery, GetFaqQueryVariables>;
export const GetInstantPayoutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetInstantPayout' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'reference_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'url_code' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'InstantPayoutStatusEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'created_from_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'created_to_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'text' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'InstantPayout' },
            name: { kind: 'Name', value: 'InstantPayout' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'min_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'max_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'text' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'text' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'created_from_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'created_from_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'created_to_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'created_to_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reference_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'reference_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'url_code' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'url_code' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pagination' },
                value: { kind: 'BooleanValue', value: true },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reference_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reconciled_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url_code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                { kind: 'Field', name: { kind: 'Name', value: 'method' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reference_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'bank_account' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'holder_name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'issuing_bank' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'slug' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Pagination' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_page' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetInstantPayoutQuery, GetInstantPayoutQueryVariables>;
export const InstantPayoutInquiryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'InstantPayoutInquiry' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'bank_account_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'InstantPayoutInquiry' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'bank_account_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'bank_account_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'NullValue' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'fee_percent' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fixed_fee_amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'max_amount' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InstantPayoutInquiryQuery, InstantPayoutInquiryQueryVariables>;
export const InstantPayoutInquiryBanksDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'InstantPayoutInquiryBanks' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'InstantPayoutInquiryBanks' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'banks' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'bank_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  InstantPayoutInquiryBanksQuery,
  InstantPayoutInquiryBanksQueryVariables
>;
export const InstantPayoutAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'InstantPayoutAdd' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'bank_account_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'BigInteger' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'InstantPayoutAdd' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'bank_account_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'bank_account_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InstantPayoutAddMutation, InstantPayoutAddMutationVariables>;
export const InstantPayoutExcelExportDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'InstantPayoutExcelExport' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'created_from_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'created_to_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FilterEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'InstantPayoutStatusEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'InstantPayoutExcelExport' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'created_from_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'created_from_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'created_to_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'created_to_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'max_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'min_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  InstantPayoutExcelExportMutation,
  InstantPayoutExcelExportMutationVariables
>;
export const GetInvoicesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetInvoices' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'InvoiceStatusEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'BigInteger' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'created_from_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'created_to_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'payer_name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'payer_mobile' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'payer_email' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'Invoice' },
            name: { kind: 'Name', value: 'Invoice' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'min_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'max_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'created_from_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'created_from_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'created_to_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'created_to_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'payer_name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'payer_name' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'payer_mobile' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'payer_mobile' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'payer_email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'payer_email' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pagination' },
                value: { kind: 'BooleanValue', value: true },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'payer_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Pagination' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_page' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetInvoicesQuery, GetInvoicesQueryVariables>;
export const GetInvoiceByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetInvoiceById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'Invoice' },
            name: { kind: 'Name', value: 'Invoice' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'payer_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'payer_mobile' } },
                { kind: 'Field', name: { kind: 'Name', value: 'payer_email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'notify_type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fee_type' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetInvoiceByIdQuery, GetInvoiceByIdQueryVariables>;
export const InvoiceAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'InvoiceAdd' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'BigInteger' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'payer_name' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'payer_mobile' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'payer_email' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'notify_type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'NotifyTypeEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'count' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'fee_type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'TerminalFeeTypeEnum' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'InvoiceAdd' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'payer_name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'payer_name' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'payer_mobile' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'payer_mobile' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'payer_email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'payer_email' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'notify_type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'notify_type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'count' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'count' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'fee_type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'fee_type' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InvoiceAddMutation, InvoiceAddMutationVariables>;
export const InvoiceEditDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'InvoiceEdit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'payer_name' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'payer_mobile' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'payer_email' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'notify_type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'NotifyTypeEnum' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'InvoiceEdit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'payer_name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'payer_name' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'payer_mobile' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'payer_mobile' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'payer_email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'payer_email' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'notify_type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'notify_type' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InvoiceEditMutation, InvoiceEditMutationVariables>;
export const InvoicesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Invoices' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Invoice' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'payer_email' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sessions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'terminal_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payer_info' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'order_id' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timeline' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'created_time' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'created_reference' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'canceled_time' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'in_bank_time' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'in_bank_name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'settled_time' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'verified_time' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'verified_reference' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'reconciled_time' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'reconciled_id' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'terminal_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                { kind: 'Field', name: { kind: 'Name', value: 'notify_type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fee_type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'payer_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'payer_mobile' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deleted_at' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InvoicesQuery, InvoicesQueryVariables>;
export const NoteAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'NoteAdd' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'model_type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'NoteModelTypeEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'model_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'content' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'NoteAdd' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'model_type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'model_type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'model_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'model_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'content' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'content' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NoteAddMutation, NoteAddMutationVariables>;
export const NoteEditDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'NoteEdit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'content' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'NoteEdit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'content' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'content' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NoteEditMutation, NoteEditMutationVariables>;
export const NoteDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'NoteDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'NoteDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NoteDeleteMutation, NoteDeleteMutationVariables>;
export const GetUserNotificationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUserNotification' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Me' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'notification_preferences' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'channels' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'social_info' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'verifications' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'verify' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserNotificationQuery, GetUserNotificationQueryVariables>;
export const PreferencesEditDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PreferencesEdit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'notification_preferences' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'InputUserNotificationPreferencesType' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'PreferencesEdit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'notification_preferences' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'notification_preferences' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'notification_preferences' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'channels' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PreferencesEditMutation, PreferencesEditMutationVariables>;
export const GetPayoutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPayout' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'url_code' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FilterEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'BigInteger' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'iban' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'created_from_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'created_to_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'reference_session_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'Payout' },
            name: { kind: 'Name', value: 'Payout' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'iban' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'iban' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'url_code' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'url_code' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'created_from_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'created_from_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'created_to_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'created_to_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reference_session_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'reference_session_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'min_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'max_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pagination' },
                value: { kind: 'BooleanValue', value: true },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reconciled_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url_code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'percent' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'reference_session' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'bank_account' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'holder_name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'issuing_bank' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'slug' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Pagination' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_page' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPayoutQuery, GetPayoutQueryVariables>;
export const GetPayoutByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPayoutById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'Payout' },
            name: { kind: 'Name', value: 'Payout' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reconciled_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url_code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'percent' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'reference_session' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'bank_account' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'holder_name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'issuing_bank' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'slug' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Pagination' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_page' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPayoutByIdQuery, GetPayoutByIdQueryVariables>;
export const PayoutEditDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PayoutEdit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'PayoutStatusEnum' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'PayoutEdit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PayoutEditMutation, PayoutEditMutationVariables>;
export const PayoutInquiryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'PayoutInquiry' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'PayoutInquiry' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'fee_percent' } },
                { kind: 'Field', name: { kind: 'Name', value: 'max_amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fixed_fee_amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'min_satna' } },
                { kind: 'Field', name: { kind: 'Name', value: 'max_fee_amount' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PayoutInquiryQuery, PayoutInquiryQueryVariables>;
export const PayoutAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PayoutAdd' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'bank_account_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'BigInteger' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'reconciliation_parts' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ReconciliationPartsEnum' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'PayoutAdd' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'bank_account_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'bank_account_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reconciliation_parts' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'reconciliation_parts' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PayoutAddMutation, PayoutAddMutationVariables>;
export const PayoutRetryAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PayoutRetryAdd' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'bank_account_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'payout_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'PayoutRetryAdd' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'bank_account_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'bank_account_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'payout_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'payout_id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PayoutRetryAddMutation, PayoutRetryAddMutationVariables>;
export const PayoutExcelExportDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PayoutExcelExport' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'created_from_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'created_to_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'PayoutStatusEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'PayoutExcelExport' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'created_from_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'created_from_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'created_to_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'created_to_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'max_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'min_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PayoutExcelExportMutation, PayoutExcelExportMutationVariables>;
export const GetPayoutBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPayoutBalance' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'PayoutBalance' },
            name: { kind: 'Name', value: 'PayoutBalance' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'value' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPayoutBalanceQuery, GetPayoutBalanceQueryVariables>;
export const ActivePayoutAmountDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ActivePayoutAmount' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ActivePayoutAmount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ActivePayoutAmountQuery, ActivePayoutAmountQueryVariables>;
export const PersonalLinkRequestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PersonalLinkRequest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'username' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'PersonalLinkRequest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'username' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'username' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PersonalLinkRequestMutation, PersonalLinkRequestMutationVariables>;
export const GetProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProducts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ZarinLinkFilterEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'failed_redirect_url' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'successful_redirect_url' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'ZarinLinks' },
            name: { kind: 'Name', value: 'ZarinLinks' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'max_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'min_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'failed_redirect_url' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'failed_redirect_url' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'successful_redirect_url' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'successful_redirect_url' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pagination' },
                value: { kind: 'BooleanValue', value: true },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deleted_at' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'url' } }],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Pagination' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_page' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductsOverviewDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProductsOverview' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ZarinLinkFilterEnum' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ZarinLinks' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deleted_at' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'url' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetProductsOverviewQuery, GetProductsOverviewQueryVariables>;
export const GetProductsByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProductsById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ZarinLinks' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'link' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'show_receipt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'is_coupon_active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deleted_at' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'required_fields' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'input' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'placeholder' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'successful_redirect_url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'failed_redirect_url' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetProductsByIdQuery, GetProductsByIdQueryVariables>;
export const ZarinLinkRemoveDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ZarinLinkRemove' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ZarinLinkRemove' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ZarinLinkRemoveMutation, ZarinLinkRemoveMutationVariables>;
export const ZarinLinkRestoreDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ZarinLinkRestore' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ZarinLinkRestore' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ZarinLinkRestoreMutation, ZarinLinkRestoreMutationVariables>;
export const ZarinLinkAddImageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ZarinLinkAddImage' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'product_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'images' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ZarinLinkAddImage' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'product_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'product_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'images' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'images' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ZarinLinkAddImageMutation, ZarinLinkAddImageMutationVariables>;
export const ZarinLinkAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ZarinLinkAdd' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'show_receipt' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'is_coupon_active' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'required_fields' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ZarinLinkRequiredFieldsInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'successful_redirect_url' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'failed_redirect_url' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ZarinLinkAdd' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'show_receipt' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'show_receipt' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'is_coupon_active' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'is_coupon_active' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'required_fields' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'required_fields' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'successful_redirect_url' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'successful_redirect_url' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'failed_redirect_url' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'failed_redirect_url' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ZarinLinkAddMutation, ZarinLinkAddMutationVariables>;
export const ZarinLinkEditDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ZarinLinkEdit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'show_receipt' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'is_coupon_active' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'required_fields' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ZarinLinkRequiredFieldsInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'successful_redirect_url' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'failed_redirect_url' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ZarinLinkEdit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'show_receipt' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'show_receipt' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'is_coupon_active' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'is_coupon_active' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'required_fields' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'required_fields' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'successful_redirect_url' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'successful_redirect_url' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'failed_redirect_url' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'failed_redirect_url' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ZarinLinkEditMutation, ZarinLinkEditMutationVariables>;
export const ZarinLinkDeleteImageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ZarinLinkDeleteImage' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'product_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'image_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ZarinLinkDeleteImage' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'product_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'product_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'image_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'image_id' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ZarinLinkDeleteImageMutation, ZarinLinkDeleteImageMutationVariables>;
export const InstantPayoutReceiptDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'InstantPayoutReceipt' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'url_code' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'resource' },
            name: { kind: 'Name', value: 'InstantPayoutReceipt' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'url_code' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'url_code' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'bank_account' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'holder_name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'issuing_bank' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'owner_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'shaparak_tracking_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reconciled_at' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InstantPayoutReceiptQuery, InstantPayoutReceiptQueryVariables>;
export const PayoutReceiptDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'PayoutReceipt' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'url_code' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'resource' },
            name: { kind: 'Name', value: 'PayoutReceipt' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'url_code' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'url_code' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'owner_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tracking_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'bank_account' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'holder_name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'issuing_bank' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PayoutReceiptQuery, PayoutReceiptQueryVariables>;
export const ReconciliationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Reconciliation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ReconciliationStatusEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'reference_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'created_from_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'created_to_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'text' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'iban' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'Reconciliation' },
            name: { kind: 'Name', value: 'Reconciliation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reference_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'reference_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'created_from_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'created_from_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'created_to_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'created_to_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'text' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'text' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'min_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'max_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pagination' },
                value: { kind: 'BooleanValue', value: true },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'iban' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'iban' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reconciled_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'payable_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reference_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'estimated_payed_at' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Pagination' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_page' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReconciliationQuery, ReconciliationQueryVariables>;
export const ReconciliationExcelExportDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ReconciliationExcelExport' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'created_from_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'created_to_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FilterEnum' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ReconciliationExcelExport' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'created_from_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'created_from_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'created_to_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'created_to_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'max_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'min_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ReconciliationExcelExportMutation,
  ReconciliationExcelExportMutationVariables
>;
export const ReconciliationByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ReconciliationById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sessions_limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Reconciliation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sessions_limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sessions_limit' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'notes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'terminal_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'note' } },
                { kind: 'Field', name: { kind: 'Name', value: 'payable_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'estimated_payed_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reference_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reconciled_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sessions_count' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sessions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'reference_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'wages' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'shaparak_tracking_number' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type_id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'bank_account' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'holder_name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'issuing_bank' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'slug_image' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReconciliationByIdQuery, ReconciliationByIdQueryVariables>;
export const ReferrersReportDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ReferrersReport' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'ReferrersReport' },
            name: { kind: 'Name', value: 'ReferrersReport' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pagination' },
                value: { kind: 'BooleanValue', value: true },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'all_referrers' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sum_referrers' } },
                { kind: 'Field', name: { kind: 'Name', value: 'month_active_referrers' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sum_commission' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'commission' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'registered_at' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last_session_time' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Pagination' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_page' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReferrersReportQuery, ReferrersReportQueryVariables>;
export const ReferrerInvoiceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ReferrerInvoice' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'from_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'to_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ReferrerInvoice' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'from_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'from_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'to_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'to_date' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'from_date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to_date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReferrerInvoiceQuery, ReferrerInvoiceQueryVariables>;
export const ReferrerInvoiceGetIbanDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ReferrerInvoiceGetIban' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ReferrerInvoiceGetIban' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
                { kind: 'Field', name: { kind: 'Name', value: 'holder_name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'issuing_bank' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReferrerInvoiceGetIbanQuery, ReferrerInvoiceGetIbanQueryVariables>;
export const ReferrerInvoiceSetIbanDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'referrerInvoiceSetIban' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'bank_account_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'referrerInvoiceSetIban' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'bank_account_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'bank_account_id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'issuing_bank' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ReferrerInvoiceSetIbanMutation,
  ReferrerInvoiceSetIbanMutationVariables
>;
export const RefundFeeInquiryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'RefundFeeInquiry' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'method' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'InstantPayoutActionTypeEnum' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'RefundFeeInquiry' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'method' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'method' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'base_fee' } },
                { kind: 'Field', name: { kind: 'Name', value: 'step_amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'step_fee' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RefundFeeInquiryQuery, RefundFeeInquiryQueryVariables>;
export const AddRefundDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddRefund' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'session_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'BigInteger' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'reason' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'RefundReasonEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'method' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'InstantPayoutActionTypeEnum' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'AddRefund' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'session_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'session_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reason' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'reason' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'method' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'method' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                { kind: 'Field', name: { kind: 'Name', value: 'terminal_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'timeline' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'created_time' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'created_reference' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'canceled_time' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'in_bank_time' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'in_bank_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'verified_time' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'verified_reference' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'reconciled_time' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'refund_amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'refund_time' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddRefundMutation, AddRefundMutationVariables>;
export const SendVerifyEmailDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SendVerifyEmail' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'SendVerifyEmail' } }],
      },
    },
  ],
} as unknown as DocumentNode<SendVerifyEmailMutation, SendVerifyEmailMutationVariables>;
export const GetSessionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetSessions' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'reconciliation_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FilterEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'SessionTypeEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'note' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'created_from_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'created_to_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'reference_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'relation_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'mobile' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'CellNumber' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'card_pan' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'rrn' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'Session' },
            name: { kind: 'Name', value: 'Session' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'note' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'note' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'max_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'min_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'mobile' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'mobile' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'created_from_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'created_from_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'created_to_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'created_to_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reference_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'reference_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pagination' },
                value: { kind: 'BooleanValue', value: true },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'relation_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'relation_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'card_pan' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'card_pan' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'rrn' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'rrn' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reconciliation_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'reconciliation_id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reconciliation_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'timeline' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'refund_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'refund_status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'reconciled_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'reconciled_time' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'reconciled_status' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Pagination' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_page' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetSessionsQuery, GetSessionsQueryVariables>;
export const SessionDynamicExcelExportDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SessionDynamicExcelExport' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'fields' } },
          type: {
            kind: 'ListType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'created_from_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'created_to_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'reconciliation_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FilterEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'session_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'mobile' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'CellNumber' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'card_pan' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'reference_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'SessionTypeEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'relation_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'export_file_type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ExportFileTypeEnum' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'SessionDynamicExcelExport' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'fields' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'fields' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'created_from_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'created_from_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'created_to_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'created_to_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reconciliation_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'reconciliation_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'max_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'min_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'card_pan' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'card_pan' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'session_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'session_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'mobile' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'mobile' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reference_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'reference_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'relation_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'relation_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'export_file_type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'export_file_type' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SessionDynamicExcelExportMutation,
  SessionDynamicExcelExportMutationVariables
>;
export const SessionExcelExportDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SessionExcelExport' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'created_from_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'created_to_date' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'reconciliation_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FilterEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'session_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'mobile' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'CellNumber' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'card_pan' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'reference_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'SessionTypeEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'relation_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'export_file_type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ExportFileTypeEnum' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'SessionExcelExport' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'created_from_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'created_from_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'created_to_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'created_to_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reconciliation_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'reconciliation_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'max_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'min_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'card_pan' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'card_pan' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'session_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'session_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'mobile' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'mobile' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reference_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'reference_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'relation_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'relation_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'export_file_type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'export_file_type' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SessionExcelExportMutation, SessionExcelExportMutationVariables>;
export const SessionCardHolderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SessionCardHolder' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'session_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'SessionCardHolder' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'session_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'session_id' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SessionCardHolderMutation, SessionCardHolderMutationVariables>;
export const SessionTypeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SessionType' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'Session' },
            name: { kind: 'Name', value: 'SessionType' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SessionTypeQuery, SessionTypeQueryVariables>;
export const SessionByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SessionById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Session' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'note' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee_detail' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'sms' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'ayan' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'raw_fee' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'notes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'wage_payouts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'reference_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reconciliation_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fee_type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'authority' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'payer_info' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'card_holder_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'mobile' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'order_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'zarin_link_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'custom_field_1_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'custom_field_2_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'custom_field_1' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'custom_field_2' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'terminal' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'refund_active' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'session_tries' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'is_card_mobile_verified' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'card_info' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'agent' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'country_code' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'card_pan' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'payer_ip' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'rrn' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'refund' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'session_id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'instant_payout' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'terminal' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'bank_account' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'iban' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'holder_name' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'issuing_bank' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'slug_image' },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'reference_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'reconciled_at' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'product' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'title' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'timeline' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'canceled_time' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'created_time' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'in_bank_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'in_bank_time' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'reconciled_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'reconciled_time' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'reconciled_status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'reconciled_success_time' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'settled_time' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'verified_reference' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'verified_time' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'refund_status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'refund_amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'refund_time' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SessionByIdQuery, SessionByIdQueryVariables>;
export const ExportableFieldsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ExportableFields' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'group' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ExportGroupEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'Session' },
            name: { kind: 'Name', value: 'ExportableFields' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'group' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'group' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fields' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'is_required' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'is_selected' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ExportableFieldsQuery, ExportableFieldsQueryVariables>;
export const GetSessionExportDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetSessionExport' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'SessionExport' },
            name: { kind: 'Name', value: 'SessionExport' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pagination' },
                value: { kind: 'BooleanValue', value: true },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                { kind: 'Field', name: { kind: 'Name', value: 'uuid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Pagination' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_page' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetSessionExportQuery, GetSessionExportQueryVariables>;
export const PinTerminalDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PinTerminal' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pin' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'PinTerminal' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pin' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pin' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'pin' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PinTerminalMutation, PinTerminalMutationVariables>;
export const GetTerminalsListMenuDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTerminalsListMenu' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Terminals' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'reconcile_priority' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reconcile_type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'have_logo' } },
                { kind: 'Field', name: { kind: 'Name', value: 'max_amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reconcile_type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pin' } },
                { kind: 'Field', name: { kind: 'Name', value: 'is_default' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'permissions' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
                { kind: 'Field', name: { kind: 'Name', value: 'owner_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'preferred_bank_account_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
                { kind: 'Field', name: { kind: 'Name', value: 'chn_type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reconcile_priority' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fee_type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'support_phone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'server_ip' } },
                { kind: 'Field', name: { kind: 'Name', value: 'flag' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee_group' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'zarin_gate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'psp' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'merchant_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'terminal_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'error' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payment' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'psp_priority' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'psp' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'merchant_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'terminal_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'error' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payment' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'active_psp' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'psp' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'merchant_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'terminal_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'error' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payment' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTerminalsListMenuQuery, GetTerminalsListMenuQueryVariables>;
export const GetTerminalsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTerminals' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'Terminals' },
            name: { kind: 'Name', value: 'Terminals' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pagination' },
                value: { kind: 'BooleanValue', value: true },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
                { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Pagination' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_page' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTerminalsQuery, GetTerminalsQueryVariables>;
export const TerminalEditDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'TerminalEdit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'logo' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ValidFile' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'bank_account_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'reconcile_priority' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ReconcileCycleTypeEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'support_phone' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'CellNumber' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'server_ip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'IP' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'fee_type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'TerminalFeeTypeEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'chn_type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'TerminalChnTypeEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'psp_priority' } },
          type: {
            kind: 'ListType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'TerminalEdit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'logo' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'logo' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'bank_account_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'bank_account_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reconcile_priority' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'reconcile_priority' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'support_phone' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'support_phone' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'server_ip' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'server_ip' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'fee_type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'fee_type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'chn_type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'chn_type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'psp_priority' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'psp_priority' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'chn_type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TerminalEditMutation, TerminalEditMutationVariables>;
export const TerminalAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'TerminalAdd' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'mcc_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'domain' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'support_phone' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CellNumber' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'TerminalAdd' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'mcc_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'mcc_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'domain' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'domain' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'support_phone' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'support_phone' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TerminalAddMutation, TerminalAddMutationVariables>;
export const TerminalDomainCheckDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'TerminalDomainCheck' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'domain' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'TerminalDomainCheck' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'domain' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'domain' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TerminalDomainCheckQuery, TerminalDomainCheckQueryVariables>;
export const TerminalUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'TerminalUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'TerminalUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'user_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'user_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'user_avatar' } },
                { kind: 'Field', name: { kind: 'Name', value: 'terminal_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'access_list' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TerminalUserQuery, TerminalUserQueryVariables>;
export const TerminalDeleteAccessDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'TerminalDeleteAccess' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'TerminalDeleteAccess' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TerminalDeleteAccessMutation, TerminalDeleteAccessMutationVariables>;
export const TerminalAssignAccessDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'TerminalAssignAccess' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'user_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'access_list' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'TerminalPermissionEnum' } },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'TerminalAssignAccess' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'user_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'user_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'access_list' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'access_list' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'user_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'user_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'terminal_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'access_list' } },
                { kind: 'Field', name: { kind: 'Name', value: 'user_avatar' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TerminalAssignAccessMutation, TerminalAssignAccessMutationVariables>;
export const TerminalEditAccessDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'TerminalEditAccess' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'access_list' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'TerminalPermissionEnum' } },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'TerminalEditAccess' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'access_list' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'access_list' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'user_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'user_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'terminal_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'access_list' } },
                { kind: 'Field', name: { kind: 'Name', value: 'user_avatar' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TerminalEditAccessMutation, TerminalEditAccessMutationVariables>;
export const TerminalCategoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'TerminalCategories' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'TerminalCategories' },
            name: { kind: 'Name', value: 'TerminalCategories' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'category_identifier' } },
                { kind: 'Field', name: { kind: 'Name', value: 'parent_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'children' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'category_identifier' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'parent_id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TerminalCategoriesQuery, TerminalCategoriesQueryVariables>;
export const GetReleaseChangeLogQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetReleaseChangeLogQuery' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ReleaseChangeLogQuery' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'version' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetReleaseChangeLogQueryQuery, GetReleaseChangeLogQueryQueryVariables>;
export const GetTerminalsListAndMeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTerminalsListAndMe' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Terminals' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'permissions' } },
                { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'owner_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reconcile_type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'fee_group' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Me' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'ssn' } },
                { kind: 'Field', name: { kind: 'Name', value: 'cell_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'level' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                { kind: 'Field', name: { kind: 'Name', value: 'full_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'referral_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'vip_level' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'personal_link' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'domain' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data_status' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'kyc' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'personal' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTerminalsListAndMeQuery, GetTerminalsListAndMeQueryVariables>;
export const TerminalDailyReportDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'TerminalDailyReport' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'from_date' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Date' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'to_date' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Date' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'DailyReport' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'from_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'from_date' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'to_date' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'to_date' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sessions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'reconciliations' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'total' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'total_session_amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'total_session_count' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'total_reconciliation_amount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'total_reconciliation_count' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TerminalDailyReportQuery, TerminalDailyReportQueryVariables>;
export const GetTicketsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTickets' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'TicketStatusEnum' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'Tickets' },
            name: { kind: 'Name', value: 'Tickets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pagination' },
                value: { kind: 'BooleanValue', value: true },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_user_seen' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rate' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Pagination' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_page' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTicketsQuery, GetTicketsQueryVariables>;
export const GetDepartmentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetDepartment' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'TicketDepartments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'user_access' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetDepartmentQuery, GetDepartmentQueryVariables>;
export const TicketAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'TicketAdd' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'ticket_department_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'content' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'attachment' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'priority' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'TicketPriorityEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'model_type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ModelEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'model_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'TicketAdd' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'ticket_department_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'ticket_department_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'content' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'content' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'attachment' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'attachment' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'priority' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'priority' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'model_type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'model_type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'model_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'model_id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TicketAddMutation, TicketAddMutationVariables>;
export const TicketAddReplyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'TicketAddReply' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'ticket_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'content' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'attachment' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'TicketAddReply' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'ticket_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'ticket_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'content' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'content' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'attachment' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'attachment' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TicketAddReplyMutation, TicketAddReplyMutationVariables>;
export const TicketCloseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'TicketClose' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'TicketClose' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TicketCloseMutation, TicketCloseMutationVariables>;
export const TicketFeedbackDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'TicketFeedback' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'rate' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'TicketFeedback' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'rate' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'rate' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TicketFeedbackMutation, TicketFeedbackMutationVariables>;
export const GetTicketByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTicketById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Tickets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'model_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'replies' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'attachment' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'managed_avatar' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTicketByIdQuery, GetTicketByIdQueryVariables>;
export const GetTicketCountDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTicketCount' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'UnreadTicketsCount' } }],
      },
    },
  ],
} as unknown as DocumentNode<GetTicketCountQuery, GetTicketCountQueryVariables>;
export const GetUserIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUserId' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Me' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'ssn' } },
                { kind: 'Field', name: { kind: 'Name', value: 'cell_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'level' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                { kind: 'Field', name: { kind: 'Name', value: 'full_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'referral_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'vip_level' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'personal_link' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'domain' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data_status' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'kyc' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'personal' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserIdQuery, GetUserIdQueryVariables>;
export const DeactivateTelegramDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeactivateTelegram' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'resource' },
            name: { kind: 'Name', value: 'DeactivateTelegram' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeactivateTelegramMutation, DeactivateTelegramMutationVariables>;
export const GetNowDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetNow' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Time' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'current_time' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetNowQuery, GetNowQueryVariables>;
export const UserAnnouncementDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UserAnnouncement' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'UserAnnouncement' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url_title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserAnnouncementQuery, UserAnnouncementQueryVariables>;
export const ReturnToOldVersionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ReturnToOldVersion' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ReturnToOldVersion' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReturnToOldVersionMutation, ReturnToOldVersionMutationVariables>;
export const VerifyEmailDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'VerifyEmail' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'otp_code' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'VerifyEmail' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'otp_code' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'otp_code' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const GetNewZarinLinksDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetNewZarinLinks' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ZarinLinkTypeEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount_type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ZarinLinkAmountTypeEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'successful_redirect_url' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ZarinLinkFilterEnum' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'NewZarinLinks' },
            name: { kind: 'Name', value: 'NewZarinLinks' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount_type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount_type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'max_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'max_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'min_amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'min_amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'successful_redirect_url' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'successful_redirect_url' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'failed_redirect_url' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'successful_redirect_url' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pagination' },
                value: { kind: 'BooleanValue', value: true },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'link' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deleted_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount_type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'url' } }],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Pagination' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_page' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetNewZarinLinksQuery, GetNewZarinLinksQueryVariables>;
export const GetZarinLinkByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetZarinLinkById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ZarinLinkTypeEnum' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'NewZarinLinks' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'link' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'show_receipt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'is_coupon_active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deleted_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'required_fields' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'input' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'placeholder' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'successful_redirect_url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'failed_redirect_url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount_type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'specifications' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'meta_data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'start_date' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'start_time' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'end_time' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'end_date' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'event_type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'province' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'target_amount' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'category' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'parent' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'coupons' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'discount_percent' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetZarinLinkByIdQuery, GetZarinLinkByIdQueryVariables>;
export const ZarinLinkCreateMutationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ZarinLinkCreateMutation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'show_receipt' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'is_coupon_active' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'required_fields' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ZarinLinkRequiredFieldsInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ZarinLinkTypeEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'successful_redirect_url' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'failed_redirect_url' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount_type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ZarinLinkAmountTypeEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'meta_data' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ZarinLinkMetaDataInput' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'specifications' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ZarinLinkSpecificationInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'category_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'NewZarinLinkAdd' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'show_receipt' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'show_receipt' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'is_coupon_active' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'is_coupon_active' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'required_fields' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'required_fields' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'successful_redirect_url' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'successful_redirect_url' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'failed_redirect_url' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'failed_redirect_url' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount_type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount_type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'meta_data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'meta_data' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'specifications' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'specifications' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'category_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'category_id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ZarinLinkCreateMutationMutation,
  ZarinLinkCreateMutationMutationVariables
>;
export const ZarinLinkUpdateMutationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ZarinLinkUpdateMutation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'show_receipt' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'is_coupon_active' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'required_fields' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ZarinLinkRequiredFieldsInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ZarinLinkTypeEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'successful_redirect_url' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'failed_redirect_url' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount_type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ZarinLinkAmountTypeEnum' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'meta_data' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ZarinLinkMetaDataInput' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'specifications' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ZarinLinkSpecificationInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'category_id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'NewZarinLinkEdit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'show_receipt' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'show_receipt' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'is_coupon_active' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'is_coupon_active' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'required_fields' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'required_fields' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'successful_redirect_url' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'successful_redirect_url' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'failed_redirect_url' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'failed_redirect_url' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount_type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount_type' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'meta_data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'meta_data' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'specifications' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'specifications' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'category_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'category_id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ZarinLinkUpdateMutationMutation,
  ZarinLinkUpdateMutationMutationVariables
>;
export const ZarinLinkCategoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ZarinLinkCategories' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'CategoryTypeEnum' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ZarinLinkCategories' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'children' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ZarinLinkCategoriesQuery, ZarinLinkCategoriesQueryVariables>;
export const UpdateZarinLinkSettingBrandingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateZarinLinkSettingBranding' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'template' } },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'TerminalTemplateSettingInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'bio' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'contacts' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'TerminalContactsInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'TerminalSettingBranding' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'template' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'template' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'bio' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'bio' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'contacts' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'contacts' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'bio' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'template' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'primary_color' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'secondary_color' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contacts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'socials' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'telegram' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'facebook' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'instagram' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'twitter' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'youtube' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'linkedin' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'discord' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'github' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'eta' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'whatsapp' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'aparat' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateZarinLinkSettingBrandingMutation,
  UpdateZarinLinkSettingBrandingMutationVariables
>;
export const GetZarinLinkSettingBrandingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetZarinLinkSettingBranding' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'TerminalBrandingSetting' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'bio' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'template' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'primary_color' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'secondary_color' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contacts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'socials' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'telegram' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'facebook' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'instagram' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'twitter' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'youtube' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'linkedin' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'discord' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'github' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'eta' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'whatsapp' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'aparat' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetZarinLinkSettingBrandingQuery,
  GetZarinLinkSettingBrandingQueryVariables
>;
export const GetZarinLinkTransactionsAggregateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetZarinLinkTransactionsAggregate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'relation_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ZarinLinkTransactionsAggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terminal_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'terminal_id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'relation_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'relation_id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'all' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'current_day' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'current_month' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetZarinLinkTransactionsAggregateQuery,
  GetZarinLinkTransactionsAggregateQueryVariables
>;
