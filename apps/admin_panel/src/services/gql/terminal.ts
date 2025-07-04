export const PinTerminalMutationSchema = gql`
  mutation PinTerminal($id: ID!, $pin: Boolean!) {
    PinTerminal(id: $id, pin: $pin) {
      pin
    }
  }
`;

export const TerminalListMenuSchema = gql`
  query GetTerminalsListMenu {
    Terminals {
      reconcile_priority
      reconcile_type
      id
      created_at
      have_logo
      max_amount
      reconcile_type
      pin
      is_default
      status
      permissions
      name
      domain
      owner_id
      preferred_bank_account_id
      key
      logo
      chn_type
      reconcile_priority
      fee_type
      support_phone
      server_ip
      flag
      fee_group {
        id
      }
      zarin_gate {
        psp
        merchant_id
        status
        terminal_id
        error
        payment {
          name
        }
      }
      psp_priority {
        psp
        merchant_id
        status
        terminal_id
        error
        payment {
          name
        }
      }
      active_psp {
        psp
        merchant_id
        status
        terminal_id
        error
        payment {
          name
        }
      }
    }
  }
`;

export const TerminalListSchema = gql`
  query GetTerminals($offset: Int, $limit: Int) {
    Terminals: Terminals(offset: $offset, limit: $limit, pagination: true) {
      id
      status
      name
      domain
      logo
    }
    Pagination {
      total
      last_page
    }
  }
`;

export const TerminalEditMutationSchema = gql`
  mutation TerminalEdit(
    $id: ID!
    $logo: ValidFile
    $bank_account_id: ID
    $reconcile_priority: ReconcileCycleTypeEnum
    $support_phone: CellNumber
    $server_ip: IP
    $fee_type: TerminalFeeTypeEnum
    $chn_type: TerminalChnTypeEnum
    $psp_priority: [String]
  ) {
    TerminalEdit(
      id: $id
      logo: $logo
      bank_account_id: $bank_account_id
      reconcile_priority: $reconcile_priority
      support_phone: $support_phone
      server_ip: $server_ip
      fee_type: $fee_type
      chn_type: $chn_type
      psp_priority: $psp_priority
    ) {
      id
      chn_type
      logo
    }
  }
`;

export const TerminalAddMutationSchema = gql`
  mutation TerminalAdd(
    $mcc_id: ID!
    $domain: String!
    $name: String!
    $support_phone: CellNumber!
  ) {
    TerminalAdd(mcc_id: $mcc_id, domain: $domain, name: $name, support_phone: $support_phone) {
      id
    }
  }
`;

export const TerminalDomainCheckSchema = gql`
  query TerminalDomainCheck($domain: String!) {
    TerminalDomainCheck(domain: $domain) {
      type
      title
    }
  }
`;

export const TerminalUserSchema = gql`
  query TerminalUser($terminal_id: ID!) {
    TerminalUser(terminal_id: $terminal_id) {
      id
      user_id
      user_name
      user_avatar
      terminal_id
      access_list
    }
  }
`;

export const TerminalDeleteAccessMutationSchema = gql`
  mutation TerminalDeleteAccess($id: ID!, $terminal_id: ID!) {
    TerminalDeleteAccess(id: $id, terminal_id: $terminal_id)
  }
`;

export const TerminalAssignAccessMutationSchema = gql`
  mutation TerminalAssignAccess(
    $terminal_id: ID!
    $user_id: ID!
    $access_list: [TerminalPermissionEnum]!
  ) {
    TerminalAssignAccess(terminal_id: $terminal_id, user_id: $user_id, access_list: $access_list) {
      id
      user_id
      user_name
      terminal_id
      access_list
      user_avatar
    }
  }
`;

export const TerminalEditAccessMutationSchema = gql`
  mutation TerminalEditAccess(
    $id: ID!
    $terminal_id: ID!
    $access_list: [TerminalPermissionEnum]!
  ) {
    TerminalEditAccess(id: $id, terminal_id: $terminal_id, access_list: $access_list) {
      id
      user_id
      user_name
      terminal_id
      access_list
      user_avatar
    }
  }
`;

export const TerminalCategoriesSchema = gql`
  query TerminalCategories {
    TerminalCategories: TerminalCategories {
      id
      title
      slug
      category_identifier
      parent_id
      children {
        id
        title
        slug
        category_identifier
        parent_id
      }
    }
  }
`;
export const ReleaseNoteSchema = gql`
  query GetReleaseChangeLogQuery {
    ReleaseChangeLogQuery {
      version
      content
      created_at
    }
  }
`;
export const TerminalAndMeSchema = gql`
  query GetTerminalsListAndMe {
    Terminals {
      id
      permissions
      domain
      status
      owner_id
      reconcile_type
      fee_group {
        id
      }
    }
    Me {
      id
      ssn
      cell_number
      level
      created_at
      avatar
      full_name
      referral_id
      email
      vip_level
      personal_link {
        domain
      }
      addresses {
        id
      }
      data_status {
        kyc
        email
        personal
      }
    }
  }
`;

export const TerminalDailyReportSchema = gql`
  query TerminalDailyReport($terminal_id: ID!, $from_date: Date!, $to_date: Date!) {
    DailyReport(terminal_id: $terminal_id, from_date: $from_date, to_date: $to_date) {
      sessions {
        date
        amount
        count
      }
      reconciliations {
        date
        amount
        count
      }
      total {
        total_session_amount
        total_session_count
        total_reconciliation_amount
        total_reconciliation_count
      }
    }
  }
`;
