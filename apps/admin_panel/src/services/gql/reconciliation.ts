export const ReconciliationSchema = gql`
  query Reconciliation(
    $filter: ReconciliationStatusEnum
    $terminal_id: ID
    $offset: Int
    $limit: Int
    $id: ID
    $reference_id: String
    $created_from_date: DateTime
    $created_to_date: DateTime
    $text: String
    $min_amount: Int
    $max_amount: Int
    $amount: Int
    $iban: String
  ) {
    Reconciliation: Reconciliation(
      filter: $filter
      terminal_id: $terminal_id
      offset: $offset
      limit: $limit
      id: $id
      reference_id: $reference_id
      created_from_date: $created_from_date
      created_to_date: $created_to_date
      text: $text
      min_amount: $min_amount
      max_amount: $max_amount
      amount: $amount
      pagination: true
      iban: $iban
    ) {
      id
      status
      reconciled_at
      amount
      payable_at
      created_at
      fee
      reference_id
      estimated_payed_at
    }
    Pagination {
      total
      last_page
    }
  }
`;

export const ReconciliationExcelExport = gql`
  mutation ReconciliationExcelExport(
    $terminal_id: ID!
    $created_from_date: DateTime
    $created_to_date: DateTime
    $amount: Int
    $max_amount: Int
    $min_amount: Int
    $name: String
    $filter: FilterEnum
  ) {
    ReconciliationExcelExport(
      terminal_id: $terminal_id
      filter: $filter
      created_from_date: $created_from_date
      created_to_date: $created_to_date
      amount: $amount
      max_amount: $max_amount
      min_amount: $min_amount
      name: $name
    )
  }
`;

export const SingleReconciliationSchema = gql`
  query ReconciliationById($id: ID, $terminal_id: ID, $limit: Int, $sessions_limit: Int) {
    Reconciliation(
      terminal_id: $terminal_id
      id: $id
      limit: $limit
      sessions_limit: $sessions_limit
    ) {
      id
      notes {
        id
        content
        created_at
        updated_at
        user {
          name
        }
      }
      terminal_id
      status
      amount
      note
      payable_at
      estimated_payed_at
      description
      reference_id
      reconciled_at
      fee
      sessions_count
      sessions {
        amount
        created_at
        fee
        reference_id
        id
      }
      wages {
        id
        fee
        shaparak_tracking_number
        amount
        type
        type_id
        bank_account {
          id
          iban
          holder_name
          issuing_bank {
            name
            slug
            slug_image
          }
        }
      }
    }
  }
`;
