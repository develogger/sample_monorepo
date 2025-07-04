export const PayoutSchema = gql`
  query GetPayout(
    $id: ID
    $terminal_id: ID
    $limit: Int
    $url_code: String
    $offset: Int
    $filter: FilterEnum
    $amount: BigInteger
    $iban: String
    $created_from_date: DateTime
    $created_to_date: DateTime
    $reference_session_id: ID
    $min_amount: Int
    $max_amount: Int
    $description: String
  ) {
    Payout: Payout(
      id: $id
      iban: $iban
      terminal_id: $terminal_id
      limit: $limit
      url_code: $url_code
      offset: $offset
      filter: $filter
      amount: $amount
      created_from_date: $created_from_date
      created_to_date: $created_to_date
      reference_session_id: $reference_session_id
      min_amount: $min_amount
      max_amount: $max_amount
      description: $description
      pagination: true
    ) {
      id
      status
      amount
      fee
      created_at
      reconciled_at
      url_code
      percent
      reference_session {
        id
      }
      description
      bank_account {
        iban
        holder_name
        issuing_bank {
          slug
        }
      }
    }
    Pagination {
      total
      last_page
    }
  }
`;
export const PayoutByIdSchema = gql`
  query GetPayoutById($id: ID, $terminal_id: ID) {
    Payout: Payout(id: $id, terminal_id: $terminal_id) {
      id
      status
      amount
      created_at
      reconciled_at
      url_code
      percent
      reference_session {
        id
      }
      description
      bank_account {
        iban
        holder_name
        issuing_bank {
          slug
        }
      }
    }
    Pagination {
      total
      last_page
    }
  }
`;

export const PayoutEditMutationSchema = gql`
  mutation PayoutEdit($id: ID!, $status: PayoutStatusEnum) {
    PayoutEdit(id: $id, status: $status) {
      id
      status
    }
  }
`;

export const PayoutInquirySchema = gql`
  query PayoutInquiry($terminal_id: ID!) {
    PayoutInquiry(terminal_id: $terminal_id) {
      fee_percent
      max_amount
      fee
      type
      fixed_fee_amount
      min_satna
      max_fee_amount
    }
  }
`;

export const AddPayoutMutationSchema = gql`
  mutation PayoutAdd(
    $terminal_id: ID!
    $bank_account_id: ID!
    $amount: BigInteger!
    $description: String
    $reconciliation_parts: ReconciliationPartsEnum
  ) {
    PayoutAdd(
      terminal_id: $terminal_id
      bank_account_id: $bank_account_id
      amount: $amount
      description: $description
      reconciliation_parts: $reconciliation_parts
    ) {
      id
      status
    }
  }
`;

export const PayoutRetryAddMutationSchema = gql`
  mutation PayoutRetryAdd($terminal_id: ID!, $bank_account_id: ID!, $payout_id: ID!) {
    PayoutRetryAdd(
      terminal_id: $terminal_id
      bank_account_id: $bank_account_id
      payout_id: $payout_id
    ) {
      id
      status
    }
  }
`;

export const PayoutExcelExportSchema = gql`
  mutation PayoutExcelExport(
    $terminal_id: ID!
    $created_from_date: DateTime
    $created_to_date: DateTime
    $max_amount: Int
    $min_amount: Int
    $status: PayoutStatusEnum
    $name: String
  ) {
    PayoutExcelExport(
      terminal_id: $terminal_id
      created_from_date: $created_from_date
      created_to_date: $created_to_date
      max_amount: $max_amount
      min_amount: $min_amount
      status: $status
      name: $name
    )
  }
`;

export const PayoutBalanceSchema = gql`
  query GetPayoutBalance($terminal_id: ID!) {
    PayoutBalance: PayoutBalance(terminal_id: $terminal_id) {
      value
    }
  }
`;

export const PayoutActiveAmount = gql`
  query ActivePayoutAmount($terminal_id: ID!) {
    ActivePayoutAmount(terminal_id: $terminal_id)
  }
`;
