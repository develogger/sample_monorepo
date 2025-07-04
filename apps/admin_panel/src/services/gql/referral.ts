export const ReferralSchema = gql`
  query ReferrersReport($offset: Int, $limit: Int) {
    ReferrersReport: ReferrersReport(offset: $offset, limit: $limit, pagination: true) {
      all_referrers
      sum_referrers
      month_active_referrers
      sum_commission
      user {
        id
        name
        avatar
        commission
        registered_at
        last_session_time
      }
    }
    Pagination {
      total
      last_page
      name
    }
  }
`;

export const ReferrerInvoiceSchema = gql`
  query ReferrerInvoice($from_date: DateTime, $to_date: DateTime) {
    ReferrerInvoice(from_date: $from_date, to_date: $to_date) {
      id
      status
      amount
      from_date
      to_date
      created_at
    }
  }
`;

export const ReferrerInvoiceGetIbanSchema = gql`
  query ReferrerInvoiceGetIban {
    ReferrerInvoiceGetIban {
      id
      iban
      holder_name
      issuing_bank {
        name
        slug
      }
    }
  }
`;

export const ReferrerInvoiceSetIbanMutationSchema = gql`
  mutation referrerInvoiceSetIban($bank_account_id: ID) {
    referrerInvoiceSetIban(bank_account_id: $bank_account_id) {
      id
      issuing_bank {
        name
        slug
      }
    }
  }
`;
