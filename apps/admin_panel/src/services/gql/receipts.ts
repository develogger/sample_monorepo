export const InstantPayoutReceiptSchema = gql`
  query InstantPayoutReceipt($url_code: String!) {
    resource: InstantPayoutReceipt(url_code: $url_code) {
      id
      status
      bank_account {
        id
        iban
        holder_name
        issuing_bank {
          slug
          name
        }
      }
      description
      fee
      amount
      owner_name
      created_at
      updated_at
      shaparak_tracking_number
      reconciled_at
    }
  }
`;

export const PayoutReceiptSchema = gql`
  query PayoutReceipt($url_code: String!) {
    resource: PayoutReceipt(url_code: $url_code) {
      id
      amount
      owner_name
      tracking_id
      bank_account {
        id
        iban
        holder_name
        issuing_bank {
          slug
          name
        }
      }
      status
      created_at
      description
    }
  }
`;
