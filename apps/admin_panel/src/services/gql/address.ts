export const AddAddressMutationSchema = gql`
  mutation AddressAdd(
    $type: AddressTypeEnum!
    $title: String
    $address: String!
    $landline: String!
    $postal_code: String!
    $location: String
  ) {
    AddressAdd(
      type: $type
      title: $title
      address: $address
      landline: $landline
      postal_code: $postal_code
      location: $location
    ) {
      id
      title
      address
      landline
      postal_code
    }
  }
`;
export const EditAddressMutationSchema = gql`
  mutation AddressEdit(
    $id: ID!
    $type: AddressTypeEnum!
    $title: String
    $address: String!
    $landline: String!
    $postal_code: String!
    $location: String
  ) {
    AddressEdit(
      id: $id
      type: $type
      title: $title
      address: $address
      landline: $landline
      postal_code: $postal_code
      location: $location
    ) {
      id
      title
      address
      landline
      postal_code
    }
  }
`;
export const UserAddresschema = gql`
  query GetUserAddress {
    Me {
      id
      level
      addresses {
        id
        title
        type
        address
        landline
        is_postal_code_verified
        postal_code
        location
      }
    }
  }
`;
