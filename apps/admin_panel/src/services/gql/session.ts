export const SessionSchema = gql`
  query GetSessions(
    $reconciliation_id: ID
    $filter: FilterEnum
    $terminal_id: ID
    $offset: Int
    $limit: Int
    $type: SessionTypeEnum
    $amount: Int
    $note: String
    $max_amount: Int
    $min_amount: Int
    $created_from_date: DateTime
    $created_to_date: DateTime
    $id: ID
    $reference_id: String
    $relation_id: ID
    $mobile: CellNumber
    $email: String
    $description: String
    $card_pan: String
    $rrn: String
  ) {
    Session: Session(
      filter: $filter
      type: $type
      note: $note
      terminal_id: $terminal_id
      offset: $offset
      limit: $limit
      amount: $amount
      max_amount: $max_amount
      min_amount: $min_amount
      mobile: $mobile
      created_from_date: $created_from_date
      created_to_date: $created_to_date
      id: $id
      reference_id: $reference_id
      pagination: true
      relation_id: $relation_id
      card_pan: $card_pan
      email: $email
      description: $description
      rrn: $rrn
      reconciliation_id: $reconciliation_id
    ) {
      id
      type
      status
      created_at
      description
      reconciliation_id
      amount
      fee
      timeline {
        refund_id
        refund_status
        reconciled_id
        reconciled_time
        reconciled_status
      }
    }
    Pagination {
      total
      last_page
    }
  }
`;
export const SessionExcelExport = gql`
  mutation SessionDynamicExcelExport(
    $terminal_id: ID!
    $fields: [String]
    $created_from_date: DateTime
    $created_to_date: DateTime
    $reconciliation_id: ID
    $amount: Int
    $max_amount: Int
    $min_amount: Int
    $filter: FilterEnum
    $name: String
    $session_id: ID
    $mobile: CellNumber
    $email: String
    $card_pan: String
    $description: String
    $reference_id: String
    $type: SessionTypeEnum
    $relation_id: ID
    $export_file_type: ExportFileTypeEnum
  ) {
    SessionDynamicExcelExport(
      terminal_id: $terminal_id
      fields: $fields
      created_from_date: $created_from_date
      created_to_date: $created_to_date
      reconciliation_id: $reconciliation_id
      amount: $amount
      max_amount: $max_amount
      min_amount: $min_amount
      filter: $filter
      name: $name
      card_pan: $card_pan
      email: $email
      session_id: $session_id
      mobile: $mobile
      description: $description
      reference_id: $reference_id
      type: $type
      relation_id: $relation_id
      export_file_type: $export_file_type
    )
  }
`;
export const SessionNormalExcelExport = gql`
  mutation SessionExcelExport(
    $terminal_id: ID!
    $created_from_date: DateTime
    $created_to_date: DateTime
    $reconciliation_id: ID
    $amount: Int
    $max_amount: Int
    $min_amount: Int
    $filter: FilterEnum
    $name: String
    $session_id: ID
    $mobile: CellNumber
    $email: String
    $card_pan: String
    $description: String
    $reference_id: String
    $type: SessionTypeEnum
    $relation_id: ID
    $export_file_type: ExportFileTypeEnum
  ) {
    SessionExcelExport(
      terminal_id: $terminal_id
      created_from_date: $created_from_date
      created_to_date: $created_to_date
      reconciliation_id: $reconciliation_id
      amount: $amount
      max_amount: $max_amount
      min_amount: $min_amount
      filter: $filter
      name: $name
      card_pan: $card_pan
      email: $email
      session_id: $session_id
      mobile: $mobile
      description: $description
      reference_id: $reference_id
      type: $type
      relation_id: $relation_id
      export_file_type: $export_file_type
    )
  }
`;
export const SessionCardHolderSchema = gql`
  mutation SessionCardHolder($session_id: ID!) {
    SessionCardHolder(session_id: $session_id)
  }
`;

export const SessionTypeSchema = gql`
  query SessionType($terminal_id: ID!) {
    Session: SessionType(terminal_id: $terminal_id) {
      name
    }
  }
`;

export const SingleSessionSchema = gql`
  query SessionById($terminal_id: ID, $id: ID) {
    Session(terminal_id: $terminal_id, id: $id) {
      id
      note
      fee_detail {
        sms
        ayan
        raw_fee
      }
      notes {
        id
        content
        created_at
        updated_at
        user {
          name
        }
      }
      wage_payouts {
        id
      }
      reference_id
      reconciliation_id
      type
      fee
      fee_type
      status
      amount
      authority
      description
      created_at
      payer_info {
        card_holder_name
        description
        email
        mobile
        name
        order_id
        zarin_link_id
        custom_field_1_name
        custom_field_2_name
        custom_field_1
        custom_field_2
      }
      terminal {
        id
        refund_active
      }
      session_tries {
        is_card_mobile_verified
        card_info {
          name
          slug
        }
        agent {
          country_code
        }
        card_pan
        payer_ip
        rrn
        status
      }
      refund {
        id
        session_id
        instant_payout {
          id
          amount
          fee
          terminal {
            id
          }
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
          reference_id
          reconciled_at
          created_at
          status
        }
      }
      product {
        title
      }
      timeline {
        canceled_time
        created_time
        in_bank_name
        in_bank_time
        reconciled_id
        reconciled_time
        reconciled_status
        reconciled_success_time
        settled_time
        verified_reference
        verified_time
        refund_status
        refund_amount
        refund_time
      }
    }
  }
`;

export const ExportFieldSchema = gql`
  query ExportableFields($group: ExportGroupEnum, $terminal_id: Int!) {
    Session: ExportableFields(group: $group, terminal_id: $terminal_id) {
      key
      categories {
        key
        fields {
          title
          slug
          is_required
          is_selected
        }
      }
    }
  }
`;
