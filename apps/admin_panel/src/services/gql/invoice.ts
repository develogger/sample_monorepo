export const InvoiceSchema = gql`
  query GetInvoices(
    $id: ID
    $terminal_id: ID!
    $limit: Int
    $offset: Int
    $filter: InvoiceStatusEnum
    $amount: BigInteger
    $min_amount: Int
    $max_amount: Int
    $created_from_date: DateTime
    $created_to_date: DateTime
    $payer_name: String
    $payer_mobile: String
    $payer_email: String
    $description: String
  ) {
    Invoice: Invoice(
      id: $id
      terminal_id: $terminal_id
      status: $filter
      amount: $amount
      min_amount: $min_amount
      max_amount: $max_amount
      limit: $limit
      offset: $offset
      created_from_date: $created_from_date
      created_to_date: $created_to_date
      payer_name: $payer_name
      payer_mobile: $payer_mobile
      payer_email: $payer_email
      description: $description
      pagination: true
    ) {
      id
      amount
      created_at
      payer_name
      status
    }
    Pagination {
      total
      last_page
    }
  }
`;

export const InvoiceByIdSchema = gql`
  query GetInvoiceById($terminal_id: ID!, $id: ID) {
    Invoice: Invoice(terminal_id: $terminal_id, id: $id) {
      id
      amount
      description
      payer_name
      payer_mobile
      payer_email
      notify_type
      fee_type
    }
  }
`;

export const NewInvoiceMutationSchema = gql`
  mutation InvoiceAdd(
    $terminal_id: ID!
    $amount: BigInteger!
    $description: String!
    $payer_name: String!
    $payer_mobile: String!
    $payer_email: String
    $notify_type: NotifyTypeEnum
    $count: Int
    $fee_type: TerminalFeeTypeEnum
  ) {
    InvoiceAdd(
      terminal_id: $terminal_id
      amount: $amount
      payer_name: $payer_name
      description: $description
      payer_mobile: $payer_mobile
      payer_email: $payer_email
      notify_type: $notify_type
      count: $count
      fee_type: $fee_type
    ) {
      id
    }
  }
`;

export const EditInvoiceMutationSchema = gql`
  mutation InvoiceEdit(
    $id: String!
    $payer_name: String!
    $payer_mobile: String!
    $payer_email: String
    $description: String!
    $notify_type: NotifyTypeEnum
  ) {
    InvoiceEdit(
      id: $id
      payer_name: $payer_name
      description: $description
      payer_mobile: $payer_mobile
      payer_email: $payer_email
      notify_type: $notify_type
    ) {
      id
    }
  }
`;

export const InvoiceByIdDetailsSchema = gql`
  query Invoices($terminal_id: ID!, $id: ID) {
    Invoice(terminal_id: $terminal_id, id: $id) {
      id
      payer_email
      sessions {
        id
        terminal_id
        amount
        status

        payer_info {
          order_id
        }
        timeline {
          created_time
          created_reference
          canceled_time
          in_bank_time
          in_bank_name
          settled_time
          verified_time
          verified_reference
          reconciled_time
          reconciled_id
        }
      }
      terminal_id
      status
      amount
      fee
      notify_type
      description
      fee_type
      payer_name
      payer_mobile
      created_at
      updated_at
      deleted_at
    }
  }
`;
