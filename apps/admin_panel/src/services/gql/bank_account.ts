export const BankAccountSchema = gql`
  query BankAccountList($id: ID, $type: BankAccountTypeEnum) {
    BankAccounts(id: $id, type: $type) {
      id
      iban
      type
      holder_name
      status
      pin
      issuing_bank {
        slug
        slug_image
        name
      }
    }
  }
`;

export const PinBankAccountMutationSchema = gql`
  mutation BankAccountPin($id: ID!, $pin: Boolean!) {
    BankAccountPin(id: $id, pin: $pin) {
      pin
    }
  }
`;

export const BankAccountsSchema = gql`
  query BankAccountDetail(
    $id: ID
    $offset: Int
    $limit: Int
    $iban_holder_name: String
    $type: BankAccountTypeEnum
    $pagination: Boolean
  ) {
    BankAccounts: BankAccounts(
      id: $id
      offset: $offset
      limit: $limit
      iban_holder_name: $iban_holder_name
      type: $type
      pagination: $pagination
    ) {
      id
      iban
      status
      is_legal
      holder_name
      type
      pin
      issuing_bank {
        name
        slug_image
        slug
      }
      expired_at
      deleted_at
    }

    Pagination {
      last_page
      total
    }
  }
`;
export const CheckCardIBANMutationSchema = gql`
  query CheckCardIBAN($pan: MaskedPan, $iban: String) {
    CheckCardIBAN(pan: $pan, iban: $iban) {
      iban
      holder_name
      bank_name
      pan
      bank_slug
      bank_status
      issuing_bank {
        name
        slug
      }
    }
  }
`;
export const BankAccountAddMutationSchema = gql`
  mutation BankAccountAdd(
    $iban: String!
    $is_legal: Boolean!
    $name: String
    $type: BankAccountTypeEnum
  ) {
    BankAccountAdd(type: $type, iban: $iban, name: $name, is_legal: $is_legal) {
      id
      iban
      type
      holder_name
      status
      issuing_bank {
        slug
        slug_image
      }
    }
  }
`;
export const BankAccountByCardAddMutationSchema = gql`
  mutation BankAccountByCardAdd(
    $pan: MaskedPan!
    $is_legal: Boolean!
    $name: String
    $type: BankAccountTypeEnum
  ) {
    BankAccountByCardAdd(type: $type, pan: $pan, name: $name, is_legal: $is_legal) {
      id
      iban
      type
      holder_name
      status
      issuing_bank {
        slug
        slug_image
      }
    }
  }
`;
