/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  query GetUserAccessTokens {\n    AccessTokens {\n      id\n      client_id\n      client_type\n      name\n      avatar\n      login_ip\n      current\n      country\n      country_code\n      updated_at\n      current\n    }\n  }\n':
    types.GetUserAccessTokensDocument,
  '\n  mutation AccessTokenRemove($token_id: ID!) {\n    AccessTokenRemove(token_id: $token_id)\n  }\n':
    types.AccessTokenRemoveDocument,
  '\n  mutation PersonalAccessToken($token_name: String!) {\n    PersonalAccessToken(token_name: $token_name) {\n      id\n      personal_token\n      client_name\n      client_type\n      client_id\n      name\n      login_ip\n      country\n\n      updated_at\n    }\n  }\n':
    types.PersonalAccessTokenDocument,
  '\n  mutation AddressAdd(\n    $type: AddressTypeEnum!\n    $title: String\n    $address: String!\n    $landline: String!\n    $postal_code: String!\n    $location: String\n  ) {\n    AddressAdd(\n      type: $type\n      title: $title\n      address: $address\n      landline: $landline\n      postal_code: $postal_code\n      location: $location\n    ) {\n      id\n      title\n      address\n      landline\n      postal_code\n    }\n  }\n':
    types.AddressAddDocument,
  '\n  mutation AddressEdit(\n    $id: ID!\n    $type: AddressTypeEnum!\n    $title: String\n    $address: String!\n    $landline: String!\n    $postal_code: String!\n    $location: String\n  ) {\n    AddressEdit(\n      id: $id\n      type: $type\n      title: $title\n      address: $address\n      landline: $landline\n      postal_code: $postal_code\n      location: $location\n    ) {\n      id\n      title\n      address\n      landline\n      postal_code\n    }\n  }\n':
    types.AddressEditDocument,
  '\n  query GetUserAddress {\n    Me {\n      id\n      level\n      addresses {\n        id\n        title\n        type\n        address\n        landline\n        is_postal_code_verified\n        postal_code\n        location\n      }\n    }\n  }\n':
    types.GetUserAddressDocument,
  '\n  query BankAccountList($id: ID, $type: BankAccountTypeEnum) {\n    BankAccounts(id: $id, type: $type) {\n      id\n      iban\n      type\n      holder_name\n      status\n      pin\n      issuing_bank {\n        slug\n        slug_image\n        name\n      }\n    }\n  }\n':
    types.BankAccountListDocument,
  '\n  mutation BankAccountPin($id: ID!, $pin: Boolean!) {\n    BankAccountPin(id: $id, pin: $pin) {\n      pin\n    }\n  }\n':
    types.BankAccountPinDocument,
  '\n  query BankAccountDetail(\n    $id: ID\n    $offset: Int\n    $limit: Int\n    $iban_holder_name: String\n    $type: BankAccountTypeEnum\n    $pagination: Boolean\n  ) {\n    BankAccounts: BankAccounts(\n      id: $id\n      offset: $offset\n      limit: $limit\n      iban_holder_name: $iban_holder_name\n      type: $type\n      pagination: $pagination\n    ) {\n      id\n      iban\n      status\n      is_legal\n      holder_name\n      type\n      pin\n      issuing_bank {\n        name\n        slug_image\n        slug\n      }\n      expired_at\n      deleted_at\n    }\n\n    Pagination {\n      last_page\n      total\n    }\n  }\n':
    types.BankAccountDetailDocument,
  '\n  query CheckCardIBAN($pan: MaskedPan, $iban: String) {\n    CheckCardIBAN(pan: $pan, iban: $iban) {\n      iban\n      holder_name\n      bank_name\n      pan\n      bank_slug\n      bank_status\n      issuing_bank {\n        name\n        slug\n      }\n    }\n  }\n':
    types.CheckCardIbanDocument,
  '\n  mutation BankAccountAdd(\n    $iban: String!\n    $is_legal: Boolean!\n    $name: String\n    $type: BankAccountTypeEnum\n  ) {\n    BankAccountAdd(type: $type, iban: $iban, name: $name, is_legal: $is_legal) {\n      id\n      iban\n      type\n      holder_name\n      status\n      issuing_bank {\n        slug\n        slug_image\n      }\n    }\n  }\n':
    types.BankAccountAddDocument,
  '\n  mutation BankAccountByCardAdd(\n    $pan: MaskedPan!\n    $is_legal: Boolean!\n    $name: String\n    $type: BankAccountTypeEnum\n  ) {\n    BankAccountByCardAdd(type: $type, pan: $pan, name: $name, is_legal: $is_legal) {\n      id\n      iban\n      type\n      holder_name\n      status\n      issuing_bank {\n        slug\n        slug_image\n      }\n    }\n  }\n':
    types.BankAccountByCardAddDocument,
  '\n  query TwoDayChart($terminal_id: ID!, $date: Date!) {\n    TwoDayChart(terminal_id: $terminal_id, date: $date) {\n      other_day {\n        date\n        value\n        count\n      }\n      today {\n        date\n        value\n        count\n      }\n    }\n  }\n':
    types.TwoDayChartDocument,
  '\n  query BalanceChart($terminal_id: ID!) {\n    BalanceChart(terminal_id: $terminal_id) {\n      value\n    }\n  }\n':
    types.BalanceChartDocument,
  '\n  query fetchIncomeChart($terminal_id: ID!) {\n    IncomeChart(terminal_id: $terminal_id) {\n      key\n      data {\n        date\n        value\n        count\n      }\n    }\n  }\n':
    types.FetchIncomeChartDocument,
  '\n  query GetCoupons($terminal_id: ID!, $limit: Int, $offset: Int, $filter: CouponFilterEnum) {\n    Coupons: Coupons(\n      terminal_id: $terminal_id\n      limit: $limit\n      offset: $offset\n      filter: $filter\n      pagination: true\n    ) {\n      id\n      expired_at\n      code\n      deleted_at\n      status\n      limit\n      used\n      min_amount\n      discount_percent\n      max_discount_amount\n      products {\n        id\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n':
    types.GetCouponsDocument,
  '\n  mutation CouponRemove($id: ID!) {\n    CouponRemove(id: $id)\n  }\n':
    types.CouponRemoveDocument,
  '\n  mutation CouponRestore($id: ID!) {\n    CouponRestore(id: $id) {\n      id\n    }\n  }\n':
    types.CouponRestoreDocument,
  '\n  mutation CouponEdit(\n    $id: ID!\n    $limit: Int\n    $min_amount: Int\n    $max_discount_amount: Int\n    $discount_percent: Int\n    $code: String\n    $expired_at: DateTime\n  ) {\n    CouponEdit(\n      id: $id\n      limit: $limit\n      min_amount: $min_amount\n      max_discount_amount: $max_discount_amount\n      discount_percent: $discount_percent\n      code: $code\n      expired_at: $expired_at\n    ) {\n      id\n    }\n  }\n':
    types.CouponEditDocument,
  '\n  mutation CouponAdd(\n    $terminal_id: ID!\n    $discount_percent: Int!\n    $code: String!\n    $max_discount_amount: Int\n    $min_amount: Int!\n    $limit: Int\n    $expired_at: DateTime\n  ) {\n    CouponAdd(\n      terminal_id: $terminal_id\n      min_amount: $min_amount\n      discount_percent: $discount_percent\n      code: $code\n      limit: $limit\n      max_discount_amount: $max_discount_amount\n      expired_at: $expired_at\n    ) {\n      id\n    }\n  }\n':
    types.CouponAddDocument,
  '\n  mutation CouponAssignProduct($id: ID!, $product_ids: [ID]) {\n    CouponAssignProduct(id: $id, product_ids: $product_ids) {\n      id\n    }\n  }\n':
    types.CouponAssignProductDocument,
  '\n  query GetCouponById($id: ID, $terminal_id: ID!) {\n    Coupons(id: $id, terminal_id: $terminal_id) {\n      id\n      expired_at\n      code\n      status\n      limit\n      min_amount\n      used\n      discount_percent\n      max_discount_amount\n      products {\n        id\n      }\n    }\n  }\n':
    types.GetCouponByIdDocument,
  '\n  query GetFaq($slug: String) {\n    Faqs(slug: $slug) {\n      id\n      slug\n      question\n      answer\n    }\n  }\n':
    types.GetFaqDocument,
  '\n  query GetInstantPayout(\n    $id: ID\n    $reference_id: String\n    $url_code: String\n    $terminal_id: ID\n    $limit: Int\n    $offset: Int\n    $status: InstantPayoutStatusEnum\n    $min_amount: Int\n    $max_amount: Int\n    $amount: Int\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $text: String\n  ) {\n    InstantPayout: InstantPayout(\n      terminal_id: $terminal_id\n      limit: $limit\n      offset: $offset\n      status: $status\n      min_amount: $min_amount\n      max_amount: $max_amount\n      amount: $amount\n      text: $text\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      reference_id: $reference_id\n      url_code: $url_code\n      id: $id\n      pagination: true\n    ) {\n      id\n      status\n      amount\n      reference_id\n      created_at\n      reconciled_at\n      description\n      url_code\n      fee\n      method\n      reference_id\n      bank_account {\n        iban\n        holder_name\n        issuing_bank {\n          slug\n        }\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n':
    types.GetInstantPayoutDocument,
  '\n  query InstantPayoutInquiry($terminal_id: ID!, $bank_account_id: ID!) {\n    InstantPayoutInquiry(\n      terminal_id: $terminal_id\n      bank_account_id: $bank_account_id\n      amount: null\n    ) {\n      fee_percent\n      fixed_fee_amount\n      type\n      max_amount\n    }\n  }\n':
    types.InstantPayoutInquiryDocument,
  '\n  query InstantPayoutInquiryBanks {\n    InstantPayoutInquiryBanks {\n      banks {\n        bank_name\n        status\n      }\n    }\n  }\n':
    types.InstantPayoutInquiryBanksDocument,
  '\n  mutation InstantPayoutAdd(\n    $terminal_id: ID!\n    $bank_account_id: ID!\n    $amount: BigInteger!\n    $description: String\n  ) {\n    InstantPayoutAdd(\n      terminal_id: $terminal_id\n      bank_account_id: $bank_account_id\n      amount: $amount\n      description: $description\n    ) {\n      id\n      status\n    }\n  }\n':
    types.InstantPayoutAddDocument,
  '\n  mutation InstantPayoutExcelExport(\n    $terminal_id: ID!\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $filter: FilterEnum\n    $amount: Int\n    $max_amount: Int\n    $min_amount: Int\n    $status: InstantPayoutStatusEnum\n    $name: String\n  ) {\n    InstantPayoutExcelExport(\n      terminal_id: $terminal_id\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      amount: $amount\n      max_amount: $max_amount\n      min_amount: $min_amount\n      status: $status\n      filter: $filter\n      name: $name\n    )\n  }\n':
    types.InstantPayoutExcelExportDocument,
  '\n  query GetInvoices(\n    $id: ID\n    $terminal_id: ID!\n    $limit: Int\n    $offset: Int\n    $filter: InvoiceStatusEnum\n    $amount: BigInteger\n    $min_amount: Int\n    $max_amount: Int\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $payer_name: String\n    $payer_mobile: String\n    $payer_email: String\n    $description: String\n  ) {\n    Invoice: Invoice(\n      id: $id\n      terminal_id: $terminal_id\n      status: $filter\n      amount: $amount\n      min_amount: $min_amount\n      max_amount: $max_amount\n      limit: $limit\n      offset: $offset\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      payer_name: $payer_name\n      payer_mobile: $payer_mobile\n      payer_email: $payer_email\n      description: $description\n      pagination: true\n    ) {\n      id\n      amount\n      created_at\n      payer_name\n      status\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n':
    types.GetInvoicesDocument,
  '\n  query GetInvoiceById($terminal_id: ID!, $id: ID) {\n    Invoice: Invoice(terminal_id: $terminal_id, id: $id) {\n      id\n      amount\n      description\n      payer_name\n      payer_mobile\n      payer_email\n      notify_type\n      fee_type\n    }\n  }\n':
    types.GetInvoiceByIdDocument,
  '\n  mutation InvoiceAdd(\n    $terminal_id: ID!\n    $amount: BigInteger!\n    $description: String!\n    $payer_name: String!\n    $payer_mobile: String!\n    $payer_email: String\n    $notify_type: NotifyTypeEnum\n    $count: Int\n    $fee_type: TerminalFeeTypeEnum\n  ) {\n    InvoiceAdd(\n      terminal_id: $terminal_id\n      amount: $amount\n      payer_name: $payer_name\n      description: $description\n      payer_mobile: $payer_mobile\n      payer_email: $payer_email\n      notify_type: $notify_type\n      count: $count\n      fee_type: $fee_type\n    ) {\n      id\n    }\n  }\n':
    types.InvoiceAddDocument,
  '\n  mutation InvoiceEdit(\n    $id: String!\n    $payer_name: String!\n    $payer_mobile: String!\n    $payer_email: String\n    $description: String!\n    $notify_type: NotifyTypeEnum\n  ) {\n    InvoiceEdit(\n      id: $id\n      payer_name: $payer_name\n      description: $description\n      payer_mobile: $payer_mobile\n      payer_email: $payer_email\n      notify_type: $notify_type\n    ) {\n      id\n    }\n  }\n':
    types.InvoiceEditDocument,
  '\n  query Invoices($terminal_id: ID!, $id: ID) {\n    Invoice(terminal_id: $terminal_id, id: $id) {\n      id\n      payer_email\n      sessions {\n        id\n        terminal_id\n        amount\n        status\n\n        payer_info {\n          order_id\n        }\n        timeline {\n          created_time\n          created_reference\n          canceled_time\n          in_bank_time\n          in_bank_name\n          settled_time\n          verified_time\n          verified_reference\n          reconciled_time\n          reconciled_id\n        }\n      }\n      terminal_id\n      status\n      amount\n      fee\n      notify_type\n      description\n      fee_type\n      payer_name\n      payer_mobile\n      created_at\n      updated_at\n      deleted_at\n    }\n  }\n':
    types.InvoicesDocument,
  '\n  mutation NoteAdd($model_type: NoteModelTypeEnum, $model_id: ID!, $content: String!) {\n    NoteAdd(model_type: $model_type, model_id: $model_id, content: $content) {\n      id\n      content\n    }\n  }\n':
    types.NoteAddDocument,
  '\n  mutation NoteEdit($id: ID!, $content: String!) {\n    NoteEdit(id: $id, content: $content) {\n      id\n      content\n    }\n  }\n':
    types.NoteEditDocument,
  '\n  mutation NoteDelete($id: ID!) {\n    NoteDelete(id: $id)\n  }\n': types.NoteDeleteDocument,
  '\n  query GetUserNotification {\n    Me {\n      id\n      email\n      notification_preferences {\n        type\n        channels\n      }\n      social_info {\n        type\n        active\n      }\n      verifications {\n        type\n        verify\n      }\n    }\n  }\n':
    types.GetUserNotificationDocument,
  '\n  mutation PreferencesEdit(\n    $notification_preferences: [InputUserNotificationPreferencesType]\n    $email: String\n  ) {\n    PreferencesEdit(notification_preferences: $notification_preferences, email: $email) {\n      notification_preferences {\n        type\n        channels\n      }\n      email\n    }\n  }\n':
    types.PreferencesEditDocument,
  '\n  query GetPayout(\n    $id: ID\n    $terminal_id: ID\n    $limit: Int\n    $url_code: String\n    $offset: Int\n    $filter: FilterEnum\n    $amount: BigInteger\n    $iban: String\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $reference_session_id: ID\n    $min_amount: Int\n    $max_amount: Int\n    $description: String\n  ) {\n    Payout: Payout(\n      id: $id\n      iban: $iban\n      terminal_id: $terminal_id\n      limit: $limit\n      url_code: $url_code\n      offset: $offset\n      filter: $filter\n      amount: $amount\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      reference_session_id: $reference_session_id\n      min_amount: $min_amount\n      max_amount: $max_amount\n      description: $description\n      pagination: true\n    ) {\n      id\n      status\n      amount\n      fee\n      created_at\n      reconciled_at\n      url_code\n      percent\n      reference_session {\n        id\n      }\n      description\n      bank_account {\n        iban\n        holder_name\n        issuing_bank {\n          slug\n        }\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n':
    types.GetPayoutDocument,
  '\n  query GetPayoutById($id: ID, $terminal_id: ID) {\n    Payout: Payout(id: $id, terminal_id: $terminal_id) {\n      id\n      status\n      amount\n      created_at\n      reconciled_at\n      url_code\n      percent\n      reference_session {\n        id\n      }\n      description\n      bank_account {\n        iban\n        holder_name\n        issuing_bank {\n          slug\n        }\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n':
    types.GetPayoutByIdDocument,
  '\n  mutation PayoutEdit($id: ID!, $status: PayoutStatusEnum) {\n    PayoutEdit(id: $id, status: $status) {\n      id\n      status\n    }\n  }\n':
    types.PayoutEditDocument,
  '\n  query PayoutInquiry($terminal_id: ID!) {\n    PayoutInquiry(terminal_id: $terminal_id) {\n      fee_percent\n      max_amount\n      fee\n      type\n      fixed_fee_amount\n      min_satna\n      max_fee_amount\n    }\n  }\n':
    types.PayoutInquiryDocument,
  '\n  mutation PayoutAdd(\n    $terminal_id: ID!\n    $bank_account_id: ID!\n    $amount: BigInteger!\n    $description: String\n    $reconciliation_parts: ReconciliationPartsEnum\n  ) {\n    PayoutAdd(\n      terminal_id: $terminal_id\n      bank_account_id: $bank_account_id\n      amount: $amount\n      description: $description\n      reconciliation_parts: $reconciliation_parts\n    ) {\n      id\n      status\n    }\n  }\n':
    types.PayoutAddDocument,
  '\n  mutation PayoutRetryAdd($terminal_id: ID!, $bank_account_id: ID!, $payout_id: ID!) {\n    PayoutRetryAdd(\n      terminal_id: $terminal_id\n      bank_account_id: $bank_account_id\n      payout_id: $payout_id\n    ) {\n      id\n      status\n    }\n  }\n':
    types.PayoutRetryAddDocument,
  '\n  mutation PayoutExcelExport(\n    $terminal_id: ID!\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $max_amount: Int\n    $min_amount: Int\n    $status: PayoutStatusEnum\n    $name: String\n  ) {\n    PayoutExcelExport(\n      terminal_id: $terminal_id\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      max_amount: $max_amount\n      min_amount: $min_amount\n      status: $status\n      name: $name\n    )\n  }\n':
    types.PayoutExcelExportDocument,
  '\n  query GetPayoutBalance($terminal_id: ID!) {\n    PayoutBalance: PayoutBalance(terminal_id: $terminal_id) {\n      value\n    }\n  }\n':
    types.GetPayoutBalanceDocument,
  '\n  query ActivePayoutAmount($terminal_id: ID!) {\n    ActivePayoutAmount(terminal_id: $terminal_id)\n  }\n':
    types.ActivePayoutAmountDocument,
  '\n  mutation PersonalLinkRequest($username: String!) {\n    PersonalLinkRequest(username: $username) {\n      id\n      domain\n    }\n  }\n':
    types.PersonalLinkRequestDocument,
  '\n  query GetProducts(\n    $terminal_id: ID\n    $id: ID\n    $limit: Int\n    $offset: Int\n    $filter: ZarinLinkFilterEnum\n    $failed_redirect_url: String\n    $successful_redirect_url: String\n    $description: String\n    $title: String\n    $amount: Int\n    $max_amount: Int\n    $min_amount: Int\n  ) {\n    ZarinLinks: ZarinLinks(\n      terminal_id: $terminal_id\n      id: $id\n      limit: $limit\n      offset: $offset\n      max_amount: $max_amount\n      min_amount: $min_amount\n      filter: $filter\n      failed_redirect_url: $failed_redirect_url\n      successful_redirect_url: $successful_redirect_url\n      description: $description\n      title: $title\n      amount: $amount\n      pagination: true\n    ) {\n      id\n      title\n      amount\n      limit\n      deleted_at\n      images {\n        url\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n':
    types.GetProductsDocument,
  '\n  query GetProductsOverview($terminal_id: ID, $filter: ZarinLinkFilterEnum) {\n    ZarinLinks(terminal_id: $terminal_id, filter: $filter) {\n      id\n      title\n      amount\n      deleted_at\n      images {\n        url\n      }\n    }\n  }\n':
    types.GetProductsOverviewDocument,
  '\n  query GetProductsById($terminal_id: ID, $id: ID) {\n    ZarinLinks(terminal_id: $terminal_id, id: $id) {\n      id\n      title\n      link\n      description\n      show_receipt\n      is_coupon_active\n      amount\n      limit\n      deleted_at\n      required_fields {\n        input\n        status\n        placeholder\n      }\n      images {\n        id\n        url\n      }\n      successful_redirect_url\n      failed_redirect_url\n    }\n  }\n':
    types.GetProductsByIdDocument,
  '\n  mutation ZarinLinkRemove($id: ID!) {\n    ZarinLinkRemove(id: $id)\n  }\n':
    types.ZarinLinkRemoveDocument,
  '\n  mutation ZarinLinkRestore($id: ID!) {\n    ZarinLinkRestore(id: $id) {\n      id\n    }\n  }\n':
    types.ZarinLinkRestoreDocument,
  '\n  mutation ZarinLinkAddImage($product_id: ID!, $images: [String!]!) {\n    ZarinLinkAddImage(product_id: $product_id, images: $images) {\n      id\n    }\n  }\n':
    types.ZarinLinkAddImageDocument,
  '\n  mutation ZarinLinkAdd(\n    $terminal_id: ID!\n    $title: String!\n    $amount: Int!\n    $description: String!\n    $show_receipt: Boolean!\n    $is_coupon_active: Boolean!\n    $required_fields: [ZarinLinkRequiredFieldsInput]\n    $limit: Int\n    $successful_redirect_url: String\n    $failed_redirect_url: String\n  ) {\n    ZarinLinkAdd(\n      terminal_id: $terminal_id\n      title: $title\n      amount: $amount\n      description: $description\n      show_receipt: $show_receipt\n      is_coupon_active: $is_coupon_active\n      required_fields: $required_fields\n      limit: $limit\n      successful_redirect_url: $successful_redirect_url\n      failed_redirect_url: $failed_redirect_url\n    ) {\n      id\n    }\n  }\n':
    types.ZarinLinkAddDocument,
  '\n  mutation ZarinLinkEdit(\n    $id: ID!\n    $terminal_id: ID\n    $title: String\n    $amount: Int\n    $description: String\n    $show_receipt: Boolean\n    $is_coupon_active: Boolean\n    $required_fields: [ZarinLinkRequiredFieldsInput]\n    $limit: Int\n    $successful_redirect_url: String\n    $failed_redirect_url: String\n  ) {\n    ZarinLinkEdit(\n      id: $id\n      terminal_id: $terminal_id\n      title: $title\n      amount: $amount\n      description: $description\n      show_receipt: $show_receipt\n      is_coupon_active: $is_coupon_active\n      required_fields: $required_fields\n      limit: $limit\n      successful_redirect_url: $successful_redirect_url\n      failed_redirect_url: $failed_redirect_url\n    ) {\n      id\n    }\n  }\n':
    types.ZarinLinkEditDocument,
  '\n  mutation ZarinLinkDeleteImage($product_id: ID!, $image_id: String!) {\n    ZarinLinkDeleteImage(product_id: $product_id, image_id: $image_id)\n  }\n':
    types.ZarinLinkDeleteImageDocument,
  '\n  query InstantPayoutReceipt($url_code: String!) {\n    resource: InstantPayoutReceipt(url_code: $url_code) {\n      id\n      status\n      bank_account {\n        id\n        iban\n        holder_name\n        issuing_bank {\n          slug\n          name\n        }\n      }\n      description\n      fee\n      amount\n      owner_name\n      created_at\n      updated_at\n      shaparak_tracking_number\n      reconciled_at\n    }\n  }\n':
    types.InstantPayoutReceiptDocument,
  '\n  query PayoutReceipt($url_code: String!) {\n    resource: PayoutReceipt(url_code: $url_code) {\n      id\n      amount\n      owner_name\n      tracking_id\n      bank_account {\n        id\n        iban\n        holder_name\n        issuing_bank {\n          slug\n          name\n        }\n      }\n      status\n      created_at\n      description\n    }\n  }\n':
    types.PayoutReceiptDocument,
  '\n  query Reconciliation(\n    $filter: ReconciliationStatusEnum\n    $terminal_id: ID\n    $offset: Int\n    $limit: Int\n    $id: ID\n    $reference_id: String\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $text: String\n    $min_amount: Int\n    $max_amount: Int\n    $amount: Int\n    $iban: String\n  ) {\n    Reconciliation: Reconciliation(\n      filter: $filter\n      terminal_id: $terminal_id\n      offset: $offset\n      limit: $limit\n      id: $id\n      reference_id: $reference_id\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      text: $text\n      min_amount: $min_amount\n      max_amount: $max_amount\n      amount: $amount\n      pagination: true\n      iban: $iban\n    ) {\n      id\n      status\n      reconciled_at\n      amount\n      payable_at\n      created_at\n      fee\n      reference_id\n      estimated_payed_at\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n':
    types.ReconciliationDocument,
  '\n  mutation ReconciliationExcelExport(\n    $terminal_id: ID!\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $amount: Int\n    $max_amount: Int\n    $min_amount: Int\n    $name: String\n    $filter: FilterEnum\n  ) {\n    ReconciliationExcelExport(\n      terminal_id: $terminal_id\n      filter: $filter\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      amount: $amount\n      max_amount: $max_amount\n      min_amount: $min_amount\n      name: $name\n    )\n  }\n':
    types.ReconciliationExcelExportDocument,
  '\n  query ReconciliationById($id: ID, $terminal_id: ID, $limit: Int, $sessions_limit: Int) {\n    Reconciliation(\n      terminal_id: $terminal_id\n      id: $id\n      limit: $limit\n      sessions_limit: $sessions_limit\n    ) {\n      id\n      notes {\n        id\n        content\n        created_at\n        updated_at\n        user {\n          name\n        }\n      }\n      terminal_id\n      status\n      amount\n      note\n      payable_at\n      estimated_payed_at\n      description\n      reference_id\n      reconciled_at\n      fee\n      sessions_count\n      sessions {\n        amount\n        created_at\n        fee\n        reference_id\n        id\n      }\n      wages {\n        id\n        fee\n        shaparak_tracking_number\n        amount\n        type\n        type_id\n        bank_account {\n          id\n          iban\n          holder_name\n          issuing_bank {\n            name\n            slug\n            slug_image\n          }\n        }\n      }\n    }\n  }\n':
    types.ReconciliationByIdDocument,
  '\n  query ReferrersReport($offset: Int, $limit: Int) {\n    ReferrersReport: ReferrersReport(offset: $offset, limit: $limit, pagination: true) {\n      all_referrers\n      sum_referrers\n      month_active_referrers\n      sum_commission\n      user {\n        id\n        name\n        avatar\n        commission\n        registered_at\n        last_session_time\n      }\n    }\n    Pagination {\n      total\n      last_page\n      name\n    }\n  }\n':
    types.ReferrersReportDocument,
  '\n  query ReferrerInvoice($from_date: DateTime, $to_date: DateTime) {\n    ReferrerInvoice(from_date: $from_date, to_date: $to_date) {\n      id\n      status\n      amount\n      from_date\n      to_date\n      created_at\n    }\n  }\n':
    types.ReferrerInvoiceDocument,
  '\n  query ReferrerInvoiceGetIban {\n    ReferrerInvoiceGetIban {\n      id\n      iban\n      holder_name\n      issuing_bank {\n        name\n        slug\n      }\n    }\n  }\n':
    types.ReferrerInvoiceGetIbanDocument,
  '\n  mutation referrerInvoiceSetIban($bank_account_id: ID) {\n    referrerInvoiceSetIban(bank_account_id: $bank_account_id) {\n      id\n      issuing_bank {\n        name\n        slug\n      }\n    }\n  }\n':
    types.ReferrerInvoiceSetIbanDocument,
  '\n  query RefundFeeInquiry($method: InstantPayoutActionTypeEnum) {\n    RefundFeeInquiry(method: $method) {\n      base_fee\n      step_amount\n      step_fee\n    }\n  }\n':
    types.RefundFeeInquiryDocument,
  '\n  mutation AddRefund(\n    $session_id: ID!\n    $amount: BigInteger!\n    $description: String\n    $reason: RefundReasonEnum\n    $method: InstantPayoutActionTypeEnum\n  ) {\n    AddRefund(\n      session_id: $session_id\n      amount: $amount\n      description: $description\n      reason: $reason\n      method: $method\n    ) {\n      id\n      amount\n      fee\n      terminal_id\n      timeline {\n        created_time\n        created_reference\n        canceled_time\n        in_bank_time\n        in_bank_name\n        verified_time\n        verified_reference\n        reconciled_time\n        refund_amount\n        refund_time\n      }\n    }\n  }\n':
    types.AddRefundDocument,
  '\n  mutation SendVerifyEmail {\n    SendVerifyEmail\n  }\n': types.SendVerifyEmailDocument,
  '\n  query GetSessions(\n    $reconciliation_id: ID\n    $filter: FilterEnum\n    $terminal_id: ID\n    $offset: Int\n    $limit: Int\n    $type: SessionTypeEnum\n    $amount: Int\n    $note: String\n    $max_amount: Int\n    $min_amount: Int\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $id: ID\n    $reference_id: String\n    $relation_id: ID\n    $mobile: CellNumber\n    $email: String\n    $description: String\n    $card_pan: String\n    $rrn: String\n  ) {\n    Session: Session(\n      filter: $filter\n      type: $type\n      note: $note\n      terminal_id: $terminal_id\n      offset: $offset\n      limit: $limit\n      amount: $amount\n      max_amount: $max_amount\n      min_amount: $min_amount\n      mobile: $mobile\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      id: $id\n      reference_id: $reference_id\n      pagination: true\n      relation_id: $relation_id\n      card_pan: $card_pan\n      email: $email\n      description: $description\n      rrn: $rrn\n      reconciliation_id: $reconciliation_id\n    ) {\n      id\n      type\n      status\n      created_at\n      description\n      reconciliation_id\n      amount\n      fee\n      timeline {\n        refund_id\n        refund_status\n        reconciled_id\n        reconciled_time\n        reconciled_status\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n':
    types.GetSessionsDocument,
  '\n  mutation SessionDynamicExcelExport(\n    $terminal_id: ID!\n    $fields: [String]\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $reconciliation_id: ID\n    $amount: Int\n    $max_amount: Int\n    $min_amount: Int\n    $filter: FilterEnum\n    $name: String\n    $session_id: ID\n    $mobile: CellNumber\n    $email: String\n    $card_pan: String\n    $description: String\n    $reference_id: String\n    $type: SessionTypeEnum\n    $relation_id: ID\n    $export_file_type: ExportFileTypeEnum\n  ) {\n    SessionDynamicExcelExport(\n      terminal_id: $terminal_id\n      fields: $fields\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      reconciliation_id: $reconciliation_id\n      amount: $amount\n      max_amount: $max_amount\n      min_amount: $min_amount\n      filter: $filter\n      name: $name\n      card_pan: $card_pan\n      email: $email\n      session_id: $session_id\n      mobile: $mobile\n      description: $description\n      reference_id: $reference_id\n      type: $type\n      relation_id: $relation_id\n      export_file_type: $export_file_type\n    )\n  }\n':
    types.SessionDynamicExcelExportDocument,
  '\n  mutation SessionExcelExport(\n    $terminal_id: ID!\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $reconciliation_id: ID\n    $amount: Int\n    $max_amount: Int\n    $min_amount: Int\n    $filter: FilterEnum\n    $name: String\n    $session_id: ID\n    $mobile: CellNumber\n    $email: String\n    $card_pan: String\n    $description: String\n    $reference_id: String\n    $type: SessionTypeEnum\n    $relation_id: ID\n    $export_file_type: ExportFileTypeEnum\n  ) {\n    SessionExcelExport(\n      terminal_id: $terminal_id\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      reconciliation_id: $reconciliation_id\n      amount: $amount\n      max_amount: $max_amount\n      min_amount: $min_amount\n      filter: $filter\n      name: $name\n      card_pan: $card_pan\n      email: $email\n      session_id: $session_id\n      mobile: $mobile\n      description: $description\n      reference_id: $reference_id\n      type: $type\n      relation_id: $relation_id\n      export_file_type: $export_file_type\n    )\n  }\n':
    types.SessionExcelExportDocument,
  '\n  mutation SessionCardHolder($session_id: ID!) {\n    SessionCardHolder(session_id: $session_id)\n  }\n':
    types.SessionCardHolderDocument,
  '\n  query SessionType($terminal_id: ID!) {\n    Session: SessionType(terminal_id: $terminal_id) {\n      name\n    }\n  }\n':
    types.SessionTypeDocument,
  '\n  query SessionById($terminal_id: ID, $id: ID) {\n    Session(terminal_id: $terminal_id, id: $id) {\n      id\n      note\n      fee_detail {\n        sms\n        ayan\n        raw_fee\n      }\n      notes {\n        id\n        content\n        created_at\n        updated_at\n        user {\n          name\n        }\n      }\n      wage_payouts {\n        id\n      }\n      reference_id\n      reconciliation_id\n      type\n      fee\n      fee_type\n      status\n      amount\n      authority\n      description\n      created_at\n      payer_info {\n        card_holder_name\n        description\n        email\n        mobile\n        name\n        order_id\n        zarin_link_id\n        custom_field_1_name\n        custom_field_2_name\n        custom_field_1\n        custom_field_2\n      }\n      terminal {\n        id\n        refund_active\n      }\n      session_tries {\n        is_card_mobile_verified\n        card_info {\n          name\n          slug\n        }\n        agent {\n          country_code\n        }\n        card_pan\n        payer_ip\n        rrn\n        status\n      }\n      refund {\n        id\n        session_id\n        instant_payout {\n          id\n          amount\n          fee\n          terminal {\n            id\n          }\n          bank_account {\n            id\n            iban\n            holder_name\n            issuing_bank {\n              name\n              slug\n              slug_image\n            }\n          }\n          reference_id\n          reconciled_at\n          created_at\n          status\n        }\n      }\n      product {\n        title\n      }\n      timeline {\n        canceled_time\n        created_time\n        in_bank_name\n        in_bank_time\n        reconciled_id\n        reconciled_time\n        reconciled_status\n        reconciled_success_time\n        settled_time\n        verified_reference\n        verified_time\n        refund_status\n        refund_amount\n        refund_time\n      }\n    }\n  }\n':
    types.SessionByIdDocument,
  '\n  query ExportableFields($group: ExportGroupEnum, $terminal_id: Int!) {\n    Session: ExportableFields(group: $group, terminal_id: $terminal_id) {\n      key\n      categories {\n        key\n        fields {\n          title\n          slug\n          is_required\n          is_selected\n        }\n      }\n    }\n  }\n':
    types.ExportableFieldsDocument,
  '\n  query GetSessionExport($slug: String, $offset: Int, $limit: Int) {\n    SessionExport: SessionExport(slug: $slug, offset: $offset, limit: $limit, pagination: true) {\n      id\n      type\n      name\n      url\n      size\n      uuid\n      status\n      created_at\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n':
    types.GetSessionExportDocument,
  '\n  mutation PinTerminal($id: ID!, $pin: Boolean!) {\n    PinTerminal(id: $id, pin: $pin) {\n      pin\n    }\n  }\n':
    types.PinTerminalDocument,
  '\n  query GetTerminalsListMenu {\n    Terminals {\n      reconcile_priority\n      reconcile_type\n      id\n      created_at\n      have_logo\n      max_amount\n      reconcile_type\n      pin\n      is_default\n      status\n      permissions\n      name\n      domain\n      owner_id\n      preferred_bank_account_id\n      key\n      logo\n      chn_type\n      reconcile_priority\n      fee_type\n      support_phone\n      server_ip\n      flag\n      fee_group {\n        id\n      }\n      zarin_gate {\n        psp\n        merchant_id\n        status\n        terminal_id\n        error\n        payment {\n          name\n        }\n      }\n      psp_priority {\n        psp\n        merchant_id\n        status\n        terminal_id\n        error\n        payment {\n          name\n        }\n      }\n      active_psp {\n        psp\n        merchant_id\n        status\n        terminal_id\n        error\n        payment {\n          name\n        }\n      }\n    }\n  }\n':
    types.GetTerminalsListMenuDocument,
  '\n  query GetTerminals($offset: Int, $limit: Int) {\n    Terminals: Terminals(offset: $offset, limit: $limit, pagination: true) {\n      id\n      status\n      name\n      domain\n      logo\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n':
    types.GetTerminalsDocument,
  '\n  mutation TerminalEdit(\n    $id: ID!\n    $logo: ValidFile\n    $bank_account_id: ID\n    $reconcile_priority: ReconcileCycleTypeEnum\n    $support_phone: CellNumber\n    $server_ip: IP\n    $fee_type: TerminalFeeTypeEnum\n    $chn_type: TerminalChnTypeEnum\n    $psp_priority: [String]\n  ) {\n    TerminalEdit(\n      id: $id\n      logo: $logo\n      bank_account_id: $bank_account_id\n      reconcile_priority: $reconcile_priority\n      support_phone: $support_phone\n      server_ip: $server_ip\n      fee_type: $fee_type\n      chn_type: $chn_type\n      psp_priority: $psp_priority\n    ) {\n      id\n      chn_type\n      logo\n    }\n  }\n':
    types.TerminalEditDocument,
  '\n  mutation TerminalAdd(\n    $mcc_id: ID!\n    $domain: String!\n    $name: String!\n    $support_phone: CellNumber!\n  ) {\n    TerminalAdd(mcc_id: $mcc_id, domain: $domain, name: $name, support_phone: $support_phone) {\n      id\n    }\n  }\n':
    types.TerminalAddDocument,
  '\n  query TerminalDomainCheck($domain: String!) {\n    TerminalDomainCheck(domain: $domain) {\n      type\n      title\n    }\n  }\n':
    types.TerminalDomainCheckDocument,
  '\n  query TerminalUser($terminal_id: ID!) {\n    TerminalUser(terminal_id: $terminal_id) {\n      id\n      user_id\n      user_name\n      user_avatar\n      terminal_id\n      access_list\n    }\n  }\n':
    types.TerminalUserDocument,
  '\n  mutation TerminalDeleteAccess($id: ID!, $terminal_id: ID!) {\n    TerminalDeleteAccess(id: $id, terminal_id: $terminal_id)\n  }\n':
    types.TerminalDeleteAccessDocument,
  '\n  mutation TerminalAssignAccess(\n    $terminal_id: ID!\n    $user_id: ID!\n    $access_list: [TerminalPermissionEnum]!\n  ) {\n    TerminalAssignAccess(terminal_id: $terminal_id, user_id: $user_id, access_list: $access_list) {\n      id\n      user_id\n      user_name\n      terminal_id\n      access_list\n      user_avatar\n    }\n  }\n':
    types.TerminalAssignAccessDocument,
  '\n  mutation TerminalEditAccess(\n    $id: ID!\n    $terminal_id: ID!\n    $access_list: [TerminalPermissionEnum]!\n  ) {\n    TerminalEditAccess(id: $id, terminal_id: $terminal_id, access_list: $access_list) {\n      id\n      user_id\n      user_name\n      terminal_id\n      access_list\n      user_avatar\n    }\n  }\n':
    types.TerminalEditAccessDocument,
  '\n  query TerminalCategories {\n    TerminalCategories: TerminalCategories {\n      id\n      title\n      slug\n      category_identifier\n      parent_id\n      children {\n        id\n        title\n        slug\n        category_identifier\n        parent_id\n      }\n    }\n  }\n':
    types.TerminalCategoriesDocument,
  '\n  query GetReleaseChangeLogQuery {\n    ReleaseChangeLogQuery {\n      version\n      content\n      created_at\n    }\n  }\n':
    types.GetReleaseChangeLogQueryDocument,
  '\n  query GetTerminalsListAndMe {\n    Terminals {\n      id\n      permissions\n      domain\n      status\n      owner_id\n      reconcile_type\n      fee_group {\n        id\n      }\n    }\n    Me {\n      id\n      ssn\n      cell_number\n      level\n      created_at\n      avatar\n      full_name\n      referral_id\n      email\n      vip_level\n      personal_link {\n        domain\n      }\n      addresses {\n        id\n      }\n      data_status {\n        kyc\n        email\n        personal\n      }\n    }\n  }\n':
    types.GetTerminalsListAndMeDocument,
  '\n  query TerminalDailyReport($terminal_id: ID!, $from_date: Date!, $to_date: Date!) {\n    DailyReport(terminal_id: $terminal_id, from_date: $from_date, to_date: $to_date) {\n      sessions {\n        date\n        amount\n        count\n      }\n      reconciliations {\n        date\n        amount\n        count\n      }\n      total {\n        total_session_amount\n        total_session_count\n        total_reconciliation_amount\n        total_reconciliation_count\n      }\n    }\n  }\n':
    types.TerminalDailyReportDocument,
  '\n  query GetTickets($id: ID, $limit: Int, $offset: Int, $status: TicketStatusEnum) {\n    Tickets: Tickets(id: $id, limit: $limit, offset: $offset, status: $status, pagination: true) {\n      title\n      id\n      status\n      updated_at\n      first_user_seen\n      rate\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n':
    types.GetTicketsDocument,
  '\n  query GetDepartment {\n    TicketDepartments {\n      id\n      title\n      user_access\n    }\n  }\n':
    types.GetDepartmentDocument,
  '\n  mutation TicketAdd(\n    $ticket_department_id: ID!\n    $title: String!\n    $content: String!\n    $attachment: String\n    $priority: TicketPriorityEnum\n    $model_type: ModelEnum\n    $model_id: ID\n  ) {\n    TicketAdd(\n      ticket_department_id: $ticket_department_id\n      title: $title\n      content: $content\n      attachment: $attachment\n      priority: $priority\n      model_type: $model_type\n      model_id: $model_id\n    ) {\n      id\n    }\n  }\n':
    types.TicketAddDocument,
  '\n  mutation TicketAddReply($ticket_id: ID!, $content: String!, $attachment: String) {\n    TicketAddReply(ticket_id: $ticket_id, content: $content, attachment: $attachment) {\n      id\n    }\n  }\n':
    types.TicketAddReplyDocument,
  '\n  mutation TicketClose($id: ID!) {\n    TicketClose(id: $id)\n  }\n':
    types.TicketCloseDocument,
  '\n  mutation TicketFeedback($id: ID!, $rate: Int) {\n    TicketFeedback(id: $id, rate: $rate)\n  }\n':
    types.TicketFeedbackDocument,
  '\n  query GetTicketById($id: ID!) {\n    Tickets(id: $id) {\n      id\n      status\n      title\n      created_at\n      updated_at\n      rate\n      model_id\n      replies {\n        id\n        content\n        attachment\n        created_at\n        user {\n          name\n          id\n          managed_avatar\n        }\n      }\n    }\n  }\n':
    types.GetTicketByIdDocument,
  '\n  query GetTicketCount {\n    UnreadTicketsCount\n  }\n': types.GetTicketCountDocument,
  '\n  query GetUserId {\n    Me {\n      id\n      ssn\n      cell_number\n      level\n      created_at\n      avatar\n      full_name\n      referral_id\n      email\n      vip_level\n      personal_link {\n        domain\n      }\n      addresses {\n        id\n      }\n      data_status {\n        kyc\n        email\n        personal\n      }\n    }\n  }\n':
    types.GetUserIdDocument,
  '\n  mutation DeactivateTelegram {\n    resource: DeactivateTelegram\n  }\n':
    types.DeactivateTelegramDocument,
  '\n  query GetNow {\n    Time {\n      current_time\n    }\n  }\n': types.GetNowDocument,
  '\n  query UserAnnouncement {\n    UserAnnouncement {\n      id\n      title\n      message\n      url_title\n      url\n      created_at\n    }\n  }\n':
    types.UserAnnouncementDocument,
  '\n  mutation ReturnToOldVersion($description: String!) {\n    ReturnToOldVersion(description: $description)\n  }\n':
    types.ReturnToOldVersionDocument,
  '\n  mutation VerifyEmail($otp_code: String!) {\n    VerifyEmail(otp_code: $otp_code)\n  }\n':
    types.VerifyEmailDocument,
  '\n  query GetNewZarinLinks(\n    $id: ID\n    $type: ZarinLinkTypeEnum\n    $terminal_id: ID\n    $title: String\n    $offset: Int\n    $amount_type: ZarinLinkAmountTypeEnum\n    $amount: Int\n    $max_amount: Int\n    $min_amount: Int\n    $description: String\n    $successful_redirect_url: String\n    $limit: Int\n    $filter: ZarinLinkFilterEnum\n  ) {\n    NewZarinLinks: NewZarinLinks(\n      id: $id\n      type: $type\n      terminal_id: $terminal_id\n      title: $title\n      amount_type: $amount_type\n      amount: $amount\n      max_amount: $max_amount\n      min_amount: $min_amount\n      offset: $offset\n      description: $description\n      successful_redirect_url: $successful_redirect_url\n      failed_redirect_url: $successful_redirect_url\n      filter: $filter\n      limit: $limit\n      pagination: true\n    ) {\n      id\n      link\n      title\n      limit\n      type\n      created_at\n      deleted_at\n      amount\n      amount_type\n      images {\n        url\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n':
    types.GetNewZarinLinksDocument,
  '\n  query GetZarinLinkById($terminal_id: ID, $id: ID, $type: ZarinLinkTypeEnum) {\n    NewZarinLinks(terminal_id: $terminal_id, id: $id, type: $type) {\n      id\n      title\n      link\n      description\n      show_receipt\n      is_coupon_active\n      amount\n      limit\n      deleted_at\n      updated_at\n      created_at\n      required_fields {\n        input\n        status\n        placeholder\n      }\n      successful_redirect_url\n      failed_redirect_url\n      amount_type\n      type\n      specifications {\n        key\n        value\n      }\n      meta_data {\n        start_date\n        start_time\n        end_time\n        end_date\n        event_type\n        province\n        city\n        address\n        url\n        target_amount\n      }\n      category {\n        id\n        title\n        parent {\n          id\n          title\n        }\n      }\n      images {\n        id\n        url\n      }\n      coupons {\n        id\n        discount_percent\n        code\n      }\n    }\n  }\n':
    types.GetZarinLinkByIdDocument,
  '\n  mutation ZarinLinkCreateMutation(\n    $terminal_id: ID!\n    $title: String!\n    $amount: Int!\n    $description: String!\n    $show_receipt: Boolean!\n    $is_coupon_active: Boolean!\n    $required_fields: [ZarinLinkRequiredFieldsInput]\n    $limit: Int\n    $type: ZarinLinkTypeEnum\n    $successful_redirect_url: String\n    $failed_redirect_url: String\n    $amount_type: ZarinLinkAmountTypeEnum\n    $meta_data: ZarinLinkMetaDataInput\n    $specifications: [ZarinLinkSpecificationInput]\n    $category_id: Int\n  ) {\n    NewZarinLinkAdd(\n      terminal_id: $terminal_id\n      title: $title\n      amount: $amount\n      description: $description\n      show_receipt: $show_receipt\n      is_coupon_active: $is_coupon_active\n      required_fields: $required_fields\n      limit: $limit\n      successful_redirect_url: $successful_redirect_url\n      failed_redirect_url: $failed_redirect_url\n      type: $type\n      amount_type: $amount_type\n      meta_data: $meta_data\n      specifications: $specifications\n      category_id: $category_id\n    ) {\n      id\n    }\n  }\n':
    types.ZarinLinkCreateMutationDocument,
  '\n  mutation ZarinLinkUpdateMutation(\n    $terminal_id: ID!\n    $id: ID!\n    $title: String!\n    $amount: Int!\n    $description: String!\n    $show_receipt: Boolean!\n    $is_coupon_active: Boolean!\n    $required_fields: [ZarinLinkRequiredFieldsInput]\n    $limit: Int\n    $type: ZarinLinkTypeEnum\n    $successful_redirect_url: String\n    $failed_redirect_url: String\n    $amount_type: ZarinLinkAmountTypeEnum\n    $meta_data: ZarinLinkMetaDataInput\n    $specifications: [ZarinLinkSpecificationInput]\n    $category_id: Int\n  ) {\n    NewZarinLinkEdit(\n      id: $id\n      terminal_id: $terminal_id\n      title: $title\n      amount: $amount\n      description: $description\n      show_receipt: $show_receipt\n      is_coupon_active: $is_coupon_active\n      required_fields: $required_fields\n      limit: $limit\n      successful_redirect_url: $successful_redirect_url\n      failed_redirect_url: $failed_redirect_url\n      type: $type\n      amount_type: $amount_type\n      meta_data: $meta_data\n      specifications: $specifications\n      category_id: $category_id\n    ) {\n      id\n    }\n  }\n':
    types.ZarinLinkUpdateMutationDocument,
  '\n  query ZarinLinkCategories($type: CategoryTypeEnum) {\n    ZarinLinkCategories(type: $type) {\n      id\n      title\n      slug\n      type\n      children {\n        id\n        title\n      }\n    }\n  }\n':
    types.ZarinLinkCategoriesDocument,
  '\n  mutation UpdateZarinLinkSettingBranding(\n    $terminal_id: Int!\n    $template: TerminalTemplateSettingInput\n    $bio: String\n    $contacts: TerminalContactsInput\n  ) {\n    TerminalSettingBranding(\n      terminal_id: $terminal_id\n      template: $template\n      bio: $bio\n      contacts: $contacts\n    ) {\n      bio\n      template {\n        primary_color\n        secondary_color\n      }\n      contacts {\n        phone\n        email\n        address\n        socials {\n          telegram\n          facebook\n          instagram\n          twitter\n          youtube\n          linkedin\n          discord\n          github\n          eta\n          whatsapp\n          aparat\n        }\n      }\n    }\n  }\n':
    types.UpdateZarinLinkSettingBrandingDocument,
  '\n  query GetZarinLinkSettingBranding($terminal_id: ID!) {\n    TerminalBrandingSetting(terminal_id: $terminal_id) {\n      bio\n      template {\n        primary_color\n        secondary_color\n      }\n      contacts {\n        phone\n        email\n        address\n        socials {\n          telegram\n          facebook\n          instagram\n          twitter\n          youtube\n          linkedin\n          discord\n          github\n          eta\n          whatsapp\n          aparat\n        }\n      }\n    }\n  }\n':
    types.GetZarinLinkSettingBrandingDocument,
  '\n  query GetZarinLinkTransactionsAggregate($terminal_id: ID!, $relation_id: ID!) {\n    ZarinLinkTransactionsAggregate(terminal_id: $terminal_id, relation_id: $relation_id) {\n      all {\n        count\n        amount\n      }\n      current_day {\n        count\n        amount\n      }\n      current_month {\n        count\n        amount\n      }\n    }\n  }\n':
    types.GetZarinLinkTransactionsAggregateDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetUserAccessTokens {\n    AccessTokens {\n      id\n      client_id\n      client_type\n      name\n      avatar\n      login_ip\n      current\n      country\n      country_code\n      updated_at\n      current\n    }\n  }\n'
): (typeof documents)['\n  query GetUserAccessTokens {\n    AccessTokens {\n      id\n      client_id\n      client_type\n      name\n      avatar\n      login_ip\n      current\n      country\n      country_code\n      updated_at\n      current\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AccessTokenRemove($token_id: ID!) {\n    AccessTokenRemove(token_id: $token_id)\n  }\n'
): (typeof documents)['\n  mutation AccessTokenRemove($token_id: ID!) {\n    AccessTokenRemove(token_id: $token_id)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation PersonalAccessToken($token_name: String!) {\n    PersonalAccessToken(token_name: $token_name) {\n      id\n      personal_token\n      client_name\n      client_type\n      client_id\n      name\n      login_ip\n      country\n\n      updated_at\n    }\n  }\n'
): (typeof documents)['\n  mutation PersonalAccessToken($token_name: String!) {\n    PersonalAccessToken(token_name: $token_name) {\n      id\n      personal_token\n      client_name\n      client_type\n      client_id\n      name\n      login_ip\n      country\n\n      updated_at\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AddressAdd(\n    $type: AddressTypeEnum!\n    $title: String\n    $address: String!\n    $landline: String!\n    $postal_code: String!\n    $location: String\n  ) {\n    AddressAdd(\n      type: $type\n      title: $title\n      address: $address\n      landline: $landline\n      postal_code: $postal_code\n      location: $location\n    ) {\n      id\n      title\n      address\n      landline\n      postal_code\n    }\n  }\n'
): (typeof documents)['\n  mutation AddressAdd(\n    $type: AddressTypeEnum!\n    $title: String\n    $address: String!\n    $landline: String!\n    $postal_code: String!\n    $location: String\n  ) {\n    AddressAdd(\n      type: $type\n      title: $title\n      address: $address\n      landline: $landline\n      postal_code: $postal_code\n      location: $location\n    ) {\n      id\n      title\n      address\n      landline\n      postal_code\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AddressEdit(\n    $id: ID!\n    $type: AddressTypeEnum!\n    $title: String\n    $address: String!\n    $landline: String!\n    $postal_code: String!\n    $location: String\n  ) {\n    AddressEdit(\n      id: $id\n      type: $type\n      title: $title\n      address: $address\n      landline: $landline\n      postal_code: $postal_code\n      location: $location\n    ) {\n      id\n      title\n      address\n      landline\n      postal_code\n    }\n  }\n'
): (typeof documents)['\n  mutation AddressEdit(\n    $id: ID!\n    $type: AddressTypeEnum!\n    $title: String\n    $address: String!\n    $landline: String!\n    $postal_code: String!\n    $location: String\n  ) {\n    AddressEdit(\n      id: $id\n      type: $type\n      title: $title\n      address: $address\n      landline: $landline\n      postal_code: $postal_code\n      location: $location\n    ) {\n      id\n      title\n      address\n      landline\n      postal_code\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetUserAddress {\n    Me {\n      id\n      level\n      addresses {\n        id\n        title\n        type\n        address\n        landline\n        is_postal_code_verified\n        postal_code\n        location\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetUserAddress {\n    Me {\n      id\n      level\n      addresses {\n        id\n        title\n        type\n        address\n        landline\n        is_postal_code_verified\n        postal_code\n        location\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query BankAccountList($id: ID, $type: BankAccountTypeEnum) {\n    BankAccounts(id: $id, type: $type) {\n      id\n      iban\n      type\n      holder_name\n      status\n      pin\n      issuing_bank {\n        slug\n        slug_image\n        name\n      }\n    }\n  }\n'
): (typeof documents)['\n  query BankAccountList($id: ID, $type: BankAccountTypeEnum) {\n    BankAccounts(id: $id, type: $type) {\n      id\n      iban\n      type\n      holder_name\n      status\n      pin\n      issuing_bank {\n        slug\n        slug_image\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation BankAccountPin($id: ID!, $pin: Boolean!) {\n    BankAccountPin(id: $id, pin: $pin) {\n      pin\n    }\n  }\n'
): (typeof documents)['\n  mutation BankAccountPin($id: ID!, $pin: Boolean!) {\n    BankAccountPin(id: $id, pin: $pin) {\n      pin\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query BankAccountDetail(\n    $id: ID\n    $offset: Int\n    $limit: Int\n    $iban_holder_name: String\n    $type: BankAccountTypeEnum\n    $pagination: Boolean\n  ) {\n    BankAccounts: BankAccounts(\n      id: $id\n      offset: $offset\n      limit: $limit\n      iban_holder_name: $iban_holder_name\n      type: $type\n      pagination: $pagination\n    ) {\n      id\n      iban\n      status\n      is_legal\n      holder_name\n      type\n      pin\n      issuing_bank {\n        name\n        slug_image\n        slug\n      }\n      expired_at\n      deleted_at\n    }\n\n    Pagination {\n      last_page\n      total\n    }\n  }\n'
): (typeof documents)['\n  query BankAccountDetail(\n    $id: ID\n    $offset: Int\n    $limit: Int\n    $iban_holder_name: String\n    $type: BankAccountTypeEnum\n    $pagination: Boolean\n  ) {\n    BankAccounts: BankAccounts(\n      id: $id\n      offset: $offset\n      limit: $limit\n      iban_holder_name: $iban_holder_name\n      type: $type\n      pagination: $pagination\n    ) {\n      id\n      iban\n      status\n      is_legal\n      holder_name\n      type\n      pin\n      issuing_bank {\n        name\n        slug_image\n        slug\n      }\n      expired_at\n      deleted_at\n    }\n\n    Pagination {\n      last_page\n      total\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query CheckCardIBAN($pan: MaskedPan, $iban: String) {\n    CheckCardIBAN(pan: $pan, iban: $iban) {\n      iban\n      holder_name\n      bank_name\n      pan\n      bank_slug\n      bank_status\n      issuing_bank {\n        name\n        slug\n      }\n    }\n  }\n'
): (typeof documents)['\n  query CheckCardIBAN($pan: MaskedPan, $iban: String) {\n    CheckCardIBAN(pan: $pan, iban: $iban) {\n      iban\n      holder_name\n      bank_name\n      pan\n      bank_slug\n      bank_status\n      issuing_bank {\n        name\n        slug\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation BankAccountAdd(\n    $iban: String!\n    $is_legal: Boolean!\n    $name: String\n    $type: BankAccountTypeEnum\n  ) {\n    BankAccountAdd(type: $type, iban: $iban, name: $name, is_legal: $is_legal) {\n      id\n      iban\n      type\n      holder_name\n      status\n      issuing_bank {\n        slug\n        slug_image\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation BankAccountAdd(\n    $iban: String!\n    $is_legal: Boolean!\n    $name: String\n    $type: BankAccountTypeEnum\n  ) {\n    BankAccountAdd(type: $type, iban: $iban, name: $name, is_legal: $is_legal) {\n      id\n      iban\n      type\n      holder_name\n      status\n      issuing_bank {\n        slug\n        slug_image\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation BankAccountByCardAdd(\n    $pan: MaskedPan!\n    $is_legal: Boolean!\n    $name: String\n    $type: BankAccountTypeEnum\n  ) {\n    BankAccountByCardAdd(type: $type, pan: $pan, name: $name, is_legal: $is_legal) {\n      id\n      iban\n      type\n      holder_name\n      status\n      issuing_bank {\n        slug\n        slug_image\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation BankAccountByCardAdd(\n    $pan: MaskedPan!\n    $is_legal: Boolean!\n    $name: String\n    $type: BankAccountTypeEnum\n  ) {\n    BankAccountByCardAdd(type: $type, pan: $pan, name: $name, is_legal: $is_legal) {\n      id\n      iban\n      type\n      holder_name\n      status\n      issuing_bank {\n        slug\n        slug_image\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query TwoDayChart($terminal_id: ID!, $date: Date!) {\n    TwoDayChart(terminal_id: $terminal_id, date: $date) {\n      other_day {\n        date\n        value\n        count\n      }\n      today {\n        date\n        value\n        count\n      }\n    }\n  }\n'
): (typeof documents)['\n  query TwoDayChart($terminal_id: ID!, $date: Date!) {\n    TwoDayChart(terminal_id: $terminal_id, date: $date) {\n      other_day {\n        date\n        value\n        count\n      }\n      today {\n        date\n        value\n        count\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query BalanceChart($terminal_id: ID!) {\n    BalanceChart(terminal_id: $terminal_id) {\n      value\n    }\n  }\n'
): (typeof documents)['\n  query BalanceChart($terminal_id: ID!) {\n    BalanceChart(terminal_id: $terminal_id) {\n      value\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query fetchIncomeChart($terminal_id: ID!) {\n    IncomeChart(terminal_id: $terminal_id) {\n      key\n      data {\n        date\n        value\n        count\n      }\n    }\n  }\n'
): (typeof documents)['\n  query fetchIncomeChart($terminal_id: ID!) {\n    IncomeChart(terminal_id: $terminal_id) {\n      key\n      data {\n        date\n        value\n        count\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetCoupons($terminal_id: ID!, $limit: Int, $offset: Int, $filter: CouponFilterEnum) {\n    Coupons: Coupons(\n      terminal_id: $terminal_id\n      limit: $limit\n      offset: $offset\n      filter: $filter\n      pagination: true\n    ) {\n      id\n      expired_at\n      code\n      deleted_at\n      status\n      limit\n      used\n      min_amount\n      discount_percent\n      max_discount_amount\n      products {\n        id\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'
): (typeof documents)['\n  query GetCoupons($terminal_id: ID!, $limit: Int, $offset: Int, $filter: CouponFilterEnum) {\n    Coupons: Coupons(\n      terminal_id: $terminal_id\n      limit: $limit\n      offset: $offset\n      filter: $filter\n      pagination: true\n    ) {\n      id\n      expired_at\n      code\n      deleted_at\n      status\n      limit\n      used\n      min_amount\n      discount_percent\n      max_discount_amount\n      products {\n        id\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CouponRemove($id: ID!) {\n    CouponRemove(id: $id)\n  }\n'
): (typeof documents)['\n  mutation CouponRemove($id: ID!) {\n    CouponRemove(id: $id)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CouponRestore($id: ID!) {\n    CouponRestore(id: $id) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation CouponRestore($id: ID!) {\n    CouponRestore(id: $id) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CouponEdit(\n    $id: ID!\n    $limit: Int\n    $min_amount: Int\n    $max_discount_amount: Int\n    $discount_percent: Int\n    $code: String\n    $expired_at: DateTime\n  ) {\n    CouponEdit(\n      id: $id\n      limit: $limit\n      min_amount: $min_amount\n      max_discount_amount: $max_discount_amount\n      discount_percent: $discount_percent\n      code: $code\n      expired_at: $expired_at\n    ) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation CouponEdit(\n    $id: ID!\n    $limit: Int\n    $min_amount: Int\n    $max_discount_amount: Int\n    $discount_percent: Int\n    $code: String\n    $expired_at: DateTime\n  ) {\n    CouponEdit(\n      id: $id\n      limit: $limit\n      min_amount: $min_amount\n      max_discount_amount: $max_discount_amount\n      discount_percent: $discount_percent\n      code: $code\n      expired_at: $expired_at\n    ) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CouponAdd(\n    $terminal_id: ID!\n    $discount_percent: Int!\n    $code: String!\n    $max_discount_amount: Int\n    $min_amount: Int!\n    $limit: Int\n    $expired_at: DateTime\n  ) {\n    CouponAdd(\n      terminal_id: $terminal_id\n      min_amount: $min_amount\n      discount_percent: $discount_percent\n      code: $code\n      limit: $limit\n      max_discount_amount: $max_discount_amount\n      expired_at: $expired_at\n    ) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation CouponAdd(\n    $terminal_id: ID!\n    $discount_percent: Int!\n    $code: String!\n    $max_discount_amount: Int\n    $min_amount: Int!\n    $limit: Int\n    $expired_at: DateTime\n  ) {\n    CouponAdd(\n      terminal_id: $terminal_id\n      min_amount: $min_amount\n      discount_percent: $discount_percent\n      code: $code\n      limit: $limit\n      max_discount_amount: $max_discount_amount\n      expired_at: $expired_at\n    ) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CouponAssignProduct($id: ID!, $product_ids: [ID]) {\n    CouponAssignProduct(id: $id, product_ids: $product_ids) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation CouponAssignProduct($id: ID!, $product_ids: [ID]) {\n    CouponAssignProduct(id: $id, product_ids: $product_ids) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetCouponById($id: ID, $terminal_id: ID!) {\n    Coupons(id: $id, terminal_id: $terminal_id) {\n      id\n      expired_at\n      code\n      status\n      limit\n      min_amount\n      used\n      discount_percent\n      max_discount_amount\n      products {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetCouponById($id: ID, $terminal_id: ID!) {\n    Coupons(id: $id, terminal_id: $terminal_id) {\n      id\n      expired_at\n      code\n      status\n      limit\n      min_amount\n      used\n      discount_percent\n      max_discount_amount\n      products {\n        id\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetFaq($slug: String) {\n    Faqs(slug: $slug) {\n      id\n      slug\n      question\n      answer\n    }\n  }\n'
): (typeof documents)['\n  query GetFaq($slug: String) {\n    Faqs(slug: $slug) {\n      id\n      slug\n      question\n      answer\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetInstantPayout(\n    $id: ID\n    $reference_id: String\n    $url_code: String\n    $terminal_id: ID\n    $limit: Int\n    $offset: Int\n    $status: InstantPayoutStatusEnum\n    $min_amount: Int\n    $max_amount: Int\n    $amount: Int\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $text: String\n  ) {\n    InstantPayout: InstantPayout(\n      terminal_id: $terminal_id\n      limit: $limit\n      offset: $offset\n      status: $status\n      min_amount: $min_amount\n      max_amount: $max_amount\n      amount: $amount\n      text: $text\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      reference_id: $reference_id\n      url_code: $url_code\n      id: $id\n      pagination: true\n    ) {\n      id\n      status\n      amount\n      reference_id\n      created_at\n      reconciled_at\n      description\n      url_code\n      fee\n      method\n      reference_id\n      bank_account {\n        iban\n        holder_name\n        issuing_bank {\n          slug\n        }\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'
): (typeof documents)['\n  query GetInstantPayout(\n    $id: ID\n    $reference_id: String\n    $url_code: String\n    $terminal_id: ID\n    $limit: Int\n    $offset: Int\n    $status: InstantPayoutStatusEnum\n    $min_amount: Int\n    $max_amount: Int\n    $amount: Int\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $text: String\n  ) {\n    InstantPayout: InstantPayout(\n      terminal_id: $terminal_id\n      limit: $limit\n      offset: $offset\n      status: $status\n      min_amount: $min_amount\n      max_amount: $max_amount\n      amount: $amount\n      text: $text\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      reference_id: $reference_id\n      url_code: $url_code\n      id: $id\n      pagination: true\n    ) {\n      id\n      status\n      amount\n      reference_id\n      created_at\n      reconciled_at\n      description\n      url_code\n      fee\n      method\n      reference_id\n      bank_account {\n        iban\n        holder_name\n        issuing_bank {\n          slug\n        }\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query InstantPayoutInquiry($terminal_id: ID!, $bank_account_id: ID!) {\n    InstantPayoutInquiry(\n      terminal_id: $terminal_id\n      bank_account_id: $bank_account_id\n      amount: null\n    ) {\n      fee_percent\n      fixed_fee_amount\n      type\n      max_amount\n    }\n  }\n'
): (typeof documents)['\n  query InstantPayoutInquiry($terminal_id: ID!, $bank_account_id: ID!) {\n    InstantPayoutInquiry(\n      terminal_id: $terminal_id\n      bank_account_id: $bank_account_id\n      amount: null\n    ) {\n      fee_percent\n      fixed_fee_amount\n      type\n      max_amount\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query InstantPayoutInquiryBanks {\n    InstantPayoutInquiryBanks {\n      banks {\n        bank_name\n        status\n      }\n    }\n  }\n'
): (typeof documents)['\n  query InstantPayoutInquiryBanks {\n    InstantPayoutInquiryBanks {\n      banks {\n        bank_name\n        status\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation InstantPayoutAdd(\n    $terminal_id: ID!\n    $bank_account_id: ID!\n    $amount: BigInteger!\n    $description: String\n  ) {\n    InstantPayoutAdd(\n      terminal_id: $terminal_id\n      bank_account_id: $bank_account_id\n      amount: $amount\n      description: $description\n    ) {\n      id\n      status\n    }\n  }\n'
): (typeof documents)['\n  mutation InstantPayoutAdd(\n    $terminal_id: ID!\n    $bank_account_id: ID!\n    $amount: BigInteger!\n    $description: String\n  ) {\n    InstantPayoutAdd(\n      terminal_id: $terminal_id\n      bank_account_id: $bank_account_id\n      amount: $amount\n      description: $description\n    ) {\n      id\n      status\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation InstantPayoutExcelExport(\n    $terminal_id: ID!\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $filter: FilterEnum\n    $amount: Int\n    $max_amount: Int\n    $min_amount: Int\n    $status: InstantPayoutStatusEnum\n    $name: String\n  ) {\n    InstantPayoutExcelExport(\n      terminal_id: $terminal_id\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      amount: $amount\n      max_amount: $max_amount\n      min_amount: $min_amount\n      status: $status\n      filter: $filter\n      name: $name\n    )\n  }\n'
): (typeof documents)['\n  mutation InstantPayoutExcelExport(\n    $terminal_id: ID!\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $filter: FilterEnum\n    $amount: Int\n    $max_amount: Int\n    $min_amount: Int\n    $status: InstantPayoutStatusEnum\n    $name: String\n  ) {\n    InstantPayoutExcelExport(\n      terminal_id: $terminal_id\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      amount: $amount\n      max_amount: $max_amount\n      min_amount: $min_amount\n      status: $status\n      filter: $filter\n      name: $name\n    )\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetInvoices(\n    $id: ID\n    $terminal_id: ID!\n    $limit: Int\n    $offset: Int\n    $filter: InvoiceStatusEnum\n    $amount: BigInteger\n    $min_amount: Int\n    $max_amount: Int\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $payer_name: String\n    $payer_mobile: String\n    $payer_email: String\n    $description: String\n  ) {\n    Invoice: Invoice(\n      id: $id\n      terminal_id: $terminal_id\n      status: $filter\n      amount: $amount\n      min_amount: $min_amount\n      max_amount: $max_amount\n      limit: $limit\n      offset: $offset\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      payer_name: $payer_name\n      payer_mobile: $payer_mobile\n      payer_email: $payer_email\n      description: $description\n      pagination: true\n    ) {\n      id\n      amount\n      created_at\n      payer_name\n      status\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'
): (typeof documents)['\n  query GetInvoices(\n    $id: ID\n    $terminal_id: ID!\n    $limit: Int\n    $offset: Int\n    $filter: InvoiceStatusEnum\n    $amount: BigInteger\n    $min_amount: Int\n    $max_amount: Int\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $payer_name: String\n    $payer_mobile: String\n    $payer_email: String\n    $description: String\n  ) {\n    Invoice: Invoice(\n      id: $id\n      terminal_id: $terminal_id\n      status: $filter\n      amount: $amount\n      min_amount: $min_amount\n      max_amount: $max_amount\n      limit: $limit\n      offset: $offset\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      payer_name: $payer_name\n      payer_mobile: $payer_mobile\n      payer_email: $payer_email\n      description: $description\n      pagination: true\n    ) {\n      id\n      amount\n      created_at\n      payer_name\n      status\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetInvoiceById($terminal_id: ID!, $id: ID) {\n    Invoice: Invoice(terminal_id: $terminal_id, id: $id) {\n      id\n      amount\n      description\n      payer_name\n      payer_mobile\n      payer_email\n      notify_type\n      fee_type\n    }\n  }\n'
): (typeof documents)['\n  query GetInvoiceById($terminal_id: ID!, $id: ID) {\n    Invoice: Invoice(terminal_id: $terminal_id, id: $id) {\n      id\n      amount\n      description\n      payer_name\n      payer_mobile\n      payer_email\n      notify_type\n      fee_type\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation InvoiceAdd(\n    $terminal_id: ID!\n    $amount: BigInteger!\n    $description: String!\n    $payer_name: String!\n    $payer_mobile: String!\n    $payer_email: String\n    $notify_type: NotifyTypeEnum\n    $count: Int\n    $fee_type: TerminalFeeTypeEnum\n  ) {\n    InvoiceAdd(\n      terminal_id: $terminal_id\n      amount: $amount\n      payer_name: $payer_name\n      description: $description\n      payer_mobile: $payer_mobile\n      payer_email: $payer_email\n      notify_type: $notify_type\n      count: $count\n      fee_type: $fee_type\n    ) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation InvoiceAdd(\n    $terminal_id: ID!\n    $amount: BigInteger!\n    $description: String!\n    $payer_name: String!\n    $payer_mobile: String!\n    $payer_email: String\n    $notify_type: NotifyTypeEnum\n    $count: Int\n    $fee_type: TerminalFeeTypeEnum\n  ) {\n    InvoiceAdd(\n      terminal_id: $terminal_id\n      amount: $amount\n      payer_name: $payer_name\n      description: $description\n      payer_mobile: $payer_mobile\n      payer_email: $payer_email\n      notify_type: $notify_type\n      count: $count\n      fee_type: $fee_type\n    ) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation InvoiceEdit(\n    $id: String!\n    $payer_name: String!\n    $payer_mobile: String!\n    $payer_email: String\n    $description: String!\n    $notify_type: NotifyTypeEnum\n  ) {\n    InvoiceEdit(\n      id: $id\n      payer_name: $payer_name\n      description: $description\n      payer_mobile: $payer_mobile\n      payer_email: $payer_email\n      notify_type: $notify_type\n    ) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation InvoiceEdit(\n    $id: String!\n    $payer_name: String!\n    $payer_mobile: String!\n    $payer_email: String\n    $description: String!\n    $notify_type: NotifyTypeEnum\n  ) {\n    InvoiceEdit(\n      id: $id\n      payer_name: $payer_name\n      description: $description\n      payer_mobile: $payer_mobile\n      payer_email: $payer_email\n      notify_type: $notify_type\n    ) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Invoices($terminal_id: ID!, $id: ID) {\n    Invoice(terminal_id: $terminal_id, id: $id) {\n      id\n      payer_email\n      sessions {\n        id\n        terminal_id\n        amount\n        status\n\n        payer_info {\n          order_id\n        }\n        timeline {\n          created_time\n          created_reference\n          canceled_time\n          in_bank_time\n          in_bank_name\n          settled_time\n          verified_time\n          verified_reference\n          reconciled_time\n          reconciled_id\n        }\n      }\n      terminal_id\n      status\n      amount\n      fee\n      notify_type\n      description\n      fee_type\n      payer_name\n      payer_mobile\n      created_at\n      updated_at\n      deleted_at\n    }\n  }\n'
): (typeof documents)['\n  query Invoices($terminal_id: ID!, $id: ID) {\n    Invoice(terminal_id: $terminal_id, id: $id) {\n      id\n      payer_email\n      sessions {\n        id\n        terminal_id\n        amount\n        status\n\n        payer_info {\n          order_id\n        }\n        timeline {\n          created_time\n          created_reference\n          canceled_time\n          in_bank_time\n          in_bank_name\n          settled_time\n          verified_time\n          verified_reference\n          reconciled_time\n          reconciled_id\n        }\n      }\n      terminal_id\n      status\n      amount\n      fee\n      notify_type\n      description\n      fee_type\n      payer_name\n      payer_mobile\n      created_at\n      updated_at\n      deleted_at\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation NoteAdd($model_type: NoteModelTypeEnum, $model_id: ID!, $content: String!) {\n    NoteAdd(model_type: $model_type, model_id: $model_id, content: $content) {\n      id\n      content\n    }\n  }\n'
): (typeof documents)['\n  mutation NoteAdd($model_type: NoteModelTypeEnum, $model_id: ID!, $content: String!) {\n    NoteAdd(model_type: $model_type, model_id: $model_id, content: $content) {\n      id\n      content\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation NoteEdit($id: ID!, $content: String!) {\n    NoteEdit(id: $id, content: $content) {\n      id\n      content\n    }\n  }\n'
): (typeof documents)['\n  mutation NoteEdit($id: ID!, $content: String!) {\n    NoteEdit(id: $id, content: $content) {\n      id\n      content\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation NoteDelete($id: ID!) {\n    NoteDelete(id: $id)\n  }\n'
): (typeof documents)['\n  mutation NoteDelete($id: ID!) {\n    NoteDelete(id: $id)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetUserNotification {\n    Me {\n      id\n      email\n      notification_preferences {\n        type\n        channels\n      }\n      social_info {\n        type\n        active\n      }\n      verifications {\n        type\n        verify\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetUserNotification {\n    Me {\n      id\n      email\n      notification_preferences {\n        type\n        channels\n      }\n      social_info {\n        type\n        active\n      }\n      verifications {\n        type\n        verify\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation PreferencesEdit(\n    $notification_preferences: [InputUserNotificationPreferencesType]\n    $email: String\n  ) {\n    PreferencesEdit(notification_preferences: $notification_preferences, email: $email) {\n      notification_preferences {\n        type\n        channels\n      }\n      email\n    }\n  }\n'
): (typeof documents)['\n  mutation PreferencesEdit(\n    $notification_preferences: [InputUserNotificationPreferencesType]\n    $email: String\n  ) {\n    PreferencesEdit(notification_preferences: $notification_preferences, email: $email) {\n      notification_preferences {\n        type\n        channels\n      }\n      email\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetPayout(\n    $id: ID\n    $terminal_id: ID\n    $limit: Int\n    $url_code: String\n    $offset: Int\n    $filter: FilterEnum\n    $amount: BigInteger\n    $iban: String\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $reference_session_id: ID\n    $min_amount: Int\n    $max_amount: Int\n    $description: String\n  ) {\n    Payout: Payout(\n      id: $id\n      iban: $iban\n      terminal_id: $terminal_id\n      limit: $limit\n      url_code: $url_code\n      offset: $offset\n      filter: $filter\n      amount: $amount\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      reference_session_id: $reference_session_id\n      min_amount: $min_amount\n      max_amount: $max_amount\n      description: $description\n      pagination: true\n    ) {\n      id\n      status\n      amount\n      fee\n      created_at\n      reconciled_at\n      url_code\n      percent\n      reference_session {\n        id\n      }\n      description\n      bank_account {\n        iban\n        holder_name\n        issuing_bank {\n          slug\n        }\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'
): (typeof documents)['\n  query GetPayout(\n    $id: ID\n    $terminal_id: ID\n    $limit: Int\n    $url_code: String\n    $offset: Int\n    $filter: FilterEnum\n    $amount: BigInteger\n    $iban: String\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $reference_session_id: ID\n    $min_amount: Int\n    $max_amount: Int\n    $description: String\n  ) {\n    Payout: Payout(\n      id: $id\n      iban: $iban\n      terminal_id: $terminal_id\n      limit: $limit\n      url_code: $url_code\n      offset: $offset\n      filter: $filter\n      amount: $amount\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      reference_session_id: $reference_session_id\n      min_amount: $min_amount\n      max_amount: $max_amount\n      description: $description\n      pagination: true\n    ) {\n      id\n      status\n      amount\n      fee\n      created_at\n      reconciled_at\n      url_code\n      percent\n      reference_session {\n        id\n      }\n      description\n      bank_account {\n        iban\n        holder_name\n        issuing_bank {\n          slug\n        }\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetPayoutById($id: ID, $terminal_id: ID) {\n    Payout: Payout(id: $id, terminal_id: $terminal_id) {\n      id\n      status\n      amount\n      created_at\n      reconciled_at\n      url_code\n      percent\n      reference_session {\n        id\n      }\n      description\n      bank_account {\n        iban\n        holder_name\n        issuing_bank {\n          slug\n        }\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'
): (typeof documents)['\n  query GetPayoutById($id: ID, $terminal_id: ID) {\n    Payout: Payout(id: $id, terminal_id: $terminal_id) {\n      id\n      status\n      amount\n      created_at\n      reconciled_at\n      url_code\n      percent\n      reference_session {\n        id\n      }\n      description\n      bank_account {\n        iban\n        holder_name\n        issuing_bank {\n          slug\n        }\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation PayoutEdit($id: ID!, $status: PayoutStatusEnum) {\n    PayoutEdit(id: $id, status: $status) {\n      id\n      status\n    }\n  }\n'
): (typeof documents)['\n  mutation PayoutEdit($id: ID!, $status: PayoutStatusEnum) {\n    PayoutEdit(id: $id, status: $status) {\n      id\n      status\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query PayoutInquiry($terminal_id: ID!) {\n    PayoutInquiry(terminal_id: $terminal_id) {\n      fee_percent\n      max_amount\n      fee\n      type\n      fixed_fee_amount\n      min_satna\n      max_fee_amount\n    }\n  }\n'
): (typeof documents)['\n  query PayoutInquiry($terminal_id: ID!) {\n    PayoutInquiry(terminal_id: $terminal_id) {\n      fee_percent\n      max_amount\n      fee\n      type\n      fixed_fee_amount\n      min_satna\n      max_fee_amount\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation PayoutAdd(\n    $terminal_id: ID!\n    $bank_account_id: ID!\n    $amount: BigInteger!\n    $description: String\n    $reconciliation_parts: ReconciliationPartsEnum\n  ) {\n    PayoutAdd(\n      terminal_id: $terminal_id\n      bank_account_id: $bank_account_id\n      amount: $amount\n      description: $description\n      reconciliation_parts: $reconciliation_parts\n    ) {\n      id\n      status\n    }\n  }\n'
): (typeof documents)['\n  mutation PayoutAdd(\n    $terminal_id: ID!\n    $bank_account_id: ID!\n    $amount: BigInteger!\n    $description: String\n    $reconciliation_parts: ReconciliationPartsEnum\n  ) {\n    PayoutAdd(\n      terminal_id: $terminal_id\n      bank_account_id: $bank_account_id\n      amount: $amount\n      description: $description\n      reconciliation_parts: $reconciliation_parts\n    ) {\n      id\n      status\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation PayoutRetryAdd($terminal_id: ID!, $bank_account_id: ID!, $payout_id: ID!) {\n    PayoutRetryAdd(\n      terminal_id: $terminal_id\n      bank_account_id: $bank_account_id\n      payout_id: $payout_id\n    ) {\n      id\n      status\n    }\n  }\n'
): (typeof documents)['\n  mutation PayoutRetryAdd($terminal_id: ID!, $bank_account_id: ID!, $payout_id: ID!) {\n    PayoutRetryAdd(\n      terminal_id: $terminal_id\n      bank_account_id: $bank_account_id\n      payout_id: $payout_id\n    ) {\n      id\n      status\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation PayoutExcelExport(\n    $terminal_id: ID!\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $max_amount: Int\n    $min_amount: Int\n    $status: PayoutStatusEnum\n    $name: String\n  ) {\n    PayoutExcelExport(\n      terminal_id: $terminal_id\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      max_amount: $max_amount\n      min_amount: $min_amount\n      status: $status\n      name: $name\n    )\n  }\n'
): (typeof documents)['\n  mutation PayoutExcelExport(\n    $terminal_id: ID!\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $max_amount: Int\n    $min_amount: Int\n    $status: PayoutStatusEnum\n    $name: String\n  ) {\n    PayoutExcelExport(\n      terminal_id: $terminal_id\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      max_amount: $max_amount\n      min_amount: $min_amount\n      status: $status\n      name: $name\n    )\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetPayoutBalance($terminal_id: ID!) {\n    PayoutBalance: PayoutBalance(terminal_id: $terminal_id) {\n      value\n    }\n  }\n'
): (typeof documents)['\n  query GetPayoutBalance($terminal_id: ID!) {\n    PayoutBalance: PayoutBalance(terminal_id: $terminal_id) {\n      value\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query ActivePayoutAmount($terminal_id: ID!) {\n    ActivePayoutAmount(terminal_id: $terminal_id)\n  }\n'
): (typeof documents)['\n  query ActivePayoutAmount($terminal_id: ID!) {\n    ActivePayoutAmount(terminal_id: $terminal_id)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation PersonalLinkRequest($username: String!) {\n    PersonalLinkRequest(username: $username) {\n      id\n      domain\n    }\n  }\n'
): (typeof documents)['\n  mutation PersonalLinkRequest($username: String!) {\n    PersonalLinkRequest(username: $username) {\n      id\n      domain\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetProducts(\n    $terminal_id: ID\n    $id: ID\n    $limit: Int\n    $offset: Int\n    $filter: ZarinLinkFilterEnum\n    $failed_redirect_url: String\n    $successful_redirect_url: String\n    $description: String\n    $title: String\n    $amount: Int\n    $max_amount: Int\n    $min_amount: Int\n  ) {\n    ZarinLinks: ZarinLinks(\n      terminal_id: $terminal_id\n      id: $id\n      limit: $limit\n      offset: $offset\n      max_amount: $max_amount\n      min_amount: $min_amount\n      filter: $filter\n      failed_redirect_url: $failed_redirect_url\n      successful_redirect_url: $successful_redirect_url\n      description: $description\n      title: $title\n      amount: $amount\n      pagination: true\n    ) {\n      id\n      title\n      amount\n      limit\n      deleted_at\n      images {\n        url\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'
): (typeof documents)['\n  query GetProducts(\n    $terminal_id: ID\n    $id: ID\n    $limit: Int\n    $offset: Int\n    $filter: ZarinLinkFilterEnum\n    $failed_redirect_url: String\n    $successful_redirect_url: String\n    $description: String\n    $title: String\n    $amount: Int\n    $max_amount: Int\n    $min_amount: Int\n  ) {\n    ZarinLinks: ZarinLinks(\n      terminal_id: $terminal_id\n      id: $id\n      limit: $limit\n      offset: $offset\n      max_amount: $max_amount\n      min_amount: $min_amount\n      filter: $filter\n      failed_redirect_url: $failed_redirect_url\n      successful_redirect_url: $successful_redirect_url\n      description: $description\n      title: $title\n      amount: $amount\n      pagination: true\n    ) {\n      id\n      title\n      amount\n      limit\n      deleted_at\n      images {\n        url\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetProductsOverview($terminal_id: ID, $filter: ZarinLinkFilterEnum) {\n    ZarinLinks(terminal_id: $terminal_id, filter: $filter) {\n      id\n      title\n      amount\n      deleted_at\n      images {\n        url\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetProductsOverview($terminal_id: ID, $filter: ZarinLinkFilterEnum) {\n    ZarinLinks(terminal_id: $terminal_id, filter: $filter) {\n      id\n      title\n      amount\n      deleted_at\n      images {\n        url\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetProductsById($terminal_id: ID, $id: ID) {\n    ZarinLinks(terminal_id: $terminal_id, id: $id) {\n      id\n      title\n      link\n      description\n      show_receipt\n      is_coupon_active\n      amount\n      limit\n      deleted_at\n      required_fields {\n        input\n        status\n        placeholder\n      }\n      images {\n        id\n        url\n      }\n      successful_redirect_url\n      failed_redirect_url\n    }\n  }\n'
): (typeof documents)['\n  query GetProductsById($terminal_id: ID, $id: ID) {\n    ZarinLinks(terminal_id: $terminal_id, id: $id) {\n      id\n      title\n      link\n      description\n      show_receipt\n      is_coupon_active\n      amount\n      limit\n      deleted_at\n      required_fields {\n        input\n        status\n        placeholder\n      }\n      images {\n        id\n        url\n      }\n      successful_redirect_url\n      failed_redirect_url\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ZarinLinkRemove($id: ID!) {\n    ZarinLinkRemove(id: $id)\n  }\n'
): (typeof documents)['\n  mutation ZarinLinkRemove($id: ID!) {\n    ZarinLinkRemove(id: $id)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ZarinLinkRestore($id: ID!) {\n    ZarinLinkRestore(id: $id) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation ZarinLinkRestore($id: ID!) {\n    ZarinLinkRestore(id: $id) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ZarinLinkAddImage($product_id: ID!, $images: [String!]!) {\n    ZarinLinkAddImage(product_id: $product_id, images: $images) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation ZarinLinkAddImage($product_id: ID!, $images: [String!]!) {\n    ZarinLinkAddImage(product_id: $product_id, images: $images) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ZarinLinkAdd(\n    $terminal_id: ID!\n    $title: String!\n    $amount: Int!\n    $description: String!\n    $show_receipt: Boolean!\n    $is_coupon_active: Boolean!\n    $required_fields: [ZarinLinkRequiredFieldsInput]\n    $limit: Int\n    $successful_redirect_url: String\n    $failed_redirect_url: String\n  ) {\n    ZarinLinkAdd(\n      terminal_id: $terminal_id\n      title: $title\n      amount: $amount\n      description: $description\n      show_receipt: $show_receipt\n      is_coupon_active: $is_coupon_active\n      required_fields: $required_fields\n      limit: $limit\n      successful_redirect_url: $successful_redirect_url\n      failed_redirect_url: $failed_redirect_url\n    ) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation ZarinLinkAdd(\n    $terminal_id: ID!\n    $title: String!\n    $amount: Int!\n    $description: String!\n    $show_receipt: Boolean!\n    $is_coupon_active: Boolean!\n    $required_fields: [ZarinLinkRequiredFieldsInput]\n    $limit: Int\n    $successful_redirect_url: String\n    $failed_redirect_url: String\n  ) {\n    ZarinLinkAdd(\n      terminal_id: $terminal_id\n      title: $title\n      amount: $amount\n      description: $description\n      show_receipt: $show_receipt\n      is_coupon_active: $is_coupon_active\n      required_fields: $required_fields\n      limit: $limit\n      successful_redirect_url: $successful_redirect_url\n      failed_redirect_url: $failed_redirect_url\n    ) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ZarinLinkEdit(\n    $id: ID!\n    $terminal_id: ID\n    $title: String\n    $amount: Int\n    $description: String\n    $show_receipt: Boolean\n    $is_coupon_active: Boolean\n    $required_fields: [ZarinLinkRequiredFieldsInput]\n    $limit: Int\n    $successful_redirect_url: String\n    $failed_redirect_url: String\n  ) {\n    ZarinLinkEdit(\n      id: $id\n      terminal_id: $terminal_id\n      title: $title\n      amount: $amount\n      description: $description\n      show_receipt: $show_receipt\n      is_coupon_active: $is_coupon_active\n      required_fields: $required_fields\n      limit: $limit\n      successful_redirect_url: $successful_redirect_url\n      failed_redirect_url: $failed_redirect_url\n    ) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation ZarinLinkEdit(\n    $id: ID!\n    $terminal_id: ID\n    $title: String\n    $amount: Int\n    $description: String\n    $show_receipt: Boolean\n    $is_coupon_active: Boolean\n    $required_fields: [ZarinLinkRequiredFieldsInput]\n    $limit: Int\n    $successful_redirect_url: String\n    $failed_redirect_url: String\n  ) {\n    ZarinLinkEdit(\n      id: $id\n      terminal_id: $terminal_id\n      title: $title\n      amount: $amount\n      description: $description\n      show_receipt: $show_receipt\n      is_coupon_active: $is_coupon_active\n      required_fields: $required_fields\n      limit: $limit\n      successful_redirect_url: $successful_redirect_url\n      failed_redirect_url: $failed_redirect_url\n    ) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ZarinLinkDeleteImage($product_id: ID!, $image_id: String!) {\n    ZarinLinkDeleteImage(product_id: $product_id, image_id: $image_id)\n  }\n'
): (typeof documents)['\n  mutation ZarinLinkDeleteImage($product_id: ID!, $image_id: String!) {\n    ZarinLinkDeleteImage(product_id: $product_id, image_id: $image_id)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query InstantPayoutReceipt($url_code: String!) {\n    resource: InstantPayoutReceipt(url_code: $url_code) {\n      id\n      status\n      bank_account {\n        id\n        iban\n        holder_name\n        issuing_bank {\n          slug\n          name\n        }\n      }\n      description\n      fee\n      amount\n      owner_name\n      created_at\n      updated_at\n      shaparak_tracking_number\n      reconciled_at\n    }\n  }\n'
): (typeof documents)['\n  query InstantPayoutReceipt($url_code: String!) {\n    resource: InstantPayoutReceipt(url_code: $url_code) {\n      id\n      status\n      bank_account {\n        id\n        iban\n        holder_name\n        issuing_bank {\n          slug\n          name\n        }\n      }\n      description\n      fee\n      amount\n      owner_name\n      created_at\n      updated_at\n      shaparak_tracking_number\n      reconciled_at\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query PayoutReceipt($url_code: String!) {\n    resource: PayoutReceipt(url_code: $url_code) {\n      id\n      amount\n      owner_name\n      tracking_id\n      bank_account {\n        id\n        iban\n        holder_name\n        issuing_bank {\n          slug\n          name\n        }\n      }\n      status\n      created_at\n      description\n    }\n  }\n'
): (typeof documents)['\n  query PayoutReceipt($url_code: String!) {\n    resource: PayoutReceipt(url_code: $url_code) {\n      id\n      amount\n      owner_name\n      tracking_id\n      bank_account {\n        id\n        iban\n        holder_name\n        issuing_bank {\n          slug\n          name\n        }\n      }\n      status\n      created_at\n      description\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Reconciliation(\n    $filter: ReconciliationStatusEnum\n    $terminal_id: ID\n    $offset: Int\n    $limit: Int\n    $id: ID\n    $reference_id: String\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $text: String\n    $min_amount: Int\n    $max_amount: Int\n    $amount: Int\n    $iban: String\n  ) {\n    Reconciliation: Reconciliation(\n      filter: $filter\n      terminal_id: $terminal_id\n      offset: $offset\n      limit: $limit\n      id: $id\n      reference_id: $reference_id\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      text: $text\n      min_amount: $min_amount\n      max_amount: $max_amount\n      amount: $amount\n      pagination: true\n      iban: $iban\n    ) {\n      id\n      status\n      reconciled_at\n      amount\n      payable_at\n      created_at\n      fee\n      reference_id\n      estimated_payed_at\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'
): (typeof documents)['\n  query Reconciliation(\n    $filter: ReconciliationStatusEnum\n    $terminal_id: ID\n    $offset: Int\n    $limit: Int\n    $id: ID\n    $reference_id: String\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $text: String\n    $min_amount: Int\n    $max_amount: Int\n    $amount: Int\n    $iban: String\n  ) {\n    Reconciliation: Reconciliation(\n      filter: $filter\n      terminal_id: $terminal_id\n      offset: $offset\n      limit: $limit\n      id: $id\n      reference_id: $reference_id\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      text: $text\n      min_amount: $min_amount\n      max_amount: $max_amount\n      amount: $amount\n      pagination: true\n      iban: $iban\n    ) {\n      id\n      status\n      reconciled_at\n      amount\n      payable_at\n      created_at\n      fee\n      reference_id\n      estimated_payed_at\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ReconciliationExcelExport(\n    $terminal_id: ID!\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $amount: Int\n    $max_amount: Int\n    $min_amount: Int\n    $name: String\n    $filter: FilterEnum\n  ) {\n    ReconciliationExcelExport(\n      terminal_id: $terminal_id\n      filter: $filter\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      amount: $amount\n      max_amount: $max_amount\n      min_amount: $min_amount\n      name: $name\n    )\n  }\n'
): (typeof documents)['\n  mutation ReconciliationExcelExport(\n    $terminal_id: ID!\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $amount: Int\n    $max_amount: Int\n    $min_amount: Int\n    $name: String\n    $filter: FilterEnum\n  ) {\n    ReconciliationExcelExport(\n      terminal_id: $terminal_id\n      filter: $filter\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      amount: $amount\n      max_amount: $max_amount\n      min_amount: $min_amount\n      name: $name\n    )\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query ReconciliationById($id: ID, $terminal_id: ID, $limit: Int, $sessions_limit: Int) {\n    Reconciliation(\n      terminal_id: $terminal_id\n      id: $id\n      limit: $limit\n      sessions_limit: $sessions_limit\n    ) {\n      id\n      notes {\n        id\n        content\n        created_at\n        updated_at\n        user {\n          name\n        }\n      }\n      terminal_id\n      status\n      amount\n      note\n      payable_at\n      estimated_payed_at\n      description\n      reference_id\n      reconciled_at\n      fee\n      sessions_count\n      sessions {\n        amount\n        created_at\n        fee\n        reference_id\n        id\n      }\n      wages {\n        id\n        fee\n        shaparak_tracking_number\n        amount\n        type\n        type_id\n        bank_account {\n          id\n          iban\n          holder_name\n          issuing_bank {\n            name\n            slug\n            slug_image\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query ReconciliationById($id: ID, $terminal_id: ID, $limit: Int, $sessions_limit: Int) {\n    Reconciliation(\n      terminal_id: $terminal_id\n      id: $id\n      limit: $limit\n      sessions_limit: $sessions_limit\n    ) {\n      id\n      notes {\n        id\n        content\n        created_at\n        updated_at\n        user {\n          name\n        }\n      }\n      terminal_id\n      status\n      amount\n      note\n      payable_at\n      estimated_payed_at\n      description\n      reference_id\n      reconciled_at\n      fee\n      sessions_count\n      sessions {\n        amount\n        created_at\n        fee\n        reference_id\n        id\n      }\n      wages {\n        id\n        fee\n        shaparak_tracking_number\n        amount\n        type\n        type_id\n        bank_account {\n          id\n          iban\n          holder_name\n          issuing_bank {\n            name\n            slug\n            slug_image\n          }\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query ReferrersReport($offset: Int, $limit: Int) {\n    ReferrersReport: ReferrersReport(offset: $offset, limit: $limit, pagination: true) {\n      all_referrers\n      sum_referrers\n      month_active_referrers\n      sum_commission\n      user {\n        id\n        name\n        avatar\n        commission\n        registered_at\n        last_session_time\n      }\n    }\n    Pagination {\n      total\n      last_page\n      name\n    }\n  }\n'
): (typeof documents)['\n  query ReferrersReport($offset: Int, $limit: Int) {\n    ReferrersReport: ReferrersReport(offset: $offset, limit: $limit, pagination: true) {\n      all_referrers\n      sum_referrers\n      month_active_referrers\n      sum_commission\n      user {\n        id\n        name\n        avatar\n        commission\n        registered_at\n        last_session_time\n      }\n    }\n    Pagination {\n      total\n      last_page\n      name\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query ReferrerInvoice($from_date: DateTime, $to_date: DateTime) {\n    ReferrerInvoice(from_date: $from_date, to_date: $to_date) {\n      id\n      status\n      amount\n      from_date\n      to_date\n      created_at\n    }\n  }\n'
): (typeof documents)['\n  query ReferrerInvoice($from_date: DateTime, $to_date: DateTime) {\n    ReferrerInvoice(from_date: $from_date, to_date: $to_date) {\n      id\n      status\n      amount\n      from_date\n      to_date\n      created_at\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query ReferrerInvoiceGetIban {\n    ReferrerInvoiceGetIban {\n      id\n      iban\n      holder_name\n      issuing_bank {\n        name\n        slug\n      }\n    }\n  }\n'
): (typeof documents)['\n  query ReferrerInvoiceGetIban {\n    ReferrerInvoiceGetIban {\n      id\n      iban\n      holder_name\n      issuing_bank {\n        name\n        slug\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation referrerInvoiceSetIban($bank_account_id: ID) {\n    referrerInvoiceSetIban(bank_account_id: $bank_account_id) {\n      id\n      issuing_bank {\n        name\n        slug\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation referrerInvoiceSetIban($bank_account_id: ID) {\n    referrerInvoiceSetIban(bank_account_id: $bank_account_id) {\n      id\n      issuing_bank {\n        name\n        slug\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query RefundFeeInquiry($method: InstantPayoutActionTypeEnum) {\n    RefundFeeInquiry(method: $method) {\n      base_fee\n      step_amount\n      step_fee\n    }\n  }\n'
): (typeof documents)['\n  query RefundFeeInquiry($method: InstantPayoutActionTypeEnum) {\n    RefundFeeInquiry(method: $method) {\n      base_fee\n      step_amount\n      step_fee\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AddRefund(\n    $session_id: ID!\n    $amount: BigInteger!\n    $description: String\n    $reason: RefundReasonEnum\n    $method: InstantPayoutActionTypeEnum\n  ) {\n    AddRefund(\n      session_id: $session_id\n      amount: $amount\n      description: $description\n      reason: $reason\n      method: $method\n    ) {\n      id\n      amount\n      fee\n      terminal_id\n      timeline {\n        created_time\n        created_reference\n        canceled_time\n        in_bank_time\n        in_bank_name\n        verified_time\n        verified_reference\n        reconciled_time\n        refund_amount\n        refund_time\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation AddRefund(\n    $session_id: ID!\n    $amount: BigInteger!\n    $description: String\n    $reason: RefundReasonEnum\n    $method: InstantPayoutActionTypeEnum\n  ) {\n    AddRefund(\n      session_id: $session_id\n      amount: $amount\n      description: $description\n      reason: $reason\n      method: $method\n    ) {\n      id\n      amount\n      fee\n      terminal_id\n      timeline {\n        created_time\n        created_reference\n        canceled_time\n        in_bank_time\n        in_bank_name\n        verified_time\n        verified_reference\n        reconciled_time\n        refund_amount\n        refund_time\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SendVerifyEmail {\n    SendVerifyEmail\n  }\n'
): (typeof documents)['\n  mutation SendVerifyEmail {\n    SendVerifyEmail\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetSessions(\n    $reconciliation_id: ID\n    $filter: FilterEnum\n    $terminal_id: ID\n    $offset: Int\n    $limit: Int\n    $type: SessionTypeEnum\n    $amount: Int\n    $note: String\n    $max_amount: Int\n    $min_amount: Int\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $id: ID\n    $reference_id: String\n    $relation_id: ID\n    $mobile: CellNumber\n    $email: String\n    $description: String\n    $card_pan: String\n    $rrn: String\n  ) {\n    Session: Session(\n      filter: $filter\n      type: $type\n      note: $note\n      terminal_id: $terminal_id\n      offset: $offset\n      limit: $limit\n      amount: $amount\n      max_amount: $max_amount\n      min_amount: $min_amount\n      mobile: $mobile\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      id: $id\n      reference_id: $reference_id\n      pagination: true\n      relation_id: $relation_id\n      card_pan: $card_pan\n      email: $email\n      description: $description\n      rrn: $rrn\n      reconciliation_id: $reconciliation_id\n    ) {\n      id\n      type\n      status\n      created_at\n      description\n      reconciliation_id\n      amount\n      fee\n      timeline {\n        refund_id\n        refund_status\n        reconciled_id\n        reconciled_time\n        reconciled_status\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'
): (typeof documents)['\n  query GetSessions(\n    $reconciliation_id: ID\n    $filter: FilterEnum\n    $terminal_id: ID\n    $offset: Int\n    $limit: Int\n    $type: SessionTypeEnum\n    $amount: Int\n    $note: String\n    $max_amount: Int\n    $min_amount: Int\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $id: ID\n    $reference_id: String\n    $relation_id: ID\n    $mobile: CellNumber\n    $email: String\n    $description: String\n    $card_pan: String\n    $rrn: String\n  ) {\n    Session: Session(\n      filter: $filter\n      type: $type\n      note: $note\n      terminal_id: $terminal_id\n      offset: $offset\n      limit: $limit\n      amount: $amount\n      max_amount: $max_amount\n      min_amount: $min_amount\n      mobile: $mobile\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      id: $id\n      reference_id: $reference_id\n      pagination: true\n      relation_id: $relation_id\n      card_pan: $card_pan\n      email: $email\n      description: $description\n      rrn: $rrn\n      reconciliation_id: $reconciliation_id\n    ) {\n      id\n      type\n      status\n      created_at\n      description\n      reconciliation_id\n      amount\n      fee\n      timeline {\n        refund_id\n        refund_status\n        reconciled_id\n        reconciled_time\n        reconciled_status\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SessionDynamicExcelExport(\n    $terminal_id: ID!\n    $fields: [String]\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $reconciliation_id: ID\n    $amount: Int\n    $max_amount: Int\n    $min_amount: Int\n    $filter: FilterEnum\n    $name: String\n    $session_id: ID\n    $mobile: CellNumber\n    $email: String\n    $card_pan: String\n    $description: String\n    $reference_id: String\n    $type: SessionTypeEnum\n    $relation_id: ID\n    $export_file_type: ExportFileTypeEnum\n  ) {\n    SessionDynamicExcelExport(\n      terminal_id: $terminal_id\n      fields: $fields\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      reconciliation_id: $reconciliation_id\n      amount: $amount\n      max_amount: $max_amount\n      min_amount: $min_amount\n      filter: $filter\n      name: $name\n      card_pan: $card_pan\n      email: $email\n      session_id: $session_id\n      mobile: $mobile\n      description: $description\n      reference_id: $reference_id\n      type: $type\n      relation_id: $relation_id\n      export_file_type: $export_file_type\n    )\n  }\n'
): (typeof documents)['\n  mutation SessionDynamicExcelExport(\n    $terminal_id: ID!\n    $fields: [String]\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $reconciliation_id: ID\n    $amount: Int\n    $max_amount: Int\n    $min_amount: Int\n    $filter: FilterEnum\n    $name: String\n    $session_id: ID\n    $mobile: CellNumber\n    $email: String\n    $card_pan: String\n    $description: String\n    $reference_id: String\n    $type: SessionTypeEnum\n    $relation_id: ID\n    $export_file_type: ExportFileTypeEnum\n  ) {\n    SessionDynamicExcelExport(\n      terminal_id: $terminal_id\n      fields: $fields\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      reconciliation_id: $reconciliation_id\n      amount: $amount\n      max_amount: $max_amount\n      min_amount: $min_amount\n      filter: $filter\n      name: $name\n      card_pan: $card_pan\n      email: $email\n      session_id: $session_id\n      mobile: $mobile\n      description: $description\n      reference_id: $reference_id\n      type: $type\n      relation_id: $relation_id\n      export_file_type: $export_file_type\n    )\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SessionExcelExport(\n    $terminal_id: ID!\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $reconciliation_id: ID\n    $amount: Int\n    $max_amount: Int\n    $min_amount: Int\n    $filter: FilterEnum\n    $name: String\n    $session_id: ID\n    $mobile: CellNumber\n    $email: String\n    $card_pan: String\n    $description: String\n    $reference_id: String\n    $type: SessionTypeEnum\n    $relation_id: ID\n    $export_file_type: ExportFileTypeEnum\n  ) {\n    SessionExcelExport(\n      terminal_id: $terminal_id\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      reconciliation_id: $reconciliation_id\n      amount: $amount\n      max_amount: $max_amount\n      min_amount: $min_amount\n      filter: $filter\n      name: $name\n      card_pan: $card_pan\n      email: $email\n      session_id: $session_id\n      mobile: $mobile\n      description: $description\n      reference_id: $reference_id\n      type: $type\n      relation_id: $relation_id\n      export_file_type: $export_file_type\n    )\n  }\n'
): (typeof documents)['\n  mutation SessionExcelExport(\n    $terminal_id: ID!\n    $created_from_date: DateTime\n    $created_to_date: DateTime\n    $reconciliation_id: ID\n    $amount: Int\n    $max_amount: Int\n    $min_amount: Int\n    $filter: FilterEnum\n    $name: String\n    $session_id: ID\n    $mobile: CellNumber\n    $email: String\n    $card_pan: String\n    $description: String\n    $reference_id: String\n    $type: SessionTypeEnum\n    $relation_id: ID\n    $export_file_type: ExportFileTypeEnum\n  ) {\n    SessionExcelExport(\n      terminal_id: $terminal_id\n      created_from_date: $created_from_date\n      created_to_date: $created_to_date\n      reconciliation_id: $reconciliation_id\n      amount: $amount\n      max_amount: $max_amount\n      min_amount: $min_amount\n      filter: $filter\n      name: $name\n      card_pan: $card_pan\n      email: $email\n      session_id: $session_id\n      mobile: $mobile\n      description: $description\n      reference_id: $reference_id\n      type: $type\n      relation_id: $relation_id\n      export_file_type: $export_file_type\n    )\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SessionCardHolder($session_id: ID!) {\n    SessionCardHolder(session_id: $session_id)\n  }\n'
): (typeof documents)['\n  mutation SessionCardHolder($session_id: ID!) {\n    SessionCardHolder(session_id: $session_id)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query SessionType($terminal_id: ID!) {\n    Session: SessionType(terminal_id: $terminal_id) {\n      name\n    }\n  }\n'
): (typeof documents)['\n  query SessionType($terminal_id: ID!) {\n    Session: SessionType(terminal_id: $terminal_id) {\n      name\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query SessionById($terminal_id: ID, $id: ID) {\n    Session(terminal_id: $terminal_id, id: $id) {\n      id\n      note\n      fee_detail {\n        sms\n        ayan\n        raw_fee\n      }\n      notes {\n        id\n        content\n        created_at\n        updated_at\n        user {\n          name\n        }\n      }\n      wage_payouts {\n        id\n      }\n      reference_id\n      reconciliation_id\n      type\n      fee\n      fee_type\n      status\n      amount\n      authority\n      description\n      created_at\n      payer_info {\n        card_holder_name\n        description\n        email\n        mobile\n        name\n        order_id\n        zarin_link_id\n        custom_field_1_name\n        custom_field_2_name\n        custom_field_1\n        custom_field_2\n      }\n      terminal {\n        id\n        refund_active\n      }\n      session_tries {\n        is_card_mobile_verified\n        card_info {\n          name\n          slug\n        }\n        agent {\n          country_code\n        }\n        card_pan\n        payer_ip\n        rrn\n        status\n      }\n      refund {\n        id\n        session_id\n        instant_payout {\n          id\n          amount\n          fee\n          terminal {\n            id\n          }\n          bank_account {\n            id\n            iban\n            holder_name\n            issuing_bank {\n              name\n              slug\n              slug_image\n            }\n          }\n          reference_id\n          reconciled_at\n          created_at\n          status\n        }\n      }\n      product {\n        title\n      }\n      timeline {\n        canceled_time\n        created_time\n        in_bank_name\n        in_bank_time\n        reconciled_id\n        reconciled_time\n        reconciled_status\n        reconciled_success_time\n        settled_time\n        verified_reference\n        verified_time\n        refund_status\n        refund_amount\n        refund_time\n      }\n    }\n  }\n'
): (typeof documents)['\n  query SessionById($terminal_id: ID, $id: ID) {\n    Session(terminal_id: $terminal_id, id: $id) {\n      id\n      note\n      fee_detail {\n        sms\n        ayan\n        raw_fee\n      }\n      notes {\n        id\n        content\n        created_at\n        updated_at\n        user {\n          name\n        }\n      }\n      wage_payouts {\n        id\n      }\n      reference_id\n      reconciliation_id\n      type\n      fee\n      fee_type\n      status\n      amount\n      authority\n      description\n      created_at\n      payer_info {\n        card_holder_name\n        description\n        email\n        mobile\n        name\n        order_id\n        zarin_link_id\n        custom_field_1_name\n        custom_field_2_name\n        custom_field_1\n        custom_field_2\n      }\n      terminal {\n        id\n        refund_active\n      }\n      session_tries {\n        is_card_mobile_verified\n        card_info {\n          name\n          slug\n        }\n        agent {\n          country_code\n        }\n        card_pan\n        payer_ip\n        rrn\n        status\n      }\n      refund {\n        id\n        session_id\n        instant_payout {\n          id\n          amount\n          fee\n          terminal {\n            id\n          }\n          bank_account {\n            id\n            iban\n            holder_name\n            issuing_bank {\n              name\n              slug\n              slug_image\n            }\n          }\n          reference_id\n          reconciled_at\n          created_at\n          status\n        }\n      }\n      product {\n        title\n      }\n      timeline {\n        canceled_time\n        created_time\n        in_bank_name\n        in_bank_time\n        reconciled_id\n        reconciled_time\n        reconciled_status\n        reconciled_success_time\n        settled_time\n        verified_reference\n        verified_time\n        refund_status\n        refund_amount\n        refund_time\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query ExportableFields($group: ExportGroupEnum, $terminal_id: Int!) {\n    Session: ExportableFields(group: $group, terminal_id: $terminal_id) {\n      key\n      categories {\n        key\n        fields {\n          title\n          slug\n          is_required\n          is_selected\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query ExportableFields($group: ExportGroupEnum, $terminal_id: Int!) {\n    Session: ExportableFields(group: $group, terminal_id: $terminal_id) {\n      key\n      categories {\n        key\n        fields {\n          title\n          slug\n          is_required\n          is_selected\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetSessionExport($slug: String, $offset: Int, $limit: Int) {\n    SessionExport: SessionExport(slug: $slug, offset: $offset, limit: $limit, pagination: true) {\n      id\n      type\n      name\n      url\n      size\n      uuid\n      status\n      created_at\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'
): (typeof documents)['\n  query GetSessionExport($slug: String, $offset: Int, $limit: Int) {\n    SessionExport: SessionExport(slug: $slug, offset: $offset, limit: $limit, pagination: true) {\n      id\n      type\n      name\n      url\n      size\n      uuid\n      status\n      created_at\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation PinTerminal($id: ID!, $pin: Boolean!) {\n    PinTerminal(id: $id, pin: $pin) {\n      pin\n    }\n  }\n'
): (typeof documents)['\n  mutation PinTerminal($id: ID!, $pin: Boolean!) {\n    PinTerminal(id: $id, pin: $pin) {\n      pin\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetTerminalsListMenu {\n    Terminals {\n      reconcile_priority\n      reconcile_type\n      id\n      created_at\n      have_logo\n      max_amount\n      reconcile_type\n      pin\n      is_default\n      status\n      permissions\n      name\n      domain\n      owner_id\n      preferred_bank_account_id\n      key\n      logo\n      chn_type\n      reconcile_priority\n      fee_type\n      support_phone\n      server_ip\n      flag\n      fee_group {\n        id\n      }\n      zarin_gate {\n        psp\n        merchant_id\n        status\n        terminal_id\n        error\n        payment {\n          name\n        }\n      }\n      psp_priority {\n        psp\n        merchant_id\n        status\n        terminal_id\n        error\n        payment {\n          name\n        }\n      }\n      active_psp {\n        psp\n        merchant_id\n        status\n        terminal_id\n        error\n        payment {\n          name\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetTerminalsListMenu {\n    Terminals {\n      reconcile_priority\n      reconcile_type\n      id\n      created_at\n      have_logo\n      max_amount\n      reconcile_type\n      pin\n      is_default\n      status\n      permissions\n      name\n      domain\n      owner_id\n      preferred_bank_account_id\n      key\n      logo\n      chn_type\n      reconcile_priority\n      fee_type\n      support_phone\n      server_ip\n      flag\n      fee_group {\n        id\n      }\n      zarin_gate {\n        psp\n        merchant_id\n        status\n        terminal_id\n        error\n        payment {\n          name\n        }\n      }\n      psp_priority {\n        psp\n        merchant_id\n        status\n        terminal_id\n        error\n        payment {\n          name\n        }\n      }\n      active_psp {\n        psp\n        merchant_id\n        status\n        terminal_id\n        error\n        payment {\n          name\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetTerminals($offset: Int, $limit: Int) {\n    Terminals: Terminals(offset: $offset, limit: $limit, pagination: true) {\n      id\n      status\n      name\n      domain\n      logo\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'
): (typeof documents)['\n  query GetTerminals($offset: Int, $limit: Int) {\n    Terminals: Terminals(offset: $offset, limit: $limit, pagination: true) {\n      id\n      status\n      name\n      domain\n      logo\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation TerminalEdit(\n    $id: ID!\n    $logo: ValidFile\n    $bank_account_id: ID\n    $reconcile_priority: ReconcileCycleTypeEnum\n    $support_phone: CellNumber\n    $server_ip: IP\n    $fee_type: TerminalFeeTypeEnum\n    $chn_type: TerminalChnTypeEnum\n    $psp_priority: [String]\n  ) {\n    TerminalEdit(\n      id: $id\n      logo: $logo\n      bank_account_id: $bank_account_id\n      reconcile_priority: $reconcile_priority\n      support_phone: $support_phone\n      server_ip: $server_ip\n      fee_type: $fee_type\n      chn_type: $chn_type\n      psp_priority: $psp_priority\n    ) {\n      id\n      chn_type\n      logo\n    }\n  }\n'
): (typeof documents)['\n  mutation TerminalEdit(\n    $id: ID!\n    $logo: ValidFile\n    $bank_account_id: ID\n    $reconcile_priority: ReconcileCycleTypeEnum\n    $support_phone: CellNumber\n    $server_ip: IP\n    $fee_type: TerminalFeeTypeEnum\n    $chn_type: TerminalChnTypeEnum\n    $psp_priority: [String]\n  ) {\n    TerminalEdit(\n      id: $id\n      logo: $logo\n      bank_account_id: $bank_account_id\n      reconcile_priority: $reconcile_priority\n      support_phone: $support_phone\n      server_ip: $server_ip\n      fee_type: $fee_type\n      chn_type: $chn_type\n      psp_priority: $psp_priority\n    ) {\n      id\n      chn_type\n      logo\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation TerminalAdd(\n    $mcc_id: ID!\n    $domain: String!\n    $name: String!\n    $support_phone: CellNumber!\n  ) {\n    TerminalAdd(mcc_id: $mcc_id, domain: $domain, name: $name, support_phone: $support_phone) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation TerminalAdd(\n    $mcc_id: ID!\n    $domain: String!\n    $name: String!\n    $support_phone: CellNumber!\n  ) {\n    TerminalAdd(mcc_id: $mcc_id, domain: $domain, name: $name, support_phone: $support_phone) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query TerminalDomainCheck($domain: String!) {\n    TerminalDomainCheck(domain: $domain) {\n      type\n      title\n    }\n  }\n'
): (typeof documents)['\n  query TerminalDomainCheck($domain: String!) {\n    TerminalDomainCheck(domain: $domain) {\n      type\n      title\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query TerminalUser($terminal_id: ID!) {\n    TerminalUser(terminal_id: $terminal_id) {\n      id\n      user_id\n      user_name\n      user_avatar\n      terminal_id\n      access_list\n    }\n  }\n'
): (typeof documents)['\n  query TerminalUser($terminal_id: ID!) {\n    TerminalUser(terminal_id: $terminal_id) {\n      id\n      user_id\n      user_name\n      user_avatar\n      terminal_id\n      access_list\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation TerminalDeleteAccess($id: ID!, $terminal_id: ID!) {\n    TerminalDeleteAccess(id: $id, terminal_id: $terminal_id)\n  }\n'
): (typeof documents)['\n  mutation TerminalDeleteAccess($id: ID!, $terminal_id: ID!) {\n    TerminalDeleteAccess(id: $id, terminal_id: $terminal_id)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation TerminalAssignAccess(\n    $terminal_id: ID!\n    $user_id: ID!\n    $access_list: [TerminalPermissionEnum]!\n  ) {\n    TerminalAssignAccess(terminal_id: $terminal_id, user_id: $user_id, access_list: $access_list) {\n      id\n      user_id\n      user_name\n      terminal_id\n      access_list\n      user_avatar\n    }\n  }\n'
): (typeof documents)['\n  mutation TerminalAssignAccess(\n    $terminal_id: ID!\n    $user_id: ID!\n    $access_list: [TerminalPermissionEnum]!\n  ) {\n    TerminalAssignAccess(terminal_id: $terminal_id, user_id: $user_id, access_list: $access_list) {\n      id\n      user_id\n      user_name\n      terminal_id\n      access_list\n      user_avatar\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation TerminalEditAccess(\n    $id: ID!\n    $terminal_id: ID!\n    $access_list: [TerminalPermissionEnum]!\n  ) {\n    TerminalEditAccess(id: $id, terminal_id: $terminal_id, access_list: $access_list) {\n      id\n      user_id\n      user_name\n      terminal_id\n      access_list\n      user_avatar\n    }\n  }\n'
): (typeof documents)['\n  mutation TerminalEditAccess(\n    $id: ID!\n    $terminal_id: ID!\n    $access_list: [TerminalPermissionEnum]!\n  ) {\n    TerminalEditAccess(id: $id, terminal_id: $terminal_id, access_list: $access_list) {\n      id\n      user_id\n      user_name\n      terminal_id\n      access_list\n      user_avatar\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query TerminalCategories {\n    TerminalCategories: TerminalCategories {\n      id\n      title\n      slug\n      category_identifier\n      parent_id\n      children {\n        id\n        title\n        slug\n        category_identifier\n        parent_id\n      }\n    }\n  }\n'
): (typeof documents)['\n  query TerminalCategories {\n    TerminalCategories: TerminalCategories {\n      id\n      title\n      slug\n      category_identifier\n      parent_id\n      children {\n        id\n        title\n        slug\n        category_identifier\n        parent_id\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetReleaseChangeLogQuery {\n    ReleaseChangeLogQuery {\n      version\n      content\n      created_at\n    }\n  }\n'
): (typeof documents)['\n  query GetReleaseChangeLogQuery {\n    ReleaseChangeLogQuery {\n      version\n      content\n      created_at\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetTerminalsListAndMe {\n    Terminals {\n      id\n      permissions\n      domain\n      status\n      owner_id\n      reconcile_type\n      fee_group {\n        id\n      }\n    }\n    Me {\n      id\n      ssn\n      cell_number\n      level\n      created_at\n      avatar\n      full_name\n      referral_id\n      email\n      vip_level\n      personal_link {\n        domain\n      }\n      addresses {\n        id\n      }\n      data_status {\n        kyc\n        email\n        personal\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetTerminalsListAndMe {\n    Terminals {\n      id\n      permissions\n      domain\n      status\n      owner_id\n      reconcile_type\n      fee_group {\n        id\n      }\n    }\n    Me {\n      id\n      ssn\n      cell_number\n      level\n      created_at\n      avatar\n      full_name\n      referral_id\n      email\n      vip_level\n      personal_link {\n        domain\n      }\n      addresses {\n        id\n      }\n      data_status {\n        kyc\n        email\n        personal\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query TerminalDailyReport($terminal_id: ID!, $from_date: Date!, $to_date: Date!) {\n    DailyReport(terminal_id: $terminal_id, from_date: $from_date, to_date: $to_date) {\n      sessions {\n        date\n        amount\n        count\n      }\n      reconciliations {\n        date\n        amount\n        count\n      }\n      total {\n        total_session_amount\n        total_session_count\n        total_reconciliation_amount\n        total_reconciliation_count\n      }\n    }\n  }\n'
): (typeof documents)['\n  query TerminalDailyReport($terminal_id: ID!, $from_date: Date!, $to_date: Date!) {\n    DailyReport(terminal_id: $terminal_id, from_date: $from_date, to_date: $to_date) {\n      sessions {\n        date\n        amount\n        count\n      }\n      reconciliations {\n        date\n        amount\n        count\n      }\n      total {\n        total_session_amount\n        total_session_count\n        total_reconciliation_amount\n        total_reconciliation_count\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetTickets($id: ID, $limit: Int, $offset: Int, $status: TicketStatusEnum) {\n    Tickets: Tickets(id: $id, limit: $limit, offset: $offset, status: $status, pagination: true) {\n      title\n      id\n      status\n      updated_at\n      first_user_seen\n      rate\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'
): (typeof documents)['\n  query GetTickets($id: ID, $limit: Int, $offset: Int, $status: TicketStatusEnum) {\n    Tickets: Tickets(id: $id, limit: $limit, offset: $offset, status: $status, pagination: true) {\n      title\n      id\n      status\n      updated_at\n      first_user_seen\n      rate\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetDepartment {\n    TicketDepartments {\n      id\n      title\n      user_access\n    }\n  }\n'
): (typeof documents)['\n  query GetDepartment {\n    TicketDepartments {\n      id\n      title\n      user_access\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation TicketAdd(\n    $ticket_department_id: ID!\n    $title: String!\n    $content: String!\n    $attachment: String\n    $priority: TicketPriorityEnum\n    $model_type: ModelEnum\n    $model_id: ID\n  ) {\n    TicketAdd(\n      ticket_department_id: $ticket_department_id\n      title: $title\n      content: $content\n      attachment: $attachment\n      priority: $priority\n      model_type: $model_type\n      model_id: $model_id\n    ) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation TicketAdd(\n    $ticket_department_id: ID!\n    $title: String!\n    $content: String!\n    $attachment: String\n    $priority: TicketPriorityEnum\n    $model_type: ModelEnum\n    $model_id: ID\n  ) {\n    TicketAdd(\n      ticket_department_id: $ticket_department_id\n      title: $title\n      content: $content\n      attachment: $attachment\n      priority: $priority\n      model_type: $model_type\n      model_id: $model_id\n    ) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation TicketAddReply($ticket_id: ID!, $content: String!, $attachment: String) {\n    TicketAddReply(ticket_id: $ticket_id, content: $content, attachment: $attachment) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation TicketAddReply($ticket_id: ID!, $content: String!, $attachment: String) {\n    TicketAddReply(ticket_id: $ticket_id, content: $content, attachment: $attachment) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation TicketClose($id: ID!) {\n    TicketClose(id: $id)\n  }\n'
): (typeof documents)['\n  mutation TicketClose($id: ID!) {\n    TicketClose(id: $id)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation TicketFeedback($id: ID!, $rate: Int) {\n    TicketFeedback(id: $id, rate: $rate)\n  }\n'
): (typeof documents)['\n  mutation TicketFeedback($id: ID!, $rate: Int) {\n    TicketFeedback(id: $id, rate: $rate)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetTicketById($id: ID!) {\n    Tickets(id: $id) {\n      id\n      status\n      title\n      created_at\n      updated_at\n      rate\n      model_id\n      replies {\n        id\n        content\n        attachment\n        created_at\n        user {\n          name\n          id\n          managed_avatar\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetTicketById($id: ID!) {\n    Tickets(id: $id) {\n      id\n      status\n      title\n      created_at\n      updated_at\n      rate\n      model_id\n      replies {\n        id\n        content\n        attachment\n        created_at\n        user {\n          name\n          id\n          managed_avatar\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetTicketCount {\n    UnreadTicketsCount\n  }\n'
): (typeof documents)['\n  query GetTicketCount {\n    UnreadTicketsCount\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetUserId {\n    Me {\n      id\n      ssn\n      cell_number\n      level\n      created_at\n      avatar\n      full_name\n      referral_id\n      email\n      vip_level\n      personal_link {\n        domain\n      }\n      addresses {\n        id\n      }\n      data_status {\n        kyc\n        email\n        personal\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetUserId {\n    Me {\n      id\n      ssn\n      cell_number\n      level\n      created_at\n      avatar\n      full_name\n      referral_id\n      email\n      vip_level\n      personal_link {\n        domain\n      }\n      addresses {\n        id\n      }\n      data_status {\n        kyc\n        email\n        personal\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeactivateTelegram {\n    resource: DeactivateTelegram\n  }\n'
): (typeof documents)['\n  mutation DeactivateTelegram {\n    resource: DeactivateTelegram\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetNow {\n    Time {\n      current_time\n    }\n  }\n'
): (typeof documents)['\n  query GetNow {\n    Time {\n      current_time\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query UserAnnouncement {\n    UserAnnouncement {\n      id\n      title\n      message\n      url_title\n      url\n      created_at\n    }\n  }\n'
): (typeof documents)['\n  query UserAnnouncement {\n    UserAnnouncement {\n      id\n      title\n      message\n      url_title\n      url\n      created_at\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ReturnToOldVersion($description: String!) {\n    ReturnToOldVersion(description: $description)\n  }\n'
): (typeof documents)['\n  mutation ReturnToOldVersion($description: String!) {\n    ReturnToOldVersion(description: $description)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation VerifyEmail($otp_code: String!) {\n    VerifyEmail(otp_code: $otp_code)\n  }\n'
): (typeof documents)['\n  mutation VerifyEmail($otp_code: String!) {\n    VerifyEmail(otp_code: $otp_code)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetNewZarinLinks(\n    $id: ID\n    $type: ZarinLinkTypeEnum\n    $terminal_id: ID\n    $title: String\n    $offset: Int\n    $amount_type: ZarinLinkAmountTypeEnum\n    $amount: Int\n    $max_amount: Int\n    $min_amount: Int\n    $description: String\n    $successful_redirect_url: String\n    $limit: Int\n    $filter: ZarinLinkFilterEnum\n  ) {\n    NewZarinLinks: NewZarinLinks(\n      id: $id\n      type: $type\n      terminal_id: $terminal_id\n      title: $title\n      amount_type: $amount_type\n      amount: $amount\n      max_amount: $max_amount\n      min_amount: $min_amount\n      offset: $offset\n      description: $description\n      successful_redirect_url: $successful_redirect_url\n      failed_redirect_url: $successful_redirect_url\n      filter: $filter\n      limit: $limit\n      pagination: true\n    ) {\n      id\n      link\n      title\n      limit\n      type\n      created_at\n      deleted_at\n      amount\n      amount_type\n      images {\n        url\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'
): (typeof documents)['\n  query GetNewZarinLinks(\n    $id: ID\n    $type: ZarinLinkTypeEnum\n    $terminal_id: ID\n    $title: String\n    $offset: Int\n    $amount_type: ZarinLinkAmountTypeEnum\n    $amount: Int\n    $max_amount: Int\n    $min_amount: Int\n    $description: String\n    $successful_redirect_url: String\n    $limit: Int\n    $filter: ZarinLinkFilterEnum\n  ) {\n    NewZarinLinks: NewZarinLinks(\n      id: $id\n      type: $type\n      terminal_id: $terminal_id\n      title: $title\n      amount_type: $amount_type\n      amount: $amount\n      max_amount: $max_amount\n      min_amount: $min_amount\n      offset: $offset\n      description: $description\n      successful_redirect_url: $successful_redirect_url\n      failed_redirect_url: $successful_redirect_url\n      filter: $filter\n      limit: $limit\n      pagination: true\n    ) {\n      id\n      link\n      title\n      limit\n      type\n      created_at\n      deleted_at\n      amount\n      amount_type\n      images {\n        url\n      }\n    }\n    Pagination {\n      total\n      last_page\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetZarinLinkById($terminal_id: ID, $id: ID, $type: ZarinLinkTypeEnum) {\n    NewZarinLinks(terminal_id: $terminal_id, id: $id, type: $type) {\n      id\n      title\n      link\n      description\n      show_receipt\n      is_coupon_active\n      amount\n      limit\n      deleted_at\n      updated_at\n      created_at\n      required_fields {\n        input\n        status\n        placeholder\n      }\n      successful_redirect_url\n      failed_redirect_url\n      amount_type\n      type\n      specifications {\n        key\n        value\n      }\n      meta_data {\n        start_date\n        start_time\n        end_time\n        end_date\n        event_type\n        province\n        city\n        address\n        url\n        target_amount\n      }\n      category {\n        id\n        title\n        parent {\n          id\n          title\n        }\n      }\n      images {\n        id\n        url\n      }\n      coupons {\n        id\n        discount_percent\n        code\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetZarinLinkById($terminal_id: ID, $id: ID, $type: ZarinLinkTypeEnum) {\n    NewZarinLinks(terminal_id: $terminal_id, id: $id, type: $type) {\n      id\n      title\n      link\n      description\n      show_receipt\n      is_coupon_active\n      amount\n      limit\n      deleted_at\n      updated_at\n      created_at\n      required_fields {\n        input\n        status\n        placeholder\n      }\n      successful_redirect_url\n      failed_redirect_url\n      amount_type\n      type\n      specifications {\n        key\n        value\n      }\n      meta_data {\n        start_date\n        start_time\n        end_time\n        end_date\n        event_type\n        province\n        city\n        address\n        url\n        target_amount\n      }\n      category {\n        id\n        title\n        parent {\n          id\n          title\n        }\n      }\n      images {\n        id\n        url\n      }\n      coupons {\n        id\n        discount_percent\n        code\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ZarinLinkCreateMutation(\n    $terminal_id: ID!\n    $title: String!\n    $amount: Int!\n    $description: String!\n    $show_receipt: Boolean!\n    $is_coupon_active: Boolean!\n    $required_fields: [ZarinLinkRequiredFieldsInput]\n    $limit: Int\n    $type: ZarinLinkTypeEnum\n    $successful_redirect_url: String\n    $failed_redirect_url: String\n    $amount_type: ZarinLinkAmountTypeEnum\n    $meta_data: ZarinLinkMetaDataInput\n    $specifications: [ZarinLinkSpecificationInput]\n    $category_id: Int\n  ) {\n    NewZarinLinkAdd(\n      terminal_id: $terminal_id\n      title: $title\n      amount: $amount\n      description: $description\n      show_receipt: $show_receipt\n      is_coupon_active: $is_coupon_active\n      required_fields: $required_fields\n      limit: $limit\n      successful_redirect_url: $successful_redirect_url\n      failed_redirect_url: $failed_redirect_url\n      type: $type\n      amount_type: $amount_type\n      meta_data: $meta_data\n      specifications: $specifications\n      category_id: $category_id\n    ) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation ZarinLinkCreateMutation(\n    $terminal_id: ID!\n    $title: String!\n    $amount: Int!\n    $description: String!\n    $show_receipt: Boolean!\n    $is_coupon_active: Boolean!\n    $required_fields: [ZarinLinkRequiredFieldsInput]\n    $limit: Int\n    $type: ZarinLinkTypeEnum\n    $successful_redirect_url: String\n    $failed_redirect_url: String\n    $amount_type: ZarinLinkAmountTypeEnum\n    $meta_data: ZarinLinkMetaDataInput\n    $specifications: [ZarinLinkSpecificationInput]\n    $category_id: Int\n  ) {\n    NewZarinLinkAdd(\n      terminal_id: $terminal_id\n      title: $title\n      amount: $amount\n      description: $description\n      show_receipt: $show_receipt\n      is_coupon_active: $is_coupon_active\n      required_fields: $required_fields\n      limit: $limit\n      successful_redirect_url: $successful_redirect_url\n      failed_redirect_url: $failed_redirect_url\n      type: $type\n      amount_type: $amount_type\n      meta_data: $meta_data\n      specifications: $specifications\n      category_id: $category_id\n    ) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ZarinLinkUpdateMutation(\n    $terminal_id: ID!\n    $id: ID!\n    $title: String!\n    $amount: Int!\n    $description: String!\n    $show_receipt: Boolean!\n    $is_coupon_active: Boolean!\n    $required_fields: [ZarinLinkRequiredFieldsInput]\n    $limit: Int\n    $type: ZarinLinkTypeEnum\n    $successful_redirect_url: String\n    $failed_redirect_url: String\n    $amount_type: ZarinLinkAmountTypeEnum\n    $meta_data: ZarinLinkMetaDataInput\n    $specifications: [ZarinLinkSpecificationInput]\n    $category_id: Int\n  ) {\n    NewZarinLinkEdit(\n      id: $id\n      terminal_id: $terminal_id\n      title: $title\n      amount: $amount\n      description: $description\n      show_receipt: $show_receipt\n      is_coupon_active: $is_coupon_active\n      required_fields: $required_fields\n      limit: $limit\n      successful_redirect_url: $successful_redirect_url\n      failed_redirect_url: $failed_redirect_url\n      type: $type\n      amount_type: $amount_type\n      meta_data: $meta_data\n      specifications: $specifications\n      category_id: $category_id\n    ) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation ZarinLinkUpdateMutation(\n    $terminal_id: ID!\n    $id: ID!\n    $title: String!\n    $amount: Int!\n    $description: String!\n    $show_receipt: Boolean!\n    $is_coupon_active: Boolean!\n    $required_fields: [ZarinLinkRequiredFieldsInput]\n    $limit: Int\n    $type: ZarinLinkTypeEnum\n    $successful_redirect_url: String\n    $failed_redirect_url: String\n    $amount_type: ZarinLinkAmountTypeEnum\n    $meta_data: ZarinLinkMetaDataInput\n    $specifications: [ZarinLinkSpecificationInput]\n    $category_id: Int\n  ) {\n    NewZarinLinkEdit(\n      id: $id\n      terminal_id: $terminal_id\n      title: $title\n      amount: $amount\n      description: $description\n      show_receipt: $show_receipt\n      is_coupon_active: $is_coupon_active\n      required_fields: $required_fields\n      limit: $limit\n      successful_redirect_url: $successful_redirect_url\n      failed_redirect_url: $failed_redirect_url\n      type: $type\n      amount_type: $amount_type\n      meta_data: $meta_data\n      specifications: $specifications\n      category_id: $category_id\n    ) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query ZarinLinkCategories($type: CategoryTypeEnum) {\n    ZarinLinkCategories(type: $type) {\n      id\n      title\n      slug\n      type\n      children {\n        id\n        title\n      }\n    }\n  }\n'
): (typeof documents)['\n  query ZarinLinkCategories($type: CategoryTypeEnum) {\n    ZarinLinkCategories(type: $type) {\n      id\n      title\n      slug\n      type\n      children {\n        id\n        title\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateZarinLinkSettingBranding(\n    $terminal_id: Int!\n    $template: TerminalTemplateSettingInput\n    $bio: String\n    $contacts: TerminalContactsInput\n  ) {\n    TerminalSettingBranding(\n      terminal_id: $terminal_id\n      template: $template\n      bio: $bio\n      contacts: $contacts\n    ) {\n      bio\n      template {\n        primary_color\n        secondary_color\n      }\n      contacts {\n        phone\n        email\n        address\n        socials {\n          telegram\n          facebook\n          instagram\n          twitter\n          youtube\n          linkedin\n          discord\n          github\n          eta\n          whatsapp\n          aparat\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateZarinLinkSettingBranding(\n    $terminal_id: Int!\n    $template: TerminalTemplateSettingInput\n    $bio: String\n    $contacts: TerminalContactsInput\n  ) {\n    TerminalSettingBranding(\n      terminal_id: $terminal_id\n      template: $template\n      bio: $bio\n      contacts: $contacts\n    ) {\n      bio\n      template {\n        primary_color\n        secondary_color\n      }\n      contacts {\n        phone\n        email\n        address\n        socials {\n          telegram\n          facebook\n          instagram\n          twitter\n          youtube\n          linkedin\n          discord\n          github\n          eta\n          whatsapp\n          aparat\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetZarinLinkSettingBranding($terminal_id: ID!) {\n    TerminalBrandingSetting(terminal_id: $terminal_id) {\n      bio\n      template {\n        primary_color\n        secondary_color\n      }\n      contacts {\n        phone\n        email\n        address\n        socials {\n          telegram\n          facebook\n          instagram\n          twitter\n          youtube\n          linkedin\n          discord\n          github\n          eta\n          whatsapp\n          aparat\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetZarinLinkSettingBranding($terminal_id: ID!) {\n    TerminalBrandingSetting(terminal_id: $terminal_id) {\n      bio\n      template {\n        primary_color\n        secondary_color\n      }\n      contacts {\n        phone\n        email\n        address\n        socials {\n          telegram\n          facebook\n          instagram\n          twitter\n          youtube\n          linkedin\n          discord\n          github\n          eta\n          whatsapp\n          aparat\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetZarinLinkTransactionsAggregate($terminal_id: ID!, $relation_id: ID!) {\n    ZarinLinkTransactionsAggregate(terminal_id: $terminal_id, relation_id: $relation_id) {\n      all {\n        count\n        amount\n      }\n      current_day {\n        count\n        amount\n      }\n      current_month {\n        count\n        amount\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetZarinLinkTransactionsAggregate($terminal_id: ID!, $relation_id: ID!) {\n    ZarinLinkTransactionsAggregate(terminal_id: $terminal_id, relation_id: $relation_id) {\n      all {\n        count\n        amount\n      }\n      current_day {\n        count\n        amount\n      }\n      current_month {\n        count\n        amount\n      }\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
