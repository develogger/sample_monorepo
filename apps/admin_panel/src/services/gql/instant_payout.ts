export const InstantPayoutSchema = gql`
  query GetInstantPayout(
    $id: ID
    $reference_id: String
    $url_code: String
    $terminal_id: ID
    $limit: Int
    $offset: Int
    $status: InstantPayoutStatusEnum
    $min_amount: Int
    $max_amount: Int
    $amount: Int
    $created_from_date: DateTime
    $created_to_date: DateTime
    $text: String
  ) {
    InstantPayout: InstantPayout(
      terminal_id: $terminal_id
      limit: $limit
      offset: $offset
      status: $status
      min_amount: $min_amount
      max_amount: $max_amount
      amount: $amount
      text: $text
      created_from_date: $created_from_date
      created_to_date: $created_to_date
      reference_id: $reference_id
      url_code: $url_code
      id: $id
      pagination: true
    ) {
      id
      status
      amount
      reference_id
      created_at
      reconciled_at
      description
      url_code
      fee
      method
      reference_id
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

export const InstantPayoutInquirySchema = gql`
  query InstantPayoutInquiry($terminal_id: ID!, $bank_account_id: ID!) {
    InstantPayoutInquiry(
      terminal_id: $terminal_id
      bank_account_id: $bank_account_id
      amount: null
    ) {
      fee_percent
      fixed_fee_amount
      type
      max_amount
    }
  }
`;

export const InstantPayoutInquiryBanksSchema = gql`
  query InstantPayoutInquiryBanks {
    InstantPayoutInquiryBanks {
      banks {
        bank_name
        status
      }
    }
  }
`;

export const AddInstantPayoutMutationSchema = gql`
  mutation InstantPayoutAdd(
    $terminal_id: ID!
    $bank_account_id: ID!
    $amount: BigInteger!
    $description: String
  ) {
    InstantPayoutAdd(
      terminal_id: $terminal_id
      bank_account_id: $bank_account_id
      amount: $amount
      description: $description
    ) {
      id
      status
    }
  }
`;

export const InstantPayoutExcelExportSchema = gql`
  mutation InstantPayoutExcelExport(
    $terminal_id: ID!
    $created_from_date: DateTime
    $created_to_date: DateTime
    $filter: FilterEnum
    $amount: Int
    $max_amount: Int
    $min_amount: Int
    $status: InstantPayoutStatusEnum
    $name: String
  ) {
    InstantPayoutExcelExport(
      terminal_id: $terminal_id
      created_from_date: $created_from_date
      created_to_date: $created_to_date
      amount: $amount
      max_amount: $max_amount
      min_amount: $min_amount
      status: $status
      filter: $filter
      name: $name
    )
  }
`;
